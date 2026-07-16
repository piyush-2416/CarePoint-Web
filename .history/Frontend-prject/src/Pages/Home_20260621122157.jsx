 import React from 'react'
import {Link} from "react-router-dom";
 function Home() {
   return (
     <>
       <div className="shadow-sm bg-base-100 navbar">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="p-2 mt-3 shadow z-1 bg-base-100 rounded-box w-52 menu menu-sm dropdown-content">
        <li><a>Homepage</a></li>
        <li><a>Portfolio</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="text-xl btn btn-ghost">CarePoint</a>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
    </button>
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  </div>
</div>  
<div  className="main-sec">
<img  src="https://www.teahub.io/photos/full/175-1758988_doctors-images-hd.jpg"/></div> 

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
 <div className='emergency-sec'><img src="https://www.shutterstock.com/image-vector/ambulance-emergency-car-driving-on-260nw-1882805122.jpg"/><p>
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
📄 Digital Health Records<br/><br/><button>Check More</button>
</p></div> 
  <br/><hr/><br/>
 
<div className='package-section'>
  <h2 className='bg-darkturquoise'>Our Best packages</h2>
  <img src="https://ponjeslyhospital.in/wp-content/uploads/2022/12/11.-Master-Health-Check.jpg" alt="" />
</div>

     </>
   )
 }
 
 export default Home
 