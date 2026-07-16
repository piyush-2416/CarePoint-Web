 import React from 'react'
import { Link } from 'react-router-dom'
 import { useState } from 'react'
 function Navbar() {
   return (
     <div>
        <div className="Navbar">
        <Link className={"home"} to="/">Home</Link>{""}
        <Link className={"about"} to="/about">About</Link>{" "}
        <Link className={"contact"} to="/contact">Contact</Link>
      <div>  <Link className={"Shop"} to="/Shop">🛍️{add}</Link>
       <Link className={"Login"} to="/Login">Login</Link></div>

      </div>
     </div>
   )
 }
 
 export default Navbar
 