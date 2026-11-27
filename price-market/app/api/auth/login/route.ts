import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomBytes, createHash } from "node:crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    //Get login details
    const { email, password } = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required."
        },
        { status: 400 }
      );
    }

    //Find user
    const user = await prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase()
      }
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password."
        },
        { status: 401 }
      );
    }

    //Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password."
        },
        { status: 401 }
      );
    }

    //Generate access and refresh tokens
    const accessToken = randomBytes(32).toString("hex");
    const refreshToken = randomBytes(32).toString("hex");

    //Hash tokens before storing them
    const accessTokenHash = createHash("sha256")
      .update(accessToken)
      .digest("hex");

    const refreshTokenHash = createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    //Set token expiration
    const now = Date.now();

    const accessExpiresAt = new Date(now + 5 * 60 * 1000);

    const refreshExpiresAt = new Date(now + 7 * 24 * 60 * 60 * 1000);

    //Create session in MySQL
    await prisma.session.create({
      data: {
        accessTokenHash,
        refreshTokenHash,
        userId: user.id,
        lastActivityAt: new Date(),
        accessExpiresAt,
        refreshExpiresAt
      }
    });

    //Prepare response
    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

    //Store tokens in secure cookies
    response.cookies.set("pm_access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 5 * 60
    });

    response.cookies.set("pm_refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Login failed."
      },
      { status: 500 }
    );
  }
}
