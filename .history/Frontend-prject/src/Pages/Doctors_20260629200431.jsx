import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Doctors() {
  const [products, setProducts] = useState([]);
  const [add, setAdd] = useState(0);
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
  // if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div>
      <div className="Doctors-image">
        <img src="https://img.freepik.com/premium-photo/successful-indian-doctors-team-standing-together_601128-2655.jpg?w=2000" />
      </div>
       
      <div style={{ padding: "20px" }}>
        <h1>🩺Our Doctors </h1>
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
      </div>
      <hr /><div className="fab fab-flower">
  {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
  <div tabIndex={0} role="button" className="btn btn-circle btn-lg">
    <svg
      aria-label="New"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-6"
    >
      <path
        d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
      />
    </svg>
  </div>

  {/* Main Action button replaces the original button when FAB is open */}
  <button className="fab-main-action btn btn-circle btn-lg btn-primary">
    <svg
      aria-label="New post"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
        clipRule="evenodd"
      />
    </svg>
  </button>

  {/* buttons that show up when FAB is open */}
  <button className="btn btn-circle btn-lg">
    <svg
      aria-label="New camera photo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-6"
    >
      <path d="M9.5 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      <path
        fillRule="evenodd"
        d="M2.5 5A1.5 1.5 0 0 0 1 6.5v5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 13.5 5h-.879a1.5 1.5 0 0 1-1.06-.44l-1.122-1.12A1.5 1.5 0 0 0 9.38 3H6.62a1.5 1.5 0 0 0-1.06.44L4.439 4.56A1.5 1.5 0 0 1 3.38 5H2.5ZM11 8.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        clipRule="evenodd"
      />
    </svg>
  </button>
  <button className="btn btn-circle btn-lg">
    <svg
      aria-label="New poll"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-6"
    >
      <path
        d="M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      />
    </svg>
  </button>
  <button className="btn btn-circle btn-lg">
    <svg
      aria-label="New gallery photo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        clipRule="evenodd"
      />
    </svg>
  </button>
  <button className="btn btn-circle btn-lg">
    <svg
      aria-label="New voice"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-6"
    >
      <path d="M8 1a2 2 0 0 0-2 2v4a2 2 0 1 0 4 0V3a2 2 0 0 0-2-2Z" />
      <path
        d="M4.5 7A.75.75 0 0 0 3 7a5.001 5.001 0 0 0 4.25 4.944V13.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.556A5.001 5.001 0 0 0 13 7a.75.75 0 0 0-1.5 0 3.5 3.5 0 1 1-7 0Z"
      />
    </svg>
  </button>
</div>
      {/* </div> */}
    </div>
  );
}

export default Doctors;
