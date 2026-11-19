import { DefaultSession } from "next-auth";

type UserRole = "JOB_SEEKER" | "RECRUITER";
declare module "next-auth" {
  interface User {
    role: UserRole;
  }
  interface Session {
    user: {
      id?: string;
      role?: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}
