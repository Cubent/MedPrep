'use client';

import { Check, X } from 'lucide-react';

type SummaryQuestion = {
  isCorrect: boolean;
  isReview: boolean;
  stem: string;
  system: string;
  objectiveTitle: string;
};

type SetSummaryData = {
  correctCount: number;
  total: number;
  questions: SummaryQuestion[];
};

const firstSentence = (stem: string) => {
  const withoutTable = stem.split(/\n\s*\|/)[0];
  const plain = withoutTable.replace(/\n+/g, ' ').trim();
  const match = plain.match(/^.*?[.!?](?=\s|$)/);
  return (match ? match[0] : plain).slice(0, 160);
};

type SetSummaryProps = {
  summary: SetSummaryData;
  onStartNext: () => void;
};

export const SetSummary = ({ summary, onStartNext }: SetSummaryProps) => {
  const { correctCount, total, questions } = summary;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-[#120A2E]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
        Set complete
      </p>
      <h2 className="font-[family-name:var(--font-display)] mt-2 text-2xl font-bold text-[#06005A] dark:text-white">
        {correctCount} / {total} correct
      </h2>

      <div className="mt-6 flex flex-col gap-2">
        {questions.map((q, i) => (
          <div
            key={`${q.objectiveTitle}-${i}`}
            className="flex items-start gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-white/10"
          >
            <span
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                q.isCorrect
                  ? 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400'
              }`}
            >
              {q.isCorrect ? <Check className="size-3" /> : <X className="size-3" />}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                {q.system} &middot; {q.objectiveTitle}
                {q.isReview && (
                  <span className="ml-2 rounded-full bg-[#C46B10]/10 px-2 py-0.5 text-[0.6rem] font-bold tracking-wide text-[#C46B10]">
                    Review
                  </span>
                )}
              </p>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{firstSentence(q.stem)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onStartNext}
          className="rounded-full bg-[#C46B10] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#a95a0d]"
        >
          Start next set
        </button>
      </div>
    </div>
  );
};
