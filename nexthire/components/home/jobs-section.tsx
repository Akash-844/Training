import Link from "next/link";

const jobs = [
  {
    id: 101,
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Hyderabad",
    salary: "₹4 - 6 LPA",
    type: "Full Time",
    experience: "1-2 Years"
  },
  {
    id: 102,
    title: "Backend Developer",
    company: "Innovate Technologies",
    location: "Bangalore",
    salary: "₹5 - 8 LPA",
    type: "Full Time",
    experience: "2-3 Years"
  },
  {
    id: 103,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Remote",
    salary: "₹3 - 5 LPA",
    type: "Remote",
    experience: "Fresher"
  }
];

export default function FeaturedJobs() {
  return (
    <section className="bg-[#F7F4EC] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-[#163B32] md:text-4xl">
            Featured Jobs
          </h2>

          <p className="text-[#64746C]">
            Explore exciting opportunities from top companies.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-[#D7E8DD] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5">
                <h3 className="mb-2 text-xl font-bold text-[#252D29]">
                  {job.title}
                </h3>

                <p className="font-medium text-[#47765F]">{job.company}</p>
              </div>

              <div className="mb-5 space-y-2 text-sm text-[#64746C]">
                <p>📍 {job.location}</p>
                <p>💰 {job.salary}</p>
                <p>💼 {job.type}</p>
                <p>Experience: {job.experience}</p>
              </div>

              <Link
                href={`/jobs/${job.id}`}
                className="block rounded-lg bg-[#163B32] px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-[#315D4C]"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/jobs"
            className="font-semibold text-[#47765F] transition-colors hover:text-[#D97757]"
          >
            View All Jobs →
          </Link>
        </div>
      </div>
    </section>
  );
}
