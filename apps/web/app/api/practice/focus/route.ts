import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { getTopicsOverview, setUserFocus } from '@repo/database/qbank';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const preference = await database.userPreference.findUnique({ where: { clerkUserId: userId } });

  if (!preference) {
    return NextResponse.json(
      { error: 'Select an exam in onboarding before choosing topics.' },
      { status: 400 }
    );
  }

  const overview = await getTopicsOverview(userId, preference.exam);
  return NextResponse.json(overview);
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const preference = await database.userPreference.findUnique({ where: { clerkUserId: userId } });

  if (!preference) {
    return NextResponse.json(
      { error: 'Select an exam in onboarding before choosing topics.' },
      { status: 400 }
    );
  }

  const body = await request.json().catch(() => null);
  const systemIds = Array.isArray(body?.systemIds) ? (body.systemIds as string[]) : [];

  await setUserFocus(userId, preference.exam, systemIds);
  return NextResponse.json({ focusSystemIds: systemIds });
}
