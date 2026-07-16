 import React from 'react'
 import App from './src/App';

 function Home() {
  const [user,setUser]=usestate([{
    name:"piyush",Email:"piyush@2416",age:20
  }])
   return (
     <>
        <tread>
          <tr><th>
            Name</th>
            <th>Email</th>
            <th>Age</th></tr>
        </tread>
        <tread>
          {user.map((user=>{
            return(<>
            <th>{user.name}</th>
            <th>{user.age}</th>
            <th>{user.Email}</th>
            <button>Update</button>
            <button>Delete</button></>)
          }))}
        </tread>
     </>
   )
 }
 
 export default Home
 