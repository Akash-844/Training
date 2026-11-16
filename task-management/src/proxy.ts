import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log(`[Task API] ${request.method} ${request.nextUrl.pathname}`);
  const response = NextResponse.next();

  response.headers.set("X-content-Type-Options", "nosniff");

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  return response;
}
export const config = {
  matcher: "/api/tasks/:path*"
};
