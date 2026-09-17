import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { AI_SYSTEM_NAME, saveGeneratedQuestion } from '@repo/database/ai-practice';
import {
  getNote,
  getOrCreateActiveSession,
  getPendingSessionQuestion,
  getSessionProgress,
  isBookmarked,
  markQuestionServed,
  pickQuestionSet,
  SET_SIZE,
} from '@repo/database/qbank';
import { generateQuestionsForTitles } from '@/lib/ai-question-generation';
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

      // Some picks may be AI-pool titles with no content yet (`question: null`)
      // — batch-generate all of those in one call, then persist each.
      const needsGeneration = picks.filter((p) => !p.question).map((p) => p.objective);
      const generatedByObjectiveId = needsGeneration.length
        ? await generateQuestionsForTitles(
            needsGeneration.map((o) => ({ id: o.id, title: o.title, requiresTable: o.requiresTable }))
          )
        : new Map();

      for (const p of picks) {
        let questionId = p.question?.id;
        if (!questionId) {
          const generated = generatedByObjectiveId.get(p.objective.id);
          if (!generated) continue; // AI failed to produce this one — skip, don't serve broken content
          const saved = await saveGeneratedQuestion(p.objective.id, generated);
          questionId = saved.id;
        }
        await markQuestionServed(session.id, questionId, p.isReview);
      }

      picked = await getPendingSessionQuestion(session.id);
    }
  }

  if (!picked) {
    return NextResponse.json({ question: null, setSize: SET_SIZE, answeredInSet, answeredResults: [] });
  }

  const [bookmarked, note, answeredResults] = await Promise.all([
    isBookmarked(userId, picked.question.id),
    getNote(userId, picked.question.learningObjectiveId),
    getSessionProgress(session.id),
  ]);

  // Never send isCorrect/explanation to the client before they answer.
  const { choices, learningObjective, explanation, ...rest } = picked.question;
  const isAiGenerated = learningObjective.system.name === AI_SYSTEM_NAME;
  return NextResponse.json({
    sessionId: session.id,
    isReview: picked.isReview,
    isBookmarked: bookmarked,
    isAiGenerated,
    note: note?.content ?? '',
    setSize: SET_SIZE,
    answeredInSet,
    answeredResults,
    question: {
      ...rest,
      system: isAiGenerated ? learningObjective.discipline : learningObjective.system.name,
      objectiveTitle: learningObjective.title,
      learningObjectiveId: learningObjective.id,
      choices: choices.map((c) => ({ id: c.id, text: c.text, sortOrder: c.sortOrder })),
    },
  });
}
