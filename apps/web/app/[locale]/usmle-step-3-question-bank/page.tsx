import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { Step3PageContent } from './components/step3-page-content';

export const metadata: Metadata = createMetadata({
  title: 'USMLE Step 3 Question Bank',
  description: 'Practice Step 3 with an adaptive question bank built around patient management vignettes across 27 clinical disciplines, with weak-spot targeting and built-in spaced repetition.',
  path: '/usmle-step-3-question-bank',
  keywords: [
    'USMLE Step 3 question bank',
    'Step 3 Qbank',
    'USMLE Step 3 practice questions',
    'clinical management questions',
    'adaptive Step 3 prep',
  ],
});

const Step3QuestionBankPage = () => (
  <div className="min-h-screen bg-white">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'USMLE Step 3 Question Bank',
          description: 'An adaptive USMLE Step 3 question bank built around patient management vignettes, spaced repetition, and weak-spot targeting across 27 clinical disciplines.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'MedPrep Institute',
            url: 'https://www.medprepinstitute.org',
          },
        }),
      }}
    />
    <SiteHeader />
    <Step3PageContent />
    <SiteFooter />
  </div>
);

export default Step3QuestionBankPage;
