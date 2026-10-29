import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="py-24 text-center">Loading...</p>;

  // Login nahi hai to /login bhejo, login ke baad wapas yahin aayega
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
}
