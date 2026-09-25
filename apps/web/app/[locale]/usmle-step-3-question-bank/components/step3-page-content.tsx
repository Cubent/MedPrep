'use client';

import { useState } from 'react';
import {
  Activity,
  Baby,
  BarChart3,
  Brain,
  Bug,
  HeartPulse,
  Scale,
  Scissors,
  Siren,
  Stethoscope,
  Wind,
} from 'lucide-react';

const disciplines = [
  { name: 'Endocrinology, diabetes & metabolism', icon: Activity },
  { name: 'Cardiology & vascular medicine', icon: HeartPulse },
  { name: 'Infectious diseases', icon: Bug },
  { name: 'Biostatistics & evidence-based medicine', icon: BarChart3 },
  { name: 'Pediatrics & adolescent medicine', icon: Baby },
  { name: 'Psychiatry & behavioral health', icon: Brain },
  { name: 'Pulmonology', icon: Wind },
  { name: 'Ethics, law & patient safety', icon: Scale },
  { name: 'Emergency medicine', icon: Siren },
  { name: 'Surgery & perioperative care', icon: Scissors },
  { name: 'Nephrology', icon: Stethoscope },
];

const stats = [
  { value: '10,400+', label: 'Question Topics' },
  { value: '27', label: 'Clinical Disciplines' },
  { value: '5', label: 'Questions Per Practice Set' },
  { value: '7 days', label: 'Free Trial' },
];

const steps = [
  {
    title: 'Work a management vignette',
    description: 'Full patient presentations that test what you would actually do next, from diagnosis to the plan you would follow over time.',
  },
  {
    title: 'The engine finds the gap',
    description: 'Get a management step wrong, and MedPrep Institute pinpoints the concept you missed, not just the question you missed it on.',
  },
  {
    title: 'It comes back at the right time',
    description: 'Spaced repetition resurfaces that concept from a new clinical angle right before you would have forgotten it.',
  },
  {
    title: 'You walk in ready',
    description: 'Your weakest disciplines get prioritized automatically, so limited study time around residency covers the whole exam efficiently.',
  },
];

const faqs = [
  {
    q: 'How is the Step 3 Qbank different from Step 2 CK?',
    a: 'Step 3 questions center on managing patients: diagnosing, choosing the next best step, and following conditions over time, plus areas like biostatistics, ethics, and patient safety. If you studied Step 2 CK here, your progress carries over, and concepts you struggled with there are prioritized first.',
  },
  {
    q: 'Can I focus on one discipline at a time?',
    a: 'Yes. Pick a discipline from Topics to restrict your practice to it, then widen back out to mixed, exam-style sets whenever you are ready.',
  },
  {
    q: 'What happens when I get a question wrong?',
    a: 'The adaptive engine flags the underlying concept and brings you variations on it through spaced repetition over the following days, instead of just moving on.',
  },
  {
    q: 'Can I fit this around a resident schedule?',
    a: 'Yes. Practice sets are five questions, so you can finish one in a short gap between patients or after a shift, and your progress is saved as you go.',
  },
  {
    q: 'Can I try the Step 3 Qbank for free?',
    a: 'Yes, you can try MedPrep Institute free for 7 days, including full access to the Step 3 question bank.',
  },
];

