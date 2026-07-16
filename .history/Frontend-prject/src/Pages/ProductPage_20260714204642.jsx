// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function ProductPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState([null]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/products/${id}`)
//       .then((res) => {
//         setProduct(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px" }}>
//         Loading...
//       </h2>
//     );
//   }

//   if (!product) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
//         Product nahi mila!
//       </h2>
//     );
//   }

//   return (
//  <>
// <div >
//   <h1>products</h1>
//   <h1>{product.name}products.name</h1>
//   <h2>{product.price}products.price</h2>
//   <h3>{product.category}products.category</h3>
// </div>

//  </>
//   );
// }

// export default ProductPage;


// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function ProductPage() {
//   const { id } = useParams([]);
//   const [product, setProduct] = useState([true]);   // ✅ null, not []
//   const [loading, setLoading] = useState(true);   // ✅ true, not false

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/products/${id}`)
//      .then((res) => {
//       // console.log(<h1>{product.name}</h1>&&" product nhi mila ");
//   console.log("Data aaya:", res.data); // ✅ Debug ke liye
//   setProduct(res.data);  // res.data directly product object hai
//   setLoading(false);
// })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px" }}>
//         Loading...
//       </h2>
//     );
//   }

//   if (!product) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
//         Product nahi mila!
//       </h2>
//     );
//   }

//   return (
//    <>
//    <div>
//     <h1>Welcome to our web</h1>
//     <p>{product.name}</p>
//     <p>{product.description}</p>
//     <img src={product.image} alt="" />
//     <h1>{product.name}</h1>
//     <button>{product.price}</button>
//   </div>
//    </>
//   );
// }
 

// export default ProductPage;



import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Appointment from "./Appointment";
import Doctorid from "./Doctorid";
import Navbar from "../Components/Navbar";
function ProductPage() {
  const { id } = useParams(); // URL se product ID lega
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  axios.get(`http://localhost:3000/api/products/${id}`) // 👈 Backend se single product fetch
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
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

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
  if (!product)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Product nahi mila 😕</h2>
        <Link to="/">← Home par wapas jao</Link>
      </div>
    );

  return (
    <>
    <Navbar/>
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      
 

      {/* Product Card */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "30px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Product Image */}
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          />
        )}

        {/* Product Name */}
        <h1 style={{ margin: "10px 0", fontSize: "28px", color: "#222" }}>
          {product.name}
        </h1>
  <h2 style={{ color: "skyblue", fontSize: "14px" }}>
                  {product.specialization}
                </h2>   <p style={{ color:"chocolate", fontSize: "14px" }}>
                      {product.qualification}
                    </p>     <p style={{ color: "gray", fontSize: "14px" }}>
                      |{product.experience}
                    </p>  {/* Product Price */}   <p style={{ color: "firebrick", fontSize: "14px" }}>
                  {product.availableTime}
                </p>
        {product.price && (
          <p
            style={{
              fontWeight: "bold",
              color: "#e44",
              fontSize: "24px",
              margin: "10px 0",
            }}
          >
            💰 ₹{product.consultationFee}
          </p>
        )}


        {/* Buy Button */}
      <Link to="//Appointment/:id">  <button
          style={{
            marginTop: "25px",
            padding: "14px 35px",
            backgroundColor: "#e44",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#c33")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#e44")}
        
        >
          🩺Appointment
        </button></Link>
      </div>
    </div></>
  );
}

export default ProductPage;