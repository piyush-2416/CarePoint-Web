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
    <>
   <h1>Student Data</h1>

{students.map((items) => (
  <div key={items._id}>
    <img src={items.image} />
    <h3>{items.title}</h3>
    <h2>{items.Content}</h2>

//     {/* 👇 Important */}
//     <Link to={`/students/${items._id}`}>View Details</Link>
//   </div> 
))}</>
   )
}

export default Product
