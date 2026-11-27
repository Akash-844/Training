import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const SalesPieChart = () => {
  const salesData = [
    { category: "Electronics", sales: 45000, color: "#3b82f6" },
    { category: "Clothing", sales: 32000, color: "#8b5cf6" },
    { category: "Grocery", sales: 25000, color: "#10b981" },
    { category: "Home & Living", sales: 18000, color: "#f59e0b" },
    { category: "Beauty", sales: 12000, color: "#ec4899" }
  ];

  // Calculate total sales
  const totalSales = salesData.reduce((total, item) => total + item.sales, 0);

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          Sales by Category
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Category-wise sales distribution
        </p>
      </div>

      {/* Donut Chart and Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Donut Chart */}
        <div className="h-64 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={salesData}
                dataKey="sales"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="85%"
                paddingAngle={2}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) / 2;

                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#ffffff"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={11}
                      fontWeight="600"
                    >
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
                labelLine={false}
              >
                {salesData.map((item) => (
                  <Cell key={item.category} fill={item.color} stroke="none" />
                ))}
              </Pie>

              {/* Tooltip */}
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
                itemStyle={{
                  color: "#ffffff"
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Total Sales
            </span>

            <span className="text-xl font-bold text-slate-800 dark:text-white">
              ${totalSales.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="space-y-4">
          {salesData.map((item) => (
            <div
              key={item.category}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                ></div>

                <span className="text-sm text-slate-600 dark:text-slate-400 truncate">
                  {item.category}
                </span>
              </div>

              <span className="text-sm font-semibold text-slate-800 dark:text-white">
                {((item.sales / totalSales) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Total Sales Footer */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Total Categories
          </span>

          <span className="text-sm font-semibold text-slate-800 dark:text-white">
            {salesData.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalesPieChart;
