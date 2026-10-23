import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

const HERO_IMG =
  "https://img.freepik.com/premium-photo/successful-indian-doctors-team-standing-together_601128-2655.jpg?w=2000";

/* ---------- Filter options (apne data ke hisaab se badal sakte ho) ---------- */
const FEE_RANGES = [
  { id: "all", label: "Any fee", test: () => true },
  { id: "u50", label: "Under $50", test: (f) => f < 50 },
  { id: "50-100", label: "$50 – $100", test: (f) => f >= 50 && f <= 100 },
  { id: "100-200", label: "$100 – $200", test: (f) => f > 100 && f <= 200 },
  { id: "200+", label: "Above $200", test: (f) => f > 200 },
];

const EXP_RANGES = [
  { id: "all", label: "Any experience", test: () => true },
  { id: "0-5", label: "Under 5 years", test: (y) => y < 5 },
  { id: "5-10", label: "5 – 10 years", test: (y) => y >= 5 && y <= 10 },
  { id: "10+", label: "10+ years", test: (y) => y > 10 },
];

const SORTS = [
  { id: "default", label: "Recommended" },
  { id: "exp", label: "Most experienced" },
  { id: "low", label: "Fee: Low to High" },
  { id: "high", label: "Fee: High to Low" },
  { id: "az", label: "Name: A to Z" },
];

const norm = (s) => String(s || "").trim().toLowerCase();

// "12 years" / "12+ yrs" / 12 -> 12
const yearsOf = (exp) => {
  const m = String(exp ?? "").match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
};

const matchSpec = (p, sel) => {
  const a = norm(p.specialization);
  const b = norm(sel);
  return !!a && (a === b || a.includes(b) || b.includes(a));
};

