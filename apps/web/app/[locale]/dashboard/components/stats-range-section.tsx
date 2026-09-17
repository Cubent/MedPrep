'use client';

import { CalendarClock } from 'lucide-react';
import { useState } from 'react';
import { DailyActivityChart } from './daily-activity-chart';

type Accuracy = { pct: number; correct: number; total: number };
type DayActivity = { date: string; correct: number; incorrect: number };
type ReviewPreview = { system: string; objectiveTitle: string; nextReviewAt: string | Date | null };

const RANGE_OPTIONS = [
  { key: '7d', label: '7d', windowLabel: 'Last 7 days' },
  { key: '14d', label: '14d', windowLabel: 'Last 14 days' },
  { key: '30d', label: '30d', windowLabel: 'Last 30 days' },
  { key: '6m', label: '6m', windowLabel: 'Last 6 months' },
] as const;

type RangeKey = (typeof RANGE_OPTIONS)[number]['key'];

const CARD_CLASS =
  'rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#120A2E]';

type Props = {
  overallAccuracy: Accuracy;
  initialRecentAccuracy: Accuracy;
  initialDailyActivity: DayActivity[];
  examCoverage: { pct: number; seenCount: number; totalObjectives: number };
  upcomingReviews: number;
  upcomingReviewsPreview: ReviewPreview[];
};

export const StatsRangeSection = ({
  overallAccuracy,
  initialRecentAccuracy,
  initialDailyActivity,
  examCoverage,
  upcomingReviews,
  upcomingReviewsPreview,
}: Props) => {
  const [range, setRange] = useState<RangeKey>('7d');
  const [recentAccuracy, setRecentAccuracy] = useState(initialRecentAccuracy);
  const [dailyActivity, setDailyActivity] = useState(initialDailyActivity);
  const [isLoading, setIsLoading] = useState(false);

  const activeOption = RANGE_OPTIONS.find((o) => o.key === range)!;
  const coverageSquares = Math.round(examCoverage.pct);

  const selectRange = async (key: RangeKey) => {
    if (key === range) return;
    setRange(key);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/dashboard/stats-range?range=${key}`);
      const data = await response.json().catch(() => null);
      if (response.ok && data) {
        setRecentAccuracy(data.recentAccuracy);
        setDailyActivity(data.dailyActivity);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1 dark:bg-white/5">
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => selectRange(option.key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                option.key === range
                  ? 'bg-white text-[#06005A] shadow-sm dark:bg-[#1a1140] dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-6 lg:grid-cols-2">
        {/* Accuracy */}
        <div className={`${CARD_CLASS} flex items-center gap-6 transition-opacity ${isLoading ? 'opacity-60' : ''}`}>
          <svg viewBox="0 0 100 100" className="size-24 shrink-0 -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-gray-200 dark:text-white/10"
            />
            {overallAccuracy.total > 0 && (
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#06005A"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(overallAccuracy.pct / 100) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
              />
            )}
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              transform="rotate(90 50 50)"
              className="fill-[#06005A] text-[1.4rem] font-bold dark:fill-white"
            >
              {overallAccuracy.pct}%
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
                <span className="font-semibold text-[#06005A] dark:text-white">
                  {overallAccuracy.pct}% &middot; {overallAccuracy.correct}/{overallAccuracy.total}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-gray-300 dark:bg-white/30" />
                <span className="text-gray-600 dark:text-gray-300">{activeOption.windowLabel}</span>
                <span className="font-semibold text-[#06005A] dark:text-white">
                  {recentAccuracy.pct}% &middot; {recentAccuracy.correct}/{recentAccuracy.total}
                </span>
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
                  className={`size-2.5 rounded-[2px] ${
                    i < coverageSquares ? 'bg-[#06005A] dark:bg-[#C46B10]' : 'bg-gray-200 dark:bg-white/10'
                  }`}
                />
              ))}
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                Exam coverage
              </p>
              <p className="mt-2 text-3xl font-bold text-[#06005A] dark:text-white">{examCoverage.pct}%</p>
              <p className="mt-2 max-w-[12rem] text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                {examCoverage.seenCount} of {examCoverage.totalObjectives} objectives seen. Each square is 1% of the
                exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Daily activity */}
        <div className={`${CARD_CLASS} transition-opacity ${isLoading ? 'opacity-60' : ''}`}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#06005A] dark:text-white">Daily activity</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{activeOption.windowLabel}</p>
          </div>
          <div className="mt-8">
            <DailyActivityChart days={dailyActivity} />
          </div>
        </div>

        {/* Upcoming reviews */}
        <div className={CARD_CLASS}>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            <CalendarClock className="size-3.5" />
            Upcoming reviews
          </p>
          <p className="mt-2 text-3xl font-bold text-[#06005A] dark:text-white">{upcomingReviews}</p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Scheduled over the next 7 days</p>

          {upcomingReviewsPreview.length > 0 && (
            <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3 dark:border-white/5">
              {upcomingReviewsPreview.map((review, i) => (
                <div key={i} className="flex items-center justify-between gap-2 text-xs">
                  <span className="truncate text-gray-700 dark:text-gray-300">
                    {review.system} &middot; {review.objectiveTitle}
                  </span>
                  <span className="shrink-0 text-gray-400 dark:text-gray-500">
                    {review.nextReviewAt &&
                      new Date(review.nextReviewAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
