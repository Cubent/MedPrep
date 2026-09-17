import { database } from './index';
import { ExamType, ObjectiveStatus } from './generated/client';

/**
 * AI-generated practice content lives entirely under one dedicated System per
 * exam, kept separate from the real, hand-authored subject buckets. Titles
 * (LearningObjective rows) are cheap to pre-generate in bulk; the actual
 * question text is generated lazily, on first use, and then persisted
 * forever — after that it's indistinguishable from hand-authored content to
 * the rest of the qbank engine (spaced repetition, session tracking, etc.
 * all just work, since it's the same tables).
 */
const AI_SYSTEM_NAME = 'AI Generated';

export async function getOrCreateAiSystem(examType: ExamType) {
  return database.system.upsert({
    where: { examType_name: { examType, name: AI_SYSTEM_NAME } },
    create: { examType, name: AI_SYSTEM_NAME, sortOrder: 999 },
    update: {},
  });
}

/** Distinct disciplines (categories) available within the AI system, with title counts, for the focus picker. */
export async function getAiDisciplines(examType: ExamType) {
  const system = await getOrCreateAiSystem(examType);
  const objectives = await database.learningObjective.findMany({
    where: { systemId: system.id },
    select: { discipline: true },
  });

  const counts = new Map<string, number>();
  for (const o of objectives) counts.set(o.discipline, (counts.get(o.discipline) ?? 0) + 1);

  return [...counts.entries()]
    .map(([discipline, count]) => ({ discipline, count }))
    .sort((a, b) => a.discipline.localeCompare(b.discipline));
}

/** Bulk-inserts title-only learning objectives (no question content yet) for one discipline, skipping duplicates. */
export async function seedAiTitles(
  examType: ExamType,
  discipline: string,
  titles: { title: string; requiresTable?: boolean }[]
) {
  const system = await getOrCreateAiSystem(examType);

  const existing = await database.learningObjective.findMany({
    where: { systemId: system.id, discipline },
    select: { title: true },
  });
  const existingTitles = new Set(existing.map((e) => e.title.trim().toLowerCase()));

  const seen = new Set<string>();
  const toCreate = titles
    .map((t) => ({ title: t.title.trim(), requiresTable: Boolean(t.requiresTable) }))
    .filter((t) => t.title && !existingTitles.has(t.title.toLowerCase()) && !seen.has(t.title.toLowerCase()))
    .filter((t) => (seen.add(t.title.toLowerCase()), true));
  if (!toCreate.length) return 0;

  await database.learningObjective.createMany({
    data: toCreate.map(({ title, requiresTable }) => ({
      systemId: system.id,
      examType,
      discipline,
      title,
      requiresTable,
      yieldWeight: 50,
    })),
  });

  return toCreate.length;
}

/** Retroactively flips the requiresTable flag for specific existing titles (by id). */
export async function setRequiresTableFlags(learningObjectiveIds: string[], value: boolean) {
  if (!learningObjectiveIds.length) return 0;
  const result = await database.learningObjective.updateMany({
    where: { id: { in: learningObjectiveIds } },
    data: { requiresTable: value },
  });
  return result.count;
}

type AiObjective = { id: string; title: string; discipline: string; requiresTable: boolean };

/**
 * Picks one AI-system learning objective using the same priority order as
 * the real algorithm (overdue review -> weak area -> unseen), simplified
 * since there's only one System here (no breadth/system-rotation needed) and
 * "unseen" is chosen uniformly at random rather than by yield weight, since
 * these titles aren't curated/ranked the way hand-authored content is.
 */
