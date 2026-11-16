import Link from "next/link";
import { auth, signOut } from "@/auth";

const Header = async () => {
  const session = await auth();

  return (
    <header className="bg-yellow-400 p-8 flex items-center justify-between text-black rounded-2xl">
      <h1 className="font-bold">Task Management</h1>

      <nav className="flex gap-5 font-semibold items-center">
        <Link href="/profile" className="hover:text-indigo-500">
          Profile
        </Link>

        {!session ? (
          <Link href="/login" className="hover:text-indigo-500">
            Login
          </Link>
        ) : (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </form>
        )}
      </nav>
    </header>
  );
};

export default Header;
