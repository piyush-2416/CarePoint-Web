import React, { useEffect, useMemo, useState } from "react";

/* ---------------------------- DATA ---------------------------- */
const TIPS = [
  {
    id: 1, category: "Nutrition", icon: "🥗", readTime: "4 min",
    title: "Build a Balanced Plate",
    description: "Include vegetables, fruits, whole grains and protein in your daily meals.",
    details: [
      "Fill half your plate with vegetables and fruits, and the rest with grains and protein (dal, eggs, paneer, chickpeas).",
      "Choose roti, oats or brown rice instead of refined flour and heavily fried foods.",
      "Instead of 3 large meals, you can also have several smaller meals through the day.",
    ],
  },
  {
    id: 2, category: "Nutrition", icon: "🧂", readTime: "3 min",
    title: "Cut Down on Salt and Sugar",
    description: "Too much salt can raise BP, and too much sugar is bad for blood sugar.",
    details: [
      "Stop adding extra salt on top of your food.",
      "Watch out for hidden salt in packaged snacks, pickles and papad.",
      "Choose fruit or coconut water instead of cold drinks and sweets.",
    ],
  },
  {
    id: 3, category: "Fitness", icon: "🏃", readTime: "3 min",
    title: "Walk a Little Every Day",
    description: "Light daily activity is good for your energy, mood and heart health.",
    details: [
      "For most people, a brisk 30-minute walk each day is a good start.",
      "If 30 minutes at a stretch is hard, split it into three 10-minute walks.",
      "Ask your doctor before starting exercise after surgery or an illness.",
    ],
  },
  {
    id: 4, category: "Fitness", icon: "🧘", readTime: "4 min",
    title: "Stretching and Balance",
    description: "Gentle stretching lowers the risk of falls in older adults and people in recovery.",
    details: [
      "Spend 5-10 minutes each morning gently stretching your neck, shoulders and legs.",
      "To practise balance, stand on one foot for a few seconds near something you can hold.",
      "Stop immediately if you feel pain or dizziness.",
    ],
  },
  {
    id: 5, category: "Sleep", icon: "😴", readTime: "5 min",
    title: "A Better Sleep Routine",
    description: "Sleeping and waking at the same time every day keeps your body clock healthy.",
    details: [
      "Try to switch off your phone and TV 1 hour before bed.",
      "Keep your room dark, quiet and slightly cool.",
      "Avoid tea, coffee and heavy meals at night.",
    ],
  },
  {
    id: 6, category: "Mental Health", icon: "🧠", readTime: "4 min",
    title: "Coping with Stress",
    description: "Worry during a long illness is normal. Talking to loved ones helps.",
    details: [
      "Share your worries with someone you trust instead of carrying them alone.",
      "Practise deep breathing for 5 minutes a day (see the Breathing tool below).",
      "If you feel very low or anxious, meet a counsellor or doctor. Tele-MANAS helpline: 14416.",
    ],
  },
  {
    id: 7, category: "Chronic Care", icon: "🩸", readTime: "5 min",
    title: "For People with Diabetes",
    description: "Regular sugar checks and meals on time help keep it under control.",
    details: [
      "Check your sugar at the times your doctor advised and note it in a diary.",
      "Do not skip meals, especially while you are on medicine.",
      "Look at your feet every day. Show a doctor if you see a wound or blister.",
    ],
  },
  {
    id: 8, category: "Chronic Care", icon: "❤️", readTime: "5 min",
    title: "BP and Heart Care",
    description: "Never stop your BP medicine on your own, even if you feel fine.",
    details: [
      "Measure your BP at the same time each day while sitting calmly, and note the reading.",
      "If you have chest pain, shortness of breath or sweating, call 108 immediately.",
      "Always change medicines only on your doctor's advice.",
    ],
  },
  {
    id: 9, category: "Medicine Safety", icon: "💊", readTime: "4 min",
    title: "Take Your Medicines Correctly",
    description: "The right medicine, at the right time, in the right amount is the key to treatment.",
    details: [
      "Keep a list of all your medicines (name and timing) in one place.",
      "Check the expiry dates of your medicines from time to time.",
      "Never take medicines prescribed for someone else, and never change medicines without asking.",
    ],
  },
  {
    id: 10, category: "Medicine Safety", icon: "📋", readTime: "3 min",
    title: "Be Prepared for Your Doctor Visit",
    description: "Bringing your questions and reports makes the visit far more useful.",
    details: [
      "Write down your symptoms, when they started and how severe they are, and carry the note.",
      "Keep old reports and prescriptions in one place using CarePoint's Document Wallet.",
      "If you do not understand something the doctor says, do not hesitate to ask again.",
    ],
  },
  {
    id: 11, category: "Chronic Care", icon: "🫁", readTime: "4 min",
    title: "Asthma / Breathing Trouble",
    description: "It is important to avoid triggers such as dust, smoke and cold weather.",
    details: [
      "Always carry your inhaler and keep checking its expiry date.",
      "Wear a mask when you go out on high-pollution days.",
      "If breathlessness is severe or you cannot speak, do not wait. Call 108.",
    ],
  },
  {
    id: 12, category: "Nutrition", icon: "💧", readTime: "2 min",
    title: "Keep Drinking Water",
    description: "Drinking too little water can cause tiredness, headaches and constipation.",
    details: [
      "Try to drink about 7-8 glasses of water a day.",
      "With kidney or heart disease, ask your doctor how much water is right for you.",
      "Use the Water Tracker below to keep count.",
    ],
  },
];

