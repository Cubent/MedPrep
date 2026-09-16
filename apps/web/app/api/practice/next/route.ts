import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { pickNextQuestion } from '@repo/database/qbank';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const preference = await database.userPreference.findUnique({
    where: { clerkUserId: userId },
  });

  if (!preference) {
    return NextResponse.json(
      { error: 'Select an exam in onboarding before practicing.' },
      { status: 400 }
    );
  }

  const question = await pickNextQuestion(userId, preference.exam);

  if (!question) {
    return NextResponse.json({ question: null });
  }

  // Never send isCorrect to the client before they answer.
  const { choices, learningObjective, ...rest } = question;
  return NextResponse.json({
    question: {
      ...rest,
      system: learningObjective.system.name,
      objectiveTitle: learningObjective.title,
      choices: choices.map((c) => ({ id: c.id, text: c.text, sortOrder: c.sortOrder })),
    },
  });
}
