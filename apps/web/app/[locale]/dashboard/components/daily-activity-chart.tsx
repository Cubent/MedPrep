'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

type DayActivity = { date: string; correct: number; incorrect: number };

const BAR_RADIUS = 4;

/** Rounds only the outer (top) corners of whichever segment is topmost in the stack. */
const roundedRect = (x: number, y: number, width: number, height: number, roundTop: boolean) => {
  if (height <= 0) return '';
  const r = Math.min(BAR_RADIUS, width / 2, height);
  if (!roundTop || r <= 0) {
    return `M${x},${y} h${width} v${height} h${-width} Z`;
  }
  return `M${x},${y + r}
    a${r},${r} 0 0 1 ${r},${-r}
    h${width - 2 * r}
    a${r},${r} 0 0 1 ${r},${r}
    v${height - r}
    h${-width}
    Z`;
};

const CorrectBar = (props: any) => {
  const { x, y, width, height, payload, fill } = props;
  // "correct" sits at the bottom of the stack; it's only the topmost (and
  // therefore rounded) segment on days with zero incorrect answers.
  const roundTop = !payload.incorrect;
  return <path d={roundedRect(x, y, width, height, roundTop)} fill={fill} />;
};

const IncorrectBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  // "incorrect" is stacked on top, so it is always the outer/rounded segment
  // whenever it has any height.
  return <path d={roundedRect(x, y, width, height, true)} fill={fill} />;
};

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const correct = payload.find((p: any) => p.dataKey === 'correct')?.value ?? 0;
  const incorrect = payload.find((p: any) => p.dataKey === 'incorrect')?.value ?? 0;
  const total = correct + incorrect;

  return (
    <div className="rounded-lg bg-gray-800 px-3 py-2 text-xs font-medium text-white shadow-lg dark:bg-gray-200 dark:text-gray-800">
      <p className="font-semibold">{label}</p>
      {total === 0 ? (
        <p className="mt-0.5 text-white/70 dark:text-gray-800/70">No activity</p>
      ) : (
        <p className="mt-0.5">
          <span className="text-green-400 dark:text-green-600">{correct} correct</span>
          {' · '}
          <span className="text-red-400 dark:text-red-600">{incorrect} incorrect</span>
        </p>
      )}
    </div>
  );
};

export const DailyActivityChart = ({ days }: { days: DayActivity[] }) => {
  const hasAnyActivity = days.some((d) => d.correct + d.incorrect > 0);

  const data = days.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
  }));

  return (
    <div className="text-gray-400 dark:text-gray-500">
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              tick={{ fill: 'currentColor', fontSize: 10 }}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            <Bar dataKey="correct" stackId="activity" fill="#22c55e" shape={CorrectBar} isAnimationActive={false} />
            <Bar
              dataKey="incorrect"
              stackId="activity"
              fill="#ef4444"
              shape={IncorrectBar}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-green-500" />
          Correct
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-500" />
          Incorrect
        </span>
      </div>

      {!hasAnyActivity && (
        <p className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">No activity yet</p>
      )}
    </div>
  );
};
