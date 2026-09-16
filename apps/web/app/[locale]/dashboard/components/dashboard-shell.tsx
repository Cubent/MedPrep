'use client';

import { BookOpen, History, Home, RotateCcw, Target, UserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { DashboardHeaderActions } from './dashboard-header-actions';

const NAV_ITEMS = [
  { label: 'My Dashboard', href: '/dashboard', icon: Home },
  { label: 'Practice', href: '/dashboard/practice', icon: Target },
  { label: 'Review', href: '/dashboard/review', icon: RotateCcw },
  { label: 'Topics', href: '/dashboard/topics', icon: BookOpen },
  { label: 'History', href: '/dashboard/history', icon: History },
  { label: 'Account', href: '/dashboard/account', icon: UserRound },
];

type DashboardShellProps = {
  children: ReactNode;
  examBadge?: string | null;
};

export const DashboardShell = ({ children, examBadge }: DashboardShellProps) => {
  const pathname = usePathname();

  return (
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
        <DashboardHeaderActions />
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 overflow-y-auto border-r border-gray-200 bg-white px-3 py-6 dark:border-white/10 dark:bg-[#120A2E] md:block">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard' || pathname.endsWith('/dashboard')
                  : pathname.includes(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive
                      ? 'flex items-center gap-3 rounded-lg bg-[#06005A]/10 px-3 py-2.5 text-sm font-semibold text-[#06005A] dark:bg-[#C46B10]/15 dark:text-[#C46B10]'
                      : 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#06005A] dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white'
                  }
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-4 py-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
};
