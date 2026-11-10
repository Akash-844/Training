import { ResultSetHeader, RowDataPacket } from "mysql2";
import type { CreateTaskInput, Task, UpdateTaskInput } from "../types/task";
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
export const patchTask = async (
  id: number,
  updates: UpdateTaskInput
): Promise<Task> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updates)
    }
  );
  if (!response.ok) {
    throw new Error("Unable to update Content in Object");
  }
  const UpdateTaskInput: Task = await response.json();
  return UpdateTaskInput;
};
