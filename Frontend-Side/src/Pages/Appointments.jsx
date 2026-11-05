import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../Components/Navbar";

/* ---------- settings ---------- */
const HERO_IMAGE =
  "https://img.freepik.com/premium-photo/patient-doctor-s-office-doctor-visit-consultation-modern-clinic-diagnostics-vector-illustration-flat-cartoon-doctors-appointment_979495-60864.jpg?w=1380";

const STATUS = {
  pending: { label: "Pending", icon: "⏳" },
  accepted: { label: "Accepted", icon: "✅" },
  denied: { label: "Denied", icon: "❌" },
  cancelled: { label: "Cancelled", icon: "🚫" },
};
const FILTERS = [
  ["all", "All"],
  ["pending", "Pending"],
  ["accepted", "Accepted"],
  ["denied", "Denied"],
  ["cancelled", "Cancelled"],
];
const PRIORITY = { pending: 0, accepted: 1 }; // everything else comes after

/* ---------- date helpers ---------- */
const pad = (n) => String(n).padStart(2, "0");
const parseKey = (k) => {
  const [y, m, d] = String(k).split("-").map(Number);
  return new Date(y, m - 1, d);
};
const prettyDate = (k) =>
  parseKey(k).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
const startOf = (a) => {
  const d = parseKey(a.dateKey);
  const m = /(\d+):(\d+)\s*(AM|PM)/i.exec(a.time || "");
  if (!m) return d;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  d.setHours(h, Number(m[2]), 0, 0);
  return d;
};

