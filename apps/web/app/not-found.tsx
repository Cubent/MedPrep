import type { Metadata } from 'next';
import { NotFoundContent } from './[locale]/components/not-found-content';

export const metadata: Metadata = {
  title: 'Page not found | MedPrep Institute',
};

export default function GlobalNotFound() {
  return <NotFoundContent />;
}
