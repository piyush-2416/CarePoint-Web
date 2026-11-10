import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail, Lock, Eye, EyeOff, User, ArrowRight, Stethoscope, CalendarDays, Pill,
  ShieldPlus, Clock, Heart, HeartPulse, Building2, Play,
  ShieldCheck, Search, FolderOpen, Users, Landmark, LifeBuoy, Siren,
  LogIn, UserPlus,
} from "lucide-react";

/* Brand icons - inline SVG, footer ke liye */
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

/* ---------- HERO CSS (naya) ----------
   Apne purane `css` const ke saath ye bhi render hota hai.
   Purane .cpa, .cpa-card, .cpa-left, .cpa-right, .cpa-form, .cpa-* wale
   saare rules ab unused hain - unhe aap `css` se delete kar sakte ho. */
const heroCss = `
.hero{
  position:relative; isolation:isolate;
  min-height:100vh; min-height:100svh;
  display:flex; flex-direction:column; justify-content:flex-end;
  background-color:#0a4f52;
  background-image:var(--hero);
  background-size:cover;
  background-position:center top;
  background-repeat:no-repeat;
}
.hero::before{
  content:""; position:absolute; inset:0; z-index:-1;
  background:linear-gradient(to top, rgba(6,40,44,.88) 0%, rgba(6,40,44,.45) 28%, rgba(6,40,44,0) 55%);
}
.hero-actions{
  width:100%; max-width:560px; margin:0 auto;
  padding:24px 20px calc(32px + env(safe-area-inset-bottom, 0px));
  display:grid; grid-template-columns:1fr 1fr; gap:14px;
}
.hero-btn{
  display:flex; align-items:center; justify-content:center; gap:10px;
  min-height:54px; padding:0 18px; border-radius:16px;
  font:700 16px/1 inherit; font-family:inherit; text-decoration:none;
  transition:transform .15s ease, box-shadow .15s ease, background .15s ease;
  -webkit-tap-highlight-color:transparent;
}
.hero-btn:active{ transform:scale(.97); }
.hero-btn:focus-visible{ outline:3px solid #fff; outline-offset:3px; }
.hero-btn.login{
  color:#fff; background:rgba(255,255,255,.16);
  border:1.5px solid rgba(255,255,255,.7);
  -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px);
}
.hero-btn.login:hover{ background:rgba(255,255,255,.28); }
.hero-btn.signup{
  color:#fff; border:1.5px solid transparent;
  background:linear-gradient(135deg,#0b8f89,#34c3a4);
  box-shadow:0 10px 24px rgba(11,143,137,.45);
}
.hero-btn.signup:hover{ box-shadow:0 14px 30px rgba(11,143,137,.6); transform:translateY(-1px); }

@media (min-width:768px){
  .hero{ min-height:88vh; background-position:center center; }
  .hero-actions{ max-width:520px; padding-bottom:56px; }
}
@media (max-width:360px){
  .hero-actions{ gap:10px; padding-left:14px; padding-right:14px; }
  .hero-btn{ font-size:15px; padding:0 10px; }
}
@media (prefers-reduced-motion:reduce){
  .hero-btn{ transition:none; }
}
`;

export default function Auth() {
  return (
    <div className="cp">
      {/* NOTE: `css` aapke file mein pehle se defined hai - use waise hi rakho */}
      <style>{css}</style>
      <style>{heroCss}</style>

      {/* ================= HERO ================= */}
      <section
        className="hero"
        style={{ "--hero": `url(${IMG.hero})` }}
        role="img"
        aria-label="CarePoint - Better Health, Brighter Tomorrow"
      >
        <div className="hero-actions">
          <Link to="/login" className="hero-btn login">
            <LogIn size={18} /> Login
          </Link>
          <Link to="/signup" className="hero-btn signup">
            <UserPlus size={18} /> Sign Up
          </Link>
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
            <a
              className={`cp-svc ${urgent ? "urgent" : ""} ${wide ? "wide" : ""}`}
              key={t}
              href={href}
            >
              {img ? (
                <div className="cp-svc-img" style={{ backgroundImage: `url(${img})` }} />
              ) : (
                <div className="cp-svc-img ph" style={{ background: tone }}>
                  <I size={30} />
                </div>
              )}
              <div className="cp-svc-body">
                <span className="cp-circle sm"><I size={16} /></span>
                <div>
                  <b>
                    {t}
                    {ai && <span className="cp-ai">AI</span>}
                  </b>
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
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <button type="button">Sign Up Now <ArrowRight size={14} /></button>
            </Link>
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
      </footer>
    </div>
  );
}
