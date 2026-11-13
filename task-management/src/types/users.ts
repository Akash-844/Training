export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
}
//here we are creating userinput to store interface and exculed id
export type CreateUserInput = Omit<User, "id">;
