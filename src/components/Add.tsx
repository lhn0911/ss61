import React from "react";

interface TaskInputProps {
  newTaskName: string;
  setNewTaskName: (name: string) => void;
  addTask: () => void;
  error: string;
}

export default function TaskInput({
  newTaskName,
  setNewTaskName,
  addTask,
  error,
}: TaskInputProps) {
  return (
    <div className="task-input-box">
      <input
        type="text"
        placeholder="Nhập tên công việc"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        className={error ? "input-error" : ""}
      />
      {error && <div className="error-message">{error}</div>}
      <button onClick={addTask} className="add-task-button">
        Thêm công việc
      </button>
    </div>
  );
}
