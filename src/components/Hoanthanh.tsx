import React, { useState } from "react";

interface TaskFilterProps {
  filterTasks: (filter: string) => void;
}

export default function TaskFilter({ filterTasks }: TaskFilterProps) {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    filterTasks(newFilter);
  };

  return (
    <div className="task-filter-box">
      <button
        className={`filter-button ${filter === "all" ? "active" : ""}`}
        onClick={() => handleFilterChange("all")}
      >
        Tất cả
      </button>
      <button
        className={`filter-button ${filter === "completed" ? "active" : ""}`}
        onClick={() => handleFilterChange("completed")}
      >
        Hoàn thành
      </button>
      <button
        className={`filter-button ${filter === "inProgress" ? "active" : ""}`}
        onClick={() => handleFilterChange("inProgress")}
      >
        Đang thực hiện
      </button>
    </div>
  );
}
