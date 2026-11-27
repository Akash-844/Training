import "server-only";

import { cookies } from "next/headers";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("pm_access_token")?.value;

  if (!token) {
    return null;
  }

  const accessTokenHash = createHash("sha256").update(token).digest("hex");

  const session = await prisma.session.findUnique({
    where: {
      accessTokenHash
    },
    include: {
      user: true
    }
  });

  if (!session) {
    return null;
  }

  const now = new Date();

  const inactiveLimit = new Date(now.getTime() - 15 * 60 * 1000);

  if (
    session.accessExpiresAt <= now ||
    session.refreshExpiresAt <= now ||
    session.lastActivityAt <= inactiveLimit
  ) {
    return null;
  }

  return session.user;
}
