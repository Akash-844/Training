import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Header from "@/components/Header";
import Summary from "@/components/Summary";

export const instant = false;

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="h-screen bg-gray-200 p-1 flex flex-col">
      <Header />

      <div className="flex flex-1 min-h-0 gap-2 mt-2">
        <section className="flex-1 bg-white p-6 rounded-xl overflow-auto">
          <h2 className="text-2xl font-bold text-black">Dashboard</h2>

          <p className="mt-2 text-black">Welcome to Task Management!</p>

          <Summary />
        </section>
      </div>
    </main>
  );
}
