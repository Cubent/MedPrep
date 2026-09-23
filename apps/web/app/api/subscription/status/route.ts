import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getSubscription, hasAccess } from '@/lib/subscription';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const subscription = await getSubscription(userId);
  return NextResponse.json({ active: hasAccess(subscription) });
}
