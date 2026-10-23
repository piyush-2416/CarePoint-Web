import { useState } from "react";
import {
  Mail, Lock, Eye, EyeOff, User, ArrowRight, Stethoscope, CalendarDays, Pill,
  ShieldPlus, Clock, Heart, HeartPulse, Building2, Play,
} from "lucide-react";

/* Brand icons (naye lucide-react mein nahi aate) - inline SVG, footer ke liye */
const brand = (d) => ({ size = 16, fill = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} aria-hidden="true"><path d={d} /></svg>
);
const Facebook = brand("M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z");
const Apple = brand("M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701");
const Instagram = brand("M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z");
const Youtube = brand("M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z");
const Linkedin = brand("M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z");
const Twitter = brand("M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z");

/* ---------- IMAGES ---------- */
const IMG = {
  hero: "/carepoint-auth.png",            // public/carepoint-auth.png
  svcDoctors: "https://wallpapers.com/images/hd/mbbs-three-doctors-l6mpzm2z8xq90u8e.jpg",
  svcHospitals: "https://tse2.mm.bing.net/th/id/OIP.rGAa__1Ul0KuaYRWAQj4xQHaHa?r=0&w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3",
  svcMedicines: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
  svcAppointments: "https://tse2.mm.bing.net/th/id/OIP.ECYB6FsEQt0BJcw0oFinFgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  cta: "/images/cta-stethoscope.jpg",
  u1: "https://tse1.mm.bing.net/th/id/OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  u2: "https://images.squarespace-cdn.com/content/v1/5fd22557d1c30935fa6b4e6e/47524e5f-89e3-4a23-989e-864cb62e755d/Beauty+3.jpg",
  u3: "https://www.alephbookcompany.com/wp-content/uploads/2015/10/image002.png",
};

const why = [
  { icon: Stethoscope, t: "Expert Doctors", d: "Consult with certified and experienced doctors across multiple specialties." },
  { icon: Clock, t: "Quick & Easy Booking", d: "Book appointments in minutes with our simple and hassle-free process." },
  { icon: Pill, t: "Genuine Medicines", d: "Get original medicines with home delivery and great offers." },
  { icon: ShieldPlus, t: "Secure & Private", d: "Your data is safe with us. We follow strict privacy standards." },
];

const services = [
  { icon: Stethoscope, t: "Doctors", d: "Consult top specialists near you.", img: IMG.svcDoctors },
  { icon: Building2, t: "Hospitals", d: "Find the best hospitals near you.", img: IMG.svcHospitals },
  { icon: Pill, t: "Medicines", d: "Order medicines online with ease.", img: IMG.svcMedicines },
  { icon: CalendarDays, t: "Appointments", d: "Book your slot in a few clicks.", img: IMG.svcAppointments },
];

const reviews = [
  { n: "Priya Sharma", img: IMG.u1, q: "CarePoint has made my life so much easier. Booking appointments is quick and the doctors are really helpful!" },
  { n: "Rohit Kumar", img: IMG.u2, q: "I ordered my medicines from CarePoint and received them the next day. Great service and genuine products!" },
  { n: "Neha Singh", img: IMG.u3, q: "The platform is very user-friendly and keeps my family's health in check. Highly recommended!" },
];

function Logo({ small }) {
  return (
    <div className={`cp-logo ${small ? "small" : ""}`}>
      <HeartPulse className="cp-logo-ic" />
      <div>
        <div className="cp-logo-name">Care<span>Point</span></div>
        <div className="cp-logo-tag">Your Health, Our Priority</div>
      </div>
    </div>
  );
}

