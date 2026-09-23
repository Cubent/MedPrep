'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const POLL_INTERVAL_MS = 1500;
const MAX_ATTEMPTS = 20;

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
            window.location.replace('/dashboard');
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
