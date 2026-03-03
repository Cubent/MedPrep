import './[locale]/styles.css';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { cn } from '@repo/design-system/lib/utils';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TripDeals - Save 90% on your next flight - Download on iOS now!',
  description: 'Join TripDeals and find the best flights from your city. Save up to 90% on flights.',
  icons: {
    icon: [
      { url: '/logoflavorly (5).png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    shortcut: '/logoflavorly (5).png',
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
        <link rel="canonical" href="https://tripdeals.com" />
        <meta name="apple-itunes-app" content="app-id=6758586511" />
      </head>
      <body style={{ backgroundColor: '#f9f7ee' }}>
        <DesignSystemProvider>
          {children}
        </DesignSystemProvider>
      </body>
    </html>
  );
}