function Doctors() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");

  // Specialization URL se sync: /doctors?filter=Cardiologist (multiple bhi chalega)
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSpecs = searchParams.getAll("filter");

  const [feeId, setFeeId] = useState("all");
  const [expId, setExpId] = useState("all");
  const [sortId, setSortId] = useState("default");
  const [sideOpen, setSideOpen] = useState(false); // mobile drawer

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
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

  const setSpecs = (list) => {
    const next = new URLSearchParams(searchParams);
    next.delete("filter");
    list.forEach((x) => next.append("filter", x));
    setSearchParams(next, { replace: true });
  };

  const isSelected = (s) => selectedSpecs.some((x) => norm(x) === norm(s));

  const toggleSpec = (s) =>
    setSpecs(
      isSelected(s)
        ? selectedSpecs.filter((x) => norm(x) !== norm(s))
        : [...selectedSpecs, s]
    );

  // Data se hi specializations nikaalo (+ URL se aaye hue)
  const specs = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      if (p.specialization) map.set(norm(p.specialization), p.specialization);
    });
    selectedSpecs.forEach((s) => {
      if (!map.has(norm(s))) map.set(norm(s), s);
    });
    return [...map.values()].sort((a, b) => a.localeCompare(b));
  }, [products, selectedSpecs.join("|")]);

  const counts = useMemo(() => {
    const c = {};
    specs.forEach((s) => {
      c[s] = products.filter((p) => norm(p.specialization) === norm(s)).length;
    });
    return c;
  }, [products, specs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const fee = FEE_RANGES.find((r) => r.id === feeId) || FEE_RANGES[0];
    const exp = EXP_RANGES.find((r) => r.id === expId) || EXP_RANGES[0];

    let list = products.filter((p) => {
      if (
        q &&
        !(p.name?.toLowerCase().includes(q) || p.specialization?.toLowerCase().includes(q))
      )
        return false;
      if (selectedSpecs.length && !selectedSpecs.some((s) => matchSpec(p, s))) return false;
      if (feeId !== "all") {
        const f = Number(p.consultationFee);
        if (!f || !fee.test(f)) return false;
      }
      if (expId !== "all") {
        const y = yearsOf(p.experience);
        if (y === null || !exp.test(y)) return false;
      }
      return true;
    });

    if (sortId === "exp") list = [...list].sort((a, b) => (yearsOf(b.experience) || 0) - (yearsOf(a.experience) || 0));
    else if (sortId === "low") list = [...list].sort((a, b) => (a.consultationFee || 0) - (b.consultationFee || 0));
    else if (sortId === "high") list = [...list].sort((a, b) => (b.consultationFee || 0) - (a.consultationFee || 0));
    else if (sortId === "az") list = [...list].sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    return list;
  }, [products, query, selectedSpecs.join("|"), feeId, expId, sortId]);

  const activeFilters =
    selectedSpecs.length +
    (feeId !== "all" ? 1 : 0) +
    (expId !== "all" ? 1 : 0) +
    (query.trim() ? 1 : 0);

  const clearAll = () => {
    setQuery("");
    setFeeId("all");
    setExpId("all");
    setSortId("default");
    setSpecs([]);
  };

  const feeLabel = FEE_RANGES.find((r) => r.id === feeId)?.label;
  const expLabel = EXP_RANGES.find((r) => r.id === expId)?.label;

  return (
    <div className="dp-page">
      <Navbar />

      <style>{`
        .dp-page { background: #f7fbfb; min-height: 100vh; overflow-x: clip; }
        .dp-page *, .dp-page *::before, .dp-page *::after { box-sizing: border-box; }

        /* ---------- Hero ---------- */
        .dp-hero { position: relative; height: 280px; overflow: hidden; }
        .dp-hero img { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; display: block; }
        .dp-hero::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(8,90,90,0.88) 0%, rgba(8,90,90,0.55) 55%, rgba(8,90,90,0.15) 100%);
        }
        .dp-hero-text {
          position: absolute; z-index: 2; inset: 0;
          display: flex; flex-direction: column; justify-content: center;
          max-width: 1200px; margin: 0 auto; padding: 0 24px; color: #fff;
          animation: dp-fade .6s ease both;
        }
        .dp-hero-text h1 { margin: 0; font-size: 38px; font-weight: 800; line-height: 1.15; color: #fff; }
        .dp-hero-text p { margin: 10px 0 0; max-width: 460px; font-size: 15px; color: #d8f1f1; }

        /* ---------- Search ---------- */
        .dp-wrap { max-width: 1200px; margin: 0 auto; padding: 0 24px 48px; }
        .dp-toolbar {
          position: relative; z-index: 3; margin-top: -28px;
          background: #fff; border-radius: 16px; padding: 14px 16px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
        .dp-search {
          display: flex; align-items: center; gap: 10px;
          border: 1px solid #d9e6e6; border-radius: 999px; padding: 0 16px; height: 46px;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .dp-search:focus-within { border-color: #0b7a7a; box-shadow: 0 0 0 3px rgba(11,122,122,0.12); }
        .dp-search input {
          flex: 1; border: none; outline: none; background: transparent;
          font-size: 16px; color: #1f2937; min-width: 0; height: 100%;
        }

        /* ---------- Layout + Sidebar ---------- */
        .dp-layout { display: grid; grid-template-columns: 272px minmax(0, 1fr); gap: 24px; margin-top: 22px; align-items: start; }
        .dp-side {
          position: sticky; top: 84px; background: #fff; border: 1px solid #e0ecec; border-radius: 16px;
          max-height: calc(100vh - 100px); overflow-y: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .dp-side-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 14px 16px; background: #f1fafa; border-bottom: 1px solid #e3f0f0; }
        .dp-side-head h3 { margin: 0; font-size: 16px; font-weight: 800; color: #0b6b6b; }
        .dp-clear { border: none; background: none; padding: 4px 0; cursor: pointer; font-size: 13px; font-weight: 600; color: #d24545; }
        .dp-close { display: none; width: 34px; height: 34px; border-radius: 50%; border: none; background: #fff; color: #0b6b6b; font-size: 16px; cursor: pointer; }
        .dp-fsec { padding: 14px 16px; border-bottom: 1px solid #e3f0f0; }
        .dp-fsec:last-of-type { border-bottom: none; }
        .dp-fsec h4 { margin: 0 0 6px; font-size: 14px; font-weight: 700; color: #1f2937; }
        .dp-opt { display: flex; align-items: center; gap: 10px; padding: 8px 0; cursor: pointer; font-size: 14px; color: #374151; }
        .dp-opt input { flex-shrink: 0; width: 18px; height: 18px; margin: 0; cursor: pointer; accent-color: #0b7a7a; }
        .dp-opt .lbl { flex: 1; overflow-wrap: anywhere; }
        .dp-opt .n { font-size: 12px; font-weight: 600; color: #0b6b6b; background: #eaf6f6; padding: 1px 9px; border-radius: 999px; }
        .dp-opt:has(input:checked) .lbl { color: #0b6b6b; font-weight: 600; }
        .dp-apply { display: none; position: sticky; bottom: 0; width: calc(100% - 32px); margin: 8px 16px 16px; height: 46px; border: none; border-radius: 999px; background: #0b7a7a; color: #fff; font-size: 15px; font-weight: 700; cursor: pointer; }

        /* ---------- Results toolbar ---------- */
        .dp-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .dp-bar-left { display: flex; align-items: center; gap: 10px; }
        .dp-fbtn {
          display: none; align-items: center; gap: 8px; height: 40px; padding: 0 16px; border-radius: 999px; cursor: pointer;
          border: 1.5px solid #0b7a7a; background: #fff; color: #0b6b6b; font-size: 14px; font-weight: 600;
        }
        .dp-fbtn .badge { min-width: 20px; padding: 1px 6px; border-radius: 999px; background: #0b7a7a; color: #fff; font-size: 11px; text-align: center; }
        .dp-count { font-size: 14px; color: #6b7280; }
        .dp-count b { color: #0b6b6b; }
        .dp-sort { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #6b7280; }
        .dp-select {
          height: 40px; padding: 0 34px 0 14px; border-radius: 999px; cursor: pointer;
          border: 1px solid #d9e6e6; background-color: #fff; color: #1f2937; font-size: 14px; font-weight: 500;
          appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' fill='none' stroke='%230b6b6b' stroke-width='2' stroke-linecap='round'/></svg>");
          background-repeat: no-repeat; background-position: right 14px center;
        }
        .dp-select:focus { border-color: #0b7a7a; }

        .dp-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .dp-pill {
          display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 12px; border-radius: 999px; cursor: pointer;
          border: 1px solid #cfe8e8; background: #eaf6f6; color: #0b6b6b; font-size: 13px; font-weight: 600;
        }
        .dp-pill span { font-size: 15px; line-height: 1; }

        .dp-opt input:focus-visible, .dp-select:focus-visible, .dp-clear:focus-visible, .dp-fbtn:focus-visible,
        .dp-pill:focus-visible, .dp-close:focus-visible, .dp-apply:focus-visible, .dp-reset:focus-visible, .dp-link:focus-visible {
          outline: 3px solid rgba(66,226,237,0.7); outline-offset: 2px;
        }
        .dp-overlay { display: none; }

        /* ---------- Grid + Card ---------- */
        .dp-grid {
          display: grid; gap: 22px; margin-top: 16px;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
        .dp-link { display: block; height: 100%; text-decoration: none; color: inherit;
          animation: dp-rise .5s ease both; }
        .dp-card {
          display: flex; flex-direction: column; height: 100%;
          background: #fff; border-radius: 16px; overflow: hidden;
          border: 1px solid #e6eeee; border-top: 4px solid #42e2ed;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        @media (hover: hover) {
          .dp-link:hover .dp-card { transform: translateY(-5px); box-shadow: 0 12px 26px rgba(11,122,122,0.16); }
          .dp-link:hover .dp-img { transform: scale(1.05); }
          .dp-link:hover .dp-btn { background: #42e2ed; }
        }

        .dp-img-wrap { position: relative; height: 200px; background: #e3f2f2; overflow: hidden; }
        .dp-img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; transition: transform .4s ease; }
        .dp-fallback { height: 100%; display: flex; align-items: center; justify-content: center; font-size: 64px; }
        .dp-badge {
          position: absolute; left: 12px; bottom: 12px;
          background: rgba(255,255,255,0.95); color: #0b7a7a;
          font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 999px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.12);
        }

        .dp-body { display: flex; flex-direction: column; flex: 1; gap: 10px; padding: 16px; }
        .dp-name { margin: 0; font-size: 18px; font-weight: 700; line-height: 1.3; color: #0b6b6b; overflow-wrap: anywhere; }
        .dp-qual { margin: 0; font-size: 13px; font-weight: 500; color: #a0522d; }
        .dp-meta { display: flex; flex-wrap: wrap; gap: 8px; }
        .dp-tag { font-size: 12px; padding: 4px 10px; border-radius: 999px; background: #f1f5f5; color: #4b5563; }
        .dp-tag.time { background: #fdecec; color: #b22222; }

        .dp-foot {
          margin-top: auto; padding-top: 12px; border-top: 1px dashed #dfe8e8;
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
        }
        .dp-fee { font-size: 12px; color: #6b7280; }
        .dp-fee b { display: block; font-size: 18px; color: #0b9aa5; }
        .dp-btn {
          background: #0b7a7a; color: #fff; font-size: 13px; font-weight: 600;
          padding: 8px 14px; border-radius: 999px; white-space: nowrap;
          transition: background .2s ease;
        }

        /* ---------- Loading / empty ---------- */
        .dp-skel { height: 380px; border-radius: 16px; background: linear-gradient(90deg,#eaf2f2 25%,#f6fafa 50%,#eaf2f2 75%);
          background-size: 200% 100%; animation: dp-shimmer 1.4s linear infinite; }
        .dp-msg { text-align: center; color: #6b7280; padding: 50px 12px; font-size: 15px; line-height: 1.5; }
        .dp-reset { margin-top: 10px; border: none; background: #0b7a7a; color: #fff; padding: 10px 18px;
          border-radius: 999px; font-size: 14px; cursor: pointer; transition: background .2s ease; }
        .dp-reset:hover { background: #0b9aa5; }

        /* ---------- Animations (halke) ---------- */
        @keyframes dp-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes dp-rise { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
        @keyframes dp-shimmer { to { background-position: -200% 0 } }

        /* ---------- Sidebar becomes a drawer on tablet / mobile ---------- */
        @media (max-width: 900px) {
          .dp-layout { grid-template-columns: minmax(0, 1fr); }
          .dp-side {
            position: fixed; z-index: 60; top: 0; left: 0; bottom: 0; width: min(86vw, 340px); max-height: none;
            border-radius: 0 18px 18px 0; transform: translateX(-102%); transition: transform .28s ease;
          }
          .dp-side.open { transform: none; }
          .dp-close, .dp-apply, .dp-fbtn { display: inline-flex; align-items: center; justify-content: center; }
          .dp-overlay.open { display: block; position: fixed; inset: 0; z-index: 55; background: rgba(8,40,38,0.45); animation: dp-fade .2s ease both; }
          .dp-sort span { display: none; }
        }
        @media (max-width: 640px) {
          .dp-hero { height: 220px; }
          .dp-hero-text { padding: 0 16px; }
          .dp-hero-text h1 { font-size: 28px; }
          .dp-wrap { padding: 0 14px 40px; }
          .dp-grid { gap: 16px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dp-link, .dp-hero-text, .dp-skel, .dp-overlay { animation: none; }
          .dp-card, .dp-img, .dp-btn, .dp-side { transition: none; }
          .dp-link:hover .dp-card, .dp-link:hover .dp-img { transform: none; }
        }
      `}</style>

      {/* ---------- Hero ---------- */}
      <section className="dp-hero">
        <img src={HERO_IMG} alt="Our doctors team" />
        <div className="dp-hero-text">
          <h1>🩺 Our Doctors</h1>
          <p>Experienced specialists, ready to help you. Find the right doctor and view their profile.</p>
        </div>
      </section>

      <div className="dp-wrap">
        {/* ---------- Search ---------- */}
        <div className="dp-toolbar">
          <label className="dp-search">
            <span aria-hidden="true">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by doctor name or specialization"
              aria-label="Search doctors"
            />
          </label>
        </div>

        <div className="dp-layout">
          {/* ---------- Sidebar filters ---------- */}
          <div
            className={`dp-overlay ${sideOpen ? "open" : ""}`}
            onClick={() => setSideOpen(false)}
            aria-hidden="true"
          />
          <aside className={`dp-side ${sideOpen ? "open" : ""}`} aria-label="Doctor filters">
            <div className="dp-side-head">
              <h3>Filters</h3>
              {activeFilters > 0 && (
                <button type="button" className="dp-clear" onClick={clearAll}>
                  Clear all
                </button>
              )}
              <button
                type="button"
                className="dp-close"
                onClick={() => setSideOpen(false)}
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>

            {specs.length > 0 && (
              <div className="dp-fsec">
                <h4>Specialization</h4>
                {specs.map((s) => (
                  <label key={s} className="dp-opt">
                    <input type="checkbox" checked={isSelected(s)} onChange={() => toggleSpec(s)} />
                    <span className="lbl">{s}</span>
                    <span className="n">{counts[s] ?? 0}</span>
                  </label>
                ))}
              </div>
            )}

            <div className="dp-fsec">
              <h4>Consultation fee</h4>
              {FEE_RANGES.map((r) => (
                <label key={r.id} className="dp-opt">
                  <input
                    type="radio"
                    name="dp-fee"
                    checked={feeId === r.id}
                    onChange={() => setFeeId(r.id)}
                  />
                  <span className="lbl">{r.label}</span>
                </label>
              ))}
            </div>

            <div className="dp-fsec">
              <h4>Experience</h4>
              {EXP_RANGES.map((r) => (
                <label key={r.id} className="dp-opt">
                  <input
                    type="radio"
                    name="dp-exp"
                    checked={expId === r.id}
                    onChange={() => setExpId(r.id)}
                  />
                  <span className="lbl">{r.label}</span>
                </label>
              ))}
            </div>

            <button type="button" className="dp-apply" onClick={() => setSideOpen(false)}>
              Show {filtered.length} doctor{filtered.length !== 1 ? "s" : ""}
            </button>
          </aside>

          {/* ---------- Results ---------- */}
          <main>
            <div className="dp-bar">
              <div className="dp-bar-left">
                <button type="button" className="dp-fbtn" onClick={() => setSideOpen(true)}>
                  ⚙ Filters
                  {activeFilters > 0 && <span className="badge">{activeFilters}</span>}
                </button>
                {!loading && !error && (
                  <span className="dp-count">
                    Showing <b>{filtered.length}</b> doctor{filtered.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <label className="dp-sort">
                <span>Sort by</span>
                <select
                  className="dp-select"
                  value={sortId}
                  onChange={(e) => setSortId(e.target.value)}
                  aria-label="Sort doctors"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </label>
            </div>

            {activeFilters > 0 && (
              <div className="dp-pills">
                {selectedSpecs.map((s) => (
                  <button key={s} type="button" className="dp-pill" onClick={() => toggleSpec(s)}>
                    {s} <span aria-hidden="true">×</span>
                  </button>
                ))}
                {feeId !== "all" && (
                  <button type="button" className="dp-pill" onClick={() => setFeeId("all")}>
                    {feeLabel} <span aria-hidden="true">×</span>
                  </button>
                )}
                {expId !== "all" && (
                  <button type="button" className="dp-pill" onClick={() => setExpId("all")}>
                    {expLabel} <span aria-hidden="true">×</span>
                  </button>
                )}
                {query.trim() && (
                  <button type="button" className="dp-pill" onClick={() => setQuery("")}>
                    “{query.trim()}” <span aria-hidden="true">×</span>
                  </button>
                )}
              </div>
            )}

            {loading ? (
              <div className="dp-grid">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="dp-skel" />
                ))}
              </div>
            ) : error ? (
              <p className="dp-msg">Doctors load nahi ho paaye. Backend (localhost:3000) check karo.</p>
            ) : filtered.length === 0 ? (
              <div className="dp-msg">
                <p>Is filter me koi doctor nahi mila. Filters change karke dekho.</p>
                {activeFilters > 0 && (
                  <button type="button" className="dp-reset" onClick={clearAll}>
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="dp-grid">
                {filtered.map((product, i) => (
                  <Link
                    to={`/products/${product._id}`}
                    key={product._id}
                    className="dp-link"
                    style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
                  >
                    <div className="dp-card">
                      <div className="dp-img-wrap">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="dp-img" />
                        ) : (
                          <div className="dp-fallback">👨‍⚕️</div>
                        )}
                        {product.specialization && (
                          <span className="dp-badge">{product.specialization}</span>
                        )}
                      </div>

                      <div className="dp-body">
                        <h2 className="dp-name">{product.name}</h2>

                        {product.qualification && (
                          <p className="dp-qual">🎓 {product.qualification}</p>
                        )}

                        <div className="dp-meta">
                          {product.experience && (
                            <span className="dp-tag">💼 {product.experience}</span>
                          )}
                          {product.availableTime && (
                            <span className="dp-tag time">🕒 {product.availableTime}</span>
                          )}
                        </div>

                        <div className="dp-foot">
                          {product.consultationFee ? (
                            <span className="dp-fee">
                              Consultation
                              <b>${product.consultationFee}</b>
                            </span>
                          ) : (
                            <span />
                          )}
                          <span className="dp-btn">View Profile →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
