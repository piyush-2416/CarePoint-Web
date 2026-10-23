import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../Components/Navbar";
const API = "http://localhost:3000/api/documents";

// Image frontend ke public folder me rakho: public/documents-banner.jpg
const HERO_IMG = "/Medical_Documents.png";

const CATEGORIES = [
  "Prescription",
  "Lab Report",
  "Scan / X-Ray",
  "Insurance",
  "Bill / Receipt",
  "Other",
];

function fileIcon(mime = "") {
  if (mime.includes("pdf")) return "📕";
  if (mime.startsWith("image/")) return "🖼️";
  if (mime.includes("word")) return "📝";
  if (mime.includes("sheet") || mime.includes("excel")) return "📊";
  return "📄";
}

function formatSize(bytes) {
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Is page ka poora CSS yahin hai (Tailwind / global CSS par depend nahi).
// Sab classes "docs-" se shuru hoti hain, isliye baaki pages ko affect nahi karengi.
const CSS = `
.docs-page, .docs-page *, .docs-page *::before, .docs-page *::after { box-sizing: border-box; }
.docs-page {
  --bg: #eaf9f9; --cyan: #45d2d2; --cyan-bright: #17c8c8;
  --deep: #0b6b6b; --deep-dark: #095555; --ink: #053d3d; --ink-soft: #0a5f5f; --field: #f4fcfc;
  display: block; width: 100%; min-height: 100vh; align-self: stretch;
  background: var(--bg); color: var(--ink);
  text-align: left; font-size: 16px; line-height: 1.5;
}
.docs-page :where(h1, h2, p, ul) { margin: 0; padding: 0; }
.docs-page :where(ul) { list-style: none; }

/* ---------- Layout container ---------- */
.docs-wrap { width: 100%; max-width: 1024px; margin: 0 auto; padding: 0 16px; }

/* ---------- Buttons ---------- */
.docs-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px 24px; border: 2px solid transparent; border-radius: 999px;
  font: inherit; font-weight: 600; text-decoration: none; cursor: pointer;
  transition: background-color .2s ease;
}
.docs-btn-solid { background: var(--cyan-bright); color: #fff; }
.docs-btn-solid:hover { background: #12b0b0; }
.docs-btn-outline { background: transparent; border-color: var(--cyan-bright); color: #fff; }
.docs-btn-outline:hover { background: rgba(255,255,255,.12); }
.docs-btn-deep { background: var(--deep); color: #fff; }
.docs-btn-deep:hover { background: var(--deep-dark); }
.docs-btn:disabled { opacity: .6; cursor: not-allowed; }
.docs-btn:focus-visible, .docs-chip:focus-visible, .docs-sbtn:focus-visible {
  outline: 3px solid var(--deep); outline-offset: 2px;
}

/* ---------- Hero ---------- */
.docs-hero {
  padding: 64px 0 128px; text-align: center; color: #fff;
  background-color: var(--deep); background-size: cover; background-position: center;
}
.docs-hero .docs-wrap { display: flex; flex-direction: column; align-items: center; }
.docs-hero h1 { font-size: 2.25rem; font-weight: 600; line-height: 1.15; }
.docs-hero h1 span { color: var(--cyan-bright); }
.docs-hero-sub { margin-top: 12px; font-size: 1.125rem; color: rgba(255,255,255,.92); }
.docs-ecg { display: flex; align-items: center; gap: 8px; margin-top: 20px; }
.docs-ecg i { display: block; width: 64px; height: 1px; background: var(--cyan-bright); }
.docs-hero-text { max-width: 560px; margin-top: 20px; font-size: .9rem; color: rgba(255,255,255,.85); }
.docs-hero-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 32px; }

/* ---------- Main content ---------- */
.docs-main { position: relative; z-index: 1; margin: -80px auto 0; padding-bottom: 64px; }

.docs-card {
  background: #fff; border: 1px solid rgba(69,210,210,.4); border-radius: 16px;
  box-shadow: 0 1px 3px rgba(5,61,61,.08);
}

/* ---------- Upload form ---------- */
.docs-form { padding: 20px; scroll-margin-top: 96px; box-shadow: 0 10px 30px rgba(5,61,61,.15); }
.docs-h2 { font-size: 1.25rem; font-weight: 700; line-height: 1.3; }
.docs-form-sub { margin-top: 4px; font-size: .875rem; color: var(--ink-soft); }

.docs-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 24px; }
.docs-span2 { grid-column: 1 / -1; }
.docs-label { display: block; margin-bottom: 6px; font-size: .875rem; font-weight: 600; text-align: left; }
.docs-label small { font-size: .875rem; font-weight: 400; color: var(--ink-soft); }

.docs-field {
  display: block; width: 100%; padding: 12px 16px;
  border: 1px solid rgba(69,210,210,.7); border-radius: 12px;
  background: var(--field); color: var(--ink); font: inherit; outline: none;
}
.docs-field::placeholder { color: rgba(10,95,95,.6); }
.docs-field:focus { border-color: var(--deep); box-shadow: 0 0 0 3px rgba(69,210,210,.4); }
textarea.docs-field { resize: vertical; min-height: 88px; }

.docs-drop {
  position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; padding: 32px 16px; text-align: center; cursor: pointer;
  border: 2px dashed var(--cyan); border-radius: 12px; background: var(--field);
  transition: background-color .2s ease;
}
.docs-drop:hover { background: rgba(69,210,210,.1); }
.docs-drop.has-file { border-color: var(--deep); background: rgba(69,210,210,.1); }
.docs-drop:focus-within { box-shadow: 0 0 0 3px rgba(69,210,210,.5); }
.docs-drop input {
  position: absolute; width: 1px; height: 1px; overflow: hidden;
  clip: rect(0 0 0 0); white-space: nowrap; opacity: 0;
}
.docs-drop-icon { display: block; font-size: 1.875rem; line-height: 1.2; }
.docs-drop-name { display: block; max-width: 100%; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.docs-drop-hint { display: block; font-size: .75rem; color: var(--ink-soft); }

.docs-error { margin-top: 20px; padding: 12px 16px; border-radius: 12px; background: #fef2f2; color: #b91c1c; font-size: .875rem; }
.docs-form-actions { display: flex; margin-top: 24px; }
.docs-form-actions .docs-btn { width: 100%; padding: 12px 32px; }

/* ---------- Saved files ---------- */
.docs-files { margin-top: 48px; scroll-margin-top: 96px; }
.docs-files-head { display: flex; flex-direction: column; gap: 4px; }
.docs-count { font-size: .875rem; color: var(--ink-soft); }

.docs-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.docs-chip {
  padding: 6px 16px; border: 1px solid var(--cyan); border-radius: 999px;
  background: #fff; color: var(--ink); font: inherit; font-size: .875rem; font-weight: 600; cursor: pointer;
  transition: background-color .2s ease;
}
.docs-chip:hover { background: rgba(69,210,210,.3); }
.docs-chip.active { background: var(--deep); border-color: var(--deep); color: #fff; }

.docs-list { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 24px; }
.docs-item { display: flex; flex-direction: column; padding: 20px; }
.docs-item-head { display: flex; align-items: flex-start; gap: 12px; }
.docs-icon {
  flex: 0 0 48px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
  border-radius: 50%; background: rgba(69,210,210,.3); font-size: 1.5rem;
}
.docs-item-info { min-width: 0; flex: 1; }
.docs-item-title, .docs-fname { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.docs-item-title { font-weight: 600; }
.docs-meta { margin-top: 2px; font-size: .75rem; color: var(--ink-soft); }
.docs-fname { margin-top: 2px; font-size: .75rem; color: #6b7280; }
.docs-badge {
  align-self: flex-start; margin-top: 16px; padding: 4px 12px; border-radius: 999px;
  background: rgba(69,210,210,.25); font-size: .75rem; font-weight: 600;
}
.docs-notes {
  margin-top: 12px; font-size: .875rem; color: #374151;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.docs-item-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: auto; padding-top: 20px; }
.docs-sbtn {
  display: block; padding: 8px 0; border: 0; border-radius: 999px; text-align: center; text-decoration: none;
  font: inherit; font-size: .875rem; font-weight: 600; cursor: pointer; transition: background-color .2s ease;
}
.docs-sbtn-view { background: rgba(69,210,210,.3); color: var(--ink); }
.docs-sbtn-view:hover { background: rgba(69,210,210,.6); }
.docs-sbtn-dl { background: var(--deep); color: #fff; }
.docs-sbtn-dl:hover { background: var(--deep-dark); }
.docs-sbtn-del { background: #fee2e2; color: #b91c1c; }
.docs-sbtn-del:hover { background: #fecaca; }

.docs-empty {
  margin-top: 24px; padding: 48px 24px; text-align: center;
  border: 2px dashed var(--cyan); border-radius: 16px; background: rgba(255,255,255,.6);
}
.docs-empty-icon { font-size: 2.25rem; line-height: 1.2; }
.docs-empty-title { margin-top: 12px; font-weight: 600; }
.docs-empty-text { margin-top: 4px; font-size: .875rem; color: var(--ink-soft); }
.docs-loading { margin-top: 24px; color: var(--ink-soft); }

/* ---------- Tablet / desktop ---------- */
@media (min-width: 640px) {
  .docs-wrap { padding: 0 24px; }
  .docs-hero { padding: 96px 0 160px; }
  .docs-hero h1 { font-size: 3.75rem; }
  .docs-hero-sub { font-size: 1.5rem; }
  .docs-hero-text { font-size: 1rem; }
  .docs-ecg i { width: 112px; }
  .docs-form { padding: 32px; }
  .docs-h2 { font-size: 1.5rem; }
  .docs-form-actions { justify-content: flex-end; }
  .docs-form-actions .docs-btn { width: auto; }
  .docs-files-head { flex-direction: row; justify-content: space-between; align-items: flex-end; }
}
@media (min-width: 768px) {
  .docs-grid { grid-template-columns: 1fr 1fr; }
  .docs-list { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1024px) {
  .docs-wrap { padding: 0 32px; }
}
@media (prefers-reduced-motion: reduce) {
  .docs-btn, .docs-chip, .docs-sbtn, .docs-drop { transition: none; }
}
`;

function Documents() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [fileKey, setFileKey] = useState(0); // file input ko reset karne ke liye

  // Saare documents lao
  const loadDocs = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error();
      setDocs(await res.json());
    } catch {
      setError("Could not load documents. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
  }, []);

  // Upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) return setError("Please enter a title.");
    if (!file) return setError("Please choose a file to upload.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("notes", notes);
    formData.append("file", file);

    try {
      setSaving(true);
      const res = await fetch(API, { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed.");

      setDocs([data, ...docs]);
      setTitle("");
      setNotes("");
      setFile(null);
      setCategory(CATEGORIES[0]);
      setFileKey((k) => k + 1);
      setFilter("All");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document? This cannot be undone.")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setDocs(docs.filter((d) => d._id !== id));
    } catch {
      setError("Could not delete the document. Please try again.");
    }
  };

  const shown = filter === "All" ? docs : docs.filter((d) => d.category === filter);
  const totalSize = useMemo(
    () => shown.reduce((sum, d) => sum + (d.fileSize || 0), 0),
    [shown]
  );

  return (

    <div className="docs-page">
      <style>{CSS}</style>
<Navbar/>
      {/* ================= HERO ================= */}
      <section
        className="docs-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(5,61,61,0.55), rgba(5,61,61,0.85)), url(${HERO_IMG})`,
        }}
      >
        <div className="docs-wrap">
          <h1>
            My <span>Documents</span>
          </h1>
          <p className="docs-hero-sub">Your health records, always with you</p>

          <div className="docs-ecg" aria-hidden="true">
            <i />
            <svg width="28" height="18" viewBox="0 0 28 18" fill="none" stroke="#17c8c8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 9h6l2-6 4 12 3-9 2 3h9" />
            </svg>
            <i />
          </div>

          <p className="docs-hero-text">
            Keep prescriptions, lab reports, scans and bills in one place, so you
            can find them whenever you need them.
          </p>

          <div className="docs-hero-actions">
            <button type="button" className="docs-btn docs-btn-solid" onClick={() => scrollToId("upload-section")}>
              <span aria-hidden="true">⬆️</span> Upload document
            </button>
            <button type="button" className="docs-btn-outline docs-btn" onClick={() => scrollToId("files-section")}>
              <span aria-hidden="true">📁</span> My files
            </button>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="docs-wrap docs-main">
        {/* ---------- Upload form ---------- */}
        <form id="upload-section" className="docs-card docs-form" onSubmit={handleSubmit}>
          <h2 className="docs-h2">Add a document</h2>
          <p className="docs-form-sub">Give it a clear title so it is easy to find later.</p>

          <div className="docs-grid">
            <div>
              <label htmlFor="doc-title" className="docs-label">Title</label>
              <input
                id="doc-title"
                type="text"
                className="docs-field"
                placeholder="e.g. Blood test, March"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="doc-category" className="docs-label">Category</label>
              <select
                id="doc-category"
                className="docs-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="docs-span2">
              <label htmlFor="doc-notes" className="docs-label">
                Notes <small>(optional)</small>
              </label>
              <textarea
                id="doc-notes"
                rows={3}
                className="docs-field"
                placeholder="Anything worth remembering, e.g. doctor name or test result"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="docs-span2">
              <span className="docs-label">File</span>
              <label htmlFor="doc-file" className={`docs-drop ${file ? "has-file" : ""}`}>
                <input
                  key={fileKey}
                  id="doc-file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0] || null)}
                />
                <span className="docs-drop-icon" aria-hidden="true">
                  {file ? fileIcon(file.type) : "⬆️"}
                </span>
                <span className="docs-drop-name">
                  {file ? file.name : "Choose a file to upload"}
                </span>
                <span className="docs-drop-hint">
                  {file ? formatSize(file.size) : "Files up to 10 MB"}
                </span>
              </label>
            </div>
          </div>

          {error && <p className="docs-error" role="alert">{error}</p>}

          <div className="docs-form-actions">
            <button type="submit" className="docs-btn docs-btn-deep" disabled={saving}>
              {saving ? "Uploading..." : "Upload document"}
            </button>
          </div>
        </form>

        {/* ---------- Saved files ---------- */}
        <section id="files-section" className="docs-files">
          <div className="docs-files-head">
            <h2 className="docs-h2">Saved files</h2>
            <p className="docs-count">
              {shown.length} {shown.length === 1 ? "document" : "documents"}
              {shown.length > 0 && ` · ${formatSize(totalSize)}`}
            </p>
          </div>

          <div className="docs-chips" role="group" aria-label="Filter by category">
            {["All", ...CATEGORIES].map((c) => (
              <button
                key={c}
                type="button"
                className={`docs-chip ${filter === c ? "active" : ""}`}
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="docs-loading">Loading your documents...</p>
          ) : shown.length === 0 ? (
            <div className="docs-empty">
              <p className="docs-empty-icon" aria-hidden="true">📂</p>
              <p className="docs-empty-title">
                {filter === "All" ? "No documents yet" : `No documents in ${filter}`}
              </p>
              <p className="docs-empty-text">
                {filter === "All"
                  ? "Use the form above to upload your first document."
                  : "Try another category or upload a new document."}
              </p>
            </div>
          ) : (
            <ul className="docs-list">
              {shown.map((d) => (
                <li key={d._id} className="docs-card docs-item">
                  <div className="docs-item-head">
                    <span className="docs-icon" aria-hidden="true">{fileIcon(d.mimeType)}</span>
                    <div className="docs-item-info">
                      <p className="docs-item-title" title={d.title}>{d.title}</p>
                      <p className="docs-meta">
                        {formatDate(d.createdAt)} · {formatSize(d.fileSize)}
                      </p>
                      <p className="docs-fname" title={d.originalName}>{d.originalName}</p>
                    </div>
                  </div>

                  <span className="docs-badge">{d.category}</span>
                  {d.notes && <p className="docs-notes">{d.notes}</p>}

                  <div className="docs-item-actions">
                    <a
                      className="docs-sbtn docs-sbtn-view"
                      href={`${API}/${d._id}/file`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                    <a className="docs-sbtn docs-sbtn-dl" href={`${API}/${d._id}/file?download=true`}>
                      Download
                    </a>
                    <button
                      type="button"
                      className="docs-sbtn docs-sbtn-del"
                      onClick={() => handleDelete(d._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default Documents;
