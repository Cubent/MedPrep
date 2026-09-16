'use client';

import { Bookmark } from 'lucide-react';
import { useState } from 'react';

export const BookmarkButton = ({ questionId, initialBookmarked }: { questionId: string; initialBookmarked: boolean }) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isToggling, setIsToggling] = useState(false);

  const toggle = async () => {
    setIsToggling(true);
    try {
      const response = await fetch('/api/practice/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) setIsBookmarked(Boolean(data.isBookmarked));
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isToggling}
      aria-pressed={isBookmarked}
      className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-colors ${
        isBookmarked
          ? 'border-[#C46B10] bg-[#C46B10] text-white'
          : 'border-[#C46B10]/50 bg-[#C46B10]/5 text-[#C46B10] hover:bg-[#C46B10]/10'
      }`}
    >
      <Bookmark className={`size-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
};
