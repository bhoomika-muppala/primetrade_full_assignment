// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      console.log("registered:", res.data);
      alert("Registration successful! Now login.");
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      const message =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.message ||
        "Registration failed";
      alert("Registration failed: " + message);
    }
  };

  return (
    <div className="container" style={{ paddingTop: 28 }}>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="primary">
          Register
        </button>
      </form>
    </div>
  );
}
