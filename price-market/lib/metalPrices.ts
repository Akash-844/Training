import "server-only";
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

export async function getLatestMetalPrices() {
  "use cache";

  cacheLife({
    stale: 30,
    revalidate: 60,
    expire: 3600
  });

  cacheTag("metal-prices");

  // Fetch active metals and their latest prices
  const metals = await prisma.metal.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      sortOrder: "asc"
    },
    include: {
      prices: {
        orderBy: {
          benchmarkDate: "desc"
        },
        take: 2
      }
    }
  });

  // Format metal prices
  return metals.map((metal) => {
    const latestPrice = metal.prices[0];
    const previousPrice = metal.prices[1];

    const price = latestPrice ? Number(latestPrice.price) : null;

    const previous = previousPrice ? Number(previousPrice.price) : null;

    const change =
      price !== null && previous !== null && previous > 0
        ? ((price - previous) / previous) * 100
        : null;

    return {
      id: metal.id,
      name: metal.name,
      symbol: metal.symbol,
      slug: metal.slug,
      price,
      unit: latestPrice?.unit ?? "",
      change: change !== null ? Number(change.toFixed(2)) : null
    };
  });
}
