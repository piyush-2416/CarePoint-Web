import React, { useEffect, useMemo, useState } from "react";

/* ---------------------------- DATA ---------------------------- */
const TIPS = [
  {
    id: 1, category: "Nutrition", icon: "🥗", readTime: "4 min",
    title: "Build a Balanced Plate",
    description: "Sabzi, fruits, whole grains aur protein ko rozana ke khaane mein shamil karo.",
    details: [
      "Aadhi plate sabzi aur fruits se bharo, baaki mein anaaj aur protein (dal, anda, paneer, chana).",
      "Maida aur zyada tale hue khaane ki jagah roti, daliya ya brown rice chuno.",
      "Din mein 3 bade meal ki jagah chhote-chhote meal bhi le sakte ho.",
    ],
  },
  {
    id: 2, category: "Nutrition", icon: "🧂", readTime: "3 min",
    title: "Namak aur Cheeni Kam Karo",
    description: "Zyada namak BP badha sakta hai aur zyada cheeni sugar ke liye theek nahi.",
    details: [
      "Khaane mein upar se namak daalne ki aadat chhodo.",
      "Packaged snacks, achaar aur papad mein chhupa namak dhyan mein rakho.",
      "Cold drink aur mithai ki jagah fruit ya nariyal paani lo.",
    ],
  },
  {
    id: 3, category: "Fitness", icon: "🏃", readTime: "3 min",
    title: "Roz Thoda Chalo",
    description: "Rozana halki physical activity energy, mood aur dil ki sehat ke liye achhi hai.",
    details: [
      "Din mein 30 minute tez chalna zyadatar logon ke liye achha shuruaat hai.",
      "Ek saath 30 minute na ho to 10-10 minute ke teen hisse karo.",
      "Surgery ya bimari ke baad exercise shuru karne se pehle doctor se poochho.",
    ],
  },
  {
    id: 4, category: "Fitness", icon: "🧘", readTime: "4 min",
    title: "Stretching aur Balance",
    description: "Bujurgon aur recovery wale mareezon ke liye halka stretching girne ka khatra kam karta hai.",
    details: [
      "Subah 5-10 minute gardan, kandhe aur pairon ka halka stretch karo.",
      "Balance ke liye kisi sahare ke paas ek pair par kuch second khade ho.",
      "Dard ya chakkar aaye to turant ruk jao.",
    ],
  },
  {
    id: 5, category: "Sleep", icon: "😴", readTime: "5 min",
    title: "Behtar Neend ka Routine",
    description: "Roz ek hi samay par sona aur uthna body ki clock theek rakhta hai.",
    details: [
      "Sone se 1 ghanta pehle mobile aur TV band karne ki koshish karo.",
      "Kamra andhera, shaant aur thoda thanda rakho.",
      "Raat ko chai-coffee aur bhaari khaana avoid karo.",
    ],
  },
  {
    id: 6, category: "Mental Health", icon: "🧠", readTime: "4 min",
    title: "Tanav se Nipatna",
    description: "Lambi bimari mein chinta hona normal hai. Apno se baat karna madad karta hai.",
    details: [
      "Apni pareshani kisi bharose ke insaan ko batao, akele mat jhelo.",
      "Roz 5 minute gehri saans ka abhyas (neeche Breathing tool dekho) kaam aata hai.",
      "Bahut udaasi ya darr lage to counsellor ya doctor se milo. Tele-MANAS helpline: 14416.",
    ],
  },
  {
    id: 7, category: "Chronic Care", icon: "🩸", readTime: "5 min",
    title: "Diabetes ke Mareez",
    description: "Sugar ki regular jaanch aur samay par khaana control mein madad karte hain.",
    details: [
      "Doctor ke bataye samay par sugar check karo aur diary mein likho.",
      "Khaana skip mat karo, khaaskar jab dawai chal rahi ho.",
      "Pairon ko roz dekho. Ghaav ya chhala ho to doctor ko dikhao.",
    ],
  },
  {
    id: 8, category: "Chronic Care", icon: "❤️", readTime: "5 min",
    title: "BP aur Dil ki Dekhbhal",
    description: "BP ki dawai kabhi apne aap band mat karo, chahe tabiyat theek lage.",
    details: [
      "Ek hi samay par, aaram se baithkar BP naapo aur reading likho.",
      "Seene mein dard, saans phoolna ya pasina aaye to turant 108 par call karo.",
      "Dawai mein badlav hamesha doctor ki salah se hi karo.",
    ],
  },
  {
    id: 9, category: "Medicine Safety", icon: "💊", readTime: "4 min",
    title: "Dawai Sahi Tarah Lo",
    description: "Sahi dawai, sahi samay par, sahi matra mein, yahi ilaaj ki kunji hai.",
    details: [
      "Saari dawaiyon ki list (naam aur samay) ek jagah likh kar rakho.",
      "Dawai ki expiry date samay samay par check karo.",
      "Kisi aur ki prescription ki dawai mat lo, aur bina poochhe dawai mat badlo.",
    ],
  },
  {
    id: 10, category: "Medicine Safety", icon: "📋", readTime: "3 min",
    title: "Doctor ke paas Taiyari se Jao",
    description: "Sawal aur reports saath le jaoge to visit zyada kaam ki hogi.",
    details: [
      "Apne lakshan, kab se hain aur kitne, likh kar le jao.",
      "Purani reports aur prescriptions CarePoint ke Document Wallet mein ek jagah rakho.",
      "Doctor ki baat samajh na aaye to dobara poochhne mein jhijhko mat.",
    ],
  },
  {
    id: 11, category: "Chronic Care", icon: "🫁", readTime: "4 min",
    title: "Asthma / Saans ki Takleef",
    description: "Dhool, dhuan aur thande mausam ke trigger se bachna zaroori hai.",
    details: [
      "Inhaler hamesha saath rakho aur expiry check karte raho.",
      "Pollution wale din bahar jaate waqt mask lagao.",
      "Saans bahut phoole ya bolne mein dikkat ho to der mat karo, 108 par call karo.",
    ],
  },
  {
    id: 12, category: "Nutrition", icon: "💧", readTime: "2 min",
    title: "Paani Peete Raho",
    description: "Paani kam peene se thakan, sar dard aur kabz ho sakti hai.",
    details: [
      "Din mein lagbhag 7-8 glass paani peene ki koshish karo.",
      "Kidney ya dil ki bimari mein paani ki matra doctor se poochh kar tay karo.",
      "Neeche wale Water Tracker se apna count rakho.",
    ],
  },
];