export const Step3PageContent = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <div
        className="relative overflow-hidden bg-cover bg-center px-6 pt-16 pb-20 sm:pt-20 sm:pb-28"
        style={{ backgroundColor: '#06005A', backgroundImage: "url('/MedPrep (1).png')" }}
      >
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
            <span>USMLE STEP 3 QUESTION BANK</span>
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight text-white sm:text-6xl">
            Prepare for Step 3 with a Qbank that remembers what you miss.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl">
            Patient management vignettes across 27 clinical disciplines, an adaptive engine
            that targets your weak spots, and built-in spaced repetition so decisions
            actually stick.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/sign-up"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#C46B10] px-8 text-base font-semibold text-white transition-colors hover:bg-[#a95a0d] sm:w-auto"
            >
              Start practicing free
            </a>
            <a
              href="#the-method"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-[#06005A] transition-colors hover:bg-white/90 sm:w-auto"
            >
              See the method
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white px-6 py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-gray-200 pl-5">
              <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disciplines covered */}
      <div className="bg-[#F4F2FB] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
              Coverage
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Practice across 27 clinical disciplines for Step 3
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              From endocrinology and cardiology to biostatistics, ethics, and patient safety,
              the areas Step 3 also tests.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {disciplines.map(({ name, icon: Icon }) => (
              <span
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
              >
                <Icon className="size-4 text-[#06005A]" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* The Method */}
      <div id="the-method" className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
              The Method
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              How MedPrep Institute preps you for Step 3
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-gray-200 p-6">
                <span className="flex size-9 items-center justify-center rounded-full bg-[#06005A] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="font-[family-name:var(--font-display)] mt-4 text-xl font-bold text-black">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Whole-patient practice */}
      <div className="bg-[#F4F2FB] px-6 py-16 sm:py-20">
        <style>{`
          @keyframes s3-step { 0%, 26%, 100% { opacity: 0; transform: scale(0.6); } 6%, 20% { opacity: 1; transform: scale(1); } }
          @keyframes s3-label { 0%, 26%, 100% { fill: #6b7280; } 6%, 20% { fill: #06005A; } }
          @keyframes s3-chip { 0%, 100% { opacity: 0.2; transform: scale(0.7); } 12%, 40% { opacity: 1; transform: scale(1); } }
          .s3-step { transform-box: fill-box; transform-origin: center; opacity: 0; animation: s3-step 8s ease-in-out infinite; }
          .s3-label { animation: s3-label 8s ease-in-out infinite; }
          .s3-chip { transform-box: fill-box; transform-origin: center; opacity: 0.2; animation: s3-chip 7s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .s3-step { animation: none; opacity: 1; transform: none; }
            .s3-label { animation: none; }
            .s3-chip { animation: none; opacity: 1; transform: none; }
          }
        `}</style>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
              Built for Step 3
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-balance text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Step 3 tests the whole patient. So does your practice.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
              Manage a patient from first presentation to follow-up, in sets short enough to fit
              around a resident schedule.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Patient journey */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 sm:p-8">
              <svg
                viewBox="0 0 480 150"
                className="h-auto w-full"
                role="img"
                aria-label="A management vignette moves through four stages: diagnose, choose the next best step, follow the patient over time, and counsel on prevention."
              >
                <line x1="60" y1="52" x2="420" y2="52" stroke="rgba(6,0,90,0.16)" strokeWidth="2" />
                {[
                  { x: 60, label: 'Diagnose', sub: 'What is going on' },
                  { x: 180, label: 'Next best step', sub: 'What to do now' },
                  { x: 300, label: 'Follow-up', sub: 'How it changes' },
                  { x: 420, label: 'Counsel', sub: 'Prevention & safety' },
                ].map((stage, index) => (
                  <g key={stage.label}>
                    <circle cx={stage.x} cy="52" r="20" fill="#C46B10" fillOpacity="0.2" className="s3-step" style={{ animationDelay: `${index * 2}s` }} />
                    <circle cx={stage.x} cy="52" r="13" fill="white" stroke="#06005A" strokeWidth="2" />
                    <text x={stage.x} y="56.5" fontSize="12" fontWeight="700" fill="#06005A" textAnchor="middle">
                      {index + 1}
                    </text>
                    <text
                      x={stage.x}
                      y="96"
                      fontSize="12.5"
                      fontWeight="700"
                      textAnchor="middle"
                      className="s3-label"
                      style={{ animationDelay: `${index * 2}s` }}
                    >
                      {stage.label}
                    </text>
                    <text x={stage.x} y="113" fontSize="10.5" fill="#9ca3af" textAnchor="middle">
                      {stage.sub}
                    </text>
                  </g>
                ))}
              </svg>
              <h3 className="font-[family-name:var(--font-display)] mt-5 text-2xl tracking-tight text-black">
                Follow one patient from diagnosis to follow-up
              </h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                Step 3 rewards the decision after the diagnosis. Vignettes ask what you would do
                next, how you would monitor, and what you would tell the patient, so you practice
                the full arc and not just the label.
              </p>
            </div>

            {/* Resident week */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 sm:p-8">
              <svg
                viewBox="0 0 320 150"
                className="h-auto w-full"
                role="img"
                aria-label="A resident's week with long shifts, and short five-question practice sets fitted into the gaps."
              >
                {[
                  { day: 'M', shift: 74, gapY: 108 },
                  { day: 'T', shift: 60, gapY: 94 },
                  { day: 'W', shift: 84, gapY: 118 },
                  { day: 'T', shift: 52, gapY: 86 },
                  { day: 'F', shift: 70, gapY: 104 },
                  { day: 'S', shift: 36, gapY: 70 },
                  { day: 'S', shift: 24, gapY: 58 },
                ].map((col, index) => {
                  const x = 18 + index * 42;
                  return (
                    <g key={`${col.day}-${index}`}>
                      <rect x={x} y="14" width="28" height={col.shift} rx="5" fill="rgba(6,0,90,0.1)" />
                      <rect
                        x={x + 4}
                        y={col.gapY}
                        width="20"
                        height="10"
                        rx="3"
                        fill="#C46B10"
                        className="s3-chip"
                        style={{ animationDelay: `${index * 0.6}s` }}
                      />
                      <text x={x + 14} y="144" fontSize="10" fill="#6b7280" textAnchor="middle">
                        {col.day}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <h3 className="font-[family-name:var(--font-display)] mt-5 text-2xl tracking-tight text-black">
                Fits in the gaps between shifts
              </h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                Sets are five questions, so one fits between patients or after a long day. Your
                progress saves as you go, and the next set picks up where you left off.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
            FAQ
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-center text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Step 3 Qbank questions
          </h2>

          <div className="mt-10 flex w-full flex-col">
            {faqs.map((item, index) => (
              <div key={item.q} className="border-b border-gray-200 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left text-lg font-medium text-black hover:underline"
                >
                  <span>{item.q}</span>
                  <svg
                    className={`mt-1 size-4 shrink-0 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {openFaq === index && (
                  <p className="pb-5 text-base leading-relaxed text-gray-600">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-16 sm:pt-12 sm:pb-24">
        <div className="rounded-3xl px-8 py-16 text-center sm:py-20" style={{ backgroundColor: '#06005A' }}>
          <h2 className="font-[family-name:var(--font-display)] mx-auto max-w-xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stop doing random Step 3 questions.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-balance text-lg text-white/70">
            Start practicing right now. Try it free for 7 days.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/sign-up"
              className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#C46B10] px-8 text-base font-semibold text-white transition-colors hover:bg-[#a95a0d] sm:w-auto"
            >
              Start your first set
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
