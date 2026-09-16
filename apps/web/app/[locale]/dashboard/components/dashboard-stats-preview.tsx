import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { getDashboardAnalytics } from '@repo/database/qbank';
import { CalendarClock } from 'lucide-react';
import Link from 'next/link';
import { DailyActivityChart } from './daily-activity-chart';

const CARD_CLASS =
  'rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#120A2E]';

export const DashboardStatsPreview = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const preference = await database.userPreference.findUnique({ where: { clerkUserId: userId } });
  if (!preference) return null;

  const stats = await getDashboardAnalytics(userId, preference.exam);
  const coverageSquares = Math.round(stats.examCoverage.pct);

  return (
    <div className="mt-10">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Accuracy */}
        <div className={`${CARD_CLASS} flex items-center gap-6`}>
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
            {stats.overallAccuracy.total > 0 && (
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#06005A"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(stats.overallAccuracy.pct / 100) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
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
              {stats.overallAccuracy.pct}%
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
                  {stats.overallAccuracy.pct}% &middot; {stats.overallAccuracy.correct}/
                  {stats.overallAccuracy.total}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-gray-300 dark:bg-white/30" />
                <span className="text-gray-600 dark:text-gray-300">Last 7 days</span>
                <span className="font-semibold text-[#06005A] dark:text-white">
                  {stats.last7DaysAccuracy.pct}% &middot; {stats.last7DaysAccuracy.correct}/
                  {stats.last7DaysAccuracy.total}
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
                    i < coverageSquares
                      ? 'bg-[#06005A] dark:bg-[#C46B10]'
                      : 'bg-gray-200 dark:bg-white/10'
                  }`}
                />
              ))}
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                Exam coverage
              </p>
              <p className="mt-2 text-3xl font-bold text-[#06005A] dark:text-white">
                {stats.examCoverage.pct}%
              </p>
              <p className="mt-2 max-w-[12rem] text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                {stats.examCoverage.seenCount} of {stats.examCoverage.totalObjectives} objectives
                seen. Each square is 1% of the exam.
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
            <p className="text-xs text-gray-500 dark:text-gray-400">Last 14 days</p>
          </div>
          <div className="mt-8">
            <DailyActivityChart days={stats.dailyActivity} />
          </div>
        </div>

        {/* Upcoming reviews */}
        <div className={CARD_CLASS}>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            <CalendarClock className="size-3.5" />
            Upcoming reviews
          </p>
          <p className="mt-2 text-3xl font-bold text-[#06005A] dark:text-white">
            {stats.upcomingReviews}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Scheduled over the next 7 days
          </p>

          {stats.upcomingReviewsPreview.length > 0 && (
            <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3 dark:border-white/5">
              {stats.upcomingReviewsPreview.map((review, i) => (
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

      {/* Topic accuracy */}
      <div className={`${CARD_CLASS} mt-6`}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#06005A] dark:text-white">Topic accuracy</p>
          <Link
            href="/dashboard/topics"
            className="text-sm font-medium text-[#06005A] hover:underline dark:text-[#C46B10]"
          >
            Focus topics &rarr;
          </Link>
        </div>
        <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {stats.topicAccuracy.map((topic) => (
            <div key={topic.systemName}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#06005A] dark:text-white">{topic.systemName}</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {topic.started
                    ? `${topic.accuracyPct}% correct · ${topic.seenObjectives}/${topic.totalObjectives} seen`
                    : 'Not started'}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                <div
                  className={`h-full rounded-full ${topic.accuracyPct >= 50 ? 'bg-green-500' : 'bg-[#C46B10]'}`}
                  style={{
                    width: `${topic.totalObjectives ? (topic.seenObjectives / topic.totalObjectives) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
