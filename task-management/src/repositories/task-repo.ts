import { ResultSetHeader, RowDataPacket } from "mysql2";
import type {
  CreateTaskInput,
  ReplaceTaskInput,
  Task,
  UpdateTaskInput
} from "../types/task";
import { db } from "@/config/db";

interface TaskRow extends RowDataPacket {
  id: number;
  userId: number;
  title: string;
  completed: number;
}
//Used Get Method
// export const getTasks = async (): Promise<Task[]> => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/todos");
//   if (!response.ok) {
//     throw new Error("Failed to Fetch Tasks");
//   }
//   const tasks: Task[] = await response.json();
//   return tasks;
// };

//Task[] it will check all tasks
export const getTasks = async (): Promise<Task[]> => {
  //db.query connection pool
  const [row] = await db.query<TaskRow[]>(
    "SELECT id,user_id AS userId,title,completed FROM tasks"
  );
  const tasks: Task[] = row.map((task) => ({
    id: task.id,
    userId: task.userId,
    title: task.title,
    completed: Boolean(task.completed)
  }));
  return tasks;
};

//Used Post Method
// export const createTask = async (task: CreateTaskInput): Promise<Task> => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(task)
//   });

//   if (!response.ok) {
//     throw new Error("Failed To Post Tasks");
//   }

//   const createdTask: Task = await response.json();
//   return createdTask;
// };

export const createTask = async (task: CreateTaskInput): Promise<Task> => {
  const [result] = await db.execute<ResultSetHeader>(
    "INSERT INTO tasks (user_id, title, completed) VALUES (?, ?, ?)",
    [task.userId, task.title, task.completed]
  );
  // const tasks: Task[] = result.map((task) => ({
  //   id: task.id,
  //   userId: task.userId,
  //   title: task.title,
  //   completed: Boolean(task.completed)
  // }));

  const createdTask: Task = {
    id: result.insertId,
    userId: task.userId,
    title: task.title,
    completed: task.completed
  };
  return createdTask;
};

//Used Patch Method
// export const patchTask = async (
//   id: number,
//   updates: UpdateTaskInput
// ): Promise<Task> => {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/todos/${id}`,
//     {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(updates)
//     }
//   );
//   if (!response.ok) {
//     throw new Error("Unable to update Content in Object");
//   }
//   const UpdateTaskInput: Task = await response.json();
//   return UpdateTaskInput;
// };

export const patchTask = async (
  id: number,
  updates: UpdateTaskInput
): Promise<Task> => {
  const field: string[] = [];
  const values: (string | number | boolean)[] = [];

  if (updates.title !== undefined) {
    field.push("title = ?");
    values.push(updates.title);
  }
  if (updates.completed !== undefined) {
    field.push("completed = ?");
    values.push(updates.completed);
  }
  if (updates.userId !== undefined) {
    field.push("user_id = ?");
    values.push(updates.userId);
  }
  if (field.length === 0) {
    throw new Error("No fields Provided for update");
  }

  values.push(id);

  const sql = `UPDATE tasks SET ${field.join(", ")} WHERE id = ?`;

  const [results] = await db.execute<ResultSetHeader>(sql, values);

  const [rows] = await db.query<TaskRow[]>(
    "SELECT id,user_id AS userId,title,completed FROM tasks WHERE id = ?",
    [id]
  );
  if (rows.length === 0) {
    throw new Error("Task Not Found");
  }

  const updateTask: Task = {
    id: rows[0].id,
    userId: rows[0].userId,
    title: rows[0].title,
    completed: Boolean(rows[0].completed)
  };

  return updateTask;
};

//PUT
export const putTask = async (
  id: number,
  updates: ReplaceTaskInput
): Promise<Task> => {
  const sql = `
    UPDATE tasks
    SET user_id = ?, title = ?, completed = ?
    WHERE id = ?
  `;
  const [result] = await db.execute<ResultSetHeader>(sql, [
    updates.userId,
    updates.title,
    updates.completed,
    id
  ]);

  const [rows] = await db.query<TaskRow[]>(
    "SELECT id,user_id AS userId,title,completed FROM tasks WHERE id = ?",
    [id]
  );
  if (rows.length === 0) {
    throw new Error("Task Not Found");
  }
  const updateTask: Task = {
    id: rows[0].id,
    userId: rows[0].userId,
    title: rows[0].title,
    completed: Boolean(rows[0].completed)
  };
  return updateTask;
};

//delete
export const deleteTask = async (id: number): Promise<boolean> => {
  const sql = "DELETE FROM tasks WHERE id = ?";
  const [result] = await db.execute<ResultSetHeader>(sql, [id]);

  return result.affectedRows > 0;
};
