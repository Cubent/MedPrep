// Main layout component for the MedPrep Institute website
import './styles.css';
import { AnalyticsProvider } from '@repo/analytics';

import { fonts } from '@repo/design-system/lib/fonts';
import { cn } from '@repo/design-system/lib/utils';
import { Toolbar } from '@repo/feature-flags/components/toolbar';
import { getDictionary } from '@repo/internationalization';
import type { ReactNode } from 'react';
import { PageWrapper } from './components/page-wrapper';
import { PerformanceOptimizer } from '../../components/performance-optimizer';
import { PerformanceHints } from '../../components/seo-optimizer';
import { ErrorBoundary, ConsoleErrorSuppressor } from '../../components/error-boundary';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'MedPrep Institute - Study smarter. Master the USMLE.',
  description: 'MedPrep Institute is a living, adaptive question bank for USMLE Step 1, Step 2 CK, Step 3, and the ABIM Exam that learns how you learn.',
  keywords: [
    'MedPrep Institute',
    'USMLE question bank',
    'USMLE Step 1',
    'USMLE Step 2 CK',
    'USMLE Step 3',
    'ABIM exam prep',
    'adaptive question bank',
    'spaced repetition medical',
    'med school qbank',
    'residency prep',
  ],
  openGraph: {
    title: 'MedPrep Institute - Study smarter. Master the USMLE.',
    description: 'A living, adaptive question bank for USMLE Step 1, Step 2 CK, Step 3, and the ABIM Exam that learns how you learn.',
    url: 'https://medprepinstitute.com',
    siteName: 'MedPrep Institute',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MedPrep Institute',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedPrep Institute - Study smarter. Master the USMLE.',
    description: 'A living, adaptive question bank for USMLE Step 1, Step 2 CK, Step 3, and the ABIM Exam that learns how you learn.',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    title: 'MedPrep Institute',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

type RootLayoutProperties = {
  readonly children: ReactNode;
  readonly params: Promise<{
    locale: string;
  }>;
};

const RootLayout = async ({ children, params }: RootLayoutProperties) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <ConsoleErrorSuppressor />
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MedPrep Institute",
            "description": "A living, adaptive USMLE question bank that learns how you learn, covering Step 1, Step 2 CK, Step 3, and the ABIM Exam.",
            "url": "https://medprepinstitute.com",
          })
        }}
      />
      <ErrorBoundary>
        <AnalyticsProvider>
          <PerformanceOptimizer />
          <PageWrapper>
            {children}
          </PageWrapper>
          <Toolbar />
        </AnalyticsProvider>
      </ErrorBoundary>
    </>
  );
};

export default RootLayout;
