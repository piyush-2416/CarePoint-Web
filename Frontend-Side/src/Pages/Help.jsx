import React, { useEffect, useMemo, useState } from "react";

// Image frontend ke public folder me rakho: public/help-banner.jpg
const HERO_IMG = "https://img.magnific.com/premium-vector/community-care-icons-team-help-illustration_911078-7836.jpg?semt=ais_hybrid&w=740&q=80";

const STORAGE_KEY = "carepoint-help-requests";

const HELP_TYPES = [
  "Blood needed",
  "Medicine",
  "Treatment cost",
  "Transport",
  "Caregiver",
  "Other",
];

const TYPE_ICONS = {
  "Blood needed": "🩸",
  Medicine: "💊",
  "Treatment cost": "💰",
  Transport: "🚑",
  Caregiver: "🤝",
  Other: "🙋",
};

// ---------- localStorage helpers (error aaye to app na toote) ----------
function loadRequests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRequests(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* storage full ya blocked, ignore */
  }
}

// ---------- small helpers ----------
// Phone ko 10 digit me badalta hai (+91, spaces, dashes hata deta hai). Galat ho to null.
function normalizePhone(value) {
  let d = value.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  return d.length === 10 ? d : null;
}

function formatPhone(d) {
  return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Is page ka poora CSS yahin hai (Tailwind / global CSS par depend nahi).
// Sab classes "help-" se shuru hoti hain, isliye baaki pages ko affect nahi karengi.
const CSS = `
.help-page, .help-page *, .help-page *::before, .help-page *::after { box-sizing: border-box; }
.help-page {
  --bg: #eaf9f9; --cyan: #45d2d2; --cyan-bright: #17c8c8;
  --deep: #0b6b6b; --deep-dark: #095555; --ink: #053d3d; --ink-soft: #0a5f5f; --field: #f4fcfc;
  display: block; width: 100%; min-height: 100vh; align-self: stretch;
  background: var(--bg); color: var(--ink);
  text-align: left; font-size: 16px; line-height: 1.5;
}
.help-page :where(h1, h2, p, ul) { margin: 0; padding: 0; }
.help-page :where(ul) { list-style: none; }

.help-wrap { width: 100%; max-width: 1024px; margin: 0 auto; padding: 0 16px; }

/* ---------- Buttons ---------- */
.help-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px 24px; border: 2px solid transparent; border-radius: 999px;
  font: inherit; font-weight: 600; text-decoration: none; cursor: pointer;
  transition: background-color .2s ease;
}
.help-btn-solid { background: var(--cyan-bright); color: #fff; }
.help-btn-solid:hover { background: #12b0b0; }
.help-btn-outline { background: transparent; border-color: var(--cyan-bright); color: #fff; }
.help-btn-outline:hover { background: rgba(255,255,255,.12); }
.help-btn-deep { background: var(--deep); color: #fff; }
.help-btn-deep:hover { background: var(--deep-dark); }
.help-btn:focus-visible, .help-chip:focus-visible, .help-sbtn:focus-visible, .help-link:focus-visible {
  outline: 3px solid var(--deep); outline-offset: 2px;
}

/* ---------- Hero ---------- */
.help-hero {
  padding: 64px 0 128px; text-align: center; color: #fff;
  background-color: var(--deep); background-size: cover; background-position: center;
}
.help-hero .help-wrap { display: flex; flex-direction: column; align-items: center; }
.help-hero h1 { font-size: 2.25rem; font-weight: 600; line-height: 1.15; }
.help-hero h1 span { color: var(--cyan-bright); }
.help-hero-sub { margin-top: 12px; font-size: 1.125rem; color: rgba(255,255,255,.92); }
.help-ecg { display: flex; align-items: center; gap: 8px; margin-top: 20px; }
.help-ecg i { display: block; width: 64px; height: 1px; background: var(--cyan-bright); }
.help-hero-text { max-width: 560px; margin-top: 20px; font-size: .9rem; color: rgba(255,255,255,.85); }
.help-hero-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 32px; }

/* ---------- Main ---------- */
.help-main { position: relative; z-index: 1; margin: -80px auto 0; padding-bottom: 64px; }
.help-card {
  background: #fff; border: 1px solid rgba(69,210,210,.4); border-radius: 16px;
  box-shadow: 0 1px 3px rgba(5,61,61,.08);
}

/* ---------- Form ---------- */
.help-form { padding: 20px; scroll-margin-top: 96px; box-shadow: 0 10px 30px rgba(5,61,61,.15); }
.help-h2 { font-size: 1.25rem; font-weight: 700; line-height: 1.3; }
.help-form-sub { margin-top: 4px; font-size: .875rem; color: var(--ink-soft); }
.help-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 24px; }
.help-span2 { grid-column: 1 / -1; }
.help-label { display: block; margin-bottom: 6px; font-size: .875rem; font-weight: 600; text-align: left; }
.help-label small { font-size: .875rem; font-weight: 400; color: var(--ink-soft); }
.help-field {
  display: block; width: 100%; padding: 12px 16px;
  border: 1px solid rgba(69,210,210,.7); border-radius: 12px;
  background: var(--field); color: var(--ink); font: inherit; outline: none;
}
.help-field::placeholder { color: rgba(10,95,95,.6); }
.help-field:focus { border-color: var(--deep); box-shadow: 0 0 0 3px rgba(69,210,210,.4); }
textarea.help-field { resize: vertical; min-height: 96px; }
.help-counter { margin-top: 4px; font-size: .75rem; text-align: right; color: var(--ink-soft); }

.help-notice {
  margin-top: 20px; padding: 12px 16px; border-radius: 12px;
  background: rgba(69,210,210,.18); font-size: .875rem; color: var(--ink);
}
.help-error { margin-top: 20px; padding: 12px 16px; border-radius: 12px; background: #fef2f2; color: #b91c1c; font-size: .875rem; }
.help-form-actions { display: flex; margin-top: 24px; }
.help-form-actions .help-btn { width: 100%; padding: 12px 32px; }

/* ---------- Requests ---------- */
.help-list-section { margin-top: 48px; scroll-margin-top: 96px; }
.help-list-head { display: flex; flex-direction: column; gap: 4px; }
.help-count { font-size: .875rem; color: var(--ink-soft); }
.help-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.help-chip {
  padding: 6px 16px; border: 1px solid var(--cyan); border-radius: 999px;
  background: #fff; color: var(--ink); font: inherit; font-size: .875rem; font-weight: 600; cursor: pointer;
  transition: background-color .2s ease;
}
.help-chip:hover { background: rgba(69,210,210,.3); }
.help-chip.active { background: var(--deep); border-color: var(--deep); color: #fff; }

.help-list { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 24px; }
.help-item { display: flex; flex-direction: column; padding: 20px; }
.help-item.resolved { opacity: .65; }
.help-item-head { display: flex; align-items: flex-start; gap: 12px; }
.help-avatar {
  flex: 0 0 48px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
  border-radius: 50%; background: var(--deep); color: #fff; font-size: 1.25rem; font-weight: 700;
}
.help-item-info { min-width: 0; flex: 1; }
.help-name { font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.help-meta { margin-top: 2px; font-size: .75rem; color: var(--ink-soft); }
.help-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.help-badge { padding: 4px 12px; border-radius: 999px; background: rgba(69,210,210,.25); font-size: .75rem; font-weight: 600; }
.help-badge-urgent { background: #fee2e2; color: #b91c1c; }
.help-badge-done { background: #dcfce7; color: #166534; }
.help-message { margin-top: 12px; font-size: .9rem; color: #374151; white-space: pre-wrap; overflow-wrap: anywhere; }

.help-contact { margin-top: auto; padding-top: 16px; }
.help-contact-box {
  padding: 12px 14px; border-radius: 12px; background: var(--field);
  border: 1px solid rgba(69,210,210,.5); font-size: .875rem;
}
.help-contact-box strong { display: block; font-size: 1rem; }
.help-contact-box span { display: block; margin-top: 2px; font-size: .75rem; color: var(--ink-soft); }
.help-contact-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px; }
.help-sbtn {
  display: block; padding: 9px 0; border: 0; border-radius: 999px; text-align: center; text-decoration: none;
  font: inherit; font-size: .875rem; font-weight: 600; cursor: pointer; transition: background-color .2s ease;
}
.help-sbtn-call { background: var(--deep); color: #fff; }
.help-sbtn-call:hover { background: var(--deep-dark); }
.help-sbtn-wa { background: #25d366; color: #053d1f; }
.help-sbtn-wa:hover { background: #1fb858; }
.help-item-foot {
  display: flex; justify-content: space-between; gap: 12px; margin-top: 14px; padding-top: 12px;
  border-top: 1px solid rgba(69,210,210,.35);
}
.help-link {
  padding: 0; border: 0; background: none; font: inherit; font-size: .8125rem; font-weight: 600;
  color: var(--ink-soft); cursor: pointer; text-decoration: underline;
}
.help-link-del { color: #b91c1c; }

.help-empty {
  margin-top: 24px; padding: 48px 24px; text-align: center;
  border: 2px dashed var(--cyan); border-radius: 16px; background: rgba(255,255,255,.6);
}
.help-empty-icon { font-size: 2.25rem; line-height: 1.2; }
.help-empty-title { margin-top: 12px; font-weight: 600; }
.help-empty-text { margin-top: 4px; font-size: .875rem; color: var(--ink-soft); }

@media (min-width: 640px) {
  .help-wrap { padding: 0 24px; }
  .help-hero { padding: 96px 0 160px; }
  .help-hero h1 { font-size: 3.75rem; }
  .help-hero-sub { font-size: 1.5rem; }
  .help-hero-text { font-size: 1rem; }
  .help-ecg i { width: 112px; }
  .help-form { padding: 32px; }
  .help-h2 { font-size: 1.5rem; }
  .help-form-actions { justify-content: flex-end; }
  .help-form-actions .help-btn { width: auto; }
  .help-list-head { flex-direction: row; justify-content: space-between; align-items: flex-end; }
}
@media (min-width: 768px) {
  .help-grid { grid-template-columns: 1fr 1fr; }
  .help-list { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1024px) {
  .help-wrap { padding: 0 32px; }
}
@media (prefers-reduced-motion: reduce) {
  .help-btn, .help-chip, .help-sbtn { transition: none; }
}
`;

const MAX_MESSAGE = 300;

function Help() {
  // localStorage se pehli baar load
  const [requests, setRequests] = useState(loadRequests);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState(HELP_TYPES[0]);
  const [urgency, setUrgency] = useState("Normal");
  const [message, setMessage] = useState("");

  // Har change par localStorage me save
  useEffect(() => {
    saveRequests(requests);
  }, [requests]);

  // Dusre tab me change ho to yahan bhi update ho jaye
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setRequests(loadRequests());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const cleanPhone = normalizePhone(phone);
    if (!name.trim()) return setError("Please enter your name.");
    if (!cleanPhone) return setError("Please enter a valid 10-digit phone number.");
    if (!city.trim()) return setError("Please enter your city or area.");
    if (message.trim().length < 10) return setError("Please describe what help you need (at least 10 characters).");

    const newRequest = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
      phone: cleanPhone,
      city: city.trim(),
      type,
      urgency,
      message: message.trim(),
      resolved: false,
      createdAt: new Date().toISOString(),
    };

    setRequests([newRequest, ...requests]);
    setName("");
    setPhone("");
    setCity("");
    setType(HELP_TYPES[0]);
    setUrgency("Normal");
    setMessage("");
    setFilter("All");
    setTimeout(() => scrollToId("requests-section"), 50);
  };

  const toggleResolved = (id) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, resolved: !r.resolved } : r)));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this request?")) return;
    setRequests(requests.filter((r) => r.id !== id));
  };

  const shown = useMemo(
    () => (filter === "All" ? requests : requests.filter((r) => r.type === filter)),
    [requests, filter]
  );
  const openCount = shown.filter((r) => !r.resolved).length;

  return (
    <div className="help-page">
      <style>{CSS}</style>

      {/* ================= HERO ================= */}
      <section
        className="help-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(5,61,61,0.55), rgba(5,61,61,0.85)), url(${HERO_IMG})`,
        }}
      >
        <div className="help-wrap">
          <h1>
            Patient <span>Help</span>
          </h1>
          <p className="help-hero-sub">Ask for help, or be the help</p>

          <div className="help-ecg" aria-hidden="true">
            <i />
            <svg width="28" height="18" viewBox="0 0 28 18" fill="none" stroke="#17c8c8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 9h6l2-6 4 12 3-9 2 3h9" />
            </svg>
            <i />
          </div>

          <p className="help-hero-text">
            Post what you need, and other patients can see your request and
            contact you directly. You can also help someone else who has posted.
          </p>

          <div className="help-hero-actions">
            <button type="button" className="help-btn help-btn-solid" onClick={() => scrollToId("help-form")}>
              <span aria-hidden="true">🙋</span> Ask for help
            </button>
            <button type="button" className="help-btn-outline help-btn" onClick={() => scrollToId("requests-section")}>
              <span aria-hidden="true">🤝</span> Help someone
            </button>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="help-wrap help-main">
        {/* ---------- Form ---------- */}
        <form id="help-form" className="help-card help-form" onSubmit={handleSubmit}>
          <h2 className="help-h2">Ask for help</h2>
          <p className="help-form-sub">Tell people what you need and how to reach you.</p>

          <div className="help-grid">
            <div>
              <label htmlFor="help-name" className="help-label">Your name</label>
              <input
                id="help-name"
                type="text"
                className="help-field"
                placeholder="e.g. Rahul Sharma"
                maxLength={60}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="help-phone" className="help-label">Phone number</label>
              <input
                id="help-phone"
                type="tel"
                inputMode="tel"
                className="help-field"
                placeholder="e.g. 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="help-city" className="help-label">City / area</label>
              <input
                id="help-city"
                type="text"
                className="help-field"
                placeholder="e.g. Ghaziabad"
                maxLength={60}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="help-type" className="help-label">Type of help</label>
              <select
                id="help-type"
                className="help-field"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {HELP_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="help-span2">
              <label htmlFor="help-urgency" className="help-label">How urgent is it?</label>
              <select
                id="help-urgency"
                className="help-field"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
              >
                <option>Normal</option>
                <option>Urgent</option>
              </select>
            </div>

            <div className="help-span2">
              <label htmlFor="help-message" className="help-label">
                What help do you need? <small>(be specific)</small>
              </label>
              <textarea
                id="help-message"
                rows={4}
                className="help-field"
                placeholder="e.g. Need 2 units of B+ blood at City Hospital by tomorrow morning"
                maxLength={MAX_MESSAGE}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="help-counter">{message.length}/{MAX_MESSAGE}</p>
            </div>
          </div>

          <p className="help-notice">
            Your name, city and phone number will be visible to everyone who opens
            this page. Share only what you are comfortable with.
          </p>

          {error && <p className="help-error" role="alert">{error}</p>}

          <div className="help-form-actions">
            <button type="submit" className="help-btn help-btn-deep">Post request</button>
          </div>
        </form>

        {/* ---------- Requests ---------- */}
        <section id="requests-section" className="help-list-section">
          <div className="help-list-head">
            <h2 className="help-h2">Help requests</h2>
            <p className="help-count">
              {shown.length} {shown.length === 1 ? "request" : "requests"} · {openCount} open
            </p>
          </div>

          <div className="help-chips" role="group" aria-label="Filter by type of help">
            {["All", ...HELP_TYPES].map((t) => (
              <button
                key={t}
                type="button"
                className={`help-chip ${filter === t ? "active" : ""}`}
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {shown.length === 0 ? (
            <div className="help-empty">
              <p className="help-empty-icon" aria-hidden="true">🤝</p>
              <p className="help-empty-title">
                {filter === "All" ? "No help requests yet" : `No requests for "${filter}"`}
              </p>
              <p className="help-empty-text">
                {filter === "All"
                  ? "Use the form above to post the first request."
                  : "Try another type or post a new request."}
              </p>
            </div>
          ) : (
            <ul className="help-list">
              {shown.map((r) => (
                <li key={r.id} className={`help-card help-item ${r.resolved ? "resolved" : ""}`}>
                  <div className="help-item-head">
                    <span className="help-avatar" aria-hidden="true">
                      {r.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="help-item-info">
                      <p className="help-name" title={r.name}>{r.name}</p>
                      <p className="help-meta">
                        📍 {r.city} · {formatDate(r.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="help-badges">
                    <span className="help-badge">
                      {TYPE_ICONS[r.type] || "🙋"} {r.type}
                    </span>
                    {r.urgency === "Urgent" && !r.resolved && (
                      <span className="help-badge help-badge-urgent">Urgent</span>
                    )}
                    {r.resolved && <span className="help-badge help-badge-done">Resolved</span>}
                  </div>

                  <p className="help-message">{r.message}</p>

                  {!r.resolved && (
                    <div className="help-contact">
                      <div className="help-contact-box">
                        <strong>{formatPhone(r.phone)}</strong>
                        <span>Contact {r.name.split(" ")[0]} to offer help</span>
                      </div>
                      <div className="help-contact-actions">
                        <a className="help-sbtn help-sbtn-call" href={`tel:+91${r.phone}`}>
                          Call
                        </a>
                        <a
                          className="help-sbtn help-sbtn-wa"
                          href={`https://wa.me/91${r.phone}?text=${encodeURIComponent(
                            `Hi ${r.name}, I saw your help request on CarePoint and I would like to help.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="help-item-foot">
                    <button type="button" className="help-link" onClick={() => toggleResolved(r.id)}>
                      {r.resolved ? "Reopen request" : "Mark as resolved"}
                    </button>
                    <button type="button" className="help-link help-link-del" onClick={() => handleDelete(r.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default Help;
