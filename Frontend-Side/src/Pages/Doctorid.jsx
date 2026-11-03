import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../Components/Navbar";

/* ---------- settings: apne hisaab se badal sakte ho ---------- */
const MAX_MONTHS_AHEAD = 3; // kitne mahine aage tak booking
const SLOT_MINUTES = 30; // calendar file me appointment ki length

const TIME_SLOTS = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "2:00 PM",
  "3:30 PM",
  "5:00 PM",
  "6:30 PM",
];
const GROUP_ORDER = ["Morning", "Afternoon", "Evening"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/* ---------- date / time helpers ---------- */
const pad = (n) => String(n).padStart(2, "0");
const toKey = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; // timezone-safe
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
  d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
const startOfToday = () => {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
};
const groupOf = (t) => {
  const { h } = parseTime(t);
  return h < 12 ? "Morning" : h < 17 ? "Afternoon" : "Evening";
};

/* ---------- calendar file (.ics) download ---------- */
const downloadIcs = (a) => {
  const start = toDateTime(a.dateKey, a.time);
  const end = new Date(start.getTime() + SLOT_MINUTES * 60000);
  const f = (d) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const stamp =
    new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
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

.dr-root{--ink:#0f172a;--muted:#64748b;--line:#e2e8f0;--teal:#0d9488;--teal-d:#0f766e;--teal-l:#ccfbf1;--teal-xl:#f0fdfa;--bg:#f4faf9;--red:#dc2626;--cell:38px;
  font-family:'DM Sans',ui-sans-serif,system-ui,sans-serif;background:var(--bg);color:var(--ink);min-height:100vh}
.dr-root *{box-sizing:border-box}
.dr-display{font-family:'Bricolage Grotesque','DM Sans',sans-serif;letter-spacing:-.02em}
.dr-wrap{max-width:1100px;margin:0 auto;padding:36px 24px 80px}
.dr-back{display:inline-flex;align-items:center;gap:6px;color:var(--teal-d);font-size:14px;font-weight:500;text-decoration:none;margin-bottom:24px}
.dr-back:hover{text-decoration:underline}
.dr-grid{display:grid;gap:28px}
@media(min-width:960px){.dr-grid{grid-template-columns:370px 1fr;align-items:start}.dr-profile{position:sticky;top:24px}.dr-mobile-cta{display:none!important}}

@keyframes dr-fade{from{opacity:0}to{opacity:1}}
@keyframes dr-spin{to{transform:rotate(360deg)}}
@keyframes dr-shimmer{to{background-position:-200% 0}}
.dr-fade{animation:dr-fade .25s ease-out both}

/* ---- profile ---- */
.dr-profile{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,.06);border:1px solid #eef2f6}
.dr-photo{position:relative;height:290px;background:linear-gradient(135deg,#134e4a,#0d9488);overflow:hidden}
.dr-photo img{width:100%;height:100%;object-fit:cover}
.dr-photo::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(2,6,23,.55),transparent 55%)}
.dr-initial{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:120px;font-weight:800;color:rgba(255,255,255,.15)}
.dr-chip-spec{position:absolute;left:20px;bottom:20px;z-index:1;background:#fff;color:var(--teal-d);font-size:12px;font-weight:600;padding:6px 14px;border-radius:999px}
.dr-pbody{padding:26px}
.dr-name{font-size:28px;font-weight:800;margin:0;line-height:1.15}
.dr-qual{margin:10px 0 0;color:var(--muted);font-size:14px;line-height:1.5}
.dr-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:12px;margin-top:22px}
.dr-stat{background:var(--teal-xl);border-radius:14px;padding:14px}
.dr-stat small{display:flex;align-items:center;gap:5px;color:var(--muted);font-size:11px}
.dr-stat b{display:block;margin-top:6px;font-size:15px}
.dr-fee{display:flex;justify-content:space-between;align-items:center;margin-top:22px;padding-top:22px;border-top:1px solid var(--line)}
.dr-fee small{color:var(--muted);font-size:13px}
.dr-fee b{font-size:26px;color:var(--teal-d)}

/* ---- status badge ---- */
.dr-badge{display:inline-block;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600}
.dr-badge.pending{background:#fef3c7;color:#92400e}
.dr-badge.accepted{background:#dcfce7;color:#166534}
.dr-badge.denied,.dr-badge.cancelled{background:#fee2e2;color:#991b1b}

/* ---- buttons ---- */
.dr-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;border:0;border-radius:12px;padding:14px 18px;font:inherit;font-size:15px;font-weight:600;cursor:pointer;color:#fff;background:var(--teal);text-decoration:none;transition:background .2s}
.dr-btn:hover:not(:disabled){background:var(--teal-d)}
.dr-btn:disabled{opacity:.6;cursor:not-allowed}
.dr-btn.ghost{background:#fff;color:var(--ink);box-shadow:inset 0 0 0 1px #cbd5e1}
.dr-btn.ghost:hover:not(:disabled){background:#f1f5f9}
.dr-mobile-cta{margin-top:22px}

/* ---- booking panel ---- */
.dr-panel{background:#fff;border-radius:20px;padding:30px;box-shadow:0 10px 30px rgba(15,23,42,.06);border:1px solid #eef2f6;scroll-margin-top:16px}
@media(max-width:520px){.dr-panel{padding:22px 18px}.dr-wrap{padding:28px 16px 64px}}
.dr-title{font-size:26px;font-weight:800;margin:0}
.dr-sub{margin:6px 0 0;color:var(--muted);font-size:14px;line-height:1.5}
.dr-steps{display:flex;gap:10px;margin:22px 0 24px;padding:0;list-style:none}
.dr-step{flex:1;display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:#94a3b8}
.dr-step i{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#e2e8f0;color:#64748b;font-style:normal;font-size:12px;flex-shrink:0;transition:background .2s,color .2s}
.dr-step.on{color:var(--ink)}
.dr-step.on i{background:var(--teal);color:#fff}
.dr-step.done i{background:var(--teal-l);color:var(--teal-d)}
@media(max-width:520px){.dr-step span{display:none}}

/* ---- calendar + time slots saath me ---- */
.dr-pick{display:grid;gap:24px}
@media(min-width:680px){.dr-pick{grid-template-columns:auto 1fr;align-items:start}}

.dr-cal{width:fit-content;max-width:100%;margin:0 auto;border:1px solid var(--line);border-radius:16px;padding:16px 16px 18px;background:linear-gradient(180deg,#fff,var(--teal-xl))}
@media(min-width:680px){.dr-cal{margin:0}}
.dr-calhead{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.dr-calhead h3{margin:0;font-size:15px;font-weight:700}
.dr-nav{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;border:0;background:#fff;color:var(--ink);cursor:pointer;box-shadow:inset 0 0 0 1px var(--line);transition:background .2s,color .2s}
.dr-nav:hover:not(:disabled){background:var(--teal);color:#fff}
.dr-nav:disabled{opacity:.35;cursor:not-allowed}
.dr-week,.dr-days{display:grid;grid-template-columns:repeat(7,var(--cell));gap:4px}
@media(max-width:380px){.dr-root{--cell:34px}}
.dr-week{text-align:center;font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:6px}
.dr-day{width:var(--cell);height:var(--cell);border:0;border-radius:10px;background:transparent;font:inherit;font-size:13px;color:var(--ink);cursor:pointer;position:relative;transition:background .15s,color .15s}
.dr-day:hover:not(:disabled):not(.sel){background:var(--teal-l)}
.dr-day:disabled{color:#cbd5e1;cursor:default}
.dr-day.today:not(.sel)::after{content:"";position:absolute;left:50%;bottom:4px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--teal)}
.dr-day.today:not(.sel){font-weight:700;color:var(--teal-d)}
.dr-day.sel{background:var(--teal);color:#fff;font-weight:700}
.dr-empty{height:var(--cell);visibility:hidden}

/* ---- time slots ---- */
.dr-times{min-width:0}
.dr-times h4{margin:0 0 4px;font-size:15px}
.dr-times p.hint{margin:0 0 10px;color:var(--muted);font-size:13px}
.dr-group{margin-top:16px}
.dr-group small{display:block;margin-bottom:8px;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase}
.dr-slots{display:flex;flex-wrap:wrap;gap:10px}
.dr-slot{padding:8px 16px;border-radius:999px;border:1px solid var(--teal);background:#fff;color:var(--teal-d);font:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:background .15s,color .15s}
.dr-slot:hover:not(:disabled):not(.sel){background:var(--teal-xl)}
.dr-slot.sel{background:var(--teal);color:#fff}
.dr-slot:disabled{border-color:var(--line);color:#cbd5e1;cursor:not-allowed;text-decoration:line-through;background:#f8fafc}
.dr-timeempty{display:flex;align-items:center;gap:12px;height:100%;min-height:120px;padding:20px;border:1px dashed #cbd5e1;border-radius:16px;color:#94a3b8;font-size:13px;line-height:1.5}
.dr-timeempty svg{flex-shrink:0;color:var(--teal)}
.dr-timeempty p{margin:0}

/* ---- form ---- */
.dr-sec{margin-top:26px;padding-top:24px;border-top:1px solid var(--line)}
.dr-form{display:grid;gap:18px;margin-top:16px}
.dr-field label{display:block;margin-bottom:8px;font-size:13px;font-weight:600}
.dr-input{width:100%;border:1px solid var(--line);background:#f8fafc;border-radius:12px;padding:13px 16px;font:inherit;font-size:14px;color:var(--ink);outline:none;transition:border-color .2s,box-shadow .2s,background .2s}
.dr-input:focus{background:#fff;border-color:var(--teal);box-shadow:0 0 0 3px rgba(13,148,136,.15)}
.dr-input.bad{border-color:var(--red)}
textarea.dr-input{resize:vertical;min-height:80px}
.dr-err{margin:8px 0 0;color:var(--red);font-size:13px}
.dr-summary{display:flex;align-items:center;gap:10px;background:var(--teal-xl);border-radius:12px;padding:14px 16px;font-size:14px;color:var(--teal-d);font-weight:600}
.dr-spin{width:16px;height:16px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:dr-spin .7s linear infinite}

/* ---- success ---- */
.dr-ok{text-align:center;padding:16px 0 4px}
.dr-okicon{display:grid;place-items:center;width:68px;height:68px;margin:0 auto;border-radius:50%;background:var(--teal-l);color:var(--teal-d)}
.dr-okcard{margin:24px 0;border:1px solid var(--line);border-radius:14px;text-align:left;overflow:hidden}
.dr-okrow{display:flex;justify-content:space-between;gap:12px;padding:14px 18px;font-size:14px}
.dr-okrow + .dr-okrow{border-top:1px solid #f1f5f9}
.dr-okrow span{color:var(--muted)}
.dr-okrow b{text-align:right}
.dr-okbtns{display:grid;gap:12px}
.dr-okbtns .row{display:grid;gap:12px}
@media(min-width:520px){.dr-okbtns .row{grid-template-columns:1fr 1fr}}

/* ---- my appointments ---- */
.dr-mine{margin-top:32px;padding-top:24px;border-top:1px solid var(--line)}
.dr-mine h3{margin:0 0 14px;font-size:17px}
.dr-appt{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--line);border-radius:12px;margin-bottom:10px;transition:border-color .2s,background .2s}
.dr-appt:hover{border-color:#99f6e4;background:var(--teal-xl)}
.dr-appt b{display:block;font-size:14px;margin-bottom:4px}
.dr-appt small{color:var(--muted);font-size:12px}
.dr-link{border:0;background:none;color:var(--red);font:inherit;font-size:13px;font-weight:600;cursor:pointer;padding:6px 10px;border-radius:8px}
.dr-link:hover{background:#fef2f2}
.dr-link.neutral{color:var(--muted)}
.dr-link.neutral:hover{background:#f1f5f9}

/* ---- states ---- */
.dr-center{text-align:center;padding:100px 16px}
.dr-center h2{margin:0 0 8px;font-size:22px}
.dr-center p{margin:0 0 20px;color:var(--muted)}
.dr-skel{background:linear-gradient(90deg,#e2e8f0,#f1f5f9,#e2e8f0);background-size:200% 100%;animation:dr-shimmer 1.4s linear infinite;border-radius:20px}

@media (prefers-reduced-motion:reduce){
  .dr-fade,.dr-skel,.dr-spin{animation:none}
  .dr-day,.dr-slot,.dr-nav,.dr-btn{transition:none}
}
`;

export default function Doctorid() {
  const { id } = useParams();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------- booking state ----------
  const today = startOfToday();
  const [viewMonth, setViewMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    reason: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [appointments, setAppointments] = useState([]); // meri saari appointments (server se)
  const [booked, setBooked] = useState([]); // chuni hui date ke bhare hue times
  const [cancelId, setCancelId] = useState(null);
  const [slotError, setSlotError] = useState("");
  const [bookError, setBookError] = useState("");
  const [tick, setTick] = useState(0); // bhare hue times dobara laane ke liye

  const selKey = selectedDate ? toKey(selectedDate) : null;
  const monthKey = `${viewMonth.getFullYear()}-${viewMonth.getMonth()}`;
  const step = !selectedDate ? 1 : !selectedTime ? 2 : 3;

  // user baad me load ho to naam / phone khud bhar do (agar form khali hai)
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      name: f.name || user.name || "",
      phone: f.phone || user.phone || "",
    }));
  }, [user]);

  // ---------- doctor fetch ----------
  useEffect(() => {
    setLoading(true);
    setError("");
    setDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setConfirmation(null);
    window.scrollTo(0, 0);

    api
      .get(`/products/${id}`)
      .then((res) => {
        let data = res.data;
        if (data && data.data) data = data.data;
        if (Array.isArray(data)) data = data[0];
        if (!data) throw new Error("not found");
        setDoctor(data);
      })
      .catch((err) => {
        console.error("Doctor fetch error:", err);
        setError(
          err.response?.status === 404
            ? "Doctor nahi mila"
            : "Doctor load nahi ho paya",
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ---------- meri appointments (server se) ----------
  const loadAppointments = useCallback(() => {
    api
      .get("/appointments/mine")
      .then((res) =>
        setAppointments(
          res.data.map((a) => ({
            ...a,
            id: a._id,
            dateLabel: prettyDate(fromKey(a.dateKey)),
          })),
        ),
      )
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  // ---------- chuni hui date par kaun se times bhare hain ----------
  useEffect(() => {
    if (!selKey) {
      setBooked([]);
      return;
    }
    let cancelled = false;
    api
      .get("/appointments/booked", {
        params: { doctorId: id, dateKey: selKey },
      })
      .then((res) => {
        if (!cancelled) setBooked(res.data.booked || []);
      })
      .catch(() => {
        if (!cancelled) setBooked([]);
      });
    return () => {
      cancelled = true;
    };
  }, [id, selKey, tick]);

  // is doctor ke saath meri aane wali (pending / accepted) appointments
  const upcoming = useMemo(() => {
    const now = new Date();
    return appointments
      .filter(
        (a) =>
          String(a.doctorId) === String(id) &&
          ["pending", "accepted"].includes(a.status) &&
          toDateTime(a.dateKey, a.time) >= now,
      )
      .sort(
        (a, b) => toDateTime(a.dateKey, a.time) - toDateTime(b.dateKey, b.time),
      );
  }, [appointments, id]);

  const slotStatus = (date, time) => {
    if (booked.includes(time)) return "booked";
    if (toDateTime(toKey(date), time) <= new Date()) return "past";
    return "free";
  };

  // ---------- calendar ----------
  const days = useMemo(() => {
    const y = viewMonth.getFullYear();
    const m = viewMonth.getMonth();
    const list = Array(new Date(y, m, 1).getDay()).fill(null);
    for (let d = 1; d <= new Date(y, m + 1, 0).getDate(); d++)
      list.push(new Date(y, m, d));
    return list;
  }, [viewMonth]);

  const canGoPrev =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() &&
      viewMonth.getMonth() > today.getMonth());
  const monthsAhead =
    (viewMonth.getFullYear() - today.getFullYear()) * 12 +
    (viewMonth.getMonth() - today.getMonth());
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
    setBookError("");
  };

  // ---------- booking ----------
  const validate = () => {
    const errs = {};
    if (form.name.trim().length < 2) errs.name = "Apna poora naam likho";
    const digits = form.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
    if (!/^[6-9]\d{9}$/.test(digits))
      errs.phone = "10 digit ka sahi mobile number likho";
    setFormErrors(errs);
    return { ok: Object.keys(errs).length === 0, digits };
  };

  const confirmBooking = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    const { ok, digits } = validate();
    if (!ok) return;

    setSaving(true);
    setBookError("");
    try {
      const res = await api.post("/appointments", {
        doctorId: id,
        dateKey: toKey(selectedDate),
        time: selectedTime,
        patientName: form.name.trim(),
        phone: digits,
        reason: form.reason.trim(),
      });
      setConfirmation(res.data);
      setSelectedDate(null);
      setSelectedTime(null);
      setForm({ name: user?.name || "", phone: user?.phone || "", reason: "" });
      loadAppointments();
    } catch (err) {
      const status = err.response?.status;
      const msg =
        err.response?.data?.message || "Booking nahi ho paayi, dobara try karo";
      if (status === 409) {
        // Slot kisi aur ne le liya: time hata ke bhare hue times dobara lo
        setSelectedTime(null);
        setSlotError(msg);
        setTick((t) => t + 1);
      } else if (status === 401) {
        setBookError("Appointment book karne ke liye pehle login karo");
      } else {
        setBookError(msg);
      }
    } finally {
      setSaving(false);
    }
  };

  const cancelAppointment = async (apptId) => {
    try {
      await api.patch(`/appointments/${apptId}/cancel`);
      loadAppointments();
      setTick((t) => t + 1);
    } catch (err) {
      setBookError(err.response?.data?.message || "Cancel nahi ho paya");
    } finally {
      setCancelId(null);
    }
  };

  const bookAnother = () => {
    setConfirmation(null);
    setSlotError("");
    setBookError("");
  };

  const scrollToBooking = () =>
    document
      .getElementById("booking")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* ---------- loading / error (saare hooks ke baad) ---------- */
  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <Navbar />
        <div className="dr-root">
          <div className="dr-wrap">
            <div className="dr-grid">
              <div className="dr-skel" style={{ height: 520 }} />
              <div className="dr-skel" style={{ height: 520 }} />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !doctor) {
    return (
      <>
        <style>{styles}</style>
        <Navbar />
        <div className="dr-root">
          <div className="dr-wrap">
            <div className="dr-center">
              <h2 className="dr-display">{error || "Doctor nahi mila"}</h2>
              <p>Dobara try karo ya wapas jao.</p>
              <Link to="/" className="dr-back">
                <Icon d={I.back} size={16} /> Back
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ---------- derived values (doctor ab pakka hai) ---------- */
  const patients =
    doctor.patients || doctor.patientsTreated || doctor.totalPatients;

  const freeCount = selectedDate
    ? TIME_SLOTS.filter((t) => slotStatus(selectedDate, t) === "free").length
    : 0;

  const grouped = GROUP_ORDER.map((g) => [
    g,
    TIME_SLOTS.filter((t) => groupOf(t) === g),
  ]).filter(([, slots]) => slots.length > 0);

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
            <aside className="dr-profile dr-fade">
              <div className="dr-photo">
                {doctor.image ? (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <span className="dr-initial dr-display">
                    {doctor.name?.[0]}
                  </span>
                )}
                {doctor.specialization && (
                  <span className="dr-chip-spec">{doctor.specialization}</span>
                )}
              </div>

              <div className="dr-pbody">
                <h1 className="dr-name dr-display">{doctor.name}</h1>
                {doctor.qualification && (
                  <p className="dr-qual">{doctor.qualification}</p>
                )}

                {(doctor.experience || patients) && (
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
                )}

                {doctor.consultationFee && (
                  <div className="dr-fee">
                    <small>Consultation fee</small>
                    <b className="dr-display">
                      ₹{Number(doctor.consultationFee).toLocaleString("en-IN")}
                    </b>
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
            <section id="booking" className="dr-panel dr-fade">
              {confirmation ? (
                /* ---------- success ---------- */
                <div className="dr-ok dr-fade">
                  <div className="dr-okicon">
                    <Icon d={I.clock} size={34} />
                  </div>
                  <h2 className="dr-title dr-display" style={{ marginTop: 18 }}>
                    Request bhej di gayi
                  </h2>
                  <p className="dr-sub">
                    Doctor ke accept ya deny karne tak appointment{" "}
                    <b>Pending</b> rahegi.
                  </p>

                  <div className="dr-okcard">
                    <div className="dr-okrow">
                      <span>Doctor</span>
                      <b>{confirmation.doctorName}</b>
                    </div>
                    <div className="dr-okrow">
                      <span>Date</span>
                      <b>{prettyDate(fromKey(confirmation.dateKey))}</b>
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
                    <div className="dr-okrow">
                      <span>Status</span>
                      <b>
                        <span className="dr-badge pending">⏳ Pending</span>
                      </b>
                    </div>
                  </div>

                  <div className="dr-okbtns">
                    <Link to="/Appointment" className="dr-btn">
                      Meri appointments dekho
                    </Link>
                    <div className="row">
                      <button
                        className="dr-btn ghost"
                        onClick={() =>
                          downloadIcs({
                            ...confirmation,
                            id: confirmation._id || confirmation.id,
                          })
                        }
                      >
                        <Icon d={I.down} size={16} /> Add to calendar
                      </button>
                      <button className="dr-btn ghost" onClick={bookAnother}>
                        Book another
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="dr-title dr-display">Book your appointment</h2>
                  <p className="dr-sub">
                    Date chuno, time chuno aur apni details bhar do.
                  </p>

                  <ol className="dr-steps">
                    {[
                      [1, "Date"],
                      [2, "Time"],
                      [3, "Details"],
                    ].map(([n, label]) => (
                      <li
                        key={n}
                        className={`dr-step ${step === n ? "on" : ""} ${step > n ? "done" : ""}`}
                      >
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
                          type="button"
                          className="dr-nav"
                          onClick={() => changeMonth(-1)}
                          disabled={!canGoPrev}
                          aria-label="Pichla mahina"
                        >
                          <Icon d={I.back} size={15} />
                        </button>
                        <h3 className="dr-display">
                          {MONTHS[viewMonth.getMonth()]}{" "}
                          {viewMonth.getFullYear()}
                        </h3>
                        <button
                          type="button"
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

                      <div className="dr-days" key={monthKey}>
                        {days.map((date, i) => {
                          if (!date)
                            return <span key={i} className="dr-empty" />;
                          const disabled = date < today;
                          const sel =
                            selectedDate && toKey(date) === toKey(selectedDate);
                          const isToday = toKey(date) === toKey(today);
                          return (
                            <button
                              type="button"
                              key={i}
                              disabled={disabled}
                              onClick={() => pickDate(date)}
                              aria-pressed={!!sel}
                              aria-label={prettyDate(date)}
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
                            {freeCount > 0
                              ? `${freeCount} slots khali`
                              : "Koi slot khali nahi. Dusri date chuno."}
                          </p>

                          {slotError && (
                            <p
                              className="dr-err"
                              style={{ marginBottom: 8 }}
                              role="alert"
                            >
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
                                      type="button"
                                      key={t}
                                      disabled={st !== "free"}
                                      onClick={() => {
                                        setSelectedTime(t);
                                        setSlotError("");
                                      }}
                                      title={
                                        st === "booked"
                                          ? "Booked"
                                          : st === "past"
                                            ? "Time nikal gaya"
                                            : ""
                                      }
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
                          <p>
                            Pehle calendar se date chuno, phir yahan available
                            times dikhenge.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ---------- patient details ---------- */}
                  {selectedDate && selectedTime && (
                    <form
                      className="dr-sec dr-fade"
                      onSubmit={confirmBooking}
                      noValidate
                    >
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
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                            placeholder="Jaise Rahul Sharma"
                            autoComplete="name"
                          />
                          {formErrors.name && (
                            <p className="dr-err">{formErrors.name}</p>
                          )}
                        </div>

                        <div className="dr-field">
                          <label htmlFor="dr-phone">Mobile number</label>
                          <input
                            id="dr-phone"
                            className={`dr-input ${formErrors.phone ? "bad" : ""}`}
                            value={form.phone}
                            onChange={(e) =>
                              setForm({ ...form, phone: e.target.value })
                            }
                            placeholder="10 digit number"
                            inputMode="tel"
                            autoComplete="tel"
                          />
                          {formErrors.phone && (
                            <p className="dr-err">{formErrors.phone}</p>
                          )}
                        </div>

                        <div className="dr-field">
                          <label htmlFor="dr-reason">
                            Kya problem hai? (optional)
                          </label>
                          <textarea
                            id="dr-reason"
                            className="dr-input"
                            value={form.reason}
                            onChange={(e) =>
                              setForm({ ...form, reason: e.target.value })
                            }
                            placeholder="Doctor ko batane ke liye chhota sa note"
                          />
                        </div>

                        {bookError && (
                          <p className="dr-err" role="alert" style={{ margin: 0 }}>
                            {bookError}
                          </p>
                        )}

                        <button
                          type="submit"
                          className="dr-btn"
                          disabled={saving}
                        >
                          {saving ? (
                            <>
                              <span className="dr-spin" /> Booking ho rahi
                              hai...
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

                  {/* form na dikh raha ho tab bhi error dikhe (jaise cancel fail) */}
                  {bookError && !(selectedDate && selectedTime) && (
                    <p className="dr-err" role="alert" style={{ marginTop: 16 }}>
                      {bookError}
                    </p>
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
                        <small>
                          {a.patientName} ·{" "}
                          <span className={`dr-badge ${a.status}`}>
                            {a.status === "accepted"
                              ? "✅ Accepted"
                              : "⏳ Pending"}
                          </span>
                        </small>
                      </div>

                      {cancelId === a.id ? (
                        <div>
                          <button
                            type="button"
                            className="dr-link"
                            onClick={() => cancelAppointment(a.id)}
                          >
                            Haan, cancel karo
                          </button>
                          <button
                            type="button"
                            className="dr-link neutral"
                            onClick={() => setCancelId(null)}
                          >
                            Nahi
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="dr-link"
                          onClick={() => setCancelId(a.id)}
                        >
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
