
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// import Navbar from "../Components/Navbar";
import Appointment from "./Appointment";
import Navbar from "../Components/Navbar";
function Doctorid() {
  const myTodo = "Buy groceries";
  const { id } = useParams(); // URL se product ID lega
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
 
  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: myTodo  }]  );
  
  };

  useEffect(() => {
  axios.get(`http://localhost:5173/api/Doctorid/${id}`) // 👈 Backend se single product fetch
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
    <>
    <Navbar/>
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
                  onClick={addTodo}
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
               Get Appointment
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <br/><hr/>
      <div>
        <h1 style={{color:"skyblue"}}>Appointment</h1>
        <div style={{ maxWidth: "400px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>My Todo List</h2>
 
      {/* <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={addTodo}
          style={{
            padding: "10px 20px",
            backgroundColor: "darkturquoise",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add Todo
        </button>
      </div> */}
 
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>{t.text}</span>
          
          </li>
        ))}
      </ul>
 
      {todos.length === 0 && (
        <p style={{ textAlign: "center", color: "gray" }}>No tasks yet. Click "Add Todo" above!</p>
      )}
    </div>
        </div></>
  );
}

export default Doctorid;
