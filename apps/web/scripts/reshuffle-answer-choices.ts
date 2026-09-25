// One-off: re-randomizes the answer order of already-generated AI questions,
// whose correct answers were saved in whatever pattern the model produced
// (whole batches with every correct answer in slot A). New questions are
// shuffled on save by saveGeneratedQuestion, so this only fixes existing rows.
//
// Only touches AnswerChoice.sortOrder, nothing else. Dry run by default.
//
//   cd packages/database
//   npx tsx --env-file=../../apps/web/.env.local ../../apps/web/scripts/reshuffle-answer-choices.ts          # preview
//   npx tsx --env-file=../../apps/web/.env.local ../../apps/web/scripts/reshuffle-answer-choices.ts --apply  # write
import { AI_SYSTEM_NAME, shuffleChoices } from '../../../packages/database/ai-practice';
import { database } from '../../../packages/database/index';

const apply = process.argv.includes('--apply');

const distribution = (positions: number[]) =>
  'ABCDE'
    .split('')
    .map((letter, i) => `${letter}:${positions[i] ?? 0}`)
    .join('  ');

async function main() {
  const questions = await database.question.findMany({
    where: { learningObjective: { system: { name: AI_SYSTEM_NAME } } },
    include: { choices: true },
  });

  const before = [0, 0, 0, 0, 0];
  const after = [0, 0, 0, 0, 0];
  const updates: ReturnType<typeof database.answerChoice.update>[] = [];

  for (const question of questions) {
    const current = [...question.choices].sort((a, b) => a.sortOrder - b.sortOrder);
    const shuffled = shuffleChoices(current);

    const beforeSlot = current.findIndex((choice) => choice.isCorrect);
    const afterSlot = shuffled.findIndex((choice) => choice.isCorrect);
    if (beforeSlot >= 0) before[beforeSlot]++;
    if (afterSlot >= 0) after[afterSlot]++;

    shuffled.forEach((choice, index) => {
      if (choice.sortOrder !== index) {
        updates.push(
          database.answerChoice.update({ where: { id: choice.id }, data: { sortOrder: index } })
        );
      }
    });
  }

  console.log(`AI-generated questions: ${questions.length}`);
  console.log(`Correct answer slot BEFORE: ${distribution(before)}`);
  console.log(`Correct answer slot AFTER:  ${distribution(after)}`);
  console.log(`Choice rows to update: ${updates.length}`);

  if (!apply) {
    console.log('\nDry run only. Nothing was written. Re-run with --apply to save.');
    return;
  }

  await database.$transaction(updates);
  console.log('\nApplied.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => database.$disconnect());
