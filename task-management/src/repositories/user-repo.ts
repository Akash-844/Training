import { db } from "@/config/db";
import { CreateUserInput, User } from "@/types/users";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const createUser = async (user: CreateUserInput): Promise<User> => {
  const [result] = await db.execute<ResultSetHeader>(
    "INSERT INTO users (name,email,password_hash) VALUES (?,?,?)",
    [user.name, user.email, user.passwordHash]
  );
  const createUser: User = {
    id: result.insertId,
    name: user.name,
    email: user.email,
    passwordHash: user.passwordHash
  };
  return createUser;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await db.execute<(User & RowDataPacket)[]>(
    "SELECT id,name,email,password_hash AS passwordHash FROM users WHERE email = ? ",
    [email]
  );
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};
