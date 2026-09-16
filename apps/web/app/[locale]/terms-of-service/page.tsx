import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = createMetadata({
  title: 'Terms of Service',
  description: 'The terms that govern your access to and use of MedPrep Institute.',
  noSuffix: true,
});

const TermsOfServicePage = () => (
  <div className="min-h-screen bg-white">
    <SiteHeader />

    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
        Legal
      </p>
      <h1 className="font-[family-name:var(--font-display)] mt-3 text-4xl font-bold tracking-tight text-black sm:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-gray-500">Last updated September 15, 2026</p>

      <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-[family-name:var(--font-display)] prose-headings:text-black prose-h2:mt-10 prose-h2:text-2xl prose-p:leading-relaxed prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-[#06005A]">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of
          medprepinstitute.com and related MedPrep Institute products and services. By using
          MedPrep Institute, you agree to these Terms.
        </p>

        <h2>Educational purpose</h2>
        <p>
          MedPrep Institute provides exam-preparation and study tools. MedPrep Institute is not
          medical advice, clinical guidance, legal advice, or a substitute for professional
          judgment. Question explanations, generated content, analytics, and study
          recommendations are provided for educational use only.
        </p>

        <h2>Accounts and access</h2>
        <ul>
          <li>You must provide accurate account information, including your name and email address.</li>
          <li>You are responsible for keeping your login credentials secure.</li>
          <li>
            Your account is personal to you. You may not share, sell, transfer, or sublicense
            your account or subscription.
          </li>
          <li>
            We may suspend or terminate accounts that violate these Terms, abuse the service,
            threaten platform security, or attempt unauthorized access.
          </li>
        </ul>

        <h2>Subscriptions, free trials, and billing</h2>
        <p>
          Paid subscriptions and trials are processed through Stripe. A free trial lasts 7 days
          unless a different offer is shown at checkout. After a trial ends, your selected paid
          plan may begin according to the checkout terms presented to you. You are responsible for
          canceling before renewal if you do not want to continue.
        </p>
        <p>
          Prices, plans, and features may change. If a price or plan change affects an active
          subscription, we will apply the change as permitted by law and by the terms shown in
          Stripe or in your account.
        </p>

        <h2>Refund policy</h2>
        <p>
          Refunds are permitted only within 30 days after the paid subscription begins and only if
          there has been no continued account activity after the 7-day free trial period.
          Continued activity includes logging in, answering questions, reviewing history, using
          study features, or otherwise accessing MedPrep Institute after the trial period ends.
        </p>
        <p>
          If a refund is issued, your account and study history will be deleted. The refunded
          payment card will not be accepted again by MedPrep Institute or by any of our related
          services. This refund consequence is part of the refund terms and is intended to
          prevent repeated trial or refund abuse.
        </p>
        <p>
          To request a refund, email{' '}
          <a href="mailto:support@medprepinstitute.com">support@medprepinstitute.com</a> from the
          email address associated with your account.
        </p>

        <h2>Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>
            copy, scrape, download, reproduce, distribute, publish, sell, or exploit MedPrep
            Institute content except as allowed by your personal study license;
          </li>
          <li>
            share answers, question banks, explanations, screenshots, or generated content in a
            way that undermines MedPrep Institute&apos;s rights or exam-prep service;
          </li>
          <li>
            reverse engineer, bypass, disable, or interfere with access controls, security, rate
            limits, or payment controls;
          </li>
          <li>use bots, crawlers, automated extraction, credential stuffing, or other abusive automation;</li>
          <li>misrepresent your identity, payment eligibility, or refund eligibility;</li>
          <li>use MedPrep Institute for unlawful, harmful, infringing, or fraudulent purposes.</li>
        </ul>

        <h2>Intellectual property</h2>
        <p>
          MedPrep Institute, including its software, interfaces, questions, explanations,
          generated materials, graphics, study workflows, trademarks, and other content, is owned
          by MedPrep Institute or its licensors and is protected by intellectual property laws.
          Your subscription gives you a limited, personal, non-transferable, revocable license to
          use MedPrep Institute for your own study purposes during your active access period.
        </p>

        <h2>Third-party services and links</h2>
        <p>
          MedPrep Institute may integrate with third-party services such as Stripe, Plausible
          Analytics, Google Analytics, hosting providers, email providers, and other operational
          vendors. Third-party services are governed by their own terms and policies. We are not
          responsible for third-party websites or services that we do not control.
        </p>

        <h2>Accessibility</h2>
        <p>
          We want MedPrep Institute to be usable by as many people as possible and plan to
          continue improving accessibility, including support for increased font size and dark
          mode. If you have trouble accessing MedPrep Institute or need assistance, contact{' '}
          <a href="mailto:support@medprepinstitute.com">support@medprepinstitute.com</a> and
          describe the issue, the device/browser you use, and the page or feature involved.
        </p>

        <h2>DMCA and copyright complaints</h2>
        <p>
          If you believe material on MedPrep Institute infringes your copyright, email{' '}
          <a href="mailto:dmca@medprepinstitute.com">dmca@medprepinstitute.com</a> with enough
          information for us to identify the work, the allegedly infringing material, your
          contact information, a statement that you have a good-faith belief the use is
          unauthorized, a statement under penalty of perjury that your notice is accurate, and
          your physical or electronic signature.
        </p>

        <h2>Service changes and availability</h2>
        <p>
          We may modify, pause, discontinue, or limit parts of MedPrep Institute at any time. We
          work to keep the service reliable, but we do not guarantee uninterrupted or error-free
          access. Some features may depend on third-party services, internet connectivity,
          browser support, or payment status.
        </p>

        <h2>Disclaimers</h2>
        <p>
          MedPrep Institute is provided &quot;as is&quot; and &quot;as available.&quot; To the
          fullest extent permitted by law, we disclaim all warranties, express or implied,
          including warranties of merchantability, fitness for a particular purpose, accuracy,
          non-infringement, availability, and exam outcome. We do not guarantee that using
          MedPrep Institute will result in any particular score, credential, exam pass, or
          professional outcome.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, MedPrep Institute will not be liable for
          indirect, incidental, special, consequential, exemplary, or punitive damages, lost
          profits, lost data, loss of goodwill, or exam-related losses. Our total liability for
          any claim related to MedPrep Institute will not exceed the amount you paid to MedPrep
          Institute for the service during the 3 months before the claim arose.
        </p>

        <h2>Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless MedPrep Institute and its owners, employees,
          contractors, and service providers from claims, damages, liabilities, and expenses
          arising from your use of MedPrep Institute, violation of these Terms, misuse of content,
          or infringement of another person&apos;s rights.
        </p>

        <h2>Termination</h2>
        <p>
          You may stop using MedPrep Institute at any time. We may suspend or terminate your
          access if you violate these Terms, fail to pay, abuse the service, create risk for
          MedPrep Institute or other users, or if we discontinue the service. Sections intended to
          survive termination, including intellectual property, refund consequences, disclaimers,
          limitations of liability, and indemnification, will survive.
        </p>

        <h2>Privacy</h2>
        <p>
          Our <Link href="/privacy-policy">Privacy Policy</Link> explains how we collect and use
          information. By using MedPrep Institute, you agree to the Privacy Policy.
        </p>

        <h2>Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. When we make changes, we will update the
          date above. Continued use of MedPrep Institute after changes become effective means you
          accept the updated Terms.
        </p>

        <h2>Contact</h2>
        <p>
          For support, billing, accessibility, or legal questions, email{' '}
          <a href="mailto:support@medprepinstitute.com">support@medprepinstitute.com</a>. DMCA
          notices should be sent to{' '}
          <a href="mailto:dmca@medprepinstitute.com">dmca@medprepinstitute.com</a>. We handle
          requests by email and do not publish a fax or mailing address for this service.
        </p>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-6">
        <Link href="/" className="text-sm font-medium text-[#06005A] hover:underline">
          &larr; Back to home
        </Link>
      </div>
    </div>
  </div>
);

export default TermsOfServicePage;
