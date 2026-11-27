"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { refreshTokens } from "./refreshTokens";

export default function SessionManager() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let disposed = false;
    let isLoggedIn = false;
    let isLoading = false;
    let lastRequest = 0;

    let logoutTimer: ReturnType<typeof setTimeout>;

    const inactivityLimit = 15 * 60 * 1000;

    async function logout() {
      if (disposed || !isLoggedIn) return;

      isLoggedIn = false;
      clearTimeout(logoutTimer);

      await fetch("/api/auth/logout", {
        method: "POST"
      });

      router.replace("/login");
      router.refresh();
    }

    function resetTimer() {
      clearTimeout(logoutTimer);

      logoutTimer = setTimeout(() => {
        logout();
      }, inactivityLimit);
    }

    async function updateActivity() {
      if (disposed || !isLoggedIn || isLoading) return;

      isLoading = true;

      try {
        let response = await fetch("/api/auth/activity", {
          method: "POST"
        });

        // Refresh access token if expired
        if (disposed) return;
        if (response.status === 401) {
          const refreshResponse = await refreshTokens();

          if (disposed) return;
          if (!refreshResponse.ok) {
            await logout();
            return;
          }

          // Retry activity update
          response = await fetch("/api/auth/activity", {
            method: "POST"
          });
        }

        if (disposed) return;
        if (response.status === 401) {
          await logout();
        }
      } catch (error) {
        console.error("Activity update failed:", error);
      } finally {
        isLoading = false;
      }
    }

    async function checkLogin() {
      try {
        let response = await fetch("/api/auth/me");

        // Refresh access token if expired
        if (disposed) return;
        if (response.status === 401) {
          const refreshResponse = await refreshTokens();

          if (disposed) return;
          if (!refreshResponse.ok) return;

          response = await fetch("/api/auth/me");
        }

        if (disposed || !response.ok) return;

        isLoggedIn = true;

        resetTimer();

        // Wait for genuine user activity.
      } catch (error) {
        console.error("Session verification failed:", error);
      }
    }

    function handleActivity() {
      if (disposed || !isLoggedIn) return;

      resetTimer();

      // Update activity once every minute
      if (Date.now() - lastRequest >= 60 * 1000) {
        lastRequest = Date.now();
        updateActivity();
      }
    }

    const events = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart"
    ] as const;

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    checkLogin();

    return () => {
      disposed = true;
      clearTimeout(logoutTimer);

      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [router, pathname]);

  return null;
}
