import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";
function Doctors() {
    const [products, setProducts] = useState([]);
  // const [add,setAdd]=useState(0);
    useEffect(() => {
    axios
      .get("http://localhost:3000/api/products") // 👈 backend URL
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // setDatasend(document.getElementsByClassName("producta").document.getElementsByClassName("Shop-list"))
  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;



  return (
    <div>
      <Navbar/> 

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {products.map((product) => (
                // 👇 Click karo toh /product/:id pe jayega
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div
                    style={{
                      border: "2px solid #d24545",
                      borderRadius: "10px",
                      padding: "15px",
                      cursor: "pointer",
                      transition: "box-shadow 0.2s",
                      backgroundColor: "#fff",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(0,0,0,0.15)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "none")
                    }
                  >
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    )}
                    <h3 style={{ margin: "10px 0 5px" }}>{product.name}</h3>
                    <p style={{ color: "#666", fontSize: "14px" }}>
                      {product.description}
                    </p>
                    {product.price && (
                      <p style={{ fontWeight: "bold", color: "#e44" }}>
                        ${product.price}
                      </p>
                    )}
                    <button className="text-2px">Details</button>
                  </div>
                </Link>
              ))}
            </div>
          {/* </div> */}
<hr/>

          </div>
   )
}

export default Doctors
