import type {
  CreateTaskInput,
  ReplaceTaskInput,
  Task,
  UpdateTaskInput
} from "@/types/task";

import {
  createTask as createTaskRepository,
  deleteTask,
  patchTask,
  putTask
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

export const replaceTask = async (
  id: number,
  updates: ReplaceTaskInput
): Promise<Task> => {
  if (updates.title.trim() === "") {
    throw new Error("Title Is Empty");
  }
  const put = await putTask(id, updates);
  return put;
};

export const removeTask = async (id: number): Promise<boolean> => {
  const deleted = await deleteTask(id);
  if (!deleted) {
    throw new Error("Task Not Found");
  }

  return deleted;
};
