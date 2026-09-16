import { database } from './index';
import { ExamType, ObjectiveStatus } from './generated/client';

const CONSECUTIVE_QUESTIONS_BEFORE_SWITCH = 3;
export const SET_SIZE = 5;
export const SETS_TO_UNLOCK_STUDY_GUIDE = 3;
export const REVIEWS_TO_UNLOCK_STUDY_GUIDE = 1;

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

/** Finds the user's in-progress set for this exam, or starts a new one. */
export async function getOrCreateActiveSession(clerkUserId: string, examType: ExamType) {
  const active = await database.studySession.findFirst({
    where: { clerkUserId, examType, completedAt: null },
    orderBy: { createdAt: 'desc' },
  });
  if (active) return active;

  return database.studySession.create({
    data: { clerkUserId, examType },
  });
}

type PickedQuestion = NonNullable<Awaited<ReturnType<typeof pickUnseenVariation>>>;

/**
 * Priority-queue question selection:
 *   1. Overdue spaced-repetition reviews (a variation of a previously-missed LO)
 *   2. Weak areas: LOs the user has started but is under 50% on, not yet mastered
 *   3. Next unseen LO by yield weight, favoring breadth once a system is "saturated"
 */
export async function pickNextQuestion(
  clerkUserId: string,
  examType: ExamType,
  focusSystemIds: string[] = []
): Promise<{ question: PickedQuestion; isReview: boolean } | null> {
  const now = new Date();
  const systemFilter = focusSystemIds.length ? { systemId: { in: focusSystemIds } } : {};

  // 1. Overdue reviews
  const dueProgress = await database.userObjectiveProgress.findFirst({
    where: {
      clerkUserId,
      nextReviewAt: { lte: now },
      learningObjective: { examType, ...systemFilter },
    },
    orderBy: { nextReviewAt: 'asc' },
  });

  if (dueProgress) {
    const question = await pickUnseenVariation(clerkUserId, dueProgress.learningObjectiveId);
    if (question) return { question, isReview: true };
  }

  // 2. Weak areas: attempted before, accuracy under 50%, not mastered
  const weakProgress = await database.userObjectiveProgress.findMany({
    where: {
      clerkUserId,
      status: { in: [ObjectiveStatus.LEARNING, ObjectiveStatus.REVIEW] },
      learningObjective: { examType, ...systemFilter },
    },
  });

  for (const progress of weakProgress) {
    const attempts = await database.userQuestionAttempt.findMany({
      where: { clerkUserId, question: { learningObjectiveId: progress.learningObjectiveId } },
    });
    const accuracy = attempts.length ? attempts.filter((a) => a.isCorrect).length / attempts.length : 1;
    if (accuracy < 0.5) {
      const question = await pickUnseenVariation(clerkUserId, progress.learningObjectiveId);
      if (question) return { question, isReview: true };
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

  // Only let "saturation" force a system switch away from the recent system
  // if that system is actually still in scope under the current focus.
  const shouldAvoidRecentSystem =
    isSaturated && (!focusSystemIds.length || focusSystemIds.includes(recentSystemIds[0]));

  const nextObjective = await database.learningObjective.findFirst({
    where: {
      examType,
      ...systemFilter,
      id: { notIn: seenObjectiveIds.length ? seenObjectiveIds : undefined },
      ...(shouldAvoidRecentSystem ? { systemId: { not: recentSystemIds[0] } } : {}),
    },
    orderBy: { yieldWeight: 'desc' },
  });

  if (!nextObjective) return null;

  const question = await pickUnseenVariation(clerkUserId, nextObjective.id);
  return question ? { question, isReview: false } : null;
}

/**
 * The question already served in this session but not yet answered, if any —
 * lets a user navigate away from /dashboard/practice and come back to the
 * exact same question at the exact same step, instead of the algorithm
 * picking a new one.
 */
export async function getPendingSessionQuestion(sessionId: string) {
  const pending = await database.sessionQuestion.findFirst({
    where: { sessionId, answeredAt: null },
    orderBy: { order: 'asc' },
    include: {
      question: { include: { choices: true, learningObjective: { include: { system: true } } } },
    },
  });

  if (!pending) return null;
  return { question: pending.question, isReview: pending.isReview };
}

/** Records that `question` has been served (but not yet answered) in `sessionId`. */
export async function markQuestionServed(sessionId: string, questionId: string, isReview: boolean) {
  const order = await database.sessionQuestion.count({ where: { sessionId } });
  return database.sessionQuestion.create({
    data: { sessionId, questionId, order, isReview, answeredAt: null },
  });
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
 * Records an attempt, updates the user's mastery state for that question's
 * learning objective (SM-2 scheduling), and attaches it to the given study
 * session — completing the session once it hits SET_SIZE questions.
 */
export async function recordAttempt(params: {
  clerkUserId: string;
  questionId: string;
  chosenAnswerId: string;
  sessionId: string;
  isReview: boolean;
  errorType?: 'CONCEPT' | 'RECALL' | 'CARELESS' | 'TIME';
}) {
  const question = await database.question.findUniqueOrThrow({
    where: { id: params.questionId },
    include: { choices: true },
  });
  const chosen = question.choices.find((c) => c.id === params.chosenAnswerId);
  const isCorrect = Boolean(chosen?.isCorrect);

  const pending = await database.sessionQuestion.findFirst({
    where: { sessionId: params.sessionId, questionId: params.questionId, answeredAt: null },
  });
  // The pending row (set when the question was served) is authoritative;
  // params.isReview is only a fallback if no such row exists.
  const isReview = pending?.isReview ?? params.isReview;

  await database.userQuestionAttempt.create({
    data: {
      clerkUserId: params.clerkUserId,
      questionId: params.questionId,
      chosenAnswerId: params.chosenAnswerId,
      isCorrect,
      isReview,
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

  if (pending) {
    await database.sessionQuestion.update({
      where: { id: pending.id },
      data: { answeredAt: new Date() },
    });
  } else {
    // Fallback for any attempt not preceded by markQuestionServed.
    const order = await database.sessionQuestion.count({ where: { sessionId: params.sessionId } });
    await database.sessionQuestion.create({
      data: {
        sessionId: params.sessionId,
        questionId: params.questionId,
        order,
        isReview,
        answeredAt: new Date(),
      },
    });
  }

  const answeredInSession = await database.sessionQuestion.count({
    where: { sessionId: params.sessionId, answeredAt: { not: null } },
  });
  if (answeredInSession >= SET_SIZE) {
    await database.studySession.update({
      where: { id: params.sessionId },
      data: { completedAt: new Date() },
    });
  }

  const learningObjective = await database.learningObjective.findUniqueOrThrow({
    where: { id: question.learningObjectiveId },
  });

  return {
    isCorrect,
    correctAnswerId: question.choices.find((c) => c.isCorrect)?.id,
    explanation: question.explanation,
    choices: question.choices.map((c) => ({
      id: c.id,
      text: c.text,
      isCorrect: c.isCorrect,
      explanation: c.explanation,
      sortOrder: c.sortOrder,
    })),
    learningObjectiveId: question.learningObjectiveId,
    learningObjectiveTitle: learningObjective.title,
    learningObjectiveSummary: learningObjective.summary ?? learningObjective.title,
  };
}

/** Stats for the dashboard Overview: totals + Study Guide unlock progress. */
export async function getOverviewStats(clerkUserId: string, examType: ExamType) {
  const [questionsAnswered, setsCompleted, reviewsAnswered] = await Promise.all([
    database.userQuestionAttempt.count({ where: { clerkUserId, question: { learningObjective: { examType } } } }),
    database.studySession.count({ where: { clerkUserId, examType, completedAt: { not: null } } }),
    database.userQuestionAttempt.count({
      where: { clerkUserId, isReview: true, question: { learningObjective: { examType } } },
    }),
  ]);

  const setsProgress = Math.min(setsCompleted, SETS_TO_UNLOCK_STUDY_GUIDE);
  const reviewsProgress = Math.min(reviewsAnswered, REVIEWS_TO_UNLOCK_STUDY_GUIDE);
  const studyGuideUnlocked =
    setsCompleted >= SETS_TO_UNLOCK_STUDY_GUIDE && reviewsAnswered >= REVIEWS_TO_UNLOCK_STUDY_GUIDE;

  return {
    questionsAnswered,
    setsCompleted,
    reviewsAnswered,
    setsProgress,
    reviewsProgress,
    studyGuideUnlocked,
  };
}

/**
 * All past attempts on the same learning objective as `questionId`'s LO,
 * oldest first, for the "How you got here" timeline — each past attempt
 * surfaces the explanation of whichever variation question was shown then.
 */
export async function getObjectiveHistory(clerkUserId: string, learningObjectiveId: string) {
  return database.userQuestionAttempt.findMany({
    where: { clerkUserId, question: { learningObjectiveId } },
    orderBy: { attemptedAt: 'asc' },
    include: { question: true },
  });
}

/** The user's personal note on a learning objective, if any. */
export async function getNote(clerkUserId: string, learningObjectiveId: string) {
  return database.userQuestionNote.findUnique({
    where: { clerkUserId_learningObjectiveId: { clerkUserId, learningObjectiveId } },
  });
}

export async function upsertNote(clerkUserId: string, learningObjectiveId: string, content: string) {
  if (!content.trim()) {
    await database.userQuestionNote
      .delete({ where: { clerkUserId_learningObjectiveId: { clerkUserId, learningObjectiveId } } })
      .catch(() => null);
    return null;
  }

  return database.userQuestionNote.upsert({
    where: { clerkUserId_learningObjectiveId: { clerkUserId, learningObjectiveId } },
    create: { clerkUserId, learningObjectiveId, content },
    update: { content },
  });
}

export async function isBookmarked(clerkUserId: string, questionId: string) {
  const bookmark = await database.userBookmark.findUnique({
    where: { clerkUserId_questionId: { clerkUserId, questionId } },
  });
  return Boolean(bookmark);
}

/** Toggles a bookmark on/off, returning the new state. */
export async function toggleBookmark(clerkUserId: string, questionId: string) {
  const existing = await database.userBookmark.findUnique({
    where: { clerkUserId_questionId: { clerkUserId, questionId } },
  });

  if (existing) {
    await database.userBookmark.delete({ where: { id: existing.id } });
    return false;
  }

  await database.userBookmark.create({ data: { clerkUserId, questionId } });
  return true;
}

const DAILY_ACTIVITY_DAYS = 14;
const UPCOMING_REVIEWS_WINDOW_DAYS = 7;

function accuracyOf(attempts: { isCorrect: boolean }[]) {
  const total = attempts.length;
  const correct = attempts.filter((a) => a.isCorrect).length;
  return { pct: total ? Math.round((correct / total) * 100) : 0, correct, total };
}

/**
 * Real dashboard analytics: accuracy, exam coverage, daily activity (for the
 * hover chart), upcoming reviews, and per-system topic accuracy. All
 * computed from actual attempts/progress — no placeholder numbers.
 */
export async function getDashboardAnalytics(clerkUserId: string, examType: ExamType) {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);
  const fourteenDaysAgo = new Date(now);
  fourteenDaysAgo.setDate(now.getDate() - DAILY_ACTIVITY_DAYS + 1);
  fourteenDaysAgo.setHours(0, 0, 0, 0);
  const in7Days = new Date(now);
  in7Days.setDate(now.getDate() + UPCOMING_REVIEWS_WINDOW_DAYS);

  const [allAttempts, recentAttempts, totalObjectives, seenObjectiveIds, systems, upcomingReviews] =
    await Promise.all([
      database.userQuestionAttempt.findMany({
        where: { clerkUserId, question: { learningObjective: { examType } } },
        select: { isCorrect: true },
      }),
      database.userQuestionAttempt.findMany({
        where: {
          clerkUserId,
          question: { learningObjective: { examType } },
          attemptedAt: { gte: sevenDaysAgo },
        },
        select: { isCorrect: true },
      }),
      database.learningObjective.count({ where: { examType } }),
      database.userObjectiveProgress.findMany({
        where: { clerkUserId, learningObjective: { examType } },
        select: { learningObjectiveId: true },
      }),
      database.system.findMany({
        where: { examType },
        orderBy: { sortOrder: 'asc' },
        include: { objectives: { select: { id: true } } },
      }),
      database.userObjectiveProgress.count({
        where: { clerkUserId, learningObjective: { examType }, nextReviewAt: { gte: now, lte: in7Days } },
      }),
    ]);

  const upcomingReviewsPreview = await database.userObjectiveProgress.findMany({
    where: { clerkUserId, learningObjective: { examType }, nextReviewAt: { gte: now, lte: in7Days } },
    orderBy: { nextReviewAt: 'asc' },
    take: 2,
    include: { learningObjective: { include: { system: true } } },
  });

  const dailyAttempts = await database.userQuestionAttempt.findMany({
    where: { clerkUserId, question: { learningObjective: { examType } }, attemptedAt: { gte: fourteenDaysAgo } },
    select: { isCorrect: true, attemptedAt: true },
  });

  const dailyActivity: { date: string; correct: number; incorrect: number }[] = [];
  for (let i = 0; i < DAILY_ACTIVITY_DAYS; i++) {
    const day = new Date(fourteenDaysAgo);
    day.setDate(fourteenDaysAgo.getDate() + i);
    const dayKey = day.toDateString();
    const forDay = dailyAttempts.filter((a) => a.attemptedAt.toDateString() === dayKey);
    dailyActivity.push({
      date: day.toISOString(),
      correct: forDay.filter((a) => a.isCorrect).length,
      incorrect: forDay.filter((a) => !a.isCorrect).length,
    });
  }

  const seenSet = new Set(seenObjectiveIds.map((p) => p.learningObjectiveId));

  const topicAccuracy = await Promise.all(
    systems.map(async (system) => {
      const objectiveIds = system.objectives.map((o) => o.id);
      const seenInSystem = objectiveIds.filter((id) => seenSet.has(id)).length;
      const attempts = objectiveIds.length
        ? await database.userQuestionAttempt.findMany({
            where: { clerkUserId, question: { learningObjectiveId: { in: objectiveIds } } },
            select: { isCorrect: true },
          })
        : [];
      const acc = accuracyOf(attempts);
      return {
        systemName: system.name,
        totalObjectives: objectiveIds.length,
        seenObjectives: seenInSystem,
        accuracyPct: acc.pct,
        started: attempts.length > 0,
      };
    })
  );

  return {
    overallAccuracy: accuracyOf(allAttempts),
    last7DaysAccuracy: accuracyOf(recentAttempts),
    examCoverage: {
      pct: totalObjectives ? Math.round((seenSet.size / totalObjectives) * 100) : 0,
      seenCount: seenSet.size,
      totalObjectives,
    },
    dailyActivity,
    upcomingReviews,
    upcomingReviewsPreview: upcomingReviewsPreview.map((p) => ({
      system: p.learningObjective.system.name,
      objectiveTitle: p.learningObjective.title,
      nextReviewAt: p.nextReviewAt,
    })),
    topicAccuracy,
  };
}

/** Every system for this exam with real seen% and question counts, for /dashboard/topics. */
export async function getTopicsOverview(clerkUserId: string, examType: ExamType) {
  const [preference, systems, seenObjectiveIds] = await Promise.all([
    database.userPreference.findUnique({ where: { clerkUserId } }),
    database.system.findMany({
      where: { examType },
      orderBy: { name: 'asc' },
      include: { objectives: { select: { id: true, _count: { select: { questions: true } } } } },
    }),
    database.userObjectiveProgress.findMany({
      where: { clerkUserId, learningObjective: { examType } },
      select: { learningObjectiveId: true },
    }),
  ]);

  const seenSet = new Set(seenObjectiveIds.map((p) => p.learningObjectiveId));

  const topics = systems.map((system) => {
    const totalObjectives = system.objectives.length;
    const seenInSystem = system.objectives.filter((o) => seenSet.has(o.id)).length;
    const totalQuestions = system.objectives.reduce((sum, o) => sum + o._count.questions, 0);
    return {
      systemId: system.id,
      name: system.name,
      seenPct: totalObjectives ? Math.round((seenInSystem / totalObjectives) * 100) : 0,
      totalQuestions,
    };
  });

  return { topics, focusSystemIds: preference?.focusSystemIds ?? [] };
}

/**
 * Sets which systems the user wants to drill (empty = "All topics", no
 * filter). Also clears any unanswered pending question in the active
 * session, so the change takes effect on the very next question served.
 */
export async function setUserFocus(clerkUserId: string, examType: ExamType, systemIds: string[]) {
  await database.userPreference.update({
    where: { clerkUserId },
    data: { focusSystemIds: systemIds },
  });

  const activeSession = await database.studySession.findFirst({
    where: { clerkUserId, examType, completedAt: null },
  });

  if (activeSession) {
    await database.sessionQuestion.deleteMany({
      where: { sessionId: activeSession.id, answeredAt: null },
    });
  }
}

/**
 * Full attempt history for /dashboard/history: every question the user has
 * answered, newest first, with bookmark status. The list view shows just a
 * preview; the full stem/choices/explanation ride along so a click can open
 * the detail popup without a second fetch.
 */
export async function getAttemptHistory(clerkUserId: string, examType: ExamType) {
  const [attempts, bookmarks] = await Promise.all([
    database.userQuestionAttempt.findMany({
      where: { clerkUserId, question: { learningObjective: { examType } } },
      orderBy: { attemptedAt: 'desc' },
      include: {
        question: {
          include: {
            choices: true,
            learningObjective: { include: { system: true } },
          },
        },
      },
    }),
    database.userBookmark.findMany({
      where: { clerkUserId, question: { learningObjective: { examType } } },
      select: { questionId: true },
    }),
  ]);

  const bookmarkedIds = new Set(bookmarks.map((b) => b.questionId));

  return attempts.map((attempt) => ({
    id: attempt.id,
    isCorrect: attempt.isCorrect,
    isReview: attempt.isReview,
    attemptedAt: attempt.attemptedAt,
    isBookmarked: bookmarkedIds.has(attempt.questionId),
    system: attempt.question.learningObjective.system.name,
    objectiveTitle: attempt.question.learningObjective.title,
    objectiveSummary: attempt.question.learningObjective.summary ?? attempt.question.learningObjective.title,
    stem: attempt.question.stem,
    explanation: attempt.question.explanation,
    chosenAnswerId: attempt.chosenAnswerId,
    choices: attempt.question.choices
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((c) => ({
        id: c.id,
        text: c.text,
        isCorrect: c.isCorrect,
        explanation: c.explanation,
      })),
  }));
}

/**
 * Every scheduled review (past or future) for the exam, for the
 * /dashboard/review calendar. Not windowed to a single month — the
 * component filters client-side so navigating months needs no refetch.
 */
export async function getReviewCalendar(clerkUserId: string, examType: ExamType) {
  const rows = await database.userObjectiveProgress.findMany({
    where: { clerkUserId, learningObjective: { examType }, nextReviewAt: { not: null } },
    orderBy: { nextReviewAt: 'asc' },
    include: { learningObjective: { include: { system: true } } },
  });

  return rows.map((row) => ({
    date: row.nextReviewAt!.toISOString(),
    system: row.learningObjective.system.name,
    objectiveTitle: row.learningObjective.title,
  }));
}
