 import React from 'react'
//  import Sidebar from './sidebar';
// import {Link} from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from '../Components/Navbar'
 function Home() {
    // const [isOpen, setIsOpen] = useState(true);
  
   return (
     <>

       {/* <Route path="/Navbar" element={<Navbar />} /> */}

   
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
📄 Digital Health Records<br/><br/>
<button2>Emergency Call</button2>
<button>Check More</button>
</p></div> 
  <br/><hr/><br/>
 
<div className='package-section'>
  <h2 className='bg-darkturquoise'>Our Best packages</h2>
  <img src="https://ponjeslyhospital.in/wp-content/uploads/2022/12/11.-Master-Health-Check.jpg" alt="" />
</div>
<br/><hr/>
<h1>Some Health Tips</h1>
 <div className='health-tips-sec'>
  <img src="https://www.gethealthcaretips.com/wp-content/uploads/2020/01/5-Best-Health-Care-Tips-To-Maintain-A-Healthy-Lifestyle.jpeg"/><div className="bg-base-100 join join-vertical">
  <div className="border collapse collapse-arrow border-base-300 Accordion join-item">
    <input type="radio" name="my-accordion-4" defaultChecked />
    <div className="font-semibold collapse-title">🥗 Healthy Diet</div>
    <div className="text-sm collapse-content">Eat fresh fruits, vegetables, and protein-rich foods to maintain overall health and boost immunity.</div>
  </div>
  <div className="border collapse collapse-arrow border-base-300 Accordion join-item">
    <input type="radio" name="my-accordion-4" />
    <div className="font-semibold collapse-title">💧 Stay Hydrated</div>
    <div className="text-sm collapse-content">Drink at least 8–10 glasses of water daily to keep your body hydrated and support vital functions.</div>
  </div>
  <div className="border collapse collapse-arrow border-base-300 Accordion join-item">
    <input type="radio" name="my-accordion-4" />
    <div className="font-semibold collapse-title col-white">🏃 Regular Exercise</div>
    <div className="text-sm collapse-content">Engage in at least 30 minutes of physical activity every day to improve heart health and fitness.</div>
  </div> <div className="border collapse collapse-arrow border-base-300 Accordion join-item">
    <input type="radio" name="my-accordion-4" />
    <div className="font-semibold collapse-title">🚭 Avoid Smoking & Alcohol</div>
    <div className="text-sm collapse-content">Reduce the risk of serious diseases by avoiding tobacco products and limiting alcohol consumption.</div>
  </div>
</div>

{/* </div> */}
 </div><br></br><hr/>
<div className='doctor-sec'>
<ul className="shadow-md bg-base-100 rounded-box list">
    <h1>Our Best Doctor</h1>
  <li className="list-row">
    <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
    <div><img className="rounded-box size-22" src="https://as2.ftcdn.net/v2/jpg/06/59/35/19/1000_F_659351956_j84uErnLJU7HAlVUaxiPJ5rxmQnTqjxO.jpg"/></div>
    <div className="list-col-grow">
      <div>Dr. Rajesh Sharma</div>
      <div className="text-xs font-semibold uppercase">Cardiologist ❤️</div>
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
    <div className="text-4xl font-thin opacity-30 tabular-nums">02</div>
    <div><img className="rounded-box size-22" src="https://storage.googleapis.com/kaggle-datasets-images/3417941/5959671/8c1a0030a21d5ed2584fc42e613bdf2c/dataset-card.jpg?t=2023-06-18-04-24-26"/></div>
    <div className="list-col-grow">
      <div>Dr. Amit Gupta</div>
      <div className="text-xs font-semibold uppercase opacity-60">Neurologist 🧠</div>
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
    <div className="text-4xl font-thin opacity-30 tabular-nums">03</div>
    <div><img className="rounded-box size-22" src="https://img.freepik.com/premium-photo/young-indian-male-doctor_437792-301.jpg?w=996"/></div>
    <div className="list-col-grow">
      <div> Dr. Karan Arora</div>
      <div className="text-xs font-semibold uppercase opacity-60">Ophthalmologist 👁️</div>
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
    <div className="text-4xl font-thin opacity-30 tabular-nums">04</div>
    <div><img className="rounded-box size-22" src="https://img.freepik.com/premium-photo/indian-female-doctor_714173-1859.jpg"/></div>
    <div className="list-col-grow">
      <div> Dr. Pooja Khanna</div>
      <div className="text-xs font-semibold uppercase opacity-60">Endocrinologist 🩸</div>
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
    <div className="text-4xl font-thin opacity-30 tabular-nums">05</div>
    <div><img className="rounded-box size-22" src="https://as2.ftcdn.net/jpg/07/07/89/33/1000_F_707893394_5DEhlBjWOmse1nyu0rC9T7ZRvsAFDkYC.jpg"/></div>
    <div className="list-col-grow">
      <div>Dr. Arjun Bansal</div>
      <div className="text-xs font-semibold uppercase opacity-60">Pulmonologist 🫁</div>
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
<footer className="p-10 bg-base-200 text-base-content footer sm:footer-horizontal">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
  <form>
    <h6 className="footer-title">Newsletter</h6>
    <fieldset className="w-80">
      <label>Enter your email address</label>
      <div className="join">
        <input
          type="text"
          placeholder="username@site.com"
          className="input input-bordered join-item" />
        <button className="btn btn-primary join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>
     </>
   )
 }
 
 export default Home
 