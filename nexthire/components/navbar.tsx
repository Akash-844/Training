import Link from "next/link";
import Logout from "./logout-button";
import { auth } from "@/auth";
import { connection } from "next/server";

const Navbar = async () => {
  await connection();

  const session = await auth();
  const role = session?.user?.role;

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
          {role === "JOB_SEEKER" && (
            <>
              <li>
                <Link
                  href="/jobs"
                  className="text-[#D7E8DD] hover:text-[#D97757]"
                >
                  Find Jobs
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="text-[#D7E8DD] hover:text-[#D97757]"
                >
                  My Dashboard
                </Link>
              </li>

              <li>
                <Logout />
              </li>
            </>
          )}

          {role === "RECRUITER" && (
            <>
              <li>
                <Link
                  href="/recruiter/dashboard"
                  className="text-[#D7E8DD] hover:text-[#D97757]"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/recruiter/jobs"
                  className="text-[#D7E8DD] hover:text-[#D97757]"
                >
                  Manage Jobs
                </Link>
              </li>

              <li>
                <Link
                  href="/recruiter/applicants"
                  className="text-[#D7E8DD] hover:text-[#D97757]"
                >
                  Applicants
                </Link>
              </li>

              <li>
                <Logout />
              </li>
            </>
          )}

          {!session?.user && (
            <>
              <li>
                <Link
                  href="/jobs"
                  className="text-[#D7E8DD] hover:text-[#D97757]"
                >
                  Find Jobs
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="text-[#D7E8DD] hover:text-[#D97757]"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="rounded-lg bg-[#D97757] px-5 py-2.5 text-white hover:bg-[#C36548]"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
