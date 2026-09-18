'use client';

import {
  Activity,
  Ambulance,
  Baby,
  BarChart3,
  Bone,
  Brain,
  Bug,
  Check,
  Dna,
  Droplet,
  Droplets,
  Ear,
  Egg,
  Eye,
  Filter,
  FlaskConical,
  HandHeart,
  HeartPulse,
  Home,
  Layers,
  type LucideIcon,
  MessageCircle,
  Microscope,
  PersonStanding,
  Pill,
  Radiation,
  Ribbon,
  Scale,
  Scissors,
  Shield,
  ShieldCheck,
  Stethoscope,
  Sun,
  Utensils,
  Waves,
  Wind,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type Topic = {
  systemId: string;
  name: string;
  seenPct: number;
  totalQuestions: number;
};

const TOPIC_ICONS: Record<string, LucideIcon> = {
  Anatomy: Bone,
  'Behavioral Science': Brain,
  Biochemistry: FlaskConical,
  'Biostatistics, epidemiology & evidence-based medicine': BarChart3,
  Embryology: Egg,
  Genetics: Dna,
  Histology: Microscope,
  Immunology: Shield,
  Microbiology: Bug,
  Pathology: Stethoscope,
  Pharmacology: Pill,
  Physiology: HeartPulse,
  Breast: Ribbon,
  'Cardiology & vascular medicine': HeartPulse,
  'Critical Care': Activity,
  Dermatology: Sun,
  'ENT / oral & dental medicine': Ear,
  'Emergency medicine': Ambulance,
  'Endocrinology, diabetes & metabolism': Droplet,
  'Ethics, law, communication, patient safety & health systems': Scale,
  'Gastroenterology & hepatology': Utensils,
  'General internal medicine': Stethoscope,
  'Geriatrics & palliative care': HandHeart,
  Hematology: Droplets,
  'Infectious diseases': Bug,
  'Musculoskeletal / orthopedics / sports medicine': Bone,
  Nephrology: Filter,
  Neurology: Brain,
  'OB/GYN': Baby,
  Oncology: Radiation,
  Ophthalmology: Eye,
  'Pediatrics & adolescent medicine': PersonStanding,
  'Preventive medicine, public health & occupational/environmental medicine':
    ShieldCheck,
  'Primary Care': Home,
  'Psychiatry & behavioral health': MessageCircle,
  Pulmonology: Wind,
  'Rheumatology, allergy & immunology': Shield,
  'Surgery / trauma / perioperative care': Scissors,
  'Urology / male reproductive': Waves,
};

const iconFor = (name: string): LucideIcon => TOPIC_ICONS[name] ?? Layers;

export const TopicsSelector = () => {
  const [topics, setTopics] = useState<Topic[] | null>(null);
  const [committed, setCommitted] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/practice/focus');
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error ?? 'Could not load topics.');
        return;
      }
      setTopics(data.topics ?? []);
      setCommitted(data.focusSystemIds ?? []);
      setSelected(new Set<string>(data.focusSystemIds ?? []));
    })();
  }, []);

  const isDirty = useMemo(() => {
    const a = [...selected].sort().join(',');
    const b = [...committed].sort().join(',');
    return a !== b;
  }, [selected, committed]);

  const toggleTopic = (systemId: string) => {
    setSavedMessage(null);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(systemId)) next.delete(systemId);
      else next.add(systemId);
      return next;
    });
  };

  const selectAllTopics = () => {
    setSavedMessage(null);
    setSelected(new Set());
  };

  const reset = () => {
    setSelected(new Set(committed));
    setSavedMessage(null);
  };

  const applyFocus = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const systemIds = [...selected];
      const response = await fetch('/api/practice/focus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemIds }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error ?? 'Could not apply focus.');
        return;
      }
      setCommitted(systemIds);
      setSavedMessage(
        systemIds.length === 0
          ? 'Applied — sampling from the whole exam.'
          : `Applied — drilling ${systemIds.length} topic${systemIds.length === 1 ? '' : 's'}.`
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (error) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-gray-700 text-sm dark:border-white/10 dark:bg-[#120A2E] dark:text-gray-300">
        {error}
      </div>
    );
  }

  if (!topics) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#120A2E]">
        <p className="text-gray-500 text-sm dark:text-gray-400">
          Loading topics…
        </p>
      </div>
    );
  }

  const allTopicsSelected = selected.size === 0;

  return (
    <div className="pb-24">
      <p className="font-semibold text-[#06005A] text-sm dark:text-white">
        Topics
      </p>

      <button
        type="button"
        onClick={selectAllTopics}
        className={`mt-4 flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-colors ${
          allTopicsSelected
            ? 'border-[#06005A] bg-[#06005A]/5 dark:border-[#C46B10] dark:bg-[#C46B10]/10'
            : 'border-gray-200 hover:border-gray-300 dark:border-white/10 dark:hover:border-white/20'
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
              allTopicsSelected
                ? 'bg-[#06005A] text-white dark:bg-[#C46B10]'
                : 'bg-gray-100 text-gray-400 dark:bg-white/10'
            }`}
          >
            <Layers className="size-4" />
          </span>
          <div>
            <p className="font-semibold text-[#06005A] text-sm dark:text-white">
              All topics
            </p>
            <p className="text-gray-500 text-xs dark:text-gray-400">
              No filter &mdash; the engine samples across the whole exam.
            </p>
          </div>
        </div>
        {allTopicsSelected && (
          <Check className="size-5 shrink-0 text-[#06005A] dark:text-[#C46B10]" />
        )}
      </button>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {topics.map((topic) => {
          const isSelected = selected.has(topic.systemId);
          const Icon = iconFor(topic.name);
          return (
            <button
              key={topic.systemId}
              type="button"
              onClick={() => toggleTopic(topic.systemId)}
              className={`flex items-start justify-between gap-3 rounded-xl border-2 p-4 text-left transition-colors ${
                isSelected
                  ? 'border-[#06005A] bg-[#06005A]/5 dark:border-[#C46B10] dark:bg-[#C46B10]/10'
                  : 'border-gray-200 hover:border-gray-300 dark:border-white/10 dark:hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                    isSelected
                      ? 'bg-[#06005A] text-white dark:bg-[#C46B10]'
                      : 'bg-gray-100 text-gray-400 dark:bg-white/10'
                  }`}
                >
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="font-semibold text-[#06005A] text-sm dark:text-white">
                    {topic.name}
                  </p>
                  <p className="mt-0.5 text-gray-500 text-xs dark:text-gray-400">
                    {topic.seenPct}% seen &middot;{' '}
                    {topic.totalQuestions.toLocaleString()} question
                    {topic.totalQuestions === 1 ? '' : 's'}
                  </p>
                </div>
              </div>
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected
                    ? 'border-[#06005A] bg-[#06005A] text-white dark:border-[#C46B10] dark:bg-[#C46B10]'
                    : 'border-gray-300 dark:border-white/20'
                }`}
              >
                {isSelected && <Check className="size-3.5" />}
              </span>
            </button>
          );
        })}
      </div>

      {isDirty && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-gray-200 border-t bg-white/95 px-4 py-4 backdrop-blur sm:px-6 dark:border-white/10 dark:bg-[#120A2E]/95">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
            <p className="text-gray-600 text-sm dark:text-gray-300">
              {selected.size === 0
                ? 'Reset to sampling from the whole exam?'
                : `Drill ${selected.size} selected topic${selected.size === 1 ? '' : 's'}?`}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={reset}
                className="rounded-full px-4 py-2 font-medium text-gray-500 text-sm hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={applyFocus}
                disabled={isSaving}
                className="rounded-full bg-[#06005A] px-6 py-2 font-semibold text-sm text-white transition-colors hover:bg-[#0a0080] disabled:opacity-50"
              >
                {isSaving ? 'Applying…' : 'Apply focus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {!isDirty && savedMessage && (
        <p className="mt-6 text-center font-medium text-green-600 text-sm dark:text-green-400">
          {savedMessage}
        </p>
      )}
    </div>
  );
};
