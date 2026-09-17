import type { GeneratedQuestionContent } from '@repo/database/ai-practice';
import OpenAI from 'openai';

const MODEL = 'gpt-4o-mini-2024-07-18';

function buildSystemPrompt(count: number) {
  return `You are an expert USMLE Step 1 item writer for MedPrep Institute, a question-bank product.

You will be given exactly ${count} topic titles, each marked either [TABLE REQUIRED] or [NO TABLE]. Write one original, comprehensive, board-style clinical vignette question for EACH title, testing specifically the concept named by that title.

Vignette depth and length: match a genuine, full-length NBME item — NOT a short trivia prompt. Every stem MUST be at least 150 words, and most should run 170-250 words; treat anything shorter as incomplete. To hit that length, the stem must include ALL of the following, each as its own detail (do not skip any to save length): (1) patient age, sex, and relevant demographics/occupation; (2) a clear timeline of how the presenting complaint developed (onset, duration, progression); (3) at least two pertinent POSITIVE findings from history (symptoms, PMH, meds, family/social history) AND at least one pertinent NEGATIVE (something relevant that is explicitly absent); (4) a detailed physical or mental status exam with multiple specific findings, not just one; (5) vital signs, unless truly irrelevant to the concept being tested. Do not pad with filler unrelated to the diagnosis — every added sentence should still be clinically meaningful, the way a real exam item is dense with signal, not just long.

Table rule (hard constraint, not a suggestion — follow exactly, per title):
- [TABLE REQUIRED]: the stem MUST embed a markdown table (GFM pipe syntax) presenting the kind of structured data a real question on this topic would show — a chemistry/CBC panel, a 2x2 diagnostic table, nerve conduction or reflex/strength findings, vital-sign trends over time, genetics ratios, ECG lead findings, etc. Build the table so that reading it is genuinely necessary to answer, not decorative.
- [NO TABLE]: you are FORBIDDEN from including any markdown table, pipe character, or pipe-delimited data in this stem, under any circumstances — even if the topic could theoretically support one. Present all values as plain prose sentences instead. A [NO TABLE] stem that contains a table is a failed response.

Each question needs exactly 5 answer choices, exactly one correct. Every wrong choice needs its own specific explanation of why it's wrong, at the same rigor as the main explanation. The main explanation should teach the underlying concept, not just restate the correct choice.

Also write a "summary": one or two sentences recapping the core teaching point of the learning objective itself (not the specific vignette) — the same kind of concise recap a student would want to review later, independent of this particular question's clinical details.

Return ONLY a JSON object of this exact shape, no prose outside the JSON:
{
  "questions": [
    {
      "title": "the exact title you were given for this question, echoed back verbatim",
      "stem": "the full vignette ending in the question sentence, markdown allowed (including GFM tables only when [TABLE REQUIRED])",
      "difficulty": 1-3,
      "summary": "a one-to-two sentence recap of the underlying concept, independent of this specific vignette",
      "explanation": "why the correct choice is right, teaching the underlying concept",
      "choices": [
        { "text": "choice text", "isCorrect": true or false, "explanation": "why this specific choice is right or wrong" }
      ]
    }
  ]
}
Each "choices" array must have exactly 5 entries in a random order (do not always put the correct answer first). Return exactly ${count} items in "questions", one per title given, in any order.`;
}

function hasMarkdownTable(text: string): boolean {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].includes('|') && /^[\s|:-]+$/.test(lines[i + 1]) && lines[i + 1].includes('-')) return true;
  }
  return false;
}

function isValidGenerated(q: unknown): q is GeneratedQuestionContent & { title: string } {
  if (!q || typeof q !== 'object') return false;
  const question = q as Record<string, unknown>;
  if (typeof question.title !== 'string' || typeof question.stem !== 'string') return false;
  if (typeof question.explanation !== 'string' || typeof question.summary !== 'string') return false;
  if (!Array.isArray(question.choices) || question.choices.length !== 5) return false;
  const correctCount = question.choices.filter(
    (c) => c && typeof c === 'object' && (c as Record<string, unknown>).isCorrect === true
  ).length;
  if (correctCount !== 1) return false;
  return question.choices.every(
    (c) =>
      c &&
      typeof c === 'object' &&
      typeof (c as Record<string, unknown>).text === 'string' &&
      typeof (c as Record<string, unknown>).explanation === 'string' &&
      typeof (c as Record<string, unknown>).isCorrect === 'boolean'
  );
}

/**
 * Batches every title that still needs content into ONE OpenAI call (not one
 * call per title) and returns a map of learningObjectiveId -> generated
 * content, matched back to the requesting title by exact text, falling back
 * to positional order for any the model paraphrased.
 */
export async function generateQuestionsForTitles(
  items: { id: string; title: string; requiresTable: boolean }[]
): Promise<Map<string, GeneratedQuestionContent>> {
  if (!items.length) return new Map();

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const titleList = items
    .map((it, i) => `${i + 1}. [${it.requiresTable ? 'TABLE REQUIRED' : 'NO TABLE'}] ${it.title}`)
    .join('\n');

  let raw: string | null | undefined;
  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: buildSystemPrompt(items.length) },
        { role: 'user', content: `Titles:\n${titleList}` },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 6000,
      temperature: 0.8,
    });
    raw = completion.choices[0]?.message?.content;
  } catch (error) {
    console.error('AI question generation error:', error);
    return new Map();
  }
  if (!raw) return new Map();

  let parsed: { questions?: unknown[] };
  try {
    parsed = JSON.parse(raw);
  } catch {
    return new Map();
  }

  const generated = (parsed.questions ?? []).filter(isValidGenerated);

  // Match each generated question back to a title by normalized text; fall
  // back to positional order for any that don't line up (model paraphrased).
  const byNormalizedTitle = new Map(items.map((it) => [it.title.trim().toLowerCase(), it.id]));
  const itemsById = new Map(items.map((it) => [it.id, it]));
  const result = new Map<string, GeneratedQuestionContent>();
  const unmatchedItems = [...items];

  for (const g of generated) {
    const key = g.title.trim().toLowerCase();
    const matchedId = byNormalizedTitle.get(key);
    let targetId: string | undefined;
    if (matchedId && !result.has(matchedId)) {
      targetId = matchedId;
      const idx = unmatchedItems.findIndex((it) => it.id === matchedId);
      if (idx !== -1) unmatchedItems.splice(idx, 1);
    } else {
      targetId = unmatchedItems.shift()?.id;
    }
    if (!targetId) continue;

    // Don't trust prompt compliance alone — structurally reject any stem
    // that violates its title's deterministic table requirement, rather
    // than persisting wrong content. The objective just stays ungenerated
    // and gets retried (fresh) the next time it's picked.
    const requiresTable = itemsById.get(targetId)?.requiresTable ?? false;
    if (hasMarkdownTable(g.stem) !== requiresTable) {
      console.error(`AI generation table-rule violation for "${g.title}" (requiresTable=${requiresTable}) — discarding`);
      continue;
    }

    result.set(targetId, g);
  }

  return result;
}
