import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-yellow-400 p-8 flex items-center justify-between text-black rounded-2xl">
      <h1 className="font-bold">Task Management</h1>

      <nav className="flex gap-5 font-semibold ">
        <Link href="/" className=" hover:text-indigo-500">
          Tasks
        </Link>

        <Link href="/profile" className=" hover:text-indigo-500">
          Profile
        </Link>
      </nav>
    </header>
  );
};

export default Header;
