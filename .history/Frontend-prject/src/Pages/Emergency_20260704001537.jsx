import React from "react";

import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
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
<div className="hospital-container">

  <div className="hospital-card">

    <img
      src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
      alt="Hospital"
    />

    <div className="hospital-content">

      <span className="status">24×7 Emergency</span>

      <h2>City Care Hospital</h2>

      <p className="address">
        📍 MG Road, New Delhi, India
      </p>

      <p className="desc">
        Multi-speciality hospital with ICU, Trauma Center,
        Cardiology, Neurology and Emergency Services.
      </p>

      <div className="details">

        <span>⭐ 4.8</span>

        <span>🚑 Ambulance</span>

        <span>🛏 250 Beds</span>

      </div>

      <button>
        Apply Now
      </button>

    </div>

  </div>

</div>

   </div>
      
    // </div>
  );
}

export default Emergency;
