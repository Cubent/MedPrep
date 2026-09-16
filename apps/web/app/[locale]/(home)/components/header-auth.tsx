'use client';

import { Show, UserButton } from '@clerk/nextjs';
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
        className="bg-[#06005A] text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#0a0080] transition-colors"
      >
        My Dashboard
      </Link>
      <div className="pointer-events-none" aria-hidden="true">
        <UserButton />
      </div>
    </Show>
  </div>
);
