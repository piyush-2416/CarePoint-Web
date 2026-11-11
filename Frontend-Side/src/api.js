import axios from "axios";

const api = axios.create({
  // Local (npm run dev): seedha local backend
  // Netlify (production): relative URL, jise _redirects Render ko bhej deta hai
  baseURL: import.meta.env.DEV ? "http://localhost:3000" : "",
  withCredentials: true, // cookie har request ke saath jaayegi
});

export default api;
