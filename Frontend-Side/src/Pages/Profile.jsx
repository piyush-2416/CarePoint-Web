import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Khali value ke liye dash dikhao
const show = (v) => (v === undefined || v === null || String(v).trim() === "" ? "—" : v);

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "—";

/* Scoped CSS: sab kuch .pf ke andar, taaki global CSS (reset / Vite default) isse na bigaade */
const css = `
.pf{width:100%;min-height:100vh;padding:40px 20px 64px;text-align:left;color:#0f172a;font-family:inherit;line-height:1.5;
  background:linear-gradient(180deg,#ecfdf5 0%,#f7fffb 320px,#ffffff 100%)}
.pf *,.pf *::before,.pf *::after{box-sizing:border-box}
.pf h1,.pf h2,.pf h3,.pf p{margin:0;padding:0}
.pf button:focus-visible{outline:3px solid rgba(16,185,129,.5);outline-offset:2px}

.pf-wrap{max-width:820px;margin:0 auto;display:flex;flex-direction:column;gap:24px}
.pf-card{background:#fff;border:1px solid #e2e8f0;border-radius:24px;box-shadow:0 10px 28px -18px rgba(15,23,42,.22)}

/* header */
.pf-banner{height:120px;border-radius:24px 24px 0 0;background:linear-gradient(90deg,#14b8a6,#10b981)}
.pf-head{display:flex;align-items:flex-end;gap:22px;padding:0 32px 30px;margin-top:-52px}
.pf-avatar{flex:none;width:104px;height:104px;border-radius:50%;border:4px solid #fff;display:grid;place-items:center;
  background:linear-gradient(135deg,#10b981,#0d9488);color:#fff;font-size:42px;font-weight:700;line-height:1;
  box-shadow:0 8px 18px -8px rgba(15,23,42,.35)}
.pf-info{min-width:0;padding-bottom:6px}
.pf-name-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px}
.pf .pf-name{font-size:1.75rem;font-weight:800;line-height:1.2;letter-spacing:-.01em;color:#0f172a;word-break:break-word}
.pf-badge{padding:4px 12px;border-radius:999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-size:.78rem;font-weight:700;white-space:nowrap}
.pf-email{margin-top:8px;font-size:.92rem;color:#64748b;word-break:break-all}

/* sections */
.pf-sec{padding:28px 32px 32px}
.pf .pf-title{display:flex;align-items:center;gap:12px;font-size:1.1rem;font-weight:800;color:#0f172a}
.pf-title::before{content:"";width:6px;height:22px;border-radius:4px;background:linear-gradient(#10b981,#14b8a6)}
.pf-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:22px}
.pf-field{padding:14px 18px;border:1px solid #edf2f7;border-radius:16px;background:#f8fafc}
.pf-label{display:block;font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#94a3b8}
.pf-value{display:block;margin-top:6px;font-size:.95rem;font-weight:600;color:#1e293b;word-break:break-word}

/* alert */
.pf-alert{padding:14px 20px;border-radius:16px;border:1px solid #fecaca;background:#fef2f2;color:#b91c1c;font-size:.9rem}

/* logout */
.pf-logout{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:24px 32px;border-color:#fee2e2}
.pf .pf-logout h2{font-size:1.1rem;font-weight:800}
.pf-logout p{margin-top:4px;font-size:.9rem;color:#64748b}
.pf button.pf-out{flex:none;padding:12px 30px;border-radius:999px;border:1px solid #fecaca;background:#fef2f2;
  color:#dc2626;font:inherit;font-size:.9rem;font-weight:700;cursor:pointer;transition:background .15s,color .15s,border-color .15s}
.pf button.pf-out:hover{background:#dc2626;border-color:#dc2626;color:#fff}

/* modal */
.pf-overlay{position:fixed;inset:0;z-index:1000;display:flex;justify-content:center;align-items:center;padding:16px;background:rgba(15,23,42,.5)}
.pf-modal{width:100%;max-width:400px;padding:36px 32px 32px;border-radius:24px;background:#fff;text-align:center;box-shadow:0 24px 60px -20px rgba(15,23,42,.5)}
.pf-warn{display:grid;place-items:center;width:60px;height:60px;margin:0 auto;border-radius:50%;background:#fef3c7;font-size:28px}
.pf .pf-modal h3{margin-top:20px;font-size:1.2rem;font-weight:800;color:#0f172a}
.pf-modal p{margin-top:8px;font-size:.92rem;color:#64748b}
.pf-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:28px}
.pf button.pf-no,.pf button.pf-yes{padding:13px 10px;border-radius:14px;font:inherit;font-size:.92rem;font-weight:700;cursor:pointer;transition:background .15s}
.pf button.pf-no{border:1px solid #cbd5e1;background:#fff;color:#334155}
.pf button.pf-no:hover{background:#f1f5f9}
.pf button.pf-yes{border:1px solid #dc2626;background:#dc2626;color:#fff}
.pf button.pf-yes:hover{background:#b91c1c;border-color:#b91c1c}
.pf button:disabled{opacity:.6;cursor:not-allowed}

@media (max-width:640px){
  .pf{padding:24px 14px 48px}
  .pf-head{flex-direction:column;align-items:flex-start;gap:16px;padding:0 20px 24px}
  .pf-sec{padding:24px 20px 26px}
  .pf-grid{grid-template-columns:1fr}
  .pf-logout{flex-direction:column;align-items:stretch;padding:22px 20px}
  .pf button.pf-out{width:100%}
}
`;

