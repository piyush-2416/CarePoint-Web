import React from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import {
  FaHeartbeat,
  FaEnvelope,
  FaArrowRight,
  FaAmbulance,
  FaHospital,
  FaUserMd,
  FaTint,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

function Emergency() {const emergencies = [
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
            <button1>Emergency</button1>
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

</div><br/><hr/>
<div className="doctor-section">
    <h1>Available Doctors</h1>

   </div><br/><hr/>
 
 
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

              <h3 className="mt-5 font-semibold text-xl">
                {item.title}
              </h3>

              <p className="mt-2 text-gray-500">
                {item.desc}
              </p>

              <button className="bg-cyan-600 hover:bg-cyan-700 mt-5 py-2 rounded-lg w-full font-semibold text-white">
                Select
              </button>
            </div>
          ))}

        </div>
      </div>
    </section>
    <br/><br/>
  <div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" defaultChecked />
  <div className="collapse-title font-semibold">🚑 How do I request an emergency ambulance?</div>
  <div className="collapse-content textarea-xs">Click on the 'Request Ambulance' button, provide the patient's location, emergency type, and contact number. Our nearest available ambulance will be assigned immediately.</div>
</div>
<div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title font-semibold">❤️ What should I do if someone has a heart attack?</div>
  <div className="collapse-content text-sm">Call emergency services immediately. Keep the patient calm, loosen tight clothing, and if trained, begin CPR if the patient becomes unconscious. Do not delay seeking medical assistance.</div>
</div>
<div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title font-semibold">🩸 What if the patient needs blood urgently?</div>
  <div className="collapse-content text-sm">Select the 'Blood Requirement' option, choose the blood group, and submit the request. Nearby blood banks and registered donors will be displayed if available.</div>
</div><div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title font-semibold">🏥 How is the hospital selected?</div>
  <div className="collapse-content text-sm">CarePoint recommends the nearest hospitals based on your location, bed availability, emergency department capacity, and ambulance response time.</div>
</div><div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title font-semibold">👨‍⚕️ Can I choose a specific hospital?</div>
  <div className="collapse-content text-sm">Yes. You can select any hospital listed in the emergency results if it accepts emergency admissions.</div>
</div><div className="collapse collapse-plus bg-base-100 border border-base-300">
 
</div>
  <footer className="bg-[#071B2D] mt-20 text-white">

      {/* ================= Newsletter ================= */}

      <div className="border-cyan-900 border-b">

        <div className="flex lg:flex-row flex-col justify-between items-center gap-8 mx-auto px-8 py-10 max-w-7xl">

          <div className="flex items-center gap-5">

            <div className="bg-cyan-600 p-5 rounded-full">

              <FaEnvelope className="text-3xl" />

            </div>

            <div>

              <h1 className="font-bold text-4xl">
                Stay Updated with CarePoint
              </h1>

              <p className="mt-2 text-gray-300">
                Get health tips, appointment reminders and emergency updates.
              </p>

            </div>

          </div>

          <div className="flex w-full">

            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-[#0B2740] px-6 py-4 border border-cyan-800 rounded-l-xl outline-none"
            />

            <button className="bg-cyan-500 hover:bg-cyan-600 px-8 rounded-r-xl font-semibold transition">
              Subscribe
            </button>

          </div>

        </div>

      </div>

      {/* ================= Main Footer ================= */}

      <div className="gap-12 grid md:grid-cols-2 lg:grid-cols-4 mx-auto px-8 py-16 max-w-7xl">

        {/* Company */}

        <div>

          <div className="flex items-center gap-3">

            <div className="bg-cyan-600 p-3 rounded-full">

              <FaHeartbeat className="text-2xl" />

            </div>

            <h1 className="font-bold text-4xl">
              Care<span className="text-cyan-400">Point</span>
            </h1>

          </div>

          <p className="mt-6 text-gray-400 leading-8">

            CarePoint is committed to providing fast,
            reliable and affordable healthcare services
            anytime, anywhere.

          </p>

          <div className="gap-4 grid grid-cols-2 mt-8">

            <div className="flex items-center gap-3 bg-[#0C2741] p-4 rounded-xl">

              <FaAmbulance className="text-cyan-400 text-2xl" />

              <span>24/7 Ambulance</span>

            </div>

            <div className="flex items-center gap-3 bg-[#0C2741] p-4 rounded-xl">

              <FaHospital className="text-cyan-400 text-2xl" />

              <span>Hospitals</span>

            </div>

            <div className="flex items-center gap-3 bg-[#0C2741] p-4 rounded-xl">

              <FaUserMd className="text-cyan-400 text-2xl" />

              <span>Doctors</span>

            </div>

            <div className="flex items-center gap-3 bg-[#0C2741] p-4 rounded-xl">

              <FaTint className="text-cyan-400 text-2xl" />

              <span>Blood Bank</span>

            </div>

          </div>

        </div>

        {/* Quick Links */}

        <div>

          <h2 className="mb-8 font-bold text-cyan-400 text-2xl">
            Quick Links
          </h2>

          <ul className="space-y-5">

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

              <li
                key={item}
                className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition cursor-pointer"
              >

                <FaArrowRight />

                {item}

              </li>

            ))}

          </ul>

        </div>

        {/* Services */}

        <div>

          <h2 className="mb-8 font-bold text-cyan-400 text-2xl">

            Our Services

          </h2>

          <ul className="space-y-5">

            <li>🚑 Emergency Ambulance</li>

            <li>🏥 Hospital Booking</li>

            <li>👨‍⚕ Doctor Consultation</li>

            <li>🩸 Blood Availability</li>

            <li>💊 Pharmacy Delivery</li>

            <li>🩺 Health Checkup</li>

            <li>📄 Medical Reports</li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h2 className="mb-8 font-bold text-cyan-400 text-2xl">

            Contact Us

          </h2>

          <div className="space-y-6">

            <div className="flex gap-4">

              <FaPhoneAlt className="mt-1 text-cyan-400" />

              <div>

                <p>+91 98765 43210</p>

                <p>+91 99887 66554</p>

              </div>

            </div>

            <div className="flex gap-4">

              <FaEnvelope className="mt-1 text-cyan-400" />

              <div>

                <p>support@carepoint.com</p>

                <p>info@carepoint.com</p>

              </div>

            </div>

            <div className="flex gap-4">

              <FaMapMarkerAlt className="mt-1 text-cyan-400" />

              <p>
                123 Health Care Street,
                <br />
                New Delhi, India
              </p>

            </div>

          </div>

          {/* Social */}

          <div className="flex gap-5 mt-10">

            <div className="flex justify-center items-center bg-cyan-600 rounded-full w-12 h-12 hover:scale-110 transition cursor-pointer">

              <FaFacebookF />

            </div>

            <div className="flex justify-center items-center bg-pink-600 rounded-full w-12 h-12 hover:scale-110 transition cursor-pointer">

              <FaInstagram />

            </div>

            <div className="flex justify-center items-center bg-blue-600 rounded-full w-12 h-12 hover:scale-110 transition cursor-pointer">

              <FaLinkedinIn />

            </div>

            <div className="flex justify-center items-center bg-sky-500 rounded-full w-12 h-12 hover:scale-110 transition cursor-pointer">

              <FaTwitter />

            </div>

          </div>

        </div>

      </div>

    </footer>
    {/* ================= Trust Section ================= */}

