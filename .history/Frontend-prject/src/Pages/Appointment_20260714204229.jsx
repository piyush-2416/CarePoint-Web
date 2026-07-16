import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import ProductPage from './ProductPage'
// import Doctorid from './Doctorid'
function Appointment() {
    const { id } = useParams(); // URL se product ID lega
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  axios.get(`http://localhost:3000/api/appointment/${id}`) // 👈 Backend se single product fetch
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
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

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
    <div>
      <Navbar/>

      <div className='appointment-sec'> <img src='https://themighty.com/wp-content/uploads/2018/01/GettyImages-533227522-1280x640.jpg'/>
        {/* Product Card */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "30px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
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

        {/* Product Name */}
        <h1 style={{ margin: "10px 0", fontSize: "28px", color: "#222" }}>
          {product.name}
        </h1>
  <h2 style={{ color: "skyblue", fontSize: "14px" }}>
                  {product.specialization}
                </h2>   <p style={{ color:"chocolate", fontSize: "14px" }}>
                      {product.qualification}
                    </p>     <p style={{ color: "gray", fontSize: "14px" }}>
                      |{product.experience}
                    </p>  {/* Product Price */}   <p style={{ color: "firebrick", fontSize: "14px" }}>
                  {product.availableTime}
                </p>
        {product.price && (
          <p
            style={{
              fontWeight: "bold",
              color: "#e44",
              fontSize: "24px",
              margin: "10px 0",
            }}
          >
            💰 ₹{product.consultationFee}
          </p>
        )}


        {/* Buy Button */}
      <Link to="/Appointment">  <button
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
        
        >
          🩺Appointment
        </button></Link>
      </div>
</div>
    </div>
  )
}

export default Appointment
