import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { getRangeStats, STATS_RANGE_DAYS, type StatsRangeKey } from '@repo/database/qbank';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const range = (request.nextUrl.searchParams.get('range') ?? '7d') as StatsRangeKey;
  const rangeDays = STATS_RANGE_DAYS[range];
  if (!rangeDays) {
    return NextResponse.json({ error: 'Invalid range' }, { status: 400 });
  }

  const preference = await database.userPreference.findUnique({ where: { clerkUserId: userId } });
  if (!preference) {
    return NextResponse.json({ error: 'Select an exam in onboarding first.' }, { status: 400 });
  }

  const stats = await getRangeStats(userId, preference.exam, rangeDays);
  return NextResponse.json(stats);
}
