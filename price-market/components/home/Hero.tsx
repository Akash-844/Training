export default function Hero() {
  return (
    <section className="bg-gray-900 px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow-500">
          India&apos;s Precious Metals Market
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Track Gold, Silver & Other Metal Prices
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
          Stay updated with precious metal prices, daily market movements and
          historical price trends across India.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="rounded-lg bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-700">
            Explore Gold Rates
          </button>

          <button className="rounded-lg border border-gray-500 px-6 py-3 font-semibold text-white hover:bg-gray-800">
            View All Metals
          </button>
        </div>
      </div>
    </section>
  );
}
