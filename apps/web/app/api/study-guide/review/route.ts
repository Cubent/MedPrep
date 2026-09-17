import { auth } from '@clerk/nextjs/server';
import { markStudyGuideReviewed } from '@repo/database/qbank';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const entryId = typeof body.entryId === 'string' ? body.entryId : null;
  if (!entryId) {
    return NextResponse.json({ error: 'entryId is required' }, { status: 400 });
  }

  const updated = await markStudyGuideReviewed(userId, entryId);
  if (!updated) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
