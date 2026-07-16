// import React from 'react'
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams} from "react-router-dom";

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
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div>
      <img src={product.image} width="150" />
      <h3>{product.name}</h3>
      <h4>₹{product.price}</h4>

      <Link to={`/product/${product._id}`}>
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;