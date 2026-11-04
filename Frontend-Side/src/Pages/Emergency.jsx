// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import {
//   FaHeart,
//   FaBrain,
//   FaCarCrash,
//   FaTint,
//   FaLungs,
//   FaBone,
//   FaBurn,
//   FaAllergies,
//   FaBaby,
//   FaAmbulance,
//   FaUserInjured,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaTwitter,
//   FaYoutube,
//   FaChevronRight,
//   FaStar,
//   FaCheckCircle,
//   FaPaperPlane,
//   FaSms,
//   FaWhatsapp,
//   FaLocationArrow,
//   FaIdCard,
//   FaUsers,
//   FaHistory,
//   FaShieldAlt,
//   FaSearch,
//   FaHeadset,
//   FaAddressBook,
//   FaArrowRight,
// } from "react-icons/fa";

// /* ═════════ CONFIG ═════════ */
// const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// /* ═════════ DATA (sample numbers: apne asli numbers daalo) ═════════ */
// const EMERGENCY_NUMBERS = [
//   { number: "108", label: "Ambulance", hint: "Free ambulance service" },
//   { number: "112", label: "National emergency", hint: "Police, fire, medical" },
// ];

// // Quick tools: `to` ko apne App.jsx ke routes se milao
// const TOOLS = [
//   {
//     title: "Smart Contact List",
//     desc: "Apne emergency contacts jodo aur star lagao, wo yahan alert mein dikhenge.",
//     to: "/relatives",
//     icon: <FaAddressBook />,
//     bg: "#ede9fe",
//     fg: "#7c3aed",
//   },
//   {
//     title: "AI Safety Checker",
//     desc: "Abhi ki situation likho, AI khatra aur agle kadam batayega.",
//     to: "/safety-checker",
//     icon: <FaSearch />,
//     bg: "#ccfbf1",
//     fg: "#0f766e",
//     ai: true,
//   },
//   {
//     title: "AI Safety Planner",
//     desc: "Bimari ke hisaab se emergency care plan pehle se taiyaar rakho.",
//     to: "/safety-planner",
//     icon: <FaShieldAlt />,
//     bg: "#dcfce7",
//     fg: "#16a34a",
//     ai: true,
//   },
//   {
//     title: "Help & Support",
//     desc: "Koi sawal ya dikkat? Hamari team madad ke liye hai.",
//     to: "/help",
//     icon: <FaHeadset />,
//     bg: "#fef3c7",
//     fg: "#d97706",
//   },
// ];

// const HOSPITALS = [
//   { id: 1, name: "City Care Hospital", city: "Delhi", phone: "+919800000001" },
//   { id: 2, name: "LifeLine Hospital", city: "Noida", phone: "+919800000002" },
//   { id: 3, name: "Sunrise Medical", city: "Gurugram", phone: "+919800000003" },
//   { id: 4, name: "Hope Hospital", city: "Jaipur", phone: "+919800000004" },
// ];

// const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

// const EMERGENCIES = [
//   {
//     icon: <FaHeart />, title: "Heart Attack", desc: "Chest pain, sweating", bg: "#fee2e2", fg: "#dc2626",
//     doList: [
//       "Turant 108 par call karo.",
//       "Mareez ko aaram se baitha do ya aadha letao, chalne mat do.",
//       "Kapde dhile karo (kasi hui shirt, belt).",
//       "Agar mareez ko aspirin se allergy nahi hai aur doctor ne pehle yehi salah di thi, tabhi aspirin ke baare mein dispatcher/doctor se poochho.",
//     ],
//     dontList: ["Khaana-paani mat do.", "Mareez ko akela mat chhodo.", "Ambulance ka intezaar karne mein der mat karo."],
//   },
//   {
//     icon: <FaBrain />, title: "Stroke", desc: "Speech difficulty", bg: "#ede9fe", fg: "#7c3aed",
//     doList: [
//       "Turant 108 par call karo. Ye FAST check hai: Face (chehra tedha), Arm (haath kamzor), Speech (bolne mein dikkat), Time (der mat karo).",
//       "Pehle lakshan kab shuru hue, wo samay note karo aur doctor ko batao.",
//       "Mareez ko sar thoda uthakar aaram se letao.",
//     ],
//     dontList: ["Khaana, paani ya dawai mat do.", "Soone do ya 'thik ho jayega' soch kar rukna mat."],
//   },
//   {
//     icon: <FaCarCrash />, title: "Road Accident", desc: "Trauma & injuries", bg: "#ffedd5", fg: "#ea580c",
//     doList: [
//       "108 / 112 par call karo aur jagah batao.",
//       "Khoon beh raha ho to saaf kapde se seedha dabav daalo.",
//       "Sar, gardan aur peeth ko hilne se bachao.",
//       "Gaadi ka engine band karo, aas-paas safe jagah banao.",
//     ],
//     dontList: ["Ghayal ko bina zaroorat hilao mat (aag ya khatra ho to hi hatao).", "Helmet khud mat utaaro."],
//   },
//   {
//     icon: <FaTint />, title: "Heavy Bleeding", desc: "Blood loss", bg: "#ffe4e6", fg: "#e11d48",
//     doList: [
//       "Saaf kapde ya patti se ghaav par seedha, zor ka dabav daalo.",
//       "Zakhmi hissa dil se upar rakho (agar haddi toot-ti na lage).",
//       "Kapda khoon se bhig jaye to hatao mat, uske upar aur kapda rakho.",
//       "Turant 108 par call karo.",
//     ],
//     dontList: ["Ghaav mein fansi cheez mat nikaalo.", "Tourniquet tabhi lagao jab training ho."],
//   },
//   {
//     icon: <FaLungs />, title: "Breathing Problem", desc: "Asthma, choking", bg: "#dbeafe", fg: "#2563eb",
//     doList: [
//       "Mareez ko seedha baitha do, kapde dhile karo, taazi hawa do.",
//       "Doctor ne inhaler diya ho to wahi use karwao.",
//       "Saans ruk gayi ho (choking): peeth par 5 zor ke thap, phir pet par 5 jhatke (Heimlich).",
//       "Saans na aaye to turant 108 par call karo.",
//     ],
//     dontList: ["Letao mat jab saans phool rahi ho.", "Munh mein ungli daal kar kuch nikaalne ki koshish mat karo."],
//   },
//   {
//     icon: <FaBone />, title: "Bone Fracture", desc: "Broken bones", bg: "#fef9c3", fg: "#a16207",
//     doList: [
//       "Toote hisse ko hilne se bachao, lakdi ya moti kitaab se sahara (splint) do.",
//       "Kapde mein lapeta hua baraf lagao, seedha skin par nahi.",
//       "Doctor ya hospital tak turant pahuncho.",
//     ],
//     dontList: ["Haddi ko seedha karne ki koshish mat karo.", "Ghayal hisse par bhaar mat daalo."],
//   },
//   {
//     icon: <FaBurn />, title: "Burn Injury", desc: "Thermal or chemical", bg: "#fef3c7", fg: "#d97706",
//     doList: [
//       "Jale hisse par 10-20 minute behta saada paani daalo.",
//       "Angoothi, ghadi, tight kapde jaldi hatao (sujan se pehle).",
//       "Saaf, geele ya non-stick kapde se dhak do.",
//       "Bada ya chehre/haath wala jalna ho to 108 par call karo.",
//     ],
//     dontList: ["Baraf, toothpaste, makkhan ya tel mat lagao.", "Chhale mat phodo."],
//   },
//   {
//     icon: <FaAllergies />, title: "Allergic Reaction", desc: "Swelling & breathing issues", bg: "#fce7f3", fg: "#db2777",
//     doList: [
//       "Jis cheez se allergy hai, wo turant hatao.",
//       "Doctor ne adrenaline auto-injector diya ho to use karo.",
//       "Saans mein dikkat ya chehra/gala sujne par turant 108 par call karo.",
//     ],
//     dontList: ["Mareez ko akela mat chhodo.", "Bina doctor ki salah ke nayi dawai mat do."],
//   },
//   {
//     icon: <FaBaby />, title: "Child Emergency", desc: "Urgent child care", bg: "#dcfce7", fg: "#16a34a",
//     doList: [
//       "Khud shaant raho aur bachche ko shaant rakho.",
//       "Daura pade to bachche ko karwat par letao, aas-paas se sakht cheezein hatao.",
//       "Turant 108 par call karo aur umar, vajan aur lakshan batao.",
//     ],
//     dontList: ["Munh mein kuch mat daalo.", "Bade logon wali dawai mat do."],
//   },
//   {
//     icon: <FaAmbulance />, title: "Blood Requirement", desc: "Urgent blood needed", bg: "#fee2e2", fg: "#b91c1c",
//     doList: [
//       "Hospital ke blood bank se seedha sampark karo (neeche hospital list se call karo).",
//       "Mareez ka blood group, hospital ka naam aur doctor ki parchi saath rakho.",
//       "Parivaar ke logon ko bhi bata do, taaki donor ke liye taiyaar rahein.",
//     ],
//     dontList: ["Anjaan logon ya agents ko paise dekar blood mat lo.", "Sirf hospital ya licensed blood bank se hi blood lo."],
//   },
//   {
//     icon: <FaUserInjured />, title: "Other Emergency", desc: "General emergency", bg: "#f1f5f9", fg: "#475569",
//     doList: [
//       "Mareez ko surakshit jagah par rakho aur akela mat chhodo.",
//       "Lakshan aur samay note karo.",
//       "Turant 108 / 112 par call karo.",
//     ],
//     dontList: ["Bina jaankari ke dawai mat do.", "Intezaar mat karo, shak ho to call karo."],
//   },
// ];

// // Sample doctors: apni API / DB se badlo. `handles` = upar ke condition titles.
// const DOCTORS = [
//   { id: 1, name: "Dr. Anil Mehra", specialty: "Cardiologist", hospital: "City Care Hospital", rating: 4.9, years: 18, phone: "+919800000011", handles: ["Heart Attack"] },
//   { id: 2, name: "Dr. Sneha Kapoor", specialty: "Neurologist", hospital: "LifeLine Hospital", rating: 4.8, years: 14, phone: "+919800000012", handles: ["Stroke"] },
//   { id: 3, name: "Dr. Rohit Sinha", specialty: "Trauma & Orthopedic Surgeon", hospital: "Sunrise Medical", rating: 4.8, years: 16, phone: "+919800000013", handles: ["Road Accident", "Bone Fracture", "Heavy Bleeding"] },
//   { id: 4, name: "Dr. Farah Khan", specialty: "Pulmonologist", hospital: "City Care Hospital", rating: 4.7, years: 12, phone: "+919800000014", handles: ["Breathing Problem", "Allergic Reaction"] },
//   { id: 5, name: "Dr. Meera Iyer", specialty: "Pediatrician", hospital: "Hope Hospital", rating: 4.9, years: 15, phone: "+919800000015", handles: ["Child Emergency"] },
//   { id: 6, name: "Dr. Vikram Rao", specialty: "Emergency Medicine", hospital: "LifeLine Hospital", rating: 4.6, years: 11, phone: "+919800000016", handles: ["Other Emergency", "Blood Requirement", "Heavy Bleeding"] },
//   { id: 7, name: "Dr. Kavita Desai", specialty: "Burn & Plastic Surgeon", hospital: "Sunrise Medical", rating: 4.7, years: 13, phone: "+919800000017", handles: ["Burn Injury"] },
// ];

// const FAQS = [
//   { icon: "🚑", q: "Emergency mein ambulance kaise bulayein?", a: "Sabse tez tareeka 108 par call karna hai. Upar 'Meri location bhejo' dabakar apni location share karo aur 108 operator ko jagah batao. Hospital ko message bhi bhej sakte ho." },
//   { icon: "❤️", q: "Kisi ko heart attack aaye to kya karein?", a: "Turant 108 par call karo, mareez ko aaram se baitha do aur kapde dhile karo. Khaana-paani mat do. Mareez behosh ho jaye aur saans na le to CPR (agar aapko aati ho) shuru karo." },
//   { icon: "🪪", q: "Medical ID kyun banayein?", a: "Isme aapka blood group, allergy, bimari aur dawaiyan hoti hain. Emergency message mein ye apne aap judta hai, taaki doctor ko jaldi sahi jaankari mile. Ye data sirf aapke phone/browser mein rehta hai." },
//   { icon: "👨‍👩‍👧", q: "Parivaar ko kaise alert karun?", a: "Smart Contact List (Relatives) mein jin logon par star lagaya hai, wo yahan 'Parivaar ko alert karo' mein dikhte hain. Ek tap mein call ya WhatsApp se aapki location ke saath message bhej sakte ho." },
//   { icon: "🏥", q: "Hospital kaise chunein?", a: "Sabse nazdiki hospital chuno jahan emergency department 24x7 chalta ho. Bahut serious halat mein 108 operator se poochho ki kaunsa hospital sahi rahega." },
// ];

// const FOOTER_LINKS = [
//   { title: "Services", links: [["Emergency care", "#sos"], ["Quick tools", "#tools"], ["Parivaar ko alert", "#family"], ["Nearby hospitals", "#hospitals"], ["First aid guide", "#emergency-check"]] },
//   { title: "Company", links: [["About us", "#"], ["Our doctors", "#"], ["Contact", "#"], ["Careers", "#"]] },
//   { title: "Legal", links: [["Terms of use", "#"], ["Privacy policy", "#"], ["Cookie policy", "#"]] },
// ];

// const SOCIALS = [
//   { label: "Facebook", icon: <FaFacebookF /> },
//   { label: "Instagram", icon: <FaInstagram /> },
//   { label: "LinkedIn", icon: <FaLinkedinIn /> },
//   { label: "Twitter", icon: <FaTwitter /> },
//   { label: "YouTube", icon: <FaYoutube /> },
// ];

// /* ═════════ HELPERS ═════════ */
// const formatPhone = (p) => p.replace(/^\+91(\d{5})(\d{5})$/, "+91 $1 $2");
// const initials = (name) => name.replace("Dr. ", "").split(" ").map((w) => w[0]).join("");
// const safeGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
// const safeSet = (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } };
// const readJSON = (k, fallback) => { try { return JSON.parse(safeGet(k)) ?? fallback; } catch { return fallback; } };

