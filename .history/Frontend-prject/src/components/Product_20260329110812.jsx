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
      }, [1]);
  return (
    <div>
       {/* <div className="card-body"> */}
                
                  <div>
            <h1 >Student Data</h1>
          {students.map((item) => (
        <div key={item._id}>    
         <img src={item.image}/>
         <h3>{item.title}</h3>
          <h2>{item.Content}</h2>
        </div>
      ))}
    </div>
             </div>
    // </div>
  )
}

export default Product
