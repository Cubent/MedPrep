import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { getAttemptHistory } from '@repo/database/qbank';
import { HistoryList } from './components/history-list';

const HistoryPage = async () => {
  const { userId } = await auth();
  const preference = userId
    ? await database.userPreference.findUnique({ where: { clerkUserId: userId } })
    : null;

  const entries = preference && userId ? await getAttemptHistory(userId, preference.exam) : [];

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
        Dashboard
      </p>
      <h1 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-[#06005A] dark:text-white sm:text-4xl">
        History
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        Every question you&apos;ve answered, with what you got right, what you missed, and
        anything you&apos;ve bookmarked along the way.
      </p>

      <div className="mt-8 max-w-2xl">
        <HistoryList
          entries={entries.map((e) => ({ ...e, attemptedAt: e.attemptedAt.toISOString() }))}
        />
      </div>
    </div>
  );
};

export default HistoryPage;
