'use client';

import {
  BookMarked,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  History,
  Home,
  LayoutDashboard,
  RotateCcw,
  Target,
  UserRound,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';
import { PracticeProvider } from '../practice-context';
import { DashboardHeaderActions } from './dashboard-header-actions';

const NAV_ITEMS = [
  { label: 'My Dashboard', href: '/dashboard', icon: Home },
  { label: 'Practice', href: '/dashboard/practice', icon: Target },
  { label: 'Review', href: '/dashboard/review', icon: RotateCcw },
  { label: 'Topics', href: '/dashboard/topics', icon: BookOpen },
  { label: 'Study Guide', href: '/dashboard/study-guide', icon: BookMarked },
  { label: 'History', href: '/dashboard/history', icon: History },
  { label: 'Account', href: '/dashboard/account', icon: UserRound },
];

const SIDEBAR_COLLAPSED_KEY = 'medprep-sidebar-collapsed';

type DashboardShellProps = {
  children: ReactNode;
  examBadge?: string | null;
};

export const DashboardShell = ({ children, examBadge }: DashboardShellProps) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      setIsCollapsed(localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true');
    } catch {
      // localStorage unavailable — default to expanded.
    }
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      } catch {
        // Preference just won't persist across reloads — not fatal.
      }
      return next;
    });
  };

  return (
    <PracticeProvider>
    <div className="min-h-screen bg-[#F7F7FA] dark:bg-[#0B0620]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-white/10 dark:bg-[#120A2E] sm:px-6">
        <div className="flex items-center gap-3">
          <img
            src="/animateos-logo (1).png"
            alt="MedPrep Institute Logo"
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-lg font-semibold text-[#06005A] dark:text-white">
            MedPrep Institute
          </span>
          <span className="hidden text-sm font-semibold text-gray-500 dark:text-gray-400 sm:inline">
            &middot; Member Dashboard
          </span>
          {examBadge && (
            <span className="rounded-full bg-[#C46B10]/10 px-2.5 py-1 text-xs font-bold tracking-wide text-[#C46B10] dark:bg-[#C46B10]/20">
              {examBadge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Close dashboard menu' : 'Open dashboard menu'}
            aria-expanded={isMobileMenuOpen}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[#06005A] hover:bg-gray-50 dark:text-white dark:hover:bg-white/5 md:hidden"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <LayoutDashboard className="size-5" />}
          </button>
          <DashboardHeaderActions />
        </div>
      </header>

      {isMobileMenuOpen && (
        <nav className="flex flex-col gap-1 border-b border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-[#120A2E] md:hidden">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard' || pathname.endsWith('/dashboard')
                : pathname.includes(item.href) &&
                  (pathname.length === pathname.indexOf(item.href) + item.href.length ||
                    pathname[pathname.indexOf(item.href) + item.href.length] === '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-[#06005A]/10 font-semibold text-[#06005A] dark:bg-[#C46B10]/15 dark:text-[#C46B10]'
                    : 'font-medium text-gray-600 hover:bg-gray-50 hover:text-[#06005A] dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside
          className={`sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-white py-6 transition-[width] duration-200 dark:border-white/10 dark:bg-[#120A2E] md:flex ${
            isCollapsed ? 'w-16 px-2' : 'w-56 px-3'
          }`}
        >
          <nav className="flex flex-1 flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard' || pathname.endsWith('/dashboard')
                  : pathname.includes(item.href) &&
                    (pathname.length === pathname.indexOf(item.href) + item.href.length ||
                      pathname[pathname.indexOf(item.href) + item.href.length] === '/');
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center rounded-lg py-2.5 text-sm transition-colors ${
                    isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
                  } ${
                    isActive
                      ? 'bg-[#06005A]/10 font-semibold text-[#06005A] dark:bg-[#C46B10]/15 dark:text-[#C46B10]'
                      : 'font-medium text-gray-600 hover:bg-gray-50 hover:text-[#06005A] dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white'
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  {!isCollapsed && item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={toggleCollapsed}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`mt-4 flex items-center rounded-lg py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-[#06005A] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white ${
              isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
            }`}
          >
            {isCollapsed ? (
              <ChevronRight className="size-4 shrink-0" />
            ) : (
              <>
                <ChevronLeft className="size-4 shrink-0" />
                Collapse
              </>
            )}
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-4 pt-10 pb-8 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
    </PracticeProvider>
  );
};
