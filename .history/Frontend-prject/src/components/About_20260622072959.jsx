
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
        <a>At our hospital, we are committed to providing high-quality healthcare services with compassion, advanced medical technology, and experienced healthcare professionals. We offer a wide range of medical facilities, including Emergency Care, 24/7 Ambulance Service, ICU Support, MRI & CT Scan, Blood Bank, Laboratory Testing, Surgical Care, Pharmacy Services, and Specialized Doctor Consultations. Our dedicated team ensures timely diagnosis, personalized treatment, and continuous patient support to deliver the best healthcare experience. With modern infrastructure and patient-centered care, we strive to keep our community healthy, safe, and supported at every stage of life.</a>
    </div>
    </>
    )
}

export default About;