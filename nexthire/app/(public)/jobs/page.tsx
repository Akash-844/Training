import { Suspense } from "react";

type JobsPageProps = {
  searchParams: Promise<{
    search?: string;
    location?: string;
  }>;
};
export default async function JobsPage({ searchParams }: JobsPageProps) {
  return (
    <Suspense fallback={<p>Loading jobs...</p>}>
      <JobsPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function JobsPageContent({ searchParams }: JobsPageProps) {
  const { search, location } = await searchParams;

  return (
    <div>
      <h1>Available Jobs</h1>
      <p>Search:{search ?? "All jobs"}</p>
      <p>Location:{location ?? "All locations"}</p>
    </div>
  );
}
