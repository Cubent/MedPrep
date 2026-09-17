import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { getDashboardAnalytics } from '@repo/database/qbank';
import Link from 'next/link';
import { StatsRangeSection } from './stats-range-section';

const CARD_CLASS =
  'rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#120A2E]';

export const DashboardStatsPreview = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const preference = await database.userPreference.findUnique({ where: { clerkUserId: userId } });
  if (!preference) return null;

  const stats = await getDashboardAnalytics(userId, preference.exam);

  return (
    <div className="mt-10">
      <StatsRangeSection
        overallAccuracy={stats.overallAccuracy}
        initialRecentAccuracy={stats.last7DaysAccuracy}
        initialDailyActivity={stats.dailyActivity}
        examCoverage={stats.examCoverage}
        upcomingReviews={stats.upcomingReviews}
        upcomingReviewsPreview={stats.upcomingReviewsPreview}
      />

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
