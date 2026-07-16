import React from 'react'

import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
function Emergency() {
  return (
    <div>
      <Navbar/>
      <div className='emergency-image'>
    <img src="https://www.sparshhospital.com/wp-content/uploads/2025/08/Emergency-Care-in-Hennur-This-Monsoon-SPARSH-Hospital-Is-Ready-247-scaled.jpg"/>
 <ul><li><button>Emergency</button></li><li><button className='bg-skyblue'>Near By Hospitals</button></li><li><button>Find Ambulance</button></li><li><button>Check-Details</button></li></ul>   
    </div></div>
  )
}

export default Emergency
