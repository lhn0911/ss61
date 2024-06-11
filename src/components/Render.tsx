import React from "react";

interface TaskData {
  id: number;
  name: string;
  status: boolean;
}

interface TaskListProps {
  tasks: TaskData[];
  confirmDeleteTask: (task: TaskData) => void;
  toggleTaskCompletion: (taskId: number) => void;
  confirmEditTask: (task: TaskData) => void; // Add this line
  filterType: string;
}

export default function Render({
  tasks,
  confirmDeleteTask,
  toggleTaskCompletion,
  confirmEditTask, // Add this line
  filterType,
}: TaskListProps) {
  const filteredTasks = tasks.filter((task) => {
    if (filterType === "completed") {
      return task.status;
    } else if (filterType === "inProgress") {
      return !task.status;
    } else {
      return true;
    }
  });

  return (
    <div className="task-list-box">
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.status ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={task.status}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span>{task.name}</span>
            <button
              className="edit-button"
              onClick={() => confirmEditTask(task)}
            >
              <span className="material-symbols-outlined">edit_square</span>
            </button>
            <button
              className="delete-button"
              onClick={() => confirmDeleteTask(task)}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
