import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Navbar from "../Components/Navbar";
import Avatar from "../Components/Avatar";
import { useAuth } from "../context/AuthContext";
import { daysSince, greeting, joinedLabel, useCountUp } from "../utils/ui";
// import "../styles/patients.css";
 
function StatCard({ icon, label, value, hint, tone, delay }) {
  const n = useCountUp(value);
  return (
    <div
      className="cp-stat cp-rise"
      style={{ "--tone": tone, animationDelay: `${delay}ms` }}
    >
      <div className="cp-stat-top">
        <span>{label}</span>
        <span>{icon}</span>
      </div>
      <p className="cp-stat-num">{n}</p>
      <p className="cp-stat-hint">{hint}</p>
    </div>
  );
}

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("new");
  const [view, setView] = useState("grid");
  const { user } = useAuth();
  const [profileDone, setProfileDone] = useState(true);

  useEffect(() => {
    api
      .get("/doctor/profile")
      .then((res) => setProfileDone(!!res.data.isProfileComplete))
      .catch(() => {});
  }, []);
  useEffect(() => {
    api
      .get("/patients")
      .then((res) => setPatients(res.data))
      .catch((e) =>
        setError(e.response?.data?.message || "Patients load nahi ho paaye"),
      )
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const byNew = [...patients].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    return {
      total: patients.length,
      week: patients.filter((p) => daysSince(p.createdAt) < 7).length,
      month: patients.filter((p) => daysSince(p.createdAt) < 30).length,
      latest: byNew[0],
      recent: byNew.slice(0, 5),
    };
  }, [patients]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? patients.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.email.toLowerCase().includes(q),
        )
      : [...patients];
    list.sort((a, b) =>
      sort === "az"
        ? a.name.localeCompare(b.name)
        : sort === "old"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt),
    );
    return list;
  }, [patients, query, sort]);

  return (
    <>
      <Navbar />
      <div className="cp-page">
        <div className="cp-wrap">
          {/* Header */}
          <header className="cp-head cp-rise">
            <div>
              <p className="cp-hello">
                <span className="cp-dot" />
                {greeting()}, Dr. {user?.name}
              </p>
              {!profileDone && (
                <Link
                  to="/doctor/profile"
                  className="block bg-amber-50 mb-4 p-3 border border-amber-200 rounded-lg text-amber-800 text-sm"
                >
                  ⚠️ Aapki profile adhuri hai, patients aapko nahi dekh paa
                  rahe. Yahan poori karo →
                </Link>
              )}
              <h1 className="cp-h1">🧑‍⚕️ Meri Patients List</h1>
              <p className="cp-sub">
                Kisi bhi patient par click karke unke emergency contacts aur
                documents dekho
              </p>
            </div>
            <p className="cp-date">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </header>

          {/* Stats */}
          <section className="cp-stats">
            <StatCard
              icon="🧑‍⚕️"
              label="Total patients"
              value={stats.total}
              hint="Aapke saath linked"
              tone="#14b8a6"
              delay={60}
            />
            <StatCard
              icon="🆕"
              label="Is hafte naye"
              value={stats.week}
              hint="Last 7 din"
              tone="#10b981"
              delay={120}
            />
            <StatCard
              icon="📈"
              label="Is mahine naye"
              value={stats.month}
              hint="Last 30 din"
              tone="#0ea5e9"
              delay={180}
            />
            <div
              className="cp-stat accent cp-rise"
              style={{ animationDelay: "240ms" }}
            >
              <div className="cp-stat-top">
                <span>Sabse latest patient</span>
                <span>🩺</span>
              </div>
              {stats.latest ? (
                <Link to={`/patients/${stats.latest.id}`}>
                  <p className="cp-stat-name cp-trunc">{stats.latest.name}</p>
                  <p className="cp-stat-hint">
                    {joinedLabel(stats.latest.createdAt)}
                  </p>
                </Link>
              ) : (
                <p className="cp-stat-hint" style={{ marginTop: 8 }}>
                  Abhi koi patient nahi
                </p>
              )}
            </div>
          </section>

          {/* Recently joined */}
          {stats.recent.length > 0 && (
            <section
              className="cp-card cp-recent-card cp-rise"
              style={{ animationDelay: "300ms" }}
            >
              <h2 className="cp-card-title">Haal hi mein joined</h2>
              <div className="cp-recent">
                {stats.recent.map((p) => (
                  <Link key={p.id} to={`/patients/${p.id}`} className="cp-chip">
                    <Avatar name={p.name} size={38} radius={12} />
                    <div>
                      <b className="cp-trunc">{p.name}</b>
                      <small>{joinedLabel(p.createdAt)}</small>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Toolbar */}
          <div className="cp-bar cp-rise" style={{ animationDelay: "360ms" }}>
            <div className="cp-search">
              <span>🔎</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Naam ya email se dhundo..."
                aria-label="Search patients"
              />
            </div>
            <select
              className="cp-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort patients"
            >
              <option value="new">Newest pehle</option>
              <option value="old">Oldest pehle</option>
              <option value="az">Naam A–Z</option>
            </select>
            <div className="cp-toggle">
              {["grid", "list"].map((v) => (
                <button
                  key={v}
                  className={view === v ? "on" : ""}
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                >
                  {v === "grid" ? "▦ Grid" : "☰ List"}
                </button>
              ))}
            </div>
          </div>
          {!loading && !error && (
            <p className="cp-count">
              {filtered.length} patient{filtered.length === 1 ? "" : "s"} dikh
              rahe hain
            </p>
          )}

          {/* States */}
          {error && <div className="cp-error">{error}</div>}

          {loading && (
            <div className="cp-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="cp-skel cp-shimmer" />
              ))}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="cp-empty">
              <p className="cp-empty-ic">🗂️</p>
              <h3>Koi patient nahi mila</h3>
              <p>
                {query
                  ? "Doosra naam ya email try karo."
                  : "Jab patient aapko add karenge, wo yahan dikhenge."}
              </p>
              {query && (
                <button className="cp-btn teal" onClick={() => setQuery("")}>
                  Search clear karo
                </button>
              )}
            </div>
          )}

          {/* Patients */}
          {!loading && !error && filtered.length > 0 && (
            <div className={`cp-grid ${view === "list" ? "list" : ""}`}>
              {filtered.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/patients/${p.id}`}
                  className="cp-pcard cp-rise"
                  style={{ animationDelay: `${Math.min(i, 12) * 45}ms` }}
                >
                  <div className="cp-prow">
                    <Avatar name={p.name} />
                    <div className="cp-pinfo">
                      <p className="cp-pname">
                        <span className="cp-trunc">{p.name}</span>
                        {daysSince(p.createdAt) < 7 && (
                          <span className="cp-new">NEW</span>
                        )}
                      </p>
                      <p className="cp-pmail cp-trunc">{p.email}</p>
                    </div>
                    <span className="cp-arrow">→</span>
                  </div>
                  <div className="cp-pfoot">
                    <span>📅 {joinedLabel(p.createdAt)}</span>
                    <em>Profile kholo</em>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
