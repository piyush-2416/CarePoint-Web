import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

/* ---------- settings: apne hisaab se badal sakte ho ---------- */
const API_URL = "http://localhost:3000/api/products"; // single doctor: `${API_URL}/${id}`
const STORAGE_KEY = "doctor_appointments";
const MAX_MONTHS_AHEAD = 3; // kitne mahine aage tak booking
const SLOT_MINUTES = 30; // calendar file me appointment ki length

const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/* ---------- date / time helpers ---------- */
const pad = (n) => String(n).padStart(2, "0");
const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; // timezone-safe
const fromKey = (k) => {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const parseTime = (t) => {
  const [, hh, mm, ap] = /(\d+):(\d+)\s*(AM|PM)/i.exec(t);
  let h = Number(hh) % 12;
  if (ap.toUpperCase() === "PM") h += 12;
  return { h, m: Number(mm) };
};
const toDateTime = (dateKey, time) => {
  const d = fromKey(dateKey);
  const { h, m } = parseTime(time);
  d.setHours(h, m, 0, 0);
  return d;
};
const prettyDate = (d) =>
  d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
const startOfToday = () => {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
};
const groupOf = (t) => {
  const { h } = parseTime(t);
  return h < 12 ? "Morning" : h < 17 ? "Afternoon" : "Evening";
};

/* ---------- appointment storage ----------
   Abhi bookings browser ke localStorage me save hoti hain.
   Backend lagana ho to sirf loadAppointments / saveAppointments badalna hai. */
const loadAppointments = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};
const saveAppointments = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* storage full / blocked */
  }
};

const downloadIcs = (a) => {
  const start = toDateTime(a.dateKey, a.time);
  const end = new Date(start.getTime() + SLOT_MINUTES * 60000);
  const f = (d) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Doctor Appointment//EN",
    "BEGIN:VEVENT",
    `UID:${a.id}@doctor-appointment`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${f(start)}`,
    `DTEND:${f(end)}`,
    `SUMMARY:Appointment with ${a.doctorName}`,
    `DESCRIPTION:Patient: ${a.patientName}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "appointment.ics";
  link.click();
  URL.revokeObjectURL(url);
};

/* ---------- icons ---------- */
const Icon = ({ d, size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);
const I = {
  back: "M15 18l-6-6 6-6",
  next: "M9 6l6 6-6 6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  cal: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  award: "M12 14a5 5 0 100-10 5 5 0 000 10zM8.5 13.5L7 21l5-3 5 3-1.5-7.5",
  heart: "M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.6-7 10-7 10z",
  down: "M12 4v12M6 11l6 6 6-6M5 21h14",
};

/* ---------- styles (Tailwind ki zarurat nahi, ye khud chalta hai) ---------- */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');

.dr-root{--ink:#0f172a;--muted:#64748b;--line:#e2e8f0;--teal:#0d9488;--teal-d:#0f766e;--teal-l:#ccfbf1;--teal-xl:#f0fdfa;--bg:#f4faf9;--red:#dc2626;--cell:34px;
  font-family:'DM Sans',ui-sans-serif,system-ui,sans-serif;background:var(--bg);color:var(--ink);min-height:100vh}
.dr-root *{box-sizing:border-box}
.dr-display{font-family:'Bricolage Grotesque','DM Sans',sans-serif;letter-spacing:-.02em}
.dr-wrap{max-width:1100px;margin:0 auto;padding:28px 16px 72px}
.dr-back{display:inline-flex;align-items:center;gap:6px;color:var(--teal-d);font-size:14px;font-weight:500;text-decoration:none;margin-bottom:18px}
.dr-back:hover{text-decoration:underline}
.dr-grid{display:grid;gap:24px}
@media(min-width:960px){.dr-grid{grid-template-columns:370px 1fr;align-items:start}.dr-profile{position:sticky;top:24px}.dr-mobile-cta{display:none!important}}

@keyframes dr-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes dr-zoom{from{transform:scale(1.07)}to{transform:scale(1)}}
@keyframes dr-pop{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
@keyframes dr-fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes dr-spin{to{transform:rotate(360deg)}}
@keyframes dr-shimmer{to{background-position:-200% 0}}
@keyframes dr-daypop{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:none}}
@keyframes dr-title{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:none}}
@keyframes dr-ring{0%{box-shadow:0 0 0 0 rgba(13,148,136,.45)}100%{box-shadow:0 0 0 9px rgba(13,148,136,0)}}
@keyframes dr-chip{from{opacity:0;transform:translateY(5px) scale(.96)}to{opacity:1;transform:none}}
.dr-in-1{animation:dr-rise .6s .05s cubic-bezier(.2,.7,.2,1) both}
.dr-in-2{animation:dr-rise .6s .18s cubic-bezier(.2,.7,.2,1) both}
.dr-fade{animation:dr-fade .3s ease-out both}

