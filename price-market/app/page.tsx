import Hero from "@/components/home/Hero";
import MarketSnapshot from "@/components/home/MarketSnapshot";
import MetalPriceCards from "@/components/home/MetalPriceCards";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarketSnapshot />
      <MetalPriceCards />
    </main>
  );
}
