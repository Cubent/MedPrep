import type { Metadata } from 'next';
import { NotFoundContent } from './components/not-found-content';

export const metadata: Metadata = {
  title: 'Page not found | MedPrep Institute',
};

export default function NotFound() {
  return <NotFoundContent />;
}
