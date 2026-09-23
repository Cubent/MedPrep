import { database } from '@repo/database';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Stripe is the system of record for billing state — this handler is the
// ONLY place that ever writes to the Subscription table. Never write to it
// from any other route (e.g. /api/checkout), or the two sources can drift.
const RELEVANT_EVENTS = new Set([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

async function upsertFromSubscription(subscription: Stripe.Subscription) {
  const clerkUserId = subscription.metadata?.clerkUserId;
  if (!clerkUserId) {
    // Shouldn't happen — /api/checkout always sets this — but a subscription
    // we can't attribute to a user is useless to store.
    console.error('Stripe subscription missing clerkUserId metadata:', subscription.id);
    return;
  }

  const customerId =
    typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
  const priceId = subscription.items.data[0]?.price.id ?? '';

  await database.subscription.upsert({
    where: { stripeSubscriptionId: subscription.id },
    create: {
      clerkUserId,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      priceId,
      currentPeriodEnd: new Date(subscription.items.data[0]!.current_period_end * 1000),
      trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    update: {
      status: subscription.status,
      priceId,
      currentPeriodEnd: new Date(subscription.items.data[0]!.current_period_end * 1000),
      trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Billing is not configured yet' }, { status: 500 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  // Signature verification needs the exact raw request body — do not parse
  // it as JSON before this.
  const rawBody = await request.text();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (RELEVANT_EVENTS.has(event.type)) {
    await upsertFromSubscription(event.data.object as Stripe.Subscription);
  }

  return NextResponse.json({ received: true });
}
