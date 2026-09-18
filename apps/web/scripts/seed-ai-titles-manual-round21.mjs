// One-off script: twenty-first, small closing batch for the large
// multi-round push toward 1000 new titles this session — vasopressin
// antagonists and hyponatremia correction pharmacology, plus HbA1c
// reliability biochemistry. Written directly, not produced by calling an
// LLM API — only the FULL QUESTION content is ever generated lazily by AI
// later, on first use. Checked against the existing title pool before
// inclusion; the script's own case-insensitive dedup is a final safety net.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Pharmacology: [
    T('Identify tolvaptan as a vasopressin V2 receptor antagonist used to treat euvolemic or hypervolemic hyponatremia'),
    T('Diagnose conivaptan as a nonselective vasopressin receptor antagonist available only in intravenous form'),
    T('Recognize the maximum safe rate of hyponatremia correction as generally limited to 8-10 mEq/L per 24 hours to avoid osmotic demyelination'),
    T('Diagnose fluid restriction as a first-line treatment for euvolemic hyponatremia from SIADH'),
    T('Identify the desired rate of correction for chronic hyponatremia as slower than for acute, symptomatic hyponatremia given the brain\'s osmotic adaptation'),
  ],
  Biochemistry: [
    T('Recognize fructosamine as reflecting average blood glucose over the preceding 2-3 weeks, useful when HbA1c is unreliable'),
    T('Identify glycated albumin as another short-term glycemic marker used in conditions affecting red blood cell turnover'),
    T('Diagnose hemolytic anemia as making HbA1c an unreliable marker of glycemic control due to abnormal red blood cell turnover'),
    T('Recognize a falsely low HbA1c as occurring in conditions with a shortened red blood cell lifespan'),
    T('Identify a falsely elevated HbA1c as occurring in conditions with a prolonged red blood cell lifespan, such as iron deficiency anemia'),
  ],
};

async function main() {
  const system = await database.system.upsert({
    where: { examType_name: { examType: EXAM_TYPE, name: AI_SYSTEM_NAME } },
    create: { examType: EXAM_TYPE, name: AI_SYSTEM_NAME, sortOrder: 999 },
    update: {},
  });

  let totalCreated = 0;
  for (const [discipline, titles] of Object.entries(TITLES_BY_DISCIPLINE)) {
    const existing = await database.learningObjective.findMany({
      where: { systemId: system.id, discipline },
      select: { title: true },
    });
    const existingTitles = new Set(existing.map((e) => e.title.trim().toLowerCase()));
    const seen = new Set();
    const toCreate = titles.filter((t) => {
      const key = t.title.trim().toLowerCase();
      if (existingTitles.has(key) || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (toCreate.length) {
      await database.learningObjective.createMany({
        data: toCreate.map(({ title, requiresTable }) => ({
          systemId: system.id,
          examType: EXAM_TYPE,
          discipline,
          title,
          requiresTable,
          yieldWeight: 50,
        })),
      });
    }

    totalCreated += toCreate.length;
    console.log(discipline, '->', toCreate.length, 'new titles added (', titles.length - toCreate.length, 'duplicates skipped )');
  }

  console.log('TOTAL new titles created:', totalCreated);
  await database.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
