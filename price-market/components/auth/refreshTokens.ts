let refreshPromise: Promise<Response> | null = null;

export function refreshTokens() {
  if (!refreshPromise) {
    refreshPromise = fetch("/api/auth/refresh", {
      method: "POST"
    }).finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

