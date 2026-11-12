import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.DEV ? "http://localhost:3000" : "",
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:3000" : ""),
  withCredentials: true, // cookie har request ke saath jaayegi
});

// Safety net: agar URL /api se shuru nahi hota to khud laga do
api.interceptors.request.use((config) => {
  if (typeof config.url === "string" && config.url.startsWith("/") && !config.url.startsWith("/api/")) {
    config.url = "/api" + config.url;
  }
  return config;
});

export default api;
