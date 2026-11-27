import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type RegisterInput = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export async function POST(request: Request) {
  try {
    const body: RegisterInput = await request.json();

    const { name, email, phone, password, confirmPassword } = body;

    // Validate fields
    if ([name, email, phone, password, confirmPassword].some((value) => typeof value !== "string" || !value.trim())) {
      return Response.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !/^\d{10}$/.test(phone.trim()) || name.trim().length > 100 || email.trim().length > 191 || Buffer.byteLength(password, "utf8") > 72) {
      return Response.json({ success: false, message: "Invalid name, email, phone or password length." }, { status: 400 });
    }

    if (password.length < 8) {
      return Response.json(
        { success: false, message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return Response.json(
        { success: false, message: "Passwords do not match." },
        { status: 400 }
      );
    }

    // Check existing user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email.trim().toLowerCase() }, { phone: phone.trim() }]
      }
    });

    if (existingUser) {
      return Response.json(
        { success: false, message: "Email or phone already registered." },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true
      }
    });

    return Response.json(
      {
        success: true,
        message: "Registration successful.",
        data: user
      },
      { status: 201 }
    );
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return Response.json({ success: false, message: "Email or phone already registered." }, { status: 409 });
    }
    console.error("Registration error:", error);

    return Response.json(
      { success: false, message: "Registration failed." },
      { status: 500 }
    );
  }
}
