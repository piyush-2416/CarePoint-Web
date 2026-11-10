import { useState } from "react";
import {
  Mail, Lock, Eye, EyeOff, User, ArrowRight, Stethoscope, CalendarDays, Pill,
  ShieldPlus, Clock, HeartPulse, Building2, Play,
  ShieldCheck, Search, FolderOpen, Users, Landmark, LifeBuoy, Siren,
} from "lucide-react";

/* Brand icons - inline SVG (naye lucide-react mein nahi aate) */
const brand = (d) => ({ size = 16, fill = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} aria-hidden="true"><path d={d} /></svg>
);
const P = {
  fb: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  ap: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
  ig: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  yt: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  li: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  tw: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
};
const Facebook = brand(P.fb);
const Apple = brand(P.ap);
const Instagram = brand(P.ig);
const Youtube = brand(P.yt);
const Linkedin = brand(P.li);
const Twitter = brand(P.tw);

/* ---------- IMAGES ---------- */
const IMG = {
  hero: "/carepoint-auth.png", // public/carepoint-auth.png
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
  { icon: Stethoscope, t: "Doctors", d: "Consult top specialists near you.", img: IMG.svcDoctors, href: "/doctors" },
  { icon: Building2, t: "Hospitals", d: "Find the best hospitals near you.", img: IMG.svcHospitals, href: "/hospitals" },
  { icon: Pill, t: "Medicines", d: "Order medicines online with ease.", img: IMG.svcMedicines, href: "/medicines" },
  { icon: CalendarDays, t: "Appointments", d: "Book your slot in a few clicks.", img: IMG.svcAppointments, href: "/appointments" },
  { icon: ShieldCheck, t: "AI Safety Planner", d: "Prepare for emergencies in advance.", img: "https://verityai.co/_next/image?url=https:%2F%2Fcdn.sanity.io%2Fimages%2F5v26bvj8%2Fproduction%2F6f435aa4e6278b4345a91cec90c3a10ef6e02e40-1536x1024.png&w=1200&q=75", ai: true, tone: "linear-gradient(135deg,#0b8f89,#34c3a4)", href: "/safety-planner" },
  { icon: Search, t: "AI Safety Checker", d: "Check your current situation's risk.", img: "https://cdn.vectorstock.com/i/500p/43/45/businessman-is-talking-or-chatting-with-chat-bot-vector-46624345.jpg", ai: true, tone: "linear-gradient(135deg,#0e7490,#22b8cf)", href: "/safety-checker" },
  { icon: FolderOpen, t: "Document Wallet", d: "Keep reports and prescriptions together.", img: "https://www.shutterstock.com/image-vector/digital-wallet-icon-wireframe-hand-600nw-2586641487.jpg", tone: "linear-gradient(135deg,#0f766e,#2dd4bf)", href: "/documents" },
  { icon: Users, t: "Smart Contact List", d: "Your family's emergency contacts.", img: "https://tse2.mm.bing.net/th/id/OIP.PmXcJ-YOXjhgFmD3nN1SfwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", tone: "linear-gradient(135deg,#047857,#4ade80)", href: "/relatives" },
  { icon: Landmark, t: "Government Schemes", d: "See which schemes you are eligible for.", img: "https://media.assettype.com/outlookmoney/2026-06-09/jk9r2482/ayushman-bharat-west-bengal.png?auto=format%2Ccompress&fit=max&format=webp&w=768&dpr=1.0", tone: "linear-gradient(135deg,#0b6e75,#38bdf8)", href: "/schemes" },
  { icon: LifeBuoy, t: "Need Help", d: "Questions or problems? We are here.", tone: "linear-gradient(135deg,#115e59,#5eead4)", img: "https://img.freepik.com/premium-vector/medical-social-worker-helps-patients-families-cope-with-medical-challenges_701961-4370.jpg", href: "/help" },
  { icon: Siren, t: "Emergency", d: "Every second counts. Get help right away.", urgent: true, wide: true, tone: "linear-gradient(135deg,#dc2626,#f87171)", img: "https://static.vecteezy.com/system/resources/previews/026/994/779/large_2x/911-emergency-call-on-web-site-assistant-manager-online-ambulance-service-hotline-call-center-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg", href: "/emergency" },
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

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
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
          <div className="cpa-left">
            <img src={IMG.hero} alt="CarePoint - Better Health, Brighter Tomorrow" />
          </div>

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
                <button type="button" onClick={() => social("apple")}><Apple size={18} fill="#111" /> Apple</button>
                <button type="button" onClick={() => social("facebook")}><Facebook size={18} fill="#1877f2" /> Facebook</button>
              </div>

              <p className="cpa-terms">
                By continuing, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
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
          {services.map(({ icon: I, t, d, img, tone, ai, urgent, wide, href }) => (
            <a className={`cp-svc ${urgent ? "urgent" : ""} ${wide ? "wide" : ""}`} key={t} href={href}>
              {img ? (
                <div className="cp-svc-img" style={{ backgroundImage: `url(${img})` }} />
              ) : (
                <div className="cp-svc-img ph" style={{ background: tone }}><I size={30} /></div>
              )}
              <div className="cp-svc-body">
                <span className="cp-circle sm"><I size={16} /></span>
                <div>
                  <b>{t}{ai && <span className="cp-ai">AI</span>}</b>
                  <small>{d}</small>
                </div>
                <span className="cp-arrow"><ArrowRight size={14} /></span>
              </div>
            </a>
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
        <div className="cp-copy">© {new Date().getFullYear()} CarePoint. All rights reserved.</div>
      </footer>
    </div>
  );
}

/* ---------- CSS (isi file mein) ---------- */
const css = `
:root{--teal:#0f766e;--teal-d:#0b5a54;--teal-l:#e6f6f4;--ink:#10302e;--mute:#5b7370;--line:#d8e6e3}
.cp{font-family:"Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;color:var(--ink);background:#fff;overflow-x:hidden}
.cp *{box-sizing:border-box}
.cp a{text-decoration:none;color:inherit}
.cp-wrap{max-width:1180px;margin:0 auto}

/* ---------- AUTH ---------- */
.cpa{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px 16px;background:linear-gradient(135deg,#e6f6f4,#f4fbfa)}
.cpa-card{width:100%;max-width:1080px;display:grid;grid-template-columns:1.05fr 1fr;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(15,118,110,.18)}
.cpa-left{background:var(--teal-l);min-height:420px}
.cpa-left img{width:100%;height:100%;object-fit:cover;display:block}
.cpa-right{padding:28px 40px 36px;display:flex;flex-direction:column}
.cpa-top{display:flex;justify-content:flex-end;gap:8px;font-size:14px;color:var(--mute);align-items:center}
.cpa-link{background:none;border:0;color:var(--teal);font-weight:600;cursor:pointer;font-size:14px;padding:0}
.cpa-link:hover{text-decoration:underline}
.cpa-form h2{font-size:30px;margin:18px 0 6px}
.cpa-sub{color:var(--mute);font-size:14px;margin:0 0 20px;line-height:1.5}
.cpa-tabs{display:grid;grid-template-columns:1fr 1fr;background:var(--teal-l);border-radius:12px;padding:4px;margin-bottom:18px}
.cpa-tabs button{border:0;background:transparent;padding:10px;border-radius:9px;font-weight:600;color:var(--mute);cursor:pointer;font-size:14px}
.cpa-tabs button.on{background:#fff;color:var(--teal);box-shadow:0 2px 8px rgba(0,0,0,.08)}
.cpa-field{margin-bottom:14px}
.cpa-field label{display:block;font-size:13px;font-weight:600;margin-bottom:6px}
.cpa-input{display:flex;align-items:center;gap:10px;border:1.5px solid var(--line);border-radius:12px;padding:0 14px;height:48px;color:var(--mute);background:#fff}
.cpa-input:focus-within{border-color:var(--teal);box-shadow:0 0 0 3px rgba(15,118,110,.15)}
.cpa-input input{flex:1;border:0;outline:0;font-size:14px;background:transparent;color:var(--ink);min-width:0}
.cpa-eye{border:0;background:none;color:var(--mute);cursor:pointer;display:flex;padding:0}
.cpa-row{display:flex;justify-content:space-between;align-items:center;margin:4px 0 18px}
.cpa-check{display:flex;align-items:center;gap:8px;font-size:13px;cursor:pointer;color:var(--mute)}
.cpa-check input{position:absolute;opacity:0}
.cpa-check .box{width:18px;height:18px;border:1.5px solid var(--line);border-radius:5px;display:inline-block;background:#fff}
.cpa-check input:checked+.box{background:var(--teal);border-color:var(--teal);box-shadow:inset 0 0 0 3px #fff}
.cpa-submit{width:100%;height:50px;border:0;border-radius:12px;background:linear-gradient(135deg,var(--teal),#14a89c);color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;margin-top:6px}
.cpa-submit:hover{filter:brightness(1.07)}
.cpa-or{display:flex;align-items:center;gap:12px;margin:20px 0 14px;color:var(--mute);font-size:12px}
.cpa-or::before,.cpa-or::after{content:"";flex:1;height:1px;background:var(--line)}
.cpa-social{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.cpa-social button{height:44px;border:1.5px solid var(--line);background:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:13px;font-weight:600;cursor:pointer;color:var(--ink)}
.cpa-social button:hover{border-color:var(--teal);background:var(--teal-l)}
.cpa-terms{font-size:12px;color:var(--mute);text-align:center;margin:18px 0 0}
.cpa-terms a{color:var(--teal);font-weight:600}

/* ---------- SECTIONS ---------- */
.cp-sec{padding:72px 20px;text-align:center}
.cp-sec.white{background:#fff}
.cp-sec.tint{background:#f2faf9}
.cp-eyebrow{color:var(--teal);font-size:12px;font-weight:700;letter-spacing:.14em;margin-bottom:8px}
.cp-sec h3{font-size:32px;margin:0 0 10px}
.cp-secsub{color:var(--mute);max-width:560px;margin:0 auto 36px;font-size:15px}
.cp-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:left}
.cp-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;text-align:left}
.cp-circle{width:44px;height:44px;border-radius:50%;background:var(--teal-l);color:var(--teal);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.cp-circle.sm{width:32px;height:32px}
.cp-why{background:#fff;border:1px solid var(--line);border-radius:16px;padding:24px}
.cp-why b{display:block;margin:14px 0 6px;font-size:16px}
.cp-why p{margin:0;color:var(--mute);font-size:14px;line-height:1.55}

/* ---------- SERVICES ---------- */
.cp-svc{display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:16px;overflow:hidden;transition:transform .2s,box-shadow .2s}
.cp-svc:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(15,118,110,.15)}
.cp-svc-img{height:140px;background-size:cover;background-position:center;background-color:var(--teal-l)}
.cp-svc-img.ph{display:flex;align-items:center;justify-content:center;color:#fff}
.cp-svc-body{display:flex;align-items:center;gap:10px;padding:14px}
.cp-svc-body div{flex:1;min-width:0}
.cp-svc-body b{display:flex;align-items:center;gap:6px;font-size:15px}
.cp-svc-body small{display:block;color:var(--mute);font-size:12px;margin-top:2px}
.cp-ai{background:var(--teal);color:#fff;font-size:10px;padding:2px 6px;border-radius:6px}
.cp-arrow{color:var(--teal)}
.cp-svc.wide{grid-column:span 2}
.cp-svc.urgent{border-color:#fecaca}
.cp-svc.urgent .cp-circle{background:#fee2e2;color:#dc2626}
.cp-svc.urgent .cp-arrow{color:#dc2626}

/* ---------- CTA ---------- */
.cp-cta{background:linear-gradient(rgba(11,90,84,.88),rgba(11,90,84,.88)),var(--cta) center/cover,var(--teal-d);color:#fff;text-align:center;padding:80px 20px}
.cp-cta-in{max-width:640px;margin:0 auto}
.cp-pill{display:inline-block;background:rgba(255,255,255,.18);padding:6px 14px;border-radius:999px;font-size:13px;margin-bottom:16px}
.cp-cta h3{font-size:34px;margin:0 0 14px;line-height:1.25}
.cp-cta p{opacity:.9;line-height:1.6;margin:0 0 26px}
.cp-cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.cp-cta-btns button{display:inline-flex;align-items:center;gap:8px;height:46px;padding:0 24px;border-radius:12px;border:0;background:#fff;color:var(--teal-d);font-weight:600;cursor:pointer;font-size:14px}
.cp-cta-btns button.ghost{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.6)}

/* ---------- REVIEWS ---------- */
.cp-rev{background:#fff;border:1px solid var(--line);border-radius:16px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;gap:20px}
.cp-rev p{margin:0;line-height:1.6;color:var(--ink);font-size:15px}
.cp-rev-foot{display:flex;align-items:center;gap:12px}
.cp-rev-foot img{width:44px;height:44px;border-radius:50%;object-fit:cover}
.cp-rev-foot div{flex:1}
.cp-rev-foot b{display:block;font-size:14px}
.cp-rev-foot small{color:var(--mute);font-size:12px}
.stars{color:#f59e0b;font-size:13px;letter-spacing:1px}

/* ---------- FOOTER ---------- */
.cp-footer{background:#0a2e2b;color:#cfe5e2;padding:56px 20px 0}
.cp-foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.3fr;gap:32px}
.cp-footer h5{color:#fff;font-size:15px;margin:0 0 14px}
.cp-footer .cp-foot-grid>div>a{display:block;font-size:14px;margin-bottom:10px;opacity:.85}
.cp-footer a:hover{color:#5eead4}
.cp-foot-txt{font-size:14px;line-height:1.6;opacity:.85;margin:14px 0}
.cp-socials{display:flex;gap:10px}
.cp-socials a{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;color:#fff}
.cp-stores{display:flex;flex-direction:column;gap:10px}
.cp-footer .cp-stores a{display:flex;align-items:center;gap:10px;background:#000;border:1px solid rgba(255,255,255,.25);border-radius:10px;padding:8px 14px;color:#fff;margin:0;font-size:14px;font-weight:600;width:fit-content}
.cp-stores small{display:block;font-size:9px;font-weight:400;opacity:.8}
.cp-copy{border-top:1px solid rgba(255,255,255,.12);margin-top:40px;padding:18px 0;text-align:center;font-size:13px;opacity:.75}

/* ---------- LOGO ---------- */
.cp-logo{display:flex;align-items:center;gap:10px}
.cp-logo-ic{width:34px;height:34px;color:#14b8a6}
.cp-logo-name{font-size:22px;font-weight:700;color:#fff;line-height:1}
.cp-logo-name span{color:#5eead4}
.cp-logo-tag{font-size:11px;opacity:.75;margin-top:3px}
.cp-logo.small .cp-logo-name{font-size:20px}

/* ---------- RESPONSIVE ---------- */
@media(max-width:1000px){
  .cp-grid4{grid-template-columns:repeat(2,1fr)}
  .cp-foot-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:820px){
  .cpa-card{grid-template-columns:1fr}
  .cpa-left{min-height:200px;max-height:260px}
  .cpa-right{padding:24px 22px 30px}
  .cp-grid3{grid-template-columns:1fr}
}
@media(max-width:520px){
  .cp-grid4{grid-template-columns:1fr}
  .cp-svc.wide{grid-column:auto}
  .cp-foot-grid{grid-template-columns:1fr}
  .cpa-social{grid-template-columns:1fr}
  .cp-sec h3,.cp-cta h3{font-size:26px}
}
`;
