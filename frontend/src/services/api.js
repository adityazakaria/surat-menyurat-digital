import axios from "axios";

const api = axios.create({
  baseURL: "https://surat-menyurat-digital-x56o.vercel.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
