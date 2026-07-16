// import React from 'react'
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// function Product() {
    
//       const [students, setStudents] = useState([]);
//     useEffect(() => {
//         axios
//           .get("http://localhost:3000/api/students") // 👈 backend URL
//           .then((res) => {
//             setStudents(res.data);
//           })
//           .catch((err) => console.log(err));
//       }, [1]);
//   return (
//     <div>
                 
//                   <div>
//             <h1 >Student Data</h1>
//           {students.map((item) => (
//         <div key={item._id}>    
//          <img src={item.image}/>
//          <h3>{item.title}</h3>
//           <h2>{item.Content}</h2>
//         </div>
//       ))}
//     </div>
//              </div>
//    )
// }

// export default Product
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Product() {

  const { id } = useParams(); // 👈 URL se id aayegi
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/Products/${id}`) // 👈 single API
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!student) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Single Product Page</h1>

      <div>
        <img src={student.image} alt="" />
        <h3>{student.title}</h3>
        <h2>{student.Content}</h2>
      </div>
    </div>
  );
}

export default Product;