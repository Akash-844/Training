import ChartSection from "./ChartSection";
import StatsGrid from "./StatsGrid";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <StatsGrid />
      <ChartSection />
    </div>
  );
}
