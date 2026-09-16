import { DashboardOverview } from './components/dashboard-overview';
import { DashboardStatsPreview } from './components/dashboard-stats-preview';

const DashboardOverviewPage = async () => (
  <div>
    <DashboardOverview />
    <DashboardStatsPreview />
  </div>
);

export default DashboardOverviewPage;
