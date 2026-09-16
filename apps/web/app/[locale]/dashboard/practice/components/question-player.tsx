'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RichText } from '../../components/rich-text';
import { usePracticeContext } from '../../practice-context';
import { BookmarkButton } from './bookmark-button';
import { LabValuesModal } from './lab-values-modal';
import { NotesPanel } from './notes-panel';
import { SetProgress } from './set-progress';

const STUCK_THRESHOLD_MS = 5 * 60 * 1000;

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
  learningObjectiveId: string;
  learningObjectiveTitle: string;
  learningObjectiveSummary: string;
};
type HistoryEntry = { setNumber: number; date: string; isCorrect: boolean; explanation: string };

export const QuestionPlayer = () => {
  const [question, setQuestion] = useState<Question | null | undefined>(undefined);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isReview, setIsReview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[] | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [note, setNote] = useState('');
  const [setSize, setSetSize] = useState(5);
  const [answeredInSet, setAnsweredInSet] = useState(0);
  const { setCurrentQuestion, setIsStuck } = usePracticeContext();
  const stuckTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const armStuckTimer = useCallback(() => {
    if (stuckTimerRef.current) clearTimeout(stuckTimerRef.current);
    setIsStuck(false);
    stuckTimerRef.current = setTimeout(() => setIsStuck(true), STUCK_THRESHOLD_MS);
  }, [setIsStuck]);

  const fetchNext = useCallback(async () => {
    setError(null);
    setResult(null);
    setSelectedChoiceId(null);
    setQuestion(undefined);
    setHistory(null);
    setShowHistory(false);

    const response = await fetch('/api/practice/next');
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.error ?? 'Could not load the next question.');
      setQuestion(null);
      return;
    }

    setQuestion(data.question ?? null);
    setSessionId(data.sessionId ?? null);
    setIsReview(Boolean(data.isReview));
    setIsBookmarked(Boolean(data.isBookmarked));
    setNote(data.note ?? '');
    setSetSize(data.setSize ?? 5);
    setAnsweredInSet(data.answeredInSet ?? 0);
    setCurrentQuestion(
      data.question
        ? { system: data.question.system, objectiveTitle: data.question.objectiveTitle, stem: data.question.stem }
        : null
    );
    if (data.question) armStuckTimer();
  }, [setCurrentQuestion, armStuckTimer]);

  useEffect(() => {
    fetchNext();
    return () => {
      // Clear the AI Tutor's question context and stuck timer when leaving.
      setCurrentQuestion(null);
      setIsStuck(false);
      if (stuckTimerRef.current) clearTimeout(stuckTimerRef.current);
    };
  }, [fetchNext, setCurrentQuestion, setIsStuck]);

  const submitAnswer = async () => {
    if (!question || !selectedChoiceId || !sessionId) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/practice/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          chosenAnswerId: selectedChoiceId,
          sessionId,
          isReview,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setResult(data);
        setAnsweredInSet((n) => n + 1);
        setIsStuck(false);
        if (stuckTimerRef.current) clearTimeout(stuckTimerRef.current);
      } else {
        setError(data.error ?? 'Could not submit your answer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadHistory = async () => {
    if (!result) return;
    setShowHistory(true);
    if (history) return;
    const response = await fetch(`/api/practice/history?objectiveId=${result.learningObjectiveId}`);
    const data = await response.json().catch(() => ({ history: [] }));
    setHistory(data.history ?? []);
  };

  const actionButtons = question ? (
    <div className="flex items-center gap-2">
      <LabValuesModal />
      <BookmarkButton key={`bm-${question.id}`} questionId={question.id} initialBookmarked={isBookmarked} />
      <NotesPanel
        key={`note-${question.learningObjectiveId}`}
        learningObjectiveId={question.learningObjectiveId}
        initialContent={note}
      />
    </div>
  ) : null;

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

  const sortedResultChoices = result ? [...result.choices].sort((a, b) => a.sortOrder - b.sortOrder) : null;

  return (
    <div>
      {/* Top bar: set progress + actions, outside the question card */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <SetProgress answered={answeredInSet} setSize={setSize} />
        {actionButtons}
      </div>

      {!result && (
        <button
          type="button"
          onClick={() => setIsStuck(true)}
          className="mb-3 text-[0.65rem] font-medium text-gray-300 hover:text-gray-400 dark:text-white/10 dark:hover:text-white/30"
        >
          Simulate 5 min stuck (test)
        </button>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-[#120A2E]">
        {isReview && (
          <span className="mb-3 inline-block rounded-full bg-[#C46B10]/10 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-[#C46B10]">
            Review
          </span>
        )}
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
          {question.system} &middot; {question.objectiveTitle}
        </p>

        <RichText content={question.stem} className="mt-4 text-[#06005A] dark:text-white" />

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
              {result.isCorrect ? 'Correct.' : 'Incorrect.'} Correct Answer:{' '}
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

            <div className="mt-5 rounded-lg bg-[#F4F2FB] p-4 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                Learning objective
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {result.learningObjectiveSummary}
              </p>
            </div>

            <div className="mt-5">
              {!showHistory ? (
                <button
                  type="button"
                  onClick={loadHistory}
                  className="text-sm font-medium text-[#06005A] hover:underline dark:text-[#C46B10]"
                >
                  How you got here &rarr;
                </button>
              ) : (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                    How you got here
                  </p>
                  {history === null ? (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading…</p>
                  ) : (
                    <ol className="mt-3 flex flex-col gap-3 border-l-2 border-gray-200 pl-4 dark:border-white/10">
                      {history.map((entry, i) => (
                        <li key={entry.date + entry.setNumber}>
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            Set {entry.setNumber} &middot;{' '}
                            {new Date(entry.date).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                            })}
                            {i === history.length - 1 && (
                              <span className="ml-2 text-[#C46B10]">You are here</span>
                            )}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            {entry.explanation}
                          </p>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              )}
            </div>
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
    </div>
  );
};
