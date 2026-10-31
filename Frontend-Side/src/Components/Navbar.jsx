import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Features ki common list (My Profile par laal dot)
const featureLinksAll = [
  { to: "/SafetyChecker", icon: "🛡️", label: "AI Safety Checker" },
  { to: "/SafetyPlanner", icon: "🧭", label: "AI Safety Planner" },
  { to: "/Documents", icon: "📂", label: "My Documents" },
  { to: "/Relatives", icon: "👥", label: "Emergency Contacts" },
  { to: "/Help", icon: "💬", label: "Help & Support" },
  { to: "/HealthTips", icon: "🙂", label: "Yours Health-Tips" },
  { to: "/Profile", icon: "👤", label: "My Profile", dot: true },
];

// ---------- Patient (aur logged-out visitor) ----------
const patientMenu = [
  { to: "/Doctors", icon: "🩺", label: "Doctors" },
  { to: "/Medicines", icon: "💊", label: "Medicines" },
  { to: "/Emergency", icon: "🚨", label: "Emergency" },
  { to: "/Appointment", icon: "📅", label: "Appointments" },
  { to: "/Schemes", icon: "🏛️", label: "Govt. Schemes" },
  { to: "/About", icon: "ℹ️", label: "About Us" },
];
const patientFeatures = featureLinksAll;

// ---------- Doctor ----------
const doctorMenu = [
  { to: "/patients", icon: "🧑‍⚕️", label: "Patients" },
  { to: "/Emergency", icon: "🚨", label: "Emergency" },
  { to: "/Appointment", icon: "📅", label: "Appointments" },
];
const doctorFeatures = featureLinksAll.filter((l) => l.to !== "/HealthTips");

const DESKTOP_Q = "(min-width: 768px)";
const W_SIDE = 260;
const STORAGE_KEY = "cpn-sidebar-open";

// sessionStorage safe read/write (private mode me error na aaye)
function readSaved() {
  try {
    return sessionStorage.getItem(STORAGE_KEY); // "1" | "0" | null
  } catch {
    return null;
  }
}
function writeSaved(value) {
  try {
    sessionStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  } catch {
    /* ignore */
  }
}

