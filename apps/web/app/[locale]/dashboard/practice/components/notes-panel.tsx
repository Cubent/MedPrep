'use client';

import { NotebookPen } from 'lucide-react';
import { useState } from 'react';

type Props = {
  learningObjectiveId: string;
  initialContent: string;
};

export const NotesPanel = ({ learningObjectiveId, initialContent }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const save = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/practice/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ learningObjectiveId, content }),
      });
      setSavedAt(Date.now());
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-colors ${
          content
            ? 'border-[#06005A] bg-[#06005A] text-white'
            : 'border-[#06005A]/50 bg-[#06005A]/5 text-[#06005A] hover:bg-[#06005A]/10'
        }`}
      >
        <NotebookPen className="size-3.5" />
        Notes
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-white/10 dark:bg-[#120A2E]">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Jot a note on this concept…"
            rows={5}
            className="w-full resize-none rounded-lg border border-gray-200 bg-transparent p-2 text-sm text-gray-800 outline-none focus:border-[#06005A] dark:border-white/15 dark:text-gray-200"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[0.65rem] text-gray-400">
              {isSaving ? 'Saving…' : savedAt ? 'Saved' : ''}
            </span>
            <button
              type="button"
              onClick={save}
              disabled={isSaving}
              className="rounded-full bg-[#06005A] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#0a0080] disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
