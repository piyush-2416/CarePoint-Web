// import React from 'react'
import "./App.css"
import { Link } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import User from '.Pages/User.jsx'
import CreateUser from './Pages/CreateUser.jsx';
// import UpdateUser from './Pages/UpdateUser.jsx'
function User() {
     const [user,setUser]=useState([{
        name:"Piyush",Email:"piyush@2416",age:20
      }])
  return (
    <>
       <tread><tr><th>Name</th>
      <th>Email</th>
      <th>Age</th></tr></tread>
      <tread>{user.map((users=>{
     return<><th>{users.name}</th>
     <th>{users.Email}</th>
     <th>{users.age}</th>
<tr> 
    <Link className={"UpdateUser"} to="/UpdateUser">
<button>Update</button></Link><button>Delete</button></tr> </>}))}</tread>
    </>
  )
}

export default User
