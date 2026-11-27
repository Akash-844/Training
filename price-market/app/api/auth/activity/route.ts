import { prisma } from "@/lib/prisma";
import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get access token
    const token = request.cookies.get("pm_access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Please login first." },
        { status: 401 }
      );
    }

    // Hash access token
    const accessTokenHash = createHash("sha256").update(token).digest("hex");

    // Find session
    const session = await prisma.session.findUnique({
      where: { accessTokenHash }
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Invalid session." },
        { status: 401 }
      );
    }

    const now = new Date();
    const inactiveLimit = new Date(now.getTime() - 15 * 60 * 1000);

    // Check session validity
    if (
      session.refreshExpiresAt <= now ||
      session.lastActivityAt <= inactiveLimit
    ) {
      await prisma.session.delete({
        where: { id: session.id }
      });

      const response = NextResponse.json(
        { success: false, message: "Session expired." },
        { status: 401 }
      );

      response.cookies.delete("pm_access_token");
      response.cookies.delete("pm_refresh_token");

      return response;
    }

    if (session.accessExpiresAt <= now) {
      return NextResponse.json(
        { success: false, message: "Access token expired." },
        { status: 401 }
      );
    }

    // Update user activity
    await prisma.session.update({
      where: { id: session.id },
      data: {
        lastActivityAt: now
      }
    });

    return NextResponse.json({
      success: true,
      message: "Activity updated."
    });
  } catch (error) {
    console.error("Activity error:", error);

    return NextResponse.json(
      { success: false, message: "Activity update failed." },
      { status: 500 }
    );
  }
}
