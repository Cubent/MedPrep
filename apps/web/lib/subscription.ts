import { database } from '@repo/database';

// Stripe statuses that should keep the dashboard unlocked. past_due stays
// unlocked while Stripe retries the payment; canceled / unpaid / incomplete
// do not.
const ACCESS_STATUSES = new Set(['trialing', 'active', 'past_due']);

export const getSubscription = (clerkUserId: string) =>
  database.subscription.findUnique({ where: { clerkUserId } });

export const hasAccess = (subscription: { status: string } | null) =>
  subscription !== null && ACCESS_STATUSES.has(subscription.status);