// const EMPTY_ID = { name: "", age: "", blood: "", allergies: "", conditions: "", medicines: "", contactName: "", contactPhone: "" };

// function useLocate() {
//   const [loc, setLoc] = useState({ status: "idle", link: "", msg: "" });
//   const locate = () => {
//     if (!navigator.geolocation) {
//       return setLoc({ status: "error", link: "", msg: "Is browser mein location support nahi hai." });
//     }
//     setLoc({ status: "loading", link: "", msg: "" });
//     navigator.geolocation.getCurrentPosition(
//       (p) =>
//         setLoc({
//           status: "ok",
//           link: `https://maps.google.com/?q=${p.coords.latitude.toFixed(6)},${p.coords.longitude.toFixed(6)}`,
//           msg: "",
//         }),
//       () => setLoc({ status: "error", link: "", msg: "Location nahi mili. Permission allow karo ya address khud likho." }),
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   };
//   return [loc, locate];
// }

// function buildMessage({ form, medId, includeId, link }) {
//   const blood = form.blood || (includeId ? medId.blood : "");
//   const lines = [
//     `EMERGENCY: Patient ${form.name.trim() || "-"} needs urgent help.`,
//     `Problem: ${form.problem.trim() || "-"}`,
//     blood && `Blood group: ${blood}`,
//     form.address.trim() && `Address: ${form.address.trim()}`,
//     link && `Live location: ${link}`,
//   ];
//   if (includeId) {
//     lines.push(
//       medId.age && `Age: ${medId.age}`,
//       medId.allergies && `Allergies: ${medId.allergies}`,
//       medId.conditions && `Conditions: ${medId.conditions}`,
//       medId.medicines && `Medicines: ${medId.medicines}`
//     );
//   }
//   lines.push(form.note.trim() && `Note: ${form.note.trim()}`);
//   return lines.filter(Boolean).join("\n");
// }

// /* ═════════ STYLES ═════════ */
// const EC_CSS = `
// .ec,.ec *{box-sizing:border-box}
// .ec{text-align:left;color:#0f172a}
// .ec h2,.ec h3,.ec h4,.ec p,.ec ul{margin:0;padding:0}
// .ec-section{padding:44px 16px;background:#fff}
// .ec-section.alt{background:#f8fafc}
// .ec-wrap{max-width:1180px;margin:0 auto}
// .ec-head{text-align:center;margin-bottom:28px}
// .ec-title{font-size:clamp(1.5rem,4.5vw,2.1rem);font-weight:800;text-align:center;margin-bottom:8px!important}
// .ec-sub{color:#64748b;text-align:center;font-size:.95rem}
// .ec-h3{font-size:1.1rem;font-weight:700;margin-bottom:12px!important}

// .ec-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 16px;border-radius:10px;border:1px solid transparent;font:inherit;font-size:.9rem;font-weight:600;cursor:pointer;text-decoration:none;white-space:nowrap;transition:background .15s}
// .ec-btn-primary{background:#0891b2;color:#fff}.ec-btn-primary:hover{background:#0e7490}
// .ec-btn-outline{background:#fff;color:#334155;border-color:#cbd5e1}.ec-btn-outline:hover{background:#f1f5f9}
// .ec-btn-green{background:#16a34a;color:#fff}.ec-btn-green:hover{background:#15803d}
// .ec-btn-red{background:#dc2626;color:#fff}.ec-btn-red:hover{background:#b91c1c}
// .ec-btn-redline{background:#fff;color:#dc2626;border-color:#fecaca}
// .ec-btn-sm{padding:7px 12px;font-size:.82rem;border-radius:8px}
// .ec-disabled{opacity:.45;pointer-events:none}

// /* HERO / SOS */
// .ec-hero{padding:28px 16px;background:linear-gradient(135deg,#7f1d1d,#b91c1c 55%,#dc2626)}
// .ec-hero-in{max-width:1180px;margin:0 auto;display:grid;gap:20px}
// .ec-hero-tag{display:inline-flex;align-items:center;gap:8px;padding:5px 12px;border-radius:99px;background:rgba(255,255,255,.16);color:#fff;font-size:.78rem;font-weight:700}
// .ec-hero-dot{width:8px;height:8px;border-radius:50%;background:#fff}
// .ec-hero h1{margin:10px 0 0;font-size:clamp(1.7rem,5vw,2.6rem);font-weight:800;line-height:1.15;color:#fff}
// .ec-hero p{margin:8px 0 0;max-width:520px;color:#fecaca;font-size:.95rem;line-height:1.6}
// .ec-sos{display:grid;grid-template-columns:1fr 1fr;gap:10px}
// .ec-sos-btn{display:flex;align-items:center;gap:12px;padding:14px;border-radius:16px;background:#fff;color:#7f1d1d;text-decoration:none;box-shadow:0 8px 20px rgba(0,0,0,.18)}
// .ec-sos-ico{width:44px;height:44px;border-radius:50%;background:#fee2e2;color:#dc2626;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex:none}
// .ec-sos-txt{display:flex;flex-direction:column;min-width:0}
// .ec-sos-txt strong{font-size:1.5rem;line-height:1.1}
// .ec-sos-txt small{margin-top:2px;color:#64748b;font-size:.75rem}
// .ec-loc{grid-column:1/-1;display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:16px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);color:#fff;font:inherit;text-align:left;cursor:pointer}
// .ec-loc b{display:block;font-size:.95rem}
// .ec-loc span{display:block;margin-top:2px;font-size:.78rem;color:#fecaca;word-break:break-all}
// .ec-loc.ok{background:rgba(22,163,74,.3);border-color:#86efac}
// .ec-loc-ico{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex:none}
// .ec-quick{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
// .ec-quick a{padding:7px 13px;border-radius:99px;background:rgba(255,255,255,.16);color:#fff;font-size:.82rem;font-weight:600;text-decoration:none}
// .ec-quick a:hover{background:rgba(255,255,255,.28)}

// /* QUICK TOOLS */
// .ec-tools-grid{display:grid;grid-template-columns:1fr;gap:12px}
// .ec-tool{position:relative;display:flex;align-items:flex-start;gap:14px;padding:16px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;color:inherit;text-decoration:none;transition:border-color .15s,box-shadow .15s}
// .ec-tool:hover{border-color:#0891b2;box-shadow:0 6px 16px rgba(8,145,178,.1)}
// .ec-tool:focus-visible{outline:2px solid #0891b2;outline-offset:2px}
// .ec-tool-ico{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex:none}
// .ec-tool-body{flex:1;min-width:0}
// .ec-tool-title{display:flex;align-items:center;gap:8px;font-size:1rem;font-weight:700}
// .ec-tool-ai{padding:1px 8px;border-radius:99px;background:#ecfdf5;border:1px solid #a7f3d0;color:#047857;font-size:.65rem;font-weight:800}
// .ec-tool-desc{margin-top:4px!important;color:#64748b;font-size:.85rem;line-height:1.5}
// .ec-tool-go{margin-top:10px;display:inline-flex;align-items:center;gap:6px;color:#0891b2;font-size:.82rem;font-weight:700}

// /* TOP GRID (family + medical id) */
// .ec-two{display:grid;gap:20px;align-items:start}
// .ec-card{padding:20px;background:#fff;border:1px solid #e2e8f0;border-radius:16px}
// .ec-card.tint{background:#f8fafc}
// .ec-card-head{display:flex;align-items:center;gap:12px;margin-bottom:14px}
// .ec-card-ico{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex:none;font-size:1rem}
// .ec-card-title{font-size:1.05rem;font-weight:700}
// .ec-card-sub{margin-top:2px!important;color:#64748b;font-size:.82rem}
// .ec-empty{padding:16px;border:1.5px dashed #cbd5e1;border-radius:12px;color:#64748b;font-size:.88rem;line-height:1.55;text-align:center}
// .ec-empty a{color:#0891b2;font-weight:600}
// .ec-people{list-style:none;display:flex;flex-direction:column;gap:10px}
// .ec-person{display:flex;flex-direction:column;gap:10px;padding:12px;border:1px solid #e2e8f0;border-radius:12px;background:#fff}
// .ec-person-name{font-weight:700;font-size:.95rem}
// .ec-person-meta{margin-top:2px!important;color:#64748b;font-size:.82rem}
// .ec-row{display:flex;gap:8px;flex-wrap:wrap}

// .ec-id-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
// .ec-id-full{grid-column:1/-1}
// .ec-lab{display:flex;flex-direction:column;gap:5px;font-size:.78rem;font-weight:600;color:#475569}
// .ec-input{display:block;width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;color:#0f172a;font:inherit;font-size:.9rem;outline:none}
// .ec-input:focus{border-color:#0891b2;box-shadow:0 0 0 3px rgba(8,145,178,.15)}
// textarea.ec-input{resize:none}
// .ec-idview{display:grid;grid-template-columns:1fr 1fr;gap:10px}
// .ec-idcell{padding:10px 12px;border-radius:10px;background:#f8fafc;border:1px solid #eef2f6}
// .ec-idcell small{display:block;color:#94a3b8;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
// .ec-idcell b{display:block;margin-top:2px;font-size:.9rem;word-break:break-word}
// .ec-blood{display:inline-flex;align-items:center;justify-content:center;min-width:46px;padding:4px 10px;border-radius:99px;background:#dc2626;color:#fff;font-weight:800}
// .ec-note{margin-top:10px!important;color:#94a3b8;font-size:.75rem;line-height:1.5}

// /* HOSPITALS + COMPOSER */
// .ec-hotlines{display:grid;grid-template-columns:1fr;gap:12px;max-width:780px;margin:0 auto 32px}
// .ec-filter{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}
// .ec-chip{padding:7px 14px;border-radius:99px;border:1.5px solid #e2e8f0;background:#fff;color:#475569;font:inherit;font-size:.82rem;font-weight:600;cursor:pointer}
// .ec-chip.on{background:#0891b2;border-color:#0891b2;color:#fff}
// .ec-split{display:grid;gap:24px;align-items:start}
// .ec-list{list-style:none;display:flex;flex-direction:column;gap:12px}
// .ec-hosp{display:flex;flex-direction:column;gap:12px;padding:16px;background:#fff;border:1px solid #e2e8f0;border-radius:16px}
// .ec-hosp.is-active{border-color:#0891b2;background:#ecfeff;box-shadow:0 0 0 1px #0891b2}
// .ec-name{font-weight:700}
// .ec-meta{display:flex;align-items:center;gap:6px;margin-top:4px!important;color:#64748b;font-size:.85rem}
// .ec-meta svg{color:#0891b2}
// .ec-phone{margin-top:3px!important;color:#475569;font-size:.85rem}
// .ec-to{margin:2px 0 14px!important;color:#64748b;font-size:.88rem}
// .ec-to b{color:#0f172a}
// .ec-field{margin-bottom:10px}
// .ec-check{display:flex;align-items:center;gap:8px;margin:2px 0 12px;font-size:.85rem;color:#334155;cursor:pointer}
// .ec-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}
// .ec-hint{margin-top:10px!important;color:#94a3b8;font-size:.8rem;text-align:center}
// .ec-preview{margin:0 0 12px;padding:10px 12px;border-radius:10px;background:#fff;border:1px dashed #cbd5e1;color:#475569;font:inherit;font-size:.78rem;line-height:1.5;white-space:pre-wrap;max-height:130px;overflow:auto}

// /* LOG */
// .ec-log{list-style:none;display:flex;flex-direction:column;gap:8px;margin-top:12px}
// .ec-log li{display:flex;justify-content:space-between;gap:10px;padding:10px 12px;border-radius:10px;background:#f8fafc;border:1px solid #eef2f6;font-size:.85rem}
// .ec-log small{color:#94a3b8}

// /* CHECK */
// .ec-conds{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
// .ec-cond{position:relative;display:flex;flex-direction:column;align-items:flex-start;padding:14px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;font:inherit;text-align:left;cursor:pointer}
// .ec-cond:hover{border-color:#94a3b8}
// .ec-cond:focus-visible{outline:2px solid #0891b2;outline-offset:2px}
// .ec-cond.is-active{border-color:#0891b2;box-shadow:0 0 0 2px #0891b2}
// .ec-ico{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.15rem;margin-bottom:10px}
// .ec-cond-title{font-weight:700;font-size:.95rem;color:#0f172a}
// .ec-cond-desc{margin-top:3px;color:#64748b;font-size:.78rem}
// .ec-tick{position:absolute;top:10px;right:10px;color:#0891b2}
// .ec-panel{margin-top:32px;padding:18px;background:#fff;border:1px solid #e2e8f0;border-radius:20px;scroll-margin-top:90px}
// .ec-alert{display:flex;flex-direction:column;gap:12px;margin-bottom:18px;padding:14px;background:#fef2f2;border:1px solid #fecaca;border-radius:14px}
// .ec-alert b{display:block;color:#b91c1c}
// .ec-alert span{display:block;margin-top:2px;color:#dc2626;font-size:.85rem}
// .ec-aid{display:grid;gap:12px;margin-bottom:22px}
// .ec-aid-box{padding:14px;border-radius:14px}
// .ec-aid-box.do{background:#f0fdf4;border:1px solid #bbf7d0}
// .ec-aid-box.dont{background:#fff7ed;border:1px solid #fed7aa}
// .ec-aid-box h4{font-size:.9rem;font-weight:800;margin-bottom:8px!important}
// .ec-aid-box.do h4{color:#166534}
// .ec-aid-box.dont h4{color:#9a3412}
// .ec-aid-box ul{list-style:none;display:flex;flex-direction:column;gap:7px}
// .ec-aid-box li{position:relative;padding-left:16px;font-size:.86rem;line-height:1.5;color:#334155}
// .ec-aid-box li::before{content:"";position:absolute;left:2px;top:.55em;width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.6}
// .ec-disc{margin-bottom:18px!important;color:#94a3b8;font-size:.76rem;line-height:1.5}
// .ec-panel-title{font-size:1.25rem;font-weight:800}
// .ec-panel-sub{margin:4px 0 16px!important;color:#64748b;font-size:.88rem}
// .ec-docs{list-style:none;display:flex;flex-direction:column;gap:12px}
// .ec-doc{display:flex;flex-direction:column;gap:12px;padding:14px;border:1px solid #e2e8f0;border-radius:14px}
// .ec-doc.is-match{border-color:#0891b2;background:#ecfeff}
// .ec-doc-main{display:flex;align-items:center;gap:12px;flex:1;min-width:0}
// .ec-avatar{width:46px;height:46px;border-radius:50%;background:#cffafe;color:#0e7490;font-weight:700;display:flex;align-items:center;justify-content:center;flex:none}
// .ec-doc-name{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-weight:700}
// .ec-badge{background:#0891b2;color:#fff;padding:2px 10px;border-radius:99px;font-size:.7rem;font-weight:500}
// .ec-doc-sub{margin-top:2px!important;color:#475569;font-size:.85rem}
// .ec-doc-stats{display:flex;align-items:center;gap:14px;margin-top:4px!important;color:#64748b;font-size:.8rem}
// .ec-doc-stats svg{color:#fbbf24;margin-right:4px;vertical-align:-1px}

