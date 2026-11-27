import { Suspense } from "react";
import { notFound } from "next/navigation";
import MetalHistory from "@/components/metals/MetalHistory";

const metalDetails: Record<string, { name: string; description: string }> = {
  gold: {
    name: "Gold",
    description: "Track gold prices and market movements."
  },
  silver: {
    name: "Silver",
    description: "Explore silver prices and market trends."
  },
  platinum: {
    name: "Platinum",
    description: "Monitor platinum prices and changes."
  },
  copper: {
    name: "Copper",
    description: "Follow copper prices and market updates."
  }
};

type Props = {
  params: Promise<{ metal: string }>;
};

export function generateStaticParams() {
  return [
    { metal: "gold" },
    { metal: "silver" },
    { metal: "platinum" },
    { metal: "copper" }
  ];
}

// This component accesses the dynamic route parameter
async function MetalPageContent({ params }: Props) {
  const { metal } = await params;

  const details = metalDetails[metal];

  if (!details) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold">{details.name}</h1>

      <p className="mt-2 text-gray-600 dark:text-gray-300">{details.description}</p>

      <MetalHistory key={metal} slug={metal} />
    </main>
  );
}

// Main page
export default function MetalPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl px-6 py-10">
          <p>Loading metal page...</p>
        </main>
      }
    >
      <MetalPageContent params={params} />
    </Suspense>
  );
}
