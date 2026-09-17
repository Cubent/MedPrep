'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Entry = {
  id: string;
  objectiveTitle: string;
  topic: string;
  summary: string;
  missedCount: number;
  attemptCount: number;
  isReviewed: boolean;
  updatedAt: string;
};

type Tab = 'active' | 'reviewed';
type Sort = 'missed' | 'recent';
type LoadState = 'loading' | 'locked' | 'ready';

export const StudyGuideList = () => {
  const [tab, setTab] = useState<Tab>('active');
  const [sort, setSort] = useState<Sort>('missed');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [error, setError] = useState<string | null>(null);
  const [markingId, setMarkingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const response = await fetch(`/api/study-guide?tab=${tab}&sort=${sort}`);
      const data = await response.json().catch(() => ({}));
      if (cancelled) return;
      if (!response.ok) {
        setError(data.error ?? 'Could not load your Study Guide.');
        return;
      }
      setEntries(data.entries ?? []);
      setLoadState(data.unlocked ? 'ready' : 'locked');
    })();
    return () => {
      cancelled = true;
    };
  }, [tab, sort]);

  const markReviewed = async (entryId: string) => {
    setMarkingId(entryId);
    try {
      const response = await fetch('/api/study-guide/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entryId }),
      });
      if (response.ok) {
        setEntries((prev) => prev.filter((e) => e.id !== entryId));
      }
    } finally {
      setMarkingId(null);
    }
  };

  if (error) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-700 dark:border-white/10 dark:bg-[#120A2E] dark:text-gray-300">
        {error}
      </div>
    );
  }

  if (loadState === 'loading') {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#120A2E]">
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading&hellip;</p>
      </div>
    );
  }

  if (loadState === 'locked') {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center dark:border-white/10 dark:bg-[#120A2E]">
        <img src="/MedPrep institute (7).png" alt="" className="size-48 object-contain" />
        <h2 className="font-[family-name:var(--font-display)] mt-4 text-xl font-bold text-[#06005A] dark:text-white">
          Your Study Guide isn&apos;t ready yet
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          Finish a few more practice sets and answer one review, and we&apos;ll build a guide
          straight from your own mistakes &mdash; nothing generic.
        </p>
        <Link
          href="/dashboard/practice"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#06005A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080]"
        >
          Keep practicing
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1 dark:bg-white/5">
          {(['active', 'reviewed'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                tab === t
                  ? 'bg-white text-[#06005A] shadow-sm dark:bg-[#1a1140] dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1 dark:bg-white/5">
          {(
            [
              { key: 'recent', label: 'Most recent' },
              { key: 'missed', label: 'Most missed' },
            ] as const
          ).map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setSort(option.key)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                sort === option.key
                  ? 'bg-white text-[#06005A] shadow-sm dark:bg-[#1a1140] dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Select a path to follow its chain. Mark one reviewed once you&apos;ve studied it &mdash; it
        returns if you miss it again.
      </p>

      {entries.length === 0 ? (
        tab === 'active' ? (
          <div className="mt-6 flex flex-col items-center rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center dark:border-white/10 dark:bg-[#120A2E]">
            <img src="/MedPrep institute (7).png" alt="" className="size-40 object-contain" />
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-lg font-bold text-[#06005A] dark:text-white">
              Nothing concerning right now
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Keep practicing &mdash; this fills in on its own the moment a pattern shows up in
              your misses.
            </p>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#120A2E]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You haven&apos;t marked anything reviewed yet.
            </p>
          </div>
        )
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {entries.map((entry, i) => (
            <div
              key={entry.id}
              className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#120A2E]"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#06005A]/10 text-sm font-bold text-[#06005A] dark:bg-[#C46B10]/15 dark:text-[#C46B10]">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-[#06005A] dark:text-white">{entry.topic}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Updated{' '}
                    {new Date(entry.updatedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {entry.summary}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {entry.missedCount} missed answer{entry.missedCount === 1 ? '' : 's'} &middot;{' '}
                    {entry.attemptCount} attempt{entry.attemptCount === 1 ? '' : 's'} in this path
                  </p>
                  {tab === 'active' && (
                    <button
                      type="button"
                      onClick={() => markReviewed(entry.id)}
                      disabled={markingId === entry.id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-[#06005A] hover:text-[#06005A] disabled:opacity-50 dark:border-white/10 dark:text-gray-300 dark:hover:border-[#C46B10] dark:hover:text-[#C46B10]"
                    >
                      <Check className="size-3.5" />
                      {markingId === entry.id ? 'Marking…' : 'Mark reviewed'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
