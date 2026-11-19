import Link from "next/link";

export default function RecruiterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Recruiter Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link href="/recruiter/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/recruiter/jobs">My Jobs</Link>
          </li>
          <li>
            <Link href="/recruiter/applicants">Applicants</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
