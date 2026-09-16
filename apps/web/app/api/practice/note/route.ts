import { auth } from '@clerk/nextjs/server';
import { upsertNote } from '@repo/database/qbank';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const learningObjectiveId = body?.learningObjectiveId as string | undefined;
  const content = (body?.content as string | undefined) ?? '';

  if (!learningObjectiveId) {
    return NextResponse.json({ error: 'Missing learningObjectiveId' }, { status: 400 });
  }

  const note = await upsertNote(userId, learningObjectiveId, content);
  return NextResponse.json({ note });
}
