import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../components/site-header';

export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy',
  description: 'How MedPrep Institute collects, uses, and protects your information.',
  noSuffix: true,
});

const PrivacyPolicyPage = () => (
  <div className="min-h-screen bg-white">
    <SiteHeader />

    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
        Legal
      </p>
      <h1 className="font-[family-name:var(--font-display)] mt-3 text-4xl font-bold tracking-tight text-black sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-gray-500">Last updated September 15, 2026</p>

      <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-[family-name:var(--font-display)] prose-headings:text-black prose-h2:mt-10 prose-h2:text-2xl prose-p:leading-relaxed prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-[#06005A]">
        <p>
          MedPrep Institute (&quot;MedPrep Institute,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
          respects your privacy. This Privacy Policy explains what information we collect, how we
          use it, and the choices you have when you use medprepinstitute.com and related MedPrep
          Institute services.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Account information:</strong> your name and email address.
          </li>
          <li>
            <strong>Usage data:</strong> activity needed to operate the app, such as selected
            exams or topics, quiz activity, answers, review history, progress, and related
            product interactions.
          </li>
          <li>
            <strong>Checkout data:</strong> Stripe checkout session identifiers and related
            billing status needed to start, manage, or verify subscriptions. We do not store full
            credit card numbers.
          </li>
          <li>
            <strong>Analytics data:</strong> website and product interaction information collected
            through Plausible Analytics and Google Analytics. This may include pages visited,
            events, approximate location, device/browser information, and referral source
            depending on your browser settings and the analytics provider.
          </li>
        </ul>

        <h2>How we use information</h2>
        <ul>
          <li>To create and maintain your account.</li>
          <li>
            To provide question bank functionality, progress tracking, review, and personalized
            study features.
          </li>
          <li>
            To process subscriptions, free trials, checkout sessions, cancellations, and
            refund-related account actions through Stripe.
          </li>
          <li>To respond to support requests and service notices.</li>
          <li>
            To monitor reliability, diagnose errors, prevent abuse, and improve MedPrep Institute.
          </li>
          <li>To understand site usage through Plausible Analytics and Google Analytics.</li>
          <li>To support future advertising or retargeting through Google, if enabled.</li>
          <li>To comply with legal obligations and enforce our Terms of Service.</li>
        </ul>

        <h2>Payments and Stripe</h2>
        <p>
          Payments are processed by Stripe. Stripe may collect and process payment details,
          billing information, fraud-prevention signals, and transaction records under
          Stripe&apos;s own terms and privacy policy. MedPrep Institute receives information
          needed to confirm checkout, subscription status, and payment events, including checkout
          session IDs, but does not store your full card number.
        </p>

        <h2>Cookies, analytics, and advertising</h2>
        <p>
          MedPrep Institute may use cookies, local storage, pixels, and similar technologies for
          login sessions, checkout, security, analytics, and product functionality. We use
          Plausible Analytics and Google Analytics. Plausible is designed to be privacy-focused
          and GDPR-compliant. Google Analytics helps us understand usage and may use cookies or
          similar identifiers. We may use Google retargeting or advertising features in the
          future.
        </p>
        <p>
          You can control cookies through your browser settings. Blocking some cookies or storage
          may affect account login, checkout, or app functionality.
        </p>

        <h2>How information is shared</h2>
        <p>
          We do not sell your personal information. We share information only as needed with
          service providers that help us operate MedPrep Institute, including hosting, analytics,
          email, security, and Stripe payment processing. We may also disclose information if
          required by law, to protect rights and safety, to prevent abuse, or as part of a
          business transfer such as a merger, acquisition, or sale of assets.
        </p>

        <h2>Data retention and deletion</h2>
        <p>
          We keep account and usage information for as long as needed to provide MedPrep
          Institute, comply with legal obligations, resolve disputes, and enforce agreements. If a
          refund is issued under our Terms of Service, the refunded account and associated study
          history will be deleted, and the refunded card will not be accepted again by MedPrep
          Institute or our related services.
        </p>

        <h2>Your privacy choices</h2>
        <p>
          Depending on where you live, you may have rights to access, correct, delete, restrict,
          or object to certain processing of your personal information. You may also have rights
          related to data portability or withdrawing consent. To make a privacy request, contact
          us at{' '}
          <a href="mailto:support@medprepinstitute.com">support@medprepinstitute.com</a>.
        </p>

        <h2>California and European privacy rights</h2>
        <p>
          We do not sell personal information as that term is commonly used in privacy laws. If
          you are in California, the European Economic Area, the United Kingdom, or another
          jurisdiction with privacy rights, you may contact us to exercise applicable rights. We
          will respond as required by applicable law.
        </p>

        <h2>Security</h2>
        <p>
          We use reasonable administrative, technical, and organizational safeguards designed to
          protect information. No internet service is completely secure, so we cannot guarantee
          absolute security.
        </p>

        <h2>Children</h2>
        <p>
          MedPrep Institute is not intended for children under 13, and we do not knowingly collect
          personal information from children under 13.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we make changes, we will
          update the date above. Continued use of MedPrep Institute after changes become effective
          means you accept the updated policy.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy or support questions, email{' '}
          <a href="mailto:support@medprepinstitute.com">support@medprepinstitute.com</a>.
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

export default PrivacyPolicyPage;
