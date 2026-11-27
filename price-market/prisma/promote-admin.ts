import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!email) {
    throw new Error("ADMIN_EMAIL is required.");
  }

  const user = await prisma.user.update({
    where: {
      email
    },
    data: {
      role: "ADMIN"
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });

  console.log("Admin account updated successfully!");
  console.log(user);
}

main()
  .catch((error: unknown) => {
    console.error("Admin update failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
