import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import type { ReactNode } from 'react';
import { DashboardShell } from './components/dashboard-shell';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();

  const preference = userId
    ? await database.userPreference.findUnique({ where: { clerkUserId: userId } })
    : null;

  return (
    <DashboardShell
      currentExam={preference?.exam ?? null}
      examSelectedAt={preference?.examSelectedAt?.toISOString() ?? null}
    >
      {children}
    </DashboardShell>
  );
};

export default DashboardLayout;
