import { auth } from '@clerk/nextjs/server';
import { getObjectiveHistory } from '@repo/database/qbank';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const learningObjectiveId = searchParams.get('objectiveId');

  if (!learningObjectiveId) {
    return NextResponse.json({ error: 'Missing objectiveId' }, { status: 400 });
  }

  const attempts = await getObjectiveHistory(userId, learningObjectiveId);

  return NextResponse.json({
    history: attempts.map((attempt, i) => ({
      setNumber: i + 1,
      date: attempt.attemptedAt,
      isCorrect: attempt.isCorrect,
      explanation: attempt.question.explanation,
    })),
  });
}