/* ---------- calendar file (only for accepted) ---------- */
const icsText = (s) => String(s ?? "").replace(/[\r\n,;\\]/g, " ");
function downloadIcs(a) {
  const start = startOf(a);
  const end = new Date(start.getTime() + 30 * 60000);
  const f = (d) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const stamp =
    new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CarePoint//EN",
    "BEGIN:VEVENT",
    `UID:${a._id}@carepoint`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${f(start)}`,
    `DTEND:${f(end)}`,
    `SUMMARY:Appointment with ${icsText(a.doctorName)}`,
    `DESCRIPTION:Patient: ${icsText(a.patientName)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "appointment.ics";
  link.click();
  URL.revokeObjectURL(url);
}

/* ---------- styles (no Tailwind needed) ---------- */
const styles = `
.ap-root{--ink:#0f172a;--muted:#64748b;--line:#e2e8f0;--teal:#0d9488;--teal-d:#0f766e;--teal-l:#ccfbf1;--teal-xl:#f0fdfa;--bg:#f4faf9;
  font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--ink);min-height:100vh;text-align:left}
.ap-root *{box-sizing:border-box}
.ap-root a{text-decoration:none}
.ap-root button{font-family:inherit}

/* ---- hero image (right below the navbar) ---- */
.ap-hero{position:relative;width:100%;height:340px;background:linear-gradient(135deg,#134e4a,#0d9488 60%,#14b8a6);overflow:hidden}
.ap-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
.ap-hero-ph{position:absolute;top:18px;right:24px;color:rgba(255,255,255,.6);font-size:12px;font-weight:600;letter-spacing:.04em}

/* ---- heading card (slightly overlaps the image) ---- */
.ap-headwrap{position:relative;z-index:2;max-width:1000px;margin:-70px auto 0;padding:0 24px}
.ap-headcard{background:#fff;border:1px solid var(--line);border-radius:22px;padding:28px 32px;box-shadow:0 14px 40px rgba(15,23,42,.1);
  display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:20px}
.ap-headcard h1{margin:0;font-size:30px;font-weight:800;letter-spacing:-.02em;line-height:1.2;color:var(--ink)}
.ap-headcard p{margin:10px 0 0;color:var(--muted);font-size:15px;line-height:1.6;max-width:460px}
.ap-head-btns{display:flex;flex-wrap:wrap;gap:12px}

/* ---- layout ---- */
.ap-wrap{max-width:1000px;margin:0 auto;padding:32px 24px 90px}
@media(max-width:600px){
  .ap-hero{height:220px}
  .ap-headwrap{margin-top:-50px;padding:0 16px}
  .ap-headcard{padding:22px 20px;border-radius:18px}
  .ap-headcard h1{font-size:24px}
  .ap-wrap{padding:24px 16px 72px}
}

/* ---- buttons ---- */
.ap-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:0;border-radius:999px;padding:11px 22px;font-size:14px;font-weight:600;cursor:pointer;color:#fff;background:var(--teal);transition:background .2s}
.ap-btn:hover:not(:disabled){background:var(--teal-d)}
.ap-btn:disabled{opacity:.6;cursor:not-allowed}
.ap-btn.ghost{background:#fff;color:#334155;box-shadow:inset 0 0 0 1px #cbd5e1}
.ap-btn.ghost:hover:not(:disabled){background:#f1f5f9}
.ap-btn.green{background:#16a34a}
.ap-btn.green:hover:not(:disabled){background:#15803d}
.ap-btn.red{background:#dc2626}
.ap-btn.red:hover:not(:disabled){background:#b91c1c}
.ap-btn.soft-red{background:#fef2f2;color:#dc2626;box-shadow:inset 0 0 0 1px #fecaca}
.ap-btn.soft-red:hover:not(:disabled){background:#fee2e2}

/* ---- alerts ---- */
.ap-alert{display:flex;align-items:center;gap:12px;padding:16px 20px;border-radius:16px;font-size:14px;line-height:1.5;margin-bottom:20px}
.ap-alert p{margin:0}
.ap-alert.warn{background:#fffbeb;border:1px solid #fde68a;color:#92400e}
.ap-alert.bad{background:#fef2f2;border:1px solid #fecaca;color:#dc2626}

/* ---- filters ---- */
.ap-filters{overflow-x:auto;padding-bottom:4px;margin-bottom:24px}
.ap-filter-bar{display:inline-flex;gap:6px;padding:6px;background:#fff;border:1px solid var(--line);border-radius:18px}
.ap-tab{display:flex;align-items:center;gap:8px;white-space:nowrap;border:0;background:transparent;border-radius:13px;padding:10px 16px;font-size:14px;font-weight:600;color:#475569;cursor:pointer;transition:background .15s,color .15s}
.ap-tab:hover:not(.on){background:#f1f5f9}
.ap-tab.on{background:var(--teal);color:#fff}
.ap-tab em{font-style:normal;font-size:12px;padding:2px 8px;border-radius:999px;background:#f1f5f9;color:#64748b}
.ap-tab.on em{background:rgba(255,255,255,.25);color:#fff}

/* ---- cards ---- */
.ap-list{list-style:none;margin:0;padding:0;display:grid;gap:20px}
.ap-card{background:#fff;border:1px solid var(--line);border-left:4px solid #cbd5e1;border-radius:18px;overflow:hidden;box-shadow:0 4px 18px rgba(15,23,42,.05)}
.ap-card.pending{border-left-color:#fbbf24}
.ap-card.accepted{border-left-color:#22c55e}
.ap-card.denied{border-left-color:#f87171}
.ap-card.cancelled{border-left-color:#cbd5e1}
.ap-top{padding:24px}
@media(max-width:600px){.ap-top{padding:18px}}
.ap-head{display:flex;align-items:flex-start;gap:16px}
.ap-date{display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;width:68px;height:68px;border-radius:16px;background:var(--teal-xl);border:1px solid #99f6e4;color:var(--teal-d)}
.ap-date.muted{background:#f1f5f9;border-color:var(--line);color:#64748b}
.ap-date span{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;line-height:1}
.ap-date b{font-size:26px;font-weight:800;line-height:1;margin-top:6px}
.ap-who{flex:1;min-width:0;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:12px}
.ap-name{margin:0;font-size:19px;font-weight:700;word-break:break-word}
.ap-sub{margin:6px 0 0;color:var(--muted);font-size:14px}
.ap-badge{display:inline-flex;align-items:center;gap:6px;white-space:nowrap;padding:6px 14px;border-radius:999px;border:1px solid;font-size:12px;font-weight:600}
.ap-badge.pending{background:#fffbeb;color:#92400e;border-color:#fde68a}
.ap-badge.accepted{background:#f0fdf4;color:#166534;border-color:#bbf7d0}
.ap-badge.denied{background:#fef2f2;color:#b91c1c;border-color:#fecaca}
.ap-badge.cancelled{background:#f1f5f9;color:#475569;border-color:var(--line)}

.ap-grid{display:grid;gap:12px;margin-top:20px}
@media(min-width:640px){.ap-grid{grid-template-columns:1fr 1fr}}
.ap-detail{background:#f8fafc;border:1px solid #f1f5f9;border-radius:14px;padding:14px 16px}
.ap-detail.full{grid-column:1/-1}
.ap-detail small{display:block;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase}
.ap-detail p{margin:6px 0 0;font-size:14px;font-weight:600;color:#1e293b;word-break:break-word;line-height:1.5}
.ap-detail a{color:var(--teal-d)}
.ap-detail a:hover{text-decoration:underline}

/* ---- footer ---- */
.ap-foot{padding:18px 24px;background:#f8fafc;border-top:1px solid #eef2f6}
@media(max-width:600px){.ap-foot{padding:16px 18px}}
.ap-actions{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.ap-input{width:100%;border:1px solid #cbd5e1;background:#fff;border-radius:12px;padding:13px 16px;font:inherit;font-size:14px;color:var(--ink);outline:none;margin-bottom:14px;transition:border-color .2s,box-shadow .2s}
.ap-input:focus{border-color:#f87171;box-shadow:0 0 0 3px rgba(248,113,113,.15)}
.ap-note{margin:0;color:#94a3b8;font-size:14px}
.ap-link{display:inline-block;color:var(--teal-d);font-size:14px;font-weight:600}
.ap-link:hover{text-decoration:underline}
.ap-link.gap{margin-top:16px}

/* ---- empty / skeleton ---- */
.ap-empty{background:#fff;border:1px dashed #cbd5e1;border-radius:18px;padding:64px 24px;text-align:center}
.ap-empty div{font-size:40px}
.ap-empty p{margin:16px 0 0;color:var(--muted);font-size:15px}
.ap-empty .ap-btn{margin-top:24px}
.ap-skel{background:#fff;border:1px solid var(--line);border-radius:18px;padding:24px;animation:ap-pulse 1.4s ease-in-out infinite}
.ap-skel i{display:block;background:#e2e8f0;border-radius:10px}
@keyframes ap-pulse{50%{opacity:.55}}
@media (prefers-reduced-motion:reduce){.ap-skel{animation:none}.ap-btn,.ap-tab{transition:none}}
`;

/* ---------- small components ---------- */
function Detail({ label, children, full = false }) {
  return (
    <div className={`ap-detail ${full ? "full" : ""}`}>
      <small>{label}</small>
      <p>{children}</p>
    </div>
  );
}

function DateBlock({ dateKey, muted }) {
  const d = parseKey(dateKey);
  return (
    <div className={`ap-date ${muted ? "muted" : ""}`}>
      <span>{d.toLocaleDateString("en-IN", { month: "short" })}</span>
      <b>{d.getDate()}</b>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="ap-list">
      {[0, 1, 2].map((i) => (
        <div key={i} className="ap-skel">
          <div style={{ display: "flex", gap: 16 }}>
            <i style={{ width: 68, height: 68, borderRadius: 16 }} />
            <div style={{ flex: 1, paddingTop: 6 }}>
              <i style={{ height: 16, width: "35%" }} />
              <i
                style={{ height: 12, width: "22%", marginTop: 12, opacity: 0.6 }}
              />
            </div>
          </div>
          <i style={{ height: 52, marginTop: 20, opacity: 0.5 }} />
        </div>
      ))}
    </div>
  );
}

export default function Appointments() {
  const { user } = useAuth();
  const isDoctor = user?.role === "doctor";

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [busyId, setBusyId] = useState(null);
  const [denyId, setDenyId] = useState(null); // doctor: deny confirmation is open
  const [note, setNote] = useState("");
  const [cancelId, setCancelId] = useState(null); // patient: cancel confirmation is open

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    api
      .get("/appointments/mine")
      .then((res) => setList(res.data))
      .catch((e) =>
        setError(e.response?.data?.message || "Could not load appointments"),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ---------- actions ----------
  const decide = async (id, status, noteText = "") => {
    setBusyId(id);
    setError("");
    try {
      const res = await api.patch(`/appointments/${id}/status`, {
        status,
        note: noteText,
      });
      setList((prev) => prev.map((a) => (a._id === id ? res.data : a)));
      setDenyId(null);
      setNote("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update");
      load();
    } finally {
      setBusyId(null);
    }
  };

  const cancel = async (id) => {
    setBusyId(id);
    setError("");
    try {
      const res = await api.patch(`/appointments/${id}/cancel`);
      setList((prev) => prev.map((a) => (a._id === id ? res.data : a)));
    } catch (err) {
      setError(err.response?.data?.message || "Could not cancel");
      load();
    } finally {
      setBusyId(null);
      setCancelId(null);
    }
  };

  // ---------- list ----------
  const counts = useMemo(() => {
    const c = { all: list.length };
    list.forEach((a) => (c[a.status] = (c[a.status] || 0) + 1));
    return c;
  }, [list]);

  const rows = useMemo(() => {
    const f = filter === "all" ? list : list.filter((a) => a.status === filter);
    return [...f].sort((a, b) => {
      const pa = PRIORITY[a.status] ?? 2;
      const pb = PRIORITY[b.status] ?? 2;
      return pa !== pb ? pa - pb : startOf(a) - startOf(b);
    });
  }, [list, filter]);

  const pendingCount = counts.pending || 0;

  return (
    <>
      <style>{styles}</style>
      <Navbar />

      <div className="ap-root">
        {/* ================= HERO IMAGE ================= */}
        <section className="ap-hero">
          {HERO_IMAGE ? (
            <img
              src={HERO_IMAGE}
              alt=""
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <span className="ap-hero-ph">HERO IMAGE GOES HERE</span>
          )}
        </section>

        {/* ================= HEADING CARD ================= */}
        <div className="ap-headwrap">
          <div className="ap-headcard">
            <div>
              <h1>
                📅 {isDoctor ? "Appointment Requests" : "My Appointments"}
              </h1>
              <p>
                {isDoctor
                  ? "Patient requests appear here. Accept or deny them."
                  : "An appointment stays Pending until the doctor accepts it."}
              </p>
            </div>

            <div className="ap-head-btns">
              <button
                type="button"
                className="ap-btn ghost"
                onClick={load}
                disabled={loading}
              >
                {loading ? "Loading..." : "🔄 Refresh"}
              </button>
              {!isDoctor && (
                <Link to="/Doctors" className="ap-btn">
                  ➕ New appointment
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="ap-wrap">
          {/* ---------- Alerts ---------- */}
          {isDoctor && pendingCount > 0 && (
            <div className="ap-alert warn">
              <span style={{ fontSize: 20 }}>⏳</span>
              <p>
                <b>{pendingCount}</b> request{pendingCount > 1 ? "s are" : " is"}{" "}
                waiting for your response.
              </p>
            </div>
          )}

          {error && (
            <div className="ap-alert bad" role="alert">
              <span style={{ fontSize: 20 }}>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* ---------- Filters ---------- */}
          <div className="ap-filters">
            <div className="ap-filter-bar">
              {FILTERS.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFilter(id)}
                  aria-pressed={filter === id}
                  className={`ap-tab ${filter === id ? "on" : ""}`}
                >
                  {label}
                  <em>{counts[id] || 0}</em>
                </button>
              ))}
            </div>
          </div>

          {/* ---------- List ---------- */}
          {loading && list.length === 0 && <Skeleton />}

          {!loading && rows.length === 0 && (
            <div className="ap-empty">
              <div>🗓️</div>
              <p>
                {list.length === 0
                  ? isDoctor
                    ? "No appointment requests yet."
                    : "You have not booked any appointment yet."
                  : "No appointments match this filter."}
              </p>
              {!isDoctor && list.length === 0 && (
                <Link to="/Doctors" className="ap-btn">
                  Choose a doctor
                </Link>
              )}
            </div>
          )}

          <ul className="ap-list">
            {rows.map((a) => {
              const key = STATUS[a.status] ? a.status : "pending";
              const st = STATUS[key];
              const past = startOf(a) < new Date();
              const busy = busyId === a._id;
              const inactive = ["denied", "cancelled"].includes(a.status);

              const showDoctorActions = isDoctor && a.status === "pending";
              const showPatientActions =
                !isDoctor &&
                ["pending", "accepted"].includes(a.status) &&
                !past;
              const showFooter =
                showDoctorActions || showPatientActions || isDoctor;

              return (
                <li key={a._id} className={`ap-card ${key}`}>
                  {/* ----- top ----- */}
                  <div className="ap-top">
                    <div className="ap-head">
                      <DateBlock dateKey={a.dateKey} muted={inactive} />

                      <div className="ap-who">
                        <div style={{ minWidth: 0 }}>
                          <p className="ap-name">
                            {isDoctor ? a.patientName : a.doctorName}
                          </p>
                          <p className="ap-sub">
                            {isDoctor
                              ? "Patient"
                              : a.specialization || "Doctor"}
                          </p>
                        </div>
                        <span className={`ap-badge ${key}`}>
                          <span>{st.icon}</span>
                          {st.label}
                        </span>
                      </div>
                    </div>

                    <div className="ap-grid">
                      <Detail label="Date">{prettyDate(a.dateKey)}</Detail>
                      <Detail label="Time">🕒 {a.time}</Detail>
                      {isDoctor && (
                        <Detail label="Phone">
                          <a href={`tel:${a.phone}`}>📞 {a.phone}</a>
                        </Detail>
                      )}
                      {a.reason && (
                        <Detail label="Problem" full={!isDoctor}>
                          {a.reason}
                        </Detail>
                      )}
                      {a.doctorNote && (
                        <Detail label="Doctor's note" full>
                          {a.doctorNote}
                        </Detail>
                      )}
                    </div>
                  </div>

                  {/* ----- footer ----- */}
                  {showFooter && (
                    <div className="ap-foot">
                      {/* Doctor: deny confirm */}
                      {showDoctorActions && denyId === a._id && (
                        <div>
                          <input
                            className="ap-input"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            maxLength={200}
                            placeholder="Add a reason (optional), e.g. I am on leave that day"
                          />
                          <div className="ap-actions">
                            <button
                              type="button"
                              className="ap-btn red"
                              disabled={busy}
                              onClick={() => decide(a._id, "denied", note)}
                            >
                              {busy ? "Working..." : "Yes, deny"}
                            </button>
                            <button
                              type="button"
                              className="ap-btn ghost"
                              disabled={busy}
                              onClick={() => {
                                setDenyId(null);
                                setNote("");
                              }}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Doctor: accept / deny */}
                      {showDoctorActions && denyId !== a._id && (
                        <>
                          {past ? (
                            <p className="ap-note">
                              ⌛ This time has already passed.
                            </p>
                          ) : (
                            <div className="ap-actions">
                              <button
                                type="button"
                                className="ap-btn green"
                                disabled={busy}
                                onClick={() => decide(a._id, "accepted")}
                              >
                                {busy ? "Working..." : "✅ Accept"}
                              </button>
                              <button
                                type="button"
                                className="ap-btn soft-red"
                                disabled={busy}
                                onClick={() => {
                                  setDenyId(a._id);
                                  setNote("");
                                }}
                              >
                                ❌ Deny
                              </button>
                            </div>
                          )}
                        </>
                      )}

                      {/* Patient: calendar + cancel */}
                      {showPatientActions && (
                        <div className="ap-actions">
                          {a.status === "accepted" && (
                            <button
                              type="button"
                              className="ap-btn ghost"
                              onClick={() => downloadIcs(a)}
                            >
                              📆 Add to calendar
                            </button>
                          )}
                          {cancelId === a._id ? (
                            <>
                              <button
                                type="button"
                                className="ap-btn red"
                                disabled={busy}
                                onClick={() => cancel(a._id)}
                              >
                                {busy ? "Working..." : "Yes, cancel"}
                              </button>
                              <button
                                type="button"
                                className="ap-btn ghost"
                                disabled={busy}
                                onClick={() => setCancelId(null)}
                              >
                                No
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              className="ap-btn soft-red"
                              onClick={() => setCancelId(a._id)}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      )}

                      {/* Doctor: patient detail link */}
                      {isDoctor && (
                        <Link
                          to={`/doctor/patients/${a.patientId}`}
                          className={`ap-link ${showDoctorActions ? "gap" : ""}`}
                        >
                          View patient details →
                        </Link>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
