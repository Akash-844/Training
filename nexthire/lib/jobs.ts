import { cacheLife } from "next/cache";
import prisma from "./prisma";

export async function getCachedJobs(search: string, location: string) {
  "use cache";

  cacheLife("minutes");

  const jobs = await prisma.job.findMany({
    where: {
      title: { contains: search },
      location: { contains: location }
    }
  });
  return jobs;
}
