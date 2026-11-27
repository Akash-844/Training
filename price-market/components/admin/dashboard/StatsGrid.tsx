import type { LucideIcon } from "lucide-react";

import { Gem, Database, CalendarDays, FlaskConical } from "lucide-react";

type Stat = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
};

const stats: Stat[] = [
  {
    title: "Total Metals",
    value: "4",
    description: "Gold, Silver, Platinum, Copper",
    icon: Gem,
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    textColor: "text-blue-600 dark:text-blue-400"
  },
  {
    title: "Price Records",
    value: "120",
    description: "Sample records in database",
    icon: Database,
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    textColor: "text-emerald-600 dark:text-emerald-400"
  },
  {
    title: "History Coverage",
    value: "30 Days",
    description: "Price history for each metal",
    icon: CalendarDays,
    bgColor: "bg-purple-50 dark:bg-purple-500/10",
    textColor: "text-purple-600 dark:text-purple-400"
  },
  {
    title: "Data Environment",
    value: "Demo",
    description: "Illustrative sample prices",
    icon: FlaskConical,
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
    textColor: "text-amber-600 dark:text-amber-400"
  }
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group rounded-2xl border border-slate-200/50 bg-white/80 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-900/80"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.title}
                </p>

                <h2 className="mb-3 text-3xl font-bold text-slate-800 dark:text-white">
                  {stat.value}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {stat.description}
                </p>
              </div>

              <div
                className={`rounded-xl p-3 transition-transform duration-200 group-hover:scale-110 ${stat.bgColor}`}
              >
                <Icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
