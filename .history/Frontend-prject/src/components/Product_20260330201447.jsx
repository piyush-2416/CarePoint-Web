import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
                 
                  <div>
            <h1 >Student Data</h1>
          {students.map((item) => (
        <div key={item._id}> 
        <h2>{item.age}</h2>   
         <img src={item.image}/>
         <h3>{item.name}</h3>
        <h2>{item.description}</h2>
        </div>
      ))}
    </div>
             </div>
   )
}

export default Product
// import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// function Product() {

//   const { id } = useParams(); // 👈 URL se id aayegi
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/product/${id}`) // 👈 single API
//       .then((res) => {
//         setStudent(res.data);
//       }).
//       .catch((err) => console.log(err));
//   }, [id]);

//   if (!student) return <h2>Loading...</h2>;

//   return (
//     <>
//       <h1 >Student Data</h1>
//           {student.map((items) => (
//          <div key={items._id}>    
// //          <img src={items.image}/>
// //          <h3>{items.name}</h3>
// //         <h2>{items.description}</h2>
// //         </div>
//       ))}
//     </>
//     // </div>
//   );
// }

// export default Product;