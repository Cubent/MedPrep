import { cn } from '@repo/design-system/lib/utils';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Space_Grotesk } from 'next/font/google';

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const fonts = cn(
  GeistSans.variable,
  GeistMono.variable,
  displayFont.variable,
  'touch-manipulation font-sans antialiased'
);
