import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import Navbar from "../Components/Navbar";
// import "./Relativeslist.css";

const STORAGE_KEY = "eventora_Relativeslist";

const DEFAULT_MSG =
  "Main Emergency main hu and  i need your help so please help me.";

// "+91 98765-43210", "09876543210" -> "9876543210" (invalid ho to null)
const cleanPhone = (raw) => {
  const digits = String(raw ?? "").replace(/\D/g, "");
  const last10 = digits.slice(-10);
  return /^[6-9]\d{9}$/.test(last10) ? last10 : null;
};

// CSV ke header ka naam kuch bhi ho (Name / Full Name, Phone / Mobile / Number...)
const pick = (row, keys) => {
  for (const k of Object.keys(row)) {
    const key = k.trim().toLowerCase();
    if (keys.some((x) => key.includes(x))) return row[k];
  }
  return "";
};

// crypto.randomUUID sirf secure context (https / localhost) mein chalta hai
const uid = () =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const STATUS_LABEL = { pending: "Pending", yes: "Aayega", no: "Nahi aayega" };

const initials = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// Refresh par list na ude, isliye sirf is browser mein save hoti hai (server par nahi)
const loadSaved = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

export default function Relativeslist() {
  const [Relativess, setRelativess] = useState(loadSaved);
  const [message, setMessage] = useState(DEFAULT_MSG);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Relativess));
    } catch {
      /* storage na chale to bhi page kaam karta rahe */
    }
  }, [Relativess]);

  // ---- CSV upload ----
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // same file dobara chun sako
    if (!file) return;
    setError("");
    setNotice("");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const seen = new Set(Relativess.map((g) => g.phone));
        const added = [];
        let invalid = 0;
        let duplicates = 0;

        for (const row of res.data) {
          const name = String(pick(row, ["name", "naam"])).trim();
          const phone = cleanPhone(
            pick(row, ["phone", "mobile", "number", "contact"])
          );
          if (!name || !phone) {
            invalid++;
            continue;
          }
          if (seen.has(phone)) {
            duplicates++;
            continue;
          }
          seen.add(phone);
          added.push({ id: uid(), name, phone, status: "pending" });
        }

        if (added.length === 0) {
          setError(
            "Koi naya valid Relatives nahi mila. Columns ke naam 'name' aur 'phone' rakho."
          );
          return;
        }

        setRelativess((g) => [...g, ...added]);
        setNotice(
          `${added.length} Relativess add hue` +
            (duplicates ? `, ${duplicates} pehle se the` : "") +
            (invalid
              ? `, ${invalid} rows galat ya khali number ki wajah se skip hui`
              : "") +
            "."
        );
      },
      error: () => setError("File padh nahi paye. Sahi CSV upload karo."),
    });
  };

  const changeStatus = (id, status) =>
    setRelativess((g) => g.map((x) => (x.id === id ? { ...x, status } : x)));

  const removeRelatives = (id) => setRelativess((g) => g.filter((x) => x.id !== id));

  const clearAll = () => {
    if (!window.confirm("Poori Relatives list hata dein? Ye wapas nahi aayegi."))
      return;
    setRelativess([]);
    setNotice("");
  };

  const downloadSample = () => {
    const csv =
      "name,phone\nRahul Sharma,9876543210\nPriya Verma,+91 98765 43211\n";
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "Relativess-sample.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---- counts + filtered list ----
  const counts = useMemo(() => {
    const c = { total: Relativess.length, yes: 0, no: 0, pending: 0 };
    Relativess.forEach((g) => {
      if (c[g.status] !== undefined) c[g.status]++;
    });
    return c;
  }, [Relativess]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return Relativess.filter(
      (g) =>
        (filter === "all" || g.status === filter) &&
        (!q || g.name.toLowerCase().includes(q) || g.phone.includes(q))
    );
  }, [Relativess, search, filter]);

  const stats = [
    { label: "Aayenge", value: counts.yes, color: "#10b981" },
    { label: "Nahi aayenge", value: counts.no, color: "#f43f5e" },
    { label: "Pending", value: counts.pending, color: "#fbbf24" },
  ];

  return (
    <div className="gl">
      <Navbar />

      {/* ---- Hero ---- */}
      <header className="gl-hero">
        <div className="gl-wrap">
          <h1 className="gl-title">
            Relatives <span>List</span>
          </h1>
          <p className="gl-sub">
            Apni CSV file upload karo, phir har Relatives ko call, SMS ya WhatsApp
            karo.
          </p>
        </div>
      </header>

      <main className="gl-main">
        {/* ---- Upload ---- */}
        <section className="gl-card">
          <div className="gl-drop">
            <label className="gl-upload-btn">
              CSV upload karo
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFile}
                hidden
              />
            </label>
            <button type="button" className="gl-link" onClick={downloadSample}>
              Sample CSV download karo
            </button>
          </div>
          <p className="gl-hint">
            File mein do columns rakho: <b>name</b> aur <b>phone</b>. Numbers
            kisi bhi format mein ho sakte hain (+91, spaces, dashes). Aapki list
            sirf aapke browser mein rehti hai, kisi server par nahi jaati.
          </p>
        </section>

        {/* ---- Messages ---- */}
        {error && (
          <div role="alert" className="gl-alert gl-alert--err">
            {error}
          </div>
        )}
        {notice && <div className="gl-alert gl-alert--ok">{notice}</div>}

        {/* ---- Stats ---- */}
        <section className="gl-stats">
          <div className="gl-stat gl-stat--total">
            <div className="gl-stat-label">Total</div>
            <strong>{counts.total}</strong>
          </div>
          {stats.map((s) => (
            <div key={s.label} className="gl-stat">
              <div className="gl-stat-label">
                <span className="gl-dot" style={{ background: s.color }} />
                {s.label}
              </div>
              <strong>{s.value}</strong>
            </div>
          ))}
        </section>

        {/* ---- WhatsApp message ---- */}
        <section className="gl-card gl-msg">
          <label>
            WhatsApp message (sabko yahi jayega)
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="gl-field"
            />
          </label>
        </section>

        {/* ---- Toolbar ---- */}
        <div className="gl-toolbar">
          <input
            type="search"
            placeholder="Naam ya number dhundo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="gl-field"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="gl-field"
          >
            <option value="all">Sab</option>
            <option value="pending">Pending</option>
            <option value="yes">Aayenge</option>
            <option value="no">Nahi aayenge</option>
          </select>
          {Relativess.length > 0 && (
            <button type="button" className="gl-danger" onClick={clearAll}>
              Poori list hatao
            </button>
          )}
        </div>

        {/* ---- List ---- */}
        {Relativess.length === 0 ? (
          <p className="gl-empty">
            Abhi koi Relatives nahi hai. Upar se CSV upload karo.
          </p>
        ) : visible.length === 0 ? (
          <p className="gl-empty">
            Is search ya filter se koi Relatives nahi mila.
          </p>
        ) : (
          <ul className="gl-list">
            {visible.map((g, i) => (
              <li key={g.id} className="gl-row">
                <div className="gl-person">
                  <div className={`gl-avatar gl-av-${i % 4}`}>
                    {initials(g.name)}
                  </div>
                  <div className="gl-info">
                    <b className="gl-name">{g.name}</b>
                    <span className="gl-phone">{g.phone}</span>
                  </div>
                </div>

                <div className="gl-actions">
                  <a className="gl-act" href={`tel:+91${g.phone}`}>
                    Call
                  </a>
                  <a className="gl-act" href={`sms:+91${g.phone}`}>
                    SMS
                  </a>
                  <a
                    className="gl-act gl-act--wa"
                    href={`https://wa.me/91${g.phone}?text=${encodeURIComponent(
                      message
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>

                <select
                  value={g.status}
                  onChange={(e) => changeStatus(g.id, e.target.value)}
                  aria-label={`${g.name} ka status`}
                  className={`gl-status gl-status--${g.status}`}
                >
                  {Object.entries(STATUS_LABEL).map(([v, label]) => (
                    <option key={v} value={v}>
                      {label}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="gl-remove"
                  onClick={() => removeRelatives(g.id)}
                  aria-label={`${g.name} ko hatao`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
