import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const MODEL = 'gpt-4o-mini-2024-07-18';

const SYSTEM_PROMPT =
  'You are the AI Tutor inside MedPrep Institute, a USMLE/ABIM adaptive question bank. ' +
  'You help medical students understand concepts they are studying — explain the reasoning ' +
  'behind clinical vignettes, clarify pathophysiology/pharmacology, and help distinguish similar ' +
  'diagnoses, without simply restating a textbook. Be concise, exam-focused, and encouraging. ' +
  'If asked something outside medical education, gently redirect to studying.';

// Per-user in-memory rate limit — no external store needed for a single-instance
// dev/small-scale deployment. Fixed window: N messages per WINDOW_MS, reset after
// the window elapses. Resets on server restart, which is fine for its purpose
// (capping runaway/abusive usage, not a hard security boundary).
const RATE_LIMIT = 20;
const WINDOW_MS = 10 * 60 * 1000;
const requestLog = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(userId: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  // Opportunistic cleanup so the map doesn't grow unbounded with stale entries.
  if (requestLog.size > 500) {
    for (const [key, entry] of requestLog) {
      if (now > entry.resetAt) requestLog.delete(key);
    }
  }

  const entry = requestLog.get(userId);
  if (!entry || now > entry.resetAt) {
    requestLog.set(userId, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rateLimit = checkRateLimit(userId);
  if (!rateLimit.allowed) {
    const minutes = Math.ceil(rateLimit.retryAfterSeconds / 60);
    return NextResponse.json(
      {
        error: `You've hit the AI Tutor's message limit for now — try again in about ${minutes} minute${minutes === 1 ? '' : 's'}.`,
      },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'AI Tutor is not configured yet. Add OPENAI_API_KEY to enable it.' },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const context = body?.context as
    | { system: string; objectiveTitle: string; stem: string }
    | null
    | undefined;

  if (!messages.length) {
    return NextResponse.json({ error: 'Missing messages' }, { status: 400 });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const systemPrompt = context
    ? `${SYSTEM_PROMPT}\n\nThe student is currently on a practice question in the "${context.system}" system, ` +
      `learning objective: "${context.objectiveTitle}". The question stem is:\n"""${context.stem}"""\n` +
      'If they refer to "this question", "this vignette", or similar, assume they mean the one above. ' +
      'Do not reveal or confirm the correct answer choice directly — help them reason toward it instead.'
    : SYSTEM_PROMPT;

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
          content: m.content,
        })),
      ],
      max_tokens: 600,
      temperature: 0.4,
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, I couldn't come up with a response.";
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI Tutor error:', error);
    return NextResponse.json({ error: 'The AI Tutor is unavailable right now.' }, { status: 502 });
  }
}
