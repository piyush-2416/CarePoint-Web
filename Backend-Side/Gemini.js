import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config(); // needed here too because of import order

// The model name keeps changing: set GEMINI_MODEL in .env
const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

// ---------- small helpers ----------
const arr = (v) => (Array.isArray(v) ? v : []);
const str = (v) => (typeof v === "string" ? v.trim() : "");
const strs = (v) => arr(v).map(str).filter(Boolean);

// Always shown if the AI returns no red flags
const DEFAULT_RED_FLAGS = [
  "Severe chest pain or pressure",
  "Severe difficulty breathing",
  "Fainting, seizure or trouble speaking",
  "Heavy bleeding",
  "Sudden weakness or dizziness that does not settle",
];

// ---------- Clean Gemini's JSON into the shape the frontend expects ----------
function normalizePlan(raw) {
  const plan = {
    overview: str(raw.overview),

    risks: arr(raw.risks)
      .map((r) => {
        const level = str(r.level).toLowerCase();
        return {
          name: str(r.name),
          level: ["low", "medium", "high"].includes(level) ? level : "medium",
          why: str(r.why),
          warningSigns: strs(r.warningSigns),
          prepare: strs(r.prepare),
        };
      })
      .filter((r) => r.name),

    redFlags: strs(raw.redFlags),

    // item id = "<category index>-<item index>", e.g. "0-1" (progress is saved using this)
    checklist: arr(raw.checklist)
      .map((c) => ({ category: str(c.category), items: strs(c.items) }))
      .filter((c) => c.category && c.items.length)
      .map((c, ci) => ({
        category: c.category,
        items: c.items.map((text, ii) => ({ id: `${ci}-${ii}`, text })),
      })),

    roles: arr(raw.roles)
      .map((r) => ({ role: str(r.role), responsibility: str(r.responsibility) }))
      .filter((r) => r.role),

    communicationPlan: str(raw.communicationPlan),

    hospitalPlan: {
      whereToGo: str(raw.hospitalPlan?.whereToGo),
      steps: strs(raw.hospitalPlan?.steps),
    },

    routine: arr(raw.routine)
      .map((d) => ({ name: str(d.name), frequency: str(d.frequency), how: str(d.how) }))
      .filter((d) => d.name),

    careSupport: strs(raw.careSupport),
    contactsToCollect: strs(raw.contactsToCollect),
  };

  if (!plan.checklist.length) throw new Error("Gemini did not return a checklist");
  if (!plan.redFlags.length) plan.redFlags = DEFAULT_RED_FLAGS;
  return plan;
}

// ---------- General plan if Gemini is down / fails ----------
function fallbackPlan(p) {
  const withIds = (cats) =>
    cats.map((c, ci) => ({
      category: c.category,
      items: c.items.map((text, ii) => ({ id: `${ci}-${ii}`, text })),
    }));

  const riskNames = p.emergencyRisks.length
    ? p.emergencyRisks
    : p.conditions.map((c) => `Emergencies related to ${c}`);

  return {
    overview: `A general emergency preparedness plan for ${p.name}. This is not a replacement for a doctor's advice, so please confirm it with your doctor once.`,
    risks: riskNames.map((r) => ({
      name: r,
      level: "medium",
      why: "It is important to prepare in advance for this situation.",
      warningSigns: ["Sudden worsening of health", "Symptoms that look different from usual"],
      prepare: [
        "Tell family or the caretaker about this risk",
        "Ask the doctor what to do in such a case and keep it written down",
      ],
    })),
    redFlags: DEFAULT_RED_FLAGS,
    checklist: withIds([
      {
        category: "Medicines and reports",
        items: [
          "Write a list of all medicines (name and timing) in one place",
          "Keep at least 7 days of medicine stock",
          "Keep copies of the doctor's prescription and old reports",
          "Fix a date to refill medicines before they run out",
        ],
      },
      {
        category: "Emergency readiness",
        items: [
          "Keep the emergency contact list on both phone and paper",
          "Know the route and travel time to the nearest hospital",
          "Keep the phone charged at all times",
          "Keep ID and insurance papers in one place",
        ],
      },
      {
        category: "Home safety",
        items: [
          "Remove loose wires and clutter from walking paths",
          "Keep grab bars or support in the bathroom and on stairs",
          "Keep lighting available at night",
        ],
      },
    ]),
    roles: [
      { role: "Patient", responsibility: "Take medicines on time and tell someone as soon as health worsens" },
      { role: "Family / caretaker", responsibility: "Check in daily and call 108 immediately in an emergency" },
      { role: "Doctor / hospital", responsibility: "Provide treatment and follow-up advice" },
    ],
    communicationPlan:
      "Choose two or three trusted people as emergency contacts and share the patient's condition and medicines with them. In an emergency call 112 (all), 108 (ambulance), 100 (police) or 101 (fire).",
    hospitalPlan: {
      whereToGo: "The nearest hospital that has the patient's records (decide this in advance)",
      steps: [
        "Call 108 for an ambulance and tell them the patient's location",
        "Carry the medicine list, reports and ID",
        "A family member should accompany the patient",
      ],
    },
    routine: [
      {
        name: "Medicine and stock check",
        frequency: "Every week",
        how: "Match the stock against the medicine list and order more in advance if it is running low.",
      },
      {
        name: "Emergency drill",
        frequency: "Once a month",
        how: "Practice who to call in an emergency and what to take along.",
      },
    ],
    careSupport: p.careNeeds.map(
      (g) => `${g}: assign one person who is always available to help`
    ),
    contactsToCollect: [
      "The patient's doctor's number",
      "Nearest hospital and ambulance numbers",
      "Numbers of two trusted family members or neighbours",
      "Medical store number",
    ],
  };
}

