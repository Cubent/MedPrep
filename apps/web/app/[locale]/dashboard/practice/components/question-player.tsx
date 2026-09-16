'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

type Choice = { id: string; text: string; sortOrder: number };
type Question = {
  id: string;
  stem: string;
  system: string;
  objectiveTitle: string;
  choices: Choice[];
};
type AttemptResult = { isCorrect: boolean; correctAnswerId: string; explanation: string };

export const QuestionPlayer = () => {
  const [question, setQuestion] = useState<Question | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNext = useCallback(async () => {
    setError(null);
    setResult(null);
    setSelectedChoiceId(null);
    setQuestion(undefined);

    const response = await fetch('/api/practice/next');
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.error ?? 'Could not load the next question.');
      setQuestion(null);
      return;
    }

    setQuestion(data.question ?? null);
  }, []);

  useEffect(() => {
    fetchNext();
  }, [fetchNext]);

  const submitAnswer = async () => {
    if (!question || !selectedChoiceId) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/practice/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: question.id, chosenAnswerId: selectedChoiceId }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error ?? 'Could not submit your answer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (question === undefined) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#120A2E]">
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading your next question…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-white/10 dark:bg-[#120A2E]">
        <p className="text-sm text-gray-700 dark:text-gray-300">{error}</p>
        <Link
          href="/onboarding/trial"
          className="mt-4 inline-block rounded-full bg-[#06005A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0a0080]"
        >
          Go to onboarding
        </Link>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#120A2E]">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          No questions available yet for your exam &mdash; check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-[#120A2E]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
        {question.system} &middot; {question.objectiveTitle}
      </p>
      <p className="mt-4 text-[1.05rem] leading-relaxed text-[#06005A] dark:text-white">
        {question.stem}
      </p>

      <div className="mt-6 flex flex-col gap-2">
        {question.choices
          .slice()
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((choice, i) => {
            const letter = String.fromCharCode(65 + i);
            const isSelected = selectedChoiceId === choice.id;
            const isRevealedCorrect = result && choice.id === result.correctAnswerId;
            const isRevealedWrong = result && isSelected && !result.isCorrect;

            return (
              <button
                key={choice.id}
                type="button"
                disabled={Boolean(result)}
                onClick={() => setSelectedChoiceId(choice.id)}
                className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                  isRevealedCorrect
                    ? 'border-green-400 bg-green-50 text-green-900 dark:border-green-500/40 dark:bg-green-500/10 dark:text-green-300'
                    : isRevealedWrong
                      ? 'border-red-300 bg-red-50 text-red-900 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300'
                      : isSelected
                        ? 'border-[#06005A] bg-[#06005A]/5 text-[#06005A] dark:border-[#C46B10] dark:bg-[#C46B10]/10 dark:text-white'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300 dark:border-white/10 dark:text-gray-300 dark:hover:border-white/20'
                }`}
              >
                <span className="w-4 font-semibold">{letter}.</span>
                <span>{choice.text}</span>
              </button>
            );
          })}
      </div>

      {result && (
        <div
          className={`mt-5 rounded-lg px-4 py-3 text-sm ${
            result.isCorrect
              ? 'bg-green-50 text-green-900 dark:bg-green-500/10 dark:text-green-300'
              : 'bg-red-50 text-red-900 dark:bg-red-500/10 dark:text-red-300'
          }`}
        >
          <p className="font-semibold">{result.isCorrect ? 'Correct.' : 'Incorrect.'}</p>
          <p className="mt-1 leading-relaxed text-gray-700 dark:text-gray-300">
            {result.explanation}
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        {result ? (
          <button
            type="button"
            onClick={fetchNext}
            className="rounded-full bg-[#C46B10] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#a95a0d]"
          >
            Next question
          </button>
        ) : (
          <button
            type="button"
            disabled={!selectedChoiceId || isSubmitting}
            onClick={submitAnswer}
            className="rounded-full bg-[#06005A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? 'Submitting…' : 'Submit answer'}
          </button>
        )}
      </div>
    </div>
  );
};
