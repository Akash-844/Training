export type Role = "ADMIN" | "USER";

//here created interface of User
export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  active: boolean;
}
