import { auth } from '@clerk/nextjs/server';
import { recordAttempt } from '@repo/database/qbank';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const questionId = body?.questionId as string | undefined;
  const chosenAnswerId = body?.chosenAnswerId as string | undefined;
  const sessionId = body?.sessionId as string | undefined;
  const isReview = Boolean(body?.isReview);

  if (!questionId || !chosenAnswerId || !sessionId) {
    return NextResponse.json(
      { error: 'Missing questionId, chosenAnswerId, or sessionId' },
      { status: 400 }
    );
  }

  const result = await recordAttempt({
    clerkUserId: userId,
    questionId,
    chosenAnswerId,
    sessionId,
    isReview,
  });

  return NextResponse.json(result);
}
