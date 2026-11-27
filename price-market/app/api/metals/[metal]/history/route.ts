import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    metal: string;
  }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const { metal: slug } = await params;

    // Get pagination parameters
    const { searchParams } = new URL(request.url);

    const limit = searchParams.has("limit")
      ? Number(searchParams.get("limit"))
      : 10;

    const offset = searchParams.has("offset")
      ? Number(searchParams.get("offset"))
      : 0;

    // Validate parameters
    if (
      !Number.isSafeInteger(limit) ||
      limit < 1 ||
      limit > 100 ||
      !Number.isSafeInteger(offset) ||
      offset < 0
    ) {
      return Response.json(
        { success: false, message: "Invalid pagination parameters." },
        { status: 400 }
      );
    }

    // Find metal
    const metal = await prisma.metal.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        symbol: true,
        slug: true
      }
    });

    if (!metal) {
      return Response.json(
        { success: false, message: "Metal not found." },
        { status: 404 }
      );
    }

    const where = {
      metalId: metal.id
    };

    // Fetch records and total count
    const [history, total] = await Promise.all([
      prisma.metalPrice.findMany({
        where,
        select: {
          id: true,
          price: true,
          currency: true,
          unit: true,
          source: true,
          benchmark: true,
          benchmarkDate: true
        },
        orderBy: [{ benchmarkDate: "desc" }, { id: "desc" }],
        take: limit,
        skip: offset
      }),

      prisma.metalPrice.count({ where })
    ]);

    return Response.json({
      success: true,
      message: "Price history fetched successfully.",
      data: {
        metal,
        history: history.map((record) => ({
          ...record,
          price: record.price.toString()
        }))
      },
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + history.length < total
      }
    });
  } catch (error) {
    console.error("Failed to fetch price history:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch price history."
      },
      { status: 500 }
    );
  }
}
