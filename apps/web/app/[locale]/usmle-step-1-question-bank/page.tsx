import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { Step1PageContent } from './components/step1-page-content';

export const metadata: Metadata = createMetadata({
  title: 'USMLE Step 1 Question Bank',
  description: 'Practice Step 1 with an adaptive question bank that targets your weak spots and brings concepts back with built-in spaced repetition. NBME-style vignettes across every Step 1 subject.',
  path: '/usmle-step-1-question-bank',
  keywords: [
    'USMLE Step 1 question bank',
    'Step 1 Qbank',
    'USMLE Step 1 practice questions',
    'NBME style questions',
    'adaptive Step 1 prep',
  ],
});

const Step1QuestionBankPage = () => (
  <div className="min-h-screen bg-white">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'USMLE Step 1 Question Bank',
          description: 'An adaptive USMLE Step 1 question bank with NBME-style vignettes, spaced repetition, and weak-spot targeting across every Step 1 subject.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'MedPrep Institute',
            url: 'https://medprepinstitute.org',
          },
        }),
      }}
    />
    <SiteHeader />
    <Step1PageContent />
    <SiteFooter />
  </div>
);

export default Step1QuestionBankPage;