// /* FAQ */
// .ec-faq{display:grid;gap:24px}
// .ec-faq-list{display:flex;flex-direction:column;gap:10px}
// .ec-faq-item{background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden}
// .ec-faq-item.is-open{border-color:#0891b2}
// .ec-faq-q{font-size:1rem}
// .ec-faq-btn{display:flex;align-items:center;gap:12px;width:100%;padding:14px;background:transparent;border:0;color:#0f172a;font:inherit;font-weight:600;text-align:left;cursor:pointer}
// .ec-faq-emoji{width:36px;height:36px;border-radius:50%;background:#ecfeff;display:flex;align-items:center;justify-content:center;font-size:1.05rem;flex:none}
// .ec-faq-text{flex:1;line-height:1.4}
// .ec-faq-chev{flex:none;color:#64748b;font-size:.8rem}
// .is-open .ec-faq-chev{transform:rotate(90deg);color:#0891b2}
// .ec-faq-a{display:none}
// .is-open .ec-faq-a{display:block}
// .ec-faq-a p{padding:0 14px 16px;color:#475569;font-size:.92rem;line-height:1.7}

// /* FOOTER */
// .ec-foot{background:#0f172a;color:#cbd5e1;padding:44px 16px 22px}
// .ec-foot-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:28px 20px}
// .ec-foot-brand,.ec-foot-news{grid-column:1/-1}
// .ec-logo{display:inline-flex;align-items:center;gap:10px;color:#fff;font-size:1.3rem;font-weight:700;text-decoration:none}
// .ec-logo-mark{width:38px;height:38px;border-radius:10px;background:#0891b2;display:flex;align-items:center;justify-content:center;font-size:1rem}
// .ec-foot-about{margin-top:12px!important;max-width:340px;color:#94a3b8;font-size:.9rem;line-height:1.65}
// .ec-social{display:flex;gap:10px;margin-top:16px}
// .ec-social a{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.08);color:#e2e8f0;display:flex;align-items:center;justify-content:center;text-decoration:none}
// .ec-social a:hover{background:#0891b2;color:#fff}
// .ec-foot-title{margin-bottom:12px!important;color:#fff;font-size:.95rem;font-weight:600}
// .ec-foot ul{list-style:none;display:flex;flex-direction:column;gap:10px}
// .ec-foot ul a{color:#94a3b8;font-size:.9rem;text-decoration:none}
// .ec-foot ul a:hover{color:#fff}
// .ec-news-text{margin-bottom:10px!important;color:#94a3b8;font-size:.9rem}
// .ec-news-row{display:flex;flex-direction:column;gap:10px;max-width:420px}
// .ec-news-row input{width:100%;padding:10px 14px;border:1px solid #334155;border-radius:10px;background:#1e293b;color:#fff;font:inherit;font-size:.9rem;outline:none}
// .ec-news-ok{margin-top:10px!important;color:#4ade80;font-size:.85rem}
// .ec-foot-bottom{display:flex;flex-direction:column;gap:8px;margin-top:36px;padding-top:18px;border-top:1px solid #1e293b;color:#64748b;font-size:.85rem}
// .ec-foot-bottom b{color:#f87171}

// @media(min-width:640px){
//   .ec-section{padding:60px 24px}
//   .ec-hero{padding:40px 24px}
//   .ec-hotlines{grid-template-columns:1fr 1fr}
//   .ec-tools-grid{grid-template-columns:repeat(2,1fr);gap:16px}
//   .ec-person,.ec-hosp,.ec-doc{flex-direction:row;align-items:center;justify-content:space-between}
//   .ec-conds{grid-template-columns:repeat(3,1fr);gap:16px}
//   .ec-panel{padding:28px}
//   .ec-alert{flex-direction:row;align-items:center;justify-content:space-between}
//   .ec-aid{grid-template-columns:1fr 1fr}
// }
// @media(min-width:900px){
//   .ec-hero-in{grid-template-columns:1.1fr 1fr;align-items:center;gap:32px}
//   .ec-tools-grid{grid-template-columns:repeat(4,1fr)}
//   .ec-tool{flex-direction:column}
//   .ec-two{grid-template-columns:1fr 1fr;gap:24px}
//   .ec-split{grid-template-columns:3fr 2fr;gap:28px}
//   .ec-conds{grid-template-columns:repeat(4,1fr)}
//   .ec-card.sticky{position:sticky;top:96px}
// }
// @media(min-width:768px){
//   .ec-foot-grid{grid-template-columns:repeat(3,1fr)}
//   .ec-news-row{flex-direction:row}
//   .ec-foot-bottom{flex-direction:row;justify-content:space-between}
// }
// @media(min-width:1024px){
//   .ec-foot-grid{grid-template-columns:1.5fr 1fr 1fr 1fr 1.6fr;gap:32px}
//   .ec-foot-brand,.ec-foot-news{grid-column:auto}
//   .ec-news-row{flex-direction:column}
// }
// `;

// /* ═════════ 1) HERO / SOS ═════════ */
// function SosHero({ loc, locate }) {
//   return (
//     <section id="sos" className="ec ec-hero">
//       <div className="ec-hero-in">
//         <div>
//           <span className="ec-hero-tag"><span className="ec-hero-dot" /> 24x7 Emergency Help</span>
//           <h1>Emergency mein hain? Pehle call karo.</h1>
//           <p>
//             Ek tap mein ambulance bulao, apni location bhejo aur parivaar ko alert karo. Neeche first aid ke
//             steps bhi milenge.
//           </p>
//           <div className="ec-quick" style={{ marginTop: 14 }}>
//             <a href="#tools">🧰 Quick tools</a>
//             <a href="#family">👨‍👩‍👧 Parivaar ko alert</a>
//             <a href="#medical-id">🪪 Medical ID</a>
//             <a href="#hospitals">🏥 Hospitals</a>
//             <a href="#emergency-check">🩺 First aid</a>
//           </div>
//         </div>

//         <div className="ec-sos">
//           {EMERGENCY_NUMBERS.map((n) => (
//             <a key={n.number} href={`tel:${n.number}`} className="ec-sos-btn">
//               <span className="ec-sos-ico">{n.number === "108" ? <FaAmbulance /> : <FaPhoneAlt />}</span>
//               <span className="ec-sos-txt">
//                 <strong>{n.number}</strong>
//                 <small>{n.label}</small>
//               </span>
//             </a>
//           ))}

//           <button type="button" className={`ec-loc ${loc.status === "ok" ? "ok" : ""}`} onClick={locate}>
//             <span className="ec-loc-ico"><FaLocationArrow /></span>
//             <span style={{ minWidth: 0 }}>
//               <b>
//                 {loc.status === "ok"
//                   ? "Location mil gayi"
//                   : loc.status === "loading"
//                   ? "Location dhundh rahe hain..."
//                   : "Meri location bhejo"}
//               </b>
//               <span>
//                 {loc.status === "ok" && loc.link}
//                 {loc.status === "error" && loc.msg}
//                 {(loc.status === "idle" || loc.status === "loading") &&
//                   "Dabao, ye location neeche ke sab messages mein judegi."}
//               </span>
//             </span>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═════════ 2) QUICK TOOLS ═════════ */
// function QuickTools() {
//   return (
//     <section id="tools" className="ec ec-section">
//       <div className="ec-wrap">
//         <div className="ec-head" style={{ marginBottom: 22 }}>
//           <h2 className="ec-title">Quick Tools</h2>
//           <p className="ec-sub">Emergency se pehle aur baad ke zaroori tools, ek hi jagah.</p>
//         </div>

//         <div className="ec-tools-grid">
//           {TOOLS.map((t) => (
//             <Link key={t.title} to={t.to} className="ec-tool">
//               <span className="ec-tool-ico" style={{ background: t.bg, color: t.fg }}>{t.icon}</span>
//               <span className="ec-tool-body">
//                 <span className="ec-tool-title">
//                   {t.title}
//                   {t.ai && <span className="ec-tool-ai">AI</span>}
//                 </span>
//                 <p className="ec-tool-desc">{t.desc}</p>
//                 <span className="ec-tool-go">Open<FaArrowRight size={11} /></span>
//               </span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═════════ 3) FAMILY ALERT + MEDICAL ID ═════════ */
// function FamilyAlert({ loc, medId }) {
//   const [state, setState] = useState({ status: "loading", list: [] });

//   useEffect(() => {
//     let alive = true;
//     fetch(`${API}/relatives`)
//       .then((r) => (r.ok ? r.json() : Promise.reject()))
//       .then((data) => {
//         if (!alive) return;
//         const all = Array.isArray(data) ? data : [];
//         setState({ status: "ok", list: all.filter((p) => p.isEmergency) });
//       })
//       .catch(() => alive && setState({ status: "error", list: [] }));
//     return () => { alive = false; };
//   }, []);

//   const msg = `EMERGENCY: ${medId.name.trim() || "Mujhe"} ko madad chahiye. Turant call karo.${
//     loc.link ? `\nLocation: ${loc.link}` : ""
//   }`;

//   return (
//     <div className="ec-card" id="family">
//       <div className="ec-card-head">
//         <span className="ec-card-ico" style={{ background: "#ede9fe", color: "#7c3aed" }}><FaUsers /></span>
//         <div>
//           <div className="ec-card-title">Parivaar ko alert karo</div>
//           <p className="ec-card-sub">Aapke star lagaye emergency contacts</p>
//         </div>
//       </div>

//       {state.status === "loading" && <div className="ec-empty">Contacts load ho rahe hain...</div>}

//       {state.status === "error" && (
//         <div className="ec-empty">
//           Contacts load nahi ho paye. Server (port 3000) chal raha hai? Tab tak 108 / 112 par call karo.
//         </div>
//       )}

//       {state.status === "ok" && state.list.length === 0 && (
//         <div className="ec-empty">
//           Abhi koi emergency contact nahi hai. <Link to="/relatives">Smart Contact List</Link> mein kisi ko star karo,
//           wo yahan dikhega.
//         </div>
//       )}

//       {state.status === "ok" && state.list.length > 0 && (
//         <ul className="ec-people">
//           {state.list.map((p) => (
//             <li key={p._id} className="ec-person">
//               <div>
//                 <div className="ec-person-name">{p.name}</div>
//                 <p className="ec-person-meta">{p.relation} · +91 {p.phone}</p>
//               </div>
//               <div className="ec-row">
//                 <a href={`tel:+91${p.phone}`} className="ec-btn ec-btn-primary ec-btn-sm"><FaPhoneAlt /> Call</a>
//                 <a
//                   href={`https://wa.me/91${p.phone}?text=${encodeURIComponent(msg)}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="ec-btn ec-btn-green ec-btn-sm"
//                 >
//                   <FaWhatsapp /> Alert
//                 </a>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//       {!loc.link && <p className="ec-note">Tip: upar "Meri location bhejo" dabao, to message mein location bhi judegi.</p>}
//     </div>
//   );
// }

// function MedicalId({ medId, setMedId }) {
//   const [editing, setEditing] = useState(false);
//   const [draft, setDraft] = useState(medId);
//   const hasData = Object.values(medId).some((v) => String(v).trim());

//   const set = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }));
//   const save = () => { setMedId(draft); setEditing(false); };
//   const startEdit = () => { setDraft(medId); setEditing(true); };

//   return (
//     <div className="ec-card tint" id="medical-id">
//       <div className="ec-card-head">
//         <span className="ec-card-ico" style={{ background: "#fee2e2", color: "#dc2626" }}><FaIdCard /></span>
//         <div style={{ flex: 1 }}>
//           <div className="ec-card-title">Meri Medical ID</div>
//           <p className="ec-card-sub">Emergency message mein apne aap judti hai</p>
//         </div>
//         {!editing && (
//           <button type="button" className="ec-btn-outline ec-btn ec-btn-sm" onClick={startEdit}>
//             {hasData ? "Edit" : "Banao"}
//           </button>
//         )}
//       </div>

//       {editing ? (
//         <>
//           <div className="ec-id-grid">
//             <label className="ec-lab">Naam<input className="ec-input" value={draft.name} onChange={set("name")} placeholder="Ramesh Kumar" /></label>
//             <label className="ec-lab">Umar<input className="ec-input" type="number" inputMode="numeric" value={draft.age} onChange={set("age")} placeholder="62" /></label>
//             <label className="ec-lab">Blood group
//               <select className="ec-input" value={draft.blood} onChange={set("blood")}>
//                 <option value="">Chuno</option>
//                 {BLOOD_GROUPS.map((b) => <option key={b} value={b}>{b}</option>)}
//               </select>
//             </label>
//             <label className="ec-lab">Allergies<input className="ec-input" value={draft.allergies} onChange={set("allergies")} placeholder="Penicillin, moongfali" /></label>
//             <label className="ec-lab ec-id-full">Bimariyan<input className="ec-input" value={draft.conditions} onChange={set("conditions")} placeholder="Diabetes, BP" /></label>
//             <label className="ec-lab ec-id-full">Chal rahi dawaiyan<input className="ec-input" value={draft.medicines} onChange={set("medicines")} placeholder="Dawai ke naam" /></label>
//             <label className="ec-lab">Emergency contact<input className="ec-input" value={draft.contactName} onChange={set("contactName")} placeholder="Naam" /></label>
//             <label className="ec-lab">Unka number<input className="ec-input" type="tel" inputMode="tel" value={draft.contactPhone} onChange={set("contactPhone")} placeholder="98765 43210" /></label>
//           </div>
//           <div className="ec-row" style={{ marginTop: 14 }}>
//             <button type="button" className="ec-btn ec-btn-primary" onClick={save}>Save karo</button>
//             <button type="button" className="ec-btn-outline ec-btn" onClick={() => setEditing(false)}>Cancel</button>
//           </div>
//         </>
//       ) : hasData ? (
//         <div className="ec-idview">
//           {medId.name && <div className="ec-idcell"><small>Naam</small><b>{medId.name}{medId.age && `, ${medId.age}`}</b></div>}
//           {medId.blood && <div className="ec-idcell"><small>Blood group</small><span className="ec-blood">{medId.blood}</span></div>}
//           {medId.allergies && <div className="ec-idcell"><small>Allergies</small><b>{medId.allergies}</b></div>}
//           {medId.conditions && <div className="ec-idcell"><small>Bimariyan</small><b>{medId.conditions}</b></div>}
//           {medId.medicines && <div className="ec-idcell ec-id-full"><small>Dawaiyan</small><b>{medId.medicines}</b></div>}
//           {medId.contactName && (
//             <div className="ec-idcell ec-id-full">
//               <small>Emergency contact</small>
//               <b>{medId.contactName} {medId.contactPhone && `· ${medId.contactPhone}`}</b>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="ec-empty">Abhi khaali hai. Blood group, allergy aur dawaiyan likh do, emergency mein kaam aayega.</div>
//       )}
//       <p className="ec-note">Ye jaankari sirf aapke is browser/phone mein save hoti hai, server par nahi jaati.</p>
//     </div>
//   );
// }

