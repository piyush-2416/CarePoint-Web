import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'

function Appointment() {
  return (
    <div>
      <Navbar/>

      <h1>Appointment Page</h1>
     <div className='appointment-sec'> <img src='https://thumbs.dreamstime.com/b/patients-doctors-waiting-room-vector-illustration-patient-doctor-patient-hospital-office-interior-clinic-patient-70562172.jpg'/>
</div>
    </div>
  )
}

export default Appointment
