import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    //Enables email/password login
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      //Verifies the user's credentials
      async authorize(credentials) {
        //Receive Credentials
        const email = credentials.email as string;
        const password = credentials.password as string;

        //fails if no user
        if (!email || !password) {
          return null;
        }
        //finds the user
        const user = await prisma.user.findUnique({
          where: { email }
        });
        if (!user) {
          return null;
        }
        const isPasswordValid = await bcrypt.compare(
          password,
          user.passwordHash
        );
        if (!isPasswordValid) {
          return null;
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (typeof token.id === "string") {
          session.user.id = token.id;
        }
        if (token.role === "JOB_SEEKER" || token.role === "RECRUITER") {
          session.user.role = token.role;
        }
      }

      return session;
    }
  }
});
