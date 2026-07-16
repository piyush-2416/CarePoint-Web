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
    <button className="btn-outline btn btn-ghost">
      <div className="indicator">
Doctor       <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button> |  
      <Link to="/About">
       <button className="btn-outline btn btn-ghost">
      <div className="indicator">
About      <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button> |
    </Link> 
  <button className="btn-outline btn btn-ghost">
      <div className="indicator">
Medicine      <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle">
📅    </button>
 <button className="btn btn-ghost btn-circle">
      <div className="indicator">
💊        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
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
 