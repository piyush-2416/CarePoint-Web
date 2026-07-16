 import React from 'react'
import { Link } from 'react-router-dom'
 import { useState } from 'react'
 import About from './About'
//  import { BrowserRouter, Routes, Route } from "react-router-dom";
 
 function Navbar() {
   return (
     <div>
         
  <div className="bg-base-100 shadow-sm navbar">
  <div className="navbar-start">
    <div className="dropdown">
        <Link to="/"><a className="text-xl btn btn-ghost">CarePoint</a>
</Link> 
       
    </div>
  </div>
  <div className="navbar-center">
    <button>Doctors</button> |  
      <Link to="/About">
      <button>About</button>
    </Link> 
    | <button>Medicines</button>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle">
🩺    </button>
<button>💊</button>
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
👤        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  </div>
</div>  
      {/* </div> */}
     </div>
   )
 }
 
 export default Navbar
 