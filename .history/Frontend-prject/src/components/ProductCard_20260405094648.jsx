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

export default ProductCard;


 