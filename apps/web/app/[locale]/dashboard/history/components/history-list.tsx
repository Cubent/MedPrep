'use client';

import { Bookmark, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { RichText } from '../../components/rich-text';

type Choice = { id: string; text: string; isCorrect: boolean; explanation: string | null };
type HistoryEntry = {
  id: string;
  isCorrect: boolean;
  isReview: boolean;
  attemptedAt: string;
  isBookmarked: boolean;
  system: string;
  objectiveTitle: string;
  objectiveSummary: string;
  stem: string;
  explanation: string;
  chosenAnswerId: string | null;
  choices: Choice[];
};

type Filter = 'all' | 'correct' | 'incorrect' | 'bookmarked';

const firstSentence = (stem: string) => {
  const withoutTable = stem.split(/\n\s*\|/)[0];
  const plain = withoutTable.replace(/\n+/g, ' ').trim();
  const match = plain.match(/^.*?[.!?](?=\s|$)/);
  return (match ? match[0] : plain).slice(0, 160);
};

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'correct', label: 'Correct' },
  { key: 'incorrect', label: 'Incorrect' },
  { key: 'bookmarked', label: 'Bookmarked' },
];

export const HistoryList = ({ entries }: { entries: HistoryEntry[] }) => {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<HistoryEntry | null>(null);

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      if (filter === 'correct' && !entry.isCorrect) return false;
      if (filter === 'incorrect' && entry.isCorrect) return false;
      if (filter === 'bookmarked' && !entry.isBookmarked) return false;
      if (query.trim() && !entry.stem.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [entries, filter, query]);

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#120A2E]">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No questions answered yet &mdash; your history will show up here.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 dark:border-white/15 sm:max-w-xs">
          <Search className="size-4 shrink-0 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-200"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === f.key
                  ? 'bg-[#06005A] text-white'
                  : 'border border-gray-200 text-gray-600 hover:border-gray-300 dark:border-white/15 dark:text-gray-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="mt-5 flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white dark:divide-white/5 dark:border-white/10 dark:bg-[#120A2E]">
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
            No questions match your search/filter.
          </p>
        ) : (
          filtered.map((entry) => {
            const date = new Date(entry.attemptedAt);
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setSelected(entry)}
                className="flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/5 sm:px-6"
              >
                <span
                  className={`size-2 shrink-0 rounded-full ${entry.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[#06005A] dark:text-white">
                    {firstSentence(entry.stem)}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {entry.system} &middot;{' '}
                    {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at{' '}
                    {date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
                {entry.isBookmarked && (
                  <Bookmark className="size-4 shrink-0 fill-current text-[#C46B10]" />
                )}
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${
                    entry.isCorrect
                      ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                      : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                  }`}
                >
                  {entry.isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </button>
            );
          })
        )}
      </div>

      {/* Detail popup */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-8 sm:py-12"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white shadow-xl dark:bg-[#120A2E]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${
                    selected.isCorrect
                      ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                      : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                  }`}
                >
                  {selected.isCorrect ? 'Correct' : 'Incorrect'}
                </span>
                {selected.isBookmarked && (
                  <Bookmark className="size-4 fill-current text-[#C46B10]" />
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="flex size-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto px-5 py-5 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                {selected.system} &middot; {selected.objectiveTitle}
              </p>

              <RichText content={selected.stem} className="mt-3 text-[#06005A] dark:text-white" />

              <div className="mt-5 flex flex-col gap-2">
                {selected.choices.map((choice, i) => {
                  const letter = String.fromCharCode(65 + i);
                  const isChosen = selected.chosenAnswerId === choice.id;
                  return (
                    <div
                      key={choice.id}
                      className={`rounded-lg border px-4 py-2.5 text-sm ${
                        choice.isCorrect
                          ? 'border-green-400 bg-green-50 text-green-900 dark:border-green-500/40 dark:bg-green-500/10 dark:text-green-300'
                          : isChosen
                            ? 'border-red-300 bg-red-50 text-red-900 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300'
                            : 'border-gray-200 text-gray-700 dark:border-white/10 dark:text-gray-300'
                      }`}
                    >
                      <span className="font-semibold">{letter}.</span> {choice.text}
                      {isChosen && !choice.isCorrect && (
                        <span className="ml-2 text-xs font-semibold uppercase tracking-wide">
                          Your answer
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <RichText content={selected.explanation} className="mt-5 text-gray-700 dark:text-gray-300" />

              <div className="mt-4 flex flex-col gap-2">
                {selected.choices
                  .filter((c) => !c.isCorrect && c.explanation)
                  .map((c, i) => (
                    <p key={c.id} className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        ({String.fromCharCode(65 + selected.choices.findIndex((x) => x.id === c.id))})
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
                  {selected.objectiveSummary}
                </p>
              </div>

              <p className="mt-5 text-xs text-gray-400 dark:text-gray-500">
                Answered{' '}
                {new Date(selected.attemptedAt).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
                {selected.isReview && ' · Review'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
