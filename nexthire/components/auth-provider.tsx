"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import SessionExpiry from "./session-expiry";

export default function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SessionExpiry />
      {children}
    </SessionProvider>
  );
}
