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

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
