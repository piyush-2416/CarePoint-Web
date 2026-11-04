 import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config(); // import order ki wajah se yahan bhi zaroori hai

// Model ka naam badalta rehta hai: .env mein GEMINI_MODEL rakho
const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

// ---------- chhote helpers ----------
const arr = (v) => (Array.isArray(v) ? v : []);
const str = (v) => (typeof v === "string" ? v.trim() : "");
const strs = (v) => arr(v).map(str).filter(Boolean);

// AI ne red flags na diye to ye hamesha dikhenge
const DEFAULT_RED_FLAGS = [
  "Seene me tez dard ya dabaav",
  "Saans lene me bahut takleef",
  "Behoshi, daura ya bolne me dikkat",
  "Bahut zyada khoon behna",
  "Achanak kamzori ya chakkar jo theek na ho",
];

// ---------- Gemini ka JSON saaf karke frontend wale shape mein lao ----------
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

    // item id = "<category index>-<item index>", jaise "0-1" (progress save isi se hota hai)
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

  if (!plan.checklist.length) throw new Error("Gemini ne checklist nahi di");
  if (!plan.redFlags.length) plan.redFlags = DEFAULT_RED_FLAGS;
  return plan;
}

// ---------- Gemini band / fail ho to general plan ----------
function fallbackPlan(p) {
  const withIds = (cats) =>
    cats.map((c, ci) => ({
      category: c.category,
      items: c.items.map((text, ii) => ({ id: `${ci}-${ii}`, text })),
    }));

  const riskNames = p.emergencyRisks.length
    ? p.emergencyRisks
    : p.conditions.map((c) => `${c} se jude emergency`);

  return {
    overview: `${p.name} ke liye ek general emergency taiyari plan. Ye doctor ki salah ka replacement nahi hai, apne doctor se ek baar zaroor confirm karo.`,
    risks: riskNames.map((r) => ({
      name: r,
      level: "medium",
      why: "Is situation ke liye pehle se taiyari rakhna zaroori hai.",
      warningSigns: ["Achanak tabiyat bigadna", "Normal se alag lakshan dikhna"],
      prepare: [
        "Parivaar ya caretaker ko is risk ke baare mein batao",
        "Doctor se poochho ki aise me kya karna hai aur use likh kar rakho",
      ],
    })),
    redFlags: DEFAULT_RED_FLAGS,
    checklist: withIds([
      {
        category: "Dawai aur reports",
        items: [
          "Saari dawaiyon ki list (naam aur samay) ek jagah likho",
          "Kam se kam 7 din ka dawai ka stock rakho",
          "Doctor ki prescription aur purani reports ki copy rakho",
          "Dawai khatam hone se pehle refill ki tareekh tay karo",
        ],
      },
      {
        category: "Emergency taiyari",
        items: [
          "Emergency contacts ki list phone aur kagaz dono par rakho",
          "Nazdiki hospital ka raasta aur samay pata rakho",
          "Phone hamesha charged rakho",
          "ID aur insurance ke papers ek jagah rakho",
        ],
      },
      {
        category: "Ghar ki suraksha",
        items: [
          "Raste mein gire hue taar ya saamaan hatao",
          "Bathroom aur seedhiyon par madad ke liye pakad ya grip rakho",
          "Raat ko roshni ka intezaam rakho",
        ],
      },
    ]),
    roles: [
      { role: "Patient", responsibility: "Dawai samay par lena aur tabiyat bigadte hi kisi ko batana" },
      { role: "Parivaar / caretaker", responsibility: "Rozana haal poochna aur emergency mein turant 108 par call karna" },
      { role: "Doctor / hospital", responsibility: "Ilaaj aur follow-up ki salah dena" },
    ],
    communicationPlan:
      "Do-teen bharose ke logon ko emergency contact banao aur unhe patient ki bimari aur dawaiyon ki jaankari do. Emergency mein 112 (sab), 108 (ambulance), 100 (police), 101 (fire) par call karo.",
    hospitalPlan: {
      whereToGo: "Sabse nazdiki hospital jahan patient ke records hon (pehle se tay kar lo)",
      steps: [
        "Ambulance ke liye 108 par call karo aur patient ki jagah batao",
        "Dawaiyon ki list, reports aur ID saath le jao",
        "Ek parivaar ka sadasya patient ke saath jaye",
      ],
    },
    routine: [
      {
        name: "Dawai aur stock check",
        frequency: "Har hafte",
        how: "Dawaiyon ki list se milao aur stock kam ho to pehle se mangwa lo.",
      },
      {
        name: "Emergency drill",
        frequency: "Mahine mein 1 baar",
        how: "Ghar ke log practice karein ki emergency mein kisko call karna hai aur kya saath le jana hai.",
      },
    ],
    careSupport: p.careNeeds.map(
      (g) => `${g}: is ke liye ek insaan tay karo jo hamesha madad ke liye uplabdh ho`
    ),
    contactsToCollect: [
      "Patient ke doctor ka number",
      "Nazdiki hospital aur ambulance ka number",
      "Do bharose ke parivaar ya padosi ke number",
      "Medical store ka number",
    ],
  };
}