// /* ═════════ 4) HOSPITALS + MESSAGE ═════════ */
// function HospitalContact({ loc, medId, addLog }) {
//   const cities = ["All", ...new Set(HOSPITALS.map((h) => h.city))];
//   const [city, setCity] = useState("All");
//   const [hospitalId, setHospitalId] = useState(HOSPITALS[0].id);
//   const [form, setForm] = useState({ name: "", problem: "", blood: "", address: "", note: "" });
//   const [includeId, setIncludeId] = useState(true);

//   const shown = HOSPITALS.filter((h) => city === "All" || h.city === city);
//   const hospital = HOSPITALS.find((h) => h.id === hospitalId);
//   const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

//   // Medical ID se naam aur blood group prefill (sirf jab form khaali ho)
//   const nameVal = form.name || medId.name;
//   const finalForm = { ...form, name: nameVal };
//   const ready = finalForm.name.trim() && finalForm.problem.trim();
//   const text = buildMessage({ form: finalForm, medId, includeId, link: loc.link });

//   const smsHref = `sms:${hospital.phone}?&body=${encodeURIComponent(text)}`;
//   const waHref = `https://wa.me/${hospital.phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

//   const logSend = (via) => {
//     if (!ready) return;
//     addLog({ time: Date.now(), hospital: hospital.name, patient: finalForm.name.trim(), problem: finalForm.problem.trim(), via });
//   };

//   return (
//     <section id="hospitals" className="ec ec-section">
//       <div className="ec-wrap">
//         <div className="ec-head">
//           <h2 className="ec-title">Hospital ko call ya message karo</h2>
//           <p className="ec-sub">Kisi bhi hospital se seedha jud jao. Har number ek tap door hai.</p>
//         </div>

//         <div className="ec-split">
//           <div>
//             <h3 className="ec-h3">Nazdiki hospitals</h3>
//             <div className="ec-filter">
//               {cities.map((c) => (
//                 <button key={c} type="button" className={`ec-chip ${city === c ? "on" : ""}`} onClick={() => setCity(c)}>
//                   {c}
//                 </button>
//               ))}
//             </div>
//             <ul className="ec-list">
//               {shown.map((h) => {
//                 const active = h.id === hospitalId;
//                 return (
//                   <li key={h.id} className={`ec-hosp ${active ? "is-active" : ""}`}>
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <p className="ec-name">{h.name}</p>
//                       <p className="ec-meta"><FaMapMarkerAlt /> {h.city}, India</p>
//                       <p className="ec-phone">{formatPhone(h.phone)}</p>
//                     </div>
//                     <div className="ec-row">
//                       <a href={`tel:${h.phone}`} className="ec-btn ec-btn-primary"><FaPhoneAlt /> Call</a>
//                       <button type="button" onClick={() => setHospitalId(h.id)} aria-pressed={active} className="ec-btn-outline ec-btn">
//                         <FaSms /> {active ? "Selected" : "Message"}
//                       </button>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>

//           <div className="sticky ec-card tint">
//             <h3 className="ec-h3" style={{ marginBottom: 0 }}>Emergency message bhejo</h3>
//             <p className="ec-to">To: <b>{hospital.name}</b></p>

//             <div className="ec-field"><input className="ec-input" value={nameVal} onChange={set("name")} placeholder="Patient ka naam *" /></div>
//             <div className="ec-field"><input className="ec-input" value={form.problem} onChange={set("problem")} placeholder="Problem (jaise: seene mein dard) *" /></div>
//             <div className="ec-field">
//               <select className="ec-input" value={form.blood || medId.blood} onChange={set("blood")}>
//                 <option value="">Blood group (optional)</option>
//                 {BLOOD_GROUPS.map((b) => <option key={b} value={b}>{b}</option>)}
//               </select>
//             </div>
//             <div className="ec-field"><input className="ec-input" value={form.address} onChange={set("address")} placeholder="Aapka address / landmark" /></div>
//             <div className="ec-field"><textarea className="ec-input" rows={2} value={form.note} onChange={set("note")} placeholder="Aur kuch batana ho?" /></div>

//             <label className="ec-check">
//               <input type="checkbox" checked={includeId} onChange={(e) => setIncludeId(e.target.checked)} />
//               Medical ID (allergy, dawai, bimari) saath bhejo
//             </label>

//             <pre className="ec-preview">{text}</pre>

//             <div className="ec-actions">
//               <a href={smsHref} onClick={() => logSend("SMS")} className={`ec-btn ec-btn-primary ${!ready ? "ec-disabled" : ""}`} aria-disabled={!ready}><FaPaperPlane /> SMS</a>
//               <a href={waHref} onClick={() => logSend("WhatsApp")} target="_blank" rel="noreferrer" className={`ec-btn ec-btn-green ${!ready ? "ec-disabled" : ""}`} aria-disabled={!ready}><FaWhatsapp /> WhatsApp</a>
//             </div>
//             {!ready && <p className="ec-hint">Patient ka naam aur problem likho.</p>}
//             {loc.status !== "ok" && ready && <p className="ec-hint">Upar "Meri location bhejo" dabao to location bhi judegi.</p>}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═════════ 5) CHECK + FIRST AID + TOP 5 DOCTORS ═════════ */
// function EmergencyCheck() {
//   const [selected, setSelected] = useState(null);
//   const panelRef = useRef(null);

//   const topDoctors = useMemo(() => {
//     const match = (d) => (selected && d.handles.includes(selected.title) ? 1 : 0);
//     return [...DOCTORS].sort((a, b) => match(b) - match(a) || b.rating - a.rating).slice(0, 5);
//   }, [selected]);

//   const choose = (item) => {
//     setSelected(item);
//     setTimeout(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
//   };

//   return (
//     <section id="emergency-check" className="ec ec-section alt">
//       <div className="ec-wrap">
//         <div className="ec-head">
//           <h2 className="ec-title">Patient Emergency Check</h2>
//           <p className="ec-sub">Patient ki halat chuno. Abhi kya karna hai aur kaun sa doctor sahi hai, dono dikhenge.</p>
//         </div>

//         <div className="ec-conds">
//           {EMERGENCIES.map((item) => {
//             const active = selected?.title === item.title;
//             return (
//               <button key={item.title} type="button" onClick={() => choose(item)} aria-pressed={active} className={`ec-cond ${active ? "is-active" : ""}`}>
//                 {active && <FaCheckCircle className="ec-tick" />}
//                 <span className="ec-ico" style={{ background: item.bg, color: item.fg }}>{item.icon}</span>
//                 <span className="ec-cond-title">{item.title}</span>
//                 <span className="ec-cond-desc">{item.desc}</span>
//               </button>
//             );
//           })}
//         </div>

//         <div ref={panelRef} className="ec-panel">
//           {selected && (
//             <>
//               <div className="ec-alert">
//                 <div>
//                   <b>{selected.title}: pehle ambulance bulao</b>
//                   <span>Call karne ke baad neeche ke steps follow karo.</span>
//                 </div>
//                 <div className="ec-row">
//                   <a href="tel:108" className="ec-btn ec-btn-red"><FaAmbulance /> Call 108</a>
//                   <a href="tel:112" className="ec-btn ec-btn-redline"><FaPhoneAlt /> 112</a>
//                 </div>
//               </div>

//               <div className="ec-aid">
//                 <div className="ec-aid-box do">
//                   <h4>✅ Abhi ye karo</h4>
//                   <ul>{selected.doList.map((s, i) => <li key={i}>{s}</li>)}</ul>
//                 </div>
//                 <div className="ec-aid-box dont">
//                   <h4>⛔ Ye mat karo</h4>
//                   <ul>{selected.dontList.map((s, i) => <li key={i}>{s}</li>)}</ul>
//                 </div>
//               </div>
//               <p className="ec-disc">
//                 Ye general first aid jaankari hai, doctor ya trained responder ki salah ka replacement nahi.
//                 Shak ho to hamesha 108 / 112 par call karo.
//               </p>
//             </>
//           )}

//           <h3 className="ec-panel-title">{selected ? `${selected.title} ke liye best doctors` : "Top 5 doctors"}</h3>
//           <p className="ec-panel-sub">
//             {selected ? "Matching specialists pehle dikhaye gaye hain." : "Upar se condition chuno, sahi specialist pehle dikhega."}
//           </p>

//           <ul className="ec-docs">
//             {topDoctors.map((d) => {
//               const match = selected && d.handles.includes(selected.title);
//               return (
//                 <li key={d.id} className={`ec-doc ${match ? "is-match" : ""}`}>
//                   <div className="ec-doc-main">
//                     <span className="ec-avatar">{initials(d.name)}</span>
//                     <div>
//                       <p className="ec-doc-name">{d.name}{match && <span className="ec-badge">Recommended</span>}</p>
//                       <p className="ec-doc-sub">{d.specialty} · {d.hospital}</p>
//                       <p className="ec-doc-stats">
//                         <span><FaStar />{d.rating}</span>
//                         <span>{d.years} saal ka anubhav</span>
//                       </p>
//                     </div>
//                   </div>
//                   <a href={`tel:${d.phone}`} className="ec-btn ec-btn-primary"><FaPhoneAlt /> Doctor ko call</a>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═════════ 6) HISTORY ═════════ */
// function RequestLog({ log, clearLog }) {
//   if (log.length === 0) return null;
//   return (
//     <section className="ec ec-section">
//       <div className="ec-wrap" style={{ maxWidth: 720 }}>
//         <div className="ec-card">
//           <div className="ec-card-head">
//             <span className="ec-card-ico" style={{ background: "#e0f2fe", color: "#0284c7" }}><FaHistory /></span>
//             <div style={{ flex: 1 }}>
//               <div className="ec-card-title">Pichhle emergency messages</div>
//               <p className="ec-card-sub">Is device par bheje gaye aakhri 5</p>
//             </div>
//             <button type="button" className="ec-btn-outline ec-btn ec-btn-sm" onClick={clearLog}>Saaf karo</button>
//           </div>
//           <ul className="ec-log">
//             {log.map((l, i) => (
//               <li key={i}>
//                 <span>
//                   <b>{l.patient}</b>: {l.problem}
//                   <br />
//                   <small>{l.hospital} · {l.via}</small>
//                 </span>
//                 <small>{new Date(l.time).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</small>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═════════ 7) FAQ ═════════ */
// function EmergencyFAQ() {
//   const [open, setOpen] = useState(0);
//   return (
//     <section id="faq" className="ec ec-section alt">
//       <div className="ec-wrap" style={{ maxWidth: 820 }}>
//         <div className="ec-head">
//           <h2 className="ec-title">Aksar poochhe jaane wale sawal</h2>
//           <p className="ec-sub">Jab har minute keemti ho, tab ke liye chhote jawab.</p>
//         </div>
//         <div className="ec-faq-list">
//           {FAQS.map((f, i) => {
//             const isOpen = open === i;
//             return (
//               <div key={f.q} className={`ec-faq-item ${isOpen ? "is-open" : ""}`}>
//                 <h3 className="ec-faq-q">
//                   <button
//                     type="button"
//                     id={`faq-q-${i}`}
//                     aria-expanded={isOpen}
//                     aria-controls={`faq-a-${i}`}
//                     onClick={() => setOpen(isOpen ? -1 : i)}
//                     className="ec-faq-btn"
//                   >
//                     <span className="ec-faq-emoji" aria-hidden="true">{f.icon}</span>
//                     <span className="ec-faq-text">{f.q}</span>
//                     <FaChevronRight className="ec-faq-chev" />
//                   </button>
//                 </h3>
//                 <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="ec-faq-a">
//                   <p>{f.a}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═════════ 8) FOOTER ═════════ */
// function EmergencyFooter() {
//   const [email, setEmail] = useState("");
//   const [done, setDone] = useState(false);

//   const subscribe = (e) => {
//     e.preventDefault();
//     if (!email.trim()) return;
//     setDone(true);
//     setEmail("");
//   };

//   return (
//     <footer className="ec ec-foot">
//       <div className="ec-wrap">
//         <div className="ec-foot-grid">
//           <div className="ec-foot-brand">
//             <a href="#sos" className="ec-logo">
//               <span className="ec-logo-mark"><FaHeart /></span>
//               CarePoint
//             </a>
//             <p className="ec-foot-about">Tez emergency madad, nazdiki hospitals aur bharose ke doctors, sab ek jagah.</p>
//             <div className="ec-social">
//               {SOCIALS.map((s) => (
//                 <a key={s.label} href="#" aria-label={s.label}>{s.icon}</a>
//               ))}
//             </div>
//           </div>

//           {FOOTER_LINKS.map((col) => (
//             <nav key={col.title} aria-label={col.title}>
//               <h4 className="ec-foot-title">{col.title}</h4>
//               <ul>
//                 {col.links.map(([label, href]) => (
//                   <li key={label}><a href={href}>{label}</a></li>
//                 ))}
//               </ul>
//             </nav>
//           ))}

