import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

const SignUpPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16">
    <Link href="/" className="mb-8 flex items-center gap-3">
      <img
        src="/animateos-logo (1).png"
        alt="MedPrep Institute Logo"
        className="h-8 w-8 rounded-lg object-cover"
      />
      <span className="text-xl font-medium text-[#06005A]">MedPrep Institute</span>
    </Link>
    <SignUp signInUrl="/sign-in" forceRedirectUrl="/onboarding/trial" />
  </div>
);

export default SignUpPage;
