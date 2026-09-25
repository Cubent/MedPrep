'use client';

import { useState } from 'react';
import { DashboardPreviewSection } from '../../components/dashboard-preview-section';
import {
  Stethoscope,
  Scissors,
  Baby,
  HeartHandshake,
  Brain,
  Users,
  Siren,
  Activity,
} from 'lucide-react';

const rotations = [
  { name: 'Internal Medicine', icon: Stethoscope },
  { name: 'Surgery', icon: Scissors },
  { name: 'Pediatrics', icon: Baby },
  { name: 'Obstetrics & Gynecology', icon: HeartHandshake },
  { name: 'Psychiatry', icon: Brain },
  { name: 'Family Medicine', icon: Users },
  { name: 'Emergency Medicine', icon: Siren },
  { name: 'Neurology', icon: Activity },
];

const steps = [
  {
    title: 'Work a clinical vignette',
    description: 'Full patient presentations across every rotation, testing what you’d actually do next, not just what you know.',
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
    description: 'Your weakest rotations get prioritized automatically, so your limited study time covers the whole exam efficiently.',
  },
];

const faqs = [
  {
    q: 'How is the Step 2 CK Qbank different from Step 1?',
    a: 'Step 2 CK questions center on clinical management and next-best-step decisions across every rotation, rather than foundational science. If you used the Step 1 Qbank, your progress carries over — concepts you struggled with there are prioritized first here too.',
  },
  {
    q: 'Is this bank aligned with the current Step 2 CK blueprint?',
    a: 'Yes. Questions are organized by the same clinical rotations tested on Step 2 CK, including internal medicine, surgery, pediatrics, OB/GYN, psychiatry, and emergency medicine.',
  },
  {
    q: 'Can I focus on one rotation at a time?',
    a: 'Yes. Restrict your practice to a single rotation while you’re on it, then widen back out to mixed, exam-style sets whenever you’re ready.',
  },
  {
    q: 'What happens when I get a management question wrong?',
    a: 'The adaptive engine flags the underlying concept and brings you variations on it through spaced repetition over the following days, instead of just moving on.',
  },
  {
    q: 'Can I try the Step 2 CK Qbank for free?',
    a: 'Yes, you can try MedPrep Institute free for 7 days, including full access to the Step 2 CK question bank.',
  },
];

export const Step2PageContent = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <div
        className="relative overflow-hidden bg-cover bg-center px-6 pt-16 pb-20 sm:pt-20 sm:pb-28"
        style={{ backgroundColor: '#06005A', backgroundImage: "url('/MedPrep (2).png')" }}
      >
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
            <span>USMLE STEP 2 CK QUESTION BANK</span>
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight text-white sm:text-6xl">
            Master Step 2 CK with a Qbank that remembers what you miss.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl">
            Clinical management vignettes across every rotation, an adaptive engine that
            targets your weak spots, and built-in spaced repetition so decisions
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
          <div className="border-l-2 border-gray-200 pl-5">
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">1M+</p>
            <p className="mt-1 text-sm text-gray-600">Questions Answered</p>
          </div>
          <div className="border-l-2 border-gray-200 pl-5">
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">92%</p>
            <p className="mt-1 text-sm text-gray-600">Improved Retention &amp; Recall</p>
          </div>
          <div className="border-l-2 border-gray-200 pl-5">
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">8</p>
            <p className="mt-1 text-sm text-gray-600">Core Rotations Covered</p>
          </div>
          <div className="border-l-2 border-gray-200 pl-5">
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">96%</p>
            <p className="mt-1 text-sm text-gray-600">Student Pass Rate</p>
          </div>
        </div>
      </div>

      {/* Rotations covered */}
      <div className="bg-[#F4F2FB] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
              Coverage
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Every core rotation on the Step 2 CK blueprint
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {rotations.map(({ name, icon: Icon }) => (
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
              How MedPrep Institute preps you for Step 2 CK
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

      {/* Dashboard preview */}
      <DashboardPreviewSection
        exam="Step 2 CK"
        topics={[
          { name: 'Cardiology', pct: 88 },
          { name: 'Neurology', pct: 79 },
          { name: 'OB/GYN', pct: 71 },
          { name: 'Emergency medicine', pct: 63 },
          { name: 'Endocrinology', pct: 44 },
        ]}
      />

      {/* Testimonial */}
      <div className="bg-[#F4F2FB] px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-snug text-black sm:text-3xl">
              &quot;I kept second-guessing the next best step on surgery questions.
              It caught the pattern before I did.&quot;
            </h2>
            <p className="mt-5 leading-relaxed text-gray-600">
              I restricted my practice to surgery while I was on that rotation, and the
              same adaptive engine kept bringing back the management decisions I kept
              getting wrong, from a slightly different angle each time. By the time I
              sat for Step 2 CK, it didn&apos;t feel like a rotation I was still shaky on.
            </p>

            <p className="mt-6 font-semibold text-black">Daniel R.</p>
            <p className="text-sm text-gray-500">MS-4, passed USMLE Step 2 CK</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <img
              src="/MedPrep institute (9).png"
              alt="Daniel R., MS-4, passed USMLE Step 2 CK"
              className="h-full w-full object-cover"
            />
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
            Step 2 CK Qbank questions
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
            Stop doing random Step 2 CK questions.
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
