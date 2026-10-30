import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { homeFor } from "../utils/roles";

// Yahan apni image ka URL daalo. Khali rahega to gradient dikhega.
const IMAGE_URL = "https://img.freepik.com/premium-vector/modern-secure-login-interface-with-customizable-options-displayed-alongside-mobile-device-secure-login-customizable-semi-flat-illustration_538213-144391.jpg";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-4 pl-12 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/15";

export default function Login() {
const { user, loading, login } = useAuth();  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
if (loading) return null;
if (user) return <Navigate to={from || homeFor(user.role)} replace />;
  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const u = await login(form.email, form.password);
      navigate(from || homeFor(u.role), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login nahi ho paya, dobara try karo");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 bg-white min-h-screen">
      {/* ================= LEFT: Image ================= */}
      <aside
        className="hidden relative lg:flex flex-col justify-between bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-600 bg-cover bg-center p-12 xl:p-16 text-white"
        style={IMAGE_URL ? { backgroundImage: `url(${IMAGE_URL})` } : undefined}
      >
        {/* Dark overlay taaki text padhne mein aaye */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

        <Link to="/" className="relative font-bold text-2xl tracking-tight">
          Care<span className="text-emerald-200">Point</span> 🩺
        </Link>

        <div className="relative max-w-md">
          <h2 className="font-bold text-4xl xl:text-5xl leading-tight tracking-tight">
            Aapki health, hamari zimmedari.
          </h2>
          <p className="mt-4 text-emerald-50/90 text-base leading-relaxed">
            Doctors, dawaiyan, reports aur emergency madad, sab ek hi jagah.
          </p>

          <ul className="space-y-3 mt-8 text-emerald-50 text-sm">
            <li className="flex items-center gap-3">
              <span className="flex justify-center items-center bg-white/15 rounded-full w-8 h-8">🚑</span>
              24x7 emergency support
            </li>
            <li className="flex items-center gap-3">
              <span className="flex justify-center items-center bg-white/15 rounded-full w-8 h-8">📁</span>
              Reports aur prescriptions surakshit
            </li>
            <li className="flex items-center gap-3">
              <span className="flex justify-center items-center bg-white/15 rounded-full w-8 h-8">🛡️</span>
              AI se safety planning
            </li>
          </ul>
        </div>
      </aside>

      {/* ================= RIGHT: Form ================= */}
      <main className="flex justify-center items-center bg-slate-50 lg:bg-white px-6 sm:px-12 py-12 sm:py-16">
        <div className="w-full max-w-md">
          {/* Mobile par logo yahan dikhega */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="font-bold text-emerald-700 text-2xl tracking-tight">
              Care<span className="text-slate-900">Point</span> 🩺
            </Link>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-7 bg-white lg:bg-transparent shadow-sm lg:shadow-none p-7 sm:p-10 lg:p-0 border border-slate-100 lg:border-0 rounded-3xl"
          >
            <div>
              <h1 className="font-bold text-slate-900 text-3xl tracking-tight">Welcome back</h1>
              <p className="mt-2 text-slate-500 text-sm">
                Apne health account mein login karo
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-3 bg-red-50 p-4 border border-red-200 rounded-xl text-red-700 text-sm">
                <span aria-hidden="true">⚠️</span>
                <p role="alert">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 font-semibold text-slate-700 text-sm">
                  Email
                </label>
                <div className="relative">
                  <span
                    className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2"
                    aria-hidden="true"
                  >
                    ✉️
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2 font-semibold text-slate-700 text-sm">
                  Password
                </label>
                <div className="relative">
                  <span
                    className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2"
                    aria-hidden="true"
                  >
                    🔒
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`${inputCls} pr-20`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="top-1/2 right-4 absolute font-medium text-slate-500 hover:text-emerald-700 text-xs -translate-y-1/2"
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 py-3.5 rounded-xl w-full font-semibold text-white text-sm transition-colors disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex justify-center items-center gap-2">
                  <svg
                    className="w-5 h-5 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Login ho raha hai...
                </span>
              ) : (
                "Login karo"
              )}
            </button>

            <p className="text-slate-600 text-sm text-center">
              Account nahi hai?{" "}
              <Link to="/signup" className="font-semibold text-emerald-700 hover:underline">
                Sign up karo
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
