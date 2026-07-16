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
      <div>
        <h1>Emergency Service</h1>
        <br />
        <img src="https://img.freepik.com/premium-photo/photo-realistic-medical-chart-isolated-white-background-patient-records-healthcare-documentatio_980716-173669.jpg" />
        <input placeholder="Enter Paitient Name"></input>
        <input placeholder="Enter the paitient Problem"></input>
        <input placeholder="Enter paitient Address"></input>
      </div>
    </div>
  );
}

export default Emergency;
