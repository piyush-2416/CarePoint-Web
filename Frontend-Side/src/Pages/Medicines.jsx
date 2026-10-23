import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import {
  FaStethoscope,
  FaPills,
  FaFlask,
  FaSpa,
  FaHeartbeat,
  FaTags,
} from "react-icons/fa";

const HERO_IMG =
  "https://img.freepik.com/premium-vector/doctors-pharmacists-characters-with-drugs-medicines-flat-cartoon-vector-illustration-isolated_605858-562.jpg?w=2000";

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

/* ---------- Medicine filters ----------
   Agar tumhare DB me `category` field hai to wahi use hoga.
   Nahi hai to name/description ke keywords se category guess hogi. */
const MED_CATEGORIES = [
  {
    label: "Fever & Pain",
    keywords: ["fever", "pain", "paracetamol", "ibuprofen", "aspirin", "diclofenac", "headache", "analgesic"],
  },
  {
    label: "Diabetes Care",
    keywords: ["diabetes", "diabetic", "metformin", "insulin", "glucose", "blood sugar"],
  },
  {
    label: "Skin Care",
    keywords: ["skin", "cream", "ointment", "lotion", "rash", "derma", "itch", "acne"],
  },
  {
    label: "Vitamins",
    keywords: ["vitamin", "multivitamin", "calcium", "zinc", "iron", "supplement", "omega"],
  },
  {
    label: "Cold & Cough",
    keywords: ["cold", "cough", "syrup", "flu", "cetirizine", "congestion", "throat", "sneez"],
  },
];

// Price ranges ($) — apne hisaab se badal sakte ho
const PRICE_RANGES = [
  { id: "all", label: "Any price", test: () => true },
  { id: "u100", label: "Under $100", test: (p) => p < 100 },
  { id: "100-300", label: "$100 – $300", test: (p) => p >= 100 && p <= 300 },
  { id: "300-500", label: "$300 – $500", test: (p) => p > 300 && p <= 500 },
  { id: "500+", label: "Above $500", test: (p) => p > 500 },
];

const SORTS = [
  { id: "default", label: "Recommended" },
  { id: "low", label: "Price: Low to High" },
  { id: "high", label: "Price: High to Low" },
  { id: "az", label: "Name: A to Z" },
];

const textOf = (p) =>
  `${p.category || ""} ${p.name || ""} ${p.description || ""}`.toLowerCase();

const inCategory = (p, cat) => {
  if (p.category && p.category.toLowerCase() === cat.label.toLowerCase()) return true;
  const hay = textOf(p);
  return cat.keywords.some((k) => hay.includes(k));
};

