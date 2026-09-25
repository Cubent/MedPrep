import { DashboardOverview } from './components/dashboard-overview';
import { DashboardStatsPreview } from './components/dashboard-stats-preview';

const DashboardOverviewPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) => {
  const { preview } = await searchParams;

  return (
    <div>
      {/* /dashboard?preview=payment-failed forces the payment banner (dev server only). */}
      <DashboardOverview previewPaymentFailed={preview === 'payment-failed'} />
      <DashboardStatsPreview />
    </div>
  );
};

export default DashboardOverviewPage;
