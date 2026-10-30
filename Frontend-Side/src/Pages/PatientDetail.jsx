import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import Navbar from "../Components/Navbar";
import Avatar from "../Components/Avatar";
import { daysSince, fileKind, fmtDate, fmtSize, useCountUp } from "../utils/ui";
// import "../styles/patients.css";

function Tile({ icon, label, value, text, bg, delay }) {
  const n = useCountUp(value ?? 0);
  return (
    <div className="cp-tile cp-rise" style={{ animationDelay: `${delay}ms` }}>
      <span className="cp-tile-ic" style={{ background: bg }}>{icon}</span>
      <p className="cp-tile-num">{text ?? n}</p>
      <p className="cp-tile-lbl">{label}</p>
    </div>
  );
}

function Loading() {
  return (
    <div className="cp-wrap">
      <div className="cp-shimmer" style={{ height: 170, borderRadius: 24, background: "#e2e8f0" }} />
      <div className="cp-tiles">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="cp-shimmer" style={{ height: 110, borderRadius: 16, background: "#e2e8f0" }} />
        ))}
      </div>
      <div className="cp-cols">
        <div className="cp-shimmer" style={{ height: 260, borderRadius: 16, background: "#e2e8f0" }} />
        <div className="cp-shimmer" style={{ height: 260, borderRadius: 16, background: "#e2e8f0" }} />
      </div>
    </div>
  );
}

