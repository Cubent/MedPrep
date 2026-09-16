import { auth } from '@clerk/nextjs/server';
import { toggleBookmark } from '@repo/database/qbank';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const questionId = body?.questionId as string | undefined;

  if (!questionId) {
    return NextResponse.json({ error: 'Missing questionId' }, { status: 400 });
  }

  const bookmarked = await toggleBookmark(userId, questionId);
  return NextResponse.json({ isBookmarked: bookmarked });
}
