'use client';

import { PartyPopper, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Variant = 'correct' | 'incorrect';

const STORAGE_KEY: Record<Variant, string> = {
  correct: 'medprep-first-correct-dismissed',
  incorrect: 'medprep-first-incorrect-dismissed',
};

const COPY: Record<Variant, { heading: string; paragraphs: string[]; accent: string }> = {
  correct: {
    heading: 'Great work',
    accent: 'text-green-600 dark:text-green-400',
    paragraphs: [
      'That’s your first correct answer on MedPrep Institute.',
      'Finish out this set of five, and your next set will bring back a related question built on the same underlying concept — possibly from an entirely different system or disease process, but testing the identical reasoning skill.',
      'That repetition, spaced out rather than crammed all at once, is how the ideas actually stick.',
    ],
  },
  incorrect: {
    heading: 'Learn from this one',
    accent: 'text-[#06005A] dark:text-[#C46B10]',
    paragraphs: [
      'This is your first miss — and misses are where the real learning happens.',
      'Once you wrap up this set, we’ll bring back a variation of this same concept, framed a little differently, the way exam writers often test one idea from several angles.',
      'Get that variation right, and MedPrep will keep resurfacing fresh takes on it in Review, spaced out over time so it actually sticks.',
      'Read the explanation below closely before moving on — it’s the fastest way to bank this one for good.',
    ],
  },
};

type FirstMilestoneModalProps = {
  variant: Variant;
  trigger: boolean;
};

export const FirstMilestoneModal = ({ variant, trigger }: FirstMilestoneModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(true);

  useEffect(() => {
    if (!trigger) return;
    try {
      if (localStorage.getItem(STORAGE_KEY[variant]) === 'true') return;
    } catch {
      // localStorage unavailable — show it anyway, just won't persist dismissal.
    }
    setIsOpen(true);
  }, [trigger, variant]);

  const close = () => {
    setIsOpen(false);
    if (dontShowAgain) {
      try {
        localStorage.setItem(STORAGE_KEY[variant], 'true');
      } catch {
        // localStorage unavailable — nothing to persist, modal may reopen next time.
      }
    }
  };

  if (!isOpen) return null;

  const copy = COPY[variant];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4" onClick={close}>
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-[#120A2E]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-[#06005A]/10 dark:bg-[#C46B10]/15 ${copy.accent}`}>
              <PartyPopper className="size-4" />
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#06005A] dark:text-white">
              {copy.heading}
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

        <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {copy.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <label className="mt-5 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
            className="size-4 rounded border-gray-300 text-[#06005A] focus:ring-[#06005A] dark:border-white/20"
          />
          Don&apos;t show this again
        </label>

        <button
          type="button"
          onClick={close}
          className="mt-5 w-full rounded-full bg-[#06005A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080]"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
