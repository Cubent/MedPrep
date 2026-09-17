'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export const ContactPageContent = () => {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
        {/* Left: intro + direct contact */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
            Contact
          </p>
          <h1 className="font-[family-name:var(--font-display)] mt-3 text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Let&apos;s talk.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-gray-600">
            Questions about your account, a bug to report, or interested in bringing
            MedPrep Institute to your school or residency program? Send us a message
            and we&apos;ll get back to you.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Support
              </p>
              <a
                href="mailto:support@medprepinstitute.com"
                className="mt-1.5 block text-base font-medium text-[#06005A] hover:underline"
              >
                support@medprepinstitute.com
              </a>
              <p className="mt-1 text-sm text-gray-500">
                We typically reply within 1 business day.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Partnerships
              </p>
              <p className="mt-1.5 text-base text-gray-700">
                Med schools and residency programs interested in institutional access
                can reach out through the form and we&apos;ll follow up directly.
              </p>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="rounded-2xl border border-gray-200 bg-[#F4F2FB] p-6 sm:p-8">
          {status === 'success' ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#06005A]">
                <svg className="size-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h2 className="font-[family-name:var(--font-display)] mt-4 text-2xl font-bold text-black">
                Message sent
              </h2>
              <p className="mt-2 max-w-xs text-gray-600">
                Thanks for reaching out. We&apos;ll get back to you as soon as we can.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-medium text-[#06005A] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-black">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-black outline-none transition-colors focus:border-[#06005A] focus:ring-2 focus:ring-[#06005A]/20"
                />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-black">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-black outline-none transition-colors focus:border-[#06005A] focus:ring-2 focus:ring-[#06005A]/20"
                />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-black">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="resize-none rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-black outline-none transition-colors focus:border-[#06005A] focus:ring-2 focus:ring-[#06005A]/20"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-600">
                  Something went wrong sending your message. Please try again or
                  email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#C46B10] text-base font-semibold text-white transition-colors hover:bg-[#a95a0d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
