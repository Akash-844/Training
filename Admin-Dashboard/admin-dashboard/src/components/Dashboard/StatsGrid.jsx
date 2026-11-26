import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  DollarSignIcon,
  ShoppingCart,
  Users2
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$124,563",
    change: "+12.5%",
    trend: "up",
    icon: DollarSignIcon,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    textColor: "text-emerald-600 dark:text-emerald-400",
    progress: 85
  },
  {
    title: "Total Users",
    value: "8,549",
    change: "+8.2%",
    trend: "up",
    icon: Users2,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    textColor: "text-blue-600 dark:text-blue-400",
    progress: 75
  },
  {
    title: "Total Orders",
    value: "2,456",
    change: "+15.3%",
    trend: "up",
    icon: ShoppingCart,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50 dark:bg-purple-500/10",
    textColor: "text-purple-600 dark:text-purple-400",
    progress: 90
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "-2.1%",
    trend: "down",
    icon: Activity,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
    textColor: "text-amber-600 dark:text-amber-400",
    progress: 45
  }
];
const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stats, index) => {
        return (
          <div
            className="p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-200/20 transition-all duration-300 group"
            key={index}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 pt-2 pl-2">
                  {stats.title}
                </p>
                <p className="text-3xl font-bold text-slate-800 dark:text-white mb-4 pl-2">
                  {stats.value}
                </p>
                <div className="flex items-center space-x-2 pb-2 pl-2">
                  {stats.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-semibold ${stats.trend === "up" ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {stats.change}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    vs Last Month
                  </span>
                </div>
              </div>
              <div
                className={`shrink-0 p-3 rounded-xl group-hover:scale-110 transition-all duration-200 ${stats.bgColor}`}
              >
                {<stats.icon className={`w-6 h-6 ${stats.textColor}`} />}
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-5 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-linear-to-r ${stats.color} rounded-full transition-all duration-300`}
                style={{ width: `${stats.progress}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
