import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Product() {
      const { id } = useParams(); // URL se id milegi

      const [students, setStudents] = useState([]);
     useEffect(() => {
    fetch(`http://localhost:3000/api/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
                 
                 <div>
      <h1>Single Product Page</h1>

      <img src={students.image} alt="" width="200" />
      <h3>{students.title}</h3>
      <h2>{students.Content}</h2>
    </div>
      {/* ))} */}
    </div>
            //  </div>
   )
}

export default Product
