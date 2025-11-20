// src/components/TaskList.jsx
import React from "react";

export default function TaskList({ tasks = [], onDelete, onToggleStatus, onEdit }) {
  if (!tasks.length) return <div>No tasks yet.</div>;

  return (
    <div style={{ maxWidth: 880 }}>
      {tasks.map((t) => (
        <div key={t._id} className="task-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="task-title">{t.title}</div>
            <div className="task-desc">{t.description}</div>
            <div className="task-meta">Status: {t.status}</div>
          </div>

          <div className="actions">
            <button onClick={() => onToggleStatus(t)}>{t.status === "done" ? "Mark Pending" : "Mark Done"}</button>
            <button onClick={() => {
              const newTitle = prompt("Edit title", t.title);
              if (newTitle !== null) {
                const newDesc = prompt("Edit description", t.description);
                onEdit(t._id, { title: newTitle, description: newDesc });
              }
            }}>Edit</button>
            <button onClick={() => { if (confirm("Delete this task?")) onDelete(t._id); }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
