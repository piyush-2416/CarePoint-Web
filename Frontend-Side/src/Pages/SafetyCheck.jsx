import { useEffect, useRef, useState } from "react";

// Your Server.js runs on port 3000
const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const HERO_BG =
  "https://verityai.co/_next/image?url=https:%2F%2Fcdn.sanity.io%2Fimages%2F5v26bvj8%2Fproduction%2F6f435aa4e6278b4345a91cec90c3a10ef6e02e40-1536x1024.png&w=1080&q=75";

/* Backend (routes/Safety.js) validates these exact `value` strings, so keep them as-is.
   Only the `label` (what the user sees) is in English. If you change the backend lists
   to English later, update the `value` fields too. */
const PLACES = [
  { value: "Ghar par", label: "At home" },
  { value: "Raaste / sadak par", label: "On the road / street" },
  { value: "Cab / auto / bus mein", label: "In a cab / auto / bus" },
  { value: "Office / college mein", label: "At office / college" },
  { value: "Anjaan jagah par", label: "In an unfamiliar place" },
  { value: "Anya", label: "Other" },
];
const TIMES = [
  { value: "Din", label: "Day" },
  { value: "Raat", label: "Night" },
];
const COMPANY = ["Alone", "With someone"];

const HOLD_MS = 1500; // how long the SOS button must be held
const GRACE_SECONDS = 60; // time to respond after the timer ends
const MAX_CONTACTS = 5;
const PROFILE_KEY = "mc_safety_profile";
const TIMER_KEY = "mc_safety_timer";
const DEFAULT_PROFILE = { name: "", phone: "", contacts: [], alertCommunity: true };

const EMERGENCY = [
  { n: "112", l: "All emergencies" },
  { n: "100", l: "Police" },
  { n: "101", l: "Fire" },
  { n: "108", l: "Ambulance" },
  { n: "1091", l: "Women helpline" },
];

const LEVEL = {
  safe: { label: "Safe", cls: "safe" },
  caution: { label: "Caution", cls: "caution" },
  danger: { label: "Possible danger", cls: "danger" },
  emergency: { label: "Emergency", cls: "emergency" },
};

/* ----------------------------- helpers ----------------------------- */
async function api(path, opts = {}) {
  let res;
  try {
    res = await fetch(`${API}${path}`, { headers: { "Content-Type": "application/json" }, ...opts });
  } catch {
    throw new Error("Could not connect to the backend. Is the server (port 3000) running?");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Server error");
  return data;
}

// "+91 98765-43210" -> "9876543210" (null if invalid)
const cleanPhone = (raw) => {
  const last10 = String(raw ?? "").replace(/\D/g, "").slice(-10);
  return /^[6-9]\d{9}$/.test(last10) ? last10 : null;
};

const mapsLink = (c) => `https://maps.google.com/?q=${c.lat},${c.lng}`;

// Get location; resolves null if permission is denied or it takes too long (SOS still goes out)
function getLocation() {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude, accuracy: p.coords.accuracy }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 15000 }
    );
  });
}

// Data stays only in this device's browser (contacts are never sent to the server)
function usePersisted(key, initial) {
  const [v, setV] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      if (v === null || v === undefined) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(v));
    } catch {
      /* page keeps working even if storage fails */
    }
  }, [key, v]);
  return [v, setV];
}

const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

/* ------------------------------ styles ------------------------------
   Everything is scoped to this page (sc- prefix) so global CSS
   (index.css / App.css) rules like `button:active { background: white }`
   cannot break the colors. Every button's hover / focus / active state
   sets its background explicitly here. */
