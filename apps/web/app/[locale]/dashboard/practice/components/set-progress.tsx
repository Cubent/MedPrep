'use client';

import { Check, X } from 'lucide-react';

export const SetProgress = ({ results, setSize }: { results: (boolean | null)[]; setSize: number }) => {
  const slots = Math.max(results.length, setSize);
  const answeredCount = results.filter((r) => r !== null).length;
  const currentIndex = results.findIndex((r) => r === null);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: slots }).map((_, i) => {
          const result = results[i] ?? null;
          const isCurrent = currentIndex === -1 ? i === answeredCount : i === currentIndex;

          return (
            <div
              key={i}
              className={`flex size-6 items-center justify-center rounded-full border-2 text-[0.65rem] font-bold transition-all duration-300 ${
                result === true
                  ? 'border-green-500 bg-green-500 text-white'
                  : result === false
                    ? 'border-red-500 bg-red-500 text-white'
                    : isCurrent
                      ? 'scale-110 border-[#06005A] text-[#06005A] dark:border-[#C46B10] dark:text-[#C46B10]'
                      : 'border-gray-200 text-gray-300 dark:border-white/15 dark:text-white/20'
              }`}
            >
              {result === true ? (
                <Check className="size-3.5" />
              ) : result === false ? (
                <X className="size-3.5" />
              ) : (
                i + 1
              )}
            </div>
          );
        })}
      </div>
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
        {Math.min(answeredCount, slots)}/{slots} answered
      </span>
    </div>
  );
};
