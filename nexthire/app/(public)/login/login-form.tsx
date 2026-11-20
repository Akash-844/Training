"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginUser } from "./actions";

export default function LoginForm() {
  const [error, formAction, pending] = useActionState(loginUser, undefined);

  return (
    <main className="flex min-h-[calc(100vh-130px)] items-center justify-center bg-[#F7F9FB] px-4 py-14">
      <section className="w-full max-w-[500px] rounded-[20px] border border-[#DCE4EC] bg-white px-6 py-10 shadow-sm sm:px-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#12213A]">NextHire</h1>

          <h2 className="mt-7 text-2xl font-semibold text-[#12213A]">
            Welcome Back!
          </h2>

          <p className="mt-3 text-base text-[#63748B]">
            Login to continue your journey with NextHire.
          </p>
        </div>

        <form action={formAction} className="mt-10 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-base font-medium text-[#12213A]"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="h-14 w-full rounded-xl border border-[#CBD6E3] px-5 text-base outline-none transition placeholder:text-[#8A9BB3] focus:border-[#E47759] focus:ring-2 focus:ring-[#E47759]/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-base font-medium text-[#12213A]"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="h-14 w-full rounded-xl border border-[#CBD6E3] px-5 text-base outline-none transition placeholder:text-[#8A9BB3] focus:border-[#E47759] focus:ring-2 focus:ring-[#E47759]/20"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="h-14 w-full rounded-xl bg-[#E47759] text-base font-semibold text-white transition hover:bg-[#D9684B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-7 text-center text-base text-[#63748B]">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#E47759] hover:text-[#D9684B]"
          >
            Create Account
          </Link>
        </p>
      </section>
    </main>
  );
}
