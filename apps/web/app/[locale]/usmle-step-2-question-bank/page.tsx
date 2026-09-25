import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { Step2PageContent } from './components/step2-page-content';

export const metadata: Metadata = createMetadata({
  title: 'USMLE Step 2 CK Question Bank',
  description: 'Practice Step 2 CK with an adaptive question bank built around clinical management and patient-care vignettes, with weak-spot targeting and built-in spaced repetition.',
  path: '/usmle-step-2-question-bank',
  keywords: [
    'USMLE Step 2 CK question bank',
    'Step 2 CK Qbank',
    'USMLE Step 2 practice questions',
    'clinical vignette questions',
    'adaptive Step 2 CK prep',
  ],
});

const Step2QuestionBankPage = () => (
  <div className="min-h-screen bg-white">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'USMLE Step 2 CK Question Bank',
          description: 'An adaptive USMLE Step 2 CK question bank built around clinical management vignettes, spaced repetition, and weak-spot targeting across every clinical rotation.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'MedPrep Institute',
            url: 'https://www.medprepinstitute.org',
          },
        }),
      }}
    />
    <SiteHeader />
    <Step2PageContent />
    <SiteFooter />
  </div>
);

export default Step2QuestionBankPage;
