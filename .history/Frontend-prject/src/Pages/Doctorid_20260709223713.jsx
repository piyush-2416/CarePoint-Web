import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

function Doctorid() {
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
 

  return (
    <>
    <Navbar/>
       {" "}
      <div style={{ padding: "20px", maxWidth: "100rem", margin: "0 auto" }}>
        {/* Back Button */}
       
    
        
        <div1 className="product-sec">
          <div className="Sec-a">
            <img src={product.image} />
          </div>
          <br />
          <div className="Sec-b">
            <h1>{product.name}</h1>
            <h3>    {product.specialization}</h3>
            <h2>💵{product.price}</h2>
            {/* <h4> 📦{product.category}</h4> */}
            {product.qualification && (
          <p style={{ color: "#555", fontSize: "15px" }}>
            📦 <strong>Category:</strong>                       {product.qualification}

          </p>
        )}

        {/* {product.stock !== undefined && ( */}
         <p>🏤Stock :{product.stock}</p>
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
          </div1>
        </div>
      
      {/* </div> */}
      <div
        onClick={() =>
          document
            .getElementsByClassName("producta")
            .document.getElementsByClassName("Shop-list")
        }
        className="producta"
      >
        <img
          onClick={() =>
            document
              .getElementsByClassName("producta2")
              .document.getElementsByClassName("Shop-list")
          }
          src="https://sandinmysuitcase.com/wp-content/uploads/2021/01/Popular-Indian-Food-Dishes.jpg"
        />
        <img src="https://watermark.lovepik.com/photo/50077/4812.jpg_wh1200.jpg" />
        <img src=" https://images7.alphacoders.com/396/396289.jpg" />
        <img src="https://lishcreative.com/wp-content/uploads/2020/09/IMG_9618-scaled.jpg " />
        <img src="https://vegecravings.com/wp-content/uploads/2023/08/Honey-Chilli-Potato-Recipe-Step-By-Step-Instructions-scaled.jpg " />
        <img src=" https://png.pngtree.com/background/20230528/original/pngtree-coffees-and-shots-of-coffees-on-a-table-picture-image_2783645.jpg" />
      </div>
    </>
  );
}

export default Doctorid;
