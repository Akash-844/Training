import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const metals = await prisma.metal.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        name: true,
        symbol: true,
        slug: true,
        sortOrder: true
      },
      orderBy: {
        sortOrder: "asc"
      }
    });

    return Response.json({
      success: true,
      message: "Metals fetched successfully",
      total: metals.length,
      data: metals
    });
  } catch (error) {
    console.error("Failed to fetch metals:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch metals."
      },
      { status: 500 }
    );
  }
}
