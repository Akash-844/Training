"use client";

import type { Task } from "@/types/task";
import { useEffect, useState } from "react";
import DisplayCard from "./Card";
import TaskItem from "./TaskItem";
import TaskForm from "./Taskform";

const Summary = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(tasks.length / tasksPerPage));
  const page = Math.min(currentPage, totalPages);
  const startIndex = (page - 1) * tasksPerPage;

  const currentTasks = tasks.slice(startIndex, startIndex + tasksPerPage);

  // Load tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");

        if (!response.ok) {
          throw new Error("Failed to load tasks");
        }

        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        setError("Failed to load tasks. Please try again.");
        console.error("Error loading tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Create task
  const handleTaskCreated = (newTask: Task) => {
    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  // Edit task
  const handleEditTask = async (taskId: number, title: string) => {
    const existingTask = tasks.find((task) => task.id === taskId);

    if (!existingTask) {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: existingTask.userId,
          title: title,
          completed: existingTask.completed
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask: Task = await response.json();

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.log("Error editing task:", error);
    }
  };

  // Complete or pending task
  const handleToggleTask = async (taskId: number, completed: boolean) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ completed })
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask: Task = await response.json();

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Unable to delete task");
      }

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Loading
  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  // Error
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Task counts
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div>
      <div className="grid grid-cols-3 gap-5 mt-7">
        <DisplayCard title="Total Tasks" count={totalTasks} />
        <DisplayCard title="Completed Tasks" count={completedTasks} />
        <DisplayCard title="Pending Tasks" count={pendingTasks} />
      </div>

      <section className="mt-8 w-full relative">
        <h1 className="text-xl font-bold text-black bg-yellow-400 p-4 mb-3 rounded-lg shadow">
          My Tasks
        </h1>

        <TaskForm onTaskCreated={handleTaskCreated} />

        {currentTasks.length === 0 ? (
          <p className="text-gray-500 mt-4">No tasks available.</p>
        ) : (
          currentTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))
        )}

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage(page - 1)}
            disabled={page === 1}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg disabled:opacity-40"
          >
            Previous
          </button>

          <span className="font-semibold text-black">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(page + 1)}
            disabled={page === totalPages}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default Summary;
