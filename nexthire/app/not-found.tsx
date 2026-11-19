import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The Page You Looking for does not exist</p>
      <Link href="/">Go Back To HomePage</Link>
    </div>
  );
};

export default NotFound;
