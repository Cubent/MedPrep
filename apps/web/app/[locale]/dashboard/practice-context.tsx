'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

type CurrentQuestion = { system: string; objectiveTitle: string; stem: string } | null;

type PracticeContextValue = {
  currentQuestion: CurrentQuestion;
  setCurrentQuestion: (question: CurrentQuestion) => void;
  /** True once the user's been on the same unanswered question for a while. */
  isStuck: boolean;
  setIsStuck: (value: boolean) => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (value: boolean) => void;
};

const PracticeContext = createContext<PracticeContextValue | null>(null);

export const PracticeProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>(null);
  const [isStuck, setIsStuck] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <PracticeContext.Provider
      value={{ currentQuestion, setCurrentQuestion, isStuck, setIsStuck, isPanelOpen, setIsPanelOpen }}
    >
      {children}
    </PracticeContext.Provider>
  );
};

/** What question the user is currently looking at in /dashboard/practice, if
 * any, plus whether they seem stuck and whether the AI Tutor panel is open —
 * shared so the header (where the AI Tutor lives) and the practice page can
 * coordinate. */
export const usePracticeContext = () => {
  const ctx = useContext(PracticeContext);
  if (!ctx) throw new Error('usePracticeContext must be used within PracticeProvider');
  return ctx;
};
