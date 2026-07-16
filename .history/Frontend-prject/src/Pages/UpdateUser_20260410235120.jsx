import React from 'react'
import {Link} from "react-router-dom"
function UpdateUser() {
  return (
   <>
      <div className='add-sec'>
        <h1>Update User</h1>
       <div><h5>Name</h5> 
       <input  placeholder='Enter the name'/><br/>
      <h5>Email</h5> 
        <input  placeholder='Enter the Email'/><br/>
        <h5>Age</h5>
        <input  placeholder='Enter the Age'/><br/>

        <Link to="/" ><button>Submit</button></Link>
        
</div>
      </div>
    </>
  )
}

export default UpdateUser
