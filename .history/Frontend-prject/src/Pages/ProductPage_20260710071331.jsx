import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

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
        <Link to="/">← Home 🏡 </Link>
      </div>
    );

  return (
    <>
    <h1>hello </h1>
    <div className="Navbar" style={{opacity:0}}></div>
      {" "}
      <div style={{ padding: "20px", maxWidth: "100rem", margin: "0 auto" }}>
        {/* Back Button */}
        <Link
          to="/"
          style={
            {
              // display: "inline-block",
              // // marginBottom: "20px",
              // color: "#333",
              // textDecoration: "none",
              // fontSize: "16px",
              // fontWeight: "bold",
            }
          }
        ></Link>
        <div className="fab">
  {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
  <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-info">M</div>

  {/* close button should not be focusable so it can close the FAB when clicked. It's just a visual placeholder */}
  <div className="fab-close">
    Close <span className="btn btn-circle btn-lg btn-error">✕</span>
  </div>

  {/* buttons that show up when FAB is open */}
  <div>  <Link to="/">Home <button className="btn btn-lg btn-circle">🏡</button></Link></div>
  <div> <Link to="/about" >About <button className="btn btn-lg btn-circle">📄</button></Link></div>
  {/* <div> <Link to="/contact" >Contact <button className="btn btn-lg btn-circle">📞☎️</button></Link></div> */}
</div>
        
        <div className="product-sec">
          <div className="Sec-a">
            <img src={product.image} />
          </div>
          <br />
          <div className="Sec-b">
            <h1>{product.name}</h1>
            <h3>{product.specialization}</h3>
            <h2>💵{product.consultationFee}</h2>
            {/* <h4> 📦{product.category}</h4> */}
            {product.experience && (
          <p style={{ color: "#555", fontSize: "15px" }}>
            📦 <strong>Category:</strong> {product.availableTime}
          </p>
        )}

        {/* {product.stock !== undefined && ( */}
         <p>🏤Stock :{product.qualification}</p>
        {/* )}  */}
       
            <button
              style={{
                marginTop: "25px",
                padding: "14px 35px",
                backgroundColor: "#e44",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "18px",
                cursor: "pointer",
                fontWeight: "bold",
                width: "100%",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#c33")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#e44")}
              onClick={() => alert(`${product.name} cart mein add ho gaya! 🛒`)}
            >
              🛒 Add to Cart
            </button>
                {/* <div className="login-sec"> */}
      <div className="Com-sec">
              <div className="com-sec">
            {" "}
            <ul>
            <li>
              <button>
                <img src="https://static.vecteezy.com/system/resources/previews/011/598/471/original/google-logo-icon-illustration-free-vector.jpg" />
              </button>
            </li>
            <li>
              <button>
                {" "}
                <img src="https://static.vecteezy.com/system/resources/previews/025/270/403/original/github-logo-icon-free-vector.jpg" />
              </button>
            </li>
            <li>
              <button>
                {" "}
                <img src="https://freepnglogo.com/images/all_img/1715491541linkedin-logo-transparent.png" />
              </button>
            </li></ul></div></div></div>
          </div>
        </div>
      
    </>
  );
}

export default ProductPage;
