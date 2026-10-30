import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { homeFor } from "../utils/roles";

// roles = in roles ko hi allow karo (login zaroori)
// deny  = in roles ko rok do (login zaroori nahi, public pages ke liye)
export default function ProtectedRoute({ children, roles, deny }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="py-24 text-center">Loading...</p>;

  if (roles) {
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    if (!roles.includes(user.role)) return <Navigate to={homeFor(user.role)} replace />;
  }

  if (deny && user && deny.includes(user.role)) {
    return <Navigate to={homeFor(user.role)} replace />;
  }

  return children;
}
