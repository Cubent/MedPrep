'use client';

import { useCallback, useEffect, useState } from 'react';
import { RichText } from '../../components/rich-text';
import { SetProgress } from '../../practice/components/set-progress';
import { SetSummary } from '../../practice/components/set-summary';

type Choice = { id: string; text: string; sortOrder: number };
type Question = {
  id: string;
  stem: string;
  system: string;
  objectiveTitle: string;
  learningObjectiveId: string;
  choices: Choice[];
};
type ResultChoice = { id: string; text: string; isCorrect: boolean; explanation: string | null; sortOrder: number };
type AttemptResult = {
  isCorrect: boolean;
  correctAnswerId: string;
  explanation: string;
  choices: ResultChoice[];
  isSetComplete?: boolean;
};
type Discipline = { discipline: string; count: number };
type SetSummaryData = {
  correctCount: number;
  total: number;
  questions: { isCorrect: boolean; isReview: boolean; stem: string; system: string; objectiveTitle: string }[];
};

export const AiPracticePlayer = () => {
  const [disciplines, setDisciplines] = useState<Discipline[] | null>(null);
  const [discipline, setDiscipline] = useState<string>('');
  const [hasStarted, setHasStarted] = useState(false);
  const [question, setQuestion] = useState<Question | null | undefined>(undefined);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isReview, setIsReview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [setSize, setSetSize] = useState(5);
  const [answeredInSet, setAnsweredInSet] = useState(0);
  const [setSummary, setSetSummary] = useState<SetSummaryData | null>(null);

  useEffect(() => {
    fetch('/api/practice-ai/disciplines')
      .then((r) => r.json())
      .then((data) => setDisciplines(data.disciplines ?? []))
      .catch(() => setDisciplines([]));
  }, []);

  const fetchNext = useCallback(async () => {
    setError(null);
    setResult(null);
    setSelectedChoiceId(null);
    setQuestion(undefined);
    setSetSummary(null);
    setHasStarted(true);

    const query = discipline ? `?discipline=${encodeURIComponent(discipline)}` : '';
    const response = await fetch(`/api/practice-ai/next${query}`);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.error ?? 'Could not load the next question.');
      setQuestion(null);
      return;
    }

    setQuestion(data.question ?? null);
    setSessionId(data.sessionId ?? null);
    setIsReview(Boolean(data.isReview));
    setSetSize(data.setSize ?? 5);
    setAnsweredInSet(data.answeredInSet ?? 0);
  }, [discipline]);

  const submitAnswer = async () => {
    if (!question || !selectedChoiceId || !sessionId) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/practice-ai/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: question.id, chosenAnswerId: selectedChoiceId, sessionId, isReview }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setResult(data);
        setAnsweredInSet((n) => n + 1);
      } else {
        setError(data.error ?? 'Could not submit your answer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (result?.isSetComplete && sessionId) {
      const response = await fetch(`/api/practice-ai/session-summary?sessionId=${sessionId}`);
      const data = await response.json().catch(() => null);
      if (response.ok && data) {
        setSetSummary(data);
        return;
      }
    }
    fetchNext();
  };

  const sortedResultChoices = result ? [...result.choices].sort((a, b) => a.sortOrder - b.sortOrder) : null;

  if (setSummary) {
    return <SetSummary summary={setSummary} onStartNext={fetchNext} />;
  }

  if (!hasStarted) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-[#120A2E]">
        <p className="text-sm font-semibold text-[#06005A] dark:text-white">Pick a focus (optional)</p>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          These questions are written live by AI and are <span className="font-semibold">not physician-reviewed</span>{' '}
          — an experimental way to drill extra practice, not a substitute for the reviewed question bank.
        </p>
        <select
          value={discipline}
          onChange={(e) => setDiscipline(e.target.value)}
          className="mt-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-[#06005A] focus:border-[#06005A] focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          <option value="">All AI topics{disciplines ? ` (${disciplines.reduce((s, d) => s + d.count, 0)})` : ''}</option>
          {disciplines?.map((d) => (
            <option key={d.discipline} value={d.discipline}>
              {d.discipline} ({d.count})
            </option>
          ))}
        </select>
        {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
        <button
          type="button"
          onClick={fetchNext}
          className="mt-4 rounded-full bg-[#06005A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080]"
        >
          Start a set of 5
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-white/10 dark:bg-[#120A2E]">
        <p className="text-sm text-gray-700 dark:text-gray-300">{error}</p>
        <button
          type="button"
          onClick={() => setHasStarted(false)}
          className="mt-4 rounded-full bg-[#06005A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0a0080]"
        >
          Back
        </button>
      </div>
    );
  }

  if (question === undefined) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#120A2E]">
        <p className="text-sm text-gray-500 dark:text-gray-400">The AI is writing your next question…</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#120A2E]">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          No AI topics available for this focus yet &mdash; try "All AI topics" instead.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <SetProgress answered={answeredInSet} setSize={setSize} />
        <span className="rounded-full bg-[#06005A]/10 px-2.5 py-1 text-xs font-bold tracking-wide text-[#06005A] dark:bg-[#C46B10]/15 dark:text-[#C46B10]">
          AI-generated &middot; not reviewed
        </span>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-[#120A2E]">
        {isReview && (
          <span className="mb-3 inline-block rounded-full bg-[#C46B10]/10 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-[#C46B10]">
            Review
          </span>
        )}

        <RichText content={question.stem} className="text-[#06005A] dark:text-white" />

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

        {result && sortedResultChoices && (
          <div className="mt-6 border-t border-gray-200 pt-6 dark:border-white/10">
            <p className={`text-sm font-bold ${result.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
              {result.isCorrect ? 'Correct.' : 'Incorrect.'} Correct answer:{' '}
              {String.fromCharCode(65 + sortedResultChoices.findIndex((c) => c.id === result.correctAnswerId))} &mdash;{' '}
              {sortedResultChoices.find((c) => c.id === result.correctAnswerId)?.text}
            </p>

            <RichText content={result.explanation} className="mt-3 text-gray-700 dark:text-gray-300" />

            <div className="mt-4 flex flex-col gap-2">
              {sortedResultChoices
                .filter((c) => !c.isCorrect && c.explanation)
                .map((c) => (
                  <p key={c.id} className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      ({String.fromCharCode(65 + sortedResultChoices.findIndex((x) => x.id === c.id))})
                    </span>{' '}
                    {c.explanation}
                  </p>
                ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {result ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-[#C46B10] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#a95a0d]"
            >
              {result.isSetComplete ? 'View set results' : 'Next question'}
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
    </div>
  );
};
