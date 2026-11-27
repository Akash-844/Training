import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import MarketSnapshot from "@/components/home/MarketSnapshot";

import MetalPriceCards from "@/components/home/MetalPriceCards";

export default function Home() {
  return (
    <main>
      <Hero />

      <Suspense
        fallback={
          <div className="py-12 text-center text-gray-500">
            Loading metal prices...
          </div>
        }
      >
        <MarketSnapshot />
        <MetalPriceCards />
      </Suspense>
    </main>
  );
}
