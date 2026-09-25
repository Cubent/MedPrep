'use client';

import { useState } from 'react';
import { InsightsChartsSection } from '../../components/insights-charts-section';
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
    q: 'Does it include CCS case simulations?',
    a: 'MedPrep Institute focuses on multiple-choice practice. Step 3 also includes Computer-based Case Simulations (CCS), so practice those with a dedicated CCS resource alongside this bank.',
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

      {/* Analytics charts */}
      <InsightsChartsSection
        exam="Step 3"
        topics={[
          { name: 'Cardiology', pct: 88 },
          { name: 'Infectious diseases', pct: 79 },
          { name: 'Endocrinology', pct: 71 },
          { name: 'Biostatistics', pct: 63 },
          { name: 'Ethics & patient safety', pct: 44 },
        ]}
      />

      {/* Built for the multiple-choice side */}
      <div className="bg-[#F4F2FB] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
            What it covers
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Built for the multiple-choice side of Step 3
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600">
            MedPrep Institute is a multiple-choice question bank. Step 3 also includes
            Computer-based Case Simulations (CCS), where you manage a virtual patient, so
            practice those with a dedicated CCS resource alongside it. Put your question
            practice here, and let the adaptive engine keep bringing back the management
            decisions you get wrong.
          </p>
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
      <div className="mx-auto max-w-6xl px-6 pb-16 sm:pb-24">
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
