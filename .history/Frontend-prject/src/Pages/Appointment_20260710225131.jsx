import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import ProductPage from './ProductPage'
function Appointment() {
  return (
    <div>
      <Navbar/>

      <div className='appointment-sec'> <img src='https://themighty.com/wp-content/uploads/2018/01/GettyImages-533227522-1280x640.jpg'/>
      <ProductPage/>
</div>
    </div>
  )
}

export default Appointment
