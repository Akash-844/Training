import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { dummyUsers } from "@/lib/dummy-users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },

      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const user = dummyUsers.find(
          (user) => user.email === email && user.password === password
        );

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email
        };
      }
    })
  ]
});
