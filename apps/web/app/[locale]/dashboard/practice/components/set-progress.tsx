'use client';

import { Check } from 'lucide-react';

export const SetProgress = ({ answered, setSize }: { answered: number; setSize: number }) => (
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-1.5">
      {Array.from({ length: setSize }).map((_, i) => {
        const isDone = i < answered;
        const isCurrent = i === answered;
        return (
          <div
            key={i}
            className={`flex size-6 items-center justify-center rounded-full border-2 text-[0.65rem] font-bold transition-all duration-300 ${
              isDone
                ? 'border-green-500 bg-green-500 text-white'
                : isCurrent
                  ? 'scale-110 border-[#06005A] text-[#06005A] dark:border-[#C46B10] dark:text-[#C46B10]'
                  : 'border-gray-200 text-gray-300 dark:border-white/15 dark:text-white/20'
            }`}
          >
            {isDone ? <Check className="size-3.5" /> : i + 1}
          </div>
        );
      })}
    </div>
    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
      {Math.min(answered, setSize)}/{setSize} answered
    </span>
  </div>
);
