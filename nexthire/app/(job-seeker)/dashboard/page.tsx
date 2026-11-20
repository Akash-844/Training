import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

async function DashBoardContent() {
  await connection();

  const session = await auth();
  console.log("REFRESH AUTH CHECK:", {
    authenticated: Boolean(session?.user),
    userId: session?.user?.id,
    role: session?.user?.role,
    expires: session?.expires
  });

  if (!session?.user) {
    redirect("/login");
  }
  if (session?.user.role !== "JOB_SEEKER") {
    redirect("/jobs");
  }
  return (
    <main>
      <h1>Job Seeker Dashboard</h1>
      <p>Welcome,{session?.user.name}</p>
    </main>
  );
}

const JobSeekerDashboard = () => {
  return (
    <Suspense fallback={<p>Loading dashboard...</p>}>
      <DashBoardContent />
    </Suspense>
  );
};

export default JobSeekerDashboard;
