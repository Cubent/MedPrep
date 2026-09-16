import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { getReviewCalendar } from '@repo/database/qbank';
import { RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { ReviewCalendar } from '../components/review-calendar';

const ReviewPage = async () => {
  const { userId } = await auth();
  const preference = userId
    ? await database.userPreference.findUnique({ where: { clerkUserId: userId } })
    : null;

  const dueCount = preference
    ? await database.userObjectiveProgress.count({
        where: {
          clerkUserId: userId!,
          nextReviewAt: { lte: new Date() },
          learningObjective: { examType: preference.exam },
        },
      })
    : 0;

  const calendarEntries = preference ? await getReviewCalendar(userId!, preference.exam) : [];

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
        Dashboard
      </p>
      <h1 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-[#06005A] dark:text-white sm:text-4xl">
        Review
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        Reviews are variations on questions you missed, resurfaced right before you&apos;d forget
        them. They&apos;re mixed automatically into your next practice set &mdash; no separate
        queue to manage.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#120A2E] sm:p-8">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
          <RotateCcw className="size-3.5" />
          Due now
        </p>
        <p className="mt-2 text-3xl font-bold text-[#06005A] dark:text-white">{dueCount}</p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {dueCount > 0
            ? "You'll see these mixed into your next practice set automatically."
            : "You're all caught up. Keep practicing to build your review queue."}
        </p>

        <Link
          href="/dashboard/practice"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#06005A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080]"
        >
          Practice now
        </Link>
      </div>

      <div className="mt-6 max-w-md">
        <ReviewCalendar entries={calendarEntries} />
      </div>
    </div>
  );
};

export default ReviewPage;
