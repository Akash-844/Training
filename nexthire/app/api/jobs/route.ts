import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";

    const jobs = await (prisma as any).job.findMany({
      where: {
        title: {
          contains: search
        },
        location: {
          contains: location
        }
      }
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
