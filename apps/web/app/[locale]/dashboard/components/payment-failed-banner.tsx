import { auth } from '@clerk/nextjs/server';
import { TriangleAlert } from 'lucide-react';
import { PAYMENT_GRACE_DAYS, type PaymentIssue, getPaymentIssue, getSubscription } from '@/lib/subscription';
import { UpdatePaymentButton } from './update-payment-button';

const DAY_MS = 86_400_000;

const deadlineText = (accessEndsAt: Date | null, now: number) => {
  if (!accessEndsAt) return 'You may lose access soon unless you update your payment method.';
  const msLeft = accessEndsAt.getTime() - now;
  const days = Math.ceil(msLeft / DAY_MS);
  if (days <= 1) return 'You will lose access within 24 hours unless you update your payment method.';
  return `You will lose access in ${days} days unless you update your payment method.`;
};

/** The message itself. Pure, so it can be rendered with any issue. */
export const PaymentFailedNotice = ({ issue, now }: { issue: PaymentIssue; now: number }) => (
  <div
    role="alert"
    className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-500/30 dark:bg-rose-500/10 sm:p-6"
  >
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300">
          <TriangleAlert className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-rose-900 dark:text-rose-100">Payment failed</p>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-rose-800/90 dark:text-rose-200/80">
            {issue.afterTrial
              ? 'Your free trial has ended and we could not charge your card.'
              : 'We could not process your latest payment.'}{' '}
            {deadlineText(issue.accessEndsAt, now)} Your progress is saved and will be waiting once
            it is fixed.
          </p>
        </div>
      </div>
      <UpdatePaymentButton />
    </div>
  </div>
);

/**
 * Sits above the Study Guide card. Shows only when Stripe could not charge the
 * customer (subscription is past_due). `preview` forces it on for local design
 * work, and is only honored on the dev server.
 */
export const PaymentFailedBanner = async ({ preview = false }: { preview?: boolean }) => {
  if (preview && process.env.NODE_ENV === 'development') {
    const now = Date.now();
    return (
      <PaymentFailedNotice
        issue={{ accessEndsAt: new Date(now + PAYMENT_GRACE_DAYS * DAY_MS), afterTrial: true }}
        now={now}
      />
    );
  }

  const { userId } = await auth();
  if (!userId) return null;

  const subscription = await getSubscription(userId);
  if (!subscription) return null;

  const issue = await getPaymentIssue(subscription);
  if (!issue) return null;

  return <PaymentFailedNotice issue={issue} now={Date.now()} />;
};