/* ---- profile ---- */
.dr-profile{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,.06);border:1px solid #eef2f6}
.dr-photo{position:relative;height:290px;background:linear-gradient(135deg,#134e4a,#0d9488);overflow:hidden}
.dr-photo img{width:100%;height:100%;object-fit:cover;animation:dr-zoom 1.4s cubic-bezier(.2,.7,.2,1) both}
.dr-photo::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(2,6,23,.55),transparent 55%)}
.dr-initial{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:120px;font-weight:800;color:rgba(255,255,255,.15)}
.dr-chip-spec{position:absolute;left:16px;bottom:16px;z-index:1;background:#fff;color:var(--teal-d);font-size:12px;font-weight:600;padding:6px 12px;border-radius:999px}
.dr-pbody{padding:22px}
.dr-name{font-size:28px;font-weight:800;margin:0;line-height:1.1}
.dr-qual{margin:8px 0 0;color:var(--muted);font-size:14px}
.dr-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(96px,1fr));gap:10px;margin-top:20px}
.dr-stat{background:var(--teal-xl);border-radius:14px;padding:12px}
.dr-stat small{display:flex;align-items:center;gap:5px;color:var(--muted);font-size:11px}
.dr-stat b{display:block;margin-top:4px;font-size:15px}
.dr-fee{display:flex;justify-content:space-between;align-items:center;margin-top:18px;padding-top:18px;border-top:1px solid var(--line)}
.dr-fee small{color:var(--muted);font-size:13px}
.dr-fee b{font-size:26px;color:var(--teal-d)}

