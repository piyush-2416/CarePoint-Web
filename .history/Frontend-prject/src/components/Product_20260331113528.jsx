// import React from 'react'
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Routes} from "react-router-dom";

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
//         <h2>{item.age}</h2>   
//         <h2>{item.Rank}</h2>
//          <img src={item.image}/>
//          <h3>{item.name}</h3>
//          <h4>{item.surname}</h4>
//         <h2>{item.description}</h2>
//         </div>
//       ))}
//     </div>
//              </div>
//    )
// }

// export default Product 
 import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/students/${id}`)
      .then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} />
    </div>
  );
}

export default Product;