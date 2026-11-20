import { logoutUser } from "@/app/(public)/logout/actions";

export default function Logout() {
  return (
    <form action={logoutUser}>
      <button
        type="submit"
        className="rounded-md bg-red-600 px-4 py-2 text-white"
      >
        Logout
      </button>
    </form>
  );
}
