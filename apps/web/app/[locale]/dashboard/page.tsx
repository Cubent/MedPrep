import { currentUser } from '@clerk/nextjs/server';
import { DashboardStatsPreview } from './components/dashboard-stats-preview';

const DashboardOverviewPage = async () => {
  const user = await currentUser();
  const firstName = user?.firstName ?? 'there';

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
        Dashboard
      </p>
      <h1 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-[#06005A] dark:text-white sm:text-4xl">
        Welcome back, {firstName}!
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        Your question bank is being set up. This is where your daily sets, progress, and
        spaced-repetition review will live once the bank goes live.
      </p>

      <DashboardStatsPreview />
    </div>
  );
};

export default DashboardOverviewPage;