function Field({ label, value }) {
  return (
    <div className="pf-field">
      <span className="pf-label">{label}</span>
      <span className="pf-value">{value}</span>
    </div>
  );
}

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const noBtnRef = useRef(null);

  // Modal khula ho to: Escape se band ho, aur focus safe option ("Nahi") par rahe
  useEffect(() => {
    if (!confirmOpen) return;
    noBtnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape" && !loggingOut) setConfirmOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmOpen, loggingOut]);

  if (!user) return <Navigate to="/login" replace />;

  const isDoctor = user.role === "doctor";
  const initial = (user.name || "?").trim().charAt(0).toUpperCase();

  const handleLogout = async () => {
    setLoggingOut(true);
    setError("");
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Logout nahi ho paya, dobara try karo");
      setLoggingOut(false);
      setConfirmOpen(false);
    }
  };

  return (
    <div className="pf">
      <style>{css}</style>

      <div className="pf-wrap">
        {/* ================= Header ================= */}
        <section className="pf-card">
          <div className="pf-banner" />
          <div className="pf-head">
            <div className="pf-avatar" aria-hidden="true">
              {initial}
            </div>
            <div className="pf-info">
              <div className="pf-name-row">
                <h1 className="pf-name">
                  {isDoctor ? "Dr. " : ""}
                  {show(user.name)}
                </h1>
                <span className="pf-badge">{isDoctor ? "🩺 Doctor" : "🧑 Patient"}</span>
              </div>
              <p className="pf-email">📧 {show(user.email)}</p>
            </div>
          </div>
        </section>

        {error && (
          <div role="alert" className="pf-alert">
            ⚠️ {error}
          </div>
        )}

        {/* ================= Account info ================= */}
        <section className="pf-card pf-sec">
          <h2 className="pf-title">Account Information</h2>
          <div className="pf-grid">
            <Field label="Naam" value={show(user.name)} />
            <Field label="Email" value={show(user.email)} />
            <Field label="Role" value={isDoctor ? "Doctor" : "Patient"} />
            <Field label="Account banaya" value={fmtDate(user.createdAt)} />
          </div>
        </section>

        {/* ================= Details ================= */}
        <section className="pf-card pf-sec">
          <h2 className="pf-title">{isDoctor ? "Professional Details" : "Personal Details"}</h2>
          <div className="pf-grid">
            <Field label="Phone" value={show(user.phone)} />
            {isDoctor ? (
              <>
                <Field label="Specialization" value={show(user.specialization)} />
                <Field label="Experience" value={show(user.experience)} />
                <Field label="Hospital / Clinic" value={show(user.hospital)} />
              </>
            ) : (
              <>
                <Field label="Umar" value={show(user.age)} />
                <Field label="Gender" value={show(user.gender)} />
                <Field label="Blood Group" value={show(user.bloodGroup)} />
              </>
            )}
          </div>
        </section>

        {/* ================= Logout ================= */}
        <section className="pf-card pf-logout">
          <div>
            <h2>Logout</h2>
            <p>Is device se apne account se bahar niklo.</p>
          </div>
          <button type="button" className="pf-out" onClick={() => setConfirmOpen(true)}>
            Logout karo
          </button>
        </section>
      </div>

      {/* ================= Logout confirm (Yes / No) ================= */}
      {confirmOpen && (
        <div className="pf-overlay" onClick={() => !loggingOut && setConfirmOpen(false)}>
          <div
            className="pf-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            aria-describedby="logout-desc"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pf-warn" aria-hidden="true">
              ⚠️
            </div>
            <h3 id="logout-title">Kya aap logout karna chahte hain?</h3>
            <p id="logout-desc">Logout karne ke baad dobara login karna padega.</p>

            <div className="pf-actions">
              <button
                ref={noBtnRef}
                type="button"
                className="pf-no"
                onClick={() => setConfirmOpen(false)}
                disabled={loggingOut}
              >
                Nahi
              </button>
              <button type="button" className="pf-yes" onClick={handleLogout} disabled={loggingOut}>
                {loggingOut ? "Ho raha hai..." : "Haan, logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