// ---------- Gemini ko call ----------
async function askGemini(p) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY set nahi hai");
  const ai = new GoogleGenAI({ apiKey: key });

  const prompt = `
Tum ek patient safety aur emergency preparedness assistant ho. Neeche diye gaye patient ke liye practical emergency care plan banao.
Bhasha: simple Hinglish. Sirf JSON do, koi extra text ya markdown nahi.

Patient: ${p.name}, ${p.age} saal
Rehne ki situation: ${p.livingSituation}
Jagah: ${p.location || "Nahi bataya"}
Bimariyan / conditions: ${p.conditions.join(", ") || "Koi nahi bataya"}
Emergency ka darr: ${p.emergencyRisks.join(", ") || "Koi nahi bataya"}
Madad chahiye: ${p.careNeeds.join(", ") || "Koi nahi bataya"}
Available resources: ${p.resources.join(", ") || "Koi nahi bataya"}
Extra baat: ${p.notes || "Koi nahi"}

JSON shape bilkul aisa ho:
{
  "overview": "2-3 line ka saransh",
  "risks": [{ "name": "", "level": "low|medium|high", "why": "", "warningSigns": ["", ""], "prepare": ["", ""] }],
  "redFlags": ["", ""],
  "checklist": [{ "category": "", "items": ["", ""] }],
  "roles": [{ "role": "", "responsibility": "" }],
  "communicationPlan": "emergency mein kisko aur kaise batayein, 3-4 line",
  "hospitalPlan": { "whereToGo": "", "steps": ["", ""] },
  "routine": [{ "name": "", "frequency": "", "how": "" }],
  "careSupport": ["", ""],
  "contactsToCollect": ["", ""]
}

Zaroori rules:
- Tum doctor nahi ho. Koi diagnosis mat do.
- Dawai ka naam suggest mat karo, dose ya timing mat batao, aur dawai band ya badalne ko kabhi mat kaho. Dawai ke sawal par "apne doctor se poochho" likho.
- "risks" mein sirf wahi emergency risks rakho jo upar diye gaye hain (agar koi nahi diya, to conditions se jude risks rakho). Har ek ke liye ek entry.
- "redFlags" mein 4 se 6 aise lakshan likho jinpar turant 108 / 112 par call karna chahiye (patient ki conditions ke hisaab se).
- Phone number, address, hospital, doctor ya company ka naam KHUD SE MAT BANAO.
- Sirf ye emergency numbers likh sakte ho: 112, 100, 101, 108.
- Patient ki umar aur "madad chahiye" ka dhyan rakho (jaise bujurg ya chalne me dikkat ho to girne se bachaav pe zor do).
- Checklist ke 3 se 5 sections rakho, har section mein 3 se 6 items.
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

// ---------- Ye function route use karta hai ----------
export async function generatePlan(input) {
  try {
    return { plan: await askGemini(input), fallback: false };
  } catch (err) {
    console.error("Gemini fail, fallback use ho raha hai:", err.message);
    return { plan: fallbackPlan(input), fallback: true };
  }
}
