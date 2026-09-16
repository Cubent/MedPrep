import { database } from './index';
import { ExamType, ObjectiveStatus } from './generated/client';

const CONSECUTIVE_QUESTIONS_BEFORE_SWITCH = 3;

type ScoredProgress = {
  easeFactor: number;
  interval: number;
  correctStreak: number;
  nextReviewAt: Date;
  status: ObjectiveStatus;
};

/**
 * Simplified binary-response SM-2. Real SM-2 takes a 0-5 quality rating;
 * since a multiple-choice attempt only gives us correct/incorrect, this
 * collapses that into fixed ease adjustments. Same shape (ease factor +
 * growing interval on success, reset on failure) as the real thing.
 */
export function scoreAttempt(
  previous: { easeFactor: number; interval: number; correctStreak: number } | null,
  isCorrect: boolean
): ScoredProgress {
  const easeFactor = previous?.easeFactor ?? 2.5;
  const correctStreak = previous?.correctStreak ?? 0;
  const interval = previous?.interval ?? 0;

  let nextEaseFactor: number;
  let nextInterval: number;
  let nextStreak: number;

  if (isCorrect) {
    nextStreak = correctStreak + 1;
    nextEaseFactor = Math.min(3, easeFactor + 0.1);
    if (nextStreak === 1) {
      nextInterval = 1;
    } else if (nextStreak === 2) {
      nextInterval = 6;
    } else {
      nextInterval = Math.round(interval * nextEaseFactor);
    }
  } else {
    nextStreak = 0;
    nextEaseFactor = Math.max(1.3, easeFactor - 0.2);
    nextInterval = 1;
  }

  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + nextInterval);

  const status: ObjectiveStatus = !isCorrect
    ? ObjectiveStatus.LEARNING
    : nextStreak >= 3
      ? ObjectiveStatus.MASTERED
      : ObjectiveStatus.REVIEW;

  return { easeFactor: nextEaseFactor, interval: nextInterval, correctStreak: nextStreak, nextReviewAt, status };
}

/**
 * Priority-queue question selection:
 *   1. Overdue spaced-repetition reviews (a variation of a previously-missed LO)
 *   2. Weak areas: LOs the user has started but is under 50% on, not yet mastered
 *   3. Next unseen LO by yield weight, favoring breadth once a system is "saturated"
 */
export async function pickNextQuestion(clerkUserId: string, examType: ExamType) {
  const now = new Date();

  // 1. Overdue reviews
  const dueProgress = await database.userObjectiveProgress.findFirst({
    where: {
      clerkUserId,
      nextReviewAt: { lte: now },
      learningObjective: { examType },
    },
    orderBy: { nextReviewAt: 'asc' },
  });

  if (dueProgress) {
    const question = await pickUnseenVariation(clerkUserId, dueProgress.learningObjectiveId);
    if (question) return question;
  }

  // 2. Weak areas: attempted before, accuracy under 50%, not mastered
  const weakProgress = await database.userObjectiveProgress.findMany({
    where: {
      clerkUserId,
      status: { in: [ObjectiveStatus.LEARNING, ObjectiveStatus.REVIEW] },
      learningObjective: { examType },
    },
    include: { learningObjective: true },
  });

  for (const progress of weakProgress) {
    const attempts = await database.userQuestionAttempt.findMany({
      where: { clerkUserId, question: { learningObjectiveId: progress.learningObjectiveId } },
    });
    const accuracy = attempts.length ? attempts.filter((a) => a.isCorrect).length / attempts.length : 1;
    if (accuracy < 0.5) {
      const question = await pickUnseenVariation(clerkUserId, progress.learningObjectiveId);
      if (question) return question;
    }
  }

  // 3. Next unseen LO, breadth-aware
  const recentAttempts = await database.userQuestionAttempt.findMany({
    where: { clerkUserId },
    orderBy: { attemptedAt: 'desc' },
    take: CONSECUTIVE_QUESTIONS_BEFORE_SWITCH,
    include: { question: { include: { learningObjective: true } } },
  });

  const recentSystemIds = recentAttempts.map((a) => a.question.learningObjective.systemId);
  const isSaturated =
    recentAttempts.length === CONSECUTIVE_QUESTIONS_BEFORE_SWITCH &&
    recentSystemIds.every((id) => id === recentSystemIds[0]);

  const seenObjectiveIds = (
    await database.userObjectiveProgress.findMany({
      where: { clerkUserId, learningObjective: { examType } },
      select: { learningObjectiveId: true },
    })
  ).map((p) => p.learningObjectiveId);

  const nextObjective = await database.learningObjective.findFirst({
    where: {
      examType,
      id: { notIn: seenObjectiveIds.length ? seenObjectiveIds : undefined },
      ...(isSaturated ? { systemId: { not: recentSystemIds[0] } } : {}),
    },
    orderBy: { yieldWeight: 'desc' },
  });

  if (!nextObjective) return null;

  return pickUnseenVariation(clerkUserId, nextObjective.id);
}

