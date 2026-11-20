"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function loginUser(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/"
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
