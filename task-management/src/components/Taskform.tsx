"use state";

import { useState } from "react";
import type { SubmitEvent } from "react";
import type { Task } from "@/types/task";

interface TaskFormProps {
  onTaskCreated: (task: Task) => void;
}
const TaskForm = ({ onTaskCreated }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const handelSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() === "") {
      return;
    }
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          userId: 1,
          title: title.trim(),
          completed: false
        })
      });
      if (!response.ok) {
        throw new Error("Failed to Create Task");
      }
      const data = await response.json();
      onTaskCreated(data);
      console.log("Created Task", data);
      setTitle("");
    } catch (error) {
      console.log("Error creating task", error);
    }
  };

  return (
    <div className="bg-gray-200 p-5 rounded-xl shadow-md sticky top-0 bottom-0 left-0 right-0">
      <form className="flex gap-3 items-end" onSubmit={handelSubmit}>
        <label className="flex-1 text-gray-700 font-semibold">
          TASK TITLE
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black "
            placeholder="Enter Your Text"
          />
        </label>

        <button
          type="submit"
          className="bg-green-600 hover:not-focus:bg-green-700 px-5 py-3 rounded-lg"
        >
          ADD
        </button>
      </form>
    </div>
  );
};
export default TaskForm;
