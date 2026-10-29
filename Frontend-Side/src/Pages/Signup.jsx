import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend par jaldi check (asli validation backend par bhi hota hai)
    if (form.password.length < 8 || !/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) {
      return setError("Password kam se kam 8 characters ka ho, usme letter aur number dono hon");
    }
    if (form.password !== form.confirm) {
      return setError("Dono password same hone chahiye");
    }

    setSubmitting(true);
    try {
      await signup(form.name, form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Signup nahi ho paya, dobara try karo");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 px-4 py-10 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow-md p-8 rounded-2xl w-full max-w-md">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Account banao</h1>
          <p className="mt-1 text-gray-500 text-sm">Kuch hi seconds mein shuru karo</p>
        </div>

        {error && (
          <p role="alert" className="bg-red-50 p-3 rounded-lg text-red-600 text-sm">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="name" className="block mb-1 font-medium text-sm">Naam</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={60}
            value={form.name}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 focus:border-indigo-500 rounded-lg outline-none w-full"
          />
        </div>

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
              autoComplete="new-password"
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
          <p className="mt-1 text-gray-400 text-xs">Kam se kam 8 characters, letter aur number dono</p>
        </div>

        <div>
          <label htmlFor="confirm" className="block mb-1 font-medium text-sm">Password dobara</label>
          <input
            id="confirm"
            name="confirm"
            type={showPass ? "text" : "password"}
            autoComplete="new-password"
            required
            value={form.confirm}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 focus:border-indigo-500 rounded-lg outline-none w-full"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 py-2.5 rounded-lg w-full font-semibold text-white transition"
        >
          {submitting ? "Account ban raha hai..." : "Sign up"}
        </button>

        <p className="text-gray-600 text-sm text-center">
          Pehle se account hai?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">Login karo</Link>
        </p>
      </form>
    </div>
  );
}
