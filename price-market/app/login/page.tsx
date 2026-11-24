import Link from "next/link";

export default function SigninPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome Back!
          </h1>

          <p className="mt-2 text-center text-sm text-gray-500">
            Sign in to continue to PriceMarket.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
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
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
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
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="rememberMe"
                className="h-4 w-4 cursor-pointer accent-yellow-600"
              />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-yellow-700 transition hover:text-yellow-800"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-yellow-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 active:scale-[0.99]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-7 border-t border-gray-100 pt-6 text-center">
          <p className="text-sm text-gray-600">
            Dont have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-yellow-700 transition hover:text-yellow-800"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs font-medium text-gray-400 transition hover:text-gray-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
