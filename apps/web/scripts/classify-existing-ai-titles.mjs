// One-off script: for titles already seeded (created before the requiresTable
// field existed), ask AI which ones would naturally involve a table, and flip
// requiresTable on those specific rows. Titles created going forward already
// get this decided at creation time (see generate-ai-titles.mjs).
import OpenAI from 'openai';
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const AI_SYSTEM_NAME = 'AI Generated';

async function classify(discipline, titles) {
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content:
          'You are given a numbered list of USMLE Step 1 topic titles from one discipline. Return a JSON object ' +
          '{"tableIndices": [numbers]} listing the 1-based indices of roughly 15% of the titles — only ones where a ' +
          'real board question on that exact topic would naturally present structured/numeric data (a lab or CBC ' +
          'panel, a 2x2 diagnostic table, nerve conduction or reflex/strength findings, vital-sign trends, genetics ' +
          'ratios, ECG lead findings, etc.). Be conservative — most titles should NOT be picked. No prose outside the JSON.',
      },
      { role: 'user', content: `Discipline: ${discipline}\n${titles.map((t, i) => `${i + 1}. ${t}`).join('\n')}` },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 1000,
    temperature: 0.3,
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.tableIndices) ? parsed.tableIndices.filter((n) => Number.isInteger(n)) : [];
  } catch {
    return [];
  }
}

async function main() {
  const system = await database.system.findUnique({ where: { examType_name: { examType: 'STEP_1', name: AI_SYSTEM_NAME } } });
  if (!system) throw new Error('AI Generated system not found');

  const disciplines = await database.learningObjective.findMany({
    where: { systemId: system.id },
    select: { discipline: true },
    distinct: ['discipline'],
  });

  let totalFlagged = 0;
  for (const { discipline } of disciplines) {
    const objectives = await database.learningObjective.findMany({
      where: { systemId: system.id, discipline },
      select: { id: true, title: true, requiresTable: true },
      orderBy: { createdAt: 'asc' },
    });

    const indices = await classify(discipline, objectives.map((o) => o.title));
    const idsToFlag = indices
      .map((i) => objectives[i - 1]?.id)
      .filter(Boolean);

    if (idsToFlag.length) {
      await database.learningObjective.updateMany({
        where: { id: { in: idsToFlag } },
        data: { requiresTable: true },
      });
    }

    totalFlagged += idsToFlag.length;
    console.log(discipline, '->', idsToFlag.length, '/', objectives.length, 'flagged for tables');
  }

  console.log('TOTAL flagged:', totalFlagged);
  await database.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
