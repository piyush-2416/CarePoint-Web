import React from 'react'
import Home from './Home.jsx'
function CreateUser() {
  return (
    <>
      <div>
        <h1>Add User</h1>
       <div><h4>name</h4> 
       <input  placeholder='Enter the name'/><br/>
      <h4>Email</h4> 
        <input  placeholder='Enter the Email'/><br/>
        <h3>Age</h3>
        <input  placeholder='Enter the Age'/><br/>
</div>
      </div>
    </>
  )
}

export default CreateUser
