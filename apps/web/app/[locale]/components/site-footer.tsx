import Link from 'next/link';

export const SiteFooter = () => (
  <footer className="px-6 pb-10 pt-16" style={{ backgroundColor: '#06005A' }}>
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src="/animateos-logo (1).png"
              alt="MedPrep Institute Logo"
              className="h-7 w-7 rounded-md object-cover"
            />
            <span className="text-base font-medium text-white">MedPrep Institute</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            An adaptive question bank for USMLE Step 1, Step 2 CK, Step 3, and the ABIM Exam that remembers what you miss.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Product</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li><Link href="/usmle-step-1-question-bank" className="text-white/70 hover:text-white">Step 1 Qbank</Link></li>
            <li><Link href="/#how-it-works" className="text-white/70 hover:text-white">The Method</Link></li>
            <li><Link href="/sign-up" className="text-white/70 hover:text-white">Start practicing</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Company</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li><Link href="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
            <li><Link href="/#faq" className="text-white/70 hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Legal</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li><Link href="/privacy-policy" className="text-white/70 hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="text-white/70 hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col-reverse items-center gap-6 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
        <p className="text-sm text-white/40">© 2026 MedPrep Institute. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/company/medprep-institute"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MedPrep Institute on LinkedIn"
            className="text-white/50 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/medprepinstitute/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MedPrep Institute on Facebook"
            className="text-white/50 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M22 12.061C22 6.505 17.523 2 12 2S2 6.505 2 12.061c0 5.022 3.657 9.184 8.438 9.939v-7.03H7.898v-2.909h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.909h-2.33V22c4.78-.755 8.437-4.917 8.437-9.939z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
);
