"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Dashboard from "../dashboard/Dashboard";

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");

  // Toggle sidebar
  function toggleSidebar() {
    setSidebarCollapsed((previous) => !previous);
  }

  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-slate-100 transition-colors duration-300 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Main Content */}
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="space-y-6 p-4 lg:p-6">
          {currentPage === "Dashboard" ? (
            <Dashboard />
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                {currentPage}
              </h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
