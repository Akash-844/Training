import "dotenv/config";
import { prisma } from "../lib/prisma";

const metals = [
  {
    name: "Gold",
    symbol: "AU",
    slug: "gold",
    sortOrder: 1,
    unit: "10g",
    basePrice: 78500,
    phase: 0
  },
  {
    name: "Silver",
    symbol: "AG",
    slug: "silver",
    sortOrder: 2,
    unit: "1kg",
    basePrice: 92000,
    phase: 1
  },
  {
    name: "Platinum",
    symbol: "PT",
    slug: "platinum",
    sortOrder: 3,
    unit: "10g",
    basePrice: 32500,
    phase: 2
  },
  {
    name: "Copper",
    symbol: "CU",
    slug: "copper",
    sortOrder: 4,
    unit: "1kg",
    basePrice: 850,
    phase: 3
  }
];

function getBenchmarkDate(daysAgo: number): Date {
  const date = new Date();

  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() - daysAgo);

  return date;
}

async function main() {
  let totalRecords = 0;

  for (const metal of metals) {
    // Create or update the metal
    const savedMetal = await prisma.metal.upsert({
      where: {
        slug: metal.slug
      },
      update: {
        name: metal.name,
        symbol: metal.symbol,
        isActive: true,
        sortOrder: metal.sortOrder
      },
      create: {
        name: metal.name,
        symbol: metal.symbol,
        slug: metal.slug,
        sortOrder: metal.sortOrder
      }
    });

    // Generate 30 days of price history
    for (let dayIndex = 0; dayIndex < 30; dayIndex++) {
      const daysAgo = 29 - dayIndex;
      const benchmarkDate = getBenchmarkDate(daysAgo);

      // Generate a small deterministic price variation
      const variation =
        Math.sin(dayIndex * 0.55 + metal.phase) * 0.012 +
        Math.cos(dayIndex * 0.23 + metal.phase) * 0.004;

      const price = metal.basePrice * (1 + variation);

      await prisma.metalPrice.upsert({
        where: {
          metalId_source_benchmark_unit_benchmarkDate: {
            metalId: savedMetal.id,
            source: "DEMO",
            benchmark: "Sample Data",
            unit: metal.unit,
            benchmarkDate
          }
        },
        update: {
          price: price.toFixed(4)
        },
        create: {
          metalId: savedMetal.id,
          price: price.toFixed(4),
          currency: "INR",
          unit: metal.unit,
          source: "DEMO",
          benchmark: "Sample Data",
          benchmarkDate
        }
      });

      totalRecords++;
    }
  }

  console.log("Demo price history seeded successfully!");
  console.log(`Total metals: ${metals.length}`);
  console.log(`Total price records processed: ${totalRecords}`);
}

main()
  .catch((error: unknown) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
