import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductPage from "./ProductPage";
import Home from "./Home";
import Signin from "./Signin";
function Doctors() {
  const [products, setProducts] = useState([]);
  const [add, setAdd] = useState(0);
const [loading, setLoading] = useState(true);   // 👈 ye add karo
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products") // 👈 backend URL
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      // .catch((err) => {
      //   console.log(err);
      //   setLoading(false);
      // });
  }, []);

  // setDatasend(document.getElementsByClassName("producta").document.getElementsByClassName("Shop-list"))
  // if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div>
      <Navbar/>
      <div className="Doctors-image">
        <img src="https://img.freepik.com/premium-photo/successful-indian-doctors-team-standing-together_601128-2655.jpg?w=2000" />
      </div>

      <div style={{ padding: "20px" }}>
        <h1>🩺Our Doctors </h1>
        <div className="doctor-card"
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
  to={`/productpage/${product._id}`}   
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
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
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
                <h2 style={{ margin: "10px 0 5px", color:"darkcyan"}}>{product.name}</h2>
                <h2 style={{ color: "skyblue", fontSize: "14px" }}>
                  {product.specialization}
                </h2>
                <ul>
                  <li>
                    <p style={{ color:"chocolate", fontSize: "14px" }}>
                      {product.qualification}
                    </p>
                  </li>
                  <li>
                    {" "}
                    <p style={{ color: "gray", fontSize: "14px" }}>
                      |{product.experience}
                    </p>{" "}
                  </li>
                </ul>{" "}
                <p style={{ color: "firebrick", fontSize: "14px" }}>
                  {product.availableTime}
                </p>
                {product.consultationFee && (
                  <p style={{ fontWeight: "bold", color: "#e44" }}>
                    ${product.consultationFee}Fee
                  </p>
                )}
                <p></p>
                <button className="card-btn">Details</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <hr />
      {/* </div> */}
    </div>
  );
}

export default Doctors;
