import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { InViewGroup } from './in-view-group';

// Sample data only. The section says so on the page, so nothing here reads as
// real student results.
const DAILY_ACTIVITY = [
  { day: 'D1', correct: 12, incorrect: 5 },
  { day: 'D2', correct: 18, incorrect: 4 },
  { day: 'D3', correct: 0, incorrect: 0 },
  { day: 'D4', correct: 22, incorrect: 6 },
  { day: 'D5', correct: 25, incorrect: 5 },
  { day: 'D6', correct: 15, incorrect: 7 },
  { day: 'D7', correct: 0, incorrect: 0 },
  { day: 'D8', correct: 28, incorrect: 4 },
  { day: 'D9', correct: 30, incorrect: 6 },
  { day: 'D10', correct: 20, incorrect: 3 },
  { day: 'D11', correct: 24, incorrect: 5 },
  { day: 'D12', correct: 18, incorrect: 2 },
  { day: 'D13', correct: 26, incorrect: 4 },
  { day: 'D14', correct: 32, incorrect: 3 },
];
const OVERALL_ACCURACY = 78;
const RECENT_ACCURACY = 84;
const EXAM_COVERAGE = 64;
const UPCOMING_REVIEWS = [
  { day: 'Mon', count: 6 },
  { day: 'Tue', count: 4 },
  { day: 'Wed', count: 9 },
  { day: 'Thu', count: 3 },
  { day: 'Fri', count: 7 },
  { day: 'Sat', count: 2 },
  { day: 'Sun', count: 5 },
];

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const MAX_DAILY_TOTAL = Math.max(...DAILY_ACTIVITY.map((d) => d.correct + d.incorrect));
const MAX_REVIEWS = Math.max(...UPCOMING_REVIEWS.map((d) => d.count));

const vars = (values: Record<string, string | number>) => values as CSSProperties;

// Every animation is driven by [data-inview] on the wrapper. The "no JS" rules
// at the bottom show the finished chart for anyone who never runs the script.
const CSS = `
.dp-bar{height:0;transition:height .9s cubic-bezier(.2,.8,.2,1) var(--d,0s)}
[data-inview="true"] .dp-bar{height:var(--h)}
.dp-hbar{width:0;transition:width 1s cubic-bezier(.2,.8,.2,1) var(--d,0s)}
[data-inview="true"] .dp-hbar{width:var(--w)}
.dp-ring{stroke-dashoffset:${RING_CIRCUMFERENCE.toFixed(2)};transition:stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1) .15s}
[data-inview="true"] .dp-ring{stroke-dashoffset:var(--off)}
.dp-cell{background:rgba(255,255,255,.12);transition:background-color .35s ease var(--d,0s)}
[data-inview="true"] .dp-cell[data-on="1"]{background:#C46B10}
.dp-pop{opacity:0;transform:translateY(8px) scale(.9);transition:opacity .5s ease var(--d,0s),transform .5s cubic-bezier(.2,.8,.2,1) var(--d,0s)}
[data-inview="true"] .dp-pop{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.dp-bar,.dp-hbar,.dp-ring,.dp-cell,.dp-pop{transition:none}}
`;
const NO_JS_CSS = `
.dp-bar{height:var(--h)}.dp-hbar{width:var(--w)}.dp-ring{stroke-dashoffset:var(--off)}
.dp-cell[data-on="1"]{background:#C46B10}.dp-pop{opacity:1;transform:none}
`;

const Card = ({
  className = '',
  title,
  caption,
  children,
}: {
  className?: string;
  title: string;
  caption: string;
  children: ReactNode;
}) => (
  <figure className={`flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`}>
    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white">{title}</h3>
    <div className="mt-5 flex-1">{children}</div>
    <figcaption className="mt-5 text-sm leading-relaxed text-white/60">{caption}</figcaption>
  </figure>
);

type DashboardPreviewSectionProps = {
  /** Shown in the heading, e.g. "Step 1" or "Step 2 CK". */
  exam: string;
  /** Sample topics with a sample accuracy, best first. Under 50% is flagged. */
  topics: { name: string; pct: number }[];
};

