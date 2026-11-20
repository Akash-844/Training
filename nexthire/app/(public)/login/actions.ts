"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import prisma from "@/lib/prisma";

export async function loginUser(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");

  const user = await prisma.user.findUnique({ where: { email } });
  const redirectTo =
    user?.role === "RECRUITER" ? "/recruiter/dashboard" : "/dashboard";
  console.log("LOGIN REDIRECT:", {
    role: user?.role,
    redirectTo
  });
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return "Invalid email or password";
      }
      return "Something went wrong.please try again";
    }
    throw error;
  }
}
