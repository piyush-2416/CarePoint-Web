import React from "react";
//  import Sidebar from './sidebar';
// import {Link} from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Doctors from "./Doctors";
import Navbar from "../Components/Navbar";
import Medicines from "./Medicines";
import Schemes from "./Schemes";import Blogs from "../Components/Blogs";
import SignIn from "./Signin";
import HealthTips from "../Components/HealthTips";
import Emergency from "./Emergency";
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
  FaArrowRight,
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
  // const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Navbar />
      <div className="main-sec">
        <img src="" alt="" />
      </div>
      <div style={{ backgroundColor: "rgb(82, 244, 190)" }}>
        <ul style={{ display: "flex" ,padding:"1rem" ,position:"relative",left:"11rem",gap:"3rem"}}>
          <h2 style={{color:"yellow"}}>
            30+ <br />

            
            Years of experiance
          </h2>
          <h2 style={{color:"purple"}}>
            15+
            <br />
            Clinic Location
          </h2>
          <h2 style={{color:"dodgerblue"}}>
            100% <br />
            Paitient Satisfaction
          </h2>
        </ul>
      </div>
      <div className="problem-sec">
        <h1>Find by Speciality</h1>
        <p>For different Problem We have multiple Solutions</p>
        <br />
        <ul>
          <li>
            <img src="https://static.vecteezy.com/system/resources/previews/016/186/392/large_2x/optometrist-with-ophthalmologist-checks-patient-sight-optical-eye-test-and-spectacles-technology-in-flat-cartoon-hand-drawn-templates-illustration-vector.jpg" />{" "}
          </li>
          <li>
            <img src="https://thumbs.dreamstime.com/b/pediatrician-examining-baby-cartoon-illustration-depicting-doctor-wearing-light-blue-coat-stethoscope-looking-393242186.jpg" />
          </li>
          <li>
            <img src="https://img.freepik.com/premium-photo/male-female-cardiologists-examine-human-heart-with-magnifiers-illustration-flat-cartoon-design_717906-64135.jpg?w=2000" />
          </li>
          <li>
            <img src="https://media.istockphoto.com/id/1423372814/vector/traumatology-examines-and-bandages-childs-broken-leg-treatment-in-hospital.jpg?s=612x612&w=0&k=20&c=FZUUcVrwk5uWxqP0XmE0XsGrrfihhrjAC2-vaA9Y7F4=" />
          </li>{" "}
          <li>
            <img src="https://static.vecteezy.com/system/resources/previews/007/179/113/non_2x/doctor-dentist-cartoon-checking-boy-teeth-free-vector.jpg" />
          </li>
          {/* <li>
            <img src="https://png.pngtree.com/png-clipart/20211116/original/pngtree-surgeon-doing-surgery-cartoon-png-image_6938397.png" />
          </li> */}
        </ul>
      </div>{" "}
      <br />
      <hr />
      <br />
      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
  <div className="mb-10 text-center">
    
    <h1 className="font-bold text-slate-900 text-3xl sm:text-4xl">
      Our Facilities
    </h1>
     
  </div>

  <div1 className="items-center gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-2 bg-white shadow-sm p-4 sm:p-8 border border-slate-100 rounded-3xl">
    {/* Image side */}
    <div className="relative order-1 rounded-2xl h-64 sm:h-80 lg:h-[420px] overflow-hidden">
      <img
        src="https://wallup.net/wp-content/uploads/2019/09/332176-2013-mercedes-benz-sprinter-notarzt-906-ambulance-emergency.jpg"
        alt="Emergency ambulance"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="top-4 left-4 absolute flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full font-semibold text-red-600 text-xs">
        <span className="bg-red-500 rounded-full w-2 h-2 animate-pulse" />
        24/7 Emergency Active
      </div>
      <div className="right-4 bottom-4 left-4 absolute text-white">
        <p className="font-semibold text-lg">Always Ready, Always Near</p>
        <p className="text-white/80 text-xs">Rapid response ambulance fleet on standby round the clock.</p>
      </div>
    </div>

    {/* Facilities side */}
    <div className="order-2">
      <h2 className="mb-1 font-semibold text-slate-900 text-xl">
        Multi-Specialty Care, Under One Roof
      </h2>
      <p className="mb-6 text-slate-500 text-sm">
        From emergency response to routine consultations — everything you need, close by.
      </p>

      <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 mb-8">
        {[
          { icon: "🩺", label: "Multi-Specialty Care" },
          { icon: "🚑", label: "24/7 Ambulance" },
          { icon: "💉", label: "Emergency Services" },
          { icon: "🩸", label: "Blood Bank" },
          { icon: "🔬", label: "Advanced Laboratory" },
          { icon: "🩻", label: "MRI & CT Scan" },
          { icon: "❤️", label: "Cardiac Care Unit" },
          { icon: "🏥", label: "ICU & Critical Care" },
          { icon: "💊", label: "24/7 Pharmacy" },
          { icon: "📱", label: "Online Appointment" },
          { icon: "🎥", label: "Video Consultation" },
          { icon: "📄", label: "Digital Health Records" },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-start gap-2 bg-slate-50 hover:bg-emerald-50 p-3 border border-slate-100 hover:border-emerald-200 rounded-xl transition-colors"
          >
            <span className="text-xl">{icon}</span>
            <span className="font-medium text-slate-700 text-xs leading-snug">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex sm:flex-row flex-col gap-3">
        <Link to="/Emergency" className="flex-1">
          <button className="flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 shadow-red-200 shadow-sm px-5 py-3 rounded-full w-full font-semibold text-white text-sm transition-colors">
            🚨 Emergency Call
          </button>
        </Link>
        <button className="flex-1 px-5 py-3 border border-slate-200 hover:border-slate-300 rounded-full font-semibold text-slate-700 text-sm transition-colors">
          Check More
        </button>
      </div>
    </div>
  </div1>
  <br/><br/>
</section>
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
        <h2 className="bg-darkturquoise">Our Best packages</h2>
        <img
          src="https://ponjeslyhospital.in/wp-content/uploads/2022/12/11.-Master-Health-Check.jpg"
          alt=""
        />
      </div>
      <br />
      <hr /><HealthTips/>
       
      <br></br>
      <hr />
    <br/><br/>

    <Blogs/>
<h1>Our Top 5 Doctors section  </h1>
      <footer className="cp-footer">
        {/* ================= Newsletter Section ================= */}
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

        {/* ================= Main Footer ================= */}
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
              <a
                href="#"
                className="cp-social cp-social-fb"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="cp-social cp-social-ig"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="cp-social cp-social-tw"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="cp-social cp-social-li"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="cp-social cp-social-yt"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* ================= Trust Section ================= */}
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

        {/* ================= Bottom Bar ================= */}
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
