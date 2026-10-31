import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // refresh par check hone tak true

  // Page khulte hi cookie se pata karo ki login hai ya nahi
  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.user);
    return res.data.user;
  }, []);
const updateProfile = useCallback(async (data) => {
  const res = await api.put("/auth/me", data);
  setUser(res.data.user);
  return res.data.user;
}, []);
  const signup = useCallback(async (name, email, password, role = "patient", inviteCode = "") => {
  const res = await api.post("/auth/signup", { name, email, password, role, inviteCode });
  setUser(res.data.user);
  return res.data.user;
}, []);
  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  }, []);

  return (
  

    // <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}></AuthContext.Provider>
//     const updateProfile = useCallback(async (data) => {
//   const res = await api.put("/auth/me", data);
//   setUser(res.data.user);
//   return res.data.user;
// }, []); 
 <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth ko AuthProvider ke andar use karo");
  return ctx;
}