//           <form className="ec-foot-news" onSubmit={subscribe}>
//             <h4 className="ec-foot-title">Newsletter</h4>
//             <p className="ec-news-text">Health tips aur updates. Koi spam nahi.</p>
//             <div className="ec-news-row">
//               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email address" required />
//               <button type="submit" className="ec-btn ec-btn-primary">Subscribe</button>
//             </div>
//             {done && <p className="ec-news-ok" role="status">Shukriya! Aap subscribe ho gaye.</p>}
//           </form>
//         </div>

//         <div className="ec-foot-bottom">
//           <span>© {new Date().getFullYear()} CarePoint. All rights reserved.</span>
//           <span>Emergency mein <b>112</b> · Ambulance <b>108</b></span>
//         </div>
//       </div>
//     </footer>
//   );
// }

// /* ═════════ PAGE ═════════ */
// function Emergency() {
//   const [loc, locate] = useLocate();
//   const [medId, setMedId] = useState(() => ({ ...EMPTY_ID, ...readJSON("cp_medical_id", {}) }));
//   const [log, setLog] = useState(() => readJSON("cp_emergency_log", []));

//   useEffect(() => safeSet("cp_medical_id", JSON.stringify(medId)), [medId]);
//   useEffect(() => safeSet("cp_emergency_log", JSON.stringify(log)), [log]);

//   const addLog = (entry) => setLog((l) => [entry, ...l].slice(0, 5));
//   const clearLog = () => setLog([]);

//   return (
//     <div>
//       <Navbar />
//       <style>{EC_CSS}</style>

//       <SosHero loc={loc} locate={locate} />

//       <QuickTools />

//       <section className="ec ec-section alt">
//         <div className="ec-wrap">
//           <div className="ec-two">
//             <FamilyAlert loc={loc} medId={medId} />
//             <MedicalId medId={medId} setMedId={setMedId} />
//           </div>
//         </div>
//       </section>

//       <HospitalContact loc={loc} medId={medId} addLog={addLog} />
//       <EmergencyCheck />
//       <RequestLog log={log} clearLog={clearLog} />
//       <EmergencyFAQ />
//       <EmergencyFooter />
//     </div>
//   );
// }

// export default Emergency;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  FaHeart,
  FaBrain,
  FaCarCrash,
  FaTint,
  FaLungs,
  FaBone,
  FaBurn,
  FaAllergies,
  FaBaby,
  FaAmbulance,
  FaUserInjured,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaChevronRight,
  FaStar,
  FaCheckCircle,
  FaPaperPlane,
  FaSms,
  FaWhatsapp,
  FaLocationArrow,
  FaIdCard,
  FaUsers,
  FaHistory,
  FaShieldAlt,
  FaSearch,
  FaHeadset,
  FaAddressBook,
  FaArrowRight,
} from "react-icons/fa";

/* ═════════ CONFIG ═════════ */
const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/* ═════════ DATA (sample numbers: apne asli numbers daalo) ═════════ */
const EMERGENCY_NUMBERS = [
  { number: "108", label: "Ambulance", hint: "Free ambulance service" },
  { number: "112", label: "National emergency", hint: "Police, fire, medical" },
];

// Quick tools: `to` ko apne App.jsx ke routes se milao
const TOOLS = [
  {
    title: "Smart Contact List",
    desc: "Apne emergency contacts jodo aur star lagao, wo yahan alert mein dikhenge.",
    to: "/relatives",
    icon: <FaAddressBook />,
    bg: "#ede9fe",
    fg: "#7c3aed",
  },
  {
    title: "AI Safety Checker",
    desc: "Abhi ki situation likho, AI khatra aur agle kadam batayega.",
    to: "/safety-checker",
    icon: <FaSearch />,
    bg: "#ccfbf1",
    fg: "#0f766e",
    ai: true,
  },
  {
    title: "AI Safety Planner",
    desc: "Bimari ke hisaab se emergency care plan pehle se taiyaar rakho.",
    to: "/safety-planner",
    icon: <FaShieldAlt />,
    bg: "#dcfce7",
    fg: "#16a34a",
    ai: true,
  },
  {
    title: "Help & Support",
    desc: "Koi sawal ya dikkat? Hamari team madad ke liye hai.",
    to: "/help",
    icon: <FaHeadset />,
    bg: "#fef3c7",
    fg: "#d97706",
  },
];

const HOSPITALS = [
  { id: 1, name: "City Care Hospital", city: "Delhi", phone: "+919800000001" },
  { id: 2, name: "LifeLine Hospital", city: "Noida", phone: "+919800000002" },
  { id: 3, name: "Sunrise Medical", city: "Gurugram", phone: "+919800000003" },
  { id: 4, name: "Hope Hospital", city: "Jaipur", phone: "+919800000004" },
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const EMERGENCIES = [
  {
    icon: <FaHeart />, title: "Heart Attack", desc: "Chest pain, sweating", bg: "#fee2e2", fg: "#dc2626",
    doList: [
      "Turant 108 par call karo.",
      "Mareez ko aaram se baitha do ya aadha letao, chalne mat do.",
      "Kapde dhile karo (kasi hui shirt, belt).",
      "Agar mareez ko aspirin se allergy nahi hai aur doctor ne pehle yehi salah di thi, tabhi aspirin ke baare mein dispatcher/doctor se poochho.",
    ],
    dontList: ["Khaana-paani mat do.", "Mareez ko akela mat chhodo.", "Ambulance ka intezaar karne mein der mat karo."],
  },
  {
    icon: <FaBrain />, title: "Stroke", desc: "Speech difficulty", bg: "#ede9fe", fg: "#7c3aed",
    doList: [
      "Turant 108 par call karo. Ye FAST check hai: Face (chehra tedha), Arm (haath kamzor), Speech (bolne mein dikkat), Time (der mat karo).",
      "Pehle lakshan kab shuru hue, wo samay note karo aur doctor ko batao.",
      "Mareez ko sar thoda uthakar aaram se letao.",
    ],
    dontList: ["Khaana, paani ya dawai mat do.", "Soone do ya 'thik ho jayega' soch kar rukna mat."],
  },
  {
    icon: <FaCarCrash />, title: "Road Accident", desc: "Trauma & injuries", bg: "#ffedd5", fg: "#ea580c",
    doList: [
      "108 / 112 par call karo aur jagah batao.",
      "Khoon beh raha ho to saaf kapde se seedha dabav daalo.",
      "Sar, gardan aur peeth ko hilne se bachao.",
      "Gaadi ka engine band karo, aas-paas safe jagah banao.",
    ],
    dontList: ["Ghayal ko bina zaroorat hilao mat (aag ya khatra ho to hi hatao).", "Helmet khud mat utaaro."],
  },
  {
    icon: <FaTint />, title: "Heavy Bleeding", desc: "Blood loss", bg: "#ffe4e6", fg: "#e11d48",
    doList: [
      "Saaf kapde ya patti se ghaav par seedha, zor ka dabav daalo.",
      "Zakhmi hissa dil se upar rakho (agar haddi toot-ti na lage).",
      "Kapda khoon se bhig jaye to hatao mat, uske upar aur kapda rakho.",
      "Turant 108 par call karo.",
    ],
    dontList: ["Ghaav mein fansi cheez mat nikaalo.", "Tourniquet tabhi lagao jab training ho."],
  },
  {
    icon: <FaLungs />, title: "Breathing Problem", desc: "Asthma, choking", bg: "#dbeafe", fg: "#2563eb",
    doList: [
      "Mareez ko seedha baitha do, kapde dhile karo, taazi hawa do.",
      "Doctor ne inhaler diya ho to wahi use karwao.",
      "Saans ruk gayi ho (choking): peeth par 5 zor ke thap, phir pet par 5 jhatke (Heimlich).",
      "Saans na aaye to turant 108 par call karo.",
    ],
    dontList: ["Letao mat jab saans phool rahi ho.", "Munh mein ungli daal kar kuch nikaalne ki koshish mat karo."],
  },
  {
    icon: <FaBone />, title: "Bone Fracture", desc: "Broken bones", bg: "#fef9c3", fg: "#a16207",
    doList: [
      "Toote hisse ko hilne se bachao, lakdi ya moti kitaab se sahara (splint) do.",
      "Kapde mein lapeta hua baraf lagao, seedha skin par nahi.",
      "Doctor ya hospital tak turant pahuncho.",
    ],
    dontList: ["Haddi ko seedha karne ki koshish mat karo.", "Ghayal hisse par bhaar mat daalo."],
  },
  {
    icon: <FaBurn />, title: "Burn Injury", desc: "Thermal or chemical", bg: "#fef3c7", fg: "#d97706",
    doList: [
      "Jale hisse par 10-20 minute behta saada paani daalo.",
      "Angoothi, ghadi, tight kapde jaldi hatao (sujan se pehle).",
      "Saaf, geele ya non-stick kapde se dhak do.",
      "Bada ya chehre/haath wala jalna ho to 108 par call karo.",
    ],
    dontList: ["Baraf, toothpaste, makkhan ya tel mat lagao.", "Chhale mat phodo."],
  },
  {
    icon: <FaAllergies />, title: "Allergic Reaction", desc: "Swelling & breathing issues", bg: "#fce7f3", fg: "#db2777",
    doList: [
      "Jis cheez se allergy hai, wo turant hatao.",
      "Doctor ne adrenaline auto-injector diya ho to use karo.",
      "Saans mein dikkat ya chehra/gala sujne par turant 108 par call karo.",
    ],
    dontList: ["Mareez ko akela mat chhodo.", "Bina doctor ki salah ke nayi dawai mat do."],
  },
  {
    icon: <FaBaby />, title: "Child Emergency", desc: "Urgent child care", bg: "#dcfce7", fg: "#16a34a",
    doList: [
      "Khud shaant raho aur bachche ko shaant rakho.",
      "Daura pade to bachche ko karwat par letao, aas-paas se sakht cheezein hatao.",
      "Turant 108 par call karo aur umar, vajan aur lakshan batao.",
    ],
    dontList: ["Munh mein kuch mat daalo.", "Bade logon wali dawai mat do."],
  },
  {
    icon: <FaAmbulance />, title: "Blood Requirement", desc: "Urgent blood needed", bg: "#fee2e2", fg: "#b91c1c",
    doList: [
      "Hospital ke blood bank se seedha sampark karo (neeche hospital list se call karo).",
      "Mareez ka blood group, hospital ka naam aur doctor ki parchi saath rakho.",
      "Parivaar ke logon ko bhi bata do, taaki donor ke liye taiyaar rahein.",
    ],
    dontList: ["Anjaan logon ya agents ko paise dekar blood mat lo.", "Sirf hospital ya licensed blood bank se hi blood lo."],
  },
  {
    icon: <FaUserInjured />, title: "Other Emergency", desc: "General emergency", bg: "#f1f5f9", fg: "#475569",
    doList: [
      "Mareez ko surakshit jagah par rakho aur akela mat chhodo.",
      "Lakshan aur samay note karo.",
      "Turant 108 / 112 par call karo.",
    ],
    dontList: ["Bina jaankari ke dawai mat do.", "Intezaar mat karo, shak ho to call karo."],
  },
];

// Sample doctors: apni API / DB se badlo. `handles` = upar ke condition titles.
const DOCTORS = [
  { id: 1, name: "Dr. Anil Mehra", specialty: "Cardiologist", hospital: "City Care Hospital", rating: 4.9, years: 18, phone: "+919800000011", handles: ["Heart Attack"] },
  { id: 2, name: "Dr. Sneha Kapoor", specialty: "Neurologist", hospital: "LifeLine Hospital", rating: 4.8, years: 14, phone: "+919800000012", handles: ["Stroke"] },
  { id: 3, name: "Dr. Rohit Sinha", specialty: "Trauma & Orthopedic Surgeon", hospital: "Sunrise Medical", rating: 4.8, years: 16, phone: "+919800000013", handles: ["Road Accident", "Bone Fracture", "Heavy Bleeding"] },
  { id: 4, name: "Dr. Farah Khan", specialty: "Pulmonologist", hospital: "City Care Hospital", rating: 4.7, years: 12, phone: "+919800000014", handles: ["Breathing Problem", "Allergic Reaction"] },
  { id: 5, name: "Dr. Meera Iyer", specialty: "Pediatrician", hospital: "Hope Hospital", rating: 4.9, years: 15, phone: "+919800000015", handles: ["Child Emergency"] },
  { id: 6, name: "Dr. Vikram Rao", specialty: "Emergency Medicine", hospital: "LifeLine Hospital", rating: 4.6, years: 11, phone: "+919800000016", handles: ["Other Emergency", "Blood Requirement", "Heavy Bleeding"] },
  { id: 7, name: "Dr. Kavita Desai", specialty: "Burn & Plastic Surgeon", hospital: "Sunrise Medical", rating: 4.7, years: 13, phone: "+919800000017", handles: ["Burn Injury"] },
];

const FAQS = [
  { icon: "🚑", q: "Emergency mein ambulance kaise bulayein?", a: "Sabse tez tareeka 108 par call karna hai. Upar 'Meri location bhejo' dabakar apni location share karo aur 108 operator ko jagah batao. Hospital ko message bhi bhej sakte ho." },
  { icon: "❤️", q: "Kisi ko heart attack aaye to kya karein?", a: "Turant 108 par call karo, mareez ko aaram se baitha do aur kapde dhile karo. Khaana-paani mat do. Mareez behosh ho jaye aur saans na le to CPR (agar aapko aati ho) shuru karo." },
  { icon: "🪪", q: "Medical ID kyun banayein?", a: "Isme aapka blood group, allergy, bimari aur dawaiyan hoti hain. Emergency message mein ye apne aap judta hai, taaki doctor ko jaldi sahi jaankari mile. Ye data sirf aapke phone/browser mein rehta hai." },
  { icon: "👨‍👩‍👧", q: "Parivaar ko kaise alert karun?", a: "Smart Contact List (Relatives) mein jin logon par star lagaya hai, wo yahan 'Parivaar ko alert karo' mein dikhte hain. Ek tap mein call ya WhatsApp se aapki location ke saath message bhej sakte ho." },
  { icon: "🏥", q: "Hospital kaise chunein?", a: "Sabse nazdiki hospital chuno jahan emergency department 24x7 chalta ho. Bahut serious halat mein 108 operator se poochho ki kaunsa hospital sahi rahega." },
];

const FOOTER_LINKS = [
  { title: "Services", links: [["Emergency care", "#sos"], ["Quick tools", "#tools"], ["Parivaar ko alert", "#family"], ["Nearby hospitals", "#hospitals"], ["First aid guide", "#emergency-check"]] },
  { title: "Company", links: [["About us", "#"], ["Our doctors", "#"], ["Contact", "#"], ["Careers", "#"]] },
  { title: "Legal", links: [["Terms of use", "#"], ["Privacy policy", "#"], ["Cookie policy", "#"]] },
];

const SOCIALS = [
  { label: "Facebook", icon: <FaFacebookF /> },
  { label: "Instagram", icon: <FaInstagram /> },
  { label: "LinkedIn", icon: <FaLinkedinIn /> },
  { label: "Twitter", icon: <FaTwitter /> },
  { label: "YouTube", icon: <FaYoutube /> },
];

/* ═════════ HELPERS ═════════ */
const formatPhone = (p) => p.replace(/^\+91(\d{5})(\d{5})$/, "+91 $1 $2");
const initials = (name) => name.replace("Dr. ", "").split(" ").map((w) => w[0]).join("");
const safeGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const safeSet = (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } };
const readJSON = (k, fallback) => { try { return JSON.parse(safeGet(k)) ?? fallback; } catch { return fallback; } };

