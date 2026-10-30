import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { homeFor } from "../utils/roles";

// Yahan apni image ka URL daalo. Khali rahega to gradient dikhega.
const IMAGE_URL = "https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-online-registration_516790-1808.jpg?w=2000";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/15";

const labelCls = "block mb-2 font-semibold text-slate-700 text-sm";

export default function Signup() {
const { user, loading, signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "", role: "patient", inviteCode: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

if (loading) return null;
if (user) return <Navigate to={homeFor(user.role)} replace />;
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8 || !/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) {
      return setError("Password kam se kam 8 characters ka ho, usme letter aur number dono hon");
    }
    if (form.password !== form.confirm) {
      return setError("Dono password same hone chahiye");
    }
    if (form.role === "doctor" && !form.inviteCode.trim()) {
      return setError("Doctor invite code daalo");
    }

    setSubmitting(true);
    try {
      const u = await signup(form.name, form.email, form.password, form.role, form.inviteCode.trim());
      navigate(homeFor(u.role), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Signup nahi ho paya, dobara try karo");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 bg-white min-h-screen">
      {/* ================= LEFT: Image (scroll karne par bhi jagah par rehti hai) ================= */}
      <aside
        className="hidden lg:top-0 relative lg:sticky lg:flex flex-col justify-between bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-600 bg-cover bg-center p-12 xl:p-16 lg:h-screen text-white"
        style={IMAGE_URL ? { backgroundImage: `url(${IMAGE_URL})` } : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

        <Link to="/" className="relative font-bold text-2xl tracking-tight">
          Care<span className="text-emerald-200">Point</span> 🩺
        </Link>

        <div className="relative max-w-md">
          <h2 className="font-bold text-4xl xl:text-5xl leading-tight tracking-tight">
            Ek account, poori healthcare.
          </h2>
          <p className="mt-4 text-emerald-50/90 text-base leading-relaxed">
            Kuch hi seconds mein account banao aur doctors, dawaiyan aur emergency madad tak pahuncho.
          </p>

          <ul className="space-y-3 mt-8 text-emerald-50 text-sm">
            <li className="flex items-center gap-3">
              <span className="flex justify-center items-center bg-white/15 rounded-full w-8 h-8">🩺</span>
              Best doctors se appointment
            </li>
            <li className="flex items-center gap-3">
              <span className="flex justify-center items-center bg-white/15 rounded-full w-8 h-8">👨‍👩‍👧</span>
              Apno ke emergency contacts
            </li>
            <li className="flex items-center gap-3">
              <span className="flex justify-center items-center bg-white/15 rounded-full w-8 h-8">🔒</span>
              Aapka data 100% surakshit
            </li>
          </ul>
        </div>
      </aside>

      {/* ================= RIGHT: Form ================= */}
      <main className="flex justify-center items-center bg-slate-50 lg:bg-white px-6 sm:px-12 py-12 sm:py-16">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="font-bold text-emerald-700 text-2xl tracking-tight">
              Care<span className="text-slate-900">Point</span> 🩺
            </Link>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white lg:bg-transparent shadow-sm lg:shadow-none p-7 sm:p-10 lg:p-0 border border-slate-100 lg:border-0 rounded-3xl"
          >
            <div>
              <h1 className="font-bold text-slate-900 text-3xl tracking-tight">Account banao</h1>
              <p className="mt-2 text-slate-500 text-sm">Kuch hi seconds mein shuru karo</p>
            </div>

            {error && (
              <div className="flex items-start gap-3 bg-red-50 p-4 border border-red-200 rounded-xl text-red-700 text-sm">
                <span aria-hidden="true">⚠️</span>
                <p role="alert">{error}</p>
              </div>
            )}

            {/* Role chuno */}
            <div>
              <span className={labelCls}>Main hoon</span>
              <div className="gap-3 grid grid-cols-2">
                {[
                  ["patient", "🧑 Patient"],
                  ["doctor", "🩺 Doctor"],
                ].map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setForm({ ...form, role: val })}
                    aria-pressed={form.role === val}
                    className={`py-3 rounded-xl border text-sm font-semibold transition-colors ${
                      form.role === val
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="name" className={labelCls}>Naam</label>
              <input
                id="name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={60}
                value={form.name} onChange={handleChange} placeholder="Aapka poora naam" className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelCls}>Email</label>
              <input
                id="email" name="email" type="email" autoComplete="email" required
                value={form.email} onChange={handleChange} placeholder="name@example.com" className={inputCls}
              />
            </div>

            {form.role === "doctor" && (
              <div>
                <label htmlFor="inviteCode" className={labelCls}>Doctor invite code</label>
                <input
                  id="inviteCode" name="inviteCode" type="password" autoComplete="off"
                  value={form.inviteCode} onChange={handleChange} className={inputCls}
                />
                <p className="mt-2 text-slate-400 text-xs">Ye code aapko hospital / admin se milega</p>
              </div>
            )}

            <div>
              <label htmlFor="password" className={labelCls}>Password</label>
              <div className="relative">
                <input
                  id="password" name="password" type={showPass ? "text" : "password"}
                  autoComplete="new-password" required
                  value={form.password} onChange={handleChange}
                  className={`${inputCls} pr-20`}
                />
                <button
                  type="button" onClick={() => setShowPass((s) => !s)}
                  className="top-1/2 right-4 absolute font-medium text-slate-500 hover:text-emerald-700 text-xs -translate-y-1/2"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
              <p className="mt-2 text-slate-400 text-xs">Kam se kam 8 characters, letter aur number dono</p>
            </div>

            <div>
              <label htmlFor="confirm" className={labelCls}>Password dobara</label>
              <input
                id="confirm" name="confirm" type={showPass ? "text" : "password"}
                autoComplete="new-password" required
                value={form.confirm} onChange={handleChange} className={inputCls}
              />
            </div>

            <button
              type="submit" disabled={submitting}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 py-3.5 rounded-xl w-full font-semibold text-white text-sm transition-colors disabled:cursor-not-allowed"
            >
              {submitting ? "Account ban raha hai..." : "Sign up karo"}
            </button>

            <p className="text-slate-600 text-sm text-center">
              Pehle se account hai?{" "}
              <Link to="/login" className="font-semibold text-emerald-700 hover:underline">
                Login karo
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
