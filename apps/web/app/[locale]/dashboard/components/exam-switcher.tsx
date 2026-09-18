'use client';

import {
  Award,
  Check,
  ChevronDown,
  ClipboardCheck,
  Lock,
  Microscope,
  Stethoscope,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';

// ids match the ExamType enum in packages/database/prisma/schema.prisma
const EXAM_OPTIONS = [
  {
    id: 'STEP_1',
    label: 'STEP 1',
    name: 'USMLE Step 1',
    tagline: 'Foundational science and clinical knowledge',
    icon: Microscope,
  },
  {
    id: 'STEP_2_CK',
    label: 'STEP 2 CK',
    name: 'USMLE Step 2 CK',
    tagline: 'Clinical knowledge for clerkship decisions',
    icon: Stethoscope,
  },
  {
    id: 'STEP_3',
    label: 'STEP 3',
    name: 'USMLE Step 3',
    tagline: 'Independent practice and patient management',
    icon: ClipboardCheck,
  },
  {
    id: 'ABIM',
    label: 'ABIM',
    name: 'ABIM Internal Medicine',
    tagline: 'Board certification in internal medicine',
    icon: Award,
  },
] as const;

type ExamId = (typeof EXAM_OPTIONS)[number]['id'];

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

type ExamSwitcherProps = {
  currentExam: string | null;
  examSelectedAt: string | null;
};

export const ExamSwitcher = ({ currentExam, examSelectedAt }: ExamSwitcherProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!currentExam) {
    return null;
  }

  const currentOption = EXAM_OPTIONS.find((exam) => exam.id === currentExam);
  const unlocksAt = examSelectedAt
    ? new Date(new Date(examSelectedAt).getTime() + THIRTY_DAYS_MS)
    : null;
  const isLocked = Boolean(unlocksAt && unlocksAt.getTime() > Date.now());

  const handleSelect = async (examId: ExamId) => {
    if (examId === currentExam || isSubmitting) {
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/user-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam: examId }),
      });

      if (response.status === 403) {
        const data = await response.json().catch(() => null);
        const lockedUntil = data?.unlocksAt ? new Date(data.unlocksAt) : null;
        setErrorMessage(
          lockedUntil
            ? `You can switch exams again on ${lockedUntil.toLocaleDateString()}.`
            : 'Exam selection is locked for 30 days after your last change.'
        );
        return;
      }

      if (!response.ok) {
        setErrorMessage('Something went wrong. Please try again.');
        return;
      }

      setOpen(false);
      startTransition(() => {
        router.refresh();
      });
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setErrorMessage(null);
        }
      }}
    >
      <DropdownMenuTrigger
        disabled={isSubmitting}
        className="group flex items-center gap-1.5 rounded-full border border-[#C46B10]/30 bg-[#C46B10]/10 py-1 pr-2 pl-2.5 text-xs font-bold tracking-wide text-[#C46B10] outline-none transition-colors hover:bg-[#C46B10]/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#C46B10]/40 dark:bg-[#C46B10]/15 dark:hover:bg-[#C46B10]/25"
      >
        {currentOption?.label ?? currentExam}
        <ChevronDown className="size-3 text-[#C46B10]/70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={10}
        className="w-80 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#120A2E]"
      >
        <p className="px-2.5 pt-1.5 pb-2 font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-wide text-gray-400 uppercase dark:text-gray-500">
          Switch exam
        </p>

        <div className="flex flex-col gap-1">
          {EXAM_OPTIONS.map((exam) => {
            const isCurrent = exam.id === currentExam;
            const isDisabled = isCurrent || isSubmitting || (isLocked && !isCurrent);
            const Icon = exam.icon;

            return (
              <DropdownMenuItem
                key={exam.id}
                disabled={isDisabled}
                onSelect={(event) => {
                  event.preventDefault();
                  handleSelect(exam.id);
                }}
                className={`flex items-center gap-3 rounded-xl p-2.5 text-left transition-colors focus:bg-transparent data-[disabled]:opacity-100 ${
                  isCurrent
                    ? 'bg-[#06005A]/5 dark:bg-[#C46B10]/10'
                    : isLocked
                      ? 'opacity-40'
                      : 'hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                    isCurrent
                      ? 'bg-[#06005A] text-white dark:bg-[#C46B10]'
                      : 'bg-gray-100 text-gray-400 dark:bg-white/10 dark:text-gray-500'
                  }`}
                >
                  <Icon className="size-4" />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-sm font-semibold ${
                      isCurrent ? 'text-[#06005A] dark:text-white' : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {exam.name}
                  </span>
                  <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
                    {exam.tagline}
                  </span>
                </span>

                {isCurrent ? (
                  <Check className="size-4 shrink-0 text-[#06005A] dark:text-[#C46B10]" />
                ) : isLocked ? (
                  <Lock className="size-3.5 shrink-0 text-gray-400 dark:text-gray-500" />
                ) : null}
              </DropdownMenuItem>
            );
          })}
        </div>

        {isLocked && unlocksAt && !errorMessage && (
          <div className="mt-2 rounded-xl bg-gray-50 px-3 py-2 text-[11px] leading-snug text-gray-500 dark:bg-white/5 dark:text-gray-400">
            You can switch exams again on {unlocksAt.toLocaleDateString()}.
          </div>
        )}

        {errorMessage && (
          <div className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-500/10 dark:text-red-400">
            {errorMessage}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
