import React, { useMemo, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import {
  FaUserMd,
  FaTint,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaHeart,
  FaBrain,
  FaCarCrash,
  FaLungs,
  FaBone,
  FaBurn,
  FaAllergies,
  FaBaby,
  FaAmbulance,
  FaUserInjured,
  FaEnvelope,
  FaHeartbeat,
  FaHospital,
  FaArrowRight, FaYoutube, FaChevronRight, FaPills, FaFileMedicalAlt, FaShieldAlt,
  FaHeartbeat as FaHealthCheckup, FaLock,
  FaHeadset,
  // new icons used by the two added sections
  FaStar,
  FaCheckCircle,
  FaPaperPlane,
  FaSms,
  FaWhatsapp,
} from "react-icons/fa";

/* ═════════ SECTION A: CALL & MESSAGE  ·  DATA (sample numbers: apne hospitals ke asli numbers daalo) ───────── */
const EMERGENCY_NUMBERS = [
  { number: "112", label: "National emergency", hint: "Police, fire, medical" },
  { number: "108", label: "Ambulance", hint: "Free ambulance service" },
];

const HOSPITALS = [
  { id: 1, name: "City Care Hospital", city: "Delhi", phone: "+919800000001" },
  { id: 2, name: "LifeLine Hospital", city: "Noida", phone: "+919800000002" },
  { id: 3, name: "Sunrise Medical", city: "Gurugram", phone: "+919800000003" },
  { id: 4, name: "Hope Hospital", city: "Jaipur", phone: "+919800000004" },
];

const formatPhone = (p) => p.replace(/^\+91(\d{5})(\d{5})$/, "+91 $1 $2");

/* ═════════ SCOPED STYLES for the two new sections (global CSS se nahi dabte) ═════════ */
const EC_CSS = `
.ec, .ec * { box-sizing: border-box; }
.ec { text-align: left; color: #0f172a; }
.ec h2, .ec h3, .ec p, .ec ul { margin: 0; padding: 0; }
.ec-section { padding: 48px 16px; background: #fff; }
.ec-section.alt { background: #f8fafc; }
.ec-wrap { max-width: 1200px; margin: 0 auto; }
.ec-head { text-align: center; margin-bottom: 32px; }
.ec-title { font-size: clamp(1.6rem, 4.5vw, 2.25rem); font-weight: 700; text-align: center; margin-bottom: 8px !important; }
.ec-sub { color: #64748b; text-align: center; }
.ec-h3 { font-size: 1.1rem; font-weight: 600; text-align: left; margin-bottom: 12px !important; }

.ec-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 18px; border-radius: 10px; border: 1px solid transparent; font: inherit; font-size: .9rem; font-weight: 600; cursor: pointer; text-decoration: none; white-space: nowrap; transition: background .15s; }
.ec-btn-primary { background: #0891b2; color: #fff; } .ec-btn-primary:hover { background: #0e7490; }
.ec-btn-outline { background: #fff; color: #334155; border-color: #cbd5e1; } .ec-btn-outline:hover { background: #f1f5f9; }
.ec-btn-green { background: #16a34a; color: #fff; } .ec-btn-green:hover { background: #15803d; }
.ec-btn-red { background: #dc2626; color: #fff; } .ec-btn-red:hover { background: #b91c1c; }
.ec-btn-redline { background: #fff; color: #dc2626; border-color: #fecaca; }
.ec-disabled { opacity: .45; pointer-events: none; }

.ec-hotlines { display: grid; grid-template-columns: 1fr; gap: 12px; max-width: 780px; margin: 0 auto 40px; }
.ec-hotline { display: flex; align-items: center; gap: 14px; padding: 16px 18px; border-radius: 16px; background: #dc2626; color: #fff; text-decoration: none; box-shadow: 0 10px 24px rgba(220,38,38,.22); }
.ec-hotline:hover { background: #b91c1c; }
.ec-hotline-ico { width: 46px; height: 46px; border-radius: 50%; background: rgba(255,255,255,.2); display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0; }
.ec-hotline-text { flex: 1; min-width: 0; display: flex; flex-direction: column; text-align: left; }
.ec-hotline-text strong { font-size: 1.6rem; line-height: 1.1; }
.ec-hotline-text small { color: #fecaca; font-size: .8rem; margin-top: 3px; }
.ec-pill { background: #fff; color: #dc2626; padding: 8px 16px; border-radius: 999px; font-weight: 600; font-size: .85rem; flex-shrink: 0; }

.ec-split { display: grid; gap: 24px; align-items: start; }
.ec-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.ec-hosp { display: flex; flex-direction: column; gap: 14px; padding: 16px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; }
.ec-hosp.is-active { border-color: #0891b2; background: #ecfeff; box-shadow: 0 0 0 1px #0891b2; }
.ec-hosp-info { flex: 1; min-width: 0; text-align: left; }
.ec-name { font-weight: 600; text-align: left; }
.ec-meta { display: flex; align-items: center; gap: 6px; margin-top: 4px !important; color: #64748b; font-size: .875rem; text-align: left; }
.ec-meta svg { color: #0891b2; }
.ec-phone { margin-top: 4px !important; color: #475569; font-size: .875rem; text-align: left; }
.ec-row { display: flex; gap: 8px; }
.ec-row > * { flex: 1; }

.ec-card { padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; }
.ec-card h3 { font-size: 1.1rem; font-weight: 600; text-align: left; }
.ec-to { margin: 4px 0 16px !important; color: #64748b; font-size: .9rem; text-align: left; }
.ec-to b { color: #0f172a; }
.ec-input { display: block; width: 100%; margin: 0 0 12px; padding: 11px 14px; border: 1px solid #cbd5e1; border-radius: 10px; background: #fff; color: #0f172a; font: inherit; font-size: .9rem; outline: none; }
.ec-input:focus { border-color: #0891b2; box-shadow: 0 0 0 3px rgba(8,145,178,.15); }
textarea.ec-input { resize: none; }
.ec-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 4px; }
.ec-hint { margin-top: 12px !important; color: #94a3b8; font-size: .8rem; text-align: center; }

.ec-conds { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.ec-cond { position: relative; display: flex; flex-direction: column; align-items: flex-start; padding: 16px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; font: inherit; text-align: left; cursor: pointer; transition: transform .2s, box-shadow .2s; }
.ec-cond:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(15,23,42,.08); }
.ec-cond:focus-visible { outline: 2px solid #0891b2; outline-offset: 2px; }
.ec-cond.is-active { border-color: #0891b2; box-shadow: 0 0 0 2px #0891b2; }
.ec-ico { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; margin-bottom: 12px; }
.ec-cond-title { font-weight: 600; font-size: 1rem; color: #0f172a; }
.ec-cond-desc { margin-top: 4px; color: #64748b; font-size: .8rem; }
.ec-tick { position: absolute; top: 12px; right: 12px; color: #0891b2; }

.ec-panel { margin-top: 40px; padding: 20px; background: #fff; border: 1px solid #e2e8f0; border-radius: 24px; scroll-margin-top: 90px; }
.ec-alert { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; padding: 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 16px; }
.ec-alert b { display: block; color: #b91c1c; text-align: left; }
.ec-alert span { display: block; margin-top: 2px; color: #dc2626; font-size: .875rem; text-align: left; }
.ec-panel-title { font-size: 1.35rem; font-weight: 700; text-align: left; }
.ec-panel-sub { margin: 4px 0 20px !important; color: #64748b; font-size: .9rem; text-align: left; }
.ec-docs { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.ec-doc { display: flex; flex-direction: column; gap: 14px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 16px; }
.ec-doc.is-match { border-color: #0891b2; background: #ecfeff; }
.ec-doc-main { display: flex; align-items: center; gap: 14px; flex: 1; min-width: 0; }
.ec-avatar { width: 48px; height: 48px; border-radius: 50%; background: #cffafe; color: #0e7490; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ec-doc-name { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-weight: 600; text-align: left; }
.ec-badge { background: #0891b2; color: #fff; padding: 2px 10px; border-radius: 999px; font-size: .7rem; font-weight: 500; }
.ec-doc-sub { margin-top: 2px !important; color: #475569; font-size: .875rem; text-align: left; }
.ec-doc-stats { display: flex; align-items: center; gap: 14px; margin-top: 4px !important; color: #64748b; font-size: .8rem; text-align: left; }
.ec-doc-stats svg { color: #fbbf24; margin-right: 4px; vertical-align: -1px; }

@media (min-width: 640px) {
  .ec-section { padding: 64px 24px; }
  .ec-hotlines { grid-template-columns: 1fr 1fr; }
  .ec-hosp, .ec-doc { flex-direction: row; align-items: center; }
  .ec-row > * { flex: none; }
  .ec-card { padding: 24px; }
  .ec-conds { grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .ec-cond { padding: 20px; }
  .ec-panel { padding: 32px; }
  .ec-alert { flex-direction: row; align-items: center; justify-content: space-between; }
}
@media (min-width: 1024px) {
  .ec-split { grid-template-columns: 3fr 2fr; gap: 32px; }
  .ec-card { position: sticky; top: 96px; }
  .ec-conds { grid-template-columns: repeat(4, 1fr); }
}

/* ── FAQ ── */
.ec-faq { display: grid; gap: 28px; align-items: center; }
.ec-faq-img img { display: block; width: 100%; height: auto; border-radius: 24px; box-shadow: 0 16px 40px rgba(15,23,42,.12); }
.ec-faq-list { display: flex; flex-direction: column; gap: 12px; }
.ec-faq-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; transition: border-color .2s, box-shadow .2s; }
.ec-faq-item.is-open { border-color: #0891b2; box-shadow: 0 6px 20px rgba(8,145,178,.12); }
.ec-faq-q { font-size: 1rem; }
.ec-faq-btn { display: flex; align-items: center; gap: 12px; width: 100%; padding: 14px 16px; background: transparent; border: 0; color: #0f172a; font: inherit; font-weight: 600; text-align: left; cursor: pointer; }
.ec-faq-btn:focus-visible { outline: 2px solid #0891b2; outline-offset: -2px; border-radius: 16px; }
.ec-faq-emoji { width: 38px; height: 38px; border-radius: 50%; background: #ecfeff; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
.ec-faq-text { flex: 1; line-height: 1.4; }
.ec-faq-chev { flex-shrink: 0; color: #64748b; font-size: .8rem; transition: transform .25s; }
.is-open .ec-faq-chev { transform: rotate(90deg); color: #0891b2; }
.ec-faq-a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .25s ease; }
.is-open .ec-faq-a { grid-template-rows: 1fr; }
.ec-faq-a > div { overflow: hidden; }
.ec-faq-a p { padding: 0 16px 18px 16px; color: #475569; font-size: .95rem; line-height: 1.7; text-align: left; }

/* ── Footer ── */
.ec-foot { background: #0f172a; color: #cbd5e1; padding: 48px 16px 24px; }
.ec-foot-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px 24px; }
.ec-foot-brand, .ec-foot-news { grid-column: 1 / -1; }
.ec-logo { display: inline-flex; align-items: center; gap: 10px; color: #fff; font-size: 1.3rem; font-weight: 700; text-decoration: none; }
.ec-logo-mark { width: 38px; height: 38px; border-radius: 10px; background: #0891b2; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
.ec-foot-about { margin-top: 14px !important; max-width: 340px; color: #94a3b8; font-size: .9rem; line-height: 1.65; text-align: left; }
.ec-social { display: flex; gap: 10px; margin-top: 18px; }
.ec-social a { width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,.08); color: #e2e8f0; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: background .2s; }
.ec-social a:hover { background: #0891b2; color: #fff; }
.ec-foot-title { margin-bottom: 14px !important; color: #fff; font-size: .95rem; font-weight: 600; text-align: left; }
.ec-foot ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.ec-foot ul a { color: #94a3b8; font-size: .9rem; text-decoration: none; }
.ec-foot ul a:hover { color: #fff; }
.ec-news-text { margin-bottom: 12px !important; color: #94a3b8; font-size: .9rem; text-align: left; }
.ec-news-row { display: flex; flex-direction: column; gap: 10px; max-width: 420px; }
.ec-news-row input { width: 100%; padding: 11px 14px; border: 1px solid #334155; border-radius: 10px; background: #1e293b; color: #fff; font: inherit; font-size: .9rem; outline: none; }
.ec-news-row input::placeholder { color: #64748b; }
.ec-news-row input:focus { border-color: #22d3ee; }
.ec-news-ok { margin-top: 10px !important; color: #4ade80; font-size: .85rem; text-align: left; }
.ec-foot-bottom { display: flex; flex-direction: column; gap: 8px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #1e293b; color: #64748b; font-size: .85rem; }
.ec-foot-bottom b { color: #f87171; }

@media (min-width: 768px) {
  .ec-faq-btn { padding: 16px 20px; }
  .ec-faq-a p { padding: 0 20px 20px 70px; }
  .ec-foot-grid { grid-template-columns: repeat(3, 1fr); }
  .ec-news-row { flex-direction: row; }
  .ec-news-row .ec-btn { flex-shrink: 0; }
  .ec-foot-bottom { flex-direction: row; justify-content: space-between; }
}
@media (min-width: 1024px) {
  .ec-faq { grid-template-columns: 5fr 6fr; gap: 48px; }
  .ec-foot { padding: 64px 24px 28px; }
  .ec-foot-grid { grid-template-columns: 1.5fr 1fr 1fr 1fr 1.6fr; gap: 32px; }
  .ec-foot-brand, .ec-foot-news { grid-column: auto; }
  .ec-news-row { flex-direction: column; }
}
@media (prefers-reduced-motion: reduce) {
  .ec-faq-a, .ec-faq-chev, .ec-cond { transition: none; }
}
`;

/* ───────── COMPONENT: EmergencyCallMessage ───────── */
function EmergencyCallMessage() {
  const [hospitalId, setHospitalId] = useState(HOSPITALS[0].id);
  const [form, setForm] = useState({ name: "", problem: "", address: "", note: "" });

  const hospital = HOSPITALS.find((h) => h.id === hospitalId);
  const ready = form.name.trim() && form.problem.trim();
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const text = [
    `EMERGENCY: Patient ${form.name.trim() || "-"} needs urgent help.`,
    `Problem: ${form.problem.trim() || "-"}`,
    form.address.trim() && `Location: ${form.address.trim()}`,
    form.note.trim() && `Note: ${form.note.trim()}`,
  ].filter(Boolean).join("\n");

  const smsHref = `sms:${hospital.phone}?&body=${encodeURIComponent(text)}`;
  const waHref = `https://wa.me/${hospital.phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

  return (
    <section id="emergency-contact" className="ec ec-section">
      <div className="ec-wrap">
        <div className="ec-head">
          <h2 className="ec-title">Call or message a hospital</h2>
          <p className="ec-sub">Reach any hospital directly. Every number below is one tap away.</p>
        </div>

        {/* 112 / 108 */}
        <div className="ec-hotlines">
          {EMERGENCY_NUMBERS.map((n) => (
            <a key={n.number} href={`tel:${n.number}`} className="ec-hotline">
              <span className="ec-hotline-ico">{n.number === "108" ? <FaAmbulance /> : <FaPhoneAlt />}</span>
              <span className="ec-hotline-text">
                <strong>{n.number}</strong>
                <small>{n.label} · {n.hint}</small>
              </span>
              <span className="ec-pill">Call</span>
            </a>
          ))}
        </div>

        <div className="ec-split">
          {/* Hospitals */}
          <div>
            <h3 className="ec-h3">Nearby hospitals</h3>
            <ul className="ec-list">
              {HOSPITALS.map((h) => {
                const active = h.id === hospitalId;
                return (
                  <li key={h.id} className={`ec-hosp ${active ? "is-active" : ""}`}>
                    <div className="ec-hosp-info">
                      <p className="ec-name">{h.name}</p>
                      <p className="ec-meta"><FaMapMarkerAlt /> {h.city}, India</p>
                      <p className="ec-phone">{formatPhone(h.phone)}</p>
                    </div>
                    <div className="ec-row">
                      <a href={`tel:${h.phone}`} className="ec-btn ec-btn-primary"><FaPhoneAlt /> Call</a>
                      <button type="button" onClick={() => setHospitalId(h.id)} aria-pressed={active} className="ec-btn-outline ec-btn">
                        <FaSms /> {active ? "Selected" : "Message"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Composer */}
          <div className="ec-card">
            <h3>Send an emergency message</h3>
            <p className="ec-to">To: <b>{hospital.name}</b></p>

            <input className="ec-input" value={form.name} onChange={set("name")} placeholder="Patient name *" />
            <input className="ec-input" value={form.problem} onChange={set("problem")} placeholder="Problem (e.g. chest pain) *" />
            <input className="ec-input" value={form.address} onChange={set("address")} placeholder="Your location" />
            <textarea className="ec-input" rows={3} value={form.note} onChange={set("note")} placeholder="Anything else we should know?" />

            <div className="ec-actions">
              <a href={smsHref} className={`ec-btn ec-btn-primary ${!ready ? "ec-disabled" : ""}`} aria-disabled={!ready}><FaPaperPlane /> SMS</a>
              <a href={waHref} target="_blank" rel="noreferrer" className={`ec-btn ec-btn-green ${!ready ? "ec-disabled" : ""}`} aria-disabled={!ready}><FaWhatsapp /> WhatsApp</a>
            </div>
            {!ready && <p className="ec-hint">Fill patient name and problem to send.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════ SECTION B: PATIENT EMERGENCY CHECK + TOP 5 DOCTORS  ·  DATA ═════════ */
const EMERGENCIES = [
  { icon: <FaHeart />, title: "Heart Attack", desc: "Chest pain, sweating", color: "bg-red-100 text-red-600" },
  { icon: <FaBrain />, title: "Stroke", desc: "Speech difficulty", color: "bg-purple-100 text-purple-600" },
  { icon: <FaCarCrash />, title: "Road Accident", desc: "Trauma & injuries", color: "bg-orange-100 text-orange-600" },
  { icon: <FaTint />, title: "Heavy Bleeding", desc: "Blood loss", color: "bg-rose-100 text-rose-600" },
  { icon: <FaLungs />, title: "Breathing Problem", desc: "Asthma, choking", color: "bg-blue-100 text-blue-600" },
  { icon: <FaBone />, title: "Bone Fracture", desc: "Broken bones", color: "bg-yellow-100 text-yellow-700" },
  { icon: <FaBurn />, title: "Burn Injury", desc: "Thermal or chemical", color: "bg-amber-100 text-amber-600" },
  { icon: <FaAllergies />, title: "Allergic Reaction", desc: "Swelling & breathing issues", color: "bg-pink-100 text-pink-600" },
  { icon: <FaBaby />, title: "Child Emergency", desc: "Urgent child care", color: "bg-green-100 text-green-600" },
  { icon: <FaAmbulance />, title: "Blood Requirement", desc: "Urgent blood needed", color: "bg-red-50 text-red-700" },
  { icon: <FaUserInjured />, title: "Other Emergency", desc: "General emergency", color: "bg-gray-100 text-gray-700" },
];

// Sample doctors: replace with your API / DB data. `handles` = condition titles above.
const DOCTORS = [
  { id: 1, name: "Dr. Anil Mehra", specialty: "Cardiologist", hospital: "City Care Hospital", rating: 4.9, years: 18, phone: "+919800000011", handles: ["Heart Attack"] },
  { id: 2, name: "Dr. Sneha Kapoor", specialty: "Neurologist", hospital: "LifeLine Hospital", rating: 4.8, years: 14, phone: "+919800000012", handles: ["Stroke"] },
  { id: 3, name: "Dr. Rohit Sinha", specialty: "Trauma & Orthopedic Surgeon", hospital: "Sunrise Medical", rating: 4.8, years: 16, phone: "+919800000013", handles: ["Road Accident", "Bone Fracture", "Heavy Bleeding"] },
  { id: 4, name: "Dr. Farah Khan", specialty: "Pulmonologist", hospital: "City Care Hospital", rating: 4.7, years: 12, phone: "+919800000014", handles: ["Breathing Problem", "Allergic Reaction"] },
  { id: 5, name: "Dr. Meera Iyer", specialty: "Pediatrician", hospital: "Hope Hospital", rating: 4.9, years: 15, phone: "+919800000015", handles: ["Child Emergency"] },
  { id: 6, name: "Dr. Vikram Rao", specialty: "Emergency Medicine", hospital: "LifeLine Hospital", rating: 4.6, years: 11, phone: "+919800000016", handles: ["Other Emergency", "Blood Requirement", "Heavy Bleeding"] },
  { id: 7, name: "Dr. Kavita Desai", specialty: "Burn & Plastic Surgeon", hospital: "Sunrise Medical", rating: 4.7, years: 13, phone: "+919800000017", handles: ["Burn Injury"] },
];

const initials = (name) => name.replace("Dr. ", "").split(" ").map((w) => w[0]).join("");

/* ───────── COMPONENT: EmergencyCheck ───────── */
function EmergencyCheck() {
  const [selected, setSelected] = useState(null);
  const panelRef = useRef(null);

  // Matching doctors first, then by rating. Always exactly 5.
  const topDoctors = useMemo(() => {
    const match = (d) => (selected && d.handles.includes(selected.title) ? 1 : 0);
    return [...DOCTORS].sort((a, b) => match(b) - match(a) || b.rating - a.rating).slice(0, 5);
  }, [selected]);

  const choose = (item) => {
    setSelected(item);
    if (window.innerWidth < 1024) {
      setTimeout(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  };

  return (
    <section className="ec ec-section alt">
      <div className="ec-wrap">
        <div className="ec-head">
          <h2 className="ec-title">Patient Emergency Check</h2>
          <p className="ec-sub">Select the patient's current emergency condition.</p>
        </div>

        {/* Conditions */}
        <div className="ec-conds">
          {EMERGENCIES.map((item) => {
            const active = selected?.title === item.title;
            return (
              <button key={item.title} type="button" onClick={() => choose(item)} aria-pressed={active} className={`ec-cond ${active ? "is-active" : ""}`}>
                {active && <FaCheckCircle className="ec-tick" />}
                <span className={`ec-ico ${item.color}`}>{item.icon}</span>
                <span className="ec-cond-title">{item.title}</span>
                <span className="ec-cond-desc">{item.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Result + Top 5 doctors */}
        <div ref={panelRef} className="ec-panel">
          {selected && (
            <div className="ec-alert">
              <div>
                <b>{selected.title} selected</b>
                <span>Call for an ambulance now, then contact a doctor below.</span>
              </div>
              <div className="ec-row">
                <a href="tel:108" className="ec-btn ec-btn-red"><FaAmbulance /> Call 108</a>
                <a href="tel:112" className="ec-btn ec-btn-redline"><FaPhoneAlt /> 112</a>
              </div>
            </div>
          )}

          <h3 className="ec-panel-title">{selected ? `Best doctors for ${selected.title}` : "Top 5 doctors"}</h3>
          <p className="ec-panel-sub">
            {selected ? "Matching specialists are listed first." : "Pick a condition above to see the right specialist first."}
          </p>

          <ul className="ec-docs">
            {topDoctors.map((d) => {
              const match = selected && d.handles.includes(selected.title);
              return (
                <li key={d.id} className={`ec-doc ${match ? "is-match" : ""}`}>
                  <div className="ec-doc-main">
                    <span className="ec-avatar">{initials(d.name)}</span>
                    <div>
                      <p className="ec-doc-name">{d.name}{match && <span className="ec-badge">Recommended</span>}</p>
                      <p className="ec-doc-sub">{d.specialty} · {d.hospital}</p>
                      <p className="ec-doc-stats">
                        <span><FaStar />{d.rating}</span>
                        <span>{d.years} yrs experience</span>
                      </p>
                    </div>
                  </div>
                  <a href={`tel:${d.phone}`} className="ec-btn ec-btn-primary"><FaPhoneAlt /> Call doctor</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ═════════ SECTION C: FAQ  ·  DATA ═════════ */
const FAQS = [
  { icon: "🚑", q: "How do I request an emergency ambulance?", a: "Click on the 'Request Ambulance' button, provide the patient's location, emergency type, and contact number. Our nearest available ambulance will be assigned immediately." },
  { icon: "❤️", q: "What should I do if someone has a heart attack?", a: "Call emergency services immediately. Keep the patient calm, loosen tight clothing, and if trained, begin CPR if the patient becomes unconscious. Do not delay seeking medical assistance." },
  { icon: "🩸", q: "What if the patient needs blood urgently?", a: "Select the 'Blood Requirement' option, choose the blood group, and submit the request. Nearby blood banks and registered donors will be displayed if available." },
  { icon: "🏥", q: "How is the hospital selected?", a: "CarePoint recommends the nearest hospitals based on your location, bed availability, emergency department capacity, and ambulance response time." },
  { icon: "👨‍⚕️", q: "Can I choose a specific hospital?", a: "Yes. You can select any hospital listed in the emergency results if it accepts emergency admissions." },
];

/* ───────── COMPONENT: EmergencyFAQ ───────── */
function EmergencyFAQ() {
  const [open, setOpen] = useState(0); // first question open by default

  return (
    <section id="faq" className="ec ec-section">
      <div className="ec-wrap">
        <div className="ec-head">
          <h2 className="ec-title">Frequently asked questions</h2>
          <p className="ec-sub">Quick answers for when every minute counts.</p>
        </div>

        <div className="ec-faq">
          <div className="ec-faq-img">
            <img
              src="https://img.freepik.com/premium-photo/cartoon-illustration-people-hospital-with-medical-chart_1158271-2609.jpg?w=2000"
              alt="Doctors and patients at a hospital"
              loading="lazy"
            />
          </div>

          <div className="ec-faq-list">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className={`ec-faq-item ${isOpen ? "is-open" : ""}`}>
                  <h3 className="ec-faq-q">
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="ec-faq-btn"
                    >
                      <span className="ec-faq-emoji" aria-hidden="true">{f.icon}</span>
                      <span className="ec-faq-text">{f.q}</span>
                      <FaChevronRight className="ec-faq-chev" />
                    </button>
                  </h3>
                  <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="ec-faq-a">
                    <div><p>{f.a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════ SECTION D: FOOTER  ·  DATA ═════════ */
const FOOTER_LINKS = [
  { title: "Services", links: [["Emergency care", "#emergency-contact"], ["Find ambulance", "#"], ["Nearby hospitals", "#emergency-contact"], ["Book appointment", "#"]] },
  { title: "Company", links: [["About us", "#"], ["Our doctors", "#"], ["Contact", "#"], ["Careers", "#"]] },
  { title: "Legal", links: [["Terms of use", "#"], ["Privacy policy", "#"], ["Cookie policy", "#"]] },
];

const SOCIALS = [
  { label: "Facebook", icon: <FaFacebookF /> },
  { label: "Instagram", icon: <FaInstagram /> },
  { label: "LinkedIn", icon: <FaLinkedinIn /> },
  { label: "Twitter", icon: <FaTwitter /> },
  { label: "YouTube", icon: <FaYoutube /> },
];

/* ───────── COMPONENT: EmergencyFooter ───────── */
function EmergencyFooter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true); // hook this up to your API later
    setEmail("");
  };

  return (
    <footer className="ec ec-foot">
      <div className="ec-wrap">
        <div className="ec-foot-grid">
          {/* Brand */}
          <div className="ec-foot-brand">
            <a href="#" className="ec-logo">
              <span className="ec-logo-mark"><FaHeart /></span>
              CarePoint
            </a>
            <p className="ec-foot-about">
              Fast emergency help, nearby hospitals and trusted doctors, all in one place.
            </p>
            <div className="ec-social">
              {SOCIALS.map((s) => (
                <a key={s.label} href="#" aria-label={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="ec-foot-title">{col.title}</h4>
              <ul>
                {col.links.map(([label, href]) => (
                  <li key={label}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <form className="ec-foot-news" onSubmit={subscribe}>
            <h4 className="ec-foot-title">Newsletter</h4>
            <p className="ec-news-text">Health tips and updates. No spam.</p>
            <div className="ec-news-row">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email address" required />
              <button type="submit" className="ec-btn ec-btn-primary">Subscribe</button>
            </div>
            {done && <p className="ec-news-ok" role="status">Thanks! You're subscribed.</p>}
          </form>
        </div>

        <div className="ec-foot-bottom">
          <span>© {new Date().getFullYear()} CarePoint. All rights reserved.</span>
          <span>In an emergency call <b>112</b> · Ambulance <b>108</b></span>
        </div>
      </div>
    </footer>
  );
}

/* ═════════ YOUR PAGE ═════════ */
function Emergency() {
  return (
    <div>
      <Navbar />
      <style>{EC_CSS}</style>
   <section className="eb-hero">
  <img
    src="https://www.sparshhospital.com/wp-content/uploads/2025/08/Emergency-Care-in-Hennur-This-Monsoon-SPARSH-Hospital-Is-Ready-247-scaled.jpg"
    alt="24x7 emergency care"
    className="eb-img"
  />

  <div className="eb-bar">
    <a href="#request" className="eb-btn eb-red">
      <span className="eb-ico"><FaHeartbeat /></span>
      <span className="eb-txt">
        <b>Emergency</b>
        <small>Request help now</small>
      </span>
      <FaChevronRight className="eb-arrow" />
    </a>

    <a href="#hospitals" className="eb-btn eb-teal">
      <span className="eb-ico"><FaHospital /></span>
      <span className="eb-txt">
        <b>Nearby Hospitals</b>
        <small>Call or message</small>
      </span>
      <FaChevronRight className="eb-arrow" />
    </a>

    <a href="tel:108" className="eb-btn eb-teal">
      <span className="eb-ico"><FaAmbulance /></span>
      <span className="eb-txt">
        <b>Find Ambulance</b>
        <small>Call 108</small>
      </span>
      <FaChevronRight className="eb-arrow" />
    </a>

    <a href="#emergency-check" className="eb-btn eb-teal">
      <span className="eb-ico"><FaFileMedicalAlt /></span>
      <span className="eb-txt">
        <b>Check Details</b>
        <small>Find the right doctor</small>
      </span>
      <FaChevronRight className="eb-arrow" />
    </a>
  </div>
</section>
      <div className="service-sec">
        <h1>Emergency Service</h1>

        <div className="service-card">
          <div className="service-image">
            <img
              src="https://img.freepik.com/premium-photo/photo-realistic-medical-chart-isolated-white-background-patient-records-healthcare-documentatio_980716-173669.jpg"
              alt="Emergency"
            />
          </div>

          <div className="service-form">
            <input type="text" placeholder="Enter Patient Name" />
            <input type="text" placeholder="Enter Patient Problem" />
            <input type="text" placeholder="Enter Patient Address" />

            <button>Request Emergency</button>
          </div>
        </div>
      </div>
      <div className="hospital-section">
        <div className="hospital-card">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
            alt="Hospital"
          />
          <h3>City Care Hospital</h3>
          <p>📍 Delhi, India</p>
          <button>Apply</button>
        </div>

        <div className="hospital-card">
          <img
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
            alt="Hospital"
          />
          <h3>LifeLine Hospital</h3>
          <p>📍 Noida, India</p>
          <button>Apply</button>
        </div>

        <div className="hospital-card">
          <img
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907"
            alt="Hospital"
          />
          <h3>Sunrise Medical</h3>
          <p>📍 Gurugram, India</p>
          <button>Apply</button>
        </div>

        <div className="hospital-card">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
            alt="Hospital"
          />
          <h3>Hope Hospital</h3>
          <p>📍 Jaipur, India</p>
          <button>Apply</button>
        </div>
      </div>

      {/* NEW 1: call & message any hospital */}
      <EmergencyCallMessage />

      {/* NEW 2: Patient Emergency Check + Top 5 doctors
          (replaces the old "Available Doctors" and "Patient Emergency Check" blocks) */}
      <EmergencyCheck />

      {/* NEW 3: FAQ accordion */}
      <EmergencyFAQ />

      {/* NEW 4: footer */}
      <EmergencyFooter />
      </div>
  );
}

export default Emergency;
