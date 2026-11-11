import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-yellow-400 p-6 flex items-center justify-between text-black rounded-2xl">
      <h1 className="font-bold">Task Management</h1>

      <nav className="flex gap-6 font-semibold hover:text-indigo-500">
        <Link href="/">Tasks</Link>

        <Link href="/profile">Profile</Link>
      </nav>
    </header>
  );
};

export default Header;
