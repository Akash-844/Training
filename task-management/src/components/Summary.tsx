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
  const handleTaskCreated = (newTask: Task) => {
    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // const response = await fetch("api/invalid:");
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to Load Tasks");
        }
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        setError("Failed to load tasks.Please try again");
        console.error("Error Loading Tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);
  if (isLoading) {
    return <>Loading Tasks</>;
  }
  if (error) {
    return <p className="text-red-500 font-mono">{error}</p>;
  }
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
        throw new Error("Failed To Update Task");
      }
      const updatedTask: Task = await response.json();
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.log("Error Updating task:", error);
    }
  };
  const handleDeleteTask = async (taskId: number) => {
    const confirmed = window.confirm(
      "Are You Sure You Want To Delete This Task?"
    );
    if (!confirmed) {
      return;
    }
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Unable to delete task");
      }
      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      console.error("Error Deleting task:", error);
    }
  };

  const totalTasks = tasks.length;
  const CompletedTasks = tasks.filter((tasks) => tasks.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div>
      <div className="grid grid-cols-3 gap-5 mt-7">
        <DisplayCard title="Total Tasks" count={totalTasks} />
        <DisplayCard title="Completed Tasks" count={CompletedTasks} />
        <DisplayCard title="Pending Tasks" count={pendingTasks} />
      </div>
      <section className="mt-8 w-full min-w-0 relative">
        <h1 className="text-xl font-bold mb-4 text-black  w-full min-w-0 bg-yellow-400 p-4 mb-3 rounded-lg shadow">
          My Tasks
        </h1>
        <TaskForm onTaskCreated={handleTaskCreated} />
        {tasks.map((task) => (
          // <div
          //   key={task.id}
          //   className="w-full min-w-0 bg-gray-200 p-4 mb-3 rounded-lg shadow"
          // >
          //   <h3 className="font-semibold text-black overflow-y-auto">
          //     {task.title}
          //   </h3>
          // </div>

          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </section>
    </div>
  );
};

export default Summary;
