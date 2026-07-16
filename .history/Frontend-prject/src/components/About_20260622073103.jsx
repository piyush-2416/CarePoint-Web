
import { Link } from "react-router-dom";
import { useState } from "react";
// import Doctors from "../Pages/Doctors";
import Navbar from "./Navbar";
function About() {
    return(
    <><Navbar/>

       <h1>About-sec</h1>

    <div className={"About-section"}>
        <img src={"https://wallpaperaccess.com/full/10593844.jpg"}/>
        <a>Welcome to our hospital, where your health and well-being are our highest priorities. We are dedicated to delivering exceptional healthcare services through a combination of advanced medical technology, highly qualified doctors, skilled nursing staff, and a patient-centered approach. Our hospital offers a comprehensive range of medical facilities, including 24/7 Emergency Care, Ambulance Services, Intensive Care Unit (ICU) Support, MRI & CT Scans, Digital X-Ray, Blood Bank, Laboratory Testing, Surgical Services, Pharmacy Facilities, Maternity Care, Pediatric Care, Cardiology, Orthopedics, Neurology, and General Medicine. We understand that every patient has unique healthcare needs, which is why we focus on personalized treatment plans, accurate diagnosis, and continuous medical support throughout the recovery process. Our modern infrastructure, state-of-the-art equipment, and commitment to medical excellence allow us to provide safe, efficient, and reliable healthcare services. Whether it's a routine health checkup, emergency treatment, specialized surgery, or long-term care, our experienced healthcare professionals work tirelessly to ensure the best possible outcomes for every patient. With compassion, innovation, and excellence at the heart of everything we do, we strive to create a trusted healthcare environment where patients and their families feel supported, respected, and cared for at every step of their medical journey.</a>
    </div>
    </>
    )
}

export default About;