import type { Task } from "@/types/task";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: number, completed: boolean) => void;
  onDelete: (taskId: number) => void;
}

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const [isediting, setIsEditing] = useState();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-200 border border-gray-200 rounded=xl p-4 mb-3 shadow-sm">
      <div className="min-2-0">
        <h3 className="font-semibold text-gray-900 break-words">
          {task.title}
        </h3>
        <p className="text-black">{task.completed ? "Completed" : "Pending"}</p>
      </div>
      <div className="flex flex-wrap gap-2 at-3">
        <button
          onClick={() => onToggle(task.id, !task.completed)}
          className="px-3 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-500"
        >
          {task.completed ? "Mark AS Pending" : "Mark as Completed"}
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="w-32 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 "
        >
          DELETE
        </button>
      </div>
    </div>
  );
};
export default TaskItem;
