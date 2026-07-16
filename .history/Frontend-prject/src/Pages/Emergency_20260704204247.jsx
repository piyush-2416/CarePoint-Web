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
         <footer className="bg-neutral p-10 text-neutral-content footer sm:footer-horizontal">
  <aside>
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      className="fill-current">
      <path
        d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
    </svg>
    <p>
      ACME Industries Ltd.
      <br />
      Providing reliable tech since 1992
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">Social</h6>
    <div className="gap-4 grid grid-flow-col">
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
</footer>
      </div>
      
     
    
  );
}

export default Emergency;
