'use client';

import { useState } from 'react';
import {
  Activity,
  BarChart3,
  Bone,
  Brain,
  Bug,
  Droplets,
  HeartPulse,
  Pill,
  Scale,
  Stethoscope,
  Wind,
} from 'lucide-react';

const disciplines = [
  { name: 'Cardiology & vascular medicine', icon: HeartPulse },
  { name: 'Pulmonary & critical care', icon: Wind },
  { name: 'Infectious diseases', icon: Bug },
  { name: 'Endocrinology, diabetes & metabolism', icon: Activity },
  { name: 'Nephrology', icon: Stethoscope },
  { name: 'Neurology', icon: Brain },
  { name: 'Hematology & oncology', icon: Droplets },
  { name: 'Gastroenterology & hepatology', icon: Pill },
  { name: 'Rheumatology', icon: Bone },
  { name: 'Biostatistics & evidence-based medicine', icon: BarChart3 },
  { name: 'Ethics, law & patient safety', icon: Scale },
];

const stats = [
  { value: '10,400+', label: 'Question Topics' },
  { value: '27', label: 'Clinical Disciplines' },
  { value: '5', label: 'Questions Per Practice Set' },
  { value: '7 days', label: 'Free Trial' },
];

const steps = [
  {
    title: 'Work a board-style vignette',
    description: 'Full patient presentations across internal medicine, from diagnosis to the management plan you would follow over time.',
  },
  {
    title: 'The engine finds the gap',
    description: 'Get a question wrong, and MedPrep Institute pinpoints the concept you missed, not just the question you missed it on.',
  },
  {
    title: 'It comes back at the right time',
    description: 'Spaced repetition resurfaces that concept from a new clinical angle right before you would have forgotten it.',
  },
  {
    title: 'You walk in ready',
    description: 'Your weakest disciplines get prioritized automatically, so limited study time around clinical work covers the whole exam efficiently.',
  },
];

const faqs = [
  {
    q: 'How is the ABIM Qbank different from the USMLE banks?',
    a: 'The ABIM Internal Medicine exam is the board certification exam for internal medicine physicians, so practice centers on diagnosing and managing adult patients across the specialties. If you studied Step 1, Step 2 CK, or Step 3 here, your progress carries over, and concepts you struggled with are prioritized first.',
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
    q: 'Can I fit this around a busy clinical schedule?',
    a: 'Yes. Practice sets are five questions, so you can finish one in a short gap between patients or after a shift, and your progress is saved as you go.',
  },
  {
    q: 'Can I try the ABIM Qbank for free?',
    a: 'Yes, you can try MedPrep Institute free for 7 days, including full access to the ABIM question bank.',
  },
];

