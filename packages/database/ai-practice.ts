import { database } from './index';
import { ExamType } from '@prisma/client';

/**
 * AI-generated practice content lives entirely under one dedicated System per
 * exam, kept separate from the real, hand-authored subject buckets. Titles
 * (LearningObjective rows) are cheap to pre-generate in bulk; the actual
 * question text is generated lazily, on first use, and then persisted
 * forever — after that it's indistinguishable from hand-authored content to
 * the rest of the qbank engine (spaced repetition, session tracking, etc.
 * all just work, since it's the same tables).
 */
export const AI_SYSTEM_NAME = 'AI Generated';

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

export type GeneratedQuestionContent = {
  stem: string;
  explanation: string;
  summary: string;
  difficulty: number;
  choices: { text: string; isCorrect: boolean; explanation: string }[];
};

/**
 * Persists AI-generated content for a title as a real Question, forever
 * reusable after this point, and backfills the parent LearningObjective's
 * summary (it was title-only until now) — the actual selection of which
 * objective to generate for lives in qbank.ts's pickOneQuestion, unified
 * with the real algorithm.
 */
/**
 * Randomizes the order of a question's answer choices (Fisher-Yates).
 *
 * The generation prompt asks the model for a random order, but it reliably
 * isn't random: whole batches come back with the correct answer in the same
 * slot (e.g. five questions in a row all answered "A"), so the order is set
 * here instead. "All/None of the above" style choices are kept last, since
 * they stop making sense anywhere else.
 */
export function shuffleChoices<T extends { text: string }>(choices: T[]): T[] {
  const isPinned = (choice: T) => /^(all|none) of the above\b/i.test(choice.text.trim());
  const movable = choices.filter((choice) => !isPinned(choice));
  for (let i = movable.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [movable[i], movable[j]] = [movable[j] as T, movable[i] as T];
  }
  return [...movable, ...choices.filter(isPinned)];
}

export async function saveGeneratedQuestion(learningObjectiveId: string, generated: GeneratedQuestionContent) {
  const [question] = await database.$transaction([
    database.question.create({
      data: {
        learningObjectiveId,
        variationGroupId: learningObjectiveId,
        stem: generated.stem,
        explanation: generated.explanation,
        difficulty: Math.min(3, Math.max(1, Math.round(generated.difficulty) || 2)),
        choices: {
          create: shuffleChoices(generated.choices).map((c, i) => ({
            text: c.text,
            isCorrect: c.isCorrect,
            explanation: c.explanation,
            sortOrder: i,
          })),
        },
      },
      include: { choices: true },
    }),
    database.learningObjective.update({
      where: { id: learningObjectiveId },
      data: { summary: generated.summary },
    }),
  ]);

  return question;
}
