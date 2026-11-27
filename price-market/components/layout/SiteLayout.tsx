"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import Navbar from "@/components/elements/Navbar";
import Footer from "@/components/elements/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <div
      className={`flex flex-col ${
        isAdminPage ? "h-dvh overflow-hidden" : "min-h-dvh"
      }`}
    >
      <Navbar />

      <div className="min-h-0 flex-1">{children}</div>

      {!isAdminPage && <Footer />}
    </div>
  );
}
