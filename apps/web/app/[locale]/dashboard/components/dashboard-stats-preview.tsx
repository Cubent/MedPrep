import { CalendarClock, Lock } from 'lucide-react';

const TOPICS = [
  'Cardiology',
  'Neurology',
  'Gastroenterology & hepatology',
  'Hematology',
  'Infectious diseases',
];

const CARD_CLASS =
  'rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#120A2E]';

export const DashboardStatsPreview = () => (
  <div className="mt-10">
    <div className="flex items-center gap-2 rounded-lg bg-[#06005A]/5 px-4 py-2.5 text-sm text-[#06005A] dark:bg-white/5 dark:text-gray-300">
      <span className="font-semibold">Preview.</span>
      <span>
        This is what your stats will look like &mdash; we&apos;ll make it interactive once your
        question bank goes live.
      </span>
    </div>

    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      {/* Accuracy */}
      <div className={`${CARD_CLASS} flex items-center gap-6`}>
        <svg viewBox="0 0 100 100" className="size-24 shrink-0">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-gray-200 dark:text-white/10"
          />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-[#06005A] text-[1.4rem] font-bold dark:fill-white"
          >
            0%
          </text>
        </svg>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            Accuracy
          </p>
          <div className="mt-3 space-y-1.5 text-sm">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#06005A] dark:bg-white" />
              <span className="text-gray-600 dark:text-gray-300">Overall</span>
              <span className="font-semibold text-[#06005A] dark:text-white">0% &middot; 0/0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-gray-300 dark:bg-white/30" />
              <span className="text-gray-600 dark:text-gray-300">Last 7 days</span>
              <span className="font-semibold text-[#06005A] dark:text-white">0% &middot; 0/0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exam coverage */}
      <div className={CARD_CLASS}>
        <div className="flex items-start justify-between gap-4">
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: 100 }).map((_, i) => (
              <span
                key={i}
                className="size-2.5 rounded-[2px] bg-gray-200 dark:bg-white/10"
              />
            ))}
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
              Exam coverage
            </p>
            <p className="mt-2 text-3xl font-bold text-[#06005A] dark:text-white">0%</p>
            <p className="mt-2 max-w-[12rem] text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              0 of 2,323 objectives seen. Each square is 1% of the exam.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      {/* Daily activity */}
      <div className={CARD_CLASS}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#06005A] dark:text-white">Daily activity</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Last 30 days</p>
        </div>
        <div className="mt-8 flex items-end gap-1">
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className="h-0.5 flex-1 rounded-full bg-gray-200 dark:bg-white/10" />
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          No activity yet
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Upcoming reviews */}
        <div className={CARD_CLASS}>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            <CalendarClock className="size-3.5" />
            Upcoming reviews
          </p>
          <p className="mt-2 text-3xl font-bold text-[#06005A] dark:text-white">0</p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Scheduled over the next 7 days
          </p>
        </div>

        {/* Study guide */}
        <div className={CARD_CLASS}>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            <Lock className="size-3.5" />
            Study guide
          </p>
          <p className="mt-2 text-xl font-bold text-[#06005A] dark:text-white">Locked</p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Complete a few sets to unlock
          </p>
        </div>
      </div>
    </div>

    {/* Topic accuracy */}
    <div className={`${CARD_CLASS} mt-6`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#06005A] dark:text-white">Topic accuracy</p>
        <span className="text-sm font-medium text-gray-300 dark:text-white/20">
          Focus topics &rarr;
        </span>
      </div>
      <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {TOPICS.map((topic) => (
          <div key={topic}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#06005A] dark:text-white">{topic}</span>
              <span className="text-gray-500 dark:text-gray-400">Not started</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-gray-100 dark:bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
