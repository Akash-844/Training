const metals = [
  {
    name: "Gold",
    symbol: "AU",
    unit: "10g",
    price: "₹78,500",
    change: "+1.25%",
    trend: "up"
  },
  {
    name: "Silver",
    symbol: "AG",
    unit: "1kg",
    price: "₹92,000",
    change: "+0.85%",
    trend: "up"
  },
  {
    name: "Platinum",
    symbol: "PT",
    unit: "10g",
    price: "₹32,500",
    change: "-0.35%",
    trend: "down"
  },
  {
    name: "Copper",
    symbol: "CU",
    unit: "1kg",
    price: "₹850",
    change: "+0.65%",
    trend: "up"
  }
];

export default function MarketSnapshot() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-700">
              Market Overview
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Precious Metals Prices
            </h2>
          </div>
        </div>

        {/* Market Ticker */}
        <div className="border-y border-gray-200">
          <div className="grid grid-cols-2 divide-x divide-gray-200 md:grid-cols-4">
            {metals.map((metal) => (
              <div
                key={metal.symbol}
                className="min-w-0 px-4 py-7 transition-colors hover:bg-yellow-50/50 sm:px-6 lg:px-8"
              >
                {/* Metal Name */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">
                    {metal.name}
                  </span>

                  <span className="text-[10px] font-semibold tracking-wider text-gray-400">
                    {metal.symbol}
                  </span>
                </div>

                {/* Price */}
                <p className="mt-4 text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                  {metal.price}
                </p>

                <p className="mt-1 text-xs text-gray-500">Per {metal.unit}</p>

                {/* Daily Change */}
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`text-sm font-bold ${
                      metal.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metal.trend === "up" ? "▲" : "▼"} {metal.change}
                  </span>

                  <span className="text-xs text-gray-400">Today</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
