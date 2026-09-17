// One-off script: populates the "AI Generated" System with a pool of short
// topic titles per discipline (cheap — just short strings). Actual question
// content is generated lazily later, on first real use, by the app itself.
import OpenAI from 'openai';
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';
const TITLES_PER_DISCIPLINE = 30;

const DISCIPLINES = [
  'Anatomy',
  'Behavioral Science',
  'Biochemistry',
  'Biostatistics, epidemiology & evidence-based medicine',
  'Embryology',
  'Genetics',
  'Histology',
  'Immunology',
  'Microbiology',
  'Pathology',
  'Pharmacology',
  'Physiology',
];

async function generateTitlesFor(discipline) {
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content:
          'You are writing a topic list for a USMLE Step 1 question bank. Given a discipline, output a JSON object ' +
          '{"titles": [{"title": "...", "requiresTable": true|false}, ...]} containing distinct, specific, high-yield ' +
          'topic titles within that discipline, each phrased like a learning objective (e.g. "Recognize acute ' +
          'intermittent porphyria from heme synthesis enzyme deficiency", not just "Porphyria"). No duplicates or ' +
          'near-duplicates. Set requiresTable:true for roughly 15% of titles — only ones where a real board question ' +
          'would naturally present structured/numeric data (a lab or CBC panel, a 2x2 diagnostic table, nerve ' +
          'conduction or reflex/strength findings, vital-sign trends, genetics ratios, ECG lead findings, etc.); ' +
          'requiresTable:false for the rest. No numbering, no prose outside the JSON.',
      },
      { role: 'user', content: `Discipline: ${discipline}\nGenerate ${TITLES_PER_DISCIPLINE} titles.` },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 3500,
    temperature: 0.9,
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.titles)) return [];
    return parsed.titles
      .filter((t) => t && typeof t.title === 'string' && t.title.trim())
      .map((t) => ({ title: t.title.trim(), requiresTable: Boolean(t.requiresTable) }));
  } catch {
    return [];
  }
}

async function main() {
  const system = await database.system.upsert({
    where: { examType_name: { examType: EXAM_TYPE, name: AI_SYSTEM_NAME } },
    create: { examType: EXAM_TYPE, name: AI_SYSTEM_NAME, sortOrder: 999 },
    update: {},
  });

  let totalCreated = 0;
  for (const discipline of DISCIPLINES) {
    const titles = await generateTitlesFor(discipline);
    if (!titles.length) {
      console.log(discipline, '-> AI returned no titles, skipping');
      continue;
    }

    const existing = await database.learningObjective.findMany({
      where: { systemId: system.id, discipline },
      select: { title: true },
    });
    const existingTitles = new Set(existing.map((e) => e.title.trim().toLowerCase()));
    const seen = new Set();
    const toCreate = titles.filter((t) => {
      const key = t.title.toLowerCase();
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
    console.log(discipline, '->', toCreate.length, 'new titles (', titles.length, 'generated,', existing.length, 'already existed)');
  }

  console.log('TOTAL new titles created:', totalCreated);
  await database.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
