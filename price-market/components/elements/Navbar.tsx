"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import { refreshTokens } from "../auth/refreshTokens";

type User = {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Gold Rates", href: "/gold-rates/hyderabad" },
  { name: "Metals", href: "/metals/gold" },
  { name: "About", href: "/about" }
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const isAdminPage = pathname.startsWith("/admin");

  // Change application theme
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  // Check active navigation link
  function isActiveLink(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    if (href === "/metals/gold") {
      return pathname.startsWith("/metals");
    }

    return pathname === href;
  }

  // Get logged-in user
  useEffect(() => {
    let active = true;

    async function fetchUser() {
      try {
        let response = await fetch("/api/auth/me", {
          credentials: "same-origin",
          cache: "no-store"
        });

        if (response.status === 401 && active) {
          const refreshed = await refreshTokens();

          if (refreshed.ok) {
            response = await fetch("/api/auth/me", {
              cache: "no-store"
            });
          }
        }

        if (!response.ok) {
          if (active) setUser(null);
          return;
        }

        const result = await response.json();

        if (active) {
          setUser(result.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);

        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchUser();

    return () => {
      active = false;
    };
  }, [pathname]);

  // Logout user
  async function handleLogout() {
    try {
      setLoggingOut(true);
      setError("");

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin"
      });

      if (!response.ok) {
        throw new Error("Logout failed.");
      }

      setUser(null);
      setIsMenuOpen(false);

      router.replace("/login");
      router.refresh();
    } catch {
      setError("Unable to logout. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <nav className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-6 px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/icon.svg"
            alt="PriceMarket Logo"
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />

          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Price
            <span className="text-yellow-700 dark:text-yellow-400">Market</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 items-center justify-center gap-8 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`whitespace-nowrap text-sm font-semibold transition-colors ${
                isActiveLink(link.href)
                  ? "text-yellow-700 dark:text-yellow-400"
                  : "text-slate-600 hover:text-yellow-700 dark:text-slate-300 dark:hover:text-yellow-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-4">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Change theme"
            className="cursor-pointer rounded-lg border border-slate-200 p-2.5 text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
          >
            <Moon className="h-5 w-5 dark:hidden" />
            <Sun className="hidden h-5 w-5 dark:block" />
          </button>

          {/* Desktop Authentication */}
          <div className="hidden items-center gap-4 xl:flex">
            {!loading &&
              (user ? (
                <>
                  {/* Admin Dashboard */}
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin/dashboard"
                      className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                        isAdminPage
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400"
                          : "text-slate-600 hover:text-yellow-700 dark:text-slate-300 dark:hover:text-yellow-400"
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}

                  {/* User Name */}
                  <span className="max-w-32 truncate whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Hi, {user.name}
                  </span>

                  {/* Logout Button */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="cursor-pointer rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                >
                  Sign In
                </Link>
              ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="cursor-pointer rounded-lg border border-slate-200 p-2.5 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 xl:hidden"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Logout Error */}
      {error && (
        <p role="alert" className="px-6 pb-2 text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="max-h-[60dvh] overflow-y-auto border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 xl:hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                  isActiveLink(link.href)
                    ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Authentication */}
            {!loading &&
              (user ? (
                <>
                  <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-700">
                    <p className="font-semibold text-slate-800 dark:text-white">
                      {user.name}
                    </p>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {user.email}
                    </p>
                  </div>

                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                        isAdminPage
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-yellow-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-yellow-700"
                >
                  Sign In
                </Link>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}
