"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "../../public/icon.svg";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Gold Rates", href: "/gold-rates/hyderabad" },
  { name: "Metals", href: "/metals/gold" },
  { name: "About", href: "/about" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={Icon}
            alt="PriceMarket Logo"
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />

          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            Price<span className="text-yellow-700">Market</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-gray-600 transition hover:text-yellow-700"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-green-50 px-3 py-2 sm:flex">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-green-700">
              Market Updates
            </span>
          </div>

          <Link
            href="/login"
            className="hidden rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-yellow-700 sm:inline-flex"
          >
            Sign In
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-800 transition hover:bg-gray-100 lg:hidden"
          >
            <span className="text-2xl leading-none">
              {isMenuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-lg lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-yellow-50 hover:text-yellow-800"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-lg bg-yellow-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-yellow-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
