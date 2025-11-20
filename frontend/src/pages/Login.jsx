// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault?.();
    console.log("Login attempt ->", { email, password });

    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("Login success:", res.data);

      localStorage.setItem("token", res.data.token);
      // optional: store user
      localStorage.setItem("user", JSON.stringify(res.data.user || {}));

      alert("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      const message =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.message ||
        "Login failed";
      alert("Login failed: " + message);
    }
  };

  return (
    <div className="container" style={{ paddingTop: 28 }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
