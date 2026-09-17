import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import {
  getExistingQuestionForObjective,
  getOrCreateAiSystem,
  pickAiObjectiveSet,
  saveGeneratedQuestion,
  type GeneratedQuestionContent,
} from '@repo/database/ai-practice';
import { getOrCreateActiveSession, getPendingSessionQuestion, markQuestionServed, SET_SIZE } from '@repo/database/qbank';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const MODEL = 'gpt-4o-mini-2024-07-18';

function buildSystemPrompt(count: number) {
  return `You are an expert USMLE Step 1 item writer for MedPrep Institute, a question-bank product.

You will be given exactly ${count} topic titles, each marked either [TABLE REQUIRED] or [NO TABLE]. Write one original, comprehensive, board-style clinical vignette question for EACH title, testing specifically the concept named by that title.

Vignette depth and length: match a genuine, full-length NBME item — NOT a short trivia prompt. Every stem MUST be at least 150 words, and most should run 170-250 words; treat anything shorter as incomplete. To hit that length, the stem must include ALL of the following, each as its own detail (do not skip any to save length): (1) patient age, sex, and relevant demographics/occupation; (2) a clear timeline of how the presenting complaint developed (onset, duration, progression); (3) at least two pertinent POSITIVE findings from history (symptoms, PMH, meds, family/social history) AND at least one pertinent NEGATIVE (something relevant that is explicitly absent); (4) a detailed physical or mental status exam with multiple specific findings, not just one; (5) vital signs, unless truly irrelevant to the concept being tested. Do not pad with filler unrelated to the diagnosis — every added sentence should still be clinically meaningful, the way a real exam item is dense with signal, not just long.

Table rule (follow exactly, per title):
- [TABLE REQUIRED]: the stem MUST embed a markdown table (GFM pipe syntax) presenting the kind of structured data a real question on this topic would show — a chemistry/CBC panel, a 2x2 diagnostic table, nerve conduction or reflex/strength findings, vital-sign trends over time, genetics ratios, ECG lead findings, etc. Build the table so that reading it is genuinely necessary to answer, not decorative.
- [NO TABLE]: do NOT include any markdown table or pipe-delimited data in this stem. Present any needed values as plain prose instead.

Each question needs exactly 5 answer choices, exactly one correct. Every wrong choice needs its own specific explanation of why it's wrong, at the same rigor as the main explanation. The main explanation should teach the underlying concept, not just restate the correct choice.

Return ONLY a JSON object of this exact shape, no prose outside the JSON:
{
  "questions": [
    {
      "title": "the exact title you were given for this question, echoed back verbatim",
      "stem": "the full vignette ending in the question sentence, markdown allowed (including GFM tables only when [TABLE REQUIRED])",
      "difficulty": 1-3,
      "explanation": "why the correct choice is right, teaching the underlying concept",
      "choices": [
        { "text": "choice text", "isCorrect": true or false, "explanation": "why this specific choice is right or wrong" }
      ]
    }
  ]
}
Each "choices" array must have exactly 5 entries in a random order (do not always put the correct answer first). Return exactly ${count} items in "questions", one per title given, in any order.`;
}

function isValidGenerated(q: unknown): q is GeneratedQuestionContent & { title: string } {
  if (!q || typeof q !== 'object') return false;
  const question = q as Record<string, unknown>;
  if (typeof question.title !== 'string' || typeof question.stem !== 'string') return false;
  if (typeof question.explanation !== 'string') return false;
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

async function generateQuestionsForTitles(items: { id: string; title: string; requiresTable: boolean }[]) {
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
    console.error('AI practice generation error:', error);
    return new Map<string, GeneratedQuestionContent>();
  }
  if (!raw) return new Map<string, GeneratedQuestionContent>();

  let parsed: { questions?: unknown[] };
  try {
    parsed = JSON.parse(raw);
  } catch {
    return new Map<string, GeneratedQuestionContent>();
  }

  const generated = (parsed.questions ?? []).filter(isValidGenerated);

  // Match each generated question back to a title by normalized text; fall
  // back to positional order for any that don't line up (model paraphrased).
  const byNormalizedTitle = new Map(items.map((it) => [it.title.trim().toLowerCase(), it.id]));
  const result = new Map<string, GeneratedQuestionContent>();
  const unmatchedItems = [...items];

  for (const g of generated) {
    const key = g.title.trim().toLowerCase();
    const matchedId = byNormalizedTitle.get(key);
    if (matchedId && !result.has(matchedId)) {
      result.set(matchedId, g);
      const idx = unmatchedItems.findIndex((it) => it.id === matchedId);
      if (idx !== -1) unmatchedItems.splice(idx, 1);
      continue;
    }
    const fallback = unmatchedItems.shift();
    if (fallback) result.set(fallback.id, g);
  }

  return result;
}

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'AI Practice is not configured yet. Add OPENAI_API_KEY to enable it.' },
      { status: 503 }
    );
  }

  const preference = await database.userPreference.findUnique({ where: { clerkUserId: userId } });
  if (!preference) {
    return NextResponse.json({ error: 'Select an exam in onboarding before practicing.' }, { status: 400 });
  }

  const discipline = new URL(request.url).searchParams.get('discipline');

  const aiSystem = await getOrCreateAiSystem(preference.exam);
  const session = await getOrCreateActiveSession(userId, preference.exam, 'AI_GENERATED');

  let picked = await getPendingSessionQuestion(session.id);

  const answeredInSet = await database.sessionQuestion.count({
    where: { sessionId: session.id, answeredAt: { not: null } },
  });

  if (!picked) {
    const remaining = SET_SIZE - answeredInSet;
    if (remaining > 0) {
      const picks = await pickAiObjectiveSet(userId, aiSystem.id, discipline, remaining);

      const withContent = await Promise.all(
        picks.map(async (p) => ({ pick: p, existing: await getExistingQuestionForObjective(p.objective.id) }))
      );

      const needsGeneration = withContent.filter((w) => !w.existing).map((w) => w.pick.objective);
      const generatedByObjectiveId = needsGeneration.length
        ? await generateQuestionsForTitles(
            needsGeneration.map((o) => ({ id: o.id, title: o.title, requiresTable: o.requiresTable }))
          )
        : new Map();

      for (const { pick, existing } of withContent) {
        let question = existing;
        if (!question) {
          const generated = generatedByObjectiveId.get(pick.objective.id);
          if (!generated) continue; // AI failed to produce this one — skip, don't serve broken content
          question = await saveGeneratedQuestion(pick.objective.id, generated);
        }
        await markQuestionServed(session.id, question.id, pick.isReview);
      }

      picked = await getPendingSessionQuestion(session.id);
    }
  }

  if (!picked) {
    return NextResponse.json({ question: null, setSize: SET_SIZE, answeredInSet });
  }

  const { choices, learningObjective, explanation, ...rest } = picked.question;
  return NextResponse.json({
    sessionId: session.id,
    isReview: picked.isReview,
    setSize: SET_SIZE,
    answeredInSet,
    question: {
      ...rest,
      system: learningObjective.system.name,
      objectiveTitle: learningObjective.title,
      learningObjectiveId: learningObjective.id,
      choices: choices.map((c) => ({ id: c.id, text: c.text, sortOrder: c.sortOrder })),
    },
  });
}