const CSS = `
.sc-page {
  --green: #1f9d55; --green-d: #17843f; --green-l: #3cb371; --mint: #e8f6ee;
  --navy: #0b2a6f; --navy-d: #081c4d; --blue: #2f6fd1;
  --ink: #12233f; --muted: #5b6b80; --line: #dce9e1; --bg: #f2f8f4;
  --red: #e5484d; --red-d: #c93338;
  background: var(--bg); min-height: 100vh; color: var(--ink); text-align: left;
  font-family: inherit; overflow-x: clip; -webkit-tap-highlight-color: transparent;
}
.sc-page *, .sc-page *::before, .sc-page *::after { box-sizing: border-box; }
.sc-page button, .sc-page input, .sc-page textarea { font: inherit; }
.sc-page h1, .sc-page h2, .sc-page h3, .sc-page h4, .sc-page p { margin: 0; }

/* ---------- Buttons (every state has a fixed bg) ---------- */
.sc-page .sc-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 44px; padding: 0 20px; border-radius: 999px; cursor: pointer;
  font-size: 14px; font-weight: 700; line-height: 1; text-decoration: none; white-space: nowrap;
  border: 1.5px solid transparent; transition: transform .15s ease, box-shadow .2s ease, background-color .2s ease;
  -webkit-appearance: none; appearance: none;
}
.sc-page .sc-btn:active { transform: scale(.97); }
.sc-page .sc-btn:focus-visible { outline: 3px solid rgba(47,111,209,.45); outline-offset: 2px; }
.sc-page .sc-btn:disabled { opacity: .65; cursor: not-allowed; }

.sc-page .sc-primary, .sc-page .sc-primary:hover, .sc-page .sc-primary:focus, .sc-page .sc-primary:active {
  color: #fff; background: linear-gradient(135deg, #3cb371 0%, #1f9d55 100%);
  box-shadow: 0 8px 20px rgba(31,157,85,.28);
}
.sc-page .sc-primary:hover { background: linear-gradient(135deg, #34a566 0%, #17843f 100%); box-shadow: 0 10px 24px rgba(31,157,85,.36); }
.sc-page .sc-primary:active { background: linear-gradient(135deg, #2f9a5e 0%, #146f36 100%); }

.sc-page .sc-danger, .sc-page .sc-danger:hover, .sc-page .sc-danger:focus, .sc-page .sc-danger:active {
  color: #fff; background: linear-gradient(135deg, #f0555a 0%, #d63a40 100%); box-shadow: 0 8px 20px rgba(229,72,77,.28);
}
.sc-page .sc-danger:hover { background: linear-gradient(135deg, #e44a4f 0%, #c93338 100%); }
.sc-page .sc-danger:active { background: linear-gradient(135deg, #d63f44 0%, #b92c32 100%); }

.sc-page .sc-ghost, .sc-page .sc-ghost:focus {
  color: var(--navy); background: #fff; border-color: #cfe1d6;
}
.sc-page .sc-ghost:hover { color: var(--navy); background: var(--mint); border-color: var(--green-l); }
.sc-page .sc-ghost:active { color: var(--navy); background: #d6eee0; border-color: var(--green); }

.sc-page .sc-wa, .sc-page .sc-wa:hover, .sc-page .sc-wa:focus, .sc-page .sc-wa:active { color: #fff; background: #22b35a; }
.sc-page .sc-wa:hover { background: #1c9d4f; }
.sc-page .sc-wa:active { background: #178443; }

.sc-page .sc-sm { min-height: 36px; padding: 0 14px; font-size: 13px; }
.sc-page .sc-block { width: 100%; min-height: 52px; font-size: 16px; }

/* ---------- Hero ---------- */
.sc-hero { position: relative; overflow: hidden; background: linear-gradient(120deg, #081c4d, #0e6b48); padding: 56px 20px 130px; }
.sc-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
.sc-hero::before {
  content: ""; position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(105deg, rgba(8,28,77,.93) 0%, rgba(10,84,70,.82) 52%, rgba(60,179,113,.45) 100%);
}
.sc-hero-in { position: relative; z-index: 2; max-width: 1040px; margin: 0 auto; animation: sc-fade .6s ease both; }
.sc-badge {
  display: inline-flex; align-items: center; gap: 8px; padding: 7px 16px; border-radius: 999px;
  background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.3); color: #fff; font-size: 13px; font-weight: 600;
  backdrop-filter: blur(6px);
}
.sc-dot { width: 8px; height: 8px; border-radius: 50%; background: #7ff0a8; animation: sc-blink 1.8s ease-in-out infinite; }
.sc-hero h1 { margin-top: 18px; font-size: clamp(32px, 5.2vw, 54px); line-height: 1.1; font-weight: 800; color: #fff; letter-spacing: -.5px; }
.sc-hero h1 span { color: #8df0b5; }
.sc-hero-sub { margin-top: 14px; max-width: 560px; font-size: 17px; line-height: 1.55; color: #dff5e8; }
.sc-calls { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 26px; }
.sc-calls-label { font-size: 14px; font-weight: 600; color: #bfeed2; }
.sc-page .sc-call, .sc-page .sc-call:focus, .sc-page .sc-call:active {
  display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 999px; text-decoration: none;
  font-size: 14px; color: #fff; background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.32);
  backdrop-filter: blur(6px); transition: background-color .2s ease, transform .15s ease;
}
.sc-page .sc-call:hover { background: rgba(255,255,255,.28); }
.sc-page .sc-call:active { transform: scale(.97); background: rgba(255,255,255,.22); }
.sc-page .sc-call:focus-visible { outline: 3px solid rgba(255,255,255,.7); outline-offset: 2px; }

/* ---------- Layout ---------- */
.sc-main { position: relative; z-index: 3; max-width: 1040px; margin: -78px auto 0; padding: 0 20px 72px; display: flex; flex-direction: column; gap: 24px; }
.sc-card { background: #fff; border-radius: 24px; padding: 28px; border: 1px solid #e3efe8; box-shadow: 0 8px 28px rgba(8,28,77,.06); }
.sc-sec-head { display: flex; align-items: flex-start; gap: 14px; }
.sc-ico { flex-shrink: 0; width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; font-size: 22px; background: var(--mint); }
.sc-sec-head h2 { font-size: 21px; font-weight: 800; color: var(--navy); }
.sc-sec-head p { margin-top: 4px; font-size: 14px; line-height: 1.5; color: var(--muted); }
.sc-sec-body { margin-top: 22px; }

/* ---------- SOS ---------- */
.sc-sos {
  background: #fff; border-radius: 28px; padding: 32px; border: 1px solid #e3efe8; border-top: 5px solid var(--red);
  box-shadow: 0 24px 60px rgba(8,28,77,.16);
  display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: center;
}
.sc-sos h2 { font-size: 26px; font-weight: 800; color: var(--navy); }
.sc-sos-p { margin-top: 8px; max-width: 480px; font-size: 15px; line-height: 1.6; color: var(--muted); }
.sc-sos-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
.sc-warn { margin-top: 16px; padding: 12px 16px; border-radius: 14px; background: #fff7e0; border: 1px solid #f6dc9a; color: #8a5a00; font-size: 14px; line-height: 1.5; }
.sc-ring { position: relative; width: 196px; height: 196px; padding: 9px; border-radius: 50%; display: grid; place-items: center; }
.sc-ring.idle::after {
  content: ""; position: absolute; inset: -4px; border-radius: 50%; border: 2px solid rgba(229,72,77,.5);
  animation: sc-pulse 2.2s ease-out infinite; pointer-events: none;
}
.sc-page .sc-sosbtn, .sc-page .sc-sosbtn:hover, .sc-page .sc-sosbtn:focus, .sc-page .sc-sosbtn:active {
  width: 100%; height: 100%; border-radius: 50%; border: none; cursor: pointer; color: #fff;
  background: radial-gradient(circle at 35% 28%, #ff7478 0%, #e5484d 45%, #c4272d 100%);
  box-shadow: 0 14px 30px rgba(229,72,77,.45), inset 0 -6px 14px rgba(0,0,0,.14);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  touch-action: none; user-select: none; -webkit-user-select: none; transition: transform .15s ease;
}
.sc-page .sc-sosbtn:active { transform: scale(.94); }
.sc-page .sc-sosbtn:disabled { opacity: .75; cursor: progress; }
.sc-page .sc-sosbtn:focus-visible { outline: 4px solid rgba(47,111,209,.5); outline-offset: 3px; }
.sc-sosbtn b { font-size: 40px; font-weight: 800; letter-spacing: 1px; line-height: 1; }
.sc-sosbtn small { font-size: 12px; font-weight: 600; color: #ffe1e2; }

.sc-sent { grid-column: 1 / -1; }
.sc-sent-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; }
.sc-sent h2 { color: var(--red-d); }
.sc-status { margin-top: 14px; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 14px; color: var(--muted); }
.sc-sent-label { margin-top: 18px; font-size: 14px; font-weight: 700; color: var(--ink); }
.sc-pre { margin-top: 8px; padding: 14px 16px; border-radius: 14px; background: #f4f9f6; border: 1px solid var(--line); font: inherit; font-size: 14px; line-height: 1.55; color: var(--ink); white-space: pre-wrap; }

/* ---------- Form ---------- */
.sc-form { display: flex; flex-direction: column; gap: 22px; }
.sc-label { display: flex; flex-direction: column; gap: 8px; font-size: 14px; font-weight: 700; color: var(--ink); }
.sc-input, .sc-textarea {
  width: 100%; padding: 13px 16px; border-radius: 14px; font-size: 16px; font-weight: 400; color: var(--ink);
  background: #f6faf8; border: 1.5px solid #d6e6dc; outline: none; transition: border-color .2s ease, box-shadow .2s ease, background-color .2s ease;
}
.sc-input::placeholder, .sc-textarea::placeholder { color: #94a3b8; }
.sc-input:focus, .sc-textarea:focus { background: #fff; border-color: var(--green); box-shadow: 0 0 0 4px rgba(31,157,85,.15); }
.sc-textarea { resize: none; line-height: 1.5; }
.sc-counter { align-self: flex-end; font-size: 12px; font-weight: 500; color: #94a3b8; }
.sc-counter.ok { color: var(--green); }
.sc-two { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
.sc-q { font-size: 14px; font-weight: 700; color: var(--ink); }
.sc-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
.sc-page .sc-chip, .sc-page .sc-chip:focus {
  padding: 9px 16px; border-radius: 999px; cursor: pointer; font-size: 14px; font-weight: 600; color: var(--ink);
  background: #fff; border: 1.5px solid #d6e6dc; transition: background-color .2s ease, border-color .2s ease, transform .15s ease;
}
.sc-page .sc-chip:hover { background: var(--mint); border-color: var(--green-l); color: var(--ink); }
.sc-page .sc-chip:active { transform: scale(.97); background: #d6eee0; }
.sc-page .sc-chip.on, .sc-page .sc-chip.on:hover, .sc-page .sc-chip.on:focus, .sc-page .sc-chip.on:active {
  color: #fff; border-color: transparent; background: linear-gradient(135deg, #3cb371, #1f9d55); box-shadow: 0 6px 14px rgba(31,157,85,.28);
}
.sc-page .sc-chip:focus-visible { outline: 3px solid rgba(47,111,209,.45); outline-offset: 2px; }
.sc-error { margin-top: 18px; padding: 14px 18px; border-radius: 14px; background: #fff0f2; border: 1px solid #f5b1bb; color: #b4232f; font-size: 14px; }
.sc-spin { width: 18px; height: 18px; animation: sc-rot .9s linear infinite; }

/* ---------- Result ---------- */
.sc-result { margin-top: 24px; scroll-margin-top: 24px; padding: 22px; border-radius: 20px; border: 1px solid; border-left-width: 6px; }
.sc-result.safe { background: #effaf3; border-color: #b7e4c7; border-left-color: #22b35a; }
.sc-result.caution { background: #fff9e8; border-color: #f6dc9a; border-left-color: #f2b01e; }
.sc-result.danger { background: #fff3ea; border-color: #f7c59a; border-left-color: #f08a2c; }
.sc-result.emergency { background: #fff0f2; border-color: #f5b1bb; border-left-color: var(--red); }
.sc-note { margin-bottom: 12px; padding: 8px 12px; border-radius: 12px; background: rgba(255,255,255,.7); color: #8a5a00; font-size: 12px; }
.sc-result-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; }
.sc-result-top h3 { font-size: 19px; font-weight: 800; color: var(--ink); }
.sc-lvl { padding: 5px 14px; border-radius: 999px; font-size: 12px; font-weight: 800; }
.safe .sc-lvl { background: #c9efd7; color: #11632f; }
.caution .sc-lvl { background: #fdeab0; color: #7a5200; }
.danger .sc-lvl { background: #fcd9b6; color: #8a4208; }
.emergency .sc-lvl { background: #fbc9cf; color: #a11c28; }
.sc-happen { margin-top: 10px; font-size: 15px; line-height: 1.6; color: #2a3b55; }
.sc-callnow { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.sc-result h4 { margin-top: 20px; font-size: 15px; font-weight: 800; color: var(--ink); }
.sc-list { margin: 10px 0 0; padding-left: 22px; display: flex; flex-direction: column; gap: 7px; font-size: 14px; line-height: 1.55; color: #22324b; }
.sc-result-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
.sc-sharebox { margin-top: 16px; padding: 16px; border-radius: 16px; background: rgba(255,255,255,.85); }

/* ---------- Contact actions ---------- */
.sc-ca { margin-top: 12px; }
.sc-ca-list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; }
.sc-ca-item { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 14px; background: #fff; border: 1px solid var(--line); }
.sc-who { flex: 1 1 140px; min-width: 0; }
.sc-who b { display: block; font-size: 14px; color: var(--ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sc-who span { font-size: 12px; color: var(--muted); }
.sc-ca-extra { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }

/* ---------- Timer ---------- */
.sc-timer-on { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 24px; border-radius: 20px; background: linear-gradient(135deg, #eaf7ef, #e6effc); border: 1px solid #cfe6d8; }
.sc-timer-on p { font-size: 14px; color: var(--muted); }
.sc-time { margin-top: 2px; font-size: 46px; font-weight: 800; line-height: 1.1; color: var(--navy); font-variant-numeric: tabular-nums; }
.sc-timer-opts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
.sc-tip { margin-top: 14px; font-size: 12px; color: #8696a8; }

/* ---------- Contacts ---------- */
.sc-check { display: flex; align-items: flex-start; gap: 12px; margin-top: 18px; padding: 14px 16px; border-radius: 14px; background: #f4f9f6; border: 1px solid var(--line); font-size: 14px; line-height: 1.5; color: #2a3b55; cursor: pointer; }
.sc-check input { flex-shrink: 0; width: 20px; height: 20px; margin: 1px 0 0; accent-color: var(--green); cursor: pointer; }
.sc-sub { margin-top: 26px; font-size: 16px; font-weight: 800; color: var(--navy); }
.sc-clist { margin: 10px 0 0; padding: 0; list-style: none; }
.sc-clist li { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 0; border-bottom: 1px solid #ecf3ef; }
.sc-clist li:last-child { border-bottom: none; }
.sc-avatar { flex-shrink: 0; width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; background: var(--mint); color: var(--green-d); font-weight: 800; }
.sc-clist .sc-who { display: flex; align-items: center; gap: 12px; flex: 1; }
.sc-clist .sc-who div { min-width: 0; }
.sc-page .sc-rm, .sc-page .sc-rm:focus { color: #6b7a8c; background: #fff; border: 1.5px solid #dbe5df; }
.sc-page .sc-rm:hover { color: #b4232f; background: #fff0f2; border-color: #f5b1bb; }
.sc-page .sc-rm:active { color: #b4232f; background: #fde0e4; border-color: #ef9aa6; }
.sc-add { display: grid; grid-template-columns: 1fr 1fr auto; gap: 12px; margin-top: 14px; }
.sc-ferr { margin-top: 10px; font-size: 14px; color: #b4232f; }

.sc-foot { padding: 0 4px; font-size: 13px; line-height: 1.6; color: #7a8a9c; }

/* ---------- Timer alert (full screen) ---------- */
.sc-modal { position: fixed; inset: 0; z-index: 80; display: grid; place-items: center; padding: 20px; background: rgba(8,28,77,.86); backdrop-filter: blur(4px); animation: sc-fade .2s ease both; }
.sc-modal-card { width: 100%; max-width: 440px; padding: 32px 28px; border-radius: 28px; background: #fff; text-align: center; box-shadow: 0 30px 80px rgba(0,0,0,.4); }
.sc-modal-card h2 { font-size: 26px; font-weight: 800; color: var(--red-d); }
.sc-modal-card p { margin-top: 8px; color: var(--muted); line-height: 1.5; }
.sc-count { margin: 18px 0; font-size: 60px; font-weight: 800; line-height: 1; color: var(--red); font-variant-numeric: tabular-nums; }
.sc-modal-card .sc-btn + .sc-btn { margin-top: 12px; }

@keyframes sc-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes sc-pulse { 0% { transform: scale(1); opacity: .9 } 100% { transform: scale(1.22); opacity: 0 } }
@keyframes sc-blink { 50% { opacity: .35 } }
@keyframes sc-rot { to { transform: rotate(360deg) } }

/* ---------- Responsive ---------- */
@media (max-width: 820px) {
  .sc-sos { grid-template-columns: 1fr; justify-items: center; text-align: center; padding: 28px 20px; }
  .sc-sos-p { margin-left: auto; margin-right: auto; }
  .sc-sos-actions { justify-content: center; }
  .sc-sent { text-align: left; }
}
@media (max-width: 640px) {
  .sc-hero { padding: 40px 16px 120px; }
  .sc-hero-sub { font-size: 15px; }
  .sc-main { padding: 0 14px 56px; gap: 18px; }
  .sc-card { padding: 22px 18px; border-radius: 20px; }
  .sc-two { grid-template-columns: 1fr; gap: 20px; }
  .sc-add { grid-template-columns: 1fr; }
  .sc-timer-opts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sc-time { font-size: 40px; }
  .sc-ring { width: 176px; height: 176px; }
}
@media (prefers-reduced-motion: reduce) {
  .sc-hero-in, .sc-modal, .sc-dot, .sc-ring.idle::after, .sc-spin { animation: none; }
  .sc-page .sc-btn, .sc-page .sc-chip, .sc-page .sc-call { transition: none; }
}
`;

