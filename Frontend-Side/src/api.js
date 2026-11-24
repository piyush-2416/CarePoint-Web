import axios from "axios";

const api = axios.create({
  // Local: seedha backend | Netlify: relative URL (netlify _redirects proxy)
  baseURL: import.meta.env.DEV ? "http://localhost:3000" : "",
  withCredentials: true,
});

// Safety net: agar URL /api se shuru nahi hota to khud laga do
api.interceptors.request.use((config) => {
  if (typeof config.url === "string" && config.url.startsWith("/") && !config.url.startsWith("/api/")) {
    config.url = "/api" + config.url;
  }
  return config;
});

export default api;
