import { Suspense } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import { connection } from "next/server";

async function AdminDashboardContent() {
  await connection();
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return <AdminLayout />;
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading dashboard...</p>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