// ---------- Call Gemini ----------
async function askGemini(p) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not set");
  const ai = new GoogleGenAI({ apiKey: key });

  const prompt = `
You are a patient safety and emergency preparedness assistant. Create a practical emergency care plan for the patient below.
Language: simple, clear English. Return only JSON, with no extra text or markdown.

Patient: ${p.name}, ${p.age} years old
Living situation: ${p.livingSituation}
Location: ${p.location || "Not provided"}
Conditions: ${p.conditions.join(", ") || "None provided"}
Emergency concerns: ${p.emergencyRisks.join(", ") || "None provided"}
Help needed: ${p.careNeeds.join(", ") || "None provided"}
Available resources: ${p.resources.join(", ") || "None provided"}
Extra notes: ${p.notes || "None"}

The JSON shape must be exactly:
{
  "overview": "2-3 line summary",
  "risks": [{ "name": "", "level": "low|medium|high", "why": "", "warningSigns": ["", ""], "prepare": ["", ""] }],
  "redFlags": ["", ""],
  "checklist": [{ "category": "", "items": ["", ""] }],
  "roles": [{ "role": "", "responsibility": "" }],
  "communicationPlan": "who to contact and how in an emergency, 3-4 lines",
  "hospitalPlan": { "whereToGo": "", "steps": ["", ""] },
  "routine": [{ "name": "", "frequency": "", "how": "" }],
  "careSupport": ["", ""],
  "contactsToCollect": ["", ""]
}

Important rules:
- You are not a doctor. Do not give any diagnosis.
- Do not suggest medicine names, doses or timing, and never tell the patient to stop or change a medicine. For medicine questions write "ask your doctor".
- In "risks" include only the emergency risks listed above (if none were given, use risks related to the conditions). One entry for each.
- In "redFlags" write 4 to 6 symptoms for which 108 / 112 should be called immediately (based on the patient's conditions).
- Do NOT invent any phone number, address, hospital, doctor or company name.
- You may only write these emergency numbers: 112, 100, 101, 108.
- Keep the patient's age and "help needed" in mind (for example, if elderly or has trouble walking, focus on fall prevention).
- Use 3 to 5 checklist sections, with 3 to 6 items in each section.
`.trim();

  const call = ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: { responseMimeType: "application/json", temperature: 0.4 },
  });
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Gemini timeout")), 45000)
  );

  const response = await Promise.race([call, timeout]);
  const text = (response.text || "").replace(/```json|```/g, "").trim();
  return normalizePlan(JSON.parse(text));
}

// ---------- The route uses this function ----------
export async function generatePlan(input) {
  try {
    return { plan: await askGemini(input), fallback: false };
  } catch (err) {
    console.error("Gemini failed, using the fallback plan:", err.message);
    return { plan: fallbackPlan(input), fallback: true };
  }
}
