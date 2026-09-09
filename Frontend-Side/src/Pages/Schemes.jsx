import Navbar from '../Components/Navbar'
 
const schemes = [
  {
    name: "Ayushman Bharat (PM-JAY)",
    icon: "🩺",
    category: "General Health Insurance",
    documents: "Aadhaar Card, Ration Card, Income Certificate",
  },
  {
    name: "Pradhan Mantri Matru Vandana Yojana",
    icon: "🤰",
    category: "Pregnant & Lactating Women",
    documents: "Aadhaar Card, MCP Card, Bank Passbook",
  },
  {
    name: "Janani Suraksha Yojana",
    icon: "👶",
    category: "Safe Motherhood Scheme",
    documents: "Aadhaar Card, BPL Certificate, Hospital Registration",
  },
  {
    name: "Rashtriya Swasthya Bima Yojana",
    icon: "🏥",
    category: "Below Poverty Line Families",
    documents: "BPL Card, Aadhaar Card, Family Photo",
  },
  {
    name: "Central Government Health Scheme",
    icon: "💊",
    category: "Government Employees",
    documents: "Employee ID, Aadhaar Card, Service Certificate",
  },
  {
    name: "Employees' State Insurance Scheme",
    icon: "⚕️",
    category: "Organized Sector Workers",
    documents: "ESIC Card, Aadhaar Card, Salary Slip",
  },
  {
    name: "PM Surakshit Matritva Abhiyan",
    icon: "🍼",
    category: "Antenatal Checkup Scheme",
    documents: "Aadhaar Card, Pregnancy Registration Card",
  },
  {
    name: "National Health Mission",
    icon: "🩹",
    category: "Rural & Urban Healthcare",
    documents: "Aadhaar Card, Address Proof, Income Certificate",
  },
  {
    name: "Rashtriya Bal Swasthya Karyakram",
    icon: "🧒",
    category: "Child Health Screening",
    documents: "Birth Certificate, Aadhaar Card, School ID",
  },
  {
    name: "Senior Citizen Health Insurance Scheme",
    icon: "🧓",
    category: "Elderly Citizens (60+)",
    documents: "Aadhaar Card, Age Proof, Address Proof",
  },
]

function Schemes() {
  return (
    <div className="schemes-page">
      <Navbar />

      <div className="schemes-header">
        <h1>Healthcare Schemes</h1>
        <p>Government schemes you can apply for, with the documents you'll need</p>
      </div>

      <div className="schemes-grid">
        {schemes.map((scheme, index) => (
          <div className="scheme-card" key={index}>
            <div className="scheme-icon">{scheme.icon}</div>

            <div className="scheme-body">
              <h2 className="scheme-name">{scheme.name}</h2>
              <span className="scheme-category">{scheme.category}</span>

              <div className="scheme-documents">
                <p className="documents-label">Documents required</p>
                <p className="documents-text">{scheme.documents}</p>
              </div>
            </div>

            <button className="apply-btn">Apply</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Schemes
