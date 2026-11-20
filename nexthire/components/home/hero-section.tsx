export default function HeroSection() {
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
          action="/jobs"
          method="GET"
          className="mx-auto flex max-w-4xl flex-col gap-4 rounded-xl bg-[#F7F4EC] p-4 shadow-lg md:flex-row"
        >
          <input
            type="text"
            name="search"
            placeholder="Job title or keyword"
            className="min-w-0 flex-1 rounded-lg border border-[#D7E8DD] bg-white px-4 py-3 text-[#252D29] outline-none focus:border-[#47765F]"
          />

          <input
            type="text"
            name="location"
            placeholder="Enter location"
            className="min-w-0 flex-1 rounded-lg border border-[#D7E8DD] bg-white px-4 py-3 text-[#252D29] outline-none focus:border-[#47765F]"
          />

          <button
            type="submit"
            className="rounded-lg bg-[#D97757] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#C36548]"
          >
            Search Jobs
          </button>
        </form>

        <p className="mt-6 text-sm text-[#D7E8DD]">
          Popular searches: React Developer, Node.js Developer, UI/UX Designer
        </p>
      </div>
    </section>
  );
}
