'use client';

import { ArrowRight, Award, Sparkles, TrendingUp, X } from 'lucide-react';

type CalibrateBankModalProps = {
  isOpen: boolean;
  onClose: () => void;
  nextExamLabel: string;
  fromExamLabel: string;
  threshold: number;
};

export const CalibrateBankModal = ({
  isOpen,
  onClose,
  nextExamLabel,
  fromExamLabel,
  threshold,
}: CalibrateBankModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-[#120A2E] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#C46B10]/15 text-[#C46B10]">
              <Award className="size-4" />
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#06005A] dark:text-white sm:text-2xl">
              Calibrate your {nextExamLabel} bank
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          We automatically calibrate your {nextExamLabel} bank to prioritize your weak areas in{' '}
          {fromExamLabel}. That&apos;s the compounding advantage of NARQB: once you&apos;ve
          answered {threshold} questions, calibration begins using your full answer history and
          keeps refining your next bank until you finish {fromExamLabel}.
        </p>

        <div className="mt-5 flex items-center gap-4 rounded-xl bg-[#06005A]/5 p-4 dark:bg-white/5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#C46B10]/15 text-[#C46B10]">
            <TrendingUp className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#06005A] dark:text-white">
              Over 45%
            </p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              faster to your target score
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">vs. a fresh question bank</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-400 dark:text-gray-500">
              All your answers
            </p>
            <p className="mt-2 text-sm leading-snug text-gray-600 dark:text-gray-300">
              Your specific mistakes &amp; patterns
            </p>
          </div>
          <ArrowRight className="mt-1 size-4 shrink-0 rotate-90 text-gray-300 dark:text-gray-600 sm:rotate-0" />
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-400 dark:text-gray-500">
              Delivery engine
            </p>
            <p className="mt-2 text-sm leading-snug text-gray-600 dark:text-gray-300">
              Calibration begins at {threshold} answers
            </p>
          </div>
          <ArrowRight className="mt-1 size-4 shrink-0 rotate-90 text-gray-300 dark:text-gray-600 sm:rotate-0" />
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#C46B10]">
              {nextExamLabel} bank
            </p>
            <p className="mt-2 text-sm leading-snug text-gray-600 dark:text-gray-300">
              Weak + unfinished high-yield topics first
            </p>
            <p className="mt-1.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Sparkles className="size-3 shrink-0 text-[#C46B10]" />
              Keeps refining with every new answer
            </p>
          </div>
        </div>

        <p className="mt-6 rounded-xl bg-gray-50 px-4 py-3 text-xs leading-relaxed text-gray-500 dark:bg-white/5 dark:text-gray-400">
          Full bank. Nothing removed&mdash;just prioritized.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-full bg-[#06005A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080]"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
