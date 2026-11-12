// import DisplayCard from "@/components/Card";
import Header from "@/components/Header";
// import Sidebar from "@/components/Sidebar";
import Summary from "@/components/Summary";

export default function Home() {
  return (
    <main className="h-screen bg-gray-200 p-1 flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0 gap-2 mt-2">
        {/* <Sidebar /> */}
        <section className="flex-1 bg-white-200 p-6 rounded-xl overflow-auto">
          <h2 className="text-2xl font-bold text-black">Dashboard</h2>

          <p className="mt-2 text-black">Welcome to Task Management!</p>

          <Summary />
        </section>
      </div>
    </main>
  );
}
