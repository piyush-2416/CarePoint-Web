import React from "react";

import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
     import {
  FaHeart,
  FaCarCrash,
  FaTint,
  FaLungs,
  FaBrain,
  FaBone,
  FaBurn,
  FaAllergies,
  FaBaby,
  FaAmbulance,
  FaUserInjured,
} from "react-icons/fa";

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

function Emergency() {
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
 
 
    <section className="bg-slate-50 py-16">
      <div className="mx-auto px-5 max-w-7xl">

        <h2 className="font-bold text-slate-800 text-4xl text-center">
          Patient Emergency Check
        </h2>

        <p className="mt-3 mb-10 text-gray-500 text-center">
          Select the patient's current emergency condition.
        </p>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

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
  
  </div>
  );
}

export default Emergency;
