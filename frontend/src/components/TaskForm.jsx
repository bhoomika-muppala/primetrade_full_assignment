// src/components/TaskForm.jsx
import React, { useState } from "react";

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");
    setSaving(true);
    try {
      await onCreated({ title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 720 }}>
      <div className="form-row">
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-row">
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit" className="primary" disabled={saving}>
        {saving ? "Saving..." : "Create Task"}
      </button>
    </form>
  );
}
