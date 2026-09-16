'use client';

import { Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePracticeContext } from '../practice-context';

type Message = { role: 'user' | 'assistant'; content: string };

const SparkleIcon = ({ color = 'url(#aiTutorGradient)' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
    <defs>
      <linearGradient id="aiTutorGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a78bfa" />
        <stop offset="0.55" stopColor="#f0abfc" />
        <stop offset="1" stopColor="#facc15" />
      </linearGradient>
    </defs>
    <path d="M12 2 L14.2 9.2 L21.5 11.5 L14.2 13.8 L12 21 L9.8 13.8 L2.5 11.5 L9.8 9.2 Z" fill={color} />
    <path d="M19 1 L19.7 3.3 L22 4 L19.7 4.7 L19 7 L18.3 4.7 L16 4 L18.3 3.3 Z" fill={color} />
    <path d="M4.5 14 L5.1 15.9 L7 16.5 L5.1 17.1 L4.5 19 L3.9 17.1 L2 16.5 L3.9 15.9 Z" fill={color} />
  </svg>
);

const DEFAULT_GREETING =
  "Hi, I'm your AI Tutor. Ask me about anything you're studying — a concept, why an answer choice is wrong, or how to think through a vignette.";

export const AiTutorWidget = () => {
  const { currentQuestion, isStuck, setIsStuck, isPanelOpen, setIsPanelOpen } = usePracticeContext();
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: DEFAULT_GREETING }]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // The shake + "Ask the AI Tutor" nudge only shows briefly, not indefinitely.
  useEffect(() => {
    if (!isStuck) return;
    const timeout = setTimeout(() => setIsStuck(false), 6000);
    return () => clearTimeout(timeout);
  }, [isStuck, setIsStuck]);

  const open = () => {
    setIsPanelOpen(true);
    setIsStuck(false);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || isSending) return;

    const nextMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setError(null);
    setIsSending(true);

    try {
      const response = await fetch('/api/ai-tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, context: currentQuestion }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error ?? 'The AI Tutor is unavailable right now.');
        return;
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setError('Could not reach the AI Tutor. Check your connection and try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const showNudge = isStuck && !isPanelOpen;

  return (
    <>
      <style jsx>{`
        @keyframes ai-tutor-shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-3px) rotate(-6deg);
          }
          40% {
            transform: translateX(3px) rotate(6deg);
          }
          60% {
            transform: translateX(-2px) rotate(-4deg);
          }
          80% {
            transform: translateX(2px) rotate(4deg);
          }
        }
        .ai-tutor-shake {
          animation: ai-tutor-shake 0.5s ease-in-out infinite;
        }
      `}</style>

      <div className="relative">
        <button
          type="button"
          onClick={open}
          aria-label="Open AI Tutor"
          className={`flex size-9 items-center justify-center rounded-full bg-[#06005A] shadow-sm transition-transform hover:scale-105 ${
            showNudge ? 'ai-tutor-shake' : ''
          }`}
        >
          <SparkleIcon color="white" />
        </button>

        {showNudge && (
          <button
            type="button"
            onClick={open}
            className="absolute right-0 top-full z-[72] mt-2 whitespace-nowrap rounded-lg bg-[#06005A] px-3 py-1.5 text-xs font-medium text-white shadow-lg hover:bg-[#0a0080]"
          >
            Ask the AI Tutor
            <span className="absolute -top-1 right-3 size-2 rotate-45 bg-[#06005A]" />
          </button>
        )}
      </div>

      {/* Backdrop — fades in/out with isPanelOpen, sits below the header */}
      <div
        onClick={() => setIsPanelOpen(false)}
        className={`fixed inset-x-0 bottom-0 top-16 z-[70] bg-black/10 transition-opacity duration-300 ${
          isPanelOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panel — always mounted so the slide transition can animate; sits
          below the sticky header (top-16) and slides in from the right. */}
      <div
        className={`fixed bottom-0 right-0 top-16 z-[71] flex w-full max-w-sm flex-col border-l border-gray-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-white/10 dark:bg-[#120A2E] ${
          isPanelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-gray-200 bg-[#06005A] px-5 py-4 dark:border-white/10">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10">
              <SparkleIcon color="white" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">AI Tutor</p>
              <p className="truncate text-[0.65rem] text-white/60">
                {currentQuestion
                  ? `Discussing · ${currentQuestion.system} · ${currentQuestion.objectiveTitle}`
                  : 'Always here to help you understand'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsPanelOpen(false)}
            aria-label="Close"
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-3">
            {messages.map((message, i) => (
              <div key={i} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'rounded-br-sm bg-[#06005A] text-white'
                      : 'rounded-bl-sm bg-[#F4F2FB] text-gray-800 dark:bg-white/10 dark:text-gray-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-[#F4F2FB] px-3.5 py-2.5 text-sm text-gray-400 dark:bg-white/10 dark:text-gray-500">
                  <span className="inline-flex gap-1">
                    <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-current" />
                  </span>
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-400">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Composer */}
        <div className="border-t border-gray-200 p-3 dark:border-white/10">
          {currentQuestion && (
            <p className="mb-2 truncate text-[0.65rem] font-medium text-[#C46B10]">
              &#10022; Aware of your current question
            </p>
          )}
          <div className="flex items-end gap-2 rounded-xl border border-gray-200 bg-white p-2 dark:border-white/15 dark:bg-white/5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask the AI Tutor…"
              rows={1}
              className="max-h-24 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-100"
            />
            <button
              type="button"
              onClick={send}
              disabled={!input.trim() || isSending}
              aria-label="Send"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#06005A] text-white transition-colors hover:bg-[#0a0080] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
