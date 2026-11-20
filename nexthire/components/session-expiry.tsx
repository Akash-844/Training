"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SessionExpiry() {
  const { status, data: session } = useSession();
  const pathname = usePathname();

  const expiryTimeRef = useRef<number | null>(null);

  const isProtectedRoute =
    pathname === "/dashboard" || pathname.startsWith("/recruiter");

  useEffect(() => {
    if (status === "unauthenticated") {
      expiryTimeRef.current = null;
      return;
    }

    if (!isProtectedRoute || status !== "authenticated" || !session?.expires) {
      return;
    }

    if (expiryTimeRef.current === null) {
      expiryTimeRef.current = new Date(session.expires).getTime();
    }

    const remainingTime = expiryTimeRef.current - Date.now();

    const logout = () => {
      expiryTimeRef.current = null;

      void signOut({
        redirectTo: "/login?reason=session-expired"
      });
    };

    if (remainingTime <= 0) {
      logout();
      return;
    }

    const timer = window.setTimeout(logout, remainingTime);

    return () => window.clearTimeout(timer);
  }, [status, session?.expires, pathname, isProtectedRoute]);

  return null;
}
