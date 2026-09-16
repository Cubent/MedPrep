'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

type ReviewEntry = { date: string; system: string; objectiveTitle: string };

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const dayKey = (d: Date) => d.toDateString();

export const ReviewCalendar = ({ entries }: { entries: ReviewEntry[] }) => {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const entriesByDay = useMemo(() => {
    const map = new Map<string, ReviewEntry[]>();
    for (const entry of entries) {
      const key = dayKey(new Date(entry.date));
      map.set(key, [...(map.get(key) ?? []), entry]);
    }
    return map;
  }, [entries]);

  const monthLabel = cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = firstOfMonth.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    return days;
  }, [cursor]);

  const selectedEntries = selectedDay ? (entriesByDay.get(selectedDay) ?? []) : [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#120A2E] sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#06005A] dark:text-white">{monthLabel}</p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => {
              setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
              setSelectedDay(null);
            }}
            className="flex size-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => {
              setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));
              setSelectedDay(null);
            }}
            className="flex size-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[0.65rem] font-semibold uppercase text-gray-400 dark:text-gray-500">
        {WEEKDAY_LABELS.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;

          const key = dayKey(date);
          const dueCount = entriesByDay.get(key)?.length ?? 0;
          const isToday = key === dayKey(today);
          const isSelected = key === selectedDay;

          return (
            <button
              key={key}
              type="button"
              disabled={dueCount === 0}
              onClick={() => setSelectedDay((d) => (d === key ? null : key))}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-lg text-xs transition-colors ${
                isSelected
                  ? 'bg-[#06005A] text-white dark:bg-[#C46B10]'
                  : isToday
                    ? 'border-2 border-[#06005A] font-semibold text-[#06005A] dark:border-[#C46B10] dark:text-[#C46B10]'
                    : dueCount > 0
                      ? 'text-[#06005A] hover:bg-[#06005A]/5 dark:text-white dark:hover:bg-white/5'
                      : 'text-gray-400 dark:text-gray-600'
              }`}
            >
              {date.getDate()}
              {dueCount > 0 && !isSelected && (
                <span className="absolute bottom-1 size-1 rounded-full bg-[#C46B10]" />
              )}
            </button>
          );
        })}
      </div>

      {selectedDay && selectedEntries.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-4 dark:border-white/5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            Due {new Date(selectedDay).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </p>
          <div className="mt-2 flex flex-col gap-1.5">
            {selectedEntries.map((entry, i) => (
              <p key={i} className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium text-[#06005A] dark:text-white">{entry.system}</span>{' '}
                &middot; {entry.objectiveTitle}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
