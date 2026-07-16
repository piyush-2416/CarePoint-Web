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
  const { id } = useParams([]);
  const [product, setProduct] = useState([]);   // ✅ null, not []
  const [loading, setLoading] = useState(true);   // ✅ true, not false

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${id}`)
     .then((res) => {
  console.log("Data aaya:", res.data); // ✅ Debug ke liye
  setProduct(res.data);  // res.data directly product object hai
  setLoading(false);
})
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading...
      </h2>
    );
  }

  if (!product) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        Product nahi mila!
      </h2>
    );
  }

  return (
   <>
  <p>{product.name}piyush ver</p>
   <h3 style={{ margin: "10px 0 5px" }}>{product.description}shagun</h3>

  <img src={product.imagesss} alt=""/>
<h1>{product.name}piyush</h1>

<button>{product.Price}hmm</button>

   </>
  );
}

export default Product;