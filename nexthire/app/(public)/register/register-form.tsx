"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registeruser, type RegisterState } from "./actions";

const initialState: RegisterState = {};

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registeruser,
    initialState
  );

  return (
    <main className="flex w-full justify-center bg-[#F7F9FB] px-4 py-14">
      <section className="w-full max-w-140 rounded-[20px] border border-[#DCE4EC] bg-white px-6 py-10 shadow-sm sm:px-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#12213A]">
            NextHire
          </h1>

          <h2 className="mt-7 text-2xl font-semibold text-[#12213A]">
            Create your account
          </h2>

          <p className="mt-3 text-base text-[#63748B]">
            Join NextHire and take the next step in your career.
          </p>
        </div>

        <form action={formAction} className="mt-10 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-base font-medium text-[#12213A]"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className="h-14 w-full rounded-xl border border-[#CBD6E3] bg-white px-5 text-base text-[#12213A] outline-none transition placeholder:text-[#8A9BB3] focus:border-[#E47759] focus:ring-2 focus:ring-[#E47759]/20"
            />
          </div>

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
              className="h-14 w-full rounded-xl border border-[#CBD6E3] bg-white px-5 text-base text-[#12213A] outline-none transition placeholder:text-[#8A9BB3] focus:border-[#E47759] focus:ring-2 focus:ring-[#E47759]/20"
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
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={8}
              required
              className="h-14 w-full rounded-xl border border-[#CBD6E3] bg-white px-5 text-base text-[#12213A] outline-none transition placeholder:text-[#8A9BB3] focus:border-[#E47759] focus:ring-2 focus:ring-[#E47759]/20"
            />

            <p className="mt-2 text-sm text-[#718096]">Minimum 8 characters.</p>
          </div>

          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-base font-medium text-[#12213A]"
            >
              I want to join as
            </label>

            <select
              id="role"
              name="role"
              defaultValue="JOB_SEEKER"
              required
              className="h-14 w-full rounded-xl border border-[#CBD6E3] bg-white px-5 text-base text-[#12213A] outline-none transition focus:border-[#E47759] focus:ring-2 focus:ring-[#E47759]/20"
            >
              <option value="JOB_SEEKER">Job Seeker</option>
              <option value="RECRUITER">Recruiter</option>
            </select>
          </div>

          {state.error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {state.error}
            </p>
          )}

          {state.success && (
            <p
              role="status"
              className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              {state.success}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="h-14 w-full rounded-xl bg-[#E47759] px-5 text-base font-semibold text-white transition hover:bg-[#D9684B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Creating Account..." : "Get Started"}
          </button>
        </form>

        <p className="mt-7 text-center text-base text-[#63748B]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#E47759] hover:text-[#D9684B]"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}