async function pickOneAiObjective(
  clerkUserId: string,
  aiSystemId: string,
  discipline: string | null,
  excludeObjectiveIds: string[]
): Promise<{ objective: AiObjective; isReview: boolean } | null> {
  const now = new Date();
  const disciplineFilter = discipline ? { discipline } : {};
  const excludeProgressFilter = excludeObjectiveIds.length
    ? { learningObjectiveId: { notIn: excludeObjectiveIds } }
    : {};

  // 1. Overdue reviews
  const dueProgress = await database.userObjectiveProgress.findFirst({
    where: {
      clerkUserId,
      nextReviewAt: { lte: now },
      learningObjective: { systemId: aiSystemId, ...disciplineFilter },
      ...excludeProgressFilter,
    },
    orderBy: { nextReviewAt: 'asc' },
    include: { learningObjective: true },
  });
  if (dueProgress) return { objective: dueProgress.learningObjective, isReview: true };

  // 2. Weak areas: attempted before, accuracy under 50%, not mastered
  const weakProgress = await database.userObjectiveProgress.findMany({
    where: {
      clerkUserId,
      status: { in: [ObjectiveStatus.LEARNING, ObjectiveStatus.REVIEW] },
      learningObjective: { systemId: aiSystemId, ...disciplineFilter },
      ...excludeProgressFilter,
    },
    include: { learningObjective: true },
  });
  for (const progress of weakProgress) {
    const attempts = await database.userQuestionAttempt.findMany({
      where: { clerkUserId, question: { learningObjectiveId: progress.learningObjectiveId } },
    });
    const accuracy = attempts.length ? attempts.filter((a) => a.isCorrect).length / attempts.length : 1;
    if (accuracy < 0.5) return { objective: progress.learningObjective, isReview: true };
  }

  // 3. Uniformly random unseen title
  const seenIds = (
    await database.userObjectiveProgress.findMany({
      where: { clerkUserId, learningObjective: { systemId: aiSystemId } },
      select: { learningObjectiveId: true },
    })
  ).map((p) => p.learningObjectiveId);
  const allExcluded = [...new Set([...seenIds, ...excludeObjectiveIds])];
  const excludeIdFilter = allExcluded.length ? { id: { notIn: allExcluded } } : {};

  const eligibleCount = await database.learningObjective.count({
    where: { systemId: aiSystemId, ...disciplineFilter, ...excludeIdFilter },
  });
  if (eligibleCount === 0) return null;

  const randomSkip = Math.floor(Math.random() * eligibleCount);
  const objective = await database.learningObjective.findFirst({
    where: { systemId: aiSystemId, ...disciplineFilter, ...excludeIdFilter },
    skip: randomSkip,
  });

  return objective ? { objective, isReview: false } : null;
}

/** Picks up to `count` AI-system objectives for one set, never repeating an objective within the same batch. */
export async function pickAiObjectiveSet(
  clerkUserId: string,
  aiSystemId: string,
  discipline: string | null,
  count: number
): Promise<{ objective: AiObjective; isReview: boolean }[]> {
  const picks: { objective: AiObjective; isReview: boolean }[] = [];
  const excludeObjectiveIds: string[] = [];

  for (let i = 0; i < count; i++) {
    const picked = await pickOneAiObjective(clerkUserId, aiSystemId, discipline, excludeObjectiveIds);
    if (!picked) break;
    picks.push(picked);
    excludeObjectiveIds.push(picked.objective.id);
  }

  return picks;
}

export type GeneratedQuestionContent = {
  stem: string;
  explanation: string;
  difficulty: number;
  choices: { text: string; isCorrect: boolean; explanation: string }[];
};

/** Persists AI-generated content for a title as a real Question, forever reusable after this point. */
export async function saveGeneratedQuestion(learningObjectiveId: string, generated: GeneratedQuestionContent) {
  return database.question.create({
    data: {
      learningObjectiveId,
      variationGroupId: learningObjectiveId,
      stem: generated.stem,
      explanation: generated.explanation,
      difficulty: Math.min(3, Math.max(1, Math.round(generated.difficulty) || 2)),
      choices: {
        create: generated.choices.map((c, i) => ({
          text: c.text,
          isCorrect: c.isCorrect,
          explanation: c.explanation,
          sortOrder: i,
        })),
      },
    },
    include: { choices: true },
  });
}

/** The first (or only) existing Question for a learning objective, if content has already been generated for it. */
export async function getExistingQuestionForObjective(learningObjectiveId: string) {
  return database.question.findFirst({
    where: { learningObjectiveId },
    include: { choices: true },
  });
}
