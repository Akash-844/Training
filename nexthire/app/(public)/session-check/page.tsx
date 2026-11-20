import { auth } from "@/auth";
import { connection } from "next/server";
import { Suspense } from "react";

export async function SessionDetails() {
  await connection();
  const session = await auth();
  if (!session?.user) {
    return <h1>No Active session.Please Log In</h1>;
  }
  return (
    <main className="spcae-y-3 p-8">
      <h1 className="text-2xl font-bold">Session Verified</h1>
      <p>Name:{session.user.name}</p>
      <p>Email:{session.user.email}</p>
      <p>User Id:{session.user.id}</p>
      <p>Role:{session.user.role}</p>
    </main>
  );
}
export default function SessionCheckPage() {
  return (
    <Suspense fallback={<p>Checking session...</p>}>
      <SessionDetails />
    </Suspense>
  );
}
