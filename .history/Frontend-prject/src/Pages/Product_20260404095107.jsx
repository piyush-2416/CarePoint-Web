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
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Product() {
  const { id } = useParams(); // 👈 URL se :id lega automatically
  const [products, setProducts] = useState(item);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${id}`) // 👈 id bhej raha hai backend ko
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!products) return <h2 style={{ textAlign: "center" }}>Product nahi mila!</h2>;

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
      <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>
        ← Back to Products
      </Link>

      <div style={{ marginTop: "20px", border: "1px solid #ddd", borderRadius: "12px", padding: "25px" }}>
        {products.image && (
          <img
            src={products.image}
            alt={products.name}
            style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "10px" }}
          />
        )}
        <h1 style={{ marginTop: "15px" }}>{products.name}</h1>
        <h3 style={{ color: "#555" }}>{products.surname}</h3>
        <p style={{ fontSize: "16px", color: "#444", lineHeight: "1.6" }}>{products.description}</p>
        {products.price && (
          <p style={{ fontSize: "22px", fontWeight: "bold", color: "#e44" }}>₹{products.price}</p>
        )}
        {products.Rank && <p>⭐ Rank: {products.Rank}</p>}
        {products.age && <p>Age: {products.age}</p>}
      </div>
    </div>
  );
}

export default Product;