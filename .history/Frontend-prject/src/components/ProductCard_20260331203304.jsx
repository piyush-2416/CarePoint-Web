import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div>
      <img src={product.image} width="150" />
      <h2>{product.name}</h2>
      <p>₹{product.price}</p>

      <Link to={`/products/${product._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard;