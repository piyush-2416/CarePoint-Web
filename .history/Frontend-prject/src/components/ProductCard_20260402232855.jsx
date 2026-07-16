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