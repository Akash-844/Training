import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <div className="text-white font-bold text-4xl">
        <h1>NextHire</h1>
      </div>
      <nav className="bg-blend-darken p-4 content-around gap-4">
        <ul className="align-middle">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/jobs">Jobs</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
