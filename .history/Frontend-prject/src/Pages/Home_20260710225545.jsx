 import React from 'react'
//  import Sidebar from './sidebar';
// import {Link} from "react-router-dom";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import Doctors from './Doctors';
import Navbar from '../Components/Navbar'
import Medicines from './Medicines';
import Schemes from './Schemes';
import SignIn from './Signin';
import Emergency from './Emergency';
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

 <Navbar/>
   <div className="main-sec">
  <img
    src=""
    alt=""
  />

  
</div> 

<div className="problem-sec">
<h1>Find by Speciality</h1>
<p>For different Problem We have multiple Solutions</p>
<br/>
<ul><li><img src="https://static.vecteezy.com/system/resources/previews/016/186/392/large_2x/optometrist-with-ophthalmologist-checks-patient-sight-optical-eye-test-and-spectacles-technology-in-flat-cartoon-hand-drawn-templates-illustration-vector.jpg"/> </li>
  <li><img src="https://thumbs.dreamstime.com/b/pediatrician-examining-baby-cartoon-illustration-depicting-doctor-wearing-light-blue-coat-stethoscope-looking-393242186.jpg"/></li>
  <li><img src="https://img.freepik.com/premium-photo/male-female-cardiologists-examine-human-heart-with-magnifiers-illustration-flat-cartoon-design_717906-64135.jpg?w=2000"/></li>
  <li><img src="https://media.istockphoto.com/id/1423372814/vector/traumatology-examines-and-bandages-childs-broken-leg-treatment-in-hospital.jpg?s=612x612&w=0&k=20&c=FZUUcVrwk5uWxqP0XmE0XsGrrfihhrjAC2-vaA9Y7F4="/></li> <li><img src="https://static.vecteezy.com/system/resources/previews/007/179/113/non_2x/doctor-dentist-cartoon-checking-boy-teeth-free-vector.jpg"/></li>
  <li><img src="https://png.pngtree.com/png-clipart/20211116/original/pngtree-surgeon-doing-surgery-cartoon-png-image_6938397.png"/></li>
  </ul></div>  <br/><hr/><br/>
  <h1>Our Facilities</h1>
 <div className='emergency-sec'><img src="https://wallup.net/wp-content/uploads/2019/09/332176-2013-mercedes-benz-sprinter-notarzt-906-ambulance-emergency.jpg"/><p>
  🩺 Multi-Specialty Care<br/>
🚑 24/7 Ambulance<br/>
💉 Emergency Services<br/>
🩸 Blood Bank<br/>
🔬 Advanced Laboratory<br/>
🩻 MRI & CT Scan<br/>
❤️ Cardiac Care Unit<br/>
🏥 ICU & Critical Care<br/>
💊 24/7 Pharmacy<br/>
📱 Online Appointment<br/>
🎥 Video Consultation<br/>
📄 Digital Health Records<br/><br/>
<Link to="/Emergency"><button2 >Emergency Call</button2></Link>
<button className='check-btn'>Check More</button>
</p></div> 
  <br/><hr/><br/>
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
<div className='package-section'>
  <h2 className='bg-darkturquoise'>Our Best packages</h2>
  <img src="https://ponjeslyhospital.in/wp-content/uploads/2022/12/11.-Master-Health-Check.jpg" alt="" />
</div>
<br/><hr/>
<h1>Some Health Tips</h1>
 <div className='health-tips-sec'>
  <img src="https://www.gethealthcaretips.com/wp-content/uploads/2020/01/5-Best-Health-Care-Tips-To-Maintain-A-Healthy-Lifestyle.jpeg"/><div className="bg-base-100 join join-vertical">
  <div className="collapse collapse-arrow border border-base-300 Accordion join-item">
    <input type="radio" name="my-accordion-4" defaultChecked />
    <div className="collapse-title font-semibold">🥗 Healthy Diet</div>
    <div className="collapse-content text-sm">Eat fresh fruits, vegetables, and protein-rich foods to maintain overall health and boost immunity.</div>
  </div>
  <div className="collapse collapse-arrow border border-base-300 Accordion join-item">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title font-semibold">💧 Stay Hydrated</div>
    <div className="collapse-content text-sm">Drink at least 8–10 glasses of water daily to keep your body hydrated and support vital functions.</div>
  </div>
  <div className="collapse collapse-arrow border border-base-300 Accordion join-item">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title font-semibold col-white">🏃 Regular Exercise</div>
    <div className="collapse-content text-sm">Engage in at least 30 minutes of physical activity every day to improve heart health and fitness.</div>
  </div> <div className="collapse collapse-arrow border border-base-300 Accordion join-item">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title font-semibold">🚭 Avoid Smoking & Alcohol</div>
    <div className="collapse-content text-sm">Reduce the risk of serious diseases by avoiding tobacco products and limiting alcohol consumption.</div>
  </div>
