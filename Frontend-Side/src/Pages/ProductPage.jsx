import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import Navbar from "../Components/Navbar";
// import "./ProductPage.css"; // <-- naya CSS file (same folder me rakho)

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .get(`/products/${id}`)
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

  if (loading) return <h2 className="dp-center">Loading...</h2>;

  if (error)
    return (
      <div className="dp-center">
        <h2 className="dp-error">{error}</h2>
        <Link to="/">← Home par wapas jao</Link>
      </div>
    );

  if (!product)
    return (
      <div className="dp-center">
        <h2>Product nahi mila 😕</h2>
        <Link to="/">← Home par wapas jao</Link>
      </div>
    );

  return (
    <>
      <Navbar />

      <main className="dp-page">
        {/* ===== Doctor details card ===== */}
        <section className="dp-card">
          {product.image && (
            <div className="dp-card-img">
              <img src={product.image} alt={product.name} />
            </div>
          )}

          <div className="dp-card-info">
            <h1 className="dp-name">{product.name}</h1>

            <h2 className="dp-spec">{product.specialization}</h2>
            <p className="dp-qual">{product.qualification}</p>
            <p className="dp-exp">{product.experience}</p>
            <p className="dp-time">{product.availableTime}</p>

            <div className="dp-stats">
              <p className="dp-stat">
                <span className="dp-label dp-label-rating">Rating</span>
                {product.rating} ⭐
              </p>
              <p className="dp-stat">
                <span className="dp-label dp-label-patients">
                  Patients Treated
                </span>
                {product.patientsTreated}
              </p>
            </div>

            {product.consultationFee && (
              <p className="dp-fee">
                <span className="dp-label">Fee</span> ₹{product.consultationFee}
              </p>
            )}

            <Link to={`/Doctorid/${product._id}`} className="dp-btn-link">
              <button type="button" className="dp-btn">
                🩺 Appointment
              </button>
            </Link>
          </div>
        </section>

        <hr className="dp-hr" />

        {/* ===== About section ===== */}
        <h2 className="dp-about-title">About Our Doctor</h2>

        <section className="dp-about">
          <div className="dp-about-img">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="dp-about-content">
            <span className="dp-about-tag">ABOUT DOCTOR</span>
            <h3>{product.name}</h3>
            <div className="dp-about-line"></div>
            <p>
              Dedicated to providing compassionate, ethical, and
              patient-centered healthcare. This medical professional focuses on
              accurate diagnosis, personalized treatment, and creating a
              comfortable environment where every patient feels heard and cared
              for.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default ProductPage;
