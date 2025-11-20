// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks");
      // Backend might return { tasks: [...] } or array — handle both
      setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || []);
    } catch (err) {
      console.error("Load tasks error", err);
      alert("Failed to load tasks: " + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  const createTask = async (payload) => {
    try {
      const res = await api.post("/tasks", payload);
      setTasks((s) => [res.data, ...s]);
    } catch (err) {
      console.error("Create task error", err);
      alert("Failed to create task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((s) => s.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete error", err);
      alert("Failed to delete task");
    }
  };

  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === "done" ? "pending" : "done";
      const res = await api.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks((s) => s.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error("Toggle status error", err);
      alert("Failed to update task");
    }
  };

  const editTask = async (id, changes) => {
    try {
      const res = await api.put(`/tasks/${id}`, changes);
      setTasks((s) => s.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Edit error", err);
      alert("Failed to edit task");
    }
  };

  return (
    <div className="container" style={{ paddingTop: 28 }}>
      <h1>Dashboard (Tasks)</h1>

      <section style={{ marginBottom: 20 }}>
        <h2>Create Task</h2>
        <TaskForm onCreated={createTask} />
      </section>

      <section>
        <h2>Your Tasks</h2>
        {loading ? <div>Loading...</div> : (
          <TaskList tasks={tasks} onDelete={deleteTask} onToggleStatus={toggleStatus} onEdit={editTask} />
        )}
      </section>
    </div>
  );
}
