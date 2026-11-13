import type { Task } from "@/types/task";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: number, completed: boolean) => void;
  onDelete: (taskId: number) => void;
  onEdit: (taskId: number, title: string) => void;
}

const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handelSave = () => {
    const trimmedTitle = editedTitle.trim();
    if (trimmedTitle === "") {
      return;
    }
  };
  const handleEdit = () => {
    setEditedTitle(task.title);
    setIsEditing(true);
  };
  const handleCancel = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-200 border border-gray-200 rounded=xl p-4 mb-3 shadow-sm">
      <div className="min-w-0">
        {isEditing ? (
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 text-black"
            />
            <button
              type="button"
              onClick={handelSave}
              className="text-black bg-amber-600 w-20 rounded-xl"
            >
              SAVE
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-black bg-yellow-600 w-20 rounded-xl"
            >
              CANCEL
            </button>
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-black break-words">
              {task.title}
            </h3>
            <button
              type="button"
              onClick={handleEdit}
              className="bg-blue-500 rounded-xl w-20"
            >
              EDIT
            </button>
          </div>
        )}
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
