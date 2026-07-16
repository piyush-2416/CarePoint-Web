// import { Link } from "react-router-dom";

// function ProductCard({ product }) {
//   return (
//     <div style={{ border: "1px solid", margin: "10px" }}>
//       <img src={product.image} width="150" />
//       <h3>{product.name}</h3>
//       <p>₹{product.price}</p>

//       <Link to={`/product/${product._id}`}>
//         View Details
//       </Link>
//     </div>
//   );
// }

// export default ProductCard;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductCard() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <>
    <h1>hello shagun</h1>
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", fontFamily: "Arial" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          cursor: "pointer",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
        }}
      >
        ← Back to Products
      </button>

      <img
        src={product.image || "https://via.placeholder.com/400"}
        alt={product.name}
        style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
      />

      <h1>{product.name}</h1>
      <p style={{ color: "green", fontSize: "22px", fontWeight: "bold" }}>₹{product.price}</p>
      <p style={{ color: "#555", lineHeight: "1.6" }}>{product.description}</p>

      <button
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "#FF6B00",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Add to Cart 🛒
      </button>
    </div></>
  );
}

export default ProductCard;


 