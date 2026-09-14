import './[locale]/styles.css';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { cn } from '@repo/design-system/lib/utils';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TripDeals - Save 90% on your next flight - Download on iOS now!',
  description: 'We alert you when airlines publish flights 50-90% off regular price from your own airport.. Save up to 90% on flights.',
  manifest: '/manifest.json',
  appleWebApp: {
    title: 'TripDeals',
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
    title: 'TripDeals - Find Exclusive Flight Deals & Save Up to 90%',
    description: 'Get instant alerts for massive flight discounts and error fares from your home airport. Join 50K+ travelers saving up to 90% on flights.',
    type: 'website',
    locale: 'en_US',
    siteName: 'TripDeals',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TripDeals - Find Exclusive Flight Deals & Save Up to 90%',
    description: 'Get instant alerts for massive flight discounts and error fares from your home airport.',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html className={cn(fonts, 'scroll-smooth')}>
      <head>
        <link rel="canonical" href="https://jointripdeals.com" />
        <meta name="apple-itunes-app" content="app-id=6758586511, app-argument=https://jointripdeals.com" />
      </head>
      <body style={{ backgroundColor: '#ffffff' }}>
        <DesignSystemProvider>
          {children}
        </DesignSystemProvider>
      </body>
    </html>
  );
}
