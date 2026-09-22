import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import { NextExamAdvantageCardView } from './next-exam-advantage-card-view';

// Questions answered in the current exam bank before we've seen enough of a
// user's pattern of mistakes to pre-calibrate their next bank.
export const QUESTIONS_TO_BEGIN_CALIBRATION = 100;

// Maps the exam a user is currently on to the bank we tease calibrating for
// next. Only STEP_3 -> ABIM exists today (the natural next step after STEP_3
// is board certification), so every other exam renders nothing.
const NEXT_EXAM_BY_CURRENT: Partial<Record<string, { label: string; fromLabel: string }>> = {
  STEP_3: { label: 'ABIM', fromLabel: 'Step 3' },
};

/** Teaser shown at the top of the Study Guide once a user is far enough into
 * an exam bank that has a defined "next exam" — nudges them to keep
 * practicing by showing progress toward the point where we have enough
 * mistake/pattern data to pre-calibrate that next bank for them. */
export const NextExamAdvantageCard = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const preference = await database.userPreference.findUnique({ where: { clerkUserId: userId } });
  const nextExam = preference ? NEXT_EXAM_BY_CURRENT[preference.exam] : undefined;
  if (!nextExam) return null;

  const answered = await database.userQuestionAttempt.count({
    where: { clerkUserId: userId, question: { learningObjective: { examType: preference!.exam } } },
  });

  return (
    <NextExamAdvantageCardView
      nextExamLabel={nextExam.label}
      fromExamLabel={nextExam.fromLabel}
      answered={answered}
      threshold={QUESTIONS_TO_BEGIN_CALIBRATION}
    />
  );
};
