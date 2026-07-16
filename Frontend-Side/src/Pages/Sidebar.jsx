import { useState } from "react";
// import Home from "./Home";
// import App from "../App";
// import { Link } from "react-router-dom";
function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: isOpen ? "250px" : "70px",
          background: "#1e293b",
          color: "white",
          transition: "0.3s",
          padding: "20px",
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          ☰
        </button>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "12px 0" }}>
            {isOpen ? "🏠 Dashboard" : "🏠"}
          </li>
          <li style={{ padding: "12px 0" }}>
            {isOpen ? "👨‍⚕️ Doctors" : "👨‍⚕️"}
          </li>
          <li style={{ padding: "12px 0" }}>
            {isOpen ? "📅 Appointments" : "📅"}
          </li>
          <li style={{ padding: "12px 0" }}>
            {isOpen ? "🏥 Patients" : "🏥"}
          </li>
          <li style={{ padding: "12px 0" }}>
            {isOpen ? "⚙️ Settings" : "⚙️"}
          </li>
        </ul>
      </div>

      {/* Main Content */}
       
    </div>
  );
}

export default Sidebar;