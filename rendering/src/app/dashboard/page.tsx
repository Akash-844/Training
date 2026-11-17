import { Suspense } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}

async function UserDetails() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    cache: "no-store"
  });
  if (!response.ok) {
    throw new Error("Failed To Fetch Users");
  }
  const data: User = await response.json();
  return (
    <div>
      <h2>Name: {data.name}</h2>
      <h2>UserName: {data.username}</h2>
      <h2>Email: {data.email}</h2>
      <h2>Website: {data.website}</h2>
    </div>
  );
}
export default function DashboardPage() {
  return (
    <main>
      <h1>Dashboard</h1>

      <Suspense fallback={<p>Loading user details...</p>}>
        <UserDetails />
      </Suspense>
    </main>
  );
}
