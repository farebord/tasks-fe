"use client";

import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import TaskSummary from "./components/TaskSummary";
import TaskList from "./components/TaskList";
import { generateDeadline, isValidDeadline } from "./utils/dates";

export default function Index() {
  const [title, setTitle] = useState("");
  const [deadline, setDeadLine] = useState("");
  const {
    handleAddTask,
    tasks,
    completedTasks,
    handleDeleteTask,
    handleToggleComplete,
  } = useTasks();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length === 0 || !isValidDeadline(deadline)) {
      alert(
        "Todo task needs to have at least 1 character and deadline needs to be a valid date with the following format: YYYY-MM-DD HH:MM"
      );
      return;
    }
    handleAddTask(title, deadline);
    setTitle("");
    setDeadLine("");
  };

  return (
    <div className="wrapper py-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task"
            className="border p-2 rounded-lg w-7/12"
          />
          <input
            type="text"
            value={deadline}
            onChange={(e) => setDeadLine(e.target.value)}
            placeholder="Deadline (YYYY-MM-DD HH:MM)"
            className="border p-2 w-5/12 rounded-lg"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              setDeadLine(generateDeadline());
            }}
            className="bg-blue-500 text-white w-6/12 px-4 py-2 rounded-lg"
          >
            Random Deadline
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white w-6/12 px-4 py-2 rounded-lg"
          >
            Add Task
          </button>
        </div>
      </form>
      <TaskSummary
        totalCount={tasks.length}
        completedCount={completedTasks.length}
      />
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}
