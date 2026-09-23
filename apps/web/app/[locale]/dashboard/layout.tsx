import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import type { ReactNode } from 'react';
import { DashboardShell } from './components/dashboard-shell';

// Neon's serverless Postgres suspends its compute when idle and takes several
// seconds to wake on the first query after that. The platform default
// function timeout doesn't leave enough headroom for that cold start on top
// of the Lambda's own cold start, so requests can die mid-query with no
// application-level log. Applies to every route nested under this layout.
export const maxDuration = 30;

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
