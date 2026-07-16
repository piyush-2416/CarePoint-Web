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
   </div>
      
    // </div>
  );
}

export default Emergency;
