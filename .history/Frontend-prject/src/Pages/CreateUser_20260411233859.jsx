import React from 'react'
// import "./App.css";
import {Link} from "react-router-dom"
import Home from './Home.jsx'
import axios from "axios";
function CreateUser() {
  const[name,setName]=useState();
  const[email,setEmail]=useState();
  const[age,setAge]=useState();

  const Submit =(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3000/CreateUser",{name,email,age})
    .then(result=>console.log(result))
    .catch(err=>console.log(err));
  }
  return (
    <>
      <div className='add-sec'>
        <form onSubmit={Submit}>
        <h2>Add User</h2>
       <div><h5>Name</h5> 
       <input  placeholder='Enter the name'
       onChange={(e)=>setName(e.target.value)}/><br/>
      <h5>Email</h5> 
        <input  placeholder='Enter the Email'
          onChange={(e)=>setEmail(e.target.value)}/><br/>
        <h5>Age</h5>
        <input  placeholder='Enter the Age'
          onChange={(e)=>setAge(e.target.value)}/><br/>

        <Link to="/"><button>Submit</button></Link>

</div></form>
      </div>
    </>
  )
}

export default CreateUser
