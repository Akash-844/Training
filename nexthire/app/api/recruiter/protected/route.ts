import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "RECRUITER") {
    return NextResponse.json(
      { message: "Forbidden: Recruiters only" },
      { status: 403 }
    );
  }

  return NextResponse.json({
    message: "Recruiter access granted"
  });
}
