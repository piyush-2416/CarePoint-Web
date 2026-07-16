 import React from 'react'
import {Link} from "react-router-dom";
 function Home() {
   return (
     <>
     <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="w-full bg-base-300 navbar">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block my-1.5 size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4">Navbar Title</div>
    </nav>
    {/* Page content here */}
    <div className="p-4">Page Content</div>
  </div>

  <div className="is-drawer-close:overflow-visible drawer-side">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex flex-col items-start min-h-full bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="w-full menu grow">
        {/* List item */}
        <li>
          <button className="is-drawer-close:tooltip-right is-drawer-close:tooltip" data-tip="Homepage">
            {/* Home icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block my-1.5 size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span className="is-drawer-close:hidden">Homepage</span>
          </button>
        </li>

        {/* List item */}
        <li>
          <button className="is-drawer-close:tooltip-right is-drawer-close:tooltip" data-tip="Settings">
            {/* Settings icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block my-1.5 size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
            <span className="is-drawer-close:hidden">Settings</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>
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
📄 Digital Health Records<br/>

<button>Check More</button>
</p></div> 
  <br/><hr/><br/>
 
<div className='package-section'>
  <h2 className='bg-darkturquoise'>Our Best packages</h2>
  <img src="https://ponjeslyhospital.in/wp-content/uploads/2022/12/11.-Master-Health-Check.jpg" alt="" />
</div>

<br/><hr/>
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
     </>
   )
 }
 
 export default Home
 