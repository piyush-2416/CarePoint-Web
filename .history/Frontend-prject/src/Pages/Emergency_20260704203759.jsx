import React from "react";
// import { useState } from "react";
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
  FaArrowRight,FaYoutube,  FaChevronRight, FaPills, FaFileMedicalAlt, FaShieldAlt,
  FaHeartbeat as FaHealthCheckup,FaLock,
  FaHeadset,
 } from "react-icons/fa";

function Emergency() {
  const emergencies = [
    {
      icon: <FaHeart />,
      title: "Heart Attack",
      desc: "Chest pain, sweating",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <FaBrain />,
      title: "Stroke",
      desc: "Speech difficulty",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <FaCarCrash />,
      title: "Road Accident",
      desc: "Trauma & injuries",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <FaTint />,
      title: "Heavy Bleeding",
      desc: "Blood loss",
      color: "bg-rose-100 text-rose-600",
    },
    {
      icon: <FaLungs />,
      title: "Breathing Problem",
      desc: "Asthma, choking",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <FaBone />,
      title: "Bone Fracture",
      desc: "Broken bones",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      icon: <FaBurn />,
      title: "Burn Injury",
      desc: "Thermal or chemical",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: <FaAllergies />,
      title: "Allergic Reaction",
      desc: "Swelling & breathing issues",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: <FaBaby />,
      title: "Child Emergency",
      desc: "Urgent child care",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FaAmbulance />,
      title: "Blood Requirement",
      desc: "Urgent blood needed",
      color: "bg-red-50 text-red-700",
    },
    {
      icon: <FaUserInjured />,
      title: "Other Emergency",
      desc: "General emergency",
      color: "bg-gray-100 text-gray-700",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="emergency-image">
        <img src="https://www.sparshhospital.com/wp-content/uploads/2025/08/Emergency-Care-in-Hennur-This-Monsoon-SPARSH-Hospital-Is-Ready-247-scaled.jpg" />
        <br />
        <ul>
          <li>
            <button1 className="">Emergency</button1>
          </li>
          <li>
            <button2 className="bg-skyblue">Near By Hospitals</button2>
          </li>
          <li>
            <button3>Find Ambulance</button3>
          </li>
          <li>
            <button4>Check-Details</button4>
          </li>
        </ul>
      </div>
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
      <br />
      <hr />
      <div className="doctor-section">
        <h1>Available Doctors</h1>
      </div>
      <br />
      <hr />

      <section className="bg-slate-50 py-10">
        <div className="mx-auto px-2 max-w-7xl">
          <h2 className="font-bold text-slate-800 text-4xl text-center">
            Patient Emergency Check
          </h2>

          <p className="mt-3 mb-10 text-gray-500 text-center">
            Select the patient's current emergency condition.
          </p>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-5">
            {emergencies.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md hover:shadow-xl p-6 rounded-2xl transition-all hover:-translate-y-2 duration-300 cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${item.color}`}
                >
                  {item.icon}
                </div>

                <h3 className="mt-5 font-semibold text-xl">{item.title}</h3>

                <p className="mt-2 text-gray-500">{item.desc}</p>

                <button className="bg-cyan-600 hover:bg-cyan-700 mt-5 py-2 rounded-lg w-full font-semibold text-white">
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <br />
      <br />
      <div className="Accordion-sec">
        <img src="https://img.freepik.com/premium-photo/cartoon-illustration-people-hospital-with-medical-chart_1158271-2609.jpg?w=2000"/>
    <div className="accordion-points"> <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title font-semibold">
          🚑 How do I request an emergency ambulance?
        </div>
        <div className="collapse-content textarea-xs">
          Click on the 'Request Ambulance' button, provide the patient's
          location, emergency type, and contact number. Our nearest available
          ambulance will be assigned immediately.
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          ❤️ What should I do if someone has a heart attack?
        </div>
        <div className="collapse-content text-sm">
          Call emergency services immediately. Keep the patient calm, loosen
          tight clothing, and if trained, begin CPR if the patient becomes
          unconscious. Do not delay seeking medical assistance.
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          🩸 What if the patient needs blood urgently?
        </div>
        <div className="collapse-content text-sm">
          Select the 'Blood Requirement' option, choose the blood group, and
          submit the request. Nearby blood banks and registered donors will be
          displayed if available.
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          🏥 How is the hospital selected?
        </div>
        <div className="collapse-content text-sm">
          CarePoint recommends the nearest hospitals based on your location, bed
          availability, emergency department capacity, and ambulance response
          time.
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          👨‍⚕️ Can I choose a specific hospital?
        </div>
        <div className="collapse-content text-sm">
          Yes. You can select any hospital listed in the emergency results if it
          accepts emergency admissions.
        </div>
      </div></div></div><br/><br/>
      
 {/* footer ---------------------------------------------------------------- */}
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
              <p>Get health tips, appointment reminders and emergency updates.</p>
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
      
      </div>
      
     
    
  );
}

export default Emergency;
