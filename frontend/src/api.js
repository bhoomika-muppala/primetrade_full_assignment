// src/api.js
import axios from "axios";

const base = import.meta.env.VITE_API_URL
  ? (import.meta.env.VITE_API_URL.endsWith("/api")
      ? import.meta.env.VITE_API_URL
      : `${import.meta.env.VITE_API_URL}/api`)
  : "http://localhost:5000/api";

const api = axios.create({
  baseURL: base,
  // timeout: 8000
});

// attach token automatically
api.interceptors.request.use(
  (cfg) => {
    const token = localStorage.getItem("token");
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
  },
  (err) => Promise.reject(err)
);

export default api;
