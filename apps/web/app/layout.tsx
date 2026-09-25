import './[locale]/styles.css';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { cn } from '@repo/design-system/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import type { ReactNode } from 'react';
import { MetaPixel } from '../components/meta-pixel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.medprepinstitute.org'),
  title: 'MedPrep Institute – All-in-One USMLE Prep Platform',
  description: 'MedPrep Institute is the all-in-one USMLE prep platform behind a 95% pass rate, with an adaptive Qbank, AI-powered practice, and personalized study guides for Step 1, Step 2 CK, Step 3, and the ABIM Exam.',
  keywords: [
    'MedPrep Institute',
    'USMLE prep platform',
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
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    title: 'MedPrep Institute',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'MedPrep Institute – All-in-One USMLE Prep Platform',
    description: 'The USMLE prep platform behind a 95% pass rate: an adaptive Qbank, AI-powered practice, and personalized study guides for Step 1, Step 2 CK, Step 3, and the ABIM Exam.',
    type: 'website',
    locale: 'en_US',
    siteName: 'MedPrep Institute',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedPrep Institute – All-in-One USMLE Prep Platform',
    description: 'The USMLE prep platform behind a 95% pass rate: an adaptive Qbank, AI-powered practice, and personalized study guides for Step 1, Step 2 CK, Step 3, and the ABIM Exam.',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html className={cn(fonts, 'scroll-smooth')} suppressHydrationWarning>
      <body style={{ backgroundColor: '#ffffff' }}>
        <ClerkProvider
          appearance={{
            cssLayerName: 'clerk',
            variables: {
              colorPrimary: '#06005A',
              colorPrimaryForeground: '#ffffff',
              colorBackground: '#F5F5F5',
              colorForeground: '#000000',
              colorNeutral: '#06005A',
              colorInput: '#ffffff',
              colorInputForeground: '#000000',
              colorMutedForeground: '#4b5563',
            },
            elements: {
              // The OTP digit boxes (email verification code) don't pick up
              // colorInput the way regular text fields do — they render at
              // colorBackground instead, which is a light grey nearly
              // matching the card behind it. Force them white with a
              // visible border so the code is actually readable.
              otpCodeFieldInput: {
                backgroundColor: '#ffffff',
                borderColor: '#d1d5db',
                color: '#000000',
              },
            },
          }}
        >
          <MetaPixel />
          <DesignSystemProvider>
            {children}
          </DesignSystemProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
