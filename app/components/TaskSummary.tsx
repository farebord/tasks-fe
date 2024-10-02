import React from 'react';

interface TaskSummaryProps {
  completedCount: number;
  totalCount: number;
}

const TaskSummary: React.FC<TaskSummaryProps> = ({
  completedCount,
  totalCount,
}) => (
  <div className="text-center my-4">
    <p>Completed Tasks: {completedCount}</p>
    <p>Total Tasks: {totalCount}</p>
  </div>
);

export default TaskSummary;
