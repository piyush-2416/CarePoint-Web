import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaStethoscope, FaPills, FaFlask, FaSpa, FaHeartbeat, FaTags } from "react-icons/fa";

function Medicines() {
    const [hovered, setHovered] = useState(null); // 👈 kaunsi category hover ho rahi hai

  const [products, setProducts] = useState([]);
  const [add, setAdd] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/Medicines") // 👈 backend URL
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
 const [hovered, setHovered] = useState(null); // 👈 kaunsi category hover ho rahi hai

  const categories = [
    {
      icon: <FaStethoscope />,
      label: "Doctors",
      path: "/doctors",
      items: ["Cardiologist", "Dermatologist", "Dentist", "Orthopedic", "General Physician"],
    },
    {
      icon: <FaPills />,
      label: "Medicines",
      path: "/medicines",
      items: ["Fever & Pain", "Diabetes Care", "Skin Care", "Vitamins", "Cold & Cough"],
    },
    {
      icon: <FaFlask />,
      label: "Lab Tests",
      path: "/lab-tests",
      items: ["Full Body Checkup", "Thyroid Test", "Blood Sugar", "Vitamin D Test", "COVID Test"],
    },
    {
      icon: <FaSpa />,
      label: "Wellness",
      path: "/wellness",
      items: ["Skin Care", "Hair Care", "Fitness", "Nutrition", "Personal Care"],
    },
    {
      icon: <FaHeartbeat />,
      label: "Emergency",
      path: "/emergency",
      items: ["Ambulance", "24x7 Helpline", "Nearby Hospitals", "Blood Bank"],
    },
    {
      icon: <FaTags />,
      label: "Offers",
      path: "/offers",
      items: ["Membership Plans", "First Order Discount", "Lab Test Offers", "Medicine Combos"],
    },
  ];
   
  // setDatasend(document.getElementsByClassName("producta").document.getElementsByClassName("Shop-list"))
  // if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>

  return (
    <div>
      <Navbar />

      <div className="medicines-page">
        <img src="https://img.freepik.com/premium-vector/doctors-pharmacists-characters-with-drugs-medicines-flat-cartoon-vector-illustration-isolated_605858-562.jpg?w=2000" />
      </div>
      
  <div
      style={{
        backgroundColor: "#0f9b8e",
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        padding: "14px 20px",
        flexWrap: "wrap",
      }}
    >
      {categories.map((cat, i) => (
        <Link
          key={i}
          to={cat.path}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#fff",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: "500",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {cat.icon} {cat.label}
        </Link>
      ))}
    </div>

      <div style={{ padding: "20px" }}>
        <h1>🩺Our Medicines </h1>
        <div1
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {products.map((product) => (
            // 👇 Click karo toh /product/:id pe jayega
             
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
             
          ))}
        </div1>
      </div>
      <hr />
      {/* </div> */}
    </div>
  );
}

export default Medicines;
