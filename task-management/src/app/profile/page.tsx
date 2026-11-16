import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const instant = false;

export default async function Profile() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-black">User Profile</h1>
      </div>
      <div className="mt-5 space-y-3">
        <p className="text-black">
          <strong>Name:</strong>
          {session.user?.name}
        </p>
        <p className="text-black">
          <strong>Email:</strong>
          {session.user?.email}
        </p>
      </div>
    </main>
  );
}