</div>

{/* </div> */}
 </div><br></br><hr/>
 
<div className='doctor-sec'>
<ul className="bg-base-100 shadow-md rounded-box list">
    <h1>Our Best Doctor</h1>
  <li className="list-row">
    <div className="opacity-30 font-thin tabular-nums text-4xl">01</div>
    <div><img className="rounded-box size-22" src="https://as2.ftcdn.net/v2/jpg/06/59/35/19/1000_F_659351956_j84uErnLJU7HAlVUaxiPJ5rxmQnTqjxO.jpg"/></div>
    <div className="list-col-grow">
      <div>Dr. Rajesh Sharma</div>
      <div className="font-semibold text-xs uppercase">Cardiologist ❤️</div>
    </div>
    <p className="btn btn-square btn-ghost">
<div className="rating">
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="1 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="2 star" defaultChecked />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="3 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="4 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="5 star" />
</div>    </p>
  </li>
  
  <li className="list-row">
    <div className="opacity-30 font-thin tabular-nums text-4xl">02</div>
    <div><img className="rounded-box size-22" src="https://storage.googleapis.com/kaggle-datasets-images/3417941/5959671/8c1a0030a21d5ed2584fc42e613bdf2c/dataset-card.jpg?t=2023-06-18-04-24-26"/></div>
    <div className="list-col-grow">
      <div>Dr. Amit Gupta</div>
      <div className="opacity-60 font-semibold text-xs uppercase">Neurologist 🧠</div>
    </div>
    <button className="btn btn-square btn-ghost">
<div className="rating">
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="1 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="2 star" defaultChecked />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="3 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="4 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="5 star" />
</div>    </button>
  </li>
  
  <li className="list-row">
    <div className="opacity-30 font-thin tabular-nums text-4xl">03</div>
    <div><img className="rounded-box size-22" src="https://img.freepik.com/premium-photo/young-indian-male-doctor_437792-301.jpg?w=996"/></div>
    <div className="list-col-grow">
      <div> Dr. Karan Arora</div>
      <div className="opacity-60 font-semibold text-xs uppercase">Ophthalmologist 👁️</div>
    </div>
    <button className="btn btn-square btn-ghost">
<div className="rating">
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="1 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="2 star" defaultChecked />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="3 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="4 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="5 star" />
</div>    </button>
  </li>
    <li className="list-row">
    <div className="opacity-30 font-thin tabular-nums text-4xl">04</div>
    <div><img className="rounded-box size-22" src="https://img.freepik.com/premium-photo/indian-female-doctor_714173-1859.jpg"/></div>
    <div className="list-col-grow">
      <div> Dr. Pooja Khanna</div>
      <div className="opacity-60 font-semibold text-xs uppercase">Endocrinologist 🩸</div>
    </div>
    <button className="btn btn-square btn-ghost">
<div className="rating">
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="1 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="2 star" defaultChecked />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="3 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="4 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="5 star" />
</div>    </button>
  </li>
  
     <li className="list-row">
    <div className="opacity-30 font-thin tabular-nums text-4xl">05</div>
    <div><img className="rounded-box size-22" src="https://as2.ftcdn.net/jpg/07/07/89/33/1000_F_707893394_5DEhlBjWOmse1nyu0rC9T7ZRvsAFDkYC.jpg"/></div>
    <div className="list-col-grow">
      <div>Dr. Arjun Bansal</div>
      <div className="opacity-60 font-semibold text-xs uppercase">Pulmonologist 🫁</div>
    </div>
    <button className="btn btn-square btn-ghost">
<div className="rating">
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="1 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="2 star" defaultChecked />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="3 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="4 star" />
  <input type="radio" name="rating-2" className="bg-orange-400 mask mask-star-2" aria-label="5 star" />
</div>      {/* <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg> */}
    </button>
  </li>
</ul></div>
 <br/><br/><footer className="cp-footer">
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
 
     </>
   )
 }
 
 export default Home
 