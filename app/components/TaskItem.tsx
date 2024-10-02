import React from "react";
import { formatIsoToDeadline, isDateInThePast } from "../utils/dates";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import cx from "classnames";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en");

interface TaskItemProps {
  id: string;
  title: string;
  deadline: string;
  completed: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  deadline,
  completed,
  onToggleComplete,
  onDelete,
}) => (
  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md my-2 gap-4">
    <span className={completed ? "line-through" : ""}>{title}</span>
    <span
      className={cx({
        "line-through": completed,
        "font-bold": isDateInThePast(deadline),
      })}
    >
      Deadline: {formatIsoToDeadline(deadline)} (
      {timeAgo.format(new Date(deadline))})
    </span>
    <div>
      <button
        onClick={() => onToggleComplete(id)}
        className="bg-green-500 text-white px-4 py-2 mr-2 rounded-lg"
      >
        {completed ? "Undo" : "Complete"}
      </button>
      <button
        onClick={() => onDelete(id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Delete
      </button>
    </div>
  </div>
);

export default TaskItem;
