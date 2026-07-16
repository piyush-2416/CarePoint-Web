import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <img src={product.image} width="150" />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>

      <Link to={`/product/${product._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard;