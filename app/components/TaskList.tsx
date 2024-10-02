import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
}) => (
  <div>
    {tasks.map((task) => (
      <TaskItem
        key={task._id}
        id={task._id}
        title={task.title}
        deadline={task.deadline}
        completed={task.completed}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default TaskList;
