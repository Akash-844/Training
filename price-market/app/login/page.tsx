"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-xl sm:p-8">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
            Welcome Back!
          </h1>

          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Sign in to continue to PriceMarket.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100"
            />
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-yellow-700 dark:text-yellow-400 hover:text-yellow-800"
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-yellow-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-7 border-t border-gray-100 dark:border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-yellow-700 dark:text-yellow-400">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs font-medium text-gray-400 hover:text-gray-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
