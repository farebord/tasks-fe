import { useState, useEffect, useMemo } from "react";
import {
  fetchTasks,
  addTask,
  deleteTask,
  toggleTaskComplete,
} from "../services/tasks";
import { Task } from "../types/task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const completedTasks = useMemo(() => {
    return tasks.filter((task) => task.completed);
  }, [tasks]);

  useEffect(() => {
    fetchTasks()
      .then((tasks) =>
        tasks.toSorted((a, b) =>
          new Date(a.deadline) <= new Date(b.deadline) ? -1 : 1
        )
      )
      .then(setTasks);
  }, []);

  const handleAddTask = (title: string, deadline: string) => {
    addTask(title, deadline).then((newTask) => setTasks([...tasks, newTask]));
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id).then(() =>
      setTasks(tasks.filter((task) => task._id !== id))
    );
  };

  const handleToggleComplete = (id: string) => {
    console.log(id);
    toggleTaskComplete(id).then((updatedTask) => {
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    });
  };

  return {
    tasks,
    completedTasks,
    handleAddTask,
    handleDeleteTask,
    handleToggleComplete,
  };
};
