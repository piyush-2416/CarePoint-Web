import React from 'react'

import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
function Emergency() {
  return (
    <div>
      <Navbar/>
      <div className='emergency-image'>
    <img src="https://www.sparshhospital.com/wp-content/uploads/2025/08/Emergency-Care-in-Hennur-This-Monsoon-SPARSH-Hospital-Is-Ready-247-scaled.jpg"/>
 <ul><li><button>Emergency</button></li><li>Near By Hospitals</li><li>Find Ambulance</li><li>Check-Details</li></ul>   
    </div></div>
  )
}

export default Emergency
