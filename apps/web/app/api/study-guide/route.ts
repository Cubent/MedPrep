import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import {
  getOverviewStats,
  getStaleStudyGuideCandidates,
  getStudyGuideEntries,
  saveStudyGuideSummary,
} from '@repo/database/qbank';
import { generateStudyGuideSummaries } from '@/lib/study-guide-generation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const preference = await database.userPreference.findUnique({ where: { clerkUserId: userId } });
  if (!preference) {
    return NextResponse.json({ error: 'Select an exam in onboarding first.' }, { status: 400 });
  }

  const stats = await getOverviewStats(userId, preference.exam);
  if (!stats.studyGuideUnlocked) {
    return NextResponse.json({ unlocked: false, entries: [] });
  }

  // Regenerate any entry that's missing or whose Q&A history has changed
  // since it was last summarized, in one batched call.
  const stale = await getStaleStudyGuideCandidates(userId, preference.exam);
  if (stale.length) {
    const summaries = await generateStudyGuideSummaries(
      stale.map((c) => ({ learningObjectiveId: c.learningObjectiveId, title: c.title, qa: c.qa }))
    );
    for (const candidate of stale) {
      const summary = summaries.get(candidate.learningObjectiveId);
      if (!summary) continue; // AI failed on this one — leave it for the next visit
      await saveStudyGuideSummary(userId, candidate.learningObjectiveId, {
        summary,
        missedCount: candidate.missedCount,
        attemptCount: candidate.attemptCount,
        lastAttemptAt: candidate.lastAttemptAt,
      });
    }
  }

  const tab = request.nextUrl.searchParams.get('tab') === 'reviewed' ? 'reviewed' : 'active';
  const sort = request.nextUrl.searchParams.get('sort') === 'recent' ? 'recent' : 'missed';

  const entries = await getStudyGuideEntries(userId, preference.exam, {
    isReviewed: tab === 'reviewed',
    sort,
  });

  return NextResponse.json({ unlocked: true, entries });
}
