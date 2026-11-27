import MetalPriceCard from "./MetalPriceCard";
import { getLatestMetalPrices } from "@/lib/metalPrices";

export default async function MarketSnapshot() {
  const metals = await getLatestMetalPrices();

  return (
    <section className="bg-gray-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-700 dark:text-yellow-400">
            Market Overview
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            Precious Metals Prices
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Explore metal prices and market trends.
          </p>
        </div>

        {/* Metal Price Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metals.map((metal) => (
            <MetalPriceCard
              key={metal.id}
              name={metal.name}
              symbol={metal.symbol}
              price={metal.price}
              change={metal.change}
              unit={metal.unit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