<div className="border-cyan-900 border-t">

  <div className="mx-auto px-8 py-8 max-w-7xl">

    <div className="gap-8 grid lg:grid-cols-3">

      {/* Trusted */}

      <div className="flex items-center gap-5">

        <div className="flex justify-center items-center bg-cyan-500/20 rounded-full w-16 h-16">

          🛡️

        </div>

        <div>

          <h3 className="font-semibold text-xl">
            Trusted by Thousands
          </h3>

          <p className="mt-1 text-gray-400">
            Serving patients with reliable healthcare services across India.
          </p>

        </div>

      </div>

      {/* Secure */}

      <div className="flex items-center gap-5">

        <div className="flex justify-center items-center bg-cyan-500/20 rounded-full w-16 h-16">

          🔒

        </div>

        <div>

          <h3 className="font-semibold text-xl">
            Secure & Safe
          </h3>

          <p className="mt-1 text-gray-400">
            Your personal and medical information is protected with secure encryption.
          </p>

        </div>

      </div>

      {/* Support */}

      <div className="flex items-center gap-5">

        <div className="flex justify-center items-center bg-cyan-500/20 rounded-full w-16 h-16">

          🎧

        </div>

        <div>

          <h3 className="font-semibold text-xl">
            24×7 Support
          </h3>

          <p className="mt-1 text-gray-400">
            Emergency support is available anytime, day or night.
          </p>

        </div>

      </div>

    </div>

  </div>

</div>

{/* ================= Bottom Footer ================= */}

<div className="border-cyan-900 border-t">

  <div className="flex lg:flex-row flex-col justify-between items-center gap-6 mx-auto px-8 py-6 max-w-7xl">

    {/* Copyright */}

    <p className="text-gray-400 text-center">
      © 2026 CarePoint. All Rights Reserved.
    </p>

    {/* Payment Methods */}

    <div className="flex items-center gap-4">

      <div className="bg-white px-4 py-2 rounded-lg font-bold text-black">
        VISA
      </div>

      <div className="bg-red-500 px-4 py-2 rounded-lg font-bold text-white">
        Mastercard
      </div>

      <div className="bg-blue-600 px-4 py-2 rounded-lg font-bold text-white">
        UPI
      </div>

      <div className="bg-green-600 px-4 py-2 rounded-lg font-bold text-white">
        RuPay
      </div>

    </div>

    {/* Made With */}

    <p className="text-gray-400 text-center">
      Made with
      <span className="mx-2 text-red-500 text-xl">❤</span>
      for Better Healthcare
    </p>

  </div>

</div>
  </div>
  );
}

export default Emergency;