/* ---- buttons ---- */
.dr-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;border:0;border-radius:12px;padding:14px;font:inherit;font-size:15px;font-weight:600;cursor:pointer;color:#fff;background:var(--teal);transition:background .2s,box-shadow .2s,transform .2s}
.dr-btn:hover:not(:disabled){background:var(--teal-d);box-shadow:0 8px 20px rgba(13,148,136,.28)}
.dr-btn:active:not(:disabled){transform:translateY(1px)}
.dr-btn:disabled{opacity:.6;cursor:not-allowed}
.dr-btn.ghost{background:#fff;color:var(--ink);box-shadow:inset 0 0 0 1px #cbd5e1}
.dr-btn.ghost:hover:not(:disabled){background:var(--ink);color:#fff;box-shadow:inset 0 0 0 1px var(--ink)}
.dr-mobile-cta{margin-top:18px}

/* ---- booking panel ---- */
.dr-panel{background:#fff;border-radius:20px;padding:24px;box-shadow:0 10px 30px rgba(15,23,42,.06);border:1px solid #eef2f6;scroll-margin-top:16px}
.dr-title{font-size:26px;font-weight:800;margin:0}
.dr-sub{margin:4px 0 0;color:var(--muted);font-size:14px}
.dr-steps{display:flex;gap:8px;margin:16px 0 18px;padding:0;list-style:none}
.dr-step{flex:1;display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:#94a3b8}
.dr-step i{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#e2e8f0;color:#64748b;font-style:normal;font-size:12px;flex-shrink:0;transition:all .25s}
.dr-step.on{color:var(--ink)}
.dr-step.on i{background:var(--teal);color:#fff}
.dr-step.done i{background:var(--teal-l);color:var(--teal-d)}
@media(max-width:520px){.dr-step span{display:none}}

/* ---- calendar (chhota: fixed cell size) + time slots saath me ---- */
.dr-pick{display:grid;gap:18px}
@media(min-width:680px){.dr-pick{grid-template-columns:auto 1fr;align-items:start}}

.dr-cal{width:fit-content;max-width:100%;margin:0 auto;border:1px solid var(--line);border-radius:16px;padding:12px 12px 14px;background:linear-gradient(180deg,#fff,var(--teal-xl))}
@media(min-width:680px){.dr-cal{margin:0}}
.dr-calhead{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.dr-calhead h3{margin:0;font-size:15px;font-weight:700;animation:dr-title .3s ease-out both}
.dr-nav{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;border:0;background:#fff;color:var(--ink);cursor:pointer;box-shadow:inset 0 0 0 1px var(--line);transition:background .2s,transform .2s,box-shadow .2s}
.dr-nav:hover:not(:disabled){background:var(--teal);color:#fff;box-shadow:none;transform:scale(1.08)}
.dr-nav:disabled{opacity:.35;cursor:not-allowed}
.dr-week,.dr-days{display:grid;grid-template-columns:repeat(7,var(--cell));gap:4px}
.dr-week{text-align:center;font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:4px}
.dr-day{width:var(--cell);height:var(--cell);border:0;border-radius:10px;background:transparent;font:inherit;font-size:13px;color:var(--ink);cursor:pointer;position:relative;
  animation:dr-daypop .32s cubic-bezier(.2,.7,.2,1) backwards;animation-delay:calc(var(--i) * 9ms);transition:background .15s,color .15s,transform .15s}
.dr-day:hover:not(:disabled):not(.sel){background:var(--teal-l);transform:translateY(-1px)}
.dr-day:disabled{color:#cbd5e1;cursor:default}
.dr-day.today:not(.sel)::after{content:"";position:absolute;left:50%;bottom:4px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--teal)}
.dr-day.today:not(.sel){font-weight:700;color:var(--teal-d)}
.dr-day.sel{background:var(--teal);color:#fff;font-weight:700;transform:scale(1.08);animation:dr-daypop .32s cubic-bezier(.2,.7,.2,1) backwards,dr-ring .7s ease-out}
.dr-empty{height:var(--cell);visibility:hidden}

/* ---- time slots (calendar ke saath) ---- */
.dr-times{min-width:0}
.dr-times h4{margin:0 0 2px;font-size:15px}
.dr-times p.hint{margin:0 0 6px;color:var(--muted);font-size:13px}
.dr-group{margin-top:10px}
.dr-group small{display:block;margin-bottom:6px;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase}
.dr-slots{display:flex;flex-wrap:wrap;gap:7px}
.dr-slot{padding:7px 14px;border-radius:999px;border:1px solid var(--teal);background:#fff;color:var(--teal-d);font:inherit;font-size:13px;font-weight:600;cursor:pointer;
  animation:dr-chip .3s ease-out backwards;animation-delay:calc(var(--i) * 40ms);transition:background .15s,color .15s,transform .15s}
.dr-slot:hover:not(:disabled):not(.sel){background:var(--teal-xl);transform:translateY(-1px)}
.dr-slot.sel{background:var(--teal);color:#fff}
.dr-slot:disabled{border-color:var(--line);color:#cbd5e1;cursor:not-allowed;text-decoration:line-through;background:#f8fafc}
.dr-timeempty{display:flex;align-items:center;gap:10px;height:100%;min-height:110px;padding:16px;border:1px dashed #cbd5e1;border-radius:16px;color:#94a3b8;font-size:13px}
.dr-timeempty svg{flex-shrink:0;color:var(--teal)}
.dr-timeempty p{margin:0}

/* ---- form ---- */
.dr-sec{margin-top:20px}
.dr-form{display:grid;gap:14px;margin-top:12px}
.dr-field label{display:block;margin-bottom:6px;font-size:13px;font-weight:600}
.dr-input{width:100%;border:1px solid var(--line);background:#f8fafc;border-radius:12px;padding:12px 14px;font:inherit;font-size:14px;color:var(--ink);outline:none;transition:border-color .2s,box-shadow .2s,background .2s}
.dr-input:focus{background:#fff;border-color:var(--teal);box-shadow:0 0 0 3px rgba(13,148,136,.15)}
.dr-input.bad{border-color:var(--red)}
textarea.dr-input{resize:vertical;min-height:70px}
.dr-err{margin:6px 0 0;color:var(--red);font-size:12px}
.dr-summary{display:flex;align-items:center;gap:10px;background:var(--teal-xl);border-radius:12px;padding:12px 14px;font-size:14px;color:var(--teal-d);font-weight:600}
.dr-spin{width:16px;height:16px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:dr-spin .7s linear infinite}

/* ---- success ---- */
.dr-ok{text-align:center;padding:12px 0 4px}
.dr-okicon{display:grid;place-items:center;width:68px;height:68px;margin:0 auto;border-radius:50%;background:var(--teal-l);color:var(--teal-d);animation:dr-pop .5s cubic-bezier(.2,.7,.2,1) both}
.dr-okcard{margin:20px 0;border:1px solid var(--line);border-radius:14px;text-align:left;overflow:hidden}
.dr-okrow{display:flex;justify-content:space-between;gap:12px;padding:12px 16px;font-size:14px}
.dr-okrow + .dr-okrow{border-top:1px solid #f1f5f9}
.dr-okrow span{color:var(--muted)}
.dr-okrow b{text-align:right}
.dr-okbtns{display:grid;gap:10px}
@media(min-width:520px){.dr-okbtns{grid-template-columns:1fr 1fr}}

/* ---- my appointments ---- */
.dr-mine{margin-top:26px;padding-top:20px;border-top:1px solid var(--line)}
.dr-mine h3{margin:0 0 10px;font-size:17px}
.dr-appt{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--line);border-radius:12px;margin-bottom:8px;transition:border-color .2s,background .2s}
.dr-appt:hover{border-color:#99f6e4;background:var(--teal-xl)}
.dr-appt b{display:block;font-size:14px}
.dr-appt small{color:var(--muted);font-size:12px}
.dr-link{border:0;background:none;color:var(--red);font:inherit;font-size:13px;font-weight:600;cursor:pointer;padding:6px 8px;border-radius:8px}
.dr-link:hover{background:#fef2f2}
.dr-link.neutral{color:var(--muted)}
.dr-link.neutral:hover{background:#f1f5f9}

/* ---- states ---- */
.dr-center{text-align:center;padding:110px 16px}
.dr-skel{background:linear-gradient(90deg,#e2e8f0,#f1f5f9,#e2e8f0);background-size:200% 100%;animation:dr-shimmer 1.4s linear infinite;border-radius:12px}

@media (prefers-reduced-motion:reduce){
  .dr-in-1,.dr-in-2,.dr-fade,.dr-photo img,.dr-okicon,.dr-skel,.dr-day,.dr-day.sel,.dr-slot,.dr-calhead h3{animation:none}
  .dr-day,.dr-slot,.dr-nav{transition:none}
}
`;

export default function Doctorid() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------- booking state ----------
  const today = startOfToday();
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", reason: "" });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [appointments, setAppointments] = useState(loadAppointments);
  const [cancelId, setCancelId] = useState(null);
  const [slotError, setSlotError] = useState("");

  // ---------- doctor fetch ----------
  useEffect(() => {
    setLoading(true);
    setError("");
    setDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setConfirmation(null);
    window.scrollTo(0, 0);

    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        let data = res.data;
        if (data && data.data) data = data.data;
        if (Array.isArray(data)) data = data[0];
        if (!data) throw new Error("not found");
        setDoctor(data);
      })
      .catch((err) => {
        console.error("Doctor fetch error:", err);
        setError(err.response?.status === 404 ? "Doctor nahi mila" : "Doctor load nahi ho paya");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ---------- is doctor ki appointments ----------
  const doctorAppts = useMemo(
    () => appointments.filter((a) => String(a.doctorId) === String(id)),
    [appointments, id]
  );

  const upcoming = useMemo(() => {
    const now = new Date();
    return doctorAppts
      .filter((a) => toDateTime(a.dateKey, a.time) >= now)
      .sort((a, b) => toDateTime(a.dateKey, a.time) - toDateTime(b.dateKey, b.time));
  }, [doctorAppts]);

  const slotStatus = (date, time) => {
    const key = toKey(date);
    if (doctorAppts.some((a) => a.dateKey === key && a.time === time)) return "booked";
    if (toDateTime(key, time) <= new Date()) return "past";
    return "free";
  };

  // ---------- calendar ----------
  const days = useMemo(() => {
    const y = viewMonth.getFullYear();
    const m = viewMonth.getMonth();
    const list = Array(new Date(y, m, 1).getDay()).fill(null);
    for (let d = 1; d <= new Date(y, m + 1, 0).getDate(); d++) list.push(new Date(y, m, d));
    return list;
  }, [viewMonth]);

  const canGoPrev =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() && viewMonth.getMonth() > today.getMonth());
  const monthsAhead =
    (viewMonth.getFullYear() - today.getFullYear()) * 12 + (viewMonth.getMonth() - today.getMonth());
  const canGoNext = monthsAhead < MAX_MONTHS_AHEAD;

  const changeMonth = (offset) => {
    setViewMonth((p) => new Date(p.getFullYear(), p.getMonth() + offset, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const pickDate = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setFormErrors({});
    setSlotError("");
  };

  // ---------- booking ----------
  const validate = () => {
    const errs = {};
    if (form.name.trim().length < 2) errs.name = "Apna poora naam likho";
    const digits = form.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
    if (!/^[6-9]\d{9}$/.test(digits)) errs.phone = "10 digit ka sahi mobile number likho";
    setFormErrors(errs);
    return { ok: Object.keys(errs).length === 0, digits };
  };

  const confirmBooking = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    const { ok, digits } = validate();
    if (!ok) return;

    setSaving(true);
    // taaki dusre tab me booked slot par double booking na ho
    const latest = loadAppointments();
    const key = toKey(selectedDate);
    const clash = latest.some(
      (a) => String(a.doctorId) === String(id) && a.dateKey === key && a.time === selectedTime
    );
    if (clash) {
      setAppointments(latest);
      setSelectedTime(null);
      setSlotError("Ye slot abhi kisi aur ne book kar liya. Dusra time chuno.");
      setSaving(false);
      return;
    }

    const appt = {
      id: Date.now(),
      doctorId: id,
      doctorName: doctor.name,
      dateKey: key,
      dateLabel: prettyDate(selectedDate),
      time: selectedTime,
      patientName: form.name.trim(),
      phone: digits,
      reason: form.reason.trim(),
    };
    const next = [...latest, appt];
    saveAppointments(next);
    setAppointments(next);
    setConfirmation(appt);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: "", phone: "", reason: "" });
    setSaving(false);
  };

  const cancelAppointment = (apptId) => {
    const next = loadAppointments().filter((a) => a.id !== apptId);
    saveAppointments(next);
    setAppointments(next);
    setCancelId(null);
  };

  const bookAnother = () => {
    setConfirmation(null);
    setSlotError("");
  };

  const scrollToBooking = () =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });

  // ---------- states ----------
  if (loading)
    return (
      <>
        <style>{styles}</style>
        <Navbar />
        <div className="dr-root">
          <div className="dr-grid dr-wrap">
            <div className="dr-skel" style={{ height: 520 }} />
            <div className="dr-skel" style={{ height: 520 }} />
          </div>
        </div>
      </>
    );

  if (error || !doctor)
    return (
      <>
        <style>{styles}</style>
        <Navbar />
        <div className="dr-root">
          <div className="dr-center">
            <p style={{ color: "var(--red)", fontWeight: 600, margin: "0 0 16px" }}>{error || "Doctor nahi mila"}</p>
            <Link to="/" className="dr-back" style={{ margin: 0 }}>
              <Icon d={I.back} /> Home par wapas jao
            </Link>
          </div>
        </div>
      </>
    );

  // ---------- derived ----------
  const step = !selectedDate ? 1 : !selectedTime ? 2 : 3;
  const grouped = ["Morning", "Afternoon", "Evening"]
    .map((g) => [g, TIME_SLOTS.filter((t) => groupOf(t) === g)])
    .filter(([, s]) => s.length);
  const freeCount = selectedDate ? TIME_SLOTS.filter((t) => slotStatus(selectedDate, t) === "free").length : 0;
  const patients =
    doctor.patientsTreated !== undefined && doctor.patientsTreated !== null && doctor.patientsTreated !== ""
      ? isNaN(Number(doctor.patientsTreated))
        ? doctor.patientsTreated
        : Number(doctor.patientsTreated).toLocaleString("en-IN")
      : null;
  const monthKey = `${viewMonth.getFullYear()}-${viewMonth.getMonth()}`;

  return (
    <>
      <style>{styles}</style>
      <Navbar />

      <div className="dr-root">
        <div className="dr-wrap">
          <Link to="/" className="dr-back">
            <Icon d={I.back} size={16} /> Back
          </Link>

          <div className="dr-grid">
            {/* ================= DOCTOR PROFILE ================= */}
            <aside className="dr-profile dr-in-1">
              <div className="dr-photo">
                {doctor.image ? (
                  <img src={doctor.image} alt={doctor.name} onError={(e) => (e.target.style.display = "none")} />
                ) : (
                  <span className="dr-initial dr-display">{doctor.name?.[0]}</span>
                )}
                {doctor.specialization && <span className="dr-chip-spec">{doctor.specialization}</span>}
              </div>

              <div className="dr-pbody">
                <h1 className="dr-name dr-display">{doctor.name}</h1>
                {doctor.qualification && <p className="dr-qual">{doctor.qualification}</p>}

                <div className="dr-stats">
                  {doctor.experience && (
                    <div className="dr-stat">
                      <small>
                        <Icon d={I.award} size={13} /> Experience
                      </small>
                      <b>{doctor.experience}</b>
                    </div>
                  )}
                  {patients && (
                    <div className="dr-stat">
                      <small>
                        <Icon d={I.heart} size={13} /> Patients treated
                      </small>
                      <b>{patients}</b>
                    </div>
                  )}
                </div>

                {doctor.consultationFee && (
                  <div className="dr-fee">
                    <small>Consultation fee</small>
                    <b className="dr-display">₹{Number(doctor.consultationFee).toLocaleString("en-IN")}</b>
                  </div>
                )}

                <div className="dr-mobile-cta">
                  <button className="dr-btn" onClick={scrollToBooking}>
                    <Icon d={I.cal} /> Book appointment
                  </button>
                </div>
              </div>
            </aside>

            {/* ================= BOOKING ================= */}
            <section id="booking" className="dr-panel dr-in-2">
              {confirmation ? (
                /* ---------- success ---------- */
                <div className="dr-ok dr-fade">
                  <div className="dr-okicon">
                    <Icon d={I.check} size={34} />
                  </div>
                  <h2 className="dr-title dr-display" style={{ marginTop: 16 }}>
                    Appointment confirmed
                  </h2>
                  <p className="dr-sub">Apni booking ki details neeche dekho.</p>

                  <div className="dr-okcard">
                    <div className="dr-okrow">
                      <span>Doctor</span>
                      <b>{confirmation.doctorName}</b>
                    </div>
                    <div className="dr-okrow">
                      <span>Date</span>
                      <b>{confirmation.dateLabel}</b>
                    </div>
                    <div className="dr-okrow">
                      <span>Time</span>
                      <b>{confirmation.time}</b>
                    </div>
                    <div className="dr-okrow">
                      <span>Patient</span>
                      <b>{confirmation.patientName}</b>
                    </div>
                    <div className="dr-okrow">
                      <span>Phone</span>
                      <b>{confirmation.phone}</b>
                    </div>
                  </div>

                  <div className="dr-okbtns">
                    <button className="dr-btn" onClick={() => downloadIcs(confirmation)}>
                      <Icon d={I.down} /> Add to calendar
                    </button>
                    <button className="dr-btn ghost" onClick={bookAnother}>
                      Book another
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="dr-title dr-display">Book your appointment</h2>
                  <p className="dr-sub">Date chuno, time chuno aur apni details bhar do.</p>

                  <ol className="dr-steps">
                    {[
                      [1, "Date"],
                      [2, "Time"],
                      [3, "Details"],
                    ].map(([n, label]) => (
                      <li key={n} className={`dr-step ${step === n ? "on" : ""} ${step > n ? "done" : ""}`}>
                        <i>{step > n ? <Icon d={I.check} size={13} /> : n}</i>
                        <span>{label}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="dr-pick">
                    {/* ---------- calendar ---------- */}
                    <div className="dr-cal">
                      <div className="dr-calhead">
                        <button
                          className="dr-nav"
                          onClick={() => changeMonth(-1)}
                          disabled={!canGoPrev}
                          aria-label="Pichla mahina"
                        >
                          <Icon d={I.back} size={15} />
                        </button>
                        <h3 key={monthKey} className="dr-display">
                          {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                        </h3>
                        <button
                          className="dr-nav"
                          onClick={() => changeMonth(1)}
                          disabled={!canGoNext}
                          aria-label="Agla mahina"
                        >
                          <Icon d={I.next} size={15} />
                        </button>
                      </div>

                      <div className="dr-week">
                        {WEEKDAYS.map((d) => (
                          <div key={d}>{d}</div>
                        ))}
                      </div>

                      {/* key badalne se har mahine par din ek ke baad ek pop hote hain */}
                      <div className="dr-days" key={monthKey}>
                        {days.map((date, i) => {
                          if (!date) return <span key={i} className="dr-empty" />;
                          const disabled = date < today;
                          const sel = selectedDate && toKey(date) === toKey(selectedDate);
                          const isToday = toKey(date) === toKey(today);
                          return (
                            <button
                              key={i}
                              disabled={disabled}
                              onClick={() => pickDate(date)}
                              aria-pressed={!!sel}
                              aria-label={prettyDate(date)}
                              style={{ "--i": i }}
                              className={`dr-day ${sel ? "sel" : ""} ${isToday ? "today" : ""}`}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* ---------- time slots (calendar ke bagal me) ---------- */}
                    <div className="dr-times">
                      {selectedDate ? (
                        <div className="dr-fade" key={toKey(selectedDate)}>
                          <h4>Available times</h4>
                          <p className="hint">
                            {prettyDate(selectedDate)} ·{" "}
                            {freeCount > 0 ? `${freeCount} slots khali` : "Koi slot khali nahi. Dusri date chuno."}
                          </p>

                          {slotError && (
                            <p className="dr-err" style={{ marginBottom: 8 }} role="alert">
                              {slotError}
                            </p>
                          )}

                          {grouped.map(([g, slots]) => (
                            <div key={g} className="dr-group">
                              <small>{g}</small>
                              <div className="dr-slots">
                                {slots.map((t) => {
                                  const st = slotStatus(selectedDate, t);
                                  return (
                                    <button
                                      key={t}
                                      disabled={st !== "free"}
                                      onClick={() => {
                                        setSelectedTime(t);
                                        setSlotError("");
                                      }}
                                      title={st === "booked" ? "Booked" : st === "past" ? "Time nikal gaya" : ""}
                                      style={{ "--i": TIME_SLOTS.indexOf(t) }}
                                      className={`dr-slot ${selectedTime === t ? "sel" : ""}`}
                                    >
                                      {t}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="dr-timeempty">
                          <Icon d={I.clock} size={20} />
                          <p>Pehle calendar se date chuno, phir yahan available times dikhenge.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ---------- patient details ---------- */}
                  {selectedDate && selectedTime && (
                    <form className="dr-sec dr-fade" onSubmit={confirmBooking} noValidate>
                      <div className="dr-summary">
                        <Icon d={I.clock} />
                        {prettyDate(selectedDate)} at {selectedTime}
                      </div>

                      <div className="dr-form">
                        <div className="dr-field">
                          <label htmlFor="dr-name">Patient ka naam</label>
                          <input
                            id="dr-name"
                            className={`dr-input ${formErrors.name ? "bad" : ""}`}
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Jaise Rahul Sharma"
                            autoComplete="name"
                          />
                          {formErrors.name && <p className="dr-err">{formErrors.name}</p>}
                        </div>

                        <div className="dr-field">
                          <label htmlFor="dr-phone">Mobile number</label>
                          <input
                            id="dr-phone"
                            className={`dr-input ${formErrors.phone ? "bad" : ""}`}
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="10 digit number"
                            inputMode="tel"
                            autoComplete="tel"
                          />
                          {formErrors.phone && <p className="dr-err">{formErrors.phone}</p>}
                        </div>

                        <div className="dr-field">
                          <label htmlFor="dr-reason">Kya problem hai? (optional)</label>
                          <textarea
                            id="dr-reason"
                            className="dr-input"
                            value={form.reason}
                            onChange={(e) => setForm({ ...form, reason: e.target.value })}
                            placeholder="Doctor ko batane ke liye chhota sa note"
                          />
                        </div>

                        <button type="submit" className="dr-btn" disabled={saving}>
                          {saving ? (
                            <>
                              <span className="dr-spin" /> Booking ho rahi hai...
                            </>
                          ) : (
                            <>
                              <Icon d={I.check} /> Confirm appointment
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}

              {/* ---------- my appointments ---------- */}
              {upcoming.length > 0 && (
                <div className="dr-mine">
                  <h3 className="dr-display">Your appointments</h3>
                  {upcoming.map((a) => (
                    <div key={a.id} className="dr-appt">
                      <div>
                        <b>
                          {a.dateLabel} · {a.time}
                        </b>
                        <small>{a.patientName}</small>
                      </div>

                      {cancelId === a.id ? (
                        <div>
                          <button className="dr-link" onClick={() => cancelAppointment(a.id)}>
                            Haan, cancel karo
                          </button>
                          <button className="dr-link neutral" onClick={() => setCancelId(null)}>
                            Nahi
                          </button>
                        </div>
                      ) : (
                        <button className="dr-link" onClick={() => setCancelId(a.id)}>
                          Cancel
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