function Brand({ imgClass = "cpn-logo-img" }) {
  return (
    <>
    
      <img src="/Logo.png" alt="CarePoint Logo" className={imgClass} />
      <span className="cpn-brand">
        Care<span>Point</span>
      </span>
    </>
  );
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  // ---- Doctor / Patient role ----
  const isDoctor = user?.role === "doctor";
  // Auth check hone tak menu khali, taaki galat role ka menu na chamke
  const menuLinks = loading ? [] : isDoctor ? doctorMenu : patientMenu;
  const featureLinks = loading ? [] : isDoctor ? doctorFeatures : patientFeatures;
  const homePath = isDoctor ? "/patients" : "/";

  const firstName = (user?.name || "").trim().split(" ")[0];
  const greetName = isDoctor && !/^dr\.?$/i.test(firstName) ? `Dr. ${firstName}` : firstName;
  const initial = (user?.name || "?").trim().charAt(0).toUpperCase();

  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(DESKTOP_Q).matches
  );

  // Desktop: pehli baar open, uske baad jo user ne last choose kiya wahi yaad rahega
  // Mobile: hamesha closed
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    const desk = window.matchMedia(DESKTOP_Q).matches;
    if (!desk) return false;
    return readSaved() !== "0";
  });

  const [scrolled, setScrolled] = useState(false);

  // 1) Screen size tracking
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_Q);
    const onChange = (e) => {
      setIsDesktop(e.matches);
      setOpen(e.matches ? readSaved() !== "0" : false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // 2) Desktop par open/close ka choice save karo
  useEffect(() => {
    if (isDesktop) writeSaved(open);
  }, [open, isDesktop]);

  // 3) Mobile: page badalne par drawer band
  useEffect(() => {
    if (!isDesktop) setOpen(false);
  }, [location.pathname, isDesktop]);

  // 4) Navbar shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 5) Esc se band (mobile)
  useEffect(() => {
    if (isDesktop || !open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, isDesktop]);

  // 6) Desktop: sidebar khula ho to content right me shift
  useEffect(() => {
    const body = document.body;
    body.style.transition = "padding-left .3s ease";
    body.style.paddingLeft = isDesktop && open ? `${W_SIDE}px` : "0px";
    return () => {
      body.style.paddingLeft = "";
      body.style.transition = "";
    };
  }, [open, isDesktop]);

  // 7) Mobile: drawer khula ho to scroll lock
  useEffect(() => {
    if (isDesktop) return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isDesktop]);

  const close = () => setOpen(false);

  const handleLogout = async () => {
    if (!window.confirm("Kya aap logout karna chahte hain?")) return;
    try {
      await logout();
    } finally {
      close();
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <style>{`
        .cpn-header, .cpn-side {
          --bg: #45d2d2;
          --ink: #053d3d;
          --ink-soft: #0a5f5f;
          --deep: #0b6b6b;
          --glass: rgba(255,255,255,0.35);
          --glass-border: rgba(255,255,255,0.65);
          --red: #d24545;
          --h: 66px;
        }
        .cpn-header *, .cpn-header *::before, .cpn-header *::after,
        .cpn-side *, .cpn-side *::before, .cpn-side *::after { box-sizing: border-box; }

        /* ---------- Navbar ---------- */
        .cpn-header {
          position: sticky; top: 0; z-index: 50; width: 100%;
          background: var(--bg); color: var(--ink);
          box-shadow: 0 2px 8px rgba(5,61,61,0.15);
          transition: box-shadow .3s ease;
          animation: cpn-in .5s ease both;
        }
        .cpn-header.scrolled { box-shadow: 0 6px 18px rgba(5,61,61,0.25); }
        .cpn-line { height: 3px; width: 100%; background: var(--deep); transform-origin: left; animation: cpn-line .8s ease both; }
        .cpn-bar { height: var(--h); padding: 0 16px; display: flex; align-items: center; gap: 12px; }

        .cpn-round-btn {
          position: relative; width: 46px; height: 46px; min-width: 46px; flex: 0 0 46px;
          border-radius: 50%; padding: 0; cursor: pointer; color: var(--ink);
          background: var(--glass); border: 1.5px solid var(--glass-border);
          display: inline-flex; align-items: center; justify-content: center;
          transition: background-color .25s ease, color .25s ease;
        }
        .cpn-round-btn:hover { background: #fff; }
        .cpn-round-btn:focus-visible, .cpn-s-link:focus-visible, .cpn-logo:focus-visible,
        .cpn-auth-link:focus-visible, .cpn-me:focus-visible {
          outline: 3px solid var(--deep); outline-offset: 2px;
        }
        .cpn-x { position: relative; width: 20px; height: 16px; display: block; }
        .cpn-x i { position: absolute; left: 0; top: 7px; width: 20px; height: 2px; border-radius: 2px; background: currentColor; }
        .cpn-x i:nth-child(1) { transform: rotate(45deg); }
        .cpn-x i:nth-child(2) { transform: rotate(-45deg); }

        .cpn-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; border-radius: 12px; }
        .cpn-logo-img {
          width: 46px; height: 46px; min-width: 46px; flex: 0 0 46px;
          border-radius: 50%; background: #fff; padding: 4px;
          object-fit: contain; display: block; border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(5,61,61,0.2);
        }
        .cpn-brand { font-size: 21px; font-weight: 800; letter-spacing: .3px; line-height: 1; white-space: nowrap; color: var(--ink); }
        .cpn-brand span { color: #fff; text-shadow: 0 1px 2px rgba(5,61,61,0.35); }

        /* ---------- Login / Signup / Hi, name ---------- */
        .cpn-auth { margin-left: auto; display: flex; align-items: center; gap: 10px; }
        .cpn-auth-link {
          height: 40px; padding: 0 18px; display: inline-flex; align-items: center; justify-content: center;
          border-radius: 999px; font-size: 15px; font-weight: 700; text-decoration: none; white-space: nowrap;
          color: var(--ink); background: var(--glass); border: 1.5px solid var(--glass-border);
          transition: background-color .25s ease, color .25s ease;
        }
        .cpn-auth-link:hover { background: #fff; }
        .cpn-auth-link.primary { background: var(--deep); border-color: var(--deep); color: #fff; }
        .cpn-auth-link.primary:hover { background: var(--ink); }
        .cpn-me { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--ink); font-weight: 700; border-radius: 999px; }
        .cpn-avatar {
          width: 40px; height: 40px; flex: 0 0 40px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          background: var(--deep); color: #fff; font-weight: 800; font-size: 17px; border: 2px solid #fff;
        }
        .cpn-hi { max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        /* ---------- Sidebar ---------- */
        .cpn-side {
          position: fixed; left: 0; top: 0; bottom: 0; z-index: 60;
          width: ${W_SIDE}px; background: var(--bg); color: var(--ink);
          box-shadow: 2px 0 12px rgba(5,61,61,0.2);
          display: flex; flex-direction: column;
          transform: translateX(-100%); visibility: hidden;
          transition: transform .3s ease, visibility 0s linear .3s;
        }
        .cpn-side.show { transform: none; visibility: visible; transition: transform .3s ease, visibility 0s; }

        .cpn-side-head {
          flex: 0 0 auto; height: calc(var(--h) + 3px); padding: 3px 14px 0 14px;
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          border-bottom: 3px solid var(--deep);
        }
        .cpn-side-scroll { flex: 1 1 auto; overflow-y: auto; padding: 14px 14px 24px; }

        .cpn-s-title {
          margin: 6px 6px 8px; font-size: 11px; font-weight: 800; letter-spacing: .8px;
          text-transform: uppercase; color: var(--ink-soft);
        }
        .cpn-s-title.second { margin-top: 20px; }
        .cpn-s-list { display: flex; flex-direction: column; gap: 8px; }

        .cpn-s-link {
          position: relative; display: flex; align-items: center; gap: 12px;
          height: 52px; padding: 0 8px; border-radius: 14px; text-decoration: none;
          font-size: 16px; font-weight: 700; white-space: nowrap;
          color: var(--ink); background: var(--glass); border: 1.5px solid var(--glass-border);
          transition: background-color .25s ease, color .25s ease;
        }
        .cpn-s-link.active { background: var(--deep); border-color: var(--deep); color: #fff; }
        .cpn-s-emoji {
          width: 36px; height: 36px; flex: 0 0 36px; border-radius: 50%; background: #fff;
          display: inline-flex; align-items: center; justify-content: center; font-size: 18px;
        }
        .cpn-s-arrow { margin-left: auto; margin-right: 6px; opacity: .6; font-size: 20px; }
        .cpn-dot { position: absolute; top: 8px; left: 36px; width: 11px; height: 11px; border-radius: 50%; background: var(--red); border: 2px solid #fff; }

        .cpn-side-foot {
          flex: 0 0 auto; padding: 12px 14px 16px; border-top: 3px solid var(--deep);
          display: flex; flex-direction: column; gap: 8px;
        }
        button.cpn-foot-btn { width: 100%; cursor: pointer; font-family: inherit; text-align: left; }
        button.cpn-foot-btn:hover { background: #fff; }

        .cpn-backdrop {
          position: fixed; inset: 0; z-index: 55; background: rgba(5,61,61,0.45);
          opacity: 0; pointer-events: none; transition: opacity .3s ease;
        }
        .cpn-backdrop.show { opacity: 1; pointer-events: auto; }

        @keyframes cpn-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
        @keyframes cpn-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        @media (max-width: 767px) {
          .cpn-header, .cpn-side { --h: 62px; }
          .cpn-bar { padding: 0 14px; }
          .cpn-logo-img { width: 42px; height: 42px; min-width: 42px; flex-basis: 42px; }
          .cpn-brand { font-size: 19px; }
          .cpn-side { width: min(82vw, ${W_SIDE + 30}px); }
          .cpn-auth-link { height: 38px; padding: 0 14px; font-size: 14px; }
        }
        @media (max-width: 520px) { .cpn-hi { display: none; } }
        @media (max-width: 340px) { .cpn-bar .cpn-brand { display: none; } }

        @media (prefers-reduced-motion: reduce) {
          .cpn-header, .cpn-line { animation: none; }
          .cpn-side, .cpn-backdrop, .cpn-round-btn, .cpn-s-link, .cpn-auth-link { transition: none; }
        }
      `}</style>

      {/* ================= NAVBAR ================= */}
      <header className={`cpn-header ${scrolled ? "scrolled" : ""}`}>
        <div className="cpn-line" />
        <div className="cpn-bar">
          {/* Desktop par sidebar khula ho to logo sidebar me dikhta hai, isliye yahan chhupa hai */}
          {(!isDesktop || !open) && (
            <Link
              to={homePath}
              className="cpn-logo"
              aria-label="CarePoint Home"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Brand />
            </Link>
          )}

          {/* Login / Signup ya "Hi, naam" */}
          {!loading && (
            <div className="cpn-auth">
              {user ? (
                <Link to="/Profile" className="cpn-me" aria-label="My Profile">
                  {/* <span className="cpn-avatar" aria-hidden="true">{initial}</span> */}
                  <span className="cpn-hi">Hi, {greetName}</span>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="cpn-auth-link">Login</Link>
                  <Link to="/signup" className="cpn-auth-link primary">Sign up</Link>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mobile backdrop */}
      {!isDesktop && (
        <div className={`cpn-backdrop ${open ? "show" : ""}`} onClick={close} aria-hidden="true" />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside id="cpn-sidebar" aria-label="Sidebar" className={`cpn-side ${open ? "show" : ""}`}>
        <div className="cpn-side-head">
          <Link   className="cpn-logo" aria-label="CarePoint Home" onClick={close}>
            <Brand />
          </Link>
          <button type="button" onClick={close} aria-label="Close sidebar" className="cpn-round-btn">
            <span className="cpn-x" aria-hidden="true"><i /><i /></span>
          </button>
        </div>

        <div className="cpn-side-scroll">
          <p className="cpn-s-title">Menu</p>
          <nav className="cpn-s-list" aria-label="Main">
            {menuLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={close}
                className={({ isActive }) => `cpn-s-link ${isActive ? "active" : ""}`}
              >
                <span className="cpn-s-emoji" aria-hidden="true">{l.icon}</span>
                {l.label}
                <span className="cpn-s-arrow" aria-hidden="true">›</span>
              </NavLink>
            ))}
          </nav>

          {featureLinks.length > 0 && (
            <>
              <p className="cpn-s-title second">Features</p>
              <div className="cpn-s-list">
                {featureLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={close}
                    className={({ isActive }) => `cpn-s-link ${isActive ? "active" : ""}`}
                  >
                    <span className="cpn-s-emoji" aria-hidden="true">{l.icon}</span>
                    {l.label}
                    {l.dot && <span className="cpn-dot" />}
                  </NavLink>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Sidebar ke neeche: Login / Signup ya Logout */}
        {/* {!loading && (
          <div className="cpn-side-foot">
            {user ? (
              <button type="button" className="cpn-s-link cpn-foot-btn" onClick={handleLogout}>
                <span className="cpn-s-emoji" aria-hidden="true">🚪</span>
                Logooout
              </button>
            ) : (
              <>
                <NavLink to="/login" onClick={close} className="cpn-s-link">
                  <span className="cpn-s-emoji" aria-hidden="true">🔑</span>
                  Login
                </NavLink>
                <NavLink to="/signup" onClick={close} className="cpn-s-link">
                  <span className="cpn-s-emoji" aria-hidden="true">📝</span>
                  Sign up
                </NavLink>
              </>
            )} */}
          {/* </div> */}
        {/* )} */}
      </aside>
    </>
  );
}

export default Navbar;
