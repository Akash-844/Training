import { Suspense } from "react";
import { connection } from "next/server";
import { getCachedJobs } from "@/lib/jobs";

type JobsPageProps = {
  searchParams: Promise<{
    search?: string;
    location?: string;
  }>;
};

export default function JobsPage({ searchParams }: JobsPageProps) {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-gray-500">Loading jobs...</div>
      }
    >
      <JobsList searchParams={searchParams} />
    </Suspense>
  );
}

async function JobsList({ searchParams }: JobsPageProps) {
  const { search = "", location = "" } = await searchParams;

  await connection();

  const jobs = await getCachedJobs(search, location);

  return (
    <main className="min-h-screen bg-[#F7F9FB] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#163B32]">Available Jobs</h1>

          <p className="mt-3 text-gray-500">
            Find the right opportunity for your career.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-gray-700">
            <span className="font-semibold">Search:</span>{" "}
            {search || "All jobs"}
          </p>

          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Location:</span>{" "}
            {location || "All locations"}
          </p>

          <p className="mt-3 text-sm text-gray-500">{jobs.length} jobs found</p>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No jobs found
            </h2>

            <p className="mt-2 text-gray-500">
              Try searching with another job title or location.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h2 className="text-xl font-bold text-[#163B32]">
                  {job.title}
                </h2>

                <p className="mt-2 font-medium text-[#D97757]">{job.company}</p>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <span>📍</span>
                  <span>{job.location}</span>
                </div>

                {job.description && (
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {job.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
