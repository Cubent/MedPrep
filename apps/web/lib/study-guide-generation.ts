import type { StudyGuideQa } from '@repo/database/qbank';
import OpenAI from 'openai';

const MODEL = 'gpt-4o-mini-2024-07-18';

function buildSystemPrompt(count: number) {
  return `You are a concise medical education tutor. You will be given ${count} learning objectives. For EACH one, you're given only the exact questions the student attempted on that objective, the answer they chose, whether it was correct, and the correct answer — nothing else about the student.

Write ONE teaching paragraph per objective, 2-4 sentences, that directly targets the specific misconception their wrong answers reveal — not a generic overview of the topic. If a question shows they chose a specific wrong answer, address why that choice is wrong and what the correct concept actually is. Write it as a standalone factual/clinical teaching pearl, the way a textbook would state the key fact — never write "the student", "you attempted", "you missed", or anything referring to the person; just teach the concept the misses reveal.

Return ONLY a JSON object of this exact shape, no prose outside the JSON:
{
  "summaries": [
    { "learningObjectiveId": "the exact id you were given, echoed back verbatim", "summary": "the 2-4 sentence teaching paragraph" }
  ]
}
Return exactly ${count} items, one per objective given, in any order.`;
}

function formatQa(qa: StudyGuideQa[]): string {
  return qa
    .map((q, i) => {
      const outcome = q.isCorrect ? 'Answered correctly' : `Answered incorrectly (chose: "${q.chosenText ?? 'no answer'}")`;
      return `  Q${i + 1}: ${q.stem}\n  ${outcome}. Correct answer: "${q.correctText}"`;
    })
    .join('\n');
}

type Item = { learningObjectiveId: string; title: string; qa: StudyGuideQa[] };

function isValidSummary(s: unknown): s is { learningObjectiveId: string; summary: string } {
  if (!s || typeof s !== 'object') return false;
  const row = s as Record<string, unknown>;
  return typeof row.learningObjectiveId === 'string' && typeof row.summary === 'string' && row.summary.trim().length > 0;
}

/**
 * Batches every stale/missing Study Guide entry into ONE OpenAI call, fed
 * only each objective's title + its own question/answer history (never
 * anything else about the user), and returns learningObjectiveId -> summary.
 */
export async function generateStudyGuideSummaries(items: Item[]): Promise<Map<string, string>> {
  if (!items.length) return new Map();

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const objectiveList = items
    .map(
      (it, i) =>
        `${i + 1}. id="${it.learningObjectiveId}" title="${it.title}"\n${formatQa(it.qa)}`
    )
    .join('\n\n');

  let raw: string | null | undefined;
  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: buildSystemPrompt(items.length) },
        { role: 'user', content: `Learning objectives:\n\n${objectiveList}` },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 4000,
      temperature: 0.6,
    });
    raw = completion.choices[0]?.message?.content;
  } catch (error) {
    console.error('Study guide generation error:', error);
    return new Map();
  }
  if (!raw) return new Map();

  let parsed: { summaries?: unknown[] };
  try {
    parsed = JSON.parse(raw);
  } catch {
    return new Map();
  }

  const validIds = new Set(items.map((it) => it.learningObjectiveId));
  const result = new Map<string, string>();
  for (const s of (parsed.summaries ?? []).filter(isValidSummary)) {
    if (validIds.has(s.learningObjectiveId)) result.set(s.learningObjectiveId, s.summary.trim());
  }
  return result;
}
