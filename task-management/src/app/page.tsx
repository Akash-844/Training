import DisplayCard from "@/components/Card";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="h-screen bg-gray-200 p-1 flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0 gap-2 mt-2">
        <Sidebar />
        <section className="flex-1 bg-white-200 p-6 rounded-xl ">
          <h2 className="text-2xl font-bold text-black">Dashboard</h2>

          <p className="mt-2 text-black">Welcome to Task Management!</p>
          <div className="flex flex-row gap-5">
            <DisplayCard title="Total Tasks" count={15} />
            <DisplayCard title="Completed Tasks" count={10} />
            <DisplayCard title="Pending Tasks" count={5} />
          </div>
        </section>
      </div>
    </main>
  );
}
