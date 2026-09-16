import './[locale]/styles.css';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { cn } from '@repo/design-system/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

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
  openGraph: {
    title: 'MedPrep Institute - Study smarter. Master the USMLE.',
    description: 'A living, adaptive question bank for USMLE Step 1, Step 2 CK, Step 3, and the ABIM Exam that learns how you learn.',
    type: 'website',
    locale: 'en_US',
    siteName: 'MedPrep Institute',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedPrep Institute - Study smarter. Master the USMLE.',
    description: 'A living, adaptive question bank for USMLE Step 1, Step 2 CK, Step 3, and the ABIM Exam that learns how you learn.',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html className={cn(fonts, 'scroll-smooth')} suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://medprepinstitute.com" />
      </head>
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
          }}
        >
          <DesignSystemProvider>
            {children}
          </DesignSystemProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