const CATEGORIES = ["All", "Nutrition", "Fitness", "Sleep", "Mental Health", "Chronic Care", "Medicine Safety"];

const RANGES = [
  { name: "Blood Pressure", val: "Below 120/80 mmHg", note: "While at rest" },
  { name: "Sugar (fasting)", val: "70 - 99 mg/dL", note: "After 8 hours without food" },
  { name: "Pulse (at rest)", val: "60 - 100 / min", note: "In adults" },
  { name: "Oxygen (SpO2)", val: "95% - 100%", note: "Tell a doctor if below 94%" },
  { name: "Body Temperature", val: "36.5 - 37.5 °C", note: "Fever: above 38 °C" },
];

const BREATH = [
  { t: "Breathe in", s: 4, scale: 1.3 },
  { t: "Hold your breath", s: 4, scale: 1.3 },
  { t: "Breathe out", s: 6, scale: 0.8 },
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
    if (v < 18.5) { label = "Underweight"; tone = "warn"; }
    else if (v >= 30) { label = "Obese"; tone = "bad"; }
    else if (v >= 25) { label = "Overweight"; tone = "warn"; }
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
          <div className="hp-sub">Small daily habits, big health gains. Read the tips and try the tools below.</div>
        </div>

        {/* ---------- Tip of the day ---------- */}
        <div className="hp-day">
          <div className="hp-day-ic">{tipOfDay.icon}</div>
          <div className="hp-day-body">
            <div className="hp-day-tag">TIP OF THE DAY</div>
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
                <div className="hp-tool-sub">Today: {water}/{GOAL} glasses</div>
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
              {water >= GOAL ? "Well done! You reached today's goal." : "Click a glass to increase your count."}
              {" "}People with kidney or heart disease should follow the amount their doctor advised.
            </div>
          </div>

          {/* BMI */}
          <div className="hp-tool">
            <div className="hp-tool-head">
              <span className="hp-tool-ic">⚖️</span>
              <div>
                <div className="hp-tool-title">BMI Calculator</div>
                <div className="hp-tool-sub">Enter your height and weight</div>
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
              <div className="hp-bmi idle">Your result will appear here</div>
            )}
            <div className="hp-note">This is only a rough estimate, not a diagnosis. Children, pregnant women and older adults should ask a doctor.</div>
          </div>

          {/* Breathing */}
          <div className="hp-tool">
            <div className="hp-tool-head">
              <span className="hp-tool-ic">🌬️</span>
              <div>
                <div className="hp-tool-title">Breathing Exercise</div>
                <div className="hp-tool-sub">4 - 4 - 6 deep breathing</div>
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
            <div className="hp-breath-txt">{running ? BREATH[phase].t : "Sit comfortably and begin"}</div>
            <button type="button" className="hp-btn" onClick={toggleBreath}>
              {running ? "Stop" : "Start"}
            </button>
            <div className="hp-note">Stop if you feel dizzy or short of breath.</div>
          </div>
        </div>

        {/* ---------- Normal ranges ---------- */}
        <div className="hp-card">
          <div className="hp-card-title">📏 Normal Ranges (a rough guide for adults)</div>
          <div className="hp-ranges">
            {RANGES.map((r) => (
              <div className="hp-range" key={r.name}>
                <div className="hp-range-name">{r.name}</div>
                <div className="hp-range-val">{r.val}</div>
                <div className="hp-range-note">{r.note}</div>
              </div>
            ))}
          </div>
          <div className="hp-note">If your doctor gave you a different target, follow that one.</div>
        </div>

        {/* ---------- Explore tips ---------- */}
        <div className="hp-explore">
          <div className="hp-h2">Explore Health Tips</div>

          <div className="hp-bar-row">
            <input
              className="hp-in hp-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍  Search tips (e.g. sugar, sleep, medicine)"
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
                        aria-label={isSaved ? "Remove from saved" : "Save"}
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
                        {isOpen ? "Show less ↑" : "Read →"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="hp-empty">
              <div style={{ fontSize: 32 }}>🔍</div>
              <div className="hp-tip-title" style={{ marginTop: 6 }}>No tips found</div>
              <div className="hp-tip-desc">Try a different keyword or category.</div>
            </div>
          )}
        </div>

        {/* ---------- Disclaimer ---------- */}
        <div className="hp-disclaimer">
          ⚠️ This information is for general awareness only and is not medical advice. Always check with your doctor before
          changing any medicine or treatment. In an emergency, call <b>112</b> or <b>108</b> immediately.
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
