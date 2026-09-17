'use client';

import { Show, UserButton } from '@clerk/nextjs';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export const HeaderAuth = () => (
  <div className="flex items-center gap-3">
    <Show when="signed-out">
      <Link
        href="/sign-in"
        className="hidden text-sm font-medium text-gray-600 hover:text-[#06005A] sm:inline"
      >
        Sign in
      </Link>
      <Link
        href="/sign-up"
        className="bg-[#06005A] text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#0a0080] transition-colors"
      >
        Sign up
      </Link>
    </Show>
    <Show when="signed-in">
      <Link
        href="/dashboard"
        aria-label="My Dashboard"
        className="mt-1 flex items-center justify-center gap-2 rounded-full p-2 text-[#06005A] transition-colors hover:bg-gray-50 sm:mt-0 sm:bg-[#06005A] sm:p-0 sm:px-5 sm:py-2 sm:font-semibold sm:text-sm sm:text-white sm:hover:bg-[#0a0080]"
      >
        <LayoutDashboard className="size-5 shrink-0 sm:size-4" />
        <span className="hidden sm:inline">My Dashboard</span>
      </Link>
      <div className="pointer-events-none mt-1 sm:mt-0" aria-hidden="true">
        <UserButton />
      </div>
    </Show>
  </div>
);
