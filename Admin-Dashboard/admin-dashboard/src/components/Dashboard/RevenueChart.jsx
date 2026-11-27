import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const RevenueChart = () => {
  const chartData = [
    { month: "Jan", revenue: 45000, expenses: 32000 },
    { month: "Feb", revenue: 52000, expenses: 35000 },
    { month: "Mar", revenue: 48000, expenses: 33000 },
    { month: "Apr", revenue: 61000, expenses: 40000 },
    { month: "May", revenue: 55000, expenses: 38000 },
    { month: "Jun", revenue: 67000, expenses: 42000 },
    { month: "Jul", revenue: 72000, expenses: 46000 },
    { month: "Aug", revenue: 65000, expenses: 43000 },
    { month: "Sep", revenue: 78000, expenses: 49000 },
    { month: "Oct", revenue: 85000, expenses: 52000 }
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Revenue Chart
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly revenue and expenses
          </p>
        </div>

        {/* Chart Legend */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Revenue
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Expenses
            </span>
          </div>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 0
            }}
            barGap={6}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#94a3b8"
              strokeOpacity={0.2}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickMargin={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <Tooltip
              formatter={(value, name) => [
                `$${Number(value).toLocaleString()}`,
                name
              ]}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#ffffff"
              }}
            />

            <Bar
              dataKey="revenue"
              name="Revenue"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
              maxBarSize={25}
            />

            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#64748b"
              radius={[6, 6, 0, 0]}
              maxBarSize={25}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
