import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { AbimPageContent } from './components/abim-page-content';

export const metadata: Metadata = createMetadata({
  title: 'ABIM Internal Medicine Question Bank',
  description: 'Prepare for the ABIM exam with an adaptive internal medicine question bank across 27 clinical disciplines, with weak-spot targeting and built-in spaced repetition.',
  path: '/abim-internal-medicine-question-bank',
  keywords: [
    'ABIM question bank',
    'ABIM internal medicine question bank',
    'ABIM exam prep',
    'internal medicine board review',
    'adaptive ABIM Qbank',
  ],
});

const AbimQuestionBankPage = () => (
  <div className="min-h-screen bg-white">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'ABIM Internal Medicine Question Bank',
          description: 'An adaptive ABIM Internal Medicine question bank built around patient vignettes, spaced repetition, and weak-spot targeting across 27 clinical disciplines.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'MedPrep Institute',
            url: 'https://www.medprepinstitute.org',
          },
        }),
      }}
    />
    <SiteHeader />
    <AbimPageContent />
    <SiteFooter />
  </div>
);

export default AbimQuestionBankPage;
