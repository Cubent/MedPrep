import { QuestionPlayer } from './components/question-player';

const PracticePage = () => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
      Dashboard
    </p>
    <h1 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-[#06005A] dark:text-white sm:text-4xl">
      Practice
    </h1>
    <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
      Answer the next question in your queue &mdash; due reviews first, then new material.
    </p>

    <div className="mt-8 max-w-2xl">
      <QuestionPlayer />
    </div>
  </div>
);

export default PracticePage;
