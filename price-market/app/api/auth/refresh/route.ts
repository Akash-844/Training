import { prisma } from "@/lib/prisma";
import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    //Get refresh token from cookie
    const refreshToken = request.headers
      .get("cookie")
      ?.split("; ")
      .find((cookie) => cookie.startsWith("pm_refresh_token="))
      ?.split("=")[1];

    if (!refreshToken) {
      return Response.json(
        { success: false, message: "Refresh token missing." },
        { status: 401 }
      );
    }

    //Hash refresh token
    const refreshTokenHash = createHash("sha256")
      .update(decodeURIComponent(refreshToken))
      .digest("hex");

    //Find session
    const session = await prisma.session.findUnique({
      where: { refreshTokenHash }
    });

    if (!session) {
      return Response.json(
        { success: false, message: "Invalid refresh token." },
        { status: 401 }
      );
    }

    const now = new Date();
    const inactiveTime = new Date(now.getTime() - 15 * 60 * 1000);

    //Check session expiry and inactivity
    if (
      session.refreshExpiresAt <= now ||
      session.lastActivityAt <= inactiveTime
    ) {
      await prisma.session.delete({
        where: { id: session.id }
      });

      const response = NextResponse.json(
        { success: false, message: "Session expired. Please login again." },
        { status: 401 }
      );

      response.cookies.set("pm_access_token", "", {
        path: "/",
        maxAge: 0
      });

      response.cookies.set("pm_refresh_token", "", {
        path: "/",
        maxAge: 0
      });

      return response;
    }

    //Generate new tokens
    const accessToken = randomBytes(32).toString("hex");
    const newRefreshToken = randomBytes(32).toString("hex");

    const accessTokenHash = createHash("sha256")
      .update(accessToken)
      .digest("hex");

    const newRefreshTokenHash = createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    //Update session with new token hashes
    const updated = await prisma.session.updateMany({
      where: {
        id: session.id,
        refreshTokenHash,
        refreshExpiresAt: { gt: now },
        lastActivityAt: { gt: inactiveTime }
      },
      data: {
        accessTokenHash,
        refreshTokenHash: newRefreshTokenHash,
        accessExpiresAt: new Date(now.getTime() + 5 * 60 * 1000)
      }
    });

    if (updated.count !== 1) {
      return Response.json(
        { success: false, message: "Session is no longer valid." },
        { status: 401 }
      );
    }

    //Send new cookies
    const response = NextResponse.json({
      success: true,
      message: "Tokens refreshed successfully."
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/"
    };

    response.cookies.set("pm_access_token", accessToken, {
      ...cookieOptions,
      maxAge: 5 * 60
    });

    response.cookies.set("pm_refresh_token", newRefreshToken, {
      ...cookieOptions,
      maxAge: Math.floor(
        (session.refreshExpiresAt.getTime() - now.getTime()) / 1000
      )
    });

    return response;
  } catch (error) {
    console.error("Token refresh error:", error);

    return Response.json(
      { success: false, message: "Token refresh failed." },
      { status: 500 }
    );
  }
}
