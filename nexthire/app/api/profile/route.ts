import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });
  if (!user) {
    return NextResponse.json(
      {
        message: "User nt found"
      },
      {
        status: 404
      }
    );
  }

  return NextResponse.json({ user });
}
