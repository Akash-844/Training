"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Bell,
  LogOut,
  ChevronDown,
  Filter,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  UserRound
} from "lucide-react";

// Define component props
type HeaderProps = {
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
};

export default function Header({
  onToggleSidebar,
  onToggleTheme
}: HeaderProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error("Logout failed.");
      router.replace("/login");
      router.refresh();
    } catch { setError("Logout failed. Try again."); }
  }
  return (
    <header className="border-b border-slate-200/50 bg-white/80 px-6 py-4 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80">
      <div className="flex items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Dashboard
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Monitor your metal market activity.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="mx-4 hidden min-w-0 max-w-md flex-1 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search anything..."
              className="w-full rounded-xl border border-slate-200 bg-slate-100 py-2.5 pl-10 pr-10 text-sm text-slate-800 outline-none transition-all focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <Filter className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
            className="rounded-xl bg-slate-100 p-2.5 text-slate-600 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <Sun className="hidden h-5 w-5 dark:block" />
            <Moon className="h-5 w-5 dark:hidden" />
          </button>

          <button type="button" onClick={handleLogout} aria-label="Logout" className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <LogOut className="h-5 w-5" /> Logout
          </button>
          {error && <p role="alert">{error}</p>}
          {/* Notifications */}
          <div className="relative p-2.5 text-slate-600 dark:text-slate-300">
            <Bell className="h-5 w-5" />

            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
          </div>

          {/* Settings */}
          <Settings className="h-5 w-5 text-slate-500 dark:text-slate-400" />

          {/* Admin Profile */}
          <div className="flex items-center gap-3 border-l border-slate-200 pl-3 dark:border-slate-700">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 ring-2 ring-blue-500 dark:bg-slate-700">
              <UserRound className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-800 dark:text-white">
                Admin User
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Administrator
              </p>
            </div>

            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
