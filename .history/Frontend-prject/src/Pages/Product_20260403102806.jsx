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
 import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../routes/ProductRoutes";

function Product() {
  const { id } = useParams(); // URL se ID lo
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)}>← Back</button>

      <div className="product-content">
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
        />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">₹{product.price}</p>
          <p className="description">{product.description}</p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Product;