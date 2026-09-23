'use client';

import Link from 'next/link';
import { HeaderAuth } from '../(home)/components/header-auth';

export const SiteHeader = () => (
  <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
    <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-3">
        <img
          src="/animateos-logo (1).png"
          alt="MedPrep Institute Logo"
          className="h-8 w-8 rounded-lg object-cover"
        />
        <span className="text-xl font-medium text-[#06005A]">MedPrep Institute</span>
      </Link>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm text-gray-600 md:flex">
        <Link href="/#how-it-works" className="hover:text-[#06005A] transition-colors">
          The Method
        </Link>
        <Link href="/blog" className="hover:text-[#06005A] transition-colors">
          Blog
        </Link>
        <Link href="/#faq" className="hover:text-[#06005A] transition-colors">
          Resources
        </Link>
        <a
          href="mailto:support@medprepinstitute.com"
          className="hover:text-[#06005A] transition-colors"
        >
          Contact
        </a>
      </nav>

      <HeaderAuth />
    </div>
  </header>
);
