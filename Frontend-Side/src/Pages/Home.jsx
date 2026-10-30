import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Blogs from "../Components/Blogs";
import HealthTips from "../Components/HealthTips";

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
  FaAmbulance,
  FaEnvelope,
  FaHospital,
  FaYoutube,
  FaChevronRight,
  FaPills,
  FaFileMedicalAlt,
  FaShieldAlt,
  FaHeartbeat as FaHealthCheckup,
  FaLock,
  FaHeadset,
} from "react-icons/fa";

function Home() {
  const messages = [
    "🩺 Free Home Consultation*",
    "💊 3-Month Membership @ ₹49",
    "🧪 Lab Tests at ₹0 Booking Fee",
    "❤️ 24x7 Emergency Support",
  ];
  const STATS = [
    { n: "30+", l: "Years of Experience", icon: "🏆" },
    { n: "15+", l: "Clinic Locations", icon: "🏥" },
    { n: "100%", l: "Patient Satisfaction", icon: "😊" },
  ];
  const FACILITY_GROUPS = [
    {
      group: "Emergency",
      icon: "🚨",
      items: [
        { icon: "🚑", label: "24/7 Ambulance", sub: "Rapid response fleet" },
        { icon: "💉", label: "Emergency Services", sub: "Turant ilaaj, har samay" },
        { icon: "🏥", label: "ICU & Critical Care", sub: "Advanced life support" },
        { icon: "🩸", label: "Blood Bank", sub: "Sabhi blood groups" },
      ],
    },
    {
      group: "Diagnostics",
      icon: "🔬",
      items: [
        { icon: "🔬", label: "Advanced Laboratory", sub: "Fast aur sahi reports" },
        { icon: "🩻", label: "MRI & CT Scan", sub: "Modern imaging" },
      ],
    },
    {
      group: "Care",
      icon: "🩺",
      items: [
        { icon: "🩺", label: "Multi-Specialty Care", sub: "Har bimari ke specialist" },
        { icon: "❤️", label: "Cardiac Care Unit", sub: "Heart ki poori dekhbhal" },
        { icon: "💊", label: "24/7 Pharmacy", sub: "Dawai hamesha available" },
      ],
    },
    {
      group: "Digital",
      icon: "📱",
      items: [
        { icon: "📱", label: "Online Appointment", sub: "Ghar baithe booking" },
        { icon: "🎥", label: "Video Consultation", sub: "Doctor se video par baat" },
        { icon: "📄", label: "Digital Health Records", sub: "Reports hamesha saath" },
      ],
    },
  ];
  const SERVICES = [
    { title: "Doctors", desc: "Best doctors dhundo aur appointment lo", icon: "🩺", to: "/doctors" },
    { title: "Medicines", desc: "Dawaiyan online order karo", icon: "💊", to: "/medicines" },
    { title: "AI Safety Planner", desc: "Emergency ke liye pehle se taiyari", icon: "🛡️", to: "/safety-planner", ai: true },
    { title: "AI Safety Checker", desc: "Abhi ki situation ka khatra check karo", icon: "🔍", to: "/safety-checker", ai: true },
    { title: "Document Wallet", desc: "Reports aur prescriptions ek jagah", icon: "📁", to: "/documents" },
    { title: "Smart Contact List", desc: "Apno ke emergency contacts", icon: "👨‍👩‍👧", to: "/relatives" },
    { title: "Government Schemes", desc: "Kin yojanaon ke liye eligible ho", icon: "🏛️", to: "/schemes" },
    { title: "Need Help", desc: "Koi sawal ya dikkat? Hum madad karenge", icon: "💬", to: "/help" },
  ];

  const navigate = useNavigate();
  const [facTab, setFacTab] = React.useState(0);
  return (
    <>
      <Navbar />
      <div className="main-sec">
        <img src="" alt="" />
      </div>      <div className="main-sec"></div>

      {/* ================= Stats strip ================= */}
      <div style={{ width: "100%", padding: "16px 12px", boxSizing: "border-box" }}>
        <div
          className="bg-white shadow-sm border border-emerald-100 rounded-2xl"
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            alignItems: "stretch",
            overflow: "hidden",
            background: "linear-gradient(90deg, #ecfdf5, #f0fdfa)",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.l}
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "14px 6px",
                borderLeft: i === 0 ? "none" : "1px solid #a7f3d0",
              }}
            >
              <div style={{ fontSize: 20, lineHeight: 1, marginBottom: 6 }}>{s.icon}</div>
              <div
                className="font-extrabold text-emerald-700"
                style={{ fontSize: "clamp(20px, 5vw, 30px)", lineHeight: 1.1 }}
              >
                {s.n}
              </div>
              <div
                className="font-medium text-slate-600"
                style={{ fontSize: "clamp(10px, 2.6vw, 13px)", marginTop: 4, lineHeight: 1.25 }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ================= Explore Our Services ================= */}
      <div style={{ width: "100%", padding: "28px 16px 8px", boxSizing: "border-box" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "left" }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div
              className="font-semibold text-emerald-600 text-xs uppercase tracking-widest"
              style={{ marginBottom: 4 }}
            >
              Sab kuch ek jagah
            </div>
            <div className="font-bold text-slate-900 text-2xl sm:text-3xl" style={{ margin: 0 }}>
              Explore Our Services
            </div>
            <div className="text-slate-500 text-sm" style={{ marginTop: 4 }}>
              Ek healthier, safer aur secure life ke liye jo kuch chahiye, sab yahan hai.
            </div>
          </div>

          {/* Emergency strip */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate("/emergency")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate("/emergency");
              }
            }}
            className="flex items-center bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 transition-colors cursor-pointer"
            style={{ gap: 12, padding: "10px 14px", marginBottom: 14 }}
          >
            <div
              className="flex justify-center items-center bg-red-100 rounded-lg text-xl shrink-0"
              style={{ width: 40, height: 40 }}
            >
              🚨
            </div>
            <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
              <div className="font-bold text-red-700 text-sm sm:text-base">Emergency Services</div>
              <div className="text-red-600/80 text-xs">
                Har second keemti hai. Ambulance aur turant madad, 24x7.
              </div>
            </div>
            <a
              href="tel:112"
              onClick={(e) => e.stopPropagation()}
              className="bg-red-600 hover:bg-red-700 rounded-full font-semibold text-white text-sm whitespace-nowrap transition-colors"
              style={{ padding: "7px 16px", textDecoration: "none" }}
            >
              Call 112
            </a>
          </div>

          {/* Service cards (compact: icon left, text right) */}
          <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                role="button"
                tabIndex={0}
                onClick={() => navigate(s.to)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(s.to);
                  }
                }}
                className="group relative flex items-center bg-white hover:shadow-md border border-slate-200 hover:border-emerald-400 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 transition-all cursor-pointer"
                style={{ gap: 12, padding: "12px 14px", textAlign: "left" }}
              >
                <div
                  className="flex justify-center items-center bg-emerald-50 rounded-lg text-xl shrink-0"
                  style={{ width: 44, height: 44 }}
                >
                  {s.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-center" style={{ gap: 6 }}>
                    <span className="font-semibold text-slate-900 text-sm truncate">{s.title}</span>
                    {s.ai && (
                      <span
                        className="bg-emerald-50 border border-emerald-200 rounded-full font-semibold text-[10px] text-emerald-700 shrink-0"
                        style={{ padding: "1px 6px" }}
                      >
                        AI
                      </span>
                    )}
                  </div>
                  <div className="text-slate-500 text-xs leading-snug" style={{ marginTop: 2 }}>
                    {s.desc}
                  </div>
                </div>

                <span className="font-bold text-emerald-500 group-hover:text-emerald-700 shrink-0">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ================= Our Facilities ================= */}
      <div style={{ width: "100%", padding: "32px 16px", boxSizing: "border-box" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "left" }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div
              className="font-semibold text-emerald-600 text-xs uppercase tracking-widest"
              style={{ marginBottom: 4 }}
            >
              Hamari suvidhayein
            </div>
            <div className="font-bold text-slate-900 text-2xl sm:text-3xl">Our Facilities</div>
          </div>

          {/* Card */}
          <div
            className="gap-4 grid grid-cols-1 md:grid-cols-5 bg-white shadow-sm border border-slate-200 rounded-2xl"
            style={{ padding: 14 }}
          >
            {/* LEFT: image */}
            <div
              className="md:col-span-2 rounded-xl"
              style={{
                position: "relative",
                minHeight: 260,
                overflow: "hidden",
                backgroundImage:
                  "url(https://wallup.net/wp-content/uploads/2019/09/332176-2013-mercedes-benz-sprinter-notarzt-906-ambulance-emergency.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                style={{ position: "absolute", inset: 0 }}
              />
              <div
                className="flex items-center bg-white/95 rounded-full font-semibold text-red-600 text-xs"
                style={{ position: "absolute", top: 12, left: 12, gap: 6, padding: "5px 10px" }}
              >
                <div className="bg-red-500 rounded-full animate-pulse" style={{ width: 7, height: 7 }} />
                24/7 Emergency Active
              </div>
              <div style={{ position: "absolute", left: 14, right: 14, bottom: 14, color: "#fff" }}>
                <div className="font-bold text-base">Always Ready, Always Near</div>
                <div className="text-white/80 text-xs" style={{ marginTop: 2 }}>
                  Ambulance fleet standby par, din-raat.
                </div>
              </div>
            </div>

            {/* RIGHT: tabs + items */}
            <div className="md:col-span-3" style={{ display: "flex", flexDirection: "column", padding: "4px 6px" }}>
              <div className="font-bold text-slate-900 text-lg" style={{ lineHeight: 1.2 }}>
                Multi-Specialty Care, Under One Roof
              </div>
              <div className="text-slate-500 text-xs" style={{ marginTop: 3, marginBottom: 12 }}>
                Emergency se routine checkup tak, sab kuch paas mein.
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {FACILITY_GROUPS.map((g, i) => (
                  <div
                    key={g.group}
                    role="button"
                    tabIndex={0}
                    onClick={() => setFacTab(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setFacTab(i);
                      }
                    }}
                    className={`rounded-full font-semibold text-xs cursor-pointer transition-colors ${
                      facTab === i
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                    style={{ padding: "6px 12px" }}
                  >
                    {g.icon} {g.group}
                  </div>
                ))}
              </div>

              {/* Items */}
              <div className="gap-2 grid grid-cols-1 sm:grid-cols-2" style={{ flex: 1, alignContent: "start" }}>
                {FACILITY_GROUPS[facTab].items.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-xl transition-colors"
                    style={{ gap: 10, padding: "9px 12px" }}
                  >
                    <div
                      className="flex justify-center items-center bg-white shadow-sm rounded-lg text-lg shrink-0"
                      style={{ width: 36, height: 36 }}
                    >
                      {f.icon}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="font-semibold text-slate-800 text-sm" style={{ lineHeight: 1.2 }}>
                        {f.label}
                      </div>
                      <div className="text-slate-500 text-xs" style={{ marginTop: 1 }}>
                        {f.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex sm:flex-row flex-col" style={{ gap: 8, marginTop: 14 }}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate("/emergency")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate("/emergency");
                    }
                  }}
                  className="flex flex-1 justify-center items-center bg-red-600 hover:bg-red-700 rounded-full font-semibold text-white text-sm transition-colors cursor-pointer"
                  style={{ gap: 6, padding: "9px 16px" }}
                >
                  🚨 Emergency Call
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  className="flex flex-1 justify-center items-center hover:bg-slate-50 border border-slate-300 rounded-full font-semibold text-slate-700 text-sm transition-colors cursor-pointer"
                  style={{ padding: "9px 16px" }}
                >
                  Check More →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================= Marquee ================= */}
      <div
        style={{
          backgroundColor: "#0c3b36",
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "10px 0",
        }}
      >
        <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: inline-block;
          animation: scrollLeft 18s linear infinite;
        }
      `}</style>
        <div className="marquee-track">
          {[...messages, ...messages].map((msg, i) => (
            <span
              key={i}
              style={{
                color: "#fff",
                fontWeight: "600",
                fontSize: "15px",
                marginRight: "60px",
              }}
            >
              {msg}
            </span>
          ))}
        </div>
      </div>
      <br />
      <div className="package-section">
        <img
          src="/CarePoint_ Healthier Families Together.png"
          alt=""
        />
      </div>
      <hr />
      <br />

      <Blogs />

      {/* ================= Footer ================= */}
      <footer className="cp-footer">
        {/* Newsletter Section */}
        <div className="cp-newsletter">
          <div className="cp-newsletter-inner">
            <div className="cp-newsletter-left">
              <div className="cp-newsletter-icon">
                <FaEnvelope />
              </div>
              <div>
                <h2>Stay Updated with CarePoint</h2>
                <p>
                  Get health tips, appointment reminders and emergency updates.
                </p>
              </div>
            </div>

            <div className="cp-newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button>Subscribe</button>
            </div>

            <div className="cp-newsletter-graphic">
              <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M50 70 C20 50, 5 35, 5 20 C5 8, 15 2, 25 2 C35 2, 45 10, 50 18 C55 10, 65 2, 75 2 C85 2, 95 8, 95 20 C95 35, 80 50, 50 70 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <polyline
                  points="10,38 28,38 34,20 42,55 50,30 56,38 90,38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <circle cx="90" cy="60" r="3" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="cp-main">
          {/* Brand */}
          <div className="cp-col cp-brand">
            <div className="cp-logo">
              <div className="cp-logo-icon">
                <FaHeart />
                <span className="cp-logo-plus">+</span>
              </div>
              <div>
                <h1>
                  Care<span>Point</span>
                </h1>
                <p className="cp-tagline">Your Health. Our Priority.</p>
              </div>
            </div>

            <p className="cp-desc">
              CarePoint is committed to providing fast, reliable and affordable
              healthcare services anytime, anywhere.
            </p>

            <div className="cp-feature-grid">
              <div className="cp-feature">
                <span className="cp-feature-icon">
                  <FaAmbulance />
                </span>
                <span>
                  24/7 Emergency
                  <br />
                  Ambulance
                </span>
              </div>
              <div className="cp-feature">
                <span className="cp-feature-icon">
                  <FaHospital />
                </span>
                <span>
                  Top Rated
                  <br />
                  Hospitals
                </span>
              </div>
              <div className="cp-feature">
                <span className="cp-feature-icon">
                  <FaUserMd />
                </span>
                <span>
                  Expert
                  <br />
                  Doctors
                </span>
              </div>
              <div className="cp-feature">
                <span className="cp-feature-icon">
                  <FaTint />
                </span>
                <span>
                  Blood Bank
                  <br />
                  Support
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="cp-col">
            <h3 className="cp-heading">Quick Links</h3>
            <ul className="cp-links">
              {[
                "Home",
                "About Us",
                "Doctors",
                "Hospitals",
                "Emergency",
                "Blood Bank",
                "Appointments",
                "Contact Us",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((item) => (
                <li key={item}>
                  <FaChevronRight className="cp-link-arrow" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="cp-col">
            <h3 className="cp-heading">Our Services</h3>
            <ul className="cp-services">
              <li>
                <FaAmbulance /> Emergency Ambulance
              </li>
              <li>
                <FaHospital /> Hospital Booking
              </li>
              <li>
                <FaUserMd /> Doctor Consultation
              </li>
              <li>
                <FaTint /> Blood Availability
              </li>
              <li>
                <FaPills /> Pharmacy Delivery
              </li>
              <li>
                <FaHealthCheckup /> Health Checkup
              </li>
              <li>
                <FaFileMedicalAlt /> Medical Reports
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="cp-col">
            <h3 className="cp-heading">Contact Us</h3>

            <div className="cp-contact-item">
              <FaPhoneAlt className="cp-contact-icon" />
              <div>
                <p>+91 98765 43210</p>
                <p>+91 11223 34455</p>
              </div>
            </div>

            <div className="cp-contact-item">
              <FaEnvelope className="cp-contact-icon" />
              <div>
                <p>support@carepoint.com</p>
                <p>info@carepoint.com</p>
              </div>
            </div>

            <div className="cp-contact-item">
              <FaMapMarkerAlt className="cp-contact-icon" />
              <div>
                <p>
                  123, Health Care Street,
                  <br />
                  New Delhi - 110001, India
                </p>
              </div>
            </div>

            <h3 className="cp-heading cp-follow-heading">Follow Us</h3>
            <div className="cp-socials">
              <a href="#" className="cp-social cp-social-fb" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="cp-social cp-social-ig" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="cp-social cp-social-tw" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="cp-social cp-social-li" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" className="cp-social cp-social-yt" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="cp-trust">
          <div className="cp-trust-item">
            <span className="cp-trust-icon">
              <FaShieldAlt />
            </span>
            <div>
              <h4>Trusted by Thousands</h4>
              <p>Your trust is our strength.</p>
            </div>
          </div>

          <div className="cp-trust-item">
            <span className="cp-trust-icon">
              <FaLock />
            </span>
            <div>
              <h4>Secure &amp; Safe</h4>
              <p>Your data is 100% protected.</p>
            </div>
          </div>

          <div className="cp-trust-item">
            <span className="cp-trust-icon">
              <FaHeadset />
            </span>
            <div>
              <h4>24/7 Support</h4>
              <p>We are always here to help you.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="cp-bottom">
          <p className="cp-copyright">© 2026 CarePoint. All Rights Reserved.</p>

          <div className="cp-payments">
            <span className="cp-pay cp-pay-visa">VISA</span>
            <span className="cp-pay cp-pay-mc">Mastercard</span>
            <span className="cp-pay cp-pay-rupay">RuPay</span>
            <span className="cp-pay cp-pay-upi">UPI</span>
          </div>

          <p className="cp-madewith">
            Made with <FaHeart className="cp-madewith-heart" /> for your better
            health.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
