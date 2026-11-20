"use client";

import { useState, type FormEvent } from "react";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string | null;
};

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const params = new URLSearchParams({
        search: search.trim(),
        location: location.trim()
      });

      const response = await fetch(`/api/jobs?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();

      setJobs(data.jobs);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-linear-to-r from-[#163B32] to-[#315D4C] px-6 py-24 text-[#F7F4EC]">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-6xl">
          Find Your <span className="text-[#D97757]">Dream Job</span>
          <br />
          Build Your Future
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-[#D7E8DD]">
          Discover thousands of job opportunities and connect with companies
          that match your skills and ambitions.
        </p>

        <form
          onSubmit={handleSearch}
          className="mx-auto flex max-w-4xl flex-col gap-4 rounded-xl bg-[#F7F4EC] p-4 shadow-lg md:flex-row"
        >
          <input
            type="text"
            placeholder="Job title or keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-[#D7E8DD] bg-white px-4 py-3 text-[#252D29] outline-none focus:border-[#47765F]"
          />

          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-[#D7E8DD] bg-white px-4 py-3 text-[#252D29] outline-none focus:border-[#47765F]"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#D97757] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#C36548] disabled:opacity-60"
          >
            {loading ? "Searching..." : "Search Jobs"}
          </button>
        </form>

        <p className="mt-6 text-sm text-[#D7E8DD]">
          Popular searches: React Developer, Node.js Developer, UI/UX Designer
        </p>

        {error && <p className="mt-6 text-red-200">{error}</p>}

        {hasSearched && !loading && (
          <div className="mt-12 text-left">
            <h2 className="mb-5 text-2xl font-bold">
              Search Results ({jobs.length})
            </h2>

            {jobs.length === 0 ? (
              <p>No jobs found.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-xl bg-white p-5 text-[#252D29]"
                  >
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <p>{job.company}</p>
                    <p className="text-sm text-gray-500">{job.location}</p>
                    {job.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {job.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
