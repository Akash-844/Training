import type { CreateTaskInput, Task, UpdateTaskInput } from "@/types/task";

import {
  createTask as createTaskRepository,
  patchTask
} from "@/repositories/task-repo";

export const createdTask = async (task: CreateTaskInput): Promise<Task> => {
  if (task.title.trim() === "") {
    throw new Error("Title Cannot be Empty");
  }

  const createdTask = await createTaskRepository(task);

  return createdTask;
};

export const updateTask = async (
  id: number,
  updates: UpdateTaskInput
): Promise<Task> => {
  if (Object.keys(updates).length === 0) {
    throw new Error("No fields provided for update");
  }

  const patch = await patchTask(id, updates);
  return patch;
};
