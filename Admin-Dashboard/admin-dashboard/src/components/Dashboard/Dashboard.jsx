import ChartSection from "./ChartSection";

import StatsGrid from "./StatsGrid";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Status Grid */}
      <StatsGrid />
      <ChartSection />
    </div>
  );
};

export default Dashboard;
