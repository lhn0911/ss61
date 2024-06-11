import axios from "axios";
import React, { useState, useEffect } from "react";
import Add from "./Add";
import Render from "./Render";
import Hoanthanh from "./Hoanthanh";
import Delete from "./Delete";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";

interface Task {
  id: number;
  name: string;
  status: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [error, setError] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [showEditModal, setShowEditModal] = useState<boolean>(false); // State to show/hide edit modal
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null); // Task to be edited
  const [editTaskName, setEditTaskName] = useState<string>(""); // Name of the task being edited

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:3000/job")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
      });
  };

  const addTask = () => {
    if (!newTaskName.trim()) {
      setError("Tên công việc không được để trống!");
      return;
    }
    const newTask: Task = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      name: newTaskName,
      status: false,
    };

    axios
      .post("http://localhost:3000/job", newTask)
      .then((res) => {
        setTasks([...tasks, newTask]);
        setNewTaskName("");
        setError("");
      })
      .catch((err) => {
        console.error("Error adding task:", err);
      });
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      axios
        .delete(`http://localhost:3000/job/${taskToDelete.id}`)
        .then((res) => {
          setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
          setShowDeleteModal(false);
          setTaskToDelete(null);
        })
        .catch((err) => {
          console.error("Error deleting task:", err);
        });
    }
  };

  const confirmDeleteTask = (task: Task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: !task.status,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilterType(newFilter);
  };

  const confirmEditTask = (task: Task) => {
    setTaskToEdit(task);
    setEditTaskName(task.name);
    setShowEditModal(true);
  };

  const handleEditTask = () => {
    if (taskToEdit && editTaskName.trim()) {
      axios
        .put(`http://localhost:3000/job/${taskToEdit.id}`, {
          ...taskToEdit,
          name: editTaskName,
        })
        .then((res) => {
          const updatedTasks = tasks.map((task) =>
            task.id === taskToEdit.id ? { ...task, name: editTaskName } : task
          );
          setTasks(updatedTasks);
          setShowEditModal(false);
          setTaskToEdit(null);
          setEditTaskName("");
        })
        .catch((err) => {
          console.error("Error editing task:", err);
        });
    }
  };

  return (
    <div className="outer-container">
      <div className="todo-list-container">
        <h2>Quản lý công việc</h2>
        <Add
          newTaskName={newTaskName}
          setNewTaskName={setNewTaskName}
          addTask={addTask}
          error={error}
        />
        <Hoanthanh filterTasks={handleFilterChange} />
        <Render
          tasks={tasks}
          confirmDeleteTask={confirmDeleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
          confirmEditTask={confirmEditTask}
          filterType={filterType}
        />
        <Delete />
        <ModalDelete
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          taskToDelete={taskToDelete}
          handleDeleteTask={handleDeleteTask}
        />
        <ModalEdit
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          editTaskName={editTaskName}
          setEditTaskName={setEditTaskName}
          handleEditTask={handleEditTask}
        />
      </div>
    </div>
  );
}
