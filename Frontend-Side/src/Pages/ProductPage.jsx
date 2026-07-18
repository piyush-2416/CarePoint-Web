// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function ProductPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState([null]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/products/${id}`)
//       .then((res) => {
//         setProduct(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px" }}>
//         Loading...
//       </h2>
//     );
//   }

//   if (!product) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
//         Product nahi mila!
//       </h2>
//     );
//   }

//   return (
//  <>
// <div >
//   <h1>products</h1>
//   <h1>{product.name}products.name</h1>
//   <h2>{product.price}products.price</h2>
//   <h3>{product.category}products.category</h3>
// </div>

//  </>
//   );
// }

// export default ProductPage;

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function ProductPage() {
//   const { id } = useParams([]);
//   const [product, setProduct] = useState([true]);   // ✅ null, not []
//   const [loading, setLoading] = useState(true);   // ✅ true, not false

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/products/${id}`)
//      .then((res) => {
//       // console.log(<h1>{product.name}</h1>&&" product nhi mila ");
//   console.log("Data aaya:", res.data); // ✅ Debug ke liye
//   setProduct(res.data);  // res.data directly product object hai
//   setLoading(false);
// })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px" }}>
//         Loading...
//       </h2>
//     );
//   }

//   if (!product) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
//         Product nahi mila!
//       </h2>
//     );
//   }

//   return (
//    <>
//    <div>
//     <h1>Welcome to our web</h1>
//     <p>{product.name}</p>
//     <p>{product.description}</p>
//     <img src={product.image} alt="" />
//     <h1>{product.name}</h1>
//     <button>{product.price}</button>
//   </div>
//    </>
//   );
// }

// export default ProductPage;

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Appointment from "./Appointment";
import Doctorid from "./Doctorid";
import Navbar from "../Components/Navbar";
function ProductPage() {
  const { id } = useParams(); // URL se product ID lega
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${id}`) // 👈 Backend se single product fetch
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Product nahi mila!");
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>
    );

  // Error state
  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 style={{ color: "red" }}>{error}</h2>
        <Link to="/" style={{ color: "blue" }}>
          ← Home par wapas jao
        </Link>
      </div>
    );

  // Product nahi mila
  if (!product)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Product nahi mila 😕</h2>
        <Link to="/">← Home par wapas jao</Link>
      </div>
    );

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", maxWidth: "200rem", margin: "0 auto" }}>
        {/* Product Card */}
        <div
          className="Doctor-card"
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "30px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <ul>
            <li>
              {/* Product Image */}
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "20px",
                  }}
                />
              )}
            </li>
            <li className="doclistsec">
              {/* Product Name */}
              <h1 style={{ margin: "10px 0", fontSize: "28px", color: "#222" }}>
                {product.name}
              </h1>
              <h2 style={{ color: "skyblue", fontSize: "14px" }}>
                {product.specialization}
              </h2>{" "}
              <p style={{ color: "chocolate", fontSize: "14px" }}>
                {product.qualification}
              </p>{" "}
              <p style={{ color: "gray", fontSize: "14px" }}>
                |{product.experience}
              </p>{" "}
              {/* Product Price */}{" "}
              <p style={{ color: "#4F46E5", fontSize: "14px" }}>
                {product.availableTime}
              </p>
              <p style={{ color: "firebrick", fontSize: "14px" }}>
                <a style={{ color: "#B45309" }}>Rating </a>
                {product.rating}⭐
              </p>
              <p style={{ color: "firebrick", fontSize: "14px" }}>
                <a style={{ color: "#0D9488" }}>PatientsTreated</a>{" "}
                {product.patientsTreated}
              </p>
              {product.consultationFee && (
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#059669",
                    fontSize: "21px",
                    margin: "10px 0",
                  }}
                >
                  <a style={{ color: "" }}>Fee</a> ₹{product.consultationFee}
                </p>
              )}
              {/* Buy Button */}
              <Link to={`/Doctorid/${product._id}`}>
                {" "}
                <button
                  style={{
                    marginTop: "25px",
                    padding: "14px 35px",
                    backgroundColor: "darkturquoise",
                    color: "#fff",
                    border: "none",
                    // buttonhover:"black",
                    borderRadius: "8px",
                    fontSize: "18px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    width: "100%",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "lightcoral")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "darkturquoise")
                  }
                >
                  🩺Appointment
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <br />
      <hr />
      <h1>About-sec</h1>

      <div className={"About-section"}>
        <img
          src={
            "https://thumbs.dreamstime.com/b/hospital-isolated-transparent-background-360699901.jpg"
          }
        />
        <a>
          <h2 style={{ color: "skyblue" }}>
      {product.name}</h2>
             Dedicated to providing compassionate, ethical, and patient-centered
          healthcare, this medical professional is committed to delivering the
          highest standards of medical care with a focus on accuracy, empathy,
          and excellence. Every patient is treated with respect and individual
          attention, ensuring that their concerns are carefully understood and
          addressed through personalized treatment plans. By combining extensive
          clinical knowledge with a caring approach, they strive to offer
          accurate diagnoses, effective treatments, and preventive healthcare
          solutions that support long-term wellness. Continuous learning and
          staying updated with the latest advancements in medical science allow
          them to provide evidence-based care while maintaining the highest
          level of professionalism, safety, and quality in every consultation.
          Believing that quality healthcare extends beyond treating illness,
          this healthcare provider emphasizes building lasting relationships
          based on trust, transparency, and open communication. Patients are
          encouraged to actively participate in their healthcare journey through
          clear guidance, education, and informed decision-making.
        </a>
      </div><br/><br />

      <footer className="bg-base-200 p-10 text-base-content footer sm:footer-horizontal">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="w-80">
            <label>Enter your email address</label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>
    </>
  );
}

export default ProductPage;