/* ------------------------- small components ------------------------ */
const asOpt = (o) => (typeof o === "string" ? { value: o, label: o } : o);

function Chips({ label, options, value, onChange }) {
  return (
    <div>
      <p className="sc-q">{label}</p>
      <div className="sc-chips" role="radiogroup" aria-label={label}>
        {options.map(asOpt).map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={`sc-chip ${value === o.value ? "on" : ""}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Section({ icon, title, hint, children }) {
  return (
    <section className="sc-card">
      <div className="sc-sec-head">
        <span className="sc-ico" aria-hidden="true">{icon}</span>
        <div>
          <h2>{title}</h2>
          {hint && <p>{hint}</p>}
        </div>
      </div>
      <div className="sc-sec-body">{children}</div>
    </section>
  );
}

// WhatsApp / SMS / Call buttons for each trusted contact (a browser cannot send messages by itself)
function ContactActions({ message, contacts }) {
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy the message:", message);
    }
  };

  return (
    <div className="sc-ca">
      {contacts.length === 0 ? (
        <p className="sc-warn">
          You have no trusted contacts yet. Add some under "My contacts" below, or copy the message and send it to someone.
        </p>
      ) : (
        <ul className="sc-ca-list">
          {contacts.map((c) => (
            <li key={c.phone} className="sc-ca-item">
              <span className="sc-who">
                <b>{c.name}</b>
                <span>{c.phone}</span>
              </span>
              <a href={`https://wa.me/91${c.phone}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="sc-btn sc-sm sc-wa">
                WhatsApp
              </a>
              <a href={`sms:+91${c.phone}?body=${encodeURIComponent(message)}`} className="sc-btn sc-sm sc-ghost">SMS</a>
              <a href={`tel:+91${c.phone}`} className="sc-btn sc-sm sc-ghost">Call</a>
            </li>
          ))}
        </ul>
      )}
      <div className="sc-ca-extra">
        <button type="button" onClick={copy} className="sc-btn sc-sm sc-ghost">
          {copied ? "Copied ✓" : "Copy message"}
        </button>
        {canShare && (
          <button type="button" onClick={() => navigator.share({ text: message }).catch(() => {})} className="sc-btn sc-sm sc-ghost">
            Share
          </button>
        )}
      </div>
    </div>
  );
}

