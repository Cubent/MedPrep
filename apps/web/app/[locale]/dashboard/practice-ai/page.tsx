import { AiPracticePlayer } from './components/ai-practice-player';

const PracticeAiPage = () => (
  <div>
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
        Dashboard
      </p>
      <h1 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-[#06005A] dark:text-white sm:text-4xl">
        AI Practice
        <span className="ml-2 align-middle text-sm font-semibold text-[#C46B10]">Beta</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        Generate a fresh, comprehensive 5-question set on demand, written live by AI on any topic you choose.
      </p>
    </div>

    <div className="mx-auto mt-8 max-w-3xl">
      <AiPracticePlayer />
    </div>
  </div>
);

export default PracticeAiPage;
