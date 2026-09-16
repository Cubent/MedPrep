import { auth } from '@clerk/nextjs/server';
import { database, ExamType } from '@repo/database';
import { NextResponse } from 'next/server';

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

  const preference = await database.userPreference.upsert({
    where: { clerkUserId: userId },
    create: {
      clerkUserId: userId,
      exam: exam as ExamType,
    },
    update:
      existing && existing.exam !== exam
        ? { exam: exam as ExamType, examSelectedAt: new Date() }
        : {},
  });

  return NextResponse.json({ preference });
}
