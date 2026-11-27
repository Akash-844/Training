import { prisma } from "@/lib/prisma";
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { connection } from "next/server";
export async function GET(request: Request) {
  await connection();
  try {
    // Get access token from cookie
    const cookie = request.headers.get("cookie");

    const accessToken = cookie
      ?.split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith("pm_access_token="))
      ?.slice("pm_access_token=".length);

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "Please login first." },
        { status: 401 }
      );
    }

    // Hash access token
    const accessTokenHash = createHash("sha256")
      .update(accessToken)
      .digest("hex");

    // Find session
    const session = await prisma.session.findUnique({
      where: { accessTokenHash },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true
          }
        }
      }
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Invalid session." },
        { status: 401 }
      );
    }

    const now = new Date();

    const inactiveLimit = new Date(now.getTime() - 15 * 60 * 1000);

    // Check session expiration
    if (
      session.refreshExpiresAt <= now ||
      session.lastActivityAt <= inactiveLimit
    ) {
      await prisma.session.delete({
        where: { id: session.id }
      });

      const response = NextResponse.json(
        { success: false, message: "Session expired. Please login again." },
        { status: 401 }
      );

      response.cookies.delete("pm_access_token");
      response.cookies.delete("pm_refresh_token");

      return response;
    }

    // Check access token expiration
    if (session.accessExpiresAt <= now) {
      return NextResponse.json(
        {
          success: false,
          message: "Access token expired. Please refresh your session."
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User authenticated successfully.",
      data: {
        user: session.user
      }
    });
  } catch (error) {
    console.error("Authentication error:", error);

    return NextResponse.json(
      { success: false, message: "Authentication failed." },
      { status: 500 }
    );
  }
}
