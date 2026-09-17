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

      <div className="mt-14 border-t border-white/10 pt-6 text-sm text-white/40">
        © 2026 MedPrep Institute. All rights reserved.
      </div>
    </div>
  </footer>
);
