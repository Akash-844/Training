type MetalPriceCardProps = {
  name: string;
  symbol: string;
  price: number | null;
  change: number | null;
  unit: string;
};

export default function MetalPriceCard({
  name,
  symbol,
  price,
  change,
  unit
}: MetalPriceCardProps) {
  const isPositive = change !== null && change >= 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-yellow-500 dark:border-slate-700 dark:bg-slate-900">
      {/* Metal Details */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {name}
        </h3>

        <span className="text-xs font-semibold text-gray-400">{symbol}</span>
      </div>

      {/* Metal Price */}
      <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
        {price !== null
          ? `₹${price.toLocaleString("en-IN", {
              maximumFractionDigits: 2
            })}`
          : "Unavailable"}
      </p>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {unit ? `Per ${unit}` : "No price data"}
      </p>

      {/* Price Change */}
      <div className="mt-4 flex items-center gap-2">
        {change !== null ? (
          <>
            <span
              className={`text-sm font-semibold ${
                isPositive ? "text-green-600" : "text-red-500"
              }`}
            >
              {isPositive ? "▲ +" : "▼ "}
              {change}%
            </span>

            <span className="text-xs text-gray-400">Price change</span>
          </>
        ) : (
          <span className="text-xs text-gray-400">
            No previous price available
          </span>
        )}
      </div>
    </div>
  );
}
