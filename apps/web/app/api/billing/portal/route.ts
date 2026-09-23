import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSubscription } from '@/lib/subscription';

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Billing is not configured yet' }, { status: 500 });
  }

  const subscription = await getSubscription(userId);
  if (!subscription) {
    return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? '';

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${origin}/dashboard/account`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe billing portal session failed:', error);
    return NextResponse.json(
      { error: 'Could not open the billing portal. Please try again.' },
      { status: 500 }
    );
  }
}
