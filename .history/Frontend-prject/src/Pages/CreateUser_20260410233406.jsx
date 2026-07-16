import React from 'react'
import Home from './Home.jsx'
function CreateUser() {
  return (
    <>
      <div>
        <h1>Add User</h1>
        <input  text="name"placeholder='Enter the name'/>
        <input  placeholder='Enter the Email'/>
        <input  placeholder='Enter the Age'/>

      </div>
    </>
  )
}

export default CreateUser
