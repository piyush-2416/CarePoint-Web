import React from 'react'
// import "./App.css";
import Home from './Home.jsx'
function CreateUser() {
  return (
    <>
      <div className='add-sec'>
        <h1>Add User</h1>
       <div><h5>Name</h5> 
       <input  placeholder='Enter the name'/><br/>
      <h5>Email</h5> 
        <input  placeholder='Enter the Email'/><br/>
        <h5>Age</h5>
        <input  placeholder='Enter the Age'/><br/>

        <button>Submit</button>
        
</div>
      </div>
    </>
  )
}

export default CreateUser
