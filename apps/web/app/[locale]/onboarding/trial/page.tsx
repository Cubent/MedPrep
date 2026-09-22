'use client';

import { useState } from 'react';
import {
  Award,
  BookMarked,
  CalendarClock,
  ClipboardCheck,
  Clock,
  Coffee,
  GraduationCap,
  HelpCircle,
  Infinity as InfinityIcon,
  ListChecks,
  MapPin,
  Microscope,
  PlayCircle,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Sprout,
  Stethoscope,
  Target,
  Timer,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react';

type Option = { id: string; label: string; description: string; icon: LucideIcon };

// ids match the ExamType enum in packages/database/prisma/schema.prisma
const EXAM_OPTIONS: Option[] = [
  {
    id: 'STEP_1',
    label: 'USMLE Step 1',
    description: 'Foundational science and clinical knowledge.',
    icon: Microscope,
  },
  {
    id: 'STEP_2_CK',
    label: 'USMLE Step 2 CK',
    description: 'Clinical knowledge for clerkship-level decision making.',
    icon: Stethoscope,
  },
  {
    id: 'STEP_3',
    label: 'USMLE Step 3',
    description: 'Independent practice: diagnosis, management, and follow-up.',
    icon: ClipboardCheck,
  },
  {
    id: 'ABIM',
    label: 'ABIM Internal Medicine',
    description: 'Board certification in internal medicine.',
    icon: Award,
  },
];

// ids match the PrepStage enum
const PREP_STAGE_OPTIONS: Option[] = [
  { id: 'JUST_STARTING', label: 'Just starting', description: 'New to this material or just beginning to review.', icon: Sprout },
  { id: 'MID_WAY', label: 'Mid-way through', description: "You've covered a good chunk, still building momentum.", icon: TrendingUp },
  { id: 'CRAMMING', label: 'Cramming (last few weeks)', description: 'Exam is close. Time to focus on the highest-yield gaps.', icon: Zap },
];

// maps to the isRetake boolean
const RETAKE_OPTIONS: Option[] = [
  { id: 'false', label: 'First attempt', description: 'This is your first time sitting this exam.', icon: Sparkles },
  { id: 'true', label: 'Retaking', description: "You've taken it before and know roughly where you struggled.", icon: RotateCcw },
];

// ids match the TimedPreference enum
const TIMED_OPTIONS: Option[] = [
  { id: 'TIMED', label: 'Timed', description: 'Practice under real exam time pressure from the start.', icon: Timer },
  { id: 'UNTIMED', label: 'Untimed', description: 'Take your time while you build up your foundation.', icon: InfinityIcon },
];

// ids match the NextExamPlan enum
const NEXT_EXAM_OPTIONS: Option[] = [
  { id: 'YES', label: 'Yes, already lined up', description: 'e.g. Step 2 CK after Step 1, or ABIM after Step 3.', icon: MapPin },
  { id: 'NOT_YET', label: 'Not yet decided', description: 'One exam at a time for now.', icon: Clock },
  { id: 'NOT_SURE', label: 'Not sure', description: 'Still figuring out the path.', icon: HelpCircle },
];

const TOTAL_STEPS = 9;

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

/** Smaller, borderless illustration used above the title on marketing
 * slides. Sits right under the step counter. */
const StepImage = ({ src }: { src: string }) => (
  <img src={src} alt="" className="mb-2 w-full max-w-xs" />
);

/** Icon + title + paragraph used for the keypoint pairs on marketing
 * slides, matching the icon-circle style used on the question steps. */
const KeyPoint = ({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F4F2FB] text-[#06005A]">
      <Icon className="size-4" />
    </span>
    <div className="min-w-0">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-gray-600">{children}</p>
    </div>
  </div>
);

/** Shared single-select card list used by every question step. Each card
 * gets its own icon that scales up slightly on hover/select, and the whole
 * card lifts a touch on hover so the list feels tactile rather than static. */
function OptionCards({
  options,
  selected,
  onSelect,
}: {
  options: Option[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mt-8 flex flex-col gap-3">
      {options.map((option) => {
        const isSelected = selected === option.id;
        const Icon = option.icon;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`group flex items-center gap-4 rounded-xl border p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
              isSelected ? 'border-[#C46B10] bg-[#C46B10]/5' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span
              className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110 ${
                isSelected ? 'scale-110 bg-[#C46B10] text-white' : 'bg-[#F4F2FB] text-[#06005A]'
              }`}
            >
              <Icon className="size-5" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-black">{option.label}</h3>
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isSelected ? 'border-[#C46B10] bg-[#C46B10]' : 'border-gray-300'
                  }`}
                >
                  {isSelected && <CheckIcon />}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{option.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

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

      <OptionCards options={EXAM_OPTIONS} selected={selected} onSelect={onSelect} />
    </div>
  );
}

function StepPrepStage({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div>
      <Eyebrow>Step 2 of {TOTAL_STEPS}</Eyebrow>
      <Heading>Where are you in your prep?</Heading>
      <p className="mt-3 text-lg text-gray-600">
        This shapes how your bank is paced from day one.
      </p>
      <OptionCards options={PREP_STAGE_OPTIONS} selected={selected} onSelect={onSelect} />
    </div>
  );
}

function StepRetake({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div>
      <Eyebrow>Step 3 of {TOTAL_STEPS}</Eyebrow>
      <Heading>Have you taken this exam before?</Heading>
      <p className="mt-3 text-lg text-gray-600">
        Retaking changes how broadly we sample at the start.
      </p>
      <OptionCards options={RETAKE_OPTIONS} selected={selected} onSelect={onSelect} />
    </div>
  );
}

function StepTimedPreference({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div>
      <Eyebrow>Step 4 of {TOTAL_STEPS}</Eyebrow>
      <Heading>Timed or untimed to start?</Heading>
      <p className="mt-3 text-lg text-gray-600">You can always switch this later.</p>
      <OptionCards options={TIMED_OPTIONS} selected={selected} onSelect={onSelect} />
    </div>
  );
}

function StepNextExamPlan({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div>
      <Eyebrow>Step 5 of {TOTAL_STEPS}</Eyebrow>
      <Heading>Already planning your next exam after this one?</Heading>
      <p className="mt-3 text-lg text-gray-600">
        Your progress carries forward, and your weak areas get prioritized first.
      </p>
      <OptionCards options={NEXT_EXAM_OPTIONS} selected={selected} onSelect={onSelect} />
    </div>
  );
}

function StepSemester() {
  return (
    <div>
      <Eyebrow>Step 6 of {TOTAL_STEPS}</Eyebrow>
      <StepImage src="/MedPrep institute (10).png" />
      <Heading>Your everyday study routine.</Heading>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        A little every day, whether you&apos;re in lecture, on rotations, or working shifts. The
        bank keeps pace with you.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <KeyPoint icon={GraduationCap} title="Stay current with what you're learning">
          As you cover a topic in class or on the wards, we surface matching questions, so the
          bank moves with your curriculum instead of ahead of it.
        </KeyPoint>
        <KeyPoint icon={RefreshCw} title="Missed questions come back automatically">
          Anything you get wrong resurfaces later as a fresh variation, timed to when you're about
          to forget it, so it actually sticks.
        </KeyPoint>
      </div>
    </div>
  );
}

function StepDedicated() {
  return (
    <div>
      <Eyebrow>Step 7 of {TOTAL_STEPS}</Eyebrow>
      <StepImage src="/MedPrep institute (11).png" />
      <Heading>Dedicated study period.</Heading>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        The focused stretch of weeks right before your exam. We shift with you, from broad
        coverage to hammering your weak spots.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <KeyPoint icon={ListChecks} title="Finish any unfinished work">
          Use this time to wrap up any questions or reviews you didn&apos;t get to earlier in the
          year, before your dedicated period ramps up.
        </KeyPoint>
        <KeyPoint icon={CalendarClock} title="A reserve set built from your weak spots">
          Already finished the QBank &amp; Reviews? We automatically switch you to a bonus set
          focused only on what you&apos;ve struggled with.
        </KeyPoint>
      </div>
    </div>
  );
}

function StepStory() {
  return (
    <div>
      <Eyebrow>Step 8 of {TOTAL_STEPS}</Eyebrow>
      <StepImage src="/MedPrep institute (12).png" />
      <Heading>Questions build on each other.</Heading>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        One question leads naturally into the next, instead of jumping between unrelated topics.
      </p>

      <div className="mt-8">
        <KeyPoint icon={BookMarked} title="Like following one patient's case">
          A question on working up a pulmonary embolism might be followed by one on choosing
          anticoagulation, then risk stratification, then follow-up care: the same thread
          deepening over time, instead of a random grab-bag of topics. It starts to feel like
          following a case rather than memorizing facts, and taking notes along the way feels
          natural.
        </KeyPoint>
      </div>
    </div>
  );
}

function StepCompounding() {
  return (
    <div>
      <Eyebrow>Step 9 of {TOTAL_STEPS}</Eyebrow>
      <Heading>After this exam.</Heading>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        Your progress will be waiting for you when you start studying for the next exam.
      </p>

      <div className="mt-8">
        <KeyPoint icon={Target} title="Nothing gets lost between exams">
          Any gaps you don&apos;t close before test day stay marked, not forgotten. When you move
          to your next exam, those same gaps get prioritized first, so you&apos;re not starting
          from zero, while everything you already mastered stays with you. No need to relearn it.
        </KeyPoint>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <KeyPoint icon={Coffee} title="Take a break">
          After you ace this exam, pause your subscription and take a break for as long as you
          need.
        </KeyPoint>
        <KeyPoint icon={PlayCircle} title="Pick up where you left off">
          When you activate your QBank for the next exam, you won&apos;t be starting from scratch.
          It adapts to your previous progress and emphasizes anything you never finished or
          struggled with.
        </KeyPoint>
      </div>

      <p className="font-[family-name:var(--font-display)] mt-8 text-xl font-bold text-[#06005A]">
        Learning should compound, and so should your QBank.
      </p>
    </div>
  );
}

type Answers = {
  exam: string | null;
  prepStage: string | null;
  isRetake: string | null;
  timedPreference: string | null;
  nextExamPlan: string | null;
};

const OnboardingTrialPage = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    exam: null,
    prepStage: null,
    isRetake: null,
    timedPreference: null,
    nextExamPlan: null,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const canContinue =
    (step === 1 && Boolean(answers.exam)) ||
    (step === 2 && Boolean(answers.prepStage)) ||
    (step === 3 && Boolean(answers.isRetake)) ||
    (step === 4 && Boolean(answers.timedPreference)) ||
    (step === 5 && Boolean(answers.nextExamPlan)) ||
    step > 5;

  const goNext = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const finish = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const response = await fetch('/api/user-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam: answers.exam,
          prepStage: answers.prepStage,
          isRetake: answers.isRetake === 'true',
          timedPreference: answers.timedPreference,
          nextExamPlan: answers.nextExamPlan,
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setSaveError(
          data.error === 'Exam selection is locked'
            ? "You've already selected an exam. You can change it from your account page after the 30-day lock ends."
            : 'Could not save your answers. Please try again.'
        );
        setIsSaving(false);
        return false;
      }
    } catch {
      setSaveError('Could not save your answers. Check your connection and try again.');
      setIsSaving(false);
      return false;
    }
    setIsSaving(false);
    return true;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex max-w-2xl items-center gap-2.5 px-6 pt-8">
        <img
          src="/animateos-logo (1).png"
          alt="MedPrep Institute Logo"
          className="h-7 w-7 rounded-md object-cover"
        />
        <span className="text-base font-medium text-[#06005A]">MedPrep Institute</span>
      </div>

      <div className="mx-auto flex max-w-2xl items-center gap-2 px-6 pt-6">
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
        {step === 1 && (
          <StepExam
            selected={answers.exam}
            onSelect={(exam) => setAnswers((a) => ({ ...a, exam }))}
          />
        )}
        {step === 2 && (
          <StepPrepStage
            selected={answers.prepStage}
            onSelect={(prepStage) => setAnswers((a) => ({ ...a, prepStage }))}
          />
        )}
        {step === 3 && (
          <StepRetake
            selected={answers.isRetake}
            onSelect={(isRetake) => setAnswers((a) => ({ ...a, isRetake }))}
          />
        )}
        {step === 4 && (
          <StepTimedPreference
            selected={answers.timedPreference}
            onSelect={(timedPreference) => setAnswers((a) => ({ ...a, timedPreference }))}
          />
        )}
        {step === 5 && (
          <StepNextExamPlan
            selected={answers.nextExamPlan}
            onSelect={(nextExamPlan) => setAnswers((a) => ({ ...a, nextExamPlan }))}
          />
        )}
        {step === 6 && <StepSemester />}
        {step === 7 && <StepDedicated />}
        {step === 8 && <StepStory />}
        {step === 9 && <StepCompounding />}
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
            disabled={!canContinue}
            className="rounded-full bg-[#06005A] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={async () => {
              const ok = await finish();
              if (ok) window.location.href = '/dashboard';
            }}
            disabled={isSaving}
            className="rounded-full bg-[#C46B10] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a95a0d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? 'Saving…' : 'Finalize'}
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingTrialPage;
