import React from 'react'
import Home from './Home.jsx'
function CreateUser() {
  return (
    <>
      <div>
        <h1>Add User</h1>
       <div> name<br/>
       <input  placeholder='Enter the name'/>
       Email<br/>
        <input  placeholder='Enter the Email'/>
        Age<br/>
        <input  placeholder='Enter the Age'/>
</div>
      </div>
    </>
  )
}

export default CreateUser
