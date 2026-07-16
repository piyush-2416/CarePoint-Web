import React from 'react'
// import "./App.css";
import {Link} from "react-router-dom"
import Home from './Home.jsx'
function CreateUser() {
  return (
    <>
      <div className='add-sec'>
        <h2>Add User</h2>
       <div><h5>Name</h5> 
       <input  placeholder='Enter the name'/><br/>
      <h5>Email</h5> 
        <input  placeholder='Enter the Email'/><br/>
        <h5>Age</h5>
        <input  placeholder='Enter the Age'/><br/>

        <Link to="/"><button>Submit</button></Link>

</div>
      </div>
    </>
  )
}

export default CreateUser
