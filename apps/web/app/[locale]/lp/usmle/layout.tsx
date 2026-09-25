import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Ad landing page: kept out of search results (noindex) and out of the sitemap.
export const metadata: Metadata = {
  title: 'Ace the USMLE Without Even Taking Notes | MedPrep Institute',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: undefined },
};

const AdLandingLayout = ({ children }: { children: ReactNode }) => children;

export default AdLandingLayout;
