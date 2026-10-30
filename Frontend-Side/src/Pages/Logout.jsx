import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    logout()
      .then(() => navigate("/login", { replace: true }))
      .catch(() => setError("Logout nahi ho paya. Backend chalu hai?"));
  }, [logout, navigate]);

  if (error) return <p className="py-24 text-red-500 text-center">{error}</p>;
  return <p className="py-24 text-center">Logout ho raha hai...</p>;
}

