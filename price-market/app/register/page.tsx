"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    try {
      setLoading(true);
      setMessage("");
      setSuccess(false);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          confirmPassword
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message);
        return;
      }

      setSuccess(true);
      setMessage("Registration successful! Please sign in.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-xl sm:p-8">
        <div className="mb-7 flex flex-col items-center">
          <Link href="/" className="mb-5 flex items-center gap-2">
            <Image
              src="/icon.svg"
              alt="PriceMarket Logo"
              width={42}
              height={42}
              priority
              className="h-10 w-10 object-contain"
            />

            <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Price<span className="text-yellow-600">Market</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
            Create Account
          </h1>

          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Join PriceMarket and stay updated with metal prices.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Full Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100"
            />
          </div>

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
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Phone Number
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              autoComplete="tel"
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100"
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
              placeholder="Create a password"
              autoComplete="new-password"
              required
              minLength={8}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              autoComplete="new-password"
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100"
            />
          </div>

          <div>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                name="terms"
                required
                className="mt-1 h-4 w-4 accent-yellow-600"
              />

              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-yellow-700 dark:text-yellow-400 hover:text-yellow-800"
                >
                  Terms and Conditions
                </Link>
              </span>
            </label>
          </div>

          {message && (
            <p
              role="alert"
              className={`text-sm ${
                success ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className="w-full rounded-lg bg-yellow-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-7 border-t border-gray-100 dark:border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-yellow-700 dark:text-yellow-400 hover:text-yellow-800"
            >
              Sign In
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
