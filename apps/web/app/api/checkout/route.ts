import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// One Stripe Product ("MedPrep Institute Membership") with three recurring
// Prices — see scripts/setup-stripe-products.mjs, which creates them and
// prints the ids to put here.
const PRICE_ID_BY_PLAN: Record<string, string | undefined> = {
  monthly: process.env.STRIPE_PRICE_ID_MONTHLY,
  quarterly: process.env.STRIPE_PRICE_ID_QUARTERLY,
  yearly: process.env.STRIPE_PRICE_ID_YEARLY,
};

const TRIAL_DAYS = 7;

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Billing is not configured yet' }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const plan = body?.plan as string | undefined;
  const priceId = plan ? PRICE_ID_BY_PLAN[plan] : undefined;

  if (!plan || !priceId) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? '';

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: { trial_period_days: TRIAL_DAYS, metadata: { clerkUserId: userId } },
    client_reference_id: userId,
    customer_email: email,
    metadata: { clerkUserId: userId },
    success_url: `${origin}/dashboard?checkout=success`,
    cancel_url: `${origin}/paywall`,
    allow_promotion_codes: true,
  });

  if (!session.url) {
    return NextResponse.json({ error: 'Could not start checkout' }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
