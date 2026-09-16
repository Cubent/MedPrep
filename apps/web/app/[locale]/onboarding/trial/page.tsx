'use client';

import { useState } from 'react';
import Link from 'next/link';

type Exam = {
  id: string;
  name: string;
  description: string;
  objectives: string;
  questions: string;
};

// ids match the ExamType enum in packages/database/prisma/schema.prisma
const EXAMS: Exam[] = [
  {
    id: 'STEP_1',
    name: 'USMLE Step 1',
    description: 'Foundational science and clinical knowledge.',
    objectives: '6,876',
    questions: '34,380',
  },
  {
    id: 'STEP_2_CK',
    name: 'USMLE Step 2 CK',
    description: 'Clinical knowledge for clerkship-level decision making.',
    objectives: '2,323',
    questions: '11,615',
  },
  {
    id: 'STEP_3',
    name: 'USMLE Step 3',
    description: 'Independent practice: diagnosis, management, and follow-up.',
    objectives: '2,371',
    questions: '11,855',
  },
  {
    id: 'ABIM',
    name: 'ABIM Internal Medicine',
    description: 'Board certification in internal medicine.',
    objectives: '1,252',
    questions: '6,260',
  },
];

const TOTAL_STEPS = 6;

const CheckIcon = () => (
  <svg className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">{children}</p>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
    {children}
  </h2>
);

