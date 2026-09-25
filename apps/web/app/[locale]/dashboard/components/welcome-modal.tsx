'use client';

import { BookMarked, CreditCard, RefreshCw, Target, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'medprep-welcome-dismissed';

const POINTS = [
  {
    icon: Target,
    title: 'Start with a practice set',
    body: 'Each set is five NBME-style questions. Answer them, then read every explanation.',
  },
  {
    icon: RefreshCw,
    title: 'Misses come back on a schedule',
    body: 'Anything you miss returns as a fresh variation through spaced repetition, in Review.',
  },
  {
    icon: BookMarked,
    title: 'Unlock your Study Guide',
    body: 'Finish a few sets and answer your first review to get a guide built from your own misses.',
  },
  {
    icon: CreditCard,
    title: 'Your plan, your control',
    body: 'Manage or cancel your subscription any time from Account.',
  },
];

type WelcomeModalProps = {
  /** True only for users who haven't answered a question yet. */
  enabled: boolean;
};

export const WelcomeModal = ({ enabled }: WelcomeModalProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const primaryRef = useRef<HTMLAnchorElement>(null);

  // Only greet people on the dashboard home, not mid-practice on another page.
  const isDashboardHome = pathname.endsWith('/dashboard');

  useEffect(() => {
    if (!isDashboardHome) return;
    // /dashboard?welcome=1 forces the popup, for previewing it.
    const isForced = new URLSearchParams(window.location.search).get('welcome') === '1';
    if (!enabled && !isForced) return;
    try {
      if (!isForced && localStorage.getItem(STORAGE_KEY) === 'true') return;
    } catch {
      // localStorage unavailable: show it anyway, dismissal just won't persist.
    }
    setIsOpen(true);
  }, [enabled, isDashboardHome]);

  useEffect(() => {
    if (!isOpen) return;
    primaryRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // localStorage unavailable: it may reopen next visit, not fatal.
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-[#120A2E]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C46B10]">
              Welcome
            </p>
            <h2
              id="welcome-modal-title"
              className="font-[family-name:var(--font-display)] mt-1.5 text-2xl font-bold text-[#06005A] dark:text-white"
            >
              Welcome to MedPrep Institute
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          You&apos;re all set. Here&apos;s how to get the most out of your first week.
        </p>

        <ul className="mt-5 space-y-4">
          {POINTS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#06005A]/10 text-[#06005A] dark:bg-[#C46B10]/15 dark:text-[#C46B10]">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#06005A] dark:text-white">{title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row-reverse">
          <Link
            ref={primaryRef}
            href="/dashboard/practice"
            onClick={close}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-[#06005A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080]"
          >
            Start practicing
          </Link>
          <button
            type="button"
            onClick={close}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/5"
          >
            Explore the dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
