import { auth } from '@clerk/nextjs/server';
import { database, ExamType, NextExamPlan, PrepStage, TimedPreference } from '@repo/database';
import { NextResponse } from 'next/server';

// maxDuration for every API route is set globally in vercel.json (Neon's
// serverless Postgres cold-start needs more than the platform default).

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const preference = await database.userPreference.findUnique({
    where: { clerkUserId: userId },
  });

  return NextResponse.json({ preference });
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const exam = body?.exam as string | undefined;

  if (!exam || !Object.values(ExamType).includes(exam as ExamType)) {
    return NextResponse.json({ error: 'Invalid exam' }, { status: 400 });
  }

  // The onboarding questionnaire fields are optional — the account-page exam
  // switcher only ever sends `{ exam }`, and omitting a field here must never
  // clobber a value set earlier, so each is only included in the write when
  // the caller actually sent it.
  const prepStage = body?.prepStage as string | undefined;
  if (prepStage !== undefined && !Object.values(PrepStage).includes(prepStage as PrepStage)) {
    return NextResponse.json({ error: 'Invalid prepStage' }, { status: 400 });
  }

  const isRetake = body?.isRetake as boolean | undefined;
  if (isRetake !== undefined && typeof isRetake !== 'boolean') {
    return NextResponse.json({ error: 'Invalid isRetake' }, { status: 400 });
  }

  const timedPreference = body?.timedPreference as string | undefined;
  if (
    timedPreference !== undefined &&
    !Object.values(TimedPreference).includes(timedPreference as TimedPreference)
  ) {
    return NextResponse.json({ error: 'Invalid timedPreference' }, { status: 400 });
  }

  const nextExamPlan = body?.nextExamPlan as string | undefined;
  if (
    nextExamPlan !== undefined &&
    !Object.values(NextExamPlan).includes(nextExamPlan as NextExamPlan)
  ) {
    return NextResponse.json({ error: 'Invalid nextExamPlan' }, { status: 400 });
  }

  const existing = await database.userPreference.findUnique({
    where: { clerkUserId: userId },
  });

  if (existing && existing.exam !== exam) {
    const unlocksAt = new Date(existing.examSelectedAt.getTime() + THIRTY_DAYS_MS);
    if (unlocksAt > new Date()) {
      return NextResponse.json(
        { error: 'Exam selection is locked', unlocksAt },
        { status: 403 }
      );
    }
  }

  const questionnaireFields = {
    ...(prepStage !== undefined && { prepStage: prepStage as PrepStage }),
    ...(isRetake !== undefined && { isRetake }),
    ...(timedPreference !== undefined && { timedPreference: timedPreference as TimedPreference }),
    ...(nextExamPlan !== undefined && { nextExamPlan: nextExamPlan as NextExamPlan }),
  };

  const preference = await database.userPreference.upsert({
    where: { clerkUserId: userId },
    create: {
      clerkUserId: userId,
      exam: exam as ExamType,
      ...questionnaireFields,
    },
    update: {
      ...(existing && existing.exam !== exam
        ? { exam: exam as ExamType, examSelectedAt: new Date() }
        : {}),
      ...questionnaireFields,
    },
  });

  return NextResponse.json({ preference });
}
