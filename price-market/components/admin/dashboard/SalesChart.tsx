"use client";

import { useEffect, useState } from "react";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type Metal = {
  name: string;
  slug: string;
};

type ChartData = {
  metal: string;
  records: number;
  color: string;
};

type MetalsResponse = {
  success: boolean;
  data: Metal[];
};

type HistoryResponse = {
  success: boolean;
  pagination: {
    total: number;
  };
};

const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

export default function SalesChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMetalRecords() {
      try {
        // Get all metals
        const response = await fetch("/api/metals");
        const result: MetalsResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error("Failed to fetch metals.");
        }

        // Get history count for each metal
        const data = await Promise.all(
          result.data.map(async (metal, index) => {
            const historyResponse = await fetch(
              `/api/metals/${metal.slug}/history?limit=1&offset=0`
            );

            const historyResult: HistoryResponse = await historyResponse.json();

            if (!historyResponse.ok || !historyResult.success) {
              throw new Error(`Failed to fetch ${metal.name} history.`);
            }

            return {
              metal: metal.name,
              records: historyResult.pagination.total,
              color: colors[index % colors.length]
            };
          })
        );

        setChartData(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchMetalRecords();
  }, []);

  const totalRecords = chartData.reduce(
    (total, item) => total + item.records,
    0
  );

  return (
    <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          Price Records by Metal
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Distribution of stored price history
        </p>
      </div>

      {loading ? (
        <p className="py-20 text-center text-slate-500">Loading chart...</p>
      ) : error ? (
        <p className="py-20 text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* Donut Chart and Legend */}
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
            {/* Donut Chart */}
            <div className="relative h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="records"
                    nameKey="metal"
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="85%"
                    paddingAngle={2}
                  >
                    {chartData.map((item) => (
                      <Cell key={item.metal} fill={item.color} stroke="none" />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) => [
                      `${value ?? 0} records`,
                      "Price History"
                    ]}
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      color: "#ffffff"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Content */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Total Records
                </span>

                <span className="text-2xl font-bold text-slate-800 dark:text-white">
                  {totalRecords}
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-4">
              {chartData.map((item) => (
                <div
                  key={item.metal}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />

                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {item.metal}
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-slate-800 dark:text-white">
                    {item.records}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Total Metals
            </span>

            <span className="text-sm font-semibold text-slate-800 dark:text-white">
              {chartData.length}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
