import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full bg-[#163B32] shadow-md">
      <nav className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-4 md:flex-row">
        <Link
          href="/"
          className="text-3xl font-bold tracking-wide text-[#F7F4EC]"
        >
          Next<span className="text-[#D97757]">Hire</span>
        </Link>

        <ul className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium md:gap-8 md:text-base">
          <li>
            <Link
              href="/jobs"
              className="text-[#D7E8DD] transition-colors hover:text-[#D97757]"
            >
              Find Jobs
            </Link>
          </li>

          <li>
            <Link
              href="/recruiter/dashboard"
              className="text-[#D7E8DD] transition-colors hover:text-[#D97757]"
            >
              Recruiters
            </Link>
          </li>

          <li>
            <Link
              href="/login"
              className="text-[#D7E8DD] transition-colors hover:text-[#D97757]"
            >
              Login
            </Link>
          </li>

          <li>
            <Link
              href="/register"
              className="rounded-lg bg-[#D97757] px-5 py-2.5 text-white transition-colors hover:bg-[#C36548]"
            >
              Get Started
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
