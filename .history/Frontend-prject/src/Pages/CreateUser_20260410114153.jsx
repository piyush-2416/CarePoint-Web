import React from 'react'
import {Link} from "react-router-dom";
import Home from './Pages/Home.jsx';
function CreateUser() {
  return (
    <>
      <div>
        <h1>Create User</h1>
        <input  placeholder='Enter the name'/>
            <input  placeholder='Enter the Email'/>
        <input  placeholder='Enter the Age'/>

      </div>
    </>
  )
}

export default CreateUser