export const DashboardPreviewSection = ({ exam, topics }: DashboardPreviewSectionProps) => {
  const ringOffset = RING_CIRCUMFERENCE * (1 - OVERALL_ACCURACY / 100);
  const coverageDescription = `${EXAM_COVERAGE} of 100 squares filled, meaning ${EXAM_COVERAGE}% of the exam blueprint seen.`;

  return (
    <section
      id="dashboard-preview"
      aria-labelledby="dashboard-preview-heading"
      className="bg-[#000C3F] px-6 py-16 sm:py-20"
    >
      <style>{CSS}</style>
      <noscript>
        <style>{NO_JS_CSS}</style>
      </noscript>

      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C46B10]">
            Your dashboard
          </p>
          <h2
            id="dashboard-preview-heading"
            className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Track your {exam} progress and see exactly what to fix next
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Every question you answer feeds a live dashboard: daily activity, accuracy by topic,
            exam coverage and the reviews scheduled for the days ahead. The numbers below are
            sample data, so you can see how it looks before you start.
          </p>
        </div>

        <InViewGroup className="grid gap-6 lg:grid-cols-3">
          {/* Daily activity */}
          <Card
            className="lg:col-span-2"
            title="Daily activity"
            caption="Correct and incorrect answers for each of the last 14 days, so you can see whether you are keeping a steady pace."
          >
            <div
              role="img"
              aria-label="Bar chart of sample daily activity over 14 days, stacked by correct and incorrect answers."
            >
              <div className="flex h-40 items-end gap-1.5" aria-hidden>
                {DAILY_ACTIVITY.map((d, i) => {
                  const total = d.correct + d.incorrect;
                  return (
                    <div key={d.day} className="flex h-full flex-1 flex-col justify-end gap-px">
                      {total === 0 ? (
                        <div className="h-px w-full bg-white/20" />
                      ) : (
                        <>
                          <div
                            className="dp-bar w-full rounded-t-[3px] bg-red-500"
                            style={vars({
                              '--h': `${(d.incorrect / MAX_DAILY_TOTAL) * 100}%`,
                              '--d': `${i * 0.05}s`,
                            })}
                          />
                          <div
                            className="dp-bar w-full rounded-b-[3px] bg-green-500"
                            style={vars({
                              '--h': `${(d.correct / MAX_DAILY_TOTAL) * 100}%`,
                              '--d': `${i * 0.05}s`,
                            })}
                          />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex justify-between text-[0.65rem] text-white/40" aria-hidden>
                <span>14 days ago</span>
                <span>Today</span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-white/60">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-green-500" />
                  Correct
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-red-500" />
                  Incorrect
                </span>
              </div>
            </div>
          </Card>

          {/* Accuracy */}
          <Card
            title="Accuracy"
            caption="Your overall accuracy, and how your last 7 days compare."
          >
            <div className="flex flex-col items-center">
              <div
                className="relative size-36"
                role="img"
                aria-label={`Ring chart: ${OVERALL_ACCURACY}% overall sample accuracy.`}
              >
                <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
                  <circle
                    cx="60"
                    cy="60"
                    r={RING_RADIUS}
                    fill="none"
                    stroke="rgba(255,255,255,.12)"
                    strokeWidth="10"
                  />
                  <circle
                    className="dp-ring"
                    cx="60"
                    cy="60"
                    r={RING_RADIUS}
                    fill="none"
                    stroke="#C46B10"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRCUMFERENCE.toFixed(2)}
                    style={vars({ '--off': ringOffset.toFixed(2) })}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
                    {OVERALL_ACCURACY}%
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-wider text-white/50">
                    Overall
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">
                Last 7 days: <span className="font-semibold text-green-400">{RECENT_ACCURACY}%</span>
              </p>
            </div>
          </Card>

          {/* Topic accuracy */}
          <Card
            className="lg:col-span-2"
            title="Topic accuracy"
            caption="Accuracy for every topic you have practiced. Anything under 50% is flagged, so you know what to work on first."
          >
            <ul className="flex flex-col gap-4">
              {topics.map((topic, i) => {
                const needsWork = topic.pct < 50;
                return (
                  <li key={topic.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/90">{topic.name}</span>
                      <span className={needsWork ? 'font-semibold text-[#C46B10]' : 'text-white/70'}>
                        {topic.pct}%{needsWork && ' · needs work'}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10" aria-hidden>
                      <div
                        className={`dp-hbar h-full rounded-full ${needsWork ? 'bg-[#C46B10]' : 'bg-green-500'}`}
                        style={vars({ '--w': `${topic.pct}%`, '--d': `${i * 0.12}s` })}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* Exam coverage */}
          <Card
            title="Exam coverage"
            caption={`How much of the ${exam} blueprint you have seen. Each square is one percent.`}
          >
            <div role="img" aria-label={coverageDescription}>
              <div className="grid grid-cols-10 gap-1" aria-hidden>
                {Array.from({ length: 100 }).map((_, i) => (
                  <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative grid
                    key={i}
                    className="dp-cell aspect-square rounded-[3px]"
                    data-on={i < EXAM_COVERAGE ? '1' : '0'}
                    style={vars({ '--d': `${i * 0.012}s` })}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-white/70">
                <span className="font-semibold text-white">{EXAM_COVERAGE}%</span> of the blueprint seen
              </p>
            </div>
          </Card>

          {/* Scheduled reviews */}
          <Card
            className="lg:col-span-3"
            title="Scheduled reviews"
            caption="Concepts you miss come back on a spaced-repetition schedule. These are the reviews lined up over the next 7 days."
          >
            <div
              role="img"
              aria-label={`Sample reviews due over the next 7 days: ${UPCOMING_REVIEWS.map((d) => `${d.day} ${d.count}`).join(', ')}.`}
            >
              <div className="grid grid-cols-7 gap-3" aria-hidden>
                {UPCOMING_REVIEWS.map((d, i) => (
                  <div
                    key={d.day}
                    className="dp-pop flex flex-col items-center rounded-xl border border-white/10 bg-white/5 px-2 py-4"
                    style={vars({ '--d': `${i * 0.08}s` })}
                  >
                    <span className="text-[0.65rem] uppercase tracking-wider text-white/50">
                      {d.day}
                    </span>
                    <span className="font-[family-name:var(--font-display)] mt-1 text-2xl font-bold text-white">
                      {d.count}
                    </span>
                    <span className="mt-2 h-1 w-full max-w-[3rem] overflow-hidden rounded-full bg-white/10">
                      <span
                        className="dp-hbar block h-full rounded-full bg-[#C46B10]"
                        style={vars({
                          '--w': `${(d.count / MAX_REVIEWS) * 100}%`,
                          '--d': `${0.2 + i * 0.08}s`,
                        })}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </InViewGroup>

        <div className="mt-10 text-center">
          <Link
            href="/sign-up"
            className="inline-block rounded-full bg-[#C46B10] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a95a0d]"
          >
            Start your 7-day free trial
          </Link>
          <p className="mt-3 text-xs text-white/50">Sample data shown for illustration.</p>
        </div>
      </div>
    </section>
  );
};