function StepExam({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <Eyebrow>Step 1 of {TOTAL_STEPS}</Eyebrow>
      <Heading>Which exam are you studying for?</Heading>
      <p className="mt-3 text-lg text-gray-600">Select your exam.</p>
      <p className="mt-4 rounded-xl bg-[#F4F2FB] p-4 text-sm leading-relaxed text-gray-600">
        Once you select your exam, you will not be able to change it for 30 days. After that, you
        can change it from your account manager page; each change resets the timer.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {EXAMS.map((exam) => {
          const isSelected = selected === exam.id;
          return (
            <button
              key={exam.id}
              type="button"
              onClick={() => onSelect(exam.id)}
              className={`rounded-xl border p-5 text-left transition-colors ${
                isSelected ? 'border-[#C46B10] bg-[#C46B10]/5' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-black">{exam.name}</h3>
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    isSelected ? 'border-[#C46B10] bg-[#C46B10]' : 'border-gray-300'
                  }`}
                >
                  {isSelected && <CheckIcon />}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{exam.description}</p>
              <p className="mt-2 text-xs font-medium text-gray-500">
                {exam.objectives} learning objectives &middot; {exam.questions} questions
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepSemester() {
  return (
    <div>
      <Eyebrow>Step 2 of {TOTAL_STEPS}</Eyebrow>
      <Heading>During the semester.</Heading>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        Follow your lectures and stay on top of spaced repetition all year.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-[#F4F2FB] p-6">
          <h3 className="text-lg font-semibold text-black">Follow along with your lectures</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Study each system as you cover it in class &mdash; keep the bank moving with your
            curriculum all year.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-[#F4F2FB] p-6">
          <h3 className="text-lg font-semibold text-black">Spaced Repetition</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Do your best to keep pace with review. These are fresh variations on questions you
            already missed.
          </p>
        </div>
      </div>
    </div>
  );
}

function StepDedicated() {
  const stages = ['Unfinished', 'Dedicated study', 'All caught up', 'Reserve set'];
  return (
    <div>
      <Eyebrow>Step 3 of {TOTAL_STEPS}</Eyebrow>
      <Heading>Dedicated study period.</Heading>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        We have a special Reserve Set for your dedicated study period to target your weak areas.
      </p>

      <div className="mt-10 rounded-2xl border border-gray-200 bg-[#F4F2FB] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          When dedicated study begins
        </p>
        <div className="mt-6 flex items-start justify-between">
          {stages.map((label, i) => (
            <div key={label} className="flex flex-1 items-start">
              <div className="flex flex-col items-center gap-1.5 px-1 text-center">
                <span
                  className={`flex size-3 shrink-0 rounded-full ${
                    i === 1 ? 'bg-[#C46B10]' : 'bg-[#06005A]'
                  }`}
                />
                <span className="text-xs font-medium text-black">{label}</span>
              </div>
              {i < stages.length - 1 && <div className="mt-1.5 h-px flex-1 bg-gray-300" />}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-black">Finish any unfinished work</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            As your dedicated study period approaches, use this time to complete any questions or
            reviews that you did not finish during the year.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">Dedicated study period</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            If you managed to finish your QBank &amp; Reviews before your dedicated study period,
            we will automatically deploy a special reserve set of hyper-focused questions to
            target your weak areas.
          </p>
        </div>
      </div>
    </div>
  );
}

function StepStory() {
  const threads = ['PE workup', 'Anticoag', 'Risk strat', 'Follow-up'];
  return (
    <div>
      <Eyebrow>Step 4 of {TOTAL_STEPS}</Eyebrow>
      <Heading>A story that unfolds.</Heading>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        Because learning feels enjoyable when you are making connections
      </p>

      <div className="mt-10 rounded-2xl border border-gray-200 bg-[#F4F2FB] p-6 sm:p-8">
        <div className="flex items-center justify-between">
          {threads.map((label, i) => (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="flex size-3 shrink-0 rounded-full bg-[#06005A]" />
                <span className="text-xs font-medium text-black">{label}</span>
              </div>
              {i < threads.length - 1 && (
                <div className="mx-1 h-px flex-1 bg-[#06005A]/30 sm:mx-2" />
              )}
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          One thread, deepening over time
        </p>
      </div>

      <h3 className="mt-8 text-lg font-semibold text-black">Like reading a story</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        As you work through MedPrep Institute, you will notice a refreshing sense of continuity
        begin to emerge &mdash; almost as if you are reading the plot of an unfolding story. Deep
        learning starts to feel natural, and you can actually take notes.
      </p>
    </div>
  );
}

function StepCoverage() {
  const systems = ['CV', 'PULM', 'RENAL', 'NEURO', 'ID', 'ENDO', 'GI', 'HEME', 'PSY'];
  return (
    <div>
      <Eyebrow>Step 5 of {TOTAL_STEPS}</Eyebrow>
      <Heading>It&apos;s okay if you don&apos;t finish.</Heading>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        New concepts are gradually introduced to cover the whole exam early on.
      </p>

      <div className="mt-10 rounded-2xl border border-gray-200 bg-[#F4F2FB] p-6 sm:p-8">
        <div className="flex flex-wrap justify-center gap-2">
          {systems.map((system, i) => (
            <span
              key={system}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                i === systems.length - 1
                  ? 'bg-[#C46B10] text-white'
                  : 'border border-gray-200 bg-white text-black'
              }`}
            >
              {system}
            </span>
          ))}
        </div>
        <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Jump to what you have not seen yet
        </p>
      </div>

      <h3 className="mt-8 text-lg font-semibold text-black">
        Broad coverage without doing random questions
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        We understand you have a lot of ground to cover, and this exam is also a game of volume.
        We will not linger too long on any one concept &mdash; if you are doing well, or have
        simply seen enough, we cut it short and introduce a new topic that is maximally divergent
        from anything you have worked on so far. This is how we guarantee broad coverage in the
        shortest amount of time.
      </p>
    </div>
  );
}

function StepCompounding() {
  return (
    <div>
      <Eyebrow>Step 6 of {TOTAL_STEPS}</Eyebrow>
      <Heading>After this exam.</Heading>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        Your progress will be waiting for you when you start studying for the next exam.
      </p>

      <div className="mt-10 rounded-2xl border border-gray-200 bg-[#F4F2FB] p-6 sm:p-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm font-semibold text-black">This exam</p>
            <p className="mt-1 text-xs text-gray-500">Two gaps left open</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#C46B10]">Next exam</p>
            <p className="mt-1 text-xs text-gray-500">Gaps prioritized first</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Prior mastery</p>
            <p className="mt-1 text-xs text-gray-500">stays with you</p>
          </div>
        </div>
        <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          What you learned &mdash; and what you missed &mdash; carry forward
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-black">Take a break</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            After you ace this exam, pause your subscription and take a break for as long as you
            need.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">Pick up where you left off</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            When you activate your QBank for the next exam, you won&apos;t be starting from
            scratch. Your QBank will adapt to your previous progress and emphasize anything you
            never finished or struggled with.
          </p>
        </div>
      </div>

      <p className="font-[family-name:var(--font-display)] mt-8 text-xl font-bold text-[#06005A]">
        Learning should compound, and so should your QBank.
      </p>
    </div>
  );
}

const OnboardingTrialPage = () => {
  const [step, setStep] = useState(1);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const canContinue = step === 1 ? Boolean(selectedExam) : true;

  const goNext = async () => {
    if (step === 1 && selectedExam) {
      setIsSaving(true);
      setSaveError(null);
      try {
        const response = await fetch('/api/user-preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ exam: selectedExam }),
        });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          setSaveError(
            data.error === 'Exam selection is locked'
              ? "You've already selected an exam. You can change it from your account page after the 30-day lock ends."
              : 'Could not save your exam selection. Please try again.'
          );
          setIsSaving(false);
          return;
        }
      } catch {
        setSaveError('Could not save your exam selection. Check your connection and try again.');
        setIsSaving(false);
        return;
      }
      setIsSaving(false);
    }
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex max-w-2xl items-center gap-2 px-6 pt-10">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < step ? 'bg-[#C46B10]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10 sm:py-14">
        {step === 1 && <StepExam selected={selectedExam} onSelect={setSelectedExam} />}
        {step === 2 && <StepSemester />}
        {step === 3 && <StepDedicated />}
        {step === 4 && <StepStory />}
        {step === 5 && <StepCoverage />}
        {step === 6 && <StepCompounding />}
      </div>

      {saveError && (
        <div className="mx-auto max-w-2xl px-6 pb-4">
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{saveError}</p>
        </div>
      )}

      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 pb-12">
        <button
          type="button"
          onClick={goBack}
          className={`text-sm font-medium text-gray-500 hover:text-black ${
            step === 1 ? 'invisible' : ''
          }`}
        >
          Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!canContinue || isSaving}
            className="rounded-full bg-[#06005A] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSaving ? 'Saving…' : 'Continue'}
          </button>
        ) : (
          <Link
            href="/dashboard"
            className="rounded-full bg-[#C46B10] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a95a0d]"
          >
            Start my free trial
          </Link>
        )}
      </div>
    </div>
  );
};

export default OnboardingTrialPage;
