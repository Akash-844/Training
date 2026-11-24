import { notFound } from "next/navigation";

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

export function generateStaticParams() {
  return [
    { metal: "gold" },
    { metal: "silver" },
    { metal: "platinum" },
    { metal: "copper" }
  ];
}
type Props = {
  params: Promise<{ metal: string }>;
};
export default async function MetalPage({ params }: Props) {
  const { metal } = await params;

  const details = metalDetails[metal];

  if (!details) {
    notFound();
  }

  return (
    <main>
      <h1>{details.name}</h1>
      <p>{details.description}</p>
    </main>
  );
}
