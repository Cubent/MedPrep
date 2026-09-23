import { auth } from '@clerk/nextjs/server';
import { database } from '@repo/database';
import {
  getOverviewStats,
  getStudyGuideEntries,
  REVIEWS_TO_UNLOCK_STUDY_GUIDE,
  SETS_TO_UNLOCK_STUDY_GUIDE,
} from '@repo/database/qbank';
import { Lock, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { NextExamAdvantageCard } from './next-exam-advantage-card';

const DASHBOARD_PREVIEW_COUNT = 2;

export const DashboardOverview = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const preference = await database.userPreference.findUnique({ where: { clerkUserId: userId } });
  if (!preference) return null;

  const stats = await getOverviewStats(userId, preference.exam);
  const studyGuidePreview = stats.studyGuideUnlocked
    ? await getStudyGuideEntries(userId, preference.exam, {
        isReviewed: false,
        sort: 'missed',
        limit: DASHBOARD_PREVIEW_COUNT,
      })
    : [];

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
            Dashboard
          </p>
          <h1 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-[#06005A] dark:text-white sm:text-4xl">
            Overview
          </h1>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            {stats.questionsAnswered} questions answered &middot; {stats.setsCompleted} sets completed
          </p>
        </div>
        <Link
          href="/dashboard/practice"
          className="inline-flex items-center gap-2 rounded-full bg-[#06005A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080]"
        >
          <Play className="size-3.5 fill-current" />
          {stats.questionsAnswered === 0 ? 'Start practicing' : 'Continue practicing'}
        </Link>
      </div>

      <div className="mt-6">
        <NextExamAdvantageCard />
      </div>

      <div className="mt-8 rounded-2xl bg-[#000C3F] p-6 sm:p-8">
        {stats.studyGuideUnlocked && studyGuidePreview.length > 0 ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C46B10]">
              Study Guide
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-2 text-xl font-bold text-white">
              Where to focus next
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
              Your latest concerning learning areas, drawn from your own practice and review
              history.
            </p>

            <div className="mt-6 flex flex-col gap-5">
              {studyGuidePreview.map((entry, i) => (
                <div key={entry.id} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#C46B10]/15 text-xs font-bold text-[#C46B10]">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm leading-relaxed text-white/90">{entry.summary}</p>
                    <p className="mt-1.5 text-xs text-white/50">
                      {entry.topic} &middot; {entry.missedCount} missed
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/dashboard/study-guide"
              className="mt-5 inline-block text-xs font-medium text-[#C46B10] hover:underline"
            >
              View full guide &rarr;
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#C46B10]">
                  <Lock className="size-3.5" />
                  {stats.studyGuideUnlocked ? 'Unlocked' : 'Locked'}
                </p>
                <h2 className="font-[family-name:var(--font-display)] mt-2 text-xl font-bold text-white">
                  {stats.studyGuideUnlocked ? 'Your Study Guide is ready' : 'Unlock your Study Guide'}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
                  {stats.studyGuideUnlocked ? (
                    <>
                      View it to build your personalized guide of the objectives you keep missing
                      &mdash; from your own answers, not a generic list.
                    </>
                  ) : (
                    <>
                      Complete {SETS_TO_UNLOCK_STUDY_GUIDE} practice sets and answer{' '}
                      {REVIEWS_TO_UNLOCK_STUDY_GUIDE} review to unlock a personalized guide of the
                      objectives you keep missing &mdash; built from your own answers, not a generic
                      list.
                    </>
                  )}
                </p>
                {stats.studyGuideUnlocked && (
                  <Link
                    href="/dashboard/study-guide"
                    className="mt-3 inline-block text-xs font-medium text-[#C46B10] hover:underline"
                  >
                    View your Study Guide &rarr;
                  </Link>
                )}
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C46B10]/15 text-[#C46B10]">
                <Sparkles className="size-4" />
              </div>
            </div>

            {!stats.studyGuideUnlocked && (
              <>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-4 rounded-xl border border-[#C46B10]/25 p-4">
                    <img
                      src="/MedPrep institute (6).png"
                      alt=""
                      className="size-14 shrink-0 object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-white">Practice sets</span>
                        <span className="text-white/60">
                          {stats.setsProgress}/{SETS_TO_UNLOCK_STUDY_GUIDE}
                        </span>
                      </div>
                      <div className="mt-3 flex gap-1.5">
                        {Array.from({ length: SETS_TO_UNLOCK_STUDY_GUIDE }).map((_, i) => (
                          <span
                            key={i}
                            className={`h-1.5 flex-1 rounded-full ${
                              i < stats.setsProgress ? 'bg-[#C46B10]' : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border border-[#C46B10]/25 p-4">
                    <img
                      src="/MedPrep institute (5).png"
                      alt=""
                      className="size-14 shrink-0 object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-white">Reviews answered</span>
                        <span className="text-white/60">
                          {stats.reviewsProgress}/{REVIEWS_TO_UNLOCK_STUDY_GUIDE}
                        </span>
                      </div>
                      <div className="mt-3 flex gap-1.5">
                        {Array.from({ length: REVIEWS_TO_UNLOCK_STUDY_GUIDE }).map((_, i) => (
                          <span
                            key={i}
                            className={`h-1.5 flex-1 rounded-full ${
                              i < stats.reviewsProgress ? 'bg-[#C46B10]' : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                      <Link
                        href="/dashboard/review"
                        className="mt-3 inline-block text-xs font-medium text-[#C46B10] hover:underline"
                      >
                        Go to reviews &rarr;
                      </Link>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-xs text-white/50">
                  Your first review is what unlocks it &mdash; reviews open the day after you miss a
                  question.
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
