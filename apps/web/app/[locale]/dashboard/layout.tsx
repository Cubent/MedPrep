import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import type { ReactNode } from 'react';
import { DashboardShell } from './components/dashboard-shell';

const EXAM_LABELS: Record<string, string> = {
  STEP_1: 'STEP 1',
  STEP_2_CK: 'STEP 2 CK',
  STEP_3: 'STEP 3',
  ABIM: 'ABIM',
};

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();

  const preference = userId
    ? await database.userPreference.findUnique({ where: { clerkUserId: userId } })
    : null;

  const examBadge = preference ? (EXAM_LABELS[preference.exam] ?? null) : null;

  return <DashboardShell examBadge={examBadge}>{children}</DashboardShell>;
};

export default DashboardLayout;
