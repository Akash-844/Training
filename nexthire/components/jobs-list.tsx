"use client";

import { useEffect, useState } from "react";

type Job = {
  id: string;
  title: string;
};

export default function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/jobs");

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data: Job[] = await response.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h1>Available Jobs</h1>

      {jobs.map((job) => (
        <p key={job.id}>{job.title}</p>
      ))}
    </div>
  );
}
