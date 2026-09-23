'use client';

import { ChevronLeft, ChevronRight, Check, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';

type PlanId = 'monthly' | 'quarterly' | 'yearly';

type Plan = {
  id: PlanId;
  label: string;
  perMonth: string;
  billedLine: string;
  badges: { text: string; tone: 'primary' | 'savings' | 'neutral' }[];
};

const PLANS: Plan[] = [
  {
    id: 'monthly',
    label: 'Monthly',
    perMonth: '$40',
    billedLine: 'Billed $40 monthly',
    badges: [{ text: 'Most popular', tone: 'primary' }],
  },
  {
    id: 'quarterly',
    label: '3 months',
    perMonth: '$36.67',
    billedLine: 'Billed $110 every 3 months',
    badges: [
      { text: 'Low commitment', tone: 'neutral' },
      { text: 'Save 10%', tone: 'savings' },
    ],
  },
  {
    id: 'yearly',
    label: 'Yearly',
    perMonth: '$33.33',
    billedLine: 'Billed $400 yearly',
    badges: [
      { text: 'Best value', tone: 'primary' },
      { text: 'Save 20%', tone: 'savings' },
    ],
  },
];

const FEATURES = [
  { icon: Sparkles, text: 'Adaptive question sets' },
  { icon: RefreshCw, text: 'Spaced repetition built in' },
  { icon: ShieldCheck, text: 'Physician-reviewed explanations' },
];

const Badge = ({ text, tone }: { text: string; tone: 'primary' | 'savings' | 'neutral' }) => (
  <span
    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
      tone === 'primary'
        ? 'bg-[#C46B10]/15 text-[#C46B10]'
        : tone === 'savings'
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-gray-100 text-gray-600'
    }`}
  >
    {text}
  </span>
);

// Placeholder testimonial content — NOT real student reviews. Replace with
// actual quotes/names (or first-name + exam only, for privacy) before this
// ships publicly. Avatars are illustrated (DiceBear, deterministic from
// `seed`), never real photos — pairing a real person's photo with a quote
// they never said is a textbook deceptive-testimonial pattern, so that
// stays off the table even as a placeholder.
type Testimonial = { quote: string; body: string; seed: string; role: string };

const avatarUrl = (seed: string) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

const TESTIMONIAL_PAGES: Testimonial[][] = [
  [
    {
      quote: 'Finally felt like the bank knew what I needed',
      body: 'The weak-area follow-up questions made review actually useful instead of just re-reading the same explanations.',
      seed: 'medprep-s1',
      role: 'STEP 1 student',
    },
    {
      quote: 'Kept me on pace all semester',
      body: 'I stopped falling behind on review because it just showed up automatically instead of me having to plan it myself.',
      seed: 'medprep-s2',
      role: 'STEP 2 CK student',
    },
    {
      quote: 'The explanations are what sold me',
      body: 'They read like something a physician actually wrote, not a generic summary pulled from a textbook.',
      seed: 'medprep-s3',
      role: 'STEP 3 candidate',
    },
  ],
  [
    {
      quote: 'Picked up right where I left off',
      body: 'Switching from Step 3 to ABIM prep, it already knew what I was weak on instead of starting from zero.',
      seed: 'medprep-a1',
      role: 'ABIM candidate',
    },
    {
      quote: 'Dedicated period felt manageable',
      body: 'The reserve set for weak areas meant I wasn’t just grinding random questions in the last few weeks.',
      seed: 'medprep-s4',
      role: 'STEP 2 CK student',
    },
    {
      quote: 'Questions actually connect',
      body: 'Working through a case-style thread instead of jumping topics made things stick better than flashcards ever did.',
      seed: 'medprep-s5',
      role: 'STEP 1 student',
    },
  ],
];

// The day-7 date is computed from "now", not hardcoded, so it's always
// accurate regardless of when someone lands on this page.
const TrialTimeline = () => {
  const dayZero = new Date();
  const conversionDate = new Date(dayZero);
  conversionDate.setDate(conversionDate.getDate() + 7);
  const conversionLabel = conversionDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  const steps = [
    {
      number: '01',
      title: 'Today — full access',
      body: 'Every adaptive set, review schedule, and explanation unlocks now. No charge today.',
    },
    {
      number: '02',
      title: 'Before day 7 — a reminder',
      body: 'We email you before the trial converts, so you stay in control of your subscription.',
    },
    {
      number: '03',
      title: 'Day 7 — plan begins',
      body: `Your selected plan starts on ${conversionLabel}. Cancel anytime before then and pay nothing.`,
    },
  ];

  return (
    <div className="mt-8 flex flex-col gap-5">
      {steps.map((step) => (
        <div key={step.number} className="flex items-start gap-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#06005A]/10 text-sm font-bold text-[#06005A]">
            {step.number}
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-black">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  const [page, setPage] = useState(0);
  const totalPages = TESTIMONIAL_PAGES.length;

  return (
    <div className="mt-16 border-t border-gray-100 pt-12">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
        What students say
      </p>
      <p className="mx-auto mt-2 max-w-md text-center text-sm text-gray-500">
        Placeholder testimonials shown here for layout — swap in real student reviews before
        launch.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {TESTIMONIAL_PAGES[page].map((t) => (
          <div key={t.quote} className="rounded-2xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-black">&quot;{t.quote}&quot;</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.body}</p>
            <div className="mt-4 flex items-center gap-2.5">
              <img
                src={avatarUrl(t.seed)}
                alt=""
                className="size-8 shrink-0 rounded-full bg-gray-100"
              />
              <span className="text-xs font-medium text-gray-500">{t.role}</span>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
            aria-label="Previous testimonials"
            className="flex size-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {TESTIMONIAL_PAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Go to testimonial page ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === page ? 'w-6 bg-[#C46B10]' : 'w-1.5 bg-gray-200'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPage((p) => (p + 1) % totalPages)}
            aria-label="Next testimonials"
            className="flex size-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
};

const PaywallPage = () => {
  const [selected, setSelected] = useState<PlanId>('monthly');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = PLANS.find((p) => p.id === selected)!;

  const startCheckout = async () => {
    setIsRedirecting(true);
    setError(null);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selected }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.url) {
        setError(data.error ?? 'Could not start checkout. Please try again.');
        setIsRedirecting(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Could not start checkout. Check your connection and try again.');
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex max-w-3xl items-center gap-2.5 px-6 pt-8">
        <img
          src="/animateos-logo (1).png"
          alt="MedPrep Institute Logo"
          className="h-7 w-7 rounded-md object-cover"
        />
        <span className="text-base font-medium text-[#06005A]">MedPrep Institute</span>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
          Almost there
        </p>
        <h1 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Start your 7-day free trial.
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Experience the NARQB Method before you commit.
        </p>
        <p className="mt-1 text-sm font-medium text-emerald-700">No risk. Cancel anytime.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {PLANS.map((p) => {
            const isSelected = p.id === selected;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p.id)}
                className={`rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  isSelected ? 'border-[#C46B10] bg-[#C46B10]/5' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-black">{p.label}</h3>
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      isSelected ? 'border-[#C46B10] bg-[#C46B10]' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <Check className="size-3 text-white" strokeWidth={3} />}
                  </span>
                </div>

                <p className="mt-3 text-2xl font-bold text-black">
                  {p.perMonth}
                  <span className="text-sm font-medium text-gray-500">/mo</span>
                </p>
                <p className="mt-1 text-xs text-gray-500">{p.billedLine}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.badges.map((badge) => (
                    <Badge key={badge.text} text={badge.text} tone={badge.tone} />
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
        )}

        <button
          type="button"
          onClick={startCheckout}
          disabled={isRedirecting}
          className="mt-6 w-full rounded-full bg-[#C46B10] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#a95a0d] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isRedirecting ? 'Redirecting…' : 'Start my free trial'}
        </button>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Your trial
          </p>
          <p className="mt-2 text-xl font-bold text-black">
            7 days free, then {plan.perMonth}/mo
          </p>
          <p className="mt-1 text-sm text-gray-600">{plan.billedLine} &middot; Cancel anytime</p>

          <div className="mt-5 flex flex-col gap-3">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-[#06005A]">
                  <Icon className="size-3.5" />
                </span>
                <span className="text-sm text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <TrialTimeline />

        <TestimonialsSection />
      </div>
    </div>
  );
};

export default PaywallPage;
