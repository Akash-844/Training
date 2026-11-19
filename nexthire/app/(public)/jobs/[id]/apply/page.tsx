import { Suspense } from "react";

type ApplyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApplyPage({ params }: ApplyPageProps) {
  return (
    <Suspense fallback={<p>Loading application page...</p>}>
      <ApplyPageContent params={params} />
    </Suspense>
  );
}

async function ApplyPageContent({ params }: ApplyPageProps) {
  const { id } = await params;

  return <p>Apply for job {id}</p>;
}
