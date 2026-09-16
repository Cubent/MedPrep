import { TopicsInfoModal } from './components/topics-info-modal';
import { TopicsSelector } from './components/topics-selector';

const TopicsPage = () => (
  <div>
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
          Dashboard
        </p>
        <h1 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-[#06005A] dark:text-white sm:text-4xl">
          Choose your focus
        </h1>
      </div>
      <TopicsInfoModal />
    </div>
    <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
      Pick one or more systems to drill, or leave it wide open. Nothing selected means your sets
      pull from the whole exam; switching focus clears whatever&apos;s still unanswered in your
      current set.
    </p>

    <div className="mt-8 max-w-3xl">
      <TopicsSelector />
    </div>
  </div>
);

export default TopicsPage;
