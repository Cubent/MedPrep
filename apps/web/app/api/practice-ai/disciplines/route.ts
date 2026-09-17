import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { getAiDisciplines } from '@repo/database/ai-practice';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const preference = await database.userPreference.findUnique({ where: { clerkUserId: userId } });
  if (!preference) {
    return NextResponse.json({ error: 'Select an exam in onboarding before practicing.' }, { status: 400 });
  }

  const disciplines = await getAiDisciplines(preference.exam);
  return NextResponse.json({ disciplines });
}
