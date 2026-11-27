import { prisma } from "@/lib/prisma";
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get authentication cookies
    const cookie = request.headers.get("cookie") || "";

    const accessToken = cookie
      .split(";")
      .find((item) => item.trim().startsWith("pm_access_token="))
      ?.split("=")[1];

    const refreshToken = cookie
      .split(";")
      .find((item) => item.trim().startsWith("pm_refresh_token="))
      ?.split("=")[1];

    // Find and delete the session
    if (accessToken || refreshToken) {
      const conditions = [];

      if (accessToken) {
        conditions.push({
          accessTokenHash: createHash("sha256")
            .update(decodeURIComponent(accessToken))
            .digest("hex")
        });
      }

      if (refreshToken) {
        conditions.push({
          refreshTokenHash: createHash("sha256")
            .update(decodeURIComponent(refreshToken))
            .digest("hex")
        });
      }

      await prisma.session.deleteMany({
        where: {
          OR: conditions
        }
      });
    }

    // Clear authentication cookies
    const response = NextResponse.json({
      success: true,
      message: "Logout successful."
    });

    response.cookies.set("pm_access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0
    });

    response.cookies.set("pm_refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    return Response.json(
      {
        success: false,
        message: "Logout failed."
      },
      { status: 500 }
    );
  }
}
