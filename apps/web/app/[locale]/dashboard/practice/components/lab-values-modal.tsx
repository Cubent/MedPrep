'use client';

import { FlaskConical, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { LAB_VALUES } from './lab-values-data';

export const LabValuesModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LAB_VALUES;

    return LAB_VALUES.map((category) => ({
      ...category,
      sections: category.sections
        .map((section) => ({
          ...section,
          rows: section.rows.filter((row) => row.test.toLowerCase().includes(q)),
        }))
        .filter((section) => section.rows.length > 0),
    })).filter((category) => category.sections.length > 0);
  }, [query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 rounded-full bg-[#06005A] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#0a0080]"
      >
        <FlaskConical className="size-3.5" />
        Lab values
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 py-8 sm:py-12"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="flex max-h-full w-full max-w-2xl flex-col rounded-2xl bg-white shadow-xl dark:bg-[#120A2E]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-white/10">
              <p className="text-sm font-semibold text-[#06005A] dark:text-white">
                Reference: Lab Values
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="flex size-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="border-b border-gray-200 px-5 py-3 dark:border-white/10">
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 dark:border-white/15">
                <Search className="size-4 text-gray-400" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a lab test…"
                  className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-200"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {filtered.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No lab test matches &ldquo;{query}&rdquo;.
                </p>
              ) : (
                filtered.map((category) => (
                  <div key={category.title} className="mb-6 last:mb-0">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#06005A] dark:text-[#C46B10]">
                      {category.title}
                    </p>
                    {category.sections.map((section) => (
                      <div key={section.title} className="mt-3">
                        {section.title !== category.title.split(' — ')[0] && (
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            {section.title}
                          </p>
                        )}
                        <table className="mt-1.5 w-full text-sm">
                          <tbody>
                            {section.rows.map((row) => (
                              <tr
                                key={row.test}
                                className="border-b border-gray-100 last:border-0 dark:border-white/5"
                              >
                                <td className="py-1.5 pr-3 text-gray-700 dark:text-gray-300">
                                  {row.test}
                                </td>
                                <td className="py-1.5 text-right font-medium text-[#06005A] dark:text-white">
                                  {row.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
