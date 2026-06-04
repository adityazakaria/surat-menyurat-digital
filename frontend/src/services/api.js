import axios from "axios";

const api = axios.create({
  baseURL:
    "https://surat-menyurat-digital-3yw6-6t3v8rnga-adityaz-s-projects.vercel.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
