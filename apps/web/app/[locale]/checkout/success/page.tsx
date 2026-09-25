'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  META_PLAN_KEY,
  META_PLAN_VALUE,
  type MetaPlanId,
  once,
  trackMeta,
} from '../../../../lib/meta-pixel';

const POLL_INTERVAL_MS = 1500;
const MAX_ATTEMPTS = 20;

// Trial activated: tell Meta. The plan chosen on the paywall gives the value
// (used as predicted lifetime value); the real Purchase is sent server-side
// when Stripe charges the card after the trial.
const reportTrialStarted = () => {
  let plan: MetaPlanId | null = null;
  try {
    plan = window.sessionStorage.getItem(META_PLAN_KEY) as MetaPlanId | null;
  } catch {
    // Storage blocked: report without a value.
  }
  const value = plan ? META_PLAN_VALUE[plan] : undefined;
  once(`mp_meta_trial_${plan ?? 'unknown'}_${new Date().toISOString().slice(0, 10)}`, () =>
    trackMeta('StartTrial', {
      currency: 'USD',
      ...(value !== undefined && { value: 0, predicted_ltv: value }),
    }),
  );
};

// Stripe sends the user here right after Checkout, but the webhook that
// records the subscription can land a moment later. Wait for it so the
// dashboard paywall doesn't bounce them straight back to /paywall.
const CheckoutSuccessPage = () => {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      for (let attempt = 0; attempt < MAX_ATTEMPTS && !cancelled; attempt++) {
        try {
          const response = await fetch('/api/subscription/status', { cache: 'no-store' });
          const data = await response.json().catch(() => ({}));
          if (data.active) {
            reportTrialStarted();
            // Give the pixel a moment to send before the page is replaced.
            setTimeout(() => window.location.replace('/dashboard'), 400);
            return;
          }
        } catch {
          // Network blip: keep polling.
        }
        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
      }
      if (!cancelled) setTimedOut(true);
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="max-w-sm text-center">
        {timedOut ? (
          <>
            <h1 className="text-xl font-bold text-[#000C3F]">Still setting things up</h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Your payment went through, but your trial is taking longer than usual to activate.
              Give it a moment and try again.
            </p>
            <a
              href="/dashboard"
              className="mt-6 inline-block rounded-full bg-[#C46B10] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a95a0d]"
            >
              Go to dashboard
            </a>
          </>
        ) : (
          <>
            <Loader2 className="mx-auto size-8 animate-spin text-[#C46B10]" />
            <h1 className="mt-5 text-xl font-bold text-[#000C3F]">Activating your free trial</h1>
            <p className="mt-2 text-sm text-gray-600">This only takes a few seconds.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
