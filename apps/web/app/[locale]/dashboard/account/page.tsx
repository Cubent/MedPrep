'use client';

import { UserProfile } from '@clerk/nextjs';

const AccountPage = () => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
      Dashboard
    </p>
    <h1 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-[#06005A] dark:text-white sm:text-4xl">
      Account
    </h1>
    <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
      Manage your profile, security, and connected accounts.
    </p>

    <div className="mt-8">
      <UserProfile routing="hash" />
    </div>
  </div>
);

export default AccountPage;
