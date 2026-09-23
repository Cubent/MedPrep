import { auth } from '@clerk/nextjs/server';
import { getSubscription } from '@/lib/subscription';
import { BillingCard } from './components/billing-card';
import { UserProfileSection } from './components/user-profile-section';

const PLAN_LABEL_BY_PRICE_ID: Record<string, string> = {
  ...(process.env.STRIPE_PRICE_ID_MONTHLY && { [process.env.STRIPE_PRICE_ID_MONTHLY]: 'Monthly' }),
  ...(process.env.STRIPE_PRICE_ID_QUARTERLY && {
    [process.env.STRIPE_PRICE_ID_QUARTERLY]: '3-month',
  }),
  ...(process.env.STRIPE_PRICE_ID_YEARLY && { [process.env.STRIPE_PRICE_ID_YEARLY]: 'Yearly' }),
};

const AccountPage = async () => {
  const { userId } = await auth();
  const subscription = userId ? await getSubscription(userId) : null;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
        Dashboard
      </p>
      <h1 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold tracking-tight text-[#06005A] dark:text-white sm:text-4xl">
        Account
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        Manage your profile, security, billing, and connected accounts.
      </p>

      <div className="mt-8">
        <BillingCard
          subscription={
            subscription && {
              status: subscription.status,
              planLabel: PLAN_LABEL_BY_PRICE_ID[subscription.priceId] ?? null,
              trialEnd: subscription.trialEnd?.toISOString() ?? null,
              currentPeriodEnd: subscription.currentPeriodEnd.toISOString(),
              cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
            }
          }
        />
      </div>

      <div className="mt-6">
        <UserProfileSection />
      </div>
    </div>
  );
};

export default AccountPage;
