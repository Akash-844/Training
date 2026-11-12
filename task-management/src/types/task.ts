export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type CreateTaskInput = Omit<Task, "id">;
export type UpdateTaskInput = Partial<Omit<Task, "id">>;
export type ReplaceTaskInput = Omit<Task, "id">;
