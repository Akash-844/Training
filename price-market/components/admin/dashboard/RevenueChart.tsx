"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type ChartData = {
  date: string;
  gold: number | null;
  platinum: number | null;
};

type HistoryRecord = {
  price: string;
  benchmarkDate: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: {
    history: HistoryRecord[];
  };
};

export default function RevenueChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch metal price history
  useEffect(() => {
    async function fetchPriceHistory() {
      try {
        const [goldResponse, platinumResponse] = await Promise.all([
          fetch("/api/metals/gold/history?limit=10&offset=0"),
          fetch("/api/metals/platinum/history?limit=10&offset=0")
        ]);

        const goldResult: ApiResponse = await goldResponse.json();
        const platinumResult: ApiResponse = await platinumResponse.json();

        if (
          !goldResponse.ok ||
          !platinumResponse.ok ||
          !goldResult.success ||
          !platinumResult.success
        ) {
          throw new Error("Failed to fetch metal prices.");
        }

        const goldHistory = goldResult.data.history;
        const platinumHistory = platinumResult.data.history;

        // Combine metal prices by date
        const formattedData = goldHistory
          .slice()
          .reverse()
          .map((record) => {
            const platinumRecord = platinumHistory.find(
              (item) => item.benchmarkDate === record.benchmarkDate
            );

            return {
              date: new Date(record.benchmarkDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                timeZone: "UTC"
              }),

              gold: Number(record.price),

              platinum: platinumRecord ? Number(platinumRecord.price) : null
            };
          });

        setChartData(formattedData);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPriceHistory();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80">
      {/* Chart Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Metal Price Trend
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Daily metal price comparison
          </p>
        </div>

        {/* Chart Legend */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-500" />

            <span className="text-sm text-slate-500 dark:text-slate-400">
              Gold
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-slate-500" />

            <span className="text-sm text-slate-500 dark:text-slate-400">
              Platinum
            </span>
          </div>
        </div>
      </div>

      {/* Chart Content */}
      {loading ? (
        <p className="py-20 text-center text-slate-500">Loading chart...</p>
      ) : error ? (
        <p className="py-20 text-center text-red-500">{error}</p>
      ) : chartData.length === 0 ? (
        <p className="py-20 text-center text-slate-500">
          No price history available.
        </p>
      ) : (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={6} barCategoryGap="25%">
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#94a3b8"
                strokeOpacity={0.2}
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12
                }}
                tickFormatter={(value) => `₹${Number(value) / 1000}k`}
              />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString("en-IN")}`
                }
                cursor={{
                  fill: "#94a3b8",
                  opacity: 0.1
                }}
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

              {/* Gold Price Bars */}
              <Bar
                dataKey="gold"
                name="Gold"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                maxBarSize={22}
              />

              {/* Platinum Price Bars */}
              <Bar
                dataKey="platinum"
                name="Platinum"
                fill="#64748b"
                radius={[6, 6, 0, 0]}
                maxBarSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <p className="mt-3 text-xs text-slate-400">
        Illustrative sample prices — not live market rates.
      </p>
    </div>
  );
}
