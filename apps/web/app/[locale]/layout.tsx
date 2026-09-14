// Main layout component for the Cubent website
import './styles.css';
import { AnalyticsProvider } from '@repo/analytics';

import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { cn } from '@repo/design-system/lib/utils';
import { Toolbar } from '@repo/feature-flags/components/toolbar';
import { getDictionary } from '@repo/internationalization';
import type { ReactNode } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { PageWrapper } from './components/page-wrapper';
import { ConditionalHeaderFooter } from './components/conditional-header-footer';
import { PerformanceOptimizer } from '../../components/performance-optimizer';
import { PerformanceHints } from '../../components/seo-optimizer';
import { ErrorBoundary, ConsoleErrorSuppressor } from '../../components/error-boundary';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'TripDeals - Save 90% on your next flight - Download on iOS now!',
  description: 'Get instant alerts for massive flight discounts and error fares from your home airport. Join 50K+ travelers saving up to 90% on flights with TripDeals.',
  keywords: [
    'TripDeals',
    'TripDeals app',
    'TripDeals flight deals',
    'TripDeals cheap flights',
    'download TripDeals',
    'TripDeals iOS app',
    'TripDeals mistake fares',
    'TripDeals price drop alerts',
    'TripDeals error fares',
    'flight deals',
    'cheap flights',
    'error fares',
    'mistake fares',
    'flight discounts',
    'travel deals',
    'airline tickets',
    'flight alerts',
    'budget travel',
  ],
  openGraph: {
    title: 'TripDeals - Find Exclusive Flight Deals & Save Up to 90%',
    description: 'Get instant alerts for massive flight discounts and error fares from your home airport. Join 50K+ travelers saving up to 90% on flights.',
    url: 'https://jointripdeals.com',
    siteName: 'TripDeals',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TripDeals - Exclusive Flight Deals',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TripDeals - Find Exclusive Flight Deals & Save Up to 90%',
    description: 'Get instant alerts for massive flight discounts and error fares from your home airport.',
    images: ['/og-image.png'],
  },
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
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path') || '';
  // No special page handling needed

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
            "name": "TripDeals",
            "description": "Flight deal alert service helping travelers save up to 90% on flights. Get instant alerts for massive discounts and error fares from your home airport.",
            "url": "https://tripdeals.com",
            "logo": "https://tripdeals.com/logoflavorly (5).png",
            "sameAs": [
              "https://www.instagram.com/tripdeals",
              "https://twitter.com/tripdeals",
              "https://www.facebook.com/tripdeals"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://tripdeals.com/contact",
              "email": "hello@tripdeals.com"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.7",
              "ratingCount": "50000",
              "bestRating": "5"
            },
            "keywords": "TripDeals, TripDeals app, TripDeals flight deals, download TripDeals, flight deals, cheap flights, flight discounts, error fares, travel deals, airline tickets, flight alerts, budget travel"
          })
        }}
      />
      
      {/* Application Page Specific Schema */}
      {pathname.includes('/models/application') && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Get Scouted - Velgance Agency",
              "description": "Become part of our international talent network. Fill out the application to start your career in the fashion world with Velgance Agency.",
              "url": "https://velgance.com/models/application",
              "image": {
                "@type": "ImageObject",
                "url": "https://i.postimg.cc/pXHkXTG6/Full-Body-Picture-7.png",
                "width": 1200,
                "height": 630,
                "alt": "Get Scouted - Velgance Agency Model Application"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Velgance Agency",
                "url": "https://velgance.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://i.postimg.cc/mrvCXXK5/Velgance-31.png"
                }
              },
              "mainEntity": {
                "@type": "Service",
                "name": "Model Application Service",
                "description": "Professional model application and scouting service for fashion industry talent",
                "provider": {
                  "@type": "Organization",
                  "name": "Velgance Agency"
                }
              }
            })
          }}
        />
      )}
      <ErrorBoundary>
        <AnalyticsProvider>
          <DesignSystemProvider>
              <PerformanceOptimizer />
              <PageWrapper>
                <ConditionalHeaderFooter dictionary={dictionary}>
                  {children}
                </ConditionalHeaderFooter>
              </PageWrapper>
            </DesignSystemProvider>
            <Toolbar />
          </AnalyticsProvider>
      </ErrorBoundary>
    </>
  );
};

export default RootLayout;