export const AbimPageContent = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <div
        className="relative overflow-hidden bg-cover bg-center px-6 pt-16 pb-20 sm:pt-20 sm:pb-28"
        style={{ backgroundColor: '#06005A', backgroundImage: "url('/MedPrep (3).png')" }}
      >
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
            <span>ABIM INTERNAL MEDICINE QUESTION BANK</span>
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight text-white sm:text-6xl">
            Prepare for the ABIM exam with a Qbank that remembers what you miss.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl">
            Internal medicine vignettes across 27 clinical disciplines, an adaptive engine
            that targets your weak spots, and built-in spaced repetition so what you learn
            actually sticks.
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
              Practice across 27 clinical disciplines for the ABIM exam
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              From cardiology and pulmonary medicine to hematology, rheumatology, and patient
              safety, the breadth of internal medicine.
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
              How MedPrep Institute preps you for the ABIM exam
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

      {/* Built into the app: review calendar + AI Tutor */}
      <div className="bg-[#F4F2FB] px-6 py-16 sm:py-20">
        <style>{`
          @keyframes abim-pop { 0%, 100% { opacity: 0.25; transform: scale(0.6); } 50% { opacity: 1; transform: scale(1); } }
          @keyframes abim-user { 0%, 4% { opacity: 0; transform: translateY(8px); } 9%, 92% { opacity: 1; transform: none; } 100% { opacity: 0; } }
          @keyframes abim-typing { 0%, 14% { opacity: 0; } 18%, 34% { opacity: 1; } 38%, 100% { opacity: 0; } }
          @keyframes abim-reply { 0%, 38% { opacity: 0; transform: translateY(8px); } 44%, 92% { opacity: 1; transform: none; } 100% { opacity: 0; } }
          @keyframes abim-dot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-3px); opacity: 1; } }
          .abim-pop { animation: abim-pop 3.6s ease-in-out infinite; }
          .abim-user { animation: abim-user 10s ease-out infinite; }
          .abim-typing { animation: abim-typing 10s ease-out infinite; }
          .abim-reply { animation: abim-reply 10s ease-out infinite; }
          .abim-dot { animation: abim-dot 1s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .abim-pop, .abim-user, .abim-reply, .abim-dot { animation: none; opacity: 1; transform: none; }
            .abim-typing { display: none; }
          }
        `}</style>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
              Inside your dashboard
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-balance text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Everything you miss gets scheduled, and help is one tap away.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
              Two tools built into MedPrep Institute keep your ABIM prep on track without a
              spreadsheet or a study plan to manage.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Review calendar */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 sm:p-8">
              <div
                className="rounded-xl border border-gray-200 bg-white p-4"
                role="img"
                aria-label="A month calendar with review days marked, showing when missed concepts come back."
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#06005A]">Review calendar</p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="size-2 rounded-full bg-[#C46B10]" />
                    Reviews due
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[0.65rem] font-semibold uppercase text-gray-400">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((label, i) => (
                    <span key={`${label}-${i}`}>{label}</span>
                  ))}
                </div>
                <div className="mt-1 grid grid-cols-7 gap-1">
                  {Array.from({ length: 28 }, (_, i) => {
                    const day = i + 1;
                    const due: Record<number, number> = { 3: 1, 5: 2, 6: 1, 9: 3, 11: 1, 12: 2, 15: 1, 17: 2, 19: 3, 22: 1, 24: 2, 26: 1 };
                    const count = due[day] ?? 0;
                    const isToday = day === 10;
                    return (
                      <div
                        key={day}
                        className={`flex aspect-square flex-col items-center justify-center rounded-lg text-xs ${
                          isToday
                            ? 'bg-[#06005A] font-semibold text-white'
                            : count > 0
                              ? 'bg-[#C46B10]/10 text-[#000C3F]'
                              : 'text-gray-500'
                        }`}
                      >
                        {day}
                        {count > 0 && (
                          <span
                            className="abim-pop mt-0.5 h-1.5 rounded-full bg-[#C46B10]"
                            style={{ width: `${count * 0.3 + 0.35}rem`, animationDelay: `${(day % 7) * 0.35}s` }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h3 className="font-[family-name:var(--font-display)] mt-6 text-2xl tracking-tight text-black">
                Missed concepts land on your calendar
              </h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                When you get a question wrong, its concept is scheduled for review on an upcoming
                day. Open your review calendar any time to see what is due and when.
              </p>
            </div>

            {/* AI Tutor */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 sm:p-8">
              <div
                className="overflow-hidden rounded-xl border border-gray-200 bg-[#F7F7FA]"
                role="img"
                aria-label="A chat with the AI Tutor: the learner asks why an answer choice is wrong and the tutor explains."
              >
                <div className="flex items-center gap-2.5 bg-[#06005A] px-4 py-3">
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                    <defs>
                      <linearGradient id="abimTutorGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#a78bfa" />
                        <stop offset="0.55" stopColor="#f0abfc" />
                        <stop offset="1" stopColor="#facc15" />
                      </linearGradient>
                    </defs>
                    <path d="M12 2 L14.2 9.2 L21.5 11.5 L14.2 13.8 L12 21 L9.8 13.8 L2.5 11.5 L9.8 9.2 Z" fill="url(#abimTutorGradient)" />
                  </svg>
                  <p className="text-sm font-semibold text-white">AI Tutor</p>
                </div>

                <div className="relative flex h-64 flex-col justify-end gap-3 p-4">
                  <div className="abim-user ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#06005A] px-3.5 py-2 text-sm text-white">
                    Why is answer C wrong?
                  </div>
                  <div className="abim-typing absolute bottom-4 left-4 flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-3.5 py-3 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="abim-dot size-1.5 rounded-full bg-gray-400"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  <div className="abim-reply max-w-[88%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-sm leading-relaxed text-gray-700 shadow-sm">
                    Choice C would fit a different presentation. Re-read the stem: the timing and
                    the trend in the results point somewhere else. Want me to walk through it?
                  </div>
                </div>

                <div className="border-t border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-400">
                  Ask the AI Tutor&hellip;
                </div>
              </div>
              <h3 className="font-[family-name:var(--font-display)] mt-6 text-2xl tracking-tight text-black">
                Stuck? Ask the AI Tutor
              </h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                Ask about a concept, why an answer choice is wrong, or how to think through a
                vignette, right from the practice screen while the question is fresh.
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
            ABIM Qbank questions
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
            Stop doing random ABIM questions.
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
