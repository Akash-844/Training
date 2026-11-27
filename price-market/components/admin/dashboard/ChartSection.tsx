import RevenueChart from "./RevenueChart";
import SalesChart from "./SalesChart";

export default function ChartSection() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      {/* Main Chart */}
      <div className="xl:col-span-2">
        <RevenueChart />
      </div>

      {/* Secondary Chart */}
      <div className="space-y-6">
        <SalesChart />
      </div>
    </div>
  );
}