const EMPTY_ID = { name: "", age: "", blood: "", allergies: "", conditions: "", medicines: "", contactName: "", contactPhone: "" };

function useLocate() {
  const [loc, setLoc] = useState({ status: "idle", link: "", msg: "" });
  const locate = () => {
    if (!navigator.geolocation) {
      return setLoc({ status: "error", link: "", msg: "Is browser mein location support nahi hai." });
    }
    setLoc({ status: "loading", link: "", msg: "" });
    navigator.geolocation.getCurrentPosition(
      (p) =>
        setLoc({
          status: "ok",
          link: `https://maps.google.com/?q=${p.coords.latitude.toFixed(6)},${p.coords.longitude.toFixed(6)}`,
          msg: "",
        }),
      () => setLoc({ status: "error", link: "", msg: "Location nahi mili. Permission allow karo ya address khud likho." }),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };
  return [loc, locate];
}

function buildMessage({ form, medId, includeId, link }) {
  const blood = form.blood || (includeId ? medId.blood : "");
  const lines = [
    `EMERGENCY: Patient ${form.name.trim() || "-"} needs urgent help.`,
    `Problem: ${form.problem.trim() || "-"}`,
    blood && `Blood group: ${blood}`,
    form.address.trim() && `Address: ${form.address.trim()}`,
    link && `Live location: ${link}`,
  ];
  if (includeId) {
    lines.push(
      medId.age && `Age: ${medId.age}`,
      medId.allergies && `Allergies: ${medId.allergies}`,
      medId.conditions && `Conditions: ${medId.conditions}`,
      medId.medicines && `Medicines: ${medId.medicines}`
    );
  }
  lines.push(form.note.trim() && `Note: ${form.note.trim()}`);
  return lines.filter(Boolean).join("\n");
}

/* ═════════ STYLES ═════════ */
const EC_CSS = `
.ec,.ec *{box-sizing:border-box}
.ec{text-align:left;color:#0f172a}
.ec h2,.ec h3,.ec h4,.ec p,.ec ul{margin:0;padding:0}
.ec-section{padding:44px 16px;background:#fff}
.ec-section.alt{background:#f8fafc}
.ec-wrap{max-width:1180px;margin:0 auto}
.ec-head{text-align:center;margin-bottom:28px}
.ec-title{font-size:clamp(1.5rem,4.5vw,2.1rem);font-weight:800;text-align:center;margin-bottom:8px!important}
.ec-sub{color:#64748b;text-align:center;font-size:.95rem}
.ec-h3{font-size:1.1rem;font-weight:700;margin-bottom:12px!important}

.ec-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 16px;border-radius:10px;border:1px solid transparent;font:inherit;font-size:.9rem;font-weight:600;cursor:pointer;text-decoration:none;white-space:nowrap;transition:background .15s}
.ec-btn-primary{background:#0891b2;color:#fff}.ec-btn-primary:hover{background:#0e7490}
.ec-btn-outline{background:#fff;color:#334155;border-color:#cbd5e1}.ec-btn-outline:hover{background:#f1f5f9}
.ec-btn-green{background:#16a34a;color:#fff}.ec-btn-green:hover{background:#15803d}
.ec-btn-red{background:#dc2626;color:#fff}.ec-btn-red:hover{background:#b91c1c}
.ec-btn-redline{background:#fff;color:#dc2626;border-color:#fecaca}
.ec-btn-sm{padding:7px 12px;font-size:.82rem;border-radius:8px}
.ec-disabled{opacity:.45;pointer-events:none}

/* HERO / SOS */
.ec-hero{padding:28px 16px;background:linear-gradient(135deg,#7f1d1d,#b91c1c 55%,#dc2626)}
.ec-hero-in{max-width:1180px;margin:0 auto;display:grid;gap:20px}
.ec-hero-tag{display:inline-flex;align-items:center;gap:8px;padding:5px 12px;border-radius:99px;background:rgba(255,255,255,.16);color:#fff;font-size:.78rem;font-weight:700}
.ec-hero-dot{width:8px;height:8px;border-radius:50%;background:#fff}
.ec-hero h1{margin:10px 0 0;font-size:clamp(1.7rem,5vw,2.6rem);font-weight:800;line-height:1.15;color:#fff}
.ec-hero p{margin:8px 0 0;max-width:520px;color:#fecaca;font-size:.95rem;line-height:1.6}
.ec-sos{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ec-sos-btn{display:flex;align-items:center;gap:12px;padding:14px;border-radius:16px;background:#fff;color:#7f1d1d;text-decoration:none;box-shadow:0 8px 20px rgba(0,0,0,.18)}
.ec-sos-ico{width:44px;height:44px;border-radius:50%;background:#fee2e2;color:#dc2626;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex:none}
.ec-sos-txt{display:flex;flex-direction:column;min-width:0}
.ec-sos-txt strong{font-size:1.5rem;line-height:1.1}
.ec-sos-txt small{margin-top:2px;color:#64748b;font-size:.75rem}
.ec-loc{grid-column:1/-1;display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:16px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);color:#fff;font:inherit;text-align:left;cursor:pointer}
.ec-loc b{display:block;font-size:.95rem}
.ec-loc span{display:block;margin-top:2px;font-size:.78rem;color:#fecaca;word-break:break-all}
.ec-loc.ok{background:rgba(22,163,74,.3);border-color:#86efac}
.ec-loc-ico{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex:none}
.ec-quick{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.ec-quick a{padding:7px 13px;border-radius:99px;background:rgba(255,255,255,.16);color:#fff;font-size:.82rem;font-weight:600;text-decoration:none}
.ec-quick a:hover{background:rgba(255,255,255,.28)}

/* QUICK TOOLS */
.ec-tools-grid{display:grid;grid-template-columns:1fr;gap:12px}
.ec-tool{position:relative;display:flex;align-items:flex-start;gap:14px;padding:16px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;color:inherit;text-decoration:none;transition:border-color .15s,box-shadow .15s}
.ec-tool:hover{border-color:#0891b2;box-shadow:0 6px 16px rgba(8,145,178,.1)}
.ec-tool:focus-visible{outline:2px solid #0891b2;outline-offset:2px}
.ec-tool-ico{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex:none}
.ec-tool-body{flex:1;min-width:0}
.ec-tool-title{display:flex;align-items:center;gap:8px;font-size:1rem;font-weight:700}
.ec-tool-ai{padding:1px 8px;border-radius:99px;background:#ecfdf5;border:1px solid #a7f3d0;color:#047857;font-size:.65rem;font-weight:800}
.ec-tool-desc{margin-top:4px!important;color:#64748b;font-size:.85rem;line-height:1.5}
.ec-tool-go{margin-top:10px;display:inline-flex;align-items:center;gap:6px;color:#0891b2;font-size:.82rem;font-weight:700}

/* TOP GRID (family + medical id) */
.ec-two{display:grid;gap:20px;align-items:start}
.ec-card{padding:20px;background:#fff;border:1px solid #e2e8f0;border-radius:16px}
.ec-card.tint{background:#f8fafc}
.ec-card-head{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.ec-card-ico{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex:none;font-size:1rem}
.ec-card-title{font-size:1.05rem;font-weight:700}
.ec-card-sub{margin-top:2px!important;color:#64748b;font-size:.82rem}
.ec-empty{padding:16px;border:1.5px dashed #cbd5e1;border-radius:12px;color:#64748b;font-size:.88rem;line-height:1.55;text-align:center}
.ec-empty a{color:#0891b2;font-weight:600}
.ec-people{list-style:none;display:flex;flex-direction:column;gap:10px}
.ec-person{display:flex;flex-direction:column;gap:10px;padding:12px;border:1px solid #e2e8f0;border-radius:12px;background:#fff}
.ec-person-name{font-weight:700;font-size:.95rem}
.ec-person-meta{margin-top:2px!important;color:#64748b;font-size:.82rem}
.ec-row{display:flex;gap:8px;flex-wrap:wrap}

.ec-id-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ec-id-full{grid-column:1/-1}
.ec-lab{display:flex;flex-direction:column;gap:5px;font-size:.78rem;font-weight:600;color:#475569}
.ec-input{display:block;width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:10px;background:#fff;color:#0f172a;font:inherit;font-size:.9rem;outline:none}
.ec-input:focus{border-color:#0891b2;box-shadow:0 0 0 3px rgba(8,145,178,.15)}
textarea.ec-input{resize:none}
.ec-idview{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ec-idcell{padding:10px 12px;border-radius:10px;background:#f8fafc;border:1px solid #eef2f6}
.ec-idcell small{display:block;color:#94a3b8;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
.ec-idcell b{display:block;margin-top:2px;font-size:.9rem;word-break:break-word}
.ec-blood{display:inline-flex;align-items:center;justify-content:center;min-width:46px;padding:4px 10px;border-radius:99px;background:#dc2626;color:#fff;font-weight:800}
.ec-note{margin-top:10px!important;color:#94a3b8;font-size:.75rem;line-height:1.5}

/* HOSPITALS + COMPOSER */
.ec-hotlines{display:grid;grid-template-columns:1fr;gap:12px;max-width:780px;margin:0 auto 32px}
.ec-filter{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}
.ec-chip{padding:7px 14px;border-radius:99px;border:1.5px solid #e2e8f0;background:#fff;color:#475569;font:inherit;font-size:.82rem;font-weight:600;cursor:pointer}
.ec-chip.on{background:#0891b2;border-color:#0891b2;color:#fff}
.ec-split{display:grid;gap:24px;align-items:start}
.ec-list{list-style:none;display:flex;flex-direction:column;gap:12px}
.ec-hosp{display:flex;flex-direction:column;gap:12px;padding:16px;background:#fff;border:1px solid #e2e8f0;border-radius:16px}
.ec-hosp.is-active{border-color:#0891b2;background:#ecfeff;box-shadow:0 0 0 1px #0891b2}
.ec-name{font-weight:700}
.ec-meta{display:flex;align-items:center;gap:6px;margin-top:4px!important;color:#64748b;font-size:.85rem}
.ec-meta svg{color:#0891b2}
.ec-phone{margin-top:3px!important;color:#475569;font-size:.85rem}
.ec-to{margin:2px 0 14px!important;color:#64748b;font-size:.88rem}
.ec-to b{color:#0f172a}
.ec-field{margin-bottom:10px}
.ec-check{display:flex;align-items:center;gap:8px;margin:2px 0 12px;font-size:.85rem;color:#334155;cursor:pointer}
.ec-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ec-hint{margin-top:10px!important;color:#94a3b8;font-size:.8rem;text-align:center}
.ec-preview{margin:0 0 12px;padding:10px 12px;border-radius:10px;background:#fff;border:1px dashed #cbd5e1;color:#475569;font:inherit;font-size:.78rem;line-height:1.5;white-space:pre-wrap;max-height:130px;overflow:auto}

/* LOG */
.ec-log{list-style:none;display:flex;flex-direction:column;gap:8px;margin-top:12px}
.ec-log li{display:flex;justify-content:space-between;gap:10px;padding:10px 12px;border-radius:10px;background:#f8fafc;border:1px solid #eef2f6;font-size:.85rem}
.ec-log small{color:#94a3b8}

/* CHECK */
.ec-conds{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.ec-cond{position:relative;display:flex;flex-direction:column;align-items:flex-start;padding:14px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;font:inherit;text-align:left;cursor:pointer}
.ec-cond:hover{border-color:#94a3b8}
.ec-cond:focus-visible{outline:2px solid #0891b2;outline-offset:2px}
.ec-cond.is-active{border-color:#0891b2;box-shadow:0 0 0 2px #0891b2}
.ec-ico{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.15rem;margin-bottom:10px}
.ec-cond-title{font-weight:700;font-size:.95rem;color:#0f172a}
.ec-cond-desc{margin-top:3px;color:#64748b;font-size:.78rem}
.ec-tick{position:absolute;top:10px;right:10px;color:#0891b2}
.ec-panel{margin-top:32px;padding:18px;background:#fff;border:1px solid #e2e8f0;border-radius:20px;scroll-margin-top:90px}
.ec-alert{display:flex;flex-direction:column;gap:12px;margin-bottom:18px;padding:14px;background:#fef2f2;border:1px solid #fecaca;border-radius:14px}
.ec-alert b{display:block;color:#b91c1c}
.ec-alert span{display:block;margin-top:2px;color:#dc2626;font-size:.85rem}
.ec-aid{display:grid;gap:12px;margin-bottom:22px}
.ec-aid-box{padding:14px;border-radius:14px}
.ec-aid-box.do{background:#f0fdf4;border:1px solid #bbf7d0}
.ec-aid-box.dont{background:#fff7ed;border:1px solid #fed7aa}
.ec-aid-box h4{font-size:.9rem;font-weight:800;margin-bottom:8px!important}
.ec-aid-box.do h4{color:#166534}
.ec-aid-box.dont h4{color:#9a3412}
.ec-aid-box ul{list-style:none;display:flex;flex-direction:column;gap:7px}
.ec-aid-box li{position:relative;padding-left:16px;font-size:.86rem;line-height:1.5;color:#334155}
.ec-aid-box li::before{content:"";position:absolute;left:2px;top:.55em;width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.6}
.ec-disc{margin-bottom:18px!important;color:#94a3b8;font-size:.76rem;line-height:1.5}
.ec-panel-title{font-size:1.25rem;font-weight:800}
.ec-panel-sub{margin:4px 0 16px!important;color:#64748b;font-size:.88rem}
.ec-docs{list-style:none;display:flex;flex-direction:column;gap:12px}
.ec-doc{display:flex;flex-direction:column;gap:12px;padding:14px;border:1px solid #e2e8f0;border-radius:14px}
.ec-doc.is-match{border-color:#0891b2;background:#ecfeff}
.ec-doc-main{display:flex;align-items:center;gap:12px;flex:1;min-width:0}
.ec-avatar{width:46px;height:46px;border-radius:50%;background:#cffafe;color:#0e7490;font-weight:700;display:flex;align-items:center;justify-content:center;flex:none}
.ec-doc-name{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-weight:700}
.ec-badge{background:#0891b2;color:#fff;padding:2px 10px;border-radius:99px;font-size:.7rem;font-weight:500}
.ec-doc-sub{margin-top:2px!important;color:#475569;font-size:.85rem}
.ec-doc-stats{display:flex;align-items:center;gap:14px;margin-top:4px!important;color:#64748b;font-size:.8rem}
.ec-doc-stats svg{color:#fbbf24;margin-right:4px;vertical-align:-1px}

/* FAQ */
.ec-faq{display:grid;gap:24px}
.ec-faq-list{display:flex;flex-direction:column;gap:10px}
.ec-faq-item{background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden}
.ec-faq-item.is-open{border-color:#0891b2}
.ec-faq-q{font-size:1rem}
.ec-faq-btn{display:flex;align-items:center;gap:12px;width:100%;padding:14px;background:transparent;border:0;color:#0f172a;font:inherit;font-weight:600;text-align:left;cursor:pointer}
.ec-faq-emoji{width:36px;height:36px;border-radius:50%;background:#ecfeff;display:flex;align-items:center;justify-content:center;font-size:1.05rem;flex:none}
.ec-faq-text{flex:1;line-height:1.4}
.ec-faq-chev{flex:none;color:#64748b;font-size:.8rem}
.is-open .ec-faq-chev{transform:rotate(90deg);color:#0891b2}
.ec-faq-a{display:none}
.is-open .ec-faq-a{display:block}
.ec-faq-a p{padding:0 14px 16px;color:#475569;font-size:.92rem;line-height:1.7}

/* FOOTER */
.ec-foot{background:#0f172a;color:#cbd5e1;padding:44px 16px 22px}
.ec-foot-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:28px 20px}
.ec-foot-brand,.ec-foot-news{grid-column:1/-1}
.ec-logo{display:inline-flex;align-items:center;gap:10px;color:#fff;font-size:1.3rem;font-weight:700;text-decoration:none}
.ec-logo-mark{width:38px;height:38px;border-radius:10px;background:#0891b2;display:flex;align-items:center;justify-content:center;font-size:1rem}
.ec-foot-about{margin-top:12px!important;max-width:340px;color:#94a3b8;font-size:.9rem;line-height:1.65}
.ec-social{display:flex;gap:10px;margin-top:16px}
.ec-social a{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.08);color:#e2e8f0;display:flex;align-items:center;justify-content:center;text-decoration:none}
.ec-social a:hover{background:#0891b2;color:#fff}
.ec-foot-title{margin-bottom:12px!important;color:#fff;font-size:.95rem;font-weight:600}
.ec-foot ul{list-style:none;display:flex;flex-direction:column;gap:10px}
.ec-foot ul a{color:#94a3b8;font-size:.9rem;text-decoration:none}
.ec-foot ul a:hover{color:#fff}
.ec-news-text{margin-bottom:10px!important;color:#94a3b8;font-size:.9rem}
.ec-news-row{display:flex;flex-direction:column;gap:10px;max-width:420px}
.ec-news-row input{width:100%;padding:10px 14px;border:1px solid #334155;border-radius:10px;background:#1e293b;color:#fff;font:inherit;font-size:.9rem;outline:none}
.ec-news-ok{margin-top:10px!important;color:#4ade80;font-size:.85rem}
.ec-foot-bottom{display:flex;flex-direction:column;gap:8px;margin-top:36px;padding-top:18px;border-top:1px solid #1e293b;color:#64748b;font-size:.85rem}
.ec-foot-bottom b{color:#f87171}

@media(min-width:640px){
  .ec-section{padding:60px 24px}
  .ec-hero{padding:40px 24px}
  .ec-hotlines{grid-template-columns:1fr 1fr}
  .ec-tools-grid{grid-template-columns:repeat(2,1fr);gap:16px}
  .ec-person,.ec-hosp,.ec-doc{flex-direction:row;align-items:center;justify-content:space-between}
  .ec-conds{grid-template-columns:repeat(3,1fr);gap:16px}
  .ec-panel{padding:28px}
  .ec-alert{flex-direction:row;align-items:center;justify-content:space-between}
  .ec-aid{grid-template-columns:1fr 1fr}
}
@media(min-width:900px){
  .ec-hero-in{grid-template-columns:1.1fr 1fr;align-items:center;gap:32px}
  .ec-tools-grid{grid-template-columns:repeat(4,1fr)}
  .ec-tool{flex-direction:column}
  .ec-two{grid-template-columns:1fr 1fr;gap:24px}
  .ec-split{grid-template-columns:3fr 2fr;gap:28px}
  .ec-conds{grid-template-columns:repeat(4,1fr)}
  .ec-card.sticky{position:sticky;top:96px}
}
@media(min-width:768px){
  .ec-foot-grid{grid-template-columns:repeat(3,1fr)}
  .ec-news-row{flex-direction:row}
  .ec-foot-bottom{flex-direction:row;justify-content:space-between}
}
@media(min-width:1024px){
  .ec-foot-grid{grid-template-columns:1.5fr 1fr 1fr 1fr 1.6fr;gap:32px}
  .ec-foot-brand,.ec-foot-news{grid-column:auto}
  .ec-news-row{flex-direction:column}
}
`;

/* ═════════ 1) HERO / SOS ═════════ */
function SosHero({ loc, locate }) {
  return (
    <section id="sos" className="ec ec-hero">
      <div className="ec-hero-in">
        <div>
          <span className="ec-hero-tag"><span className="ec-hero-dot" /> 24x7 Emergency Help</span>
          <h1>Emergency mein hain? Pehle call karo.</h1>
          <p>
            Ek tap mein ambulance bulao, apni location bhejo aur parivaar ko alert karo. Neeche first aid ke
            steps bhi milenge.
          </p>
          <div className="ec-quick" style={{ marginTop: 14 }}>
            <a href="#tools">🧰 Quick tools</a>
            <a href="#family">👨‍👩‍👧 Parivaar ko alert</a>
            <a href="#medical-id">🪪 Medical ID</a>
            <a href="#hospitals">🏥 Hospitals</a>
            <a href="#emergency-check">🩺 First aid</a>
          </div>
        </div>

        <div className="ec-sos">
          {EMERGENCY_NUMBERS.map((n) => (
            <a key={n.number} href={`tel:${n.number}`} className="ec-sos-btn">
              <span className="ec-sos-ico">{n.number === "108" ? <FaAmbulance /> : <FaPhoneAlt />}</span>
              <span className="ec-sos-txt">
                <strong>{n.number}</strong>
                <small>{n.label}</small>
              </span>
            </a>
          ))}

          <button type="button" className={`ec-loc ${loc.status === "ok" ? "ok" : ""}`} onClick={locate}>
            <span className="ec-loc-ico"><FaLocationArrow /></span>
            <span style={{ minWidth: 0 }}>
              <b>
                {loc.status === "ok"
                  ? "Location mil gayi"
                  : loc.status === "loading"
                  ? "Location dhundh rahe hain..."
                  : "Meri location bhejo"}
              </b>
              <span>
                {loc.status === "ok" && loc.link}
                {loc.status === "error" && loc.msg}
                {(loc.status === "idle" || loc.status === "loading") &&
                  "Dabao, ye location neeche ke sab messages mein judegi."}
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═════════ 2) QUICK TOOLS ═════════ */
function QuickTools() {
  return (
    <section id="tools" className="ec ec-section">
      <div className="ec-wrap">
        <div className="ec-head" style={{ marginBottom: 22 }}>
          <h2 className="ec-title">Quick Tools</h2>
          <p className="ec-sub">Emergency se pehle aur baad ke zaroori tools, ek hi jagah.</p>
        </div>

        <div className="ec-tools-grid">
          {TOOLS.map((t) => (
            <Link key={t.title} to={t.to} className="ec-tool">
              <span className="ec-tool-ico" style={{ background: t.bg, color: t.fg }}>{t.icon}</span>
              <span className="ec-tool-body">
                <span className="ec-tool-title">
                  {t.title}
                  {t.ai && <span className="ec-tool-ai">AI</span>}
                </span>
                <p className="ec-tool-desc">{t.desc}</p>
                <span className="ec-tool-go">Open<FaArrowRight size={11} /></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════ 3) FAMILY ALERT + MEDICAL ID ═════════ */
function FamilyAlert({ loc, medId }) {
  const [state, setState] = useState({ status: "loading", list: [] });

  useEffect(() => {
    let alive = true;
    fetch(`${API}/relatives`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (!alive) return;
        const all = Array.isArray(data) ? data : [];
        setState({ status: "ok", list: all.filter((p) => p.isEmergency) });
      })
      .catch(() => alive && setState({ status: "error", list: [] }));
    return () => { alive = false; };
  }, []);

  const msg = `EMERGENCY: ${medId.name.trim() || "Mujhe"} ko madad chahiye. Turant call karo.${
    loc.link ? `\nLocation: ${loc.link}` : ""
  }`;

  return (
    <div className="ec-card" id="family">
      <div className="ec-card-head">
        <span className="ec-card-ico" style={{ background: "#ede9fe", color: "#7c3aed" }}><FaUsers /></span>
        <div>
          <div className="ec-card-title">Parivaar ko alert karo</div>
          <p className="ec-card-sub">Aapke star lagaye emergency contacts</p>
        </div>
      </div>

      {state.status === "loading" && <div className="ec-empty">Contacts load ho rahe hain...</div>}

      {state.status === "error" && (
        <div className="ec-empty">
          Contacts load nahi ho paye. Server (port 3000) chal raha hai? Tab tak 108 / 112 par call karo.
        </div>
      )}

      {state.status === "ok" && state.list.length === 0 && (
        <div className="ec-empty">
          Abhi koi emergency contact nahi hai. <Link to="/relatives">Smart Contact List</Link> mein kisi ko star karo,
          wo yahan dikhega.
        </div>
      )}

      {state.status === "ok" && state.list.length > 0 && (
        <ul className="ec-people">
          {state.list.map((p) => (
            <li key={p._id} className="ec-person">
              <div>
                <div className="ec-person-name">{p.name}</div>
                <p className="ec-person-meta">{p.relation} · +91 {p.phone}</p>
              </div>
              <div className="ec-row">
                <a href={`tel:+91${p.phone}`} className="ec-btn ec-btn-primary ec-btn-sm"><FaPhoneAlt /> Call</a>
                <a
                  href={`https://wa.me/91${p.phone}?text=${encodeURIComponent(msg)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="ec-btn ec-btn-green ec-btn-sm"
                >
                  <FaWhatsapp /> Alert
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!loc.link && <p className="ec-note">Tip: upar "Meri location bhejo" dabao, to message mein location bhi judegi.</p>}
    </div>
  );
}

function MedicalId({ medId, setMedId }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(medId);
  const hasData = Object.values(medId).some((v) => String(v).trim());

  const set = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }));
  const save = () => { setMedId(draft); setEditing(false); };
  const startEdit = () => { setDraft(medId); setEditing(true); };

  return (
    <div className="ec-card tint" id="medical-id">
      <div className="ec-card-head">
        <span className="ec-card-ico" style={{ background: "#fee2e2", color: "#dc2626" }}><FaIdCard /></span>
        <div style={{ flex: 1 }}>
          <div className="ec-card-title">Meri Medical ID</div>
          <p className="ec-card-sub">Emergency message mein apne aap judti hai</p>
        </div>
        {!editing && (
          <button type="button" className="ec-btn-outline ec-btn ec-btn-sm" onClick={startEdit}>
            {hasData ? "Edit" : "Banao"}
          </button>
        )}
      </div>

      {editing ? (
        <>
          <div className="ec-id-grid">
            <label className="ec-lab">Naam<input className="ec-input" value={draft.name} onChange={set("name")} placeholder="Ramesh Kumar" /></label>
            <label className="ec-lab">Umar<input className="ec-input" type="number" inputMode="numeric" value={draft.age} onChange={set("age")} placeholder="62" /></label>
            <label className="ec-lab">Blood group
              <select className="ec-input" value={draft.blood} onChange={set("blood")}>
                <option value="">Chuno</option>
                {BLOOD_GROUPS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </label>
            <label className="ec-lab">Allergies<input className="ec-input" value={draft.allergies} onChange={set("allergies")} placeholder="Penicillin, moongfali" /></label>
            <label className="ec-lab ec-id-full">Bimariyan<input className="ec-input" value={draft.conditions} onChange={set("conditions")} placeholder="Diabetes, BP" /></label>
            <label className="ec-lab ec-id-full">Chal rahi dawaiyan<input className="ec-input" value={draft.medicines} onChange={set("medicines")} placeholder="Dawai ke naam" /></label>
            <label className="ec-lab">Emergency contact<input className="ec-input" value={draft.contactName} onChange={set("contactName")} placeholder="Naam" /></label>
            <label className="ec-lab">Unka number<input className="ec-input" type="tel" inputMode="tel" value={draft.contactPhone} onChange={set("contactPhone")} placeholder="98765 43210" /></label>
          </div>
          <div className="ec-row" style={{ marginTop: 14 }}>
            <button type="button" className="ec-btn ec-btn-primary" onClick={save}>Save karo</button>
            <button type="button" className="ec-btn-outline ec-btn" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </>
      ) : hasData ? (
        <div className="ec-idview">
          {medId.name && <div className="ec-idcell"><small>Naam</small><b>{medId.name}{medId.age && `, ${medId.age}`}</b></div>}
          {medId.blood && <div className="ec-idcell"><small>Blood group</small><span className="ec-blood">{medId.blood}</span></div>}
          {medId.allergies && <div className="ec-idcell"><small>Allergies</small><b>{medId.allergies}</b></div>}
          {medId.conditions && <div className="ec-idcell"><small>Bimariyan</small><b>{medId.conditions}</b></div>}
          {medId.medicines && <div className="ec-idcell ec-id-full"><small>Dawaiyan</small><b>{medId.medicines}</b></div>}
          {medId.contactName && (
            <div className="ec-idcell ec-id-full">
              <small>Emergency contact</small>
              <b>{medId.contactName} {medId.contactPhone && `· ${medId.contactPhone}`}</b>
            </div>
          )}
        </div>
      ) : (
        <div className="ec-empty">Abhi khaali hai. Blood group, allergy aur dawaiyan likh do, emergency mein kaam aayega.</div>
      )}
      <p className="ec-note">Ye jaankari sirf aapke is browser/phone mein save hoti hai, server par nahi jaati.</p>
    </div>
  );
}

/* ═════════ 4) HOSPITALS + MESSAGE ═════════ */
function HospitalContact({ loc, medId, addLog }) {
  const cities = ["All", ...new Set(HOSPITALS.map((h) => h.city))];
  const [city, setCity] = useState("All");
  const [hospitalId, setHospitalId] = useState(HOSPITALS[0].id);
  const [form, setForm] = useState({ name: "", problem: "", blood: "", address: "", note: "" });
  const [includeId, setIncludeId] = useState(true);

  const shown = HOSPITALS.filter((h) => city === "All" || h.city === city);
  const hospital = HOSPITALS.find((h) => h.id === hospitalId);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Medical ID se naam aur blood group prefill (sirf jab form khaali ho)
  const nameVal = form.name || medId.name;
  const finalForm = { ...form, name: nameVal };
  const ready = finalForm.name.trim() && finalForm.problem.trim();
  const text = buildMessage({ form: finalForm, medId, includeId, link: loc.link });

  const smsHref = `sms:${hospital.phone}?&body=${encodeURIComponent(text)}`;
  const waHref = `https://wa.me/${hospital.phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

  const logSend = (via) => {
    if (!ready) return;
    addLog({ time: Date.now(), hospital: hospital.name, patient: finalForm.name.trim(), problem: finalForm.problem.trim(), via });
  };

  return (
    <section id="hospitals" className="ec ec-section">
      <div className="ec-wrap">
        <div className="ec-head">
          <h2 className="ec-title">Hospital ko call ya message karo</h2>
          <p className="ec-sub">Kisi bhi hospital se seedha jud jao. Har number ek tap door hai.</p>
        </div>

        <div className="ec-split">
          <div>
            <h3 className="ec-h3">Nazdiki hospitals</h3>
            <div className="ec-filter">
              {cities.map((c) => (
                <button key={c} type="button" className={`ec-chip ${city === c ? "on" : ""}`} onClick={() => setCity(c)}>
                  {c}
                </button>
              ))}
            </div>
            <ul className="ec-list">
              {shown.map((h) => {
                const active = h.id === hospitalId;
                return (
                  <li key={h.id} className={`ec-hosp ${active ? "is-active" : ""}`}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="ec-name">{h.name}</p>
                      <p className="ec-meta"><FaMapMarkerAlt /> {h.city}, India</p>
                      <p className="ec-phone">{formatPhone(h.phone)}</p>
                    </div>
                    <div className="ec-row">
                      <a href={`tel:${h.phone}`} className="ec-btn ec-btn-primary"><FaPhoneAlt /> Call</a>
                      <button type="button" onClick={() => setHospitalId(h.id)} aria-pressed={active} className="ec-btn-outline ec-btn">
                        <FaSms /> {active ? "Selected" : "Message"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sticky ec-card tint">
            <h3 className="ec-h3" style={{ marginBottom: 0 }}>Emergency message bhejo</h3>
            <p className="ec-to">To: <b>{hospital.name}</b></p>

            <div className="ec-field"><input className="ec-input" value={nameVal} onChange={set("name")} placeholder="Patient ka naam *" /></div>
            <div className="ec-field"><input className="ec-input" value={form.problem} onChange={set("problem")} placeholder="Problem (jaise: seene mein dard) *" /></div>
            <div className="ec-field">
              <select className="ec-input" value={form.blood || medId.blood} onChange={set("blood")}>
                <option value="">Blood group (optional)</option>
                {BLOOD_GROUPS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="ec-field"><input className="ec-input" value={form.address} onChange={set("address")} placeholder="Aapka address / landmark" /></div>
            <div className="ec-field"><textarea className="ec-input" rows={2} value={form.note} onChange={set("note")} placeholder="Aur kuch batana ho?" /></div>

            <label className="ec-check">
              <input type="checkbox" checked={includeId} onChange={(e) => setIncludeId(e.target.checked)} />
              Medical ID (allergy, dawai, bimari) saath bhejo
            </label>

            <pre className="ec-preview">{text}</pre>

            <div className="ec-actions">
              <a href={smsHref} onClick={() => logSend("SMS")} className={`ec-btn ec-btn-primary ${!ready ? "ec-disabled" : ""}`} aria-disabled={!ready}><FaPaperPlane /> SMS</a>
              <a href={waHref} onClick={() => logSend("WhatsApp")} target="_blank" rel="noreferrer" className={`ec-btn ec-btn-green ${!ready ? "ec-disabled" : ""}`} aria-disabled={!ready}><FaWhatsapp /> WhatsApp</a>
            </div>
            {!ready && <p className="ec-hint">Patient ka naam aur problem likho.</p>}
            {loc.status !== "ok" && ready && <p className="ec-hint">Upar "Meri location bhejo" dabao to location bhi judegi.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════ 5) CHECK + FIRST AID + TOP 5 DOCTORS ═════════ */
function EmergencyCheck() {
  const [selected, setSelected] = useState(null);
  const panelRef = useRef(null);

  const topDoctors = useMemo(() => {
    const match = (d) => (selected && d.handles.includes(selected.title) ? 1 : 0);
    return [...DOCTORS].sort((a, b) => match(b) - match(a) || b.rating - a.rating).slice(0, 5);
  }, [selected]);

  const choose = (item) => {
    setSelected(item);
    setTimeout(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <section id="emergency-check" className="ec ec-section alt">
      <div className="ec-wrap">
        <div className="ec-head">
          <h2 className="ec-title">Patient Emergency Check</h2>
          <p className="ec-sub">Patient ki halat chuno. Abhi kya karna hai aur kaun sa doctor sahi hai, dono dikhenge.</p>
        </div>

        <div className="ec-conds">
          {EMERGENCIES.map((item) => {
            const active = selected?.title === item.title;
            return (
              <button key={item.title} type="button" onClick={() => choose(item)} aria-pressed={active} className={`ec-cond ${active ? "is-active" : ""}`}>
                {active && <FaCheckCircle className="ec-tick" />}
                <span className="ec-ico" style={{ background: item.bg, color: item.fg }}>{item.icon}</span>
                <span className="ec-cond-title">{item.title}</span>
                <span className="ec-cond-desc">{item.desc}</span>
              </button>
            );
          })}
        </div>

        <div ref={panelRef} className="ec-panel">
          {selected && (
            <>
              <div className="ec-alert">
                <div>
                  <b>{selected.title}: pehle ambulance bulao</b>
                  <span>Call karne ke baad neeche ke steps follow karo.</span>
                </div>
                <div className="ec-row">
                  <a href="tel:108" className="ec-btn ec-btn-red"><FaAmbulance /> Call 108</a>
                  <a href="tel:112" className="ec-btn ec-btn-redline"><FaPhoneAlt /> 112</a>
                </div>
              </div>

              <div className="ec-aid">
                <div className="ec-aid-box do">
                  <h4>✅ Abhi ye karo</h4>
                  <ul>{selected.doList.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
                <div className="ec-aid-box dont">
                  <h4>⛔ Ye mat karo</h4>
                  <ul>{selected.dontList.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
              </div>
              <p className="ec-disc">
                Ye general first aid jaankari hai, doctor ya trained responder ki salah ka replacement nahi.
                Shak ho to hamesha 108 / 112 par call karo.
              </p>
            </>
          )}

          <h3 className="ec-panel-title">{selected ? `${selected.title} ke liye best doctors` : "Top 5 doctors"}</h3>
          <p className="ec-panel-sub">
            {selected ? "Matching specialists pehle dikhaye gaye hain." : "Upar se condition chuno, sahi specialist pehle dikhega."}
          </p>

          <ul className="ec-docs">
            {topDoctors.map((d) => {
              const match = selected && d.handles.includes(selected.title);
              return (
                <li key={d.id} className={`ec-doc ${match ? "is-match" : ""}`}>
                  <div className="ec-doc-main">
                    <span className="ec-avatar">{initials(d.name)}</span>
                    <div>
                      <p className="ec-doc-name">{d.name}{match && <span className="ec-badge">Recommended</span>}</p>
                      <p className="ec-doc-sub">{d.specialty} · {d.hospital}</p>
                      <p className="ec-doc-stats">
                        <span><FaStar />{d.rating}</span>
                        <span>{d.years} saal ka anubhav</span>
                      </p>
                    </div>
                  </div>
                  <a href={`tel:${d.phone}`} className="ec-btn ec-btn-primary"><FaPhoneAlt /> Doctor ko call</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ═════════ 6) HISTORY ═════════ */
function RequestLog({ log, clearLog }) {
  if (log.length === 0) return null;
  return (
    <section className="ec ec-section">
      <div className="ec-wrap" style={{ maxWidth: 720 }}>
        <div className="ec-card">
          <div className="ec-card-head">
            <span className="ec-card-ico" style={{ background: "#e0f2fe", color: "#0284c7" }}><FaHistory /></span>
            <div style={{ flex: 1 }}>
              <div className="ec-card-title">Pichhle emergency messages</div>
              <p className="ec-card-sub">Is device par bheje gaye aakhri 5</p>
            </div>
            <button type="button" className="ec-btn-outline ec-btn ec-btn-sm" onClick={clearLog}>Saaf karo</button>
          </div>
          <ul className="ec-log">
            {log.map((l, i) => (
              <li key={i}>
                <span>
                  <b>{l.patient}</b>: {l.problem}
                  <br />
                  <small>{l.hospital} · {l.via}</small>
                </span>
                <small>{new Date(l.time).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ═════════ 7) FAQ ═════════ */
function EmergencyFAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="ec ec-section alt">
      <div className="ec-wrap" style={{ maxWidth: 820 }}>
        <div className="ec-head">
          <h2 className="ec-title">Aksar poochhe jaane wale sawal</h2>
          <p className="ec-sub">Jab har minute keemti ho, tab ke liye chhote jawab.</p>
        </div>
        <div className="ec-faq-list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`ec-faq-item ${isOpen ? "is-open" : ""}`}>
                <h3 className="ec-faq-q">
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="ec-faq-btn"
                  >
                    <span className="ec-faq-emoji" aria-hidden="true">{f.icon}</span>
                    <span className="ec-faq-text">{f.q}</span>
                    <FaChevronRight className="ec-faq-chev" />
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="ec-faq-a">
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═════════ 8) FOOTER ═════════ */
function EmergencyFooter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  };

  return (
    <footer className="ec ec-foot">
      <div className="ec-wrap">
        <div className="ec-foot-grid">
          <div className="ec-foot-brand">
            <a href="#sos" className="ec-logo">
              <span className="ec-logo-mark"><FaHeart /></span>
              CarePoint
            </a>
            <p className="ec-foot-about">Tez emergency madad, nazdiki hospitals aur bharose ke doctors, sab ek jagah.</p>
            <div className="ec-social">
              {SOCIALS.map((s) => (
                <a key={s.label} href="#" aria-label={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="ec-foot-title">{col.title}</h4>
              <ul>
                {col.links.map(([label, href]) => (
                  <li key={label}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </nav>
          ))}

          <form className="ec-foot-news" onSubmit={subscribe}>
            <h4 className="ec-foot-title">Newsletter</h4>
            <p className="ec-news-text">Health tips aur updates. Koi spam nahi.</p>
            <div className="ec-news-row">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email address" required />
              <button type="submit" className="ec-btn ec-btn-primary">Subscribe</button>
            </div>
            {done && <p className="ec-news-ok" role="status">Shukriya! Aap subscribe ho gaye.</p>}
          </form>
        </div>

        <div className="ec-foot-bottom">
          <span>© {new Date().getFullYear()} CarePoint. All rights reserved.</span>
          <span>Emergency mein <b>112</b> · Ambulance <b>108</b></span>
        </div>
      </div>
    </footer>
  );
}

/* ═════════ PAGE ═════════ */
function Emergency() {
  const [loc, locate] = useLocate();
  const [medId, setMedId] = useState(() => ({ ...EMPTY_ID, ...readJSON("cp_medical_id", {}) }));
  const [log, setLog] = useState(() => readJSON("cp_emergency_log", []));

  useEffect(() => safeSet("cp_medical_id", JSON.stringify(medId)), [medId]);
  useEffect(() => safeSet("cp_emergency_log", JSON.stringify(log)), [log]);

  const addLog = (entry) => setLog((l) => [entry, ...l].slice(0, 5));
  const clearLog = () => setLog([]);

  return (
    <div>
      <Navbar />
      <style>{EC_CSS}</style>

      <SosHero loc={loc} locate={locate} />

      <QuickTools />

      <section className="ec ec-section alt">
        <div className="ec-wrap">
          <div className="ec-two">
            <FamilyAlert loc={loc} medId={medId} />
            <MedicalId medId={medId} setMedId={setMedId} />
          </div>
        </div>
      </section>

      <HospitalContact loc={loc} medId={medId} addLog={addLog} />
      <EmergencyCheck />
      <RequestLog log={log} clearLog={clearLog} />
      <EmergencyFAQ />
      <EmergencyFooter />
    </div>
  );
}

export default Emergency;