export default function PatientDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [docQuery, setDocQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get(`/patients/${id}`)
      .then((res) => setData(res.data))
      .catch((e) =>
        setError(e.response?.status === 404 ? "Patient nahi mila" : "Patient load nahi ho paya")
      )
      .finally(() => setLoading(false));
  }, [id]);

  const documents = data?.documents ?? [];
  const relatives = data?.relatives ?? [];

  const totalSize = useMemo(() => documents.reduce((s, d) => s + (d.size || 0), 0), [documents]);
  const bloodGroups = useMemo(
    () => [...new Set(relatives.map((r) => r.bloodGroup).filter(Boolean))],
    [relatives]
  );
  const shownDocs = useMemo(() => {
    const q = docQuery.trim().toLowerCase();
    return q
      ? documents.filter((d) => (d.title || d.originalName || "").toLowerCase().includes(q))
      : documents;
  }, [documents, docQuery]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.patient.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <div className="cp-page"><Loading /></div>
      </>
    );

  if (error || !data)
    return (
      <>
        <Navbar />
        <div className="cp-page">
          <div className="cp-card cp-fail cp-rise">
            <p>😕 {error}</p>
            <Link to="/patients" className="cp-btn teal">← Saare patients</Link>
          </div>
        </div>
      </>
    );

  const { patient } = data;
  const fileUrl = (docId) => `${api.defaults.baseURL}/patients/${id}/documents/${docId}/file`;

  return (
    <>
      <Navbar />
      <div className="cp-page">
        <div className="cp-wrap">
          <Link to="/patients" className="cp-back cp-rise">← Back to patients</Link>

          {/* Hero */}
          <section className="cp-hero cp-rise" style={{ animationDelay: "60ms" }}>
            <div className="cp-hero-in">
              <Avatar name={patient.name} size={84} radius={24} ring />
              <div className="cp-hero-info">
                <h1 className="cp-trunc">{patient.name}</h1>
                <p className="cp-hero-mail cp-trunc">✉️ {patient.email}</p>
                <div className="cp-pills">
                  <span className="cp-pill">📅 Joined {fmtDate(patient.createdAt)}</span>
                  <span className="cp-pill">⏳ {daysSince(patient.createdAt)} din se aapke saath</span>
                </div>
              </div>
              <div className="cp-hero-actions">
                <button className="cp-btn glass" onClick={copyEmail}>
                  {copied ? "✓ Copied" : "Email copy"}
                </button>
                <a className="cp-btn white" href={`mailto:${patient.email}`}>Email bhejo</a>
              </div>
            </div>
          </section>

          {/* Quick stats */}
          <section className="cp-tiles">
            <Tile icon="🚨" label="Emergency contacts" value={relatives.length} bg="#fef2f2" delay={120} />
            <Tile icon="📂" label="Documents" value={documents.length} bg="#f0f9ff" delay={170} />
            <Tile icon="💾" label="Total storage" text={fmtSize(totalSize) || "0 KB"} bg="#f5f3ff" delay={220} />
            <Tile icon="🩸" label="Blood groups (contacts)" value={bloodGroups.length} bg="#fff1f2" delay={270} />
          </section>

          <div className="cp-cols">
            {/* Emergency contacts */}
            <section className="cp-card cp-rise" style={{ animationDelay: "320ms" }}>
              <div className="cp-sec-head">
                <h2 className="cp-sec-title">
                  <span className="cp-sec-ic cp-sos" style={{ background: "#fef2f2" }}>🚨</span>
                  Emergency contacts
                </h2>
                <span className="cp-count-pill">{relatives.length}</span>
              </div>

              {bloodGroups.length > 0 && (
                <div className="cp-bloods">
                  {bloodGroups.map((b) => <span key={b}>🩸 {b}</span>)}
                </div>
              )}

              {relatives.length === 0 ? (
                <div className="cp-empty sm">
                  <p className="cp-empty-ic">👥</p>
                  <h3>Koi contact add nahi hai</h3>
                  <p>Patient jab emergency contact add karega, yahan dikhega.</p>
                </div>
              ) : (
                <ul className="cp-list">
                  {relatives.map((r, i) => (
                    <li key={r._id} className="cp-item cp-rise" style={{ animationDelay: `${380 + i * 60}ms` }}>
                      <Avatar name={r.name} size={40} radius={12} />
                      <div className="cp-item-main">
                        <p className="cp-item-name cp-trunc">{r.name}</p>
                        <div className="cp-item-meta">
                          <span>{r.relation || "Relative"}</span>
                          {r.bloodGroup && <span className="cp-blood">{r.bloodGroup}</span>}
                        </div>
                      </div>
                      {r.phone && (
                        <a className="cp-btn teal" href={`tel:${r.phone}`}>📞 {r.phone}</a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Documents */}
            <section className="cp-card cp-rise" style={{ animationDelay: "380ms" }}>
              <div className="cp-sec-head">
                <h2 className="cp-sec-title">
                  <span className="cp-sec-ic" style={{ background: "#f0f9ff" }}>📂</span>
                  Documents
                </h2>
                <span className="cp-count-pill">{documents.length}</span>
              </div>

              {documents.length > 3 && (
                <input
                  className="cp-doc-search"
                  type="text"
                  value={docQuery}
                  onChange={(e) => setDocQuery(e.target.value)}
                  placeholder="Document dhundo..."
                  aria-label="Search documents"
                />
              )}

              {documents.length === 0 ? (
                <div className="cp-empty sm">
                  <p className="cp-empty-ic">🗃️</p>
                  <h3>Koi document upload nahi hua</h3>
                  <p>Reports ya prescriptions upload hone par yahan dikhenge.</p>
                </div>
              ) : shownDocs.length === 0 ? (
                <p className="cp-note">Is naam ka koi document nahi mila.</p>
              ) : (
                <ul className="cp-list">
                  {shownDocs.map((d, i) => {
                    const k = fileKind(d.originalName);
                    return (
                      <li key={d._id} className="cp-item cp-rise" style={{ animationDelay: `${440 + i * 60}ms` }}>
                        <span className="cp-ftype" style={{ background: k.bg, color: k.color }}>{k.label}</span>
                        <div className="cp-item-main">
                          <p className="cp-item-name cp-trunc">{d.title || d.originalName}</p>
                          <div className="cp-item-meta">
                            <span>{fmtDate(d.createdAt)}</span>
                            {fmtSize(d.size) && <span>· {fmtSize(d.size)}</span>}
                          </div>
                        </div>
                        <a className="cp-btn teal" href={fileUrl(d._id)} target="_blank" rel="noreferrer">
                          Dekho
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}