'use client';

import { UserButton } from '@clerk/nextjs';
import { useTheme } from '@repo/design-system';
import { Bell, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export const DashboardHeaderActions = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label="Toggle dark mode"
        className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#06005A] dark:border-white/15 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-[#C46B10]"
      >
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>

      <button
        type="button"
        aria-label="Notifications"
        className="flex size-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#06005A] dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-[#C46B10]"
      >
        <Bell className="size-4" />
      </button>

      <div className="ml-1">
        <UserButton />
      </div>
    </div>
  );
};