async function pickUnseenVariation(clerkUserId: string, learningObjectiveId: string) {
  const attemptedQuestionIds = (
    await database.userQuestionAttempt.findMany({
      where: { clerkUserId, question: { learningObjectiveId } },
      select: { questionId: true },
    })
  ).map((a) => a.questionId);

  const question = await database.question.findFirst({
    where: {
      learningObjectiveId,
      id: { notIn: attemptedQuestionIds.length ? attemptedQuestionIds : undefined },
    },
    include: { choices: true, learningObjective: { include: { system: true } } },
  });

  if (question) return question;

  // Every variation has been seen already — fall back to any question for this LO.
  return database.question.findFirst({
    where: { learningObjectiveId },
    include: { choices: true, learningObjective: { include: { system: true } } },
  });
}

/**
 * Records an attempt and updates the user's mastery state for that
 * question's learning objective (SM-2 scheduling).
 */
export async function recordAttempt(params: {
  clerkUserId: string;
  questionId: string;
  chosenAnswerId: string;
  errorType?: 'CONCEPT' | 'RECALL' | 'CARELESS' | 'TIME';
}) {
  const question = await database.question.findUniqueOrThrow({
    where: { id: params.questionId },
    include: { choices: true },
  });
  const chosen = question.choices.find((c) => c.id === params.chosenAnswerId);
  const isCorrect = Boolean(chosen?.isCorrect);

  await database.userQuestionAttempt.create({
    data: {
      clerkUserId: params.clerkUserId,
      questionId: params.questionId,
      chosenAnswerId: params.chosenAnswerId,
      isCorrect,
      errorType: isCorrect ? undefined : params.errorType,
    },
  });

  const existingProgress = await database.userObjectiveProgress.findUnique({
    where: {
      clerkUserId_learningObjectiveId: {
        clerkUserId: params.clerkUserId,
        learningObjectiveId: question.learningObjectiveId,
      },
    },
  });

  const scored = scoreAttempt(existingProgress, isCorrect);

  await database.userObjectiveProgress.upsert({
    where: {
      clerkUserId_learningObjectiveId: {
        clerkUserId: params.clerkUserId,
        learningObjectiveId: question.learningObjectiveId,
      },
    },
    create: {
      clerkUserId: params.clerkUserId,
      learningObjectiveId: question.learningObjectiveId,
      status: scored.status,
      easeFactor: scored.easeFactor,
      interval: scored.interval,
      correctStreak: scored.correctStreak,
      nextReviewAt: scored.nextReviewAt,
      lastAttemptAt: new Date(),
    },
    update: {
      status: scored.status,
      easeFactor: scored.easeFactor,
      interval: scored.interval,
      correctStreak: scored.correctStreak,
      nextReviewAt: scored.nextReviewAt,
      lastAttemptAt: new Date(),
    },
  });

  return { isCorrect, correctAnswerId: question.choices.find((c) => c.isCorrect)?.id, explanation: question.explanation };
}
