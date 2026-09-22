'use client';

import { Award, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CalibrateBankModal } from './calibrate-bank-modal';

const STORAGE_KEY = 'medprep:next-exam-advantage:dismissed';

type NextExamAdvantageCardViewProps = {
  nextExamLabel: string;
  fromExamLabel: string;
  answered: number;
  threshold: number;
};

export const NextExamAdvantageCardView = ({
  nextExamLabel,
  fromExamLabel,
  answered,
  threshold,
}: NextExamAdvantageCardViewProps) => {
  const [isDismissed, setIsDismissed] = useState(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    try {
      setIsDismissed(localStorage.getItem(STORAGE_KEY) === 'true');
    } catch {
      setIsDismissed(false);
    }
  }, []);

  const dismiss = () => {
    setIsDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // localStorage unavailable — nothing to persist, the card will just show again next visit.
    }
  };

  if (isDismissed) return null;

  const isCalibrating = answered >= threshold;
  const remaining = Math.max(threshold - answered, 0);
  const progressPercent = Math.min((answered / threshold) * 100, 100);

  return (
    <div className="mb-8">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-4 right-4 z-10 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-white/10 dark:hover:text-gray-300"
        >
          <X className="size-4" />
        </button>

        <div className="relative flex items-start gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C46B10]/15 text-[#C46B10]">
            {isCalibrating ? <Sparkles className="size-5" /> : <Award className="size-5" />}
          </span>

          <div className="min-w-0 flex-1 pr-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C46B10]">
              Next Exam Advantage
            </p>

            {isCalibrating ? (
              <>
                <h2 className="font-[family-name:var(--font-display)] mt-2 text-xl font-bold text-[#06005A] dark:text-white">
                  We&apos;re calibrating your {nextExamLabel} bank
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  You&apos;ve answered enough {fromExamLabel} questions for us to see your
                  patterns. Your {nextExamLabel} bank is now prioritizing the weak and unfinished
                  high-yield topics from your {fromExamLabel} history first &mdash; full bank,
                  nothing removed, just reordered &mdash; and it keeps refining with every new
                  answer.
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C46B10] opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#C46B10]" />
                  </span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    Calibration active
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    &middot; updated with every new answer
                  </span>
                </div>
              </>
            ) : (
              <>
                <h2 className="font-[family-name:var(--font-display)] mt-2 text-xl font-bold text-[#06005A] dark:text-white">
                  Begin calibration for your {nextExamLabel} bank
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  Your next exam question bank is calibrated to areas you struggled the most on
                  this exam. Keep practicing &mdash; we are studying your patterns and mistakes.
                </p>

                <div className="mt-5 max-w-sm">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      {answered} / {threshold} answered
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {remaining} more to begin calibration
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#C46B10] transition-[width] duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsDetailsOpen(true)}
              className="mt-5 inline-block text-xs font-medium text-[#C46B10] hover:underline"
            >
              View details &rarr;
            </button>
          </div>
        </div>

        <CalibrateBankModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          nextExamLabel={nextExamLabel}
          fromExamLabel={fromExamLabel}
          threshold={threshold}
        />
      </div>
    </div>
  );
};