/* ---------- Brand icons (inline SVG, no extra package) ---------- */
const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#111" aria-hidden="true">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877f2" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function Auth() {
  const [mode, setMode] = useState("signin");
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", id: "", password: "", remember: false });

  const isIn = mode === "signin";

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: yahan apni login / signup API call lagao
    console.log(mode, form);
  };

  const social = (provider) => {
    // TODO: social login yahan lagao
    console.log("social login:", provider);
  };

  return (
    <div className="cp">
      <style>{css}</style>
      <section className="cpa">

      <div className="cpa-card">
        {/* ---------- LEFT: image ---------- */}
        <div className="cpa-left">
          <img src={IMG.hero} alt="CarePoint - Better Health, Brighter Tomorrow" />
        </div>

        {/* ---------- RIGHT: form ---------- */}
        <div className="cpa-right">
          <div className="cpa-top">
            <span>{isIn ? "New here?" : "Already a member?"}</span>
            <button type="button" className="cpa-link" onClick={() => setMode(isIn ? "signup" : "signin")}>
              {isIn ? "Create an account" : "Sign in"}
            </button>
          </div>

          <form className="cpa-form" onSubmit={onSubmit} noValidate>
            <h2>{isIn ? "Welcome Back" : "Create Account"} <span aria-hidden="true">{isIn ? "👋" : "🎉"}</span></h2>
            <p className="cpa-sub">
              {isIn
                ? "Sign in to your CarePoint account and continue your healthcare journey."
                : "Join CarePoint and start your healthcare journey today."}
            </p>

            <div className="cpa-tabs" role="tablist">
              <button type="button" role="tab" aria-selected={isIn} className={isIn ? "on" : ""} onClick={() => setMode("signin")}>Sign In</button>
              <button type="button" role="tab" aria-selected={!isIn} className={!isIn ? "on" : ""} onClick={() => setMode("signup")}>Sign Up</button>
            </div>

            {!isIn && (
              <div className="cpa-field">
                <label htmlFor="name">Full Name</label>
                <div className="cpa-input">
                  <User size={18} />
                  <input id="name" name="name" value={form.name} onChange={onChange} placeholder="Enter your full name" autoComplete="name" />
                </div>
              </div>
            )}

            <div className="cpa-field">
              <label htmlFor="id">Email or Phone Number</label>
              <div className="cpa-input">
                <Mail size={18} />
                <input id="id" name="id" value={form.id} onChange={onChange} placeholder="Enter your email or phone number" autoComplete="username" />
              </div>
            </div>

            <div className="cpa-field">
              <label htmlFor="password">Password</label>
              <div className="cpa-input">
                <Lock size={18} />
                <input
                  id="password" name="password" type={showPw ? "text" : "password"}
                  value={form.password} onChange={onChange} placeholder="Enter your password"
                  autoComplete={isIn ? "current-password" : "new-password"}
                />
                <button type="button" className="cpa-eye" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? "Hide password" : "Show password"}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isIn && (
              <div className="cpa-row">
                <label className="cpa-check">
                  <input type="checkbox" name="remember" checked={form.remember} onChange={onChange} />
                  <span className="box" />
                  Remember me
                </label>
                <button type="button" className="cpa-link">Forgot password?</button>
              </div>
            )}

            <button type="submit" className="cpa-submit">
              {isIn ? "Sign In" : "Create Account"} <ArrowRight size={18} />
            </button>

            <div className="cpa-or"><span>or continue with</span></div>

            <div className="cpa-social">
              <button type="button" onClick={() => social("google")}><GoogleIcon /> Google</button>
              <button type="button" onClick={() => social("apple")}><AppleIcon /> Apple</button>
              <button type="button" onClick={() => social("facebook")}><FacebookIcon /> Facebook</button>
            </div>

            <p className="cpa-terms">
              By continuing, you agree to our{" "}
              <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="cp-sec white">
        <div className="cp-eyebrow">WHY CHOOSE CAREPOINT</div>
        <h3>Your Complete Healthcare Partner</h3>
        <p className="cp-secsub">We make healthcare simple, accessible and reliable for you and your family.</p>
        <div className="cp-grid4 cp-wrap">
          {why.map(({ icon: I, t, d }) => (
            <div className="cp-why" key={t}>
              <span className="cp-circle"><I size={20} /></span>
              <b>{t}</b>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="cp-sec tint">
        <div className="cp-eyebrow">OUR SERVICES</div>
        <h3>Healthcare Made Simple</h3>
        <p className="cp-secsub">Explore our wide range of services designed for your well-being.</p>
        <div className="cp-grid4 cp-wrap">
          {services.map(({ icon: I, t, d, img }) => (
            <div className="cp-svc" key={t}>
              <div className="cp-svc-img" style={{ backgroundImage: `url(${img})` }} />
              <div className="cp-svc-body">
                <span className="cp-circle sm"><I size={16} /></span>
                <div><b>{t}</b><small>{d}</small></div>
                <span className="cp-arrow"><ArrowRight size={14} /></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cp-cta" style={{ "--cta": `url(${IMG.cta})` }}>
        <div className="cp-cta-in">
          <span className="cp-pill">Your Health Matters</span>
          <h3>Take the First Step Towards<br />a Healthier You</h3>
          <p>Join CarePoint today and experience a smarter,<br />simpler way to manage your health.</p>
          <div className="cp-cta-btns">
            <button type="button" onClick={() => { setMode("signup"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              Sign Up Now <ArrowRight size={14} />
            </button>
            <button type="button" className="ghost">Learn More</button>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="cp-sec white">
        <div className="cp-eyebrow">WHAT OUR USERS SAY</div>
        <h3>Trusted by Thousands</h3>
        <p className="cp-secsub">Real stories from real people who care about their health.</p>
        <div className="cp-grid3 cp-wrap">
          {reviews.map((r) => (
            <div className="cp-rev" key={r.n}>
              <p>“{r.q}”</p>
              <div className="cp-rev-foot">
                <img src={r.img} alt={r.n} />
                <div><b>{r.n}</b><small>Patient</small></div>
                <span className="stars">★★★★★</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="cp-footer">
        <div className="cp-foot-grid cp-wrap">
          <div>
            <Logo small />
            <p className="cp-foot-txt">
              We are committed to providing quality healthcare services and making healthcare accessible to everyone.
            </p>
            <div className="cp-socials">
              {[Facebook, Instagram, Youtube, Linkedin, Twitter].map((I, i) => (
                <a key={i} href="#social"><I size={14} /></a>
              ))}
            </div>
          </div>
          <div>
            <h5>Quick Links</h5>
            {["Home", "Doctors", "About", "Medicines", "Contact"].map((l) => <a key={l} href="#l">{l}</a>)}
          </div>
          <div>
            <h5>Support</h5>
            {["Help Center", "Terms & Conditions", "Privacy Policy", "FAQs"].map((l) => <a key={l} href="#l">{l}</a>)}
          </div>
          <div>
            <h5>Download Our App</h5>
            <p className="cp-foot-txt">Get the CarePoint app for a better healthcare experience.</p>
            <div className="cp-stores">
              <a href="#gp"><Play size={16} fill="#fff" /><span><small>GET IT ON</small>Google Play</span></a>
              <a href="#as"><Apple size={16} fill="#fff" /><span><small>Download on the</small>App Store</span></a>
            </div>
          </div>
        </div>
        <div className="cp-copy">
          <div className="cp-wrap">
            <span>© 2025 CarePoint. All rights reserved.</span>
            <span className="cp-script small">Your Health Our Priority <Heart size={12} /></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============================== STYLES ============================== */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@500;600&display=swap');

/* ===== page root (sections ke liye) ===== */
.cp{--teal:#0e9a8e;--teal2:#14b8a6;--deep:#0b4f5c;--ink:#0f3d4a;--muted:#5b7580;--tint:#e8f7f6;--line:#d5ece9;
 font-family:'Plus Jakarta Sans',system-ui,sans-serif;color:var(--ink);background:#fff;overflow-x:hidden;text-align:left;width:100%}
.cp *{box-sizing:border-box;margin:0}
.cp a{text-decoration:none;color:inherit}
.cp button{font-family:inherit;cursor:pointer}
.cp-wrap{max-width:1180px;margin-inline:auto}

/* --- reset: Vite ke default global CSS se bachne ke liye --- */
.cpa, .cpa *{box-sizing:border-box;margin:0;padding:0;text-align:left;letter-spacing:normal}
.cpa{--teal:#0b8f89;--teal-d:#087a75;--deep:#0b3f4d;--muted:#5f7a84;--line:#dbe7e9;
 --h:clamp(600px,min(76vh,65vw),680px);
 position:relative;width:100%;font-family:'Plus Jakarta Sans',system-ui,sans-serif;color:var(--deep);background:#fff}
.cpa :where(button){font:inherit;color:inherit;background:none;border:0;border-radius:0;cursor:pointer;line-height:1;box-shadow:none}
.cpa :where(input){font:inherit;color:inherit;background:none;border:0;outline:0;box-shadow:none;width:100%}
.cpa :where(a){color:inherit;text-decoration:none}
.cpa button:focus-visible,.cpa a:focus-visible{outline:2px solid var(--teal);outline-offset:3px}

/* hero: full width, image left + form right */
.cpa-card{position:relative;display:flex;width:100%;min-height:var(--h);background:#fff}
.cpa-left{position:relative;flex-shrink:0;width:calc(var(--h)*0.841);background:#e4f6f4;display:block}
.cpa-left img{display:block;width:100%;height:100%;object-fit:cover;object-position:left top}

.cpa-right{flex:1;min-width:0;display:flex;flex-direction:column;padding:14px clamp(24px,4vw,80px) 16px}
.cpa-top{display:flex;justify-content:flex-end;align-items:center;gap:8px;font-size:12.5px;color:var(--muted)}
.cpa-link{color:var(--teal);font-size:13px;font-weight:500;text-decoration:underline;text-underline-offset:3px}
.cpa-link:hover{color:var(--teal-d)}
.cpa-form{flex:1;width:100%;max-width:540px;margin:0 auto;display:flex;flex-direction:column;justify-content:center;padding:4px 0}
.cpa-form h2{font-size:clamp(24px,2.2vw,30px);font-weight:700;line-height:1.15;color:var(--deep)}
.cpa-sub{margin-top:6px;font-size:13.5px;line-height:1.5;color:var(--muted)}

.cpa-tabs{display:flex;margin:16px 0 0;height:44px;border:1px solid var(--line);border-radius:999px;background:#fff;padding:0}
.cpa-tabs button{flex:1;height:100%;border-radius:999px;font-size:14px;font-weight:600;color:var(--deep);text-align:center;transition:background .2s,color .2s}
.cpa-tabs button.on{background:linear-gradient(90deg,#0a8f88,#16a79c);color:#fff;box-shadow:0 6px 16px rgba(11,143,137,.25)}
.cpa-tabs button:not(.on):hover{background:#f1faf9}

.cpa-field{margin-top:11px}
.cpa-field label{display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:var(--deep)}
.cpa-input{display:flex;align-items:center;gap:12px;height:44px;padding:0 14px;border:1px solid var(--line);border-radius:10px;background:#fff;color:#7d949c;transition:border-color .15s,box-shadow .15s}
.cpa-input:focus-within{border-color:var(--teal);box-shadow:0 0 0 3px rgba(11,143,137,.15);color:var(--teal)}
.cpa-input svg{flex-shrink:0}
.cpa-input input{font-size:13.5px;color:var(--deep);height:100%}
.cpa-input input::placeholder{color:#a3b5bb}
.cpa-input input:-webkit-autofill{-webkit-box-shadow:0 0 0 100px #fff inset;-webkit-text-fill-color:var(--deep)}
.cpa-eye{display:grid;place-items:center;color:#7d949c;flex-shrink:0}
.cpa-eye:hover{color:var(--teal)}

.cpa-row{display:flex;justify-content:space-between;align-items:center;margin-top:10px}
.cpa-check{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--deep);cursor:pointer;position:relative}
.cpa-check input{position:absolute;opacity:0;width:0;height:0}
.cpa-check .box{width:18px;height:18px;border:1.5px solid #8aa0a7;border-radius:4px;background:#fff;display:grid;place-items:center;transition:.15s}
.cpa-check input:checked + .box{background:var(--teal);border-color:var(--teal)}
.cpa-check input:checked + .box::after{content:"";width:5px;height:9px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg) translate(-1px,-1px)}
.cpa-check input:focus-visible + .box{outline:2px solid var(--teal);outline-offset:2px}

.cpa-submit{width:100%;height:46px;margin-top:14px;border-radius:999px;display:flex;align-items:center;justify-content:center;gap:10px;
 background:linear-gradient(90deg,#0a8f88,#14a89d);color:#fff;font-size:15.5px;font-weight:600;
 box-shadow:0 10px 22px rgba(11,143,137,.28);transition:transform .15s,box-shadow .15s}
.cpa-submit:hover{transform:translateY(-1px);box-shadow:0 14px 26px rgba(11,143,137,.34)}
.cpa-submit:active{transform:translateY(0)}

.cpa-or{position:relative;margin:16px 0 12px;text-align:center;font-size:13px;color:var(--muted)}
.cpa-or::before{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:var(--line)}
.cpa-or span{position:relative;background:#fff;padding:0 16px;text-align:center}

.cpa-social{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.cpa-social button{height:42px;border:1px solid var(--line);border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center;gap:10px;
 font-size:13.5px;font-weight:500;color:var(--deep);transition:background .15s,border-color .15s,box-shadow .15s}
.cpa-social button:hover{background:#f6fbfb;border-color:#bfdedb;box-shadow:0 4px 12px rgba(11,143,137,.08)}

.cpa-terms{margin-top:12px;text-align:center;font-size:12px;color:var(--muted);line-height:1.5}
.cpa-terms a{color:var(--teal)}.cpa-terms a:hover{text-decoration:underline}

/* tablet & mobile */
@media(max-width:1100px){
 .cpa-card{flex-direction:column;min-height:0}
 .cpa-left{width:100%;height:clamp(220px,42vw,340px)}
 .cpa-right{padding:22px 28px 40px}
 .cpa-form{max-width:520px}
 .cpa-sub{max-width:none}
}
@media(max-width:560px){
 .cpa-left{height:clamp(200px,56vw,260px)}
 .cpa-right{padding:18px 18px 32px}
 .cpa-form h2{font-size:24px}
 .cpa-sub{font-size:13.5px}
 .cpa-social{gap:8px}
 .cpa-social button{font-size:12.5px;gap:6px;padding:0 4px}
}
@media(max-width:360px){
 .cpa-social{grid-template-columns:1fr}
}

/* ===== sections ===== */
.cp-logo{display:flex;align-items:center;gap:10px}
.cp-logo-ic{width:46px;height:46px;color:#1e88c8}
.cp-logo-name{font-size:30px;font-weight:700;color:var(--deep);line-height:1}
.cp-logo-name span{color:var(--teal2)}
.cp-logo-tag{font-size:13px;color:var(--muted);margin-top:4px}
.cp-logo.small .cp-logo-ic{width:30px;height:30px}
.cp-logo.small .cp-logo-name{font-size:20px;color:#fff}
.cp-logo.small .cp-logo-tag{font-size:9px;color:#9fd3cf}
.cp-script.small{font-family:'Caveat',cursive;font-size:16px;color:#4fd1c5;display:flex;align-items:center;gap:6px}

.cp-circle{width:44px;height:44px;border-radius:50%;background:#c9efea;color:var(--teal);display:grid;place-items:center;flex-shrink:0}
.cp-circle.sm{width:32px;height:32px}
.cp-sec{padding:60px 24px;text-align:center}
.cp-sec.white{background:#fff}.cp-sec.tint{background:linear-gradient(180deg,#e9f8f7,#f4fcfb)}
.cp-eyebrow{font-size:11px;letter-spacing:.2em;font-weight:700;color:var(--teal)}
.cp-sec h3{font-size:28px;font-weight:700;color:var(--deep);margin-top:10px}
.cp-secsub{font-size:14px;color:var(--muted);margin:8px 0 34px;text-align:center}
.cp-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;text-align:left}
.cp-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;text-align:left}
.cp-why{background:#eefaf9;border:1px solid var(--line);border-radius:10px;padding:22px;min-height:140px;text-align:left}
.cp-why b{display:block;margin:12px 0 6px;font-size:14px}
.cp-why p{font-size:12.5px;color:var(--muted);line-height:1.55}
.cp-svc{background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 6px 24px rgba(14,100,100,.08)}
.cp-svc-img{height:76px;background:#cfe9ee center/cover}
.cp-svc-body{display:flex;align-items:center;gap:10px;padding:12px 14px 14px}
.cp-svc-body div{flex:1}
.cp-svc-body b{display:block;font-size:13px}
.cp-svc-body small{font-size:10.5px;color:var(--muted)}
.cp-arrow{width:26px;height:26px;border-radius:50%;background:var(--tint);color:var(--teal);display:grid;place-items:center}

.cp-cta{background:linear-gradient(90deg,#0b8f87 0%,#16a99d 45%,rgba(22,169,157,.2) 100%),var(--cta) right/cover no-repeat,#13a095;
 padding:50px 24px;color:#fff}
.cp-cta-in{max-width:1180px;margin:auto}
.cp-pill{display:inline-block;background:#6fe0d4;color:#05524c;font-size:10px;font-weight:700;padding:4px 12px;border-radius:20px}
.cp-cta h3{font-size:28px;font-weight:700;margin:14px 0 12px;line-height:1.25}
.cp-cta p{font-size:12.5px;opacity:.95;line-height:1.5}
.cp-cta-btns{display:flex;gap:12px;margin-top:20px}
.cp-cta-btns button{border:1px solid #fff;background:#fff;color:var(--deep);border-radius:30px;padding:9px 20px;font-size:12px;font-weight:600;display:flex;gap:6px;align-items:center}
.cp-cta-btns .ghost{background:transparent;color:#fff}

.cp-rev{border:1px solid var(--line);border-radius:10px;padding:16px 18px}
.cp-rev p{font-size:12px;color:var(--muted);line-height:1.55;min-height:56px}
.cp-rev-foot{display:flex;align-items:center;gap:10px;margin-top:12px}
.cp-rev-foot img{width:34px;height:34px;border-radius:50%;object-fit:cover;background:#cfe9ee}
.cp-rev-foot div{flex:1}
.cp-rev-foot b{display:block;font-size:12px}.cp-rev-foot small{font-size:10.5px;color:var(--muted)}
.stars{color:#f5b301;font-size:12px;letter-spacing:1px}

.cp-footer{background:#0b4552;color:#d6eceb;padding-top:36px}
.cp-foot-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1.4fr;gap:30px;padding:0 24px 30px}
.cp-foot-grid h5{font-size:12px;color:#fff;margin-bottom:12px}
.cp-foot-grid a{display:block;font-size:11px;margin-bottom:8px;color:#b7dcd9}
.cp-foot-txt{font-size:11px;line-height:1.6;margin:12px 0;color:#b7dcd9;max-width:260px}
.cp-socials{display:flex;gap:10px}
.cp-socials a{width:26px;height:26px;border-radius:50%;background:#fff;color:#0b4552;display:grid;place-items:center;margin:0}
.cp-stores{display:flex;gap:10px;flex-wrap:wrap}
.cp-stores a{display:flex;align-items:center;gap:8px;background:#000;border:1px solid #777;border-radius:6px;padding:5px 10px;color:#fff;margin:0;font-size:12px;font-weight:600}
.cp-stores small{display:block;font-size:7px;font-weight:400;margin:0}
.cp-copy{background:#093a45;border-top:1px solid #1d6270;padding:16px 24px;font-size:10.5px}
.cp-copy .cp-wrap{display:flex;justify-content:space-between;align-items:center}

@media(max-width:1100px){
 .cp-grid4{grid-template-columns:1fr 1fr}.cp-grid3{grid-template-columns:1fr}
 .cp-foot-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:560px){
 .cp-grid4,.cp-foot-grid{grid-template-columns:1fr}
}
`;
