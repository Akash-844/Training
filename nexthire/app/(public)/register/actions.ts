"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export type RegisterState = {
  error?: string;
  success?: string;
};

export async function registeruser(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");
  const role = String(formData.get("role") || "");

  if (!name || !email || password.length < 8) {
    return { error: "Fill The Fields" };
  }
  if (role !== "JOB_SEEKER" && role !== "RECRUITER") {
    return { error: "Choose Role" };
  }
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });
  if (existingUser) {
    return { error: "Email already registered" };
  }
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role
    }
  });
  return { success: "Registration successfull" };
}
