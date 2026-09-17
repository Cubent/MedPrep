import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import {
  getNote,
  getOrCreateActiveSession,
  getPendingSessionQuestion,
  isBookmarked,
  markQuestionServed,
  pickQuestionSet,
  SET_SIZE,
} from '@repo/database/qbank';
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

  const session = await getOrCreateActiveSession(userId, preference.exam);

  // Resume the question already in progress in this session, if any, instead
  // of picking a new one — so leaving and returning to /dashboard/practice
  // lands you back on the same question at the same step.
  let picked = await getPendingSessionQuestion(session.id);

  const answeredInSet = await database.sessionQuestion.count({
    where: { sessionId: session.id, answeredAt: { not: null } },
  });

  if (!picked) {
    // No question queued and waiting — fill the rest of this set upfront
    // (all remaining slots at once) rather than picking one question at a
    // time as the user answers through it. This also re-fills the set after
    // a mid-set focus change, which clears only the unanswered questions.
    const remaining = SET_SIZE - answeredInSet;
    if (remaining > 0) {
      const picks = await pickQuestionSet(userId, preference.exam, preference.focusSystemIds, remaining);
      for (const p of picks) {
        await markQuestionServed(session.id, p.question.id, p.isReview);
      }
      picked = picks[0] ?? null;
    }
  }

  if (!picked) {
    return NextResponse.json({ question: null, setSize: SET_SIZE, answeredInSet });
  }

  const [bookmarked, note] = await Promise.all([
    isBookmarked(userId, picked.question.id),
    getNote(userId, picked.question.learningObjectiveId),
  ]);

  // Never send isCorrect/explanation to the client before they answer.
  const { choices, learningObjective, explanation, ...rest } = picked.question;
  return NextResponse.json({
    sessionId: session.id,
    isReview: picked.isReview,
    isBookmarked: bookmarked,
    note: note?.content ?? '',
    setSize: SET_SIZE,
    answeredInSet,
    question: {
      ...rest,
      system: learningObjective.system.name,
      objectiveTitle: learningObjective.title,
      learningObjectiveId: learningObjective.id,
      choices: choices.map((c) => ({ id: c.id, text: c.text, sortOrder: c.sortOrder })),
    },
  });
}