const CATEGORIES = ["All", "Nutrition", "Fitness", "Sleep", "Mental Health", "Chronic Care", "Medicine Safety"];

const RANGES = [
  { name: "Blood Pressure", val: "120/80 mmHg se kam", note: "Aaram ki halat mein" },
  { name: "Sugar (fasting)", val: "70 - 99 mg/dL", note: "8 ghante khaali pet" },
  { name: "Pulse (aaram mein)", val: "60 - 100 / min", note: "Bade logon mein" },
  { name: "Oxygen (SpO2)", val: "95% - 100%", note: "94% se kam ho to doctor ko batao" },
  { name: "Body Temperature", val: "36.5 - 37.5 °C", note: "Bukhaar: 38 °C se upar" },
];

const BREATH = [
  { t: "Saans andar lo", s: 4, scale: 1.3 },
  { t: "Rok kar rakho", s: 4, scale: 1.3 },
  { t: "Saans bahar chhodo", s: 6, scale: 0.8 },
];

/* ---------------------------- helpers ---------------------------- */
const todayKey = () => new Date().toISOString().slice(0, 10);
const safeGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const safeSet = (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } };

/* ---------------------------- component ---------------------------- */
export default function HealthTips() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);
  const [onlySaved, setOnlySaved] = useState(false);
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(safeGet("cp_saved_tips") || "[]"); } catch { return []; }
  });

  // water
  const GOAL = 8;
  const [water, setWater] = useState(() => {
    const raw = safeGet("cp_water");
    try {
      const d = JSON.parse(raw || "{}");
      return d.day === todayKey() ? d.count || 0 : 0;
    } catch { return 0; }
  });

  // bmi
  const [h, setH] = useState("");
  const [w, setW] = useState("");

  // breathing
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(BREATH[0].s);

  useEffect(() => safeSet("cp_saved_tips", JSON.stringify(saved)), [saved]);
  useEffect(() => safeSet("cp_water", JSON.stringify({ day: todayKey(), count: water })), [water]);

  useEffect(() => {
    if (!running) return undefined;
    setCount(BREATH[phase].s);
    const tick = setInterval(() => setCount((c) => Math.max(c - 1, 1)), 1000);
    const next = setTimeout(() => setPhase((p) => (p + 1) % BREATH.length), BREATH[phase].s * 1000);
    return () => { clearInterval(tick); clearTimeout(next); };
  }, [running, phase]);

  const toggleBreath = () => { setPhase(0); setCount(BREATH[0].s); setRunning((r) => !r); };

  const tipOfDay = useMemo(() => {
    const day = Math.floor(Date.now() / 86400000);
    return TIPS[day % TIPS.length];
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TIPS.filter((t) => {
      const c = active === "All" || t.category === active;
      const s = !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      const sv = !onlySaved || saved.includes(t.id);
      return c && s && sv;
    });
  }, [active, search, onlySaved, saved]);

  const toggleSave = (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const bmi = useMemo(() => {
    const hm = Number(h) / 100;
    const wk = Number(w);
    if (!hm || !wk || hm < 0.5 || hm > 2.5 || wk < 10 || wk > 400) return null;
    const v = wk / (hm * hm);
    let label = "Normal", tone = "ok";
    if (v < 18.5) { label = "Kam vajan"; tone = "warn"; }
    else if (v >= 30) { label = "Motapa"; tone = "bad"; }
    else if (v >= 25) { label = "Zyada vajan"; tone = "warn"; }
    return { v: v.toFixed(1), label, tone };
  }, [h, w]);

  return (
    <section className="hp">
      <style>{css}</style>

      <div className="hp-wrap">
        {/* ---------- Header ---------- */}
        <div className="hp-head">
          <div className="hp-eyebrow">HEALTH &amp; WELLNESS</div>
          <div className="hp-h1">Patient Health Tips &amp; Tools</div>
          <div className="hp-sub">Roz ki chhoti aadatein, badi sehat. Tips padho aur neeche ke tools aajmao.</div>
        </div>

        {/* ---------- Tip of the day ---------- */}
        <div className="hp-day">
          <div className="hp-day-ic">{tipOfDay.icon}</div>
          <div className="hp-day-body">
            <div className="hp-day-tag">AAJ KI TIP</div>
            <div className="hp-day-title">{tipOfDay.title}</div>
            <div className="hp-day-text">{tipOfDay.description}</div>
          </div>
        </div>

        {/* ---------- Tools ---------- */}
        <div className="hp-tools">
          {/* Water */}
          <div className="hp-tool">
            <div className="hp-tool-head">
              <span className="hp-tool-ic">💧</span>
              <div>
                <div className="hp-tool-title">Water Tracker</div>
                <div className="hp-tool-sub">Aaj: {water}/{GOAL} glass</div>
              </div>
            </div>
            <div className="hp-glasses">
              {Array.from({ length: GOAL }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Glass ${i + 1}`}
                  className={`hp-glass ${i < water ? "on" : ""}`}
                  onClick={() => setWater(i + 1 === water ? i : i + 1)}
                >
                  💧
                </button>
              ))}
            </div>
            <div className="hp-bar"><div style={{ width: `${(water / GOAL) * 100}%` }} /></div>
            <div className="hp-note">
              {water >= GOAL ? "Shabash! Aaj ka goal poora hua." : "Glass par click karke count badhao."}
              {" "}Kidney/dil ke mareez doctor ki batayi matra follow karein.
            </div>
          </div>

          {/* BMI */}
          <div className="hp-tool">
            <div className="hp-tool-head">
              <span className="hp-tool-ic">⚖️</span>
              <div>
                <div className="hp-tool-title">BMI Calculator</div>
                <div className="hp-tool-sub">Height aur weight daalo</div>
              </div>
            </div>
            <div className="hp-inputs">
              <label className="hp-lab">
                Height (cm)
                <input className="hp-in" type="number" inputMode="numeric" value={h} onChange={(e) => setH(e.target.value)} placeholder="165" />
              </label>
              <label className="hp-lab">
                Weight (kg)
                <input className="hp-in" type="number" inputMode="numeric" value={w} onChange={(e) => setW(e.target.value)} placeholder="60" />
              </label>
            </div>
            {bmi ? (
              <div className={`hp-bmi ${bmi.tone}`}>
                <span className="hp-bmi-n">{bmi.v}</span>
                <span className="hp-bmi-l">{bmi.label}</span>
              </div>
            ) : (
              <div className="hp-bmi idle">Result yahan dikhega</div>
            )}
            <div className="hp-note">Ye sirf ek mota andaza hai, diagnosis nahi. Bachche, garbhwati aur bujurg doctor se poochhein.</div>
          </div>

          {/* Breathing */}
          <div className="hp-tool">
            <div className="hp-tool-head">
              <span className="hp-tool-ic">🌬️</span>
              <div>
                <div className="hp-tool-title">Breathing Exercise</div>
                <div className="hp-tool-sub">4 - 4 - 6 gehri saans</div>
              </div>
            </div>
            <div className="hp-breath-box">
              <div
                className="hp-breath-circle"
                style={{
                  transform: `scale(${running ? BREATH[phase].scale : 1})`,
                  transitionDuration: `${running ? BREATH[phase].s : 0.4}s`,
                }}
              >
                {running ? count : "🙂"}
              </div>
            </div>
            <div className="hp-breath-txt">{running ? BREATH[phase].t : "Aaram se baitho aur shuru karo"}</div>
            <button type="button" className="hp-btn" onClick={toggleBreath}>
              {running ? "Roko" : "Shuru karo"}
            </button>
            <div className="hp-note">Chakkar ya saans phoole to ruk jao.</div>
          </div>
        </div>

        {/* ---------- Normal ranges ---------- */}
        <div className="hp-card">
          <div className="hp-card-title">📏 Normal Ranges (bade logon ke liye mota guide)</div>
          <div className="hp-ranges">
            {RANGES.map((r) => (
              <div className="hp-range" key={r.name}>
                <div className="hp-range-name">{r.name}</div>
                <div className="hp-range-val">{r.val}</div>
                <div className="hp-range-note">{r.note}</div>
              </div>
            ))}
          </div>
          <div className="hp-note">Aapke doctor ne alag target diya ho to wahi follow karo.</div>
        </div>

        {/* ---------- Explore tips ---------- */}
        <div className="hp-explore">
          <div className="hp-h2">Explore Health Tips</div>

          <div className="hp-bar-row">
            <input
              className="hp-in hp-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍  Tips dhundo (jaise: sugar, neend, dawai)"
            />
            <button
              type="button"
              className={`hp-chip ${onlySaved ? "on" : ""}`}
              onClick={() => setOnlySaved((s) => !s)}
            >
              🔖 Saved ({saved.length})
            </button>
          </div>

          <div className="hp-chips">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`hp-chip ${active === c ? "on" : ""}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="hp-grid">
              {filtered.map((t) => {
                const isOpen = open === t.id;
                const isSaved = saved.includes(t.id);
                return (
                  <article className="hp-tip" key={t.id}>
                    <div className="hp-tip-top">
                      <span className="hp-tip-ic">{t.icon}</span>
                      <span className="hp-tip-cat">{t.category}</span>
                      <button
                        type="button"
                        className={`hp-save ${isSaved ? "on" : ""}`}
                        onClick={() => toggleSave(t.id)}
                        aria-label={isSaved ? "Saved hata do" : "Save karo"}
                      >
                        {isSaved ? "★" : "☆"}
                      </button>
                    </div>
                    <div className="hp-tip-title">{t.title}</div>
                    <div className="hp-tip-desc">{t.description}</div>

                    {isOpen && (
                      <ul className="hp-tip-list">
                        {t.details.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    )}

                    <div className="hp-tip-foot">
                      <span>◷ {t.readTime} read</span>
                      <button type="button" className="hp-link" onClick={() => setOpen(isOpen ? null : t.id)}>
                        {isOpen ? "Kam dikhao ↑" : "Read →"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="hp-empty">
              <div style={{ fontSize: 32 }}>🔍</div>
              <div className="hp-tip-title" style={{ marginTop: 6 }}>Koi tip nahi mili</div>
              <div className="hp-tip-desc">Doosra keyword ya category try karo.</div>
            </div>
          )}
        </div>

        {/* ---------- Disclaimer ---------- */}
        <div className="hp-disclaimer">
          ⚠️ Ye jaankari sirf general jagrukta ke liye hai, doctor ki salah nahi. Dawai ya ilaaj mein badlav apne doctor se
          poochh kar hi karo. Emergency mein turant <b>112</b> ya <b>108</b> par call karo.
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- styles ---------------------------- */
const css = `
.hp,.hp *{box-sizing:border-box;margin:0;padding:0;text-align:left;letter-spacing:normal}
.hp{--g:#059669;--gd:#047857;--ink:#0f172a;--mut:#64748b;--line:#e2e8f0;--tint:#ecfdf5;
  width:100%;padding:36px 16px;color:var(--ink);font-family:inherit}
.hp button{font:inherit;cursor:pointer;border:0;background:none;color:inherit}
.hp-wrap{max-width:1100px;margin:0 auto;display:flex;flex-direction:column;gap:22px}

.hp-head{text-align:center}
.hp-head *{text-align:center}
.hp-eyebrow{font-size:12px;font-weight:700;letter-spacing:.18em;color:var(--g)}
.hp-h1{margin-top:6px;font-size:clamp(24px,4vw,34px);font-weight:800;line-height:1.2}
.hp-sub{margin-top:8px;font-size:14px;color:var(--mut);max-width:560px;margin-inline:auto;line-height:1.6}

.hp-day{display:flex;gap:16px;align-items:center;padding:18px 20px;border-radius:18px;
  background:linear-gradient(120deg,#ecfdf5,#f0fdfa);border:1px solid #a7f3d0}
.hp-day-ic{flex:none;width:56px;height:56px;border-radius:16px;background:#fff;display:grid;place-items:center;font-size:28px;box-shadow:0 2px 8px rgba(5,150,105,.12)}
.hp-day-tag{font-size:11px;font-weight:800;letter-spacing:.14em;color:var(--g)}
.hp-day-title{margin-top:2px;font-size:18px;font-weight:700}
.hp-day-text{margin-top:3px;font-size:14px;color:#475569;line-height:1.5}

.hp-tools{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.hp-tool,.hp-card{background:#fff;border:1px solid var(--line);border-radius:18px;padding:18px;box-shadow:0 1px 3px rgba(15,23,42,.05);display:flex;flex-direction:column;gap:12px}
.hp-tool-head{display:flex;align-items:center;gap:12px}
.hp-tool-ic{width:42px;height:42px;border-radius:12px;background:var(--tint);display:grid;place-items:center;font-size:20px;flex:none}
.hp-tool-title,.hp-card-title{font-size:15px;font-weight:700}
.hp-tool-sub{font-size:12px;color:var(--mut);margin-top:1px}
.hp-note{font-size:11.5px;color:#94a3b8;line-height:1.5}

.hp-glasses{display:grid;grid-template-columns:repeat(8,1fr);gap:5px}
.hp-glass{aspect-ratio:1/1.2;border-radius:8px;border:1.5px solid var(--line);background:#f8fafc;font-size:14px;filter:grayscale(1);opacity:.5;transition:all .15s}
.hp-glass.on{filter:none;opacity:1;background:#e0f2fe;border-color:#7dd3fc}
.hp-bar{height:8px;border-radius:99px;background:#e2e8f0;overflow:hidden}
.hp-bar>div{height:100%;background:linear-gradient(90deg,#38bdf8,#10b981);border-radius:99px;transition:width .3s}

.hp-inputs{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.hp-lab{display:flex;flex-direction:column;gap:5px;font-size:12px;font-weight:600;color:#475569}
.hp-in{width:100%;height:42px;padding:0 12px;border:1.5px solid var(--line);border-radius:12px;background:#f8fafc;font:inherit;font-size:14px;color:var(--ink);outline:0;transition:border-color .15s,box-shadow .15s}
.hp-in:focus{border-color:var(--g);background:#fff;box-shadow:0 0 0 3px rgba(5,150,105,.15)}
.hp-bmi{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-radius:12px;font-weight:700}
.hp-bmi.idle{background:#f1f5f9;color:#94a3b8;font-weight:500;font-size:13px;justify-content:center}
.hp-bmi.ok{background:#dcfce7;color:#166534}
.hp-bmi.warn{background:#fef3c7;color:#92400e}
.hp-bmi.bad{background:#ffe4e6;color:#9f1239}
.hp-bmi-n{font-size:24px}
.hp-bmi-l{font-size:14px}

.hp-breath-box{height:130px;display:grid;place-items:center}
.hp-breath-circle{width:84px;height:84px;border-radius:50%;display:grid;place-items:center;font-size:26px;font-weight:800;color:#fff;
  background:radial-gradient(circle at 30% 30%,#34d399,#059669);transition-property:transform;transition-timing-function:ease-in-out;box-shadow:0 8px 20px rgba(5,150,105,.3)}
.hp-breath-txt{text-align:center;font-size:14px;font-weight:600;color:var(--gd)}
.hp-btn{padding:10px 16px;border-radius:99px;background:var(--g);color:#fff;font-weight:700;font-size:14px;text-align:center;transition:background .15s}
.hp-btn:hover{background:var(--gd)}

.hp-ranges{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.hp-range{padding:12px;border-radius:12px;background:#f8fafc;border:1px solid #eef2f6}
.hp-range-name{font-size:12px;font-weight:600;color:var(--mut)}
.hp-range-val{margin-top:4px;font-size:14px;font-weight:700;color:var(--gd)}
.hp-range-note{margin-top:3px;font-size:11px;color:#94a3b8;line-height:1.4}

.hp-explore{display:flex;flex-direction:column;gap:14px;margin-top:6px}
.hp-h2{font-size:22px;font-weight:800}
.hp-bar-row{display:flex;gap:10px}
.hp-search{flex:1}
.hp-chips{display:flex;flex-wrap:wrap;gap:8px}
.hp-chip{padding:8px 14px;border-radius:99px;border:1.5px solid var(--line);background:#fff;font-size:13px;font-weight:600;color:#475569;white-space:nowrap;transition:all .15s}
.hp-chip:hover{border-color:var(--g);color:var(--gd)}
.hp-chip.on{background:var(--g);border-color:var(--g);color:#fff}

.hp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.hp-tip{background:#fff;border:1px solid var(--line);border-radius:18px;padding:18px;display:flex;flex-direction:column;gap:8px;transition:border-color .15s,box-shadow .15s}
.hp-tip:hover{border-color:#6ee7b7;box-shadow:0 6px 18px rgba(5,150,105,.1)}
.hp-tip-top{display:flex;align-items:center;gap:8px}
.hp-tip-ic{width:40px;height:40px;border-radius:12px;background:var(--tint);display:grid;place-items:center;font-size:20px}
.hp-tip-cat{flex:1;font-size:11px;font-weight:700;color:var(--gd);background:var(--tint);padding:3px 10px;border-radius:99px;width:fit-content;flex:none}
.hp-save{margin-left:auto;font-size:20px;color:#cbd5e1;line-height:1}
.hp-save.on{color:#f59e0b}
.hp-tip-title{font-size:16px;font-weight:700;line-height:1.3}
.hp-tip-desc{font-size:13.5px;color:#475569;line-height:1.6}
.hp-tip-list{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:12px;background:#f8fafc;list-style:none}
.hp-tip-list li{position:relative;padding-left:16px;font-size:13px;color:#334155;line-height:1.55}
.hp-tip-list li::before{content:"";position:absolute;left:2px;top:.6em;width:6px;height:6px;border-radius:50%;background:var(--g)}
.hp-tip-foot{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:8px;font-size:12px;color:#94a3b8}
.hp-link{font-size:13px;font-weight:700;color:var(--g)}
.hp-link:hover{color:var(--gd)}
.hp-empty{text-align:center;padding:36px 12px;border:1.5px dashed var(--line);border-radius:18px}
.hp-empty *{text-align:center}

.hp-disclaimer{padding:14px 16px;border-radius:14px;background:#fffbeb;border:1px solid #fde68a;color:#92400e;font-size:12.5px;line-height:1.6}

@media(max-width:960px){
  .hp-tools{grid-template-columns:1fr}
  .hp-grid{grid-template-columns:1fr 1fr}
  .hp-ranges{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:600px){
  .hp{padding:24px 12px}
  .hp-grid{grid-template-columns:1fr}
  .hp-bar-row{flex-direction:column}
  .hp-day{padding:14px}
  .hp-day-ic{width:46px;height:46px;font-size:22px}
  .hp-chips{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px}
}
@media(prefers-reduced-motion:reduce){.hp-breath-circle,.hp-bar>div{transition:none!important}}
`;
