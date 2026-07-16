// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../Components/Navbar";

// function Doctorid() {
//   const { id } = useParams(); // URL se product ID lega
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/products/${id}`) // 👈 Backend se single product fetch
//       .then((res) => {
//         setProduct(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setError("Product nahi mila!");
//         setLoading(false);
//       });
//   }, [id]);

//   // Loading state
//   if (loading)
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>
//     );

//   // Error state
//   if (error)
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <h2 style={{ color: "red" }}>{error}</h2>
//         <Link to="/" style={{ color: "blue" }}>
//           ← Home par wapas jao
//         </Link>
//       </div>
//     );

//   // Product nahi mila
 

//   return (
//     <>
//     <Navbar/>
//      <h1>hello piyush</h1>
//     </>
//   );
// }

// export default Doctorid;
import React from 'react'
import Navbar from '../Components/Navbar'
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
function Doctorid() {
      const { id } = useParams(); // URL se product ID lega
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/doctorid/${id}`) // 👈 Backend se single product fetch
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Product nahi mila!");
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>
    );

  // Error state
  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 style={{ color: "red" }}>{error}</h2>
        <Link to="/" style={{ color: "blue" }}>
          ← Home par wapas jao
        </Link>
      </div>
    );

  // Product nahi mila
 
  return (
    <div>
        <Navbar/>
      <h1>hello piyush </h1>
    </div>
  )
}

export default Doctorid
