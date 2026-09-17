import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Contact',
  description: 'Get in touch with the MedPrep Institute team for support, partnership opportunities, or questions about our USMLE prep platform.',
  path: '/contact',
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
