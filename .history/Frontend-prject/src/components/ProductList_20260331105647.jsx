 import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/students")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <>
      {products.map(item => (
        <ProductCard key={item._id} item={item} />
      ))}
    </>
  );
}

export default ProductList;