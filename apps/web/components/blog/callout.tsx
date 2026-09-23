import type { ReactNode } from 'react';

type CalloutProps = {
  title: string;
  tone?: 'answer' | 'disclosure' | 'tip';
  children: ReactNode;
};

const TONES = {
  answer: 'border-[#06005A]/20 bg-[#06005A]/5',
  disclosure: 'border-[#C46B10]/30 bg-[#C46B10]/5',
  tip: 'border-emerald-200 bg-emerald-50',
};

export const Callout = ({ title, tone = 'answer', children }: CalloutProps) => (
  <aside className={`not-prose my-8 rounded-2xl border p-5 sm:p-6 ${TONES[tone]}`}>
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#06005A]">{title}</p>
    <div className="mt-2 space-y-2 text-[15px] leading-relaxed text-gray-800">{children}</div>
  </aside>
);
