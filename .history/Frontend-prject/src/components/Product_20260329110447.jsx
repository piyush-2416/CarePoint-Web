import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
function Product() {
      const [students, setStudents] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:3000/api/students") // 👈 backend URL
          .then((res) => {
            setStudents(res.data);
          })
          .catch((err) => console.log(err));
      }, []);
  return (
    <div>
       <div className="card-body">
                 {/* <ul>
                     <li>
                         <img
                             src={"https://brookrest.com/wp-content/uploads/2020/05/AdobeStock_282247995-scaled.jpeg"}/>
                         <h3>Burger</h3>
                         <h5> This is the Burgur
                         </h5>
                     </li>
                 
                 </ul> */}
                  <div>
            <h1 >Student Data</h1>
          {students.forEach((item) => (
        <div key={item._id}>    
         <img src={item.image}/>
         <h3>{item.title}</h3>
          <h2>{item.Content}</h2>
        </div>
      ))}
    </div>
             </div>
    </div>
  )
}

export default Product
