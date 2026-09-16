'use client';

import { Layers, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'medprep-topics-info-dismissed';

export const TopicsInfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== 'true') setIsOpen(true);
    } catch {
      setIsOpen(true);
    }
  }, []);

  const close = () => {
    setIsOpen(false);
    if (dontShowAgain) {
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // localStorage unavailable — nothing to persist, the modal will just reopen next visit.
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-sm font-medium text-[#06005A] hover:underline dark:text-[#C46B10]"
      >
        How focus works
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4"
          onClick={close}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-[#120A2E]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#06005A]/10 text-[#06005A] dark:bg-[#C46B10]/15 dark:text-[#C46B10]">
                  <Layers className="size-4" />
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#06005A] dark:text-white">
                  How topic focus works
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex size-7 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <p>
                Narrowing in on a few systems is especially handy mid-clerkship or right before a
                shelf exam &mdash; it lets your daily practice track whatever you&apos;re actually
                seeing on the wards.
              </p>
              <p>
                Narrowing your focus doesn&apos;t change how the engine thinks. It still connects
                related concepts and schedules your reviews exactly the same way &mdash; just
                within the slice of the exam you&apos;ve chosen.
              </p>
              <p>
                Not targeting anything specific? Leave every topic unselected. Medicine rarely
                respects system boundaries &mdash; renal questions lean on acid-base physiology,
                endocrine ones touch cardiology &mdash; so sampling broadly is usually the better
                default.
              </p>
              <p>
                None of this is permanent. Change your focus whenever you like; every objective
                keeps whatever progress you&apos;ve already made on it.
              </p>
            </div>

            <label className="mt-5 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="size-4 rounded border-gray-300 text-[#06005A] focus:ring-[#06005A] dark:border-white/20"
              />
              Don&apos;t show this again
            </label>

            <button
              type="button"
              onClick={close}
              className="mt-5 w-full rounded-full bg-[#06005A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080]"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
