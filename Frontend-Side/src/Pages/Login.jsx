import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Pehle se login hai to login page dikhane ki zaroorat nahi
  if (user) return <Navigate to={from} replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login nahi ho paya, dobara try karo");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 px-4 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow-md p-8 rounded-2xl w-full max-w-md">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Welcome back</h1>
          <p className="mt-1 text-gray-500 text-sm">Apne account mein login karo</p>
        </div>

        {error && (
          <p role="alert" className="bg-red-50 p-3 rounded-lg text-red-600 text-sm">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-sm">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 focus:border-indigo-500 rounded-lg outline-none w-full"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-sm">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
              className="px-3 py-2 pr-16 border border-gray-300 focus:border-indigo-500 rounded-lg outline-none w-full"
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="top-1/2 right-3 absolute text-gray-500 text-xs -translate-y-1/2"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 py-2.5 rounded-lg w-full font-semibold text-white transition"
        >
          {submitting ? "Login ho raha hai..." : "Login"}
        </button>

        <p className="text-gray-600 text-sm text-center">
          Account nahi hai?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">Sign up karo</Link>
        </p>
      </form>
    </div>
  );
}
