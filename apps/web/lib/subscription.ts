import { database } from '@repo/database';
import { cache } from 'react';
import Stripe from 'stripe';

// Stripe statuses that should keep the dashboard unlocked. past_due stays
// unlocked, but only for PAYMENT_GRACE_DAYS after the failed charge (see
// resolveAccess); canceled / unpaid / incomplete do not.
const ACCESS_STATUSES = new Set(['trialing', 'active', 'past_due']);

// How long a customer keeps access after a charge fails, while they fix their card.
export const PAYMENT_GRACE_DAYS = 3;
const DAY_MS = 86_400_000;

export const getSubscription = (clerkUserId: string) =>
  database.subscription.findUnique({ where: { clerkUserId } });

export const hasAccess = (subscription: { status: string } | null) =>
  subscription !== null && ACCESS_STATUSES.has(subscription.status);

export type PaymentIssue = {
  /** When access ends, or null when Stripe couldn't tell us when the charge failed. */
  accessEndsAt: Date | null;
  /** True when the failed charge was the first one after the free trial. */
  afterTrial: boolean;
};

/** Turns Stripe's timestamps (in seconds) for the failed invoice into a PaymentIssue. */
export const buildPaymentIssue = (
  failedAtSeconds: number,
  trialEndSeconds: number | null
): PaymentIssue => {
  const failedAt = failedAtSeconds * 1000;
  return {
    accessEndsAt: new Date(failedAt + PAYMENT_GRACE_DAYS * DAY_MS),
    afterTrial:
      trialEndSeconds !== null && Math.abs(failedAt - trialEndSeconds * 1000) < 2 * DAY_MS,
  };
};

// Asks Stripe when the latest invoice was issued. Wrapped in React's cache so
// the layout and the banner share one Stripe call per page load.
const loadPaymentIssue = cache(async (stripeSubscriptionId: string): Promise<PaymentIssue | null> => {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId, {
      expand: ['latest_invoice'],
    });
    const invoice =
      typeof subscription.latest_invoice === 'object' ? subscription.latest_invoice : null;
    if (!invoice) return null;
    return buildPaymentIssue(
      invoice.status_transitions?.finalized_at ?? invoice.created,
      subscription.trial_end
    );
  } catch (error) {
    console.error('Could not load the payment issue from Stripe:', error);
    return null;
  }
});

/** The failed-payment details for a past_due subscription, or null when payments are fine. */
export const getPaymentIssue = async (subscription: {
  status: string;
  stripeSubscriptionId: string;
}): Promise<PaymentIssue | null> => {
  if (subscription.status !== 'past_due') return null;
  return (
    (await loadPaymentIssue(subscription.stripeSubscriptionId)) ?? {
      accessEndsAt: null,
      afterTrial: false,
    }
  );
};

/**
 * Whether the user may use the dashboard. Same as hasAccess, except a past_due
 * subscription stops working once its grace period ends. If Stripe can't be
 * reached we don't lock anyone out over our own lookup failure.
 */
export const resolveAccess = async (
  subscription: { status: string; stripeSubscriptionId: string } | null
) => {
  if (!subscription) return { allowed: false, issue: null };
  const issue = await getPaymentIssue(subscription);
  if (!issue) return { allowed: hasAccess(subscription), issue: null };
  return { allowed: !issue.accessEndsAt || issue.accessEndsAt > new Date(), issue };
};
