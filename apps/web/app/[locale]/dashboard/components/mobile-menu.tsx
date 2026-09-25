'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePracticeContext } from '../practice-context';
import { NAV_ITEMS, isActiveNavItem } from './nav-items';

// Phone-only menu button (right of the profile) that opens the sidebar links in a popup.
export const MobileMenu = () => {
  const pathname = usePathname();
  const { isPanelOpen, setIsPanelOpen } = usePracticeContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Opening the AI Tutor (its header icon stays tappable) closes the menu.
  useEffect(() => {
    if (isPanelOpen) setOpen(false);
  }, [isPanelOpen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const toggle = () => {
    if (!open) setIsPanelOpen(false);
    setOpen((prev) => !prev);
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={toggle}
        aria-label={open ? 'Close dashboard menu' : 'Open dashboard menu'}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[#06005A] hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        // Starts below the header so the header icons (AI Tutor, profile) stay tappable.
        <div
          className="fixed inset-x-0 bottom-0 top-16 z-40 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Dashboard menu"
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl bg-white p-4 shadow-2xl dark:bg-[#120A2E]"
          >
            <div className="flex items-center justify-between px-2 pb-2 pt-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                Menu
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveNavItem(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-base transition-colors ${
                      isActive
                        ? 'bg-[#06005A]/10 font-semibold text-[#06005A] dark:bg-[#C46B10]/15 dark:text-[#C46B10]'
                        : 'font-medium text-gray-700 hover:bg-gray-50 hover:text-[#06005A] dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="size-5 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};
