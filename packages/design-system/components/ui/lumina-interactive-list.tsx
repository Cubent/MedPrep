'use client';

// Brand assets updated: header/footer logo, step images, hero social proof banner
import React, { useState } from 'react';

type LuminaInteractiveListProps = {
  /** Renders in place of the default header "Sign in" link, e.g. real auth controls. */
  authSlot?: React.ReactNode;
};

export function LuminaInteractiveList({ authSlot }: LuminaInteractiveListProps = {}) {
  const [openMethodFaq, setOpenMethodFaq] = useState<number | null>(0);

  const toggleMethodFaq = (index: number) => {
    setOpenMethodFaq(openMethodFaq === index ? null : index);
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/animateos-logo (1).png"
              alt="MedPrep Institute Logo"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <div className="text-xl font-medium text-[#06005A]">
              MedPrep Institute
            </div>
          </div>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm text-gray-600 md:flex">
            <a href="#how-it-works" className="hover:text-[#06005A] transition-colors">
              The Method
            </a>
            <a href="#faq" className="hover:text-[#06005A] transition-colors">
              Resources
            </a>
            <a href="mailto:support@medprepinstitute.com" className="hover:text-[#06005A] transition-colors">
              Contact
            </a>
          </nav>

          {authSlot ?? (
            <a
              href="/sign-in"
              className="bg-[#06005A] text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#0a0080] transition-colors"
            >
              Sign in
            </a>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="relative overflow-hidden px-6 pt-8 sm:pt-12 lg:pt-14"
        style={{ backgroundColor: '#06005A' }}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          {/* Left: Text content */}
          <div className="flex max-w-xl flex-col items-center text-center pb-28 sm:pb-36 lg:pb-40 lg:items-start lg:text-left">
            {/* Exam Timeline */}
            <p className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 lg:justify-start">
              <span>STEP 1</span>
              <span aria-hidden="true" className="size-1 rotate-45 bg-[#C46B10]" />
              <span>STEP 2</span>
              <span aria-hidden="true" className="size-1 rotate-45 bg-[#C46B10]" />
              <span>STEP 3</span>
              <span aria-hidden="true" className="size-1 rotate-45 bg-[#C46B10]" />
              <span>ABIM</span>
            </p>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight font-[family-name:var(--font-display)]">
              <span className="text-white">Study smarter. Master the USMLE.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-200 mb-6">
              MedPrep Institute is a living, adaptive question bank that learns how you learn, so every question brings you closer to acing the USMLE.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 bg-[#C46B10] text-white px-8 py-2.5 rounded-full font-semibold text-base hover:bg-[#a95a0d] transition-colors"
              >
                Start practicing free
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#06005A] px-8 py-2.5 rounded-full font-semibold text-base hover:bg-white/90 transition-colors"
              >
                See the method
              </a>
            </div>

            {/* Collaboration Credit - temporarily hidden
            <div className="mt-12 w-full rounded-3xl overflow-hidden relative px-6 py-8 sm:px-10 sm:py-10 bg-white/10 backdrop-blur-md border border-white/20 text-center lg:text-left">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                Built in collaboration with
              </p>
              <p className="mt-2 text-xl sm:text-2xl font-bold text-white leading-tight">
                New York Medical College's
              </p>
              <p className="mt-1.5 text-sm sm:text-base text-gray-200 leading-snug">
                St. Clare's & St. Mary's
                <span className="block">Internal Medicine Residency Program</span>
              </p>
            </div>
            */}
          </div>

          {/* Right: Doctor image with decorative rings */}
          <div className="relative flex w-full max-w-lg shrink-0 items-end justify-center self-end lg:max-w-xl">
            <svg
              viewBox="0 0 420 420"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <circle cx="350" cy="70" r="55" fill="none" stroke="#C46B10" strokeWidth="3" strokeDasharray="6 9" opacity="0.85" />
              <circle cx="45" cy="150" r="38" fill="none" stroke="#C46B10" strokeWidth="3" strokeDasharray="5 8" opacity="0.6" />
              <circle cx="365" cy="300" r="46" fill="none" stroke="#C46B10" strokeWidth="3" strokeDasharray="5 8" opacity="0.7" />
              <circle cx="50" cy="360" r="30" fill="none" stroke="#C46B10" strokeWidth="3" strokeDasharray="4 7" opacity="0.5" />
            </svg>
            <img
              src="/MedPrep institute (3).png"
              alt="MedPrep Institute"
              className="relative z-10 w-full max-w-sm object-contain sm:max-w-md lg:max-w-xl"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              <div className="border-l-2 border-gray-200 pl-5">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">
                  2M+
                </p>
                <p className="mt-1 text-sm text-gray-600">Questions Answered</p>
              </div>
              <div className="border-l-2 border-gray-200 pl-5">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">
                  94%
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Improved Retention &amp; Recall
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-5">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">
                  180+
                </p>
                <p className="mt-1 text-sm text-gray-600">Med Schools Represented</p>
              </div>
              <div className="border-l-2 border-gray-200 pl-5">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#06005A] sm:text-4xl">
                  60K+
                </p>
                <p className="mt-1 text-sm text-gray-600">Students Trained</p>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight text-[#06005A] sm:text-5xl">
                The #1 Rated USMLE Prep Platform
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                Ranked highest in adaptive learning and exam readiness among USMLE prep providers in a 2025 student survey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* App Store Reviews Section */}
      <div className="bg-[#F4F2FB] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-[#C46B10]">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} className="size-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              5.0 rating &middot; MedPrep Institute students
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            <div className="border-t-2 border-[#06005A]/15 pt-6">
              <span className="font-[family-name:var(--font-display)] text-4xl leading-none text-[#06005A]/25">
                "
              </span>
              <p className="mt-1 text-[1.05rem] leading-relaxed text-gray-800">
                not gonna lie i was skeptical of another qbank but this one actually notices what i keep missing and just... brings it back
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#06005A] text-sm font-semibold text-white">
                  M
                </span>
                <div className="text-sm">
                  <span className="font-semibold text-black">Maya R.</span>{' '}
                  <span className="text-gray-500">MS-3</span>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-[#06005A]/15 pt-6">
              <span className="font-[family-name:var(--font-display)] text-4xl leading-none text-[#06005A]/25">
                "
              </span>
              <p className="mt-1 text-[1.05rem] leading-relaxed text-gray-800">
                barely make flashcards anymore. the stuff i missed just shows back up right when i'm about to forget it, kind of annoyingly perfect timing
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#C46B10] text-sm font-semibold text-white">
                  D
                </span>
                <div className="text-sm">
                  <span className="font-semibold text-black">Devon K.</span>{' '}
                  <span className="text-gray-500">MS-2</span>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-[#06005A]/15 pt-6">
              <span className="font-[family-name:var(--font-display)] text-4xl leading-none text-[#06005A]/25">
                "
              </span>
              <p className="mt-1 text-[1.05rem] leading-relaxed text-gray-800">
                cardio was wrecking me for weeks. it kept throwing the same concepts back at me in different forms until it finally clicked. passed Step 2 with room to spare
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#06005A] text-sm font-semibold text-white">
                  P
                </span>
                <div className="text-sm">
                  <span className="font-semibold text-black">Priya S.</span>{' '}
                  <span className="text-gray-500">MS-4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adaptive Engine Section */}
      <div className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-gray-200 bg-[#F4F2FB] p-5 sm:p-8">
            <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                Adaptive Engine
              </p>
              <h2 className="font-[family-name:var(--font-display)] mt-3 text-balance text-3xl font-bold tracking-tight text-black sm:text-4xl">
                MedPrep Institute remembers your mistakes and trains you from first principles.
              </h2>
            </div>

            <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-0">
              {/* Question card */}
              <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5 lg:w-[340px] lg:shrink-0">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 7v14" />
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                  </svg>
                  Question
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-black">
                  A 62-year-old man presents with acute shortness of breath and pleuritic chest pain. What is the most likely diagnosis?
                </p>
                <div className="mt-4 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-600">
                    <span className="w-4 font-medium">A.</span>
                    <span>Pneumonia</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-600">
                    <span className="w-4 font-medium">B.</span>
                    <span>Pulmonary embolism</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-black">
                    <span className="w-4 font-medium">C.</span>
                    <span>Acute myocardial infarction</span>
                    <svg className="ml-auto size-4 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-600">
                    <span className="w-4 font-medium">D.</span>
                    <span>Asthma exacerbation</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-600">
                    <span className="w-4 font-medium">E.</span>
                    <span>Pericarditis</span>
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2.5 text-sm text-black">
                  <span className="font-semibold text-red-600">Incorrect.</span>
                  Let's focus on this topic.
                </p>
              </div>

              {/* Connector: mobile arrow down */}
              <svg className="size-5 text-gray-400 lg:hidden" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>

              {/* Connector: desktop line */}
              <div className="relative hidden w-16 shrink-0 items-center px-1 lg:flex" aria-hidden="true">
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Center engine node */}
              <div className="relative flex size-44 shrink-0 flex-col items-center justify-center rounded-full bg-[#06005A] px-6 text-center text-white shadow-xl">
                <svg className="size-7" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 18V5" />
                  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
                  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
                  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
                  <path d="M18 18a4 4 0 0 0 2-7.464" />
                  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
                  <path d="M6 18a4 4 0 0 1-2-7.464" />
                  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
                </svg>
                <p className="mt-2.5 text-xs font-semibold uppercase tracking-[0.18em]">Adaptive engine</p>
                <p className="mt-1 text-xs text-white/70">Analyzing response&hellip;</p>
              </div>

              {/* Connector: mobile arrow down */}
              <svg className="size-5 text-gray-400 lg:hidden" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>

              {/* Connector: desktop line */}
              <div className="relative hidden w-16 shrink-0 items-center px-1 lg:flex" aria-hidden="true">
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Output cards */}
              <div className="grid w-full max-w-sm gap-3 lg:max-w-none lg:flex-1">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                    <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                    Same topic &middot; new angle
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-black">
                    What is the most appropriate initial imaging for suspected pulmonary embolism?
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                    <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M15 6a9 9 0 0 0-9 9V3" />
                      <circle cx="18" cy="6" r="3" />
                      <circle cx="6" cy="18" r="3" />
                    </svg>
                    Related topic
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-black">
                    Which ECG finding suggests right heart strain?
                  </p>
                </div>
              </div>
            </div>

            {/* Built-in spaced repetition timeline */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Built-in spaced repetition
              </p>
              <div className="mt-5 flex items-start px-1">
                <div className="flex w-max flex-col items-center gap-1.5 px-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-[#06005A] text-white">
                    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-black">Review soon</span>
                  <span className="text-xs text-gray-500">1 day</span>
                </div>
                <div className="mt-3.5 h-px flex-1 bg-gray-200" />
                <div className="flex w-max flex-col items-center gap-1.5 px-2">
                  <span className="flex size-7 items-center justify-center rounded-full border border-gray-300 bg-white">
                    <span className="size-2 rounded-full bg-gray-400" />
                  </span>
                  <span className="text-sm font-medium text-black">Reinforce</span>
                  <span className="text-xs text-gray-500">3 days</span>
                </div>
                <div className="mt-3.5 h-px flex-1 bg-gray-200" />
                <div className="flex w-max flex-col items-center gap-1.5 px-2">
                  <span className="flex size-7 items-center justify-center rounded-full border-[1.5px] border-[#C46B10] text-[#C46B10]">
                    <svg className="size-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-black">Mastered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Edge Section */}
      <div className="bg-[#f5f5f5] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
              Competitive Edge
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-balance text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Match into the most competitive residency programs &amp; fellowships.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
              While most students still use traditional random-style question banks, you will have a competitive edge by using the MedPrep Institute Method.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-2">
            <div className="bg-white p-7 sm:p-8">
              <svg className="size-6 text-[#06005A]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
                <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
              </svg>
              <h3 className="mt-5 text-lg font-semibold text-black">High honors in your Clerkship</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                Set MedPrep Institute to focus on your current clerkship. Realistic clinical vignettes will prepare you for any patient you encounter.
              </p>
            </div>

            <div className="bg-white p-7 sm:p-8">
              <svg className="size-6 text-[#06005A]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 18V5" />
                <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
                <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
                <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
                <path d="M18 18a4 4 0 0 0 2-7.464" />
                <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
                <path d="M6 18a4 4 0 0 1-2-7.464" />
                <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
              </svg>
              <h3 className="mt-5 text-lg font-semibold text-black">Learn without even taking notes</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                With our built in spaced repetition engine, long term memory is built into your practice. Your only job is to understand the material, not take notes.
              </p>
            </div>

            <div className="bg-white p-7 sm:p-8">
              <svg className="size-6 text-[#06005A]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="m9 16 2 2 4-4" />
              </svg>
              <h3 className="mt-5 text-lg font-semibold text-black">Just do 10 questions a day</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                Consistency is key, and MedPrep Institute makes it easy. Just do 10 questions a day and you'll be well on your way to matching into the most competitive residency programs &amp; fellowships.
              </p>
            </div>

            <div className="bg-white p-7 sm:p-8">
              <svg className="size-6 text-[#06005A]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="6" cy="19" r="3" />
                <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                <circle cx="18" cy="5" r="3" />
              </svg>
              <h3 className="mt-5 text-lg font-semibold text-black">Your second exam is even easier</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                Based on how you perform in your first QBank, your next exam will be hyper-focussed on what you missed or struggled with. You are not starting from scratch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Method Section */}
      <div id="how-it-works" className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
              The method
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-balance text-3xl font-bold tracking-tight text-black sm:text-4xl">
              A curated path that adapts as you go. Feels effortless, like reading your favorite story.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
              Working through a question bank should feel like building a coherent knowledge structure &mdash; not memorizing random, disconnected facts.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-[#f5f5f5] p-7 sm:p-8">
              <svg
                viewBox="0 0 320 110"
                className="h-auto w-full"
                role="img"
                aria-label="Concepts revealed in order, each new one connecting back to concepts you have already seen."
              >
                <line x1="41" y1="78" x2="87" y2="78" stroke="rgba(6,0,90,0.16)" strokeWidth="1.5" />
                <line x1="105" y1="78" x2="151" y2="78" stroke="rgba(6,0,90,0.16)" strokeWidth="1.5" />
                <line x1="169" y1="78" x2="215" y2="78" stroke="rgba(6,0,90,0.16)" strokeWidth="1.5" />
                <line x1="233" y1="78" x2="279" y2="78" stroke="rgba(6,0,90,0.16)" strokeWidth="1.5" />
                <path d="M 32 68 Q 96 16 160 68" fill="none" stroke="#06005A" strokeOpacity="0.3" strokeWidth="1.5" />
                <path d="M 96 68 Q 160 16 224 68" fill="none" stroke="#06005A" strokeOpacity="0.3" strokeWidth="1.5" />
                <path d="M 160 68 Q 224 16 288 68" fill="none" stroke="#06005A" strokeOpacity="0.3" strokeWidth="1.5" />
                <circle cx="32" cy="78" r="7" fill="#06005A" />
                <circle cx="96" cy="78" r="7" fill="#06005A" />
                <circle cx="160" cy="78" r="7" fill="#06005A" />
                <g>
                  <circle cx="224" cy="78" r="7" fill="white" stroke="#06005A" strokeWidth="1.5" />
                  <circle cx="224" cy="78" r="2.5" fill="#06005A" />
                </g>
                <circle cx="288" cy="78" r="7" fill="white" stroke="rgba(6,0,90,0.3)" strokeWidth="1.5" />
              </svg>
              <h3 className="font-[family-name:var(--font-display)] mt-5 text-2xl tracking-tight text-black">
                Concepts build on what you&rsquo;ve seen
              </h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                Questions arrive in an order where each new concept connects to ones you&rsquo;ve already covered &mdash; a coherent structure, not disjointed chunks.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#f5f5f5] p-7 sm:p-8">
              <svg
                viewBox="0 0 320 110"
                className="h-auto w-full"
                role="img"
                aria-label="A missed question returns as variations in later sets until the concept is mastered."
              >
                <defs>
                  <marker id="method-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                    <path d="M 0 0 L 7 4 L 0 8 Z" fill="#C46B10" />
                  </marker>
                </defs>
                <line x1="41" y1="78" x2="87" y2="78" stroke="rgba(6,0,90,0.16)" strokeWidth="1.5" />
                <line x1="105" y1="78" x2="151" y2="78" stroke="rgba(6,0,90,0.16)" strokeWidth="1.5" />
                <line x1="169" y1="78" x2="215" y2="78" stroke="rgba(6,0,90,0.16)" strokeWidth="1.5" />
                <line x1="233" y1="78" x2="279" y2="78" stroke="rgba(6,0,90,0.16)" strokeWidth="1.5" />
                <path d="M 160 66 Q 192 34 222 66" fill="none" stroke="#C46B10" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="3 6" markerEnd="url(#method-arrow)" />
                <path d="M 160 66 Q 224 12 286 66" fill="none" stroke="#C46B10" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="3 6" markerEnd="url(#method-arrow)" />
                <circle cx="32" cy="78" r="7" fill="#06005A" />
                <circle cx="96" cy="78" r="7" fill="#06005A" />
                <g>
                  <circle cx="160" cy="78" r="7" fill="white" stroke="#C46B10" strokeWidth="2" />
                  <path d="M 157.4 75.4 l 5.2 5.2 M 162.6 75.4 l -5.2 5.2" stroke="#C46B10" strokeWidth="1.5" strokeLinecap="round" />
                </g>
                <g>
                  <circle cx="224" cy="78" r="7" fill="white" stroke="#C46B10" strokeWidth="1.5" />
                  <circle cx="224" cy="78" r="2.5" fill="#C46B10" />
                </g>
                <g>
                  <circle cx="288" cy="78" r="7" fill="#06005A" />
                  <path d="M 285.2 78 l 2 2.2 l 3.6 -4.2" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
              <h3 className="font-[family-name:var(--font-display)] mt-5 text-2xl tracking-tight text-black">
                Mistakes reshape your path
              </h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                Get a question wrong and variations on the same objective return on a spaced-repetition schedule until it sticks.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            <div className="border-t-2 border-[#06005A]/70 pt-6">
              <span className="font-[family-name:var(--font-display)] text-lg text-gray-500">01</span>
              <h3 className="mt-3 text-xl font-semibold text-black">Spaced repetition built in</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                Variations on questions you got wrong are presented to you just before you would forget them. Spaced repetition is the most powerful way to consolidate long term memories, and should not be a separate activity.
              </p>
            </div>
            <div className="border-t-2 border-[#06005A]/70 pt-6">
              <span className="font-[family-name:var(--font-display)] text-lg text-gray-500">02</span>
              <h3 className="mt-3 text-xl font-semibold text-black">Spot how they try and trick you</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                By progressively expanding on topics, you get to see the ways test writers try and trick you. This is very difficult to learn when questions are presented randomly.
              </p>
            </div>
            <div className="border-t-2 border-[#06005A]/70 pt-6">
              <span className="font-[family-name:var(--font-display)] text-lg text-gray-500">03</span>
              <h3 className="mt-3 text-xl font-semibold text-black">Hit all high yield concepts first</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                Not everyone finishes their question bank, and thats okay. We front-load with the most high yield concepts first to maximize your score.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Compounded Learning Section */}
      <div className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                Compounded Learning
              </p>
              <h2 className="font-[family-name:var(--font-display)] mt-4 text-balance text-3xl font-bold tracking-tight text-black sm:text-4xl">
                After this exam, your next one is dramatically easier.
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-gray-600">
                As you progress from STEP 1 to STEP 3, you'll find that the material you struggled with in the previous exam is prioritized first in the next question bank. If there were any concepts you didn't finish, they will also be prioritized in the next question bank. Your learning compounds instead of starting over. You will be glad you started early.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#f5f5f5] p-4 sm:p-7">
              <svg
                viewBox="0 0 520 470"
                className="h-auto w-full"
                role="img"
                aria-label="Unresolved concepts from Step 1 are projected onto Step 2 CK, then resolved in the Step 3 bank."
              >
                <defs>
                  <marker id="proj-arrow" viewBox="0 0 8 8" refX="4" refY="6" markerWidth="7" markerHeight="7" orient="auto">
                    <path d="M 0 0 L 8 0 L 4 7 Z" fill="#C46B10" />
                  </marker>
                </defs>

                {/* Step 1 platform */}
                <g>
                  <path d="M 40 85 L 190 147 L 340 85 L 340 93 L 190 155 L 40 93 Z" fill="rgba(6,0,90,0.06)" />
                  <path d="M 190 23 L 340 85 L 190 147 L 40 85 Z" fill="white" stroke="rgba(6,0,90,0.16)" />
                  <circle cx="190" cy="55" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="156" cy="70" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="224" cy="70" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="190" cy="85" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="156" cy="100" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="224" cy="100" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="190" cy="115" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <g>
                    <circle cx="122" cy="85" r="6" fill="white" stroke="#C46B10" strokeWidth="2" />
                    <circle cx="122" cy="85" r="2" fill="#C46B10" />
                  </g>
                  <g>
                    <circle cx="258" cy="85" r="6" fill="white" stroke="#C46B10" strokeWidth="2" />
                    <circle cx="258" cy="85" r="2" fill="#C46B10" />
                  </g>
                  <text x="356" y="81" className="font-[family-name:var(--font-display)]" fontSize="23" fill="#06005A">
                    Step 1
                  </text>
                  <text x="356" y="102" fontSize="14" fill="#6b7280">
                    Two concepts
                  </text>
                  <text x="356" y="120" fontSize="14" fill="#6b7280">
                    left unresolved
                  </text>
                </g>

                {/* Step 2 CK platform */}
                <g>
                  <path d="M 40 235 L 190 297 L 340 235 L 340 243 L 190 305 L 40 243 Z" fill="rgba(6,0,90,0.06)" />
                  <path d="M 190 173 L 340 235 L 190 297 L 40 235 Z" fill="white" stroke="rgba(6,0,90,0.16)" />
                  <circle cx="190" cy="205" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="156" cy="220" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="224" cy="220" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="190" cy="235" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="156" cy="250" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="224" cy="250" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="190" cy="265" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <g>
                    <circle cx="122" cy="235" r="10" fill="none" stroke="#C46B10" strokeOpacity="0.35" />
                    <circle cx="122" cy="235" r="6" fill="#C46B10" />
                  </g>
                  <g>
                    <circle cx="258" cy="235" r="10" fill="none" stroke="#C46B10" strokeOpacity="0.35" />
                    <circle cx="258" cy="235" r="6" fill="#C46B10" />
                  </g>
                  <text x="356" y="231" className="font-[family-name:var(--font-display)]" fontSize="23" fill="#06005A">
                    Step 2 CK
                  </text>
                  <text x="356" y="252" fontSize="14" fill="#6b7280">
                    The same gaps
                  </text>
                  <text x="356" y="270" fontSize="14" fill="#6b7280">
                    come up first
                  </text>
                </g>

                {/* Step 3 platform */}
                <g>
                  <path d="M 40 385 L 190 447 L 340 385 L 340 393 L 190 455 L 40 393 Z" fill="rgba(6,0,90,0.06)" />
                  <path d="M 190 323 L 340 385 L 190 447 L 40 385 Z" fill="white" stroke="rgba(6,0,90,0.16)" />
                  <circle cx="190" cy="355" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="156" cy="370" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="224" cy="370" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="190" cy="385" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="156" cy="400" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="224" cy="400" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <circle cx="190" cy="415" r="4.5" fill="rgba(6,0,90,0.18)" />
                  <g>
                    <circle cx="122" cy="385" r="10" fill="none" stroke="rgba(6,0,90,0.3)" />
                    <circle cx="122" cy="385" r="6" fill="#06005A" />
                    <path d="M 119.4 385 l 1.9 2 l 3.4 -3.8" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <g>
                    <circle cx="258" cy="385" r="10" fill="none" stroke="rgba(6,0,90,0.3)" />
                    <circle cx="258" cy="385" r="6" fill="#06005A" />
                    <path d="M 255.4 385 l 1.9 2 l 3.4 -3.8" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <text x="356" y="381" className="font-[family-name:var(--font-display)]" fontSize="23" fill="#06005A">
                    Step 3
                  </text>
                  <text x="356" y="402" fontSize="14" fill="#6b7280">
                    Resolved &mdash; and
                  </text>
                  <text x="356" y="420" fontSize="14" fill="#6b7280">
                    built upon
                  </text>
                </g>

                {/* Projection lines */}
                <line x1="122" y1="97" x2="122" y2="219" stroke="#C46B10" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="3 6" markerEnd="url(#proj-arrow)" />
                <line x1="258" y1="97" x2="258" y2="219" stroke="#C46B10" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="3 6" markerEnd="url(#proj-arrow)" />
                <line x1="122" y1="247" x2="122" y2="369" stroke="#C46B10" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="3 6" markerEnd="url(#proj-arrow)" />
                <line x1="258" y1="247" x2="258" y2="369" stroke="#C46B10" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="3 6" markerEnd="url(#proj-arrow)" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center sm:pt-20 sm:pb-12">
        <p className="font-[family-name:var(--font-display)] text-balance text-2xl leading-snug tracking-tight text-black sm:text-3xl">
          These are the most important exams of your life. They should not be left to chance.
        </p>
        <div className="mx-auto mt-8 h-px w-10 bg-black/40" />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
          The MedPrep Institute Team
        </p>
      </div>

      {/* Method FAQ Section */}
      <div id="faq" className="border-t border-gray-200">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">FAQ</p>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Frequently Asked Questions.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Anything else?{' '}
              <a href="mailto:hello@medprepinstitute.com" className="underline underline-offset-4">
                Write to us
              </a>{' '}
              and a member of the team will get back to you.
            </p>
          </div>

          <div className="flex w-full flex-col">
            {[
              {
                q: 'What makes MedPrep Institute different from other question banks?',
                a: "Most question banks deal you disconnected questions with no memory of what you missed. MedPrep Institute builds each set from the one before it, so your practice has continuity and concepts get a chance to connect.",
              },
              {
                q: 'What happens when I get a question wrong?',
                a: 'The learning path adapts. You will be presented variations on the objective through spaced repetition over the next few days.',
              },
              {
                q: 'Does the spaced repetition show me the same question over and over again?',
                a: "Not exactly. We have pre-written variations on each question that hit the same learning objective from a different angle.",
              },
              {
                q: 'Can I focus on a single system?',
                a: "Yes. If you're in your cardiology block, restrict your questions to cardiology and the same adaptive engine works within it. Widen back out whenever you're ready.",
              },
              {
                q: 'Can I study for my SHELF exam with MedPrep Institute?',
                a: 'Yes. You can focus your learning path to the relevant SHELF exam topics.',
              },
              {
                q: "I need to study a little bit of everything. Isn't random questions better?",
                a: "Random sampling does help you touch on a lot of material. But MedPrep Institute prioritizes high yield material first. Then when new concepts are introduced, it automatically works out how to cover the entire exam in as little time as possible.",
              },
              {
                q: 'Does MedPrep Institute use clinical images?',
                a: 'Yes, our questions have rich clinical images to help you understand the material, just like the real exam.',
              },
              {
                q: 'Do we cover Biostats?',
                a: 'Yes, this is covered.',
              },
              {
                q: 'Which exams does MedPrep Institute cover?',
                a: 'MedPrep Institute is built for USMLE STEP 1, STEP 2 CK, STEP 3, and the ABIM Exam.',
              },
              {
                q: 'Is STEP 2 CS Covered?',
                a: 'No, we cover STEP 2 CK, not CS. For CS we recommend pairing us with a dedicated case-based practice resource.',
              },
              {
                q: 'Can I try it for free?',
                a: 'Yes, you can try it for free for 7 days.',
              },
            ].map((item, index) => (
              <div key={item.q} className="border-b border-gray-200 last:border-b-0">
                <button
                  type="button"
                  onClick={() => toggleMethodFaq(index)}
                  aria-expanded={openMethodFaq === index}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left text-lg font-medium text-black hover:underline"
                >
                  <span>{item.q}</span>
                  <svg
                    className={`mt-1 size-4 shrink-0 text-gray-500 transition-transform ${openMethodFaq === index ? 'rotate-180' : ''}`}
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
                {openMethodFaq === index && (
                  <p className="pb-5 text-base leading-relaxed text-gray-600">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="mx-auto max-w-6xl px-6 pb-16 sm:pb-24">
        <div className="rounded-3xl px-8 py-16 text-center sm:py-20" style={{ backgroundColor: '#06005A' }}>
          <h2 className="font-[family-name:var(--font-display)] mx-auto max-w-xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stop doing random questions.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-balance text-lg text-white/70">
            Start practicing right now. Try it for free for 7 days.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/sign-up"
              className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#C46B10] px-8 text-base font-semibold text-white hover:bg-[#a95a0d] transition-colors sm:w-auto"
            >
              Start your first set
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo and Copyright */}
            <div className="flex items-center gap-3">
              <img
                src="/animateos-logo (1).png"
                alt="MedPrep Institute Logo"
                className="h-8 w-8 rounded-lg object-cover"
              />
              <div className="text-sm text-gray-600">
                © 2026 MedPrep Institute. All rights reserved.
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <a href="/privacy-policy" className="text-gray-600 hover:text-[#06005A] transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-gray-600 hover:text-[#06005A] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-[#06005A] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