function Medicines() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [openCat, setOpenCat] = useState(null);

  // Category URL se sync: /medicines?filter=Vitamins (multiple bhi chalega)
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCats = searchParams
    .getAll("filter")
    .filter((f) => MED_CATEGORIES.some((c) => c.label === f));

  const [priceId, setPriceId] = useState("all");
  const [sortId, setSortId] = useState("default");
  const [sideOpen, setSideOpen] = useState(false); // mobile drawer

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/Medicines")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  // Drawer khula ho to page scroll lock + Esc se band
  useEffect(() => {
    document.body.style.overflow = sideOpen ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setSideOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [sideOpen]);

  const setCats = (list) => {
    const next = new URLSearchParams(searchParams);
    next.delete("filter");
    list.forEach((x) => next.append("filter", x));
    setSearchParams(next, { replace: true });
  };

  const toggleCat = (label) =>
    setCats(
      selectedCats.includes(label)
        ? selectedCats.filter((x) => x !== label)
        : [...selectedCats, label]
    );

  // Har category me kitni medicines hain
  const counts = useMemo(() => {
    const c = {};
    MED_CATEGORIES.forEach((cat) => {
      c[cat.label] = products.filter((p) => inCategory(p, cat)).length;
    });
    return c;
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cats = MED_CATEGORIES.filter((c) => selectedCats.includes(c.label));
    const range = PRICE_RANGES.find((r) => r.id === priceId) || PRICE_RANGES[0];

    let list = products.filter((p) => {
      if (q && !(p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)))
        return false;
      if (cats.length && !cats.some((c) => inCategory(p, c))) return false;
      if (priceId !== "all") {
        const price = Number(p.price);
        if (!price || !range.test(price)) return false;
      }
      return true;
    });

    if (sortId === "low") list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortId === "high") list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sortId === "az") list = [...list].sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    return list;
  }, [products, query, selectedCats.join("|"), priceId, sortId]);

  const activeFilters =
    selectedCats.length + (priceId !== "all" ? 1 : 0) + (query.trim() ? 1 : 0);

  const clearAll = () => {
    setQuery("");
    setPriceId("all");
    setSortId("default");
    setCats([]);
  };

  const active = openCat !== null ? categories[openCat] : null;
  const priceLabel = PRICE_RANGES.find((r) => r.id === priceId)?.label;

  return (
    <div className="mp-page">
      <Navbar />

      <style>{`
        .mp-page { background: #f7fbfb; min-height: 100vh; overflow-x: clip; }
        .mp-page *, .mp-page *::before, .mp-page *::after { box-sizing: border-box; }

        /* ---------- Hero ---------- */
        .mp-hero { position: relative; height: 280px; overflow: hidden; background: #e3f7f5; }
        .mp-hero img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        .mp-hero::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(8,110,100,0.88) 0%, rgba(8,110,100,0.55) 55%, rgba(8,110,100,0.1) 100%);
        }
        .mp-hero-text {
          position: absolute; z-index: 2; inset: 0; max-width: 1200px; margin: 0 auto; padding: 0 24px;
          display: flex; flex-direction: column; justify-content: center; color: #fff;
          animation: mp-fade .6s ease both;
        }
        .mp-hero-text h1 { margin: 0; font-size: 38px; font-weight: 800; line-height: 1.15; color: #fff; }
        .mp-hero-text p { margin: 10px 0 0; max-width: 460px; font-size: 15px; line-height: 1.5; color: #d9f5f1; }

        /* ---------- Category bar ---------- */
        .mp-cats { background: #0f9b8e; position: sticky; top: 0; z-index: 20; box-shadow: 0 2px 8px rgba(0,0,0,0.12); }
        .mp-cats-row {
          max-width: 1200px; margin: 0 auto; padding: 10px 16px;
          display: flex; justify-content: center; gap: 10px; overflow-x: auto;
          scrollbar-width: none; -webkit-overflow-scrolling: touch;
        }
        .mp-cats-row::-webkit-scrollbar { display: none; }
        .mp-cat {
          flex-shrink: 0; display: inline-flex; align-items: center; gap: 8px;
          height: 40px; padding: 0 16px; border-radius: 999px; cursor: pointer;
          font-size: 14px; font-weight: 600; color: #fff; white-space: nowrap;
          background: rgba(255,255,255,0.15); border: 1.5px solid rgba(255,255,255,0.35);
          transition: background-color .2s ease, color .2s ease;
        }
        .mp-cat.open { background: #fff; color: #0b6b6b; border-color: #fff; }
        .mp-cat .caret { font-size: 10px; transition: transform .2s ease; }
        .mp-cat.open .caret { transform: rotate(180deg); }

        .mp-sub { background: #fff; border-top: 1px solid #d6efec; animation: mp-down .22s ease both; }
        .mp-sub-inner { max-width: 1200px; margin: 0 auto; padding: 14px 16px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
        .mp-sub-title { font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .6px; margin-right: 6px; }
        .mp-sub a {
          text-decoration: none; font-size: 13px; font-weight: 500; color: #0b6b6b;
          background: #eefaf8; border: 1px solid #cdeee9; padding: 7px 14px; border-radius: 999px;
        }
        .mp-sub a.all { background: #0f9b8e; border-color: #0f9b8e; color: #fff; font-weight: 600; }

        /* ---------- Content ---------- */
        .mp-wrap { max-width: 1200px; margin: 0 auto; padding: 0 24px 48px; }
        .mp-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 28px; }
        .mp-head h2 { margin: 0; font-size: 26px; font-weight: 800; color: #0b6b6b; }
        .mp-head p { margin: 4px 0 0; font-size: 14px; color: #6b7280; }
        .mp-search {
          display: flex; align-items: center; gap: 10px; background: #fff;
          border: 1px solid #cfe6e3; border-radius: 999px; padding: 0 16px; height: 46px;
          width: 100%; max-width: 340px;
        }
        .mp-search:focus-within { border-color: #0f9b8e; box-shadow: 0 0 0 3px rgba(15,155,142,0.14); }
        .mp-search input {
          flex: 1; min-width: 0; height: 100%; border: none; outline: none; background: transparent;
          font-size: 16px; color: #1f2937;
        }


        /* ---------- Layout + Sidebar ---------- */
        .mp-layout { display: grid; grid-template-columns: 272px minmax(0, 1fr); gap: 24px; margin-top: 20px; align-items: start; }
        .mp-side {
          position: sticky; top: 78px; background: #fff; border: 1px solid #d6efec; border-radius: 16px;
          max-height: calc(100vh - 96px); overflow-y: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .mp-side-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 14px 16px; background: #f1fbf9; border-bottom: 1px solid #e3f2f0; }
        .mp-side-head h3 { margin: 0; font-size: 16px; font-weight: 800; color: #0b6b6b; }
        .mp-clear { border: none; background: none; padding: 4px 0; cursor: pointer; font-size: 13px; font-weight: 600; color: #d24545; }
        .mp-close { display: none; width: 34px; height: 34px; border-radius: 50%; border: none; background: #fff; color: #0b6b6b; font-size: 16px; cursor: pointer; }
        .mp-fsec { padding: 14px 16px; border-bottom: 1px solid #e3f2f0; }
        .mp-fsec:last-of-type { border-bottom: none; }
        .mp-fsec h4 { margin: 0 0 6px; font-size: 14px; font-weight: 700; color: #1f2937; }
        .mp-opt { display: flex; align-items: center; gap: 10px; padding: 8px 0; cursor: pointer; font-size: 14px; color: #374151; }
        .mp-opt input { flex-shrink: 0; width: 18px; height: 18px; margin: 0; cursor: pointer; accent-color: #0f9b8e; }
        .mp-opt .lbl { flex: 1; }
        .mp-opt .n { font-size: 12px; font-weight: 600; color: #0b6b6b; background: #eefaf8; padding: 1px 9px; border-radius: 999px; }
        .mp-opt:has(input:checked) .lbl { color: #0b6b6b; font-weight: 600; }
        .mp-apply { display: none; position: sticky; bottom: 0; width: calc(100% - 32px); margin: 8px 16px 16px; height: 46px; border: none; border-radius: 999px; background: #0f9b8e; color: #fff; font-size: 15px; font-weight: 700; cursor: pointer; }

        .mp-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .mp-toolbar-left { display: flex; align-items: center; gap: 10px; }
        .mp-fbtn {
          display: none; align-items: center; gap: 8px; height: 40px; padding: 0 16px; border-radius: 999px; cursor: pointer;
          border: 1.5px solid #0f9b8e; background: #fff; color: #0b6b6b; font-size: 14px; font-weight: 600;
        }
        .mp-fbtn .badge { min-width: 20px; padding: 1px 6px; border-radius: 999px; background: #0f9b8e; color: #fff; font-size: 11px; text-align: center; }
        .mp-count { font-size: 14px; color: #6b7280; }
        .mp-sort { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #6b7280; }
        .mp-select {
          height: 40px; padding: 0 34px 0 14px; border-radius: 999px; cursor: pointer;
          border: 1px solid #cfe6e3; background-color: #fff; color: #1f2937; font-size: 14px; font-weight: 500;
          appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' fill='none' stroke='%230b6b6b' stroke-width='2' stroke-linecap='round'/></svg>");
          background-repeat: no-repeat; background-position: right 14px center;
        }
        .mp-select:focus { border-color: #0f9b8e; }

        .mp-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .mp-pill {
          display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 12px; border-radius: 999px; cursor: pointer;
          border: 1px solid #cdeee9; background: #eefaf8; color: #0b6b6b; font-size: 13px; font-weight: 600;
        }
        .mp-pill span { font-size: 15px; line-height: 1; }

        .mp-opt input:focus-visible, .mp-select:focus-visible, .mp-clear:focus-visible, .mp-btn:focus-visible,
        .mp-cat:focus-visible, .mp-fbtn:focus-visible, .mp-pill:focus-visible, .mp-close:focus-visible, .mp-apply:focus-visible {
          outline: 3px solid rgba(66,226,237,0.7); outline-offset: 2px;
        }
        .mp-overlay { display: none; }

        .mp-grid {
          display: grid; gap: 20px; margin-top: 16px;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
        }
        .mp-card {
          display: flex; flex-direction: column; height: 100%;
          background: #fff; border-radius: 16px; overflow: hidden;
          border: 1px solid #d6efec; border-top: 4px solid #42e2ed;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          animation: mp-rise .45s ease both;
          transition: box-shadow .25s ease, transform .25s ease;
        }
        @media (hover: hover) {
          .mp-card:hover { transform: translateY(-4px); box-shadow: 0 12px 26px rgba(15,155,142,0.16); }
        }
        .mp-img { position: relative; height: 170px; background: #eaf8f6; overflow: hidden; }
        .mp-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .mp-fallback { height: 100%; display: flex; align-items: center; justify-content: center; font-size: 56px; }
        .mp-tag {
          position: absolute; left: 10px; top: 10px; padding: 4px 10px; border-radius: 999px;
          background: rgba(255,255,255,0.92); color: #0b6b6b; font-size: 11px; font-weight: 700;
        }
        .mp-body { display: flex; flex-direction: column; flex: 1; gap: 8px; padding: 14px 16px 16px; }
        .mp-name { margin: 0; font-size: 17px; font-weight: 700; line-height: 1.3; color: #0b6b6b; overflow-wrap: anywhere; }
        .mp-desc {
          margin: 0; font-size: 13px; line-height: 1.5; color: #6b7280;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .mp-foot {
          margin-top: auto; padding-top: 12px; border-top: 1px dashed #d6efec;
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
        }
        .mp-price { font-size: 12px; color: #6b7280; }
        .mp-price b { display: block; font-size: 18px; color: #d24545; }
        .mp-btn {
          border: none; cursor: pointer; background: #0f9b8e; color: #fff;
          font-size: 13px; font-weight: 600; padding: 10px 16px; border-radius: 999px;
        }

        /* ---------- States ---------- */
        .mp-skel { height: 330px; border-radius: 16px; background: linear-gradient(90deg,#e6f4f2 25%,#f4fbfa 50%,#e6f4f2 75%); background-size: 200% 100%; animation: mp-shimmer 1.4s linear infinite; }
        .mp-msg { text-align: center; color: #6b7280; padding: 50px 12px; font-size: 15px; line-height: 1.5; }
        .mp-reset { margin-top: 10px; border: none; background: #0f9b8e; color: #fff; padding: 10px 18px; border-radius: 999px; font-size: 14px; cursor: pointer; }

        @keyframes mp-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes mp-rise { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
        @keyframes mp-down { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: none } }
        @keyframes mp-shimmer { to { background-position: -200% 0 } }

        /* ---------- Tablet ---------- */
        @media (max-width: 900px) {
          .mp-hero { height: 240px; }
          .mp-hero-text h1 { font-size: 32px; }
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 640px) {
          .mp-hero { height: 200px; }
          .mp-hero::after { background: linear-gradient(180deg, rgba(8,110,100,0.5) 0%, rgba(8,110,100,0.9) 100%); }
          .mp-hero-text { padding: 0 16px 28px; justify-content: flex-end; }
          .mp-hero-text h1 { font-size: 26px; }
          .mp-hero-text p { font-size: 13px; margin-top: 6px; }

          .mp-cats-row { justify-content: flex-start; padding: 8px 12px; }
          .mp-cat { height: 38px; padding: 0 14px; font-size: 13px; }
          .mp-sub-inner { padding: 12px; }

          .mp-wrap { padding: 0 14px 36px; }
          .mp-head { margin-top: 22px; }
          .mp-head h2 { font-size: 22px; }
          .mp-search { max-width: none; }

          .mp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
          .mp-img { height: 120px; }
          .mp-body { padding: 10px 12px 12px; gap: 6px; }
          .mp-name { font-size: 14px; }
          .mp-desc { font-size: 12px; -webkit-line-clamp: 2; }
          .mp-price b { font-size: 16px; }
          .mp-btn { padding: 8px 12px; font-size: 12px; }
          .mp-foot { flex-wrap: wrap; }
          .mp-skel { height: 240px; }
        }
        @media (max-width: 360px) {
          .mp-grid { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mp-hero-text, .mp-card, .mp-sub, .mp-skel { animation: none; }
          .mp-card, .mp-cat, .mp-cat .caret, .mp-chip { transition: none; }
          .mp-card:hover { transform: none; }
        }
        /* ---------- Sidebar becomes a drawer on tablet / mobile ---------- */
        @media (max-width: 900px) {
          .mp-layout { grid-template-columns: minmax(0, 1fr); }
          .mp-side {
            position: fixed; z-index: 60; top: 0; left: 0; bottom: 0; width: min(86vw, 340px); max-height: none;
            border-radius: 0 18px 18px 0; transform: translateX(-102%); transition: transform .28s ease;
          }
          .mp-side.open { transform: none; }
          .mp-close, .mp-apply, .mp-fbtn { display: inline-flex; align-items: center; justify-content: center; }
          .mp-overlay.open { display: block; position: fixed; inset: 0; z-index: 55; background: rgba(8,40,38,0.45); animation: mp-fade .2s ease both; }
          .mp-sort span { display: none; }
        }
        @media (prefers-reduced-motion: reduce) { .mp-side { transition: none; } }
      `}</style>

      {/* ---------- Hero ---------- */}
      <section className="mp-hero">
        <img src={HERO_IMG} alt="Doctors and pharmacists with medicines" />
        <div className="mp-hero-text">
          <h1>💊 Our Medicines</h1>
          <p>Genuine medicines and healthcare essentials, delivered with care.</p>
        </div>
      </section>

      {/* ---------- Category bar ---------- */}
      <div className="mp-cats">
        <div className="mp-cats-row" role="tablist" aria-label="Categories">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              type="button"
              className={`mp-cat ${openCat === i ? "open" : ""}`}
              aria-expanded={openCat === i}
              onClick={() => setOpenCat(openCat === i ? null : i)}
            >
              {cat.icon}
              {cat.label}
              <span className="caret" aria-hidden="true">▼</span>
            </button>
          ))}
        </div>

        {active && (
          <div className="mp-sub" key={openCat}>
            <div className="mp-sub-inner">
              <span className="mp-sub-title">{active.label}</span>
              {active.items.map((item) => (
                <Link
                  key={item}
                  to={`${active.path}?filter=${encodeURIComponent(item)}`}
                  onClick={() => setOpenCat(null)}
                >
                  {item}
                </Link>
              ))}
              <Link to={active.path} className="all" onClick={() => setOpenCat(null)}>
                View all →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ---------- Products ---------- */}
      <div className="mp-wrap">
        <div className="mp-head">
          <div>
            <h2>Our Medicines</h2>
            <p>Category aur price se apni medicine dhoondo</p>
          </div>

          <label className="mp-search">
            <span aria-hidden="true">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search medicines"
              aria-label="Search medicines"
            />
          </label>
        </div>

        <div className="mp-layout">
          {/* ---------- Sidebar filters ---------- */}
          <div
            className={`mp-overlay ${sideOpen ? "open" : ""}`}
            onClick={() => setSideOpen(false)}
            aria-hidden="true"
          />
          <aside className={`mp-side ${sideOpen ? "open" : ""}`} aria-label="Medicine filters">
            <div className="mp-side-head">
              <h3>Filters</h3>
              {activeFilters > 0 && (
                <button type="button" className="mp-clear" onClick={clearAll}>
                  Clear all
                </button>
              )}
              <button
                type="button"
                className="mp-close"
                onClick={() => setSideOpen(false)}
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>

            <div className="mp-fsec">
              <h4>Category</h4>
              {MED_CATEGORIES.map((cat) => (
                <label key={cat.label} className="mp-opt">
                  <input
                    type="checkbox"
                    checked={selectedCats.includes(cat.label)}
                    onChange={() => toggleCat(cat.label)}
                  />
                  <span className="lbl">{cat.label}</span>
                  <span className="n">{counts[cat.label] ?? 0}</span>
                </label>
              ))}
            </div>

            <div className="mp-fsec">
              <h4>Price</h4>
              {PRICE_RANGES.map((r) => (
                <label key={r.id} className="mp-opt">
                  <input
                    type="radio"
                    name="mp-price"
                    checked={priceId === r.id}
                    onChange={() => setPriceId(r.id)}
                  />
                  <span className="lbl">{r.label}</span>
                </label>
              ))}
            </div>

            <button type="button" className="mp-apply" onClick={() => setSideOpen(false)}>
              Show {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </button>
          </aside>

          {/* ---------- Results ---------- */}
          <main>
            <div className="mp-toolbar">
              <div className="mp-toolbar-left">
                <button type="button" className="mp-fbtn" onClick={() => setSideOpen(true)}>
                  ⚙ Filters
                  {activeFilters > 0 && <span className="badge">{activeFilters}</span>}
                </button>
                {!loading && !error && (
                  <span className="mp-count">
                    {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <label className="mp-sort">
                <span>Sort by</span>
                <select
                  className="mp-select"
                  value={sortId}
                  onChange={(e) => setSortId(e.target.value)}
                  aria-label="Sort medicines"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </label>
            </div>

            {activeFilters > 0 && (
              <div className="mp-pills">
                {selectedCats.map((c) => (
                  <button key={c} type="button" className="mp-pill" onClick={() => toggleCat(c)}>
                    {c} <span aria-hidden="true">×</span>
                  </button>
                ))}
                {priceId !== "all" && (
                  <button type="button" className="mp-pill" onClick={() => setPriceId("all")}>
                    {priceLabel} <span aria-hidden="true">×</span>
                  </button>
                )}
                {query.trim() && (
                  <button type="button" className="mp-pill" onClick={() => setQuery("")}>
                    “{query.trim()}” <span aria-hidden="true">×</span>
                  </button>
                )}
              </div>
            )}

            {loading ? (
              <div className="mp-grid">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="mp-skel" />
                ))}
              </div>
            ) : error ? (
              <p className="mp-msg">
                Medicines load nahi ho paayi. Backend (localhost:3000) check karo.
              </p>
            ) : filtered.length === 0 ? (
              <div className="mp-msg">
                <p>Is filter me koi medicine nahi mili. Filters change karke dekho.</p>
                {activeFilters > 0 && (
                  <button type="button" className="mp-reset" onClick={clearAll}>
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="mp-grid">
                {filtered.map((product, i) => {
                  const cat = MED_CATEGORIES.find((c) => inCategory(product, c));
                  return (
                    <article
                      key={product._id || i}
                      className="mp-card"
                      style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
                    >
                      <div className="mp-img">
                        {product.image ? (
                          <img src={product.image} alt={product.name} loading="lazy" />
                        ) : (
                          <div className="mp-fallback">💊</div>
                        )}
                        {cat && <span className="mp-tag">{cat.label}</span>}
                      </div>

                      <div className="mp-body">
                        <h3 className="mp-name">{product.name}</h3>
                        {product.description && (
                          <p className="mp-desc">{product.description}</p>
                        )}

                        <div className="mp-foot">
                          {product.price ? (
                            <span className="mp-price">
                              Price
                              <b>${product.price}</b>
                            </span>
                          ) : (
                            <span />
                          )}
                          <button type="button" className="mp-btn">
                            Details
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Medicines;