/* =========================== MAIN PAGE =========================== */
export default function SafetyCheck() {
  const [profile, setProfile] = usePersisted(PROFILE_KEY, DEFAULT_PROFILE);
  const prof = { ...DEFAULT_PROFILE, ...profile, contacts: profile?.contacts ?? [] };
  const [heroOk, setHeroOk] = useState(true);

  // safety check
  const [situation, setSituation] = useState("");
  const [place, setPlace] = useState("Raaste / sadak par");
  const [time, setTime] = useState("Raat");
  const [alone, setAlone] = useState(true);
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [shareMsg, setShareMsg] = useState(null);
  const resultRef = useRef(null);

  // SOS
  const [sos, setSos] = useState({ status: "idle" }); // idle | locating | sent
  const [hold, setHold] = useState(0);
  const holdRef = useRef({ start: 0, raf: 0 });
  const sosBusy = useRef(false);

  // safe-arrival timer
  const [endAt, setEndAt] = usePersisted(TIMER_KEY, null);
  const [now, setNow] = useState(Date.now());
  const [alertOpen, setAlertOpen] = useState(false);
  const [grace, setGrace] = useState(GRACE_SECONDS);
  const remaining = endAt ? Math.max(0, Math.ceil((endAt - now) / 1000)) : 0;

  // contacts form
  const [cName, setCName] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [formErr, setFormErr] = useState("");

  const saveProfile = (patch) => setProfile({ ...prof, ...patch });

  /* ----------------------------- SOS ----------------------------- */
  const sendSOS = async (reason = "button") => {
    if (sosBusy.current) return;
    sosBusy.current = true;
    setSos({ status: "locating" });

    const coords = await getLocation();
    const base =
      (result && ["danger", "emergency"].includes(result.level) && result.sosMessage) ||
      "I need help right now. Please call me or come to my location.";
    const message =
      `🚨 SOS${prof.name ? ` (${prof.name})` : ""}: ${base}\n` +
      (coords ? `Location: ${mapsLink(coords)}` : "Location could not be shared.");

    let communityAlerted = false;
    let note = "";
    let logged = true;
    try {
      const out = await api("/safety/sos", {
        method: "POST",
        body: JSON.stringify({
          name: prof.name.trim(),
          phone: prof.phone,
          message,
          lat: coords?.lat,
          lng: coords?.lng,
          accuracy: coords?.accuracy,
          level: result?.level || "emergency",
          reason,
          alertCommunity: prof.alertCommunity,
        }),
      });
      communityAlerted = out.communityAlerted;
      note = out.note || "";
    } catch {
      logged = false; // even if the server is unreachable you can still message your contacts directly
    }

    setSos({ status: "sent", message, coords, communityAlerted, note, logged });
    sosBusy.current = false;
    try { navigator.vibrate?.([200, 100, 200]); } catch { /* ignore */ }
  };

  // Hold the button for HOLD_MS (prevents accidental presses)
  const cancelHold = () => {
    cancelAnimationFrame(holdRef.current.raf);
    setHold(0);
  };
  const startHold = () => {
    if (sos.status === "locating") return;
    holdRef.current.start = performance.now();
    const tick = () => {
      const p = Math.min(1, (performance.now() - holdRef.current.start) / HOLD_MS);
      setHold(p);
      if (p >= 1) {
        cancelHold();
        sendSOS("button");
      } else {
        holdRef.current.raf = requestAnimationFrame(tick);
      }
    };
    holdRef.current.raf = requestAnimationFrame(tick);
  };
  useEffect(() => () => cancelAnimationFrame(holdRef.current.raf), []);

  /* ------------------------ safety check (AI) ------------------------ */
  const runCheck = async () => {
    setError("");
    if (situation.trim().length < 10) return setError("Describe the situation in a bit more detail (at least 10 characters).");
    setChecking(true);
    setResult(null);
    setShareMsg(null);
    try {
      const out = await api("/safety/assess", {
        method: "POST",
        body: JSON.stringify({ situation: situation.trim(), place, time, alone }),
      });
      setResult(out);
      setTimeout(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        resultRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }, 50);
    } catch (err) {
      setError(err.message);
    } finally {
      setChecking(false);
    }
  };

  const prepareShare = async () => {
    const coords = await getLocation();
    setShareMsg(`${result.sosMessage}${coords ? `\nLocation: ${mapsLink(coords)}` : ""}`);
  };

  /* ------------------------- safe-arrival timer ------------------------- */
  const startTimer = (minutes) => {
    setNow(Date.now());
    setEndAt(Date.now() + minutes * 60 * 1000);
  };

  useEffect(() => {
    if (!endAt) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [endAt]);

  // Timer finished: open the alert
  useEffect(() => {
    if (endAt && remaining === 0 && !alertOpen) {
      setAlertOpen(true);
      setGrace(GRACE_SECONDS);
      try { navigator.vibrate?.([300, 150, 300, 150, 300]); } catch { /* ignore */ }
    }
  }, [endAt, remaining, alertOpen]);

  // If there is still no response after the alert, send SOS automatically
  useEffect(() => {
    if (!alertOpen) return;
    const t = setInterval(() => setGrace((g) => g - 1), 1000);
    return () => clearInterval(t);
  }, [alertOpen]);

  useEffect(() => {
    if (alertOpen && grace <= 0) {
      setAlertOpen(false);
      setEndAt(null);
      sendSOS("timer");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertOpen, grace]);

  const imSafe = () => {
    setAlertOpen(false);
    setEndAt(null);
    setSos({ status: "idle" });
  };

  /* --------------------------- contacts --------------------------- */
  const addContact = () => {
    setFormErr("");
    const phone = cleanPhone(cPhone);
    if (!cName.trim()) return setFormErr("Enter the contact's name.");
    if (!phone) return setFormErr("Enter a valid 10-digit mobile number.");
    if (prof.contacts.length >= MAX_CONTACTS) return setFormErr(`You can keep at most ${MAX_CONTACTS} contacts.`);
    if (prof.contacts.some((c) => c.phone === phone)) return setFormErr("This number is already added.");
    saveProfile({ contacts: [...prof.contacts, { name: cName.trim().slice(0, 40), phone }] });
    setCName("");
    setCPhone("");
  };
  const removeContact = (phone) => saveProfile({ contacts: prof.contacts.filter((c) => c.phone !== phone) });

  const lvl = result ? LEVEL[result.level] ?? LEVEL.caution : null;
  const serious = result && ["danger", "emergency"].includes(result.level);
  const locating = sos.status === "locating";

  return (
    <div className="sc-page">
      <style>{CSS}</style>

      {/* ================= HERO ================= */}
      <header className="sc-hero">
        {heroOk && (
          <img className="sc-hero-img" src={HERO_BG} alt="" aria-hidden="true" onError={() => setHeroOk(false)} />
        )}
        <div className="sc-hero-in">
          <span className="sc-badge">
            <span className="sc-dot" />
            AI Powered · Instant safety advice
          </span>
          <h1>
            Personal Safety <span>Check &amp; SOS</span>
          </h1>
          <p className="sc-hero-sub">
            Describe your situation and the AI will tell you right away what to do. If you are in danger, alert your trusted people and your community with one button.
          </p>
          <div className="sc-calls">
            <span className="sc-calls-label">Call now:</span>
            {EMERGENCY.map((e) => (
              <a key={e.n} href={`tel:${e.n}`} className="sc-call">
                <b>{e.n}</b> · {e.l}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className="sc-main">
        {/* ================= SOS ================= */}
        <section className="sc-sos">
          {sos.status !== "sent" ? (
            <>
              <div>
                <h2>SOS</h2>
                <p className="sc-sos-p">
                  In danger? Press and hold the button for {HOLD_MS / 1000} seconds. Your location will be sent to your contacts and your community.
                </p>
                <div className="sc-sos-actions">
                  <button
                    type="button"
                    className="sc-btn sc-ghost"
                    onClick={() => window.confirm("Send SOS now?") && sendSOS("button")}
                  >
                    Can't hold? Send from here
                  </button>
                  <a href="tel:112" className="sc-btn sc-danger">📞 Call 112</a>
                </div>
                {prof.contacts.length === 0 && (
                  <p className="sc-warn">
                    First add 1-2 trusted people under "My contacts" below so your SOS can reach them.
                  </p>
                )}
              </div>

              <div
                className={`sc-ring ${hold === 0 && !locating ? "idle" : ""}`}
                style={{ background: `conic-gradient(#e5484d ${hold * 360}deg, #fde3e4 0deg)` }}
              >
                <button
                  type="button"
                  className="sc-sosbtn"
                  aria-label="Press and hold to send SOS"
                  disabled={locating}
                  onPointerDown={startHold}
                  onPointerUp={cancelHold}
                  onPointerLeave={cancelHold}
                  onPointerCancel={cancelHold}
                  onContextMenu={(e) => e.preventDefault()}
                  onKeyDown={(e) => { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); startHold(); } }}
                  onKeyUp={(e) => { if (e.key === " " || e.key === "Enter") cancelHold(); }}
                >
                  <b>SOS</b>
                  <small>{locating ? "Getting location..." : "Press & hold"}</small>
                </button>
              </div>
            </>
          ) : (
            <div className="sc-sent" role="status" aria-live="assertive">
              <div className="sc-sent-top">
                <h2>🚨 SOS is ready</h2>
                <button type="button" onClick={imSafe} className="sc-btn sc-primary">✓ I'm safe</button>
              </div>
              <ul className="sc-status">
                <li>{sos.coords ? `📍 Location found (±${Math.round(sos.coords.accuracy || 0)} m)` : "📍 Location unavailable: allow location permission in your browser."}</li>
                <li>
                  {sos.logged
                    ? sos.communityAlerted
                      ? "📣 Alert sent to the community."
                      : `📣 The community was not alerted. ${sos.note || "The setting is turned off."}`
                    : "⚠️ Could not reach the server. Send the message to your contacts directly below."}
                </li>
              </ul>
              <p className="sc-sent-label">Now send this message to your people (one tap per contact):</p>
              <pre className="sc-pre">{sos.message}</pre>
              <ContactActions message={sos.message} contacts={prof.contacts} />
              <a href="tel:112" className="sc-block sc-btn sc-danger" style={{ marginTop: 16 }}>
                📞 Call 112 now
              </a>
            </div>
          )}
        </section>

        {/* ================= SAFETY CHECK ================= */}
        <Section icon="🛡️" title="Safety check" hint="Describe your situation. The AI will tell you how serious it is and what to do right now.">
          <div className="sc-form">
            <label className="sc-label">
              What is happening?
              <textarea
                className="sc-textarea"
                rows={4}
                maxLength={500}
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="For example: I'm walking home alone at night, the road is empty and a bike is following me..."
              />
              <small className={`sc-counter ${situation.length >= 10 ? "ok" : ""}`}>{situation.length}/500</small>
            </label>

            <Chips label="Where are you?" options={PLACES} value={place} onChange={setPlace} />
            <div className="sc-two">
              <Chips label="Time of day" options={TIMES} value={time} onChange={setTime} />
              <Chips
                label="Who are you with?"
                options={COMPANY}
                value={alone ? COMPANY[0] : COMPANY[1]}
                onChange={(v) => setAlone(v === COMPANY[0])}
              />
            </div>

            <button type="button" onClick={runCheck} disabled={checking} aria-busy={checking} className="sc-block sc-btn sc-primary">
              {checking ? (
                <>
                  <svg className="sc-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                  Checking...
                </>
              ) : (
                <>Check my safety <span aria-hidden="true">→</span></>
              )}
            </button>
          </div>

          {error && <div role="alert" className="sc-error">{error}</div>}

          {result && lvl && (
            <div ref={resultRef} className={`sc-result ${lvl.cls}`} aria-live="polite">
              {result.source === "fallback" && (
                <p className="sc-note">The AI is unavailable right now, so this is general advice.</p>
              )}
              <div className="sc-result-top">
                <h3>{result.headline}</h3>
                <span className="sc-lvl">{lvl.label}</span>
              </div>
              {result.whatsHappening && <p className="sc-happen">{result.whatsHappening}</p>}

              {(result.callNow ?? []).length > 0 && (
                <div className="sc-callnow">
                  {result.callNow.map((c) => (
                    <a key={c.number} href={`tel:${c.number}`} className="sc-btn sc-sm sc-danger" title={c.reason}>
                      {c.number} · {c.label}
                    </a>
                  ))}
                </div>
              )}

              <h4>Do this now</h4>
              <ol className="sc-list">
                {result.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>

              {(result.avoid ?? []).length > 0 && (
                <>
                  <h4>Do not do this</h4>
                  <ul className="sc-list">
                    {result.avoid.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </>
              )}

              <div className="sc-result-actions">
                {serious && (
                  <button type="button" onClick={() => sendSOS("check")} className="sc-btn sc-danger">Send SOS</button>
                )}
                <button type="button" onClick={prepareShare} className="sc-btn sc-ghost">Send an update to contacts</button>
                {result.checkAgainInMinutes && (
                  <button type="button" onClick={() => startTimer(result.checkAgainInMinutes)} className="sc-btn sc-ghost">
                    ⏱ Set a {result.checkAgainInMinutes} min safe timer
                  </button>
                )}
              </div>

              {shareMsg && (
                <div className="sc-sharebox">
                  <pre className="sc-pre">{shareMsg}</pre>
                  <ContactActions message={shareMsg} contacts={prof.contacts} />
                </div>
              )}
            </div>
          )}
        </Section>

        {/* ================= SAFE-ARRIVAL TIMER ================= */}
        <Section icon="⏱️" title="Safe-arrival timer" hint="Travelling alone? Set a timer. If you don't tap 'I'm safe' when time is up, SOS will be sent automatically.">
          {endAt ? (
            <div className="sc-timer-on">
              <div>
                <p>Time left to arrive safely</p>
                <p className="sc-time" aria-live="off">{mmss(remaining)}</p>
              </div>
              <button type="button" onClick={imSafe} className="sc-btn sc-primary">✓ I've arrived safely</button>
            </div>
          ) : (
            <div className="sc-timer-opts">
              {[15, 30, 60, 120].map((m) => (
                <button key={m} type="button" onClick={() => startTimer(m)} className="sc-btn sc-ghost">
                  {m < 60 ? `${m} minutes` : `${m / 60} hour${m / 60 > 1 ? "s" : ""}`}
                </button>
              ))}
            </div>
          )}
          <p className="sc-tip">Keep this page open (the timer may pause if the phone screen locks or the tab is closed).</p>
        </Section>

        {/* ================= CONTACTS + PROFILE ================= */}
        <Section icon="👥" title="My contacts" hint="This data stays only in this phone/browser and is not saved on any server.">
          <div className="sc-two">
            <label className="sc-label">
              Your name
              <input className="sc-input" value={prof.name} maxLength={60} onChange={(e) => saveProfile({ name: e.target.value })} placeholder="e.g. Rahul" />
            </label>
            <label className="sc-label">
              Your mobile number
              <input className="sc-input" inputMode="numeric" value={prof.phone} onChange={(e) => saveProfile({ phone: e.target.value })} placeholder="9876543210" />
            </label>
          </div>

          <label className="sc-check">
            <input type="checkbox" checked={prof.alertCommunity} onChange={(e) => saveProfile({ alertCommunity: e.target.checked })} />
            <span>On SOS, also send an alert to the community's Emergency page (your name, number and location will be visible to neighbours)</span>
          </label>

          <h3 className="sc-sub">Trusted contacts ({prof.contacts.length}/{MAX_CONTACTS})</h3>
          {prof.contacts.length > 0 && (
            <ul className="sc-clist">
              {prof.contacts.map((c) => (
                <li key={c.phone}>
                  <span className="sc-who">
                    <span className="sc-avatar" aria-hidden="true">{c.name.charAt(0).toUpperCase()}</span>
                    <div>
                      <b>{c.name}</b>
                      <span>{c.phone}</span>
                    </div>
                  </span>
                  <button type="button" onClick={() => removeContact(c.phone)} className="sc-btn sc-sm sc-rm" aria-label={`Remove ${c.name}`}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="sc-add">
            <input className="sc-input" value={cName} maxLength={40} onChange={(e) => setCName(e.target.value)} placeholder="Contact name" aria-label="Contact name" />
            <input className="sc-input" inputMode="numeric" value={cPhone} onChange={(e) => setCPhone(e.target.value)} placeholder="Mobile number" aria-label="Contact mobile number" />
            <button type="button" onClick={addContact} className="sc-btn sc-primary">+ Add</button>
          </div>
          {formErr && <p role="alert" className="sc-ferr">{formErr}</p>}
        </Section>

        <p className="sc-foot">
          These are AI suggestions, not professional or police advice. If your life is in danger, call 112 / 108 / 101 first. If you are struggling or very distressed, you can talk to Tele-MANAS (14416).
        </p>
      </main>

      {/* ================= TIMER ALERT (full screen) ================= */}
      {alertOpen && (
        <div role="alertdialog" aria-modal="true" aria-labelledby="timer-alert-title" className="sc-modal">
          <div className="sc-modal-card">
            <h2 id="timer-alert-title">Are you safe?</h2>
            <p>The timer has ended. If you don't respond within {grace} seconds, SOS will be sent automatically.</p>
            <p className="sc-count">{grace}</p>
            <button type="button" autoFocus onClick={imSafe} className="sc-block sc-btn sc-primary">
              Yes, I'm safe
            </button>
            <button
              type="button"
              onClick={() => { setAlertOpen(false); setEndAt(null); sendSOS("timer"); }}
              className="sc-block sc-btn sc-danger"
            >
              No, send SOS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
