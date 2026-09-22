// Randomly flips requiresTable to true on a slice of an exam's existing
// learning objectives. The agents that wrote the STEP_3 (and STEP_2_CK)
// title pools were supposed to set requiresTable: true on ~10-15% of
// titles that genuinely describe a table (labs panel, risk score, dosing
// table, etc.) but verifiably never did — every title landed as false.
// Rather than re-writing thousands of titles, this does a uniform random
// pass after the fact: not content-aware, just a flat percentage so a
// reasonable, non-excessive share of future-generated questions for this
// exam embed a table.
//
// Usage: node scripts/randomize-requires-table.mjs [EXAM_TYPE] [PERCENT]
//   node scripts/randomize-requires-table.mjs STEP_3 12
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();

const EXAM_TYPE = process.argv[2] || 'STEP_3';
const PERCENT = Number(process.argv[3] ?? 12);

if (!Number.isFinite(PERCENT) || PERCENT <= 0 || PERCENT > 50) {
  console.error('Refusing: percent should be a sane value between 0 and 50, got', PERCENT);
  process.exit(1);
}

async function main() {
  const eligible = await database.learningObjective.findMany({
    where: { examType: EXAM_TYPE, requiresTable: false },
    select: { id: true },
  });

  if (!eligible.length) {
    console.log(`No requiresTable:false titles found for ${EXAM_TYPE} — nothing to do.`);
    await database.$disconnect();
    return;
  }

  // Fisher-Yates shuffle, then take the front slice.
  const ids = eligible.map((e) => e.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }

  const targetCount = Math.round((ids.length * PERCENT) / 100);
  const chosenIds = ids.slice(0, targetCount);

  const result = await database.learningObjective.updateMany({
    where: { id: { in: chosenIds } },
    data: { requiresTable: true },
  });

  console.log(
    `${EXAM_TYPE}: flipped ${result.count} / ${ids.length} titles (${PERCENT}% target, ${targetCount} chosen) to requiresTable: true`
  );

  await database.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
