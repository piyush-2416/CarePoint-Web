import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import Navbar from "../Components/Navbar";

// "| 8 Y" jaisi value ke aage ka | hata do
const cleanText = (v) => String(v ?? "").replace(/^[\s|]+/, "").trim();

// "Dr. Priya Verma" -> "PV" (photo na ho to initials dikhenge)
function getInitials(name = "") {
  const parts = name
    .replace(/^dr\.?\s*/i, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return (parts[0]?.[0] || "D") + (parts[1]?.[0] || "");
}

// Is page ka poora CSS yahin hai. Sab classes "dpg-" se shuru hoti hain.
const CSS = `
.dpg-page, .dpg-page *, .dpg-page *::before, .dpg-page *::after { box-sizing: border-box; }
.dpg-page {
  --bg: #eaf9f9; --cyan: #45d2d2; --cyan-bright: #17c8c8;
  --deep: #0b6b6b; --deep-dark: #095555; --ink: #053d3d; --ink-soft: #0a5f5f;
  display: block; width: 100%; min-height: 100vh;
  background: var(--bg); color: var(--ink);
  text-align: left; font-size: 16px; line-height: 1.5;
}
.dpg-page :where(h1, h2, h3, p) { margin: 0; padding: 0; }

/* ---------- Layout ---------- */
.dpg-wrap {
  width: 100%; max-width: 960px; margin: 0 auto;
  padding: 20px 16px 120px; /* neeche jagah: fixed bar ke liye */
}

.dpg-card {
  background: #fff; border: 1px solid rgba(69,210,210,.4); border-radius: 20px;
  box-shadow: 0 6px 20px rgba(5,61,61,.1);
}

/* ---------- Profile card ---------- */
.dpg-profile { padding: 24px 16px; }
.dpg-top { display: flex; flex-direction: column; align-items: center; text-align: center; }

.dpg-photo {
  width: 128px; height: 128px; flex: 0 0 128px; border-radius: 50%;
  border: 4px solid var(--cyan); background: rgba(69,210,210,.25);
  overflow: hidden; display: flex; align-items: center; justify-content: center;
}
.dpg-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
.dpg-initials { font-size: 2.25rem; font-weight: 700; color: var(--deep); text-transform: uppercase; }

.dpg-head { margin-top: 16px; min-width: 0; width: 100%; }
.dpg-name { font-size: 1.5rem; font-weight: 700; line-height: 1.25; word-break: break-word; }
.dpg-spec {
  display: inline-block; margin-top: 10px; padding: 6px 16px; border-radius: 999px;
  background: rgba(69,210,210,.3); color: var(--deep);
  font-size: .9rem; font-weight: 600;
}
.dpg-qual { margin-top: 10px; font-size: .95rem; color: var(--ink-soft); font-weight: 500; }

/* ---------- Info tiles ---------- */
.dpg-tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
.dpg-tile {
  padding: 14px 12px; border-radius: 14px; text-align: center;
  background: #f4fcfc; border: 1px solid rgba(69,210,210,.45);
}
.dpg-tile-wide { grid-column: 1 / -1; }
.dpg-tile-label { display: block; font-size: .75rem; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: var(--ink-soft); }
.dpg-tile-value { display: block; margin-top: 4px; font-size: 1rem; font-weight: 700; color: var(--ink); word-break: break-word; }

/* ---------- Fee + Appointment (mobile: neeche fixed bar) ---------- */
.dpg-cta {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 20;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom, 0px));
  background: #fff; border-top: 1px solid rgba(69,210,210,.5);
  box-shadow: 0 -4px 16px rgba(5,61,61,.12);
}
.dpg-fee { display: flex; flex-direction: column; line-height: 1.2; }
.dpg-fee-label { font-size: .75rem; font-weight: 600; color: var(--ink-soft); text-transform: uppercase; letter-spacing: .04em; }
.dpg-fee-amount { font-size: 1.5rem; font-weight: 800; color: var(--deep); }

.dpg-btn-link { flex: 1; max-width: 220px; text-decoration: none; }
.dpg-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 12px 20px; border: 0; border-radius: 999px;
  background: var(--deep); color: #fff; font: inherit; font-weight: 600; cursor: pointer;
  transition: background-color .2s ease;
}
.dpg-btn:hover { background: var(--deep-dark); }
.dpg-btn:focus-visible { outline: 3px solid var(--cyan-bright); outline-offset: 2px; }

/* ---------- About ---------- */
.dpg-about-title { margin: 40px 0 16px; font-size: 1.25rem; font-weight: 700; text-align: center; }
.dpg-about { display: flex; flex-direction: column; gap: 20px; padding: 20px 16px; }
.dpg-about-img { width: 100%; max-height: 260px; border-radius: 14px; overflow: hidden; background: rgba(69,210,210,.25); }
.dpg-about-img img { width: 100%; height: 100%; max-height: 260px; object-fit: cover; display: block; }
.dpg-about-tag {
  display: inline-block; padding: 4px 12px; border-radius: 999px;
  background: rgba(69,210,210,.3); color: var(--deep);
  font-size: .75rem; font-weight: 700; letter-spacing: .06em;
}
.dpg-about-content h3 { margin-top: 12px; font-size: 1.25rem; font-weight: 700; }
.dpg-about-line { width: 56px; height: 3px; margin: 12px 0; border-radius: 2px; background: var(--cyan-bright); }
.dpg-about-content p { font-size: .95rem; color: #374151; line-height: 1.7; }

/* ---------- Loading / error ---------- */
.dpg-center { max-width: 480px; margin: 64px auto; padding: 0 16px; text-align: center; }
.dpg-center h2 { font-size: 1.25rem; font-weight: 600; }
.dpg-center a { display: inline-block; margin-top: 16px; color: var(--deep); font-weight: 600; }
.dpg-error { color: #b91c1c; }

/* ---------- Tablet / desktop ---------- */
@media (min-width: 768px) {
  .dpg-wrap { padding: 32px 24px 64px; }
  .dpg-profile { padding: 32px; }
  .dpg-top { flex-direction: row; align-items: center; text-align: left; gap: 32px; }
  .dpg-photo { width: 168px; height: 168px; flex-basis: 168px; }
  .dpg-head { margin-top: 0; }
  .dpg-name { font-size: 2rem; }
  .dpg-tiles { grid-template-columns: repeat(4, 1fr); margin-top: 28px; }
  .dpg-tile-wide { grid-column: auto; }

  /* Desktop par bar card ke andar normal block ban jaata hai */
  .dpg-cta {
    position: static; margin-top: 28px; padding: 20px 0 0;
    background: transparent; border-top: 1px solid rgba(69,210,210,.4); box-shadow: none;
  }
  .dpg-btn-link { flex: 0 1 240px; }

  .dpg-about { flex-direction: row; align-items: center; padding: 28px; gap: 28px; }
  .dpg-about-img { flex: 0 0 280px; width: 280px; max-height: none; }
  .dpg-about-img img { max-height: 280px; }
  .dpg-about-title { font-size: 1.5rem; }
}
@media (prefers-reduced-motion: reduce) {
  .dpg-btn { transition: none; }
}
`;

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgFailed, setImgFailed] = useState(false); // photo load na ho to initials dikhao

  useEffect(() => {
    setLoading(true);
    setError(null);
    setImgFailed(false);
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Doctor nahi mila!");
        setLoading(false);
      });
  }, [id]);

  // Loading / error / not found: sab me Navbar rahega
  if (loading || error || !product) {
    return (
      <div className="dpg-page">
        <style>{CSS}</style>
        <Navbar />
        <div className="dpg-center">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              <h2 className={error ? "dpg-error" : ""}>
                {error || "Doctor nahi mila 😕"}
              </h2>
              <Link to="/">← Home par wapas jao</Link>
            </>
          )}
        </div>
      </div>
    );
  }

  const hasImage = Boolean(product.image) && !imgFailed;
  const experience = cleanText(product.experience);

  return (
    <div className="dpg-page">
      <style>{CSS}</style>
      <Navbar />

      <main className="dpg-wrap">
        {/* ===== Doctor details card ===== */}
        <section className="dpg-card dpg-profile">
          <div className="dpg-top">
            <div className="dpg-photo">
              {hasImage ? (
                <img
                  src={product.image}
                  alt={product.name}
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <span className="dpg-initials" aria-hidden="true">
                  {getInitials(product.name)}
                </span>
              )}
            </div>

            <div className="dpg-head">
              <h1 className="dpg-name">{product.name}</h1>
              {product.specialization && (
                <span className="dpg-spec">{product.specialization}</span>
              )}
              {product.qualification && (
                <p className="dpg-qual">{product.qualification}</p>
              )}
            </div>
          </div>

          <div className="dpg-tiles">
            {experience && (
              <div className="dpg-tile">
                <span className="dpg-tile-label">Experience</span>
                <span className="dpg-tile-value">{experience}</span>
              </div>
            )}
            {product.rating !== undefined && product.rating !== null && (
              <div className="dpg-tile">
                <span className="dpg-tile-label">Rating</span>
                <span className="dpg-tile-value">{product.rating} ⭐</span>
              </div>
            )}
            {product.patientsTreated && (
              <div className="dpg-tile">
                <span className="dpg-tile-label">Patients Treated</span>
                <span className="dpg-tile-value">{product.patientsTreated}</span>
              </div>
            )}
            {product.availableTime && (
              <div className="dpg-tile dpg-tile-wide">
                <span className="dpg-tile-label">Timing</span>
                <span className="dpg-tile-value">{product.availableTime}</span>
              </div>
            )}
          </div>

          {/* Mobile: neeche fixed bar | Desktop: card ke andar */}
          <div className="dpg-cta">
            {product.consultationFee ? (
              <p className="dpg-fee">
                <span className="dpg-fee-label">Consultation Fee</span>
                <span className="dpg-fee-amount">₹{product.consultationFee}</span>
              </p>
            ) : (
              <span />
            )}

            <Link to={`/Doctorid/${product._id}`} className="dpg-btn-link">
              <button type="button" className="dpg-btn">
                🩺 Appointment
              </button>
            </Link>
          </div>
        </section>

        {/* ===== About section ===== */}
        <h2 className="dpg-about-title">About Our Doctor</h2>

        <section className="dpg-card dpg-about">
          {hasImage && (
            <div className="dpg-about-img">
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImgFailed(true)}
              />
            </div>
          )}

          <div className="dpg-about-content">
            <span className="dpg-about-tag">ABOUT DOCTOR</span>
            <h3>{product.name}</h3>
            <div className="dpg-about-line"></div>
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
    </div>
  );
}

export default ProductPage;
