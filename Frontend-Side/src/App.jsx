import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./Pages/Home.jsx";
import About from "./Components/About.jsx";
import Blogs from "./Components/Blogs.jsx";
import HealthTips from "./Components/HealthTips.jsx";
import Doctors from "./Pages/Doctors.jsx";
import Doctorid from "./Pages/Doctorid.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import Medicines from "./Pages/Medicines.jsx";
import Appointment from "./Pages/Appointment.jsx";
import Schemes from "./Pages/Schemes.jsx";
import Emergency from "./Pages/Emergency.jsx";
import Help from "./Pages/Help.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Logout from "./Pages/Logout.jsx";
import Profile from "./Pages/Profile.jsx";
import Relatives from "./Pages/Relatives.jsx";
import Documents from "./Pages/Documents.jsx";
import SafetyChecker from "./Pages/SafetyCheck.jsx";
import SafetyPlanner from "./Pages/Safetyplanner.jsx";
import Patients from "./Pages/Patients.jsx";
import PatientDetail from "./Pages/PatientDetail.jsx";

// Sirf patient ke pages: doctor ko nahi dikhte (wo apne home par bhej diya jaata hai)
const NoDoctor = ({ children }) => (
  <ProtectedRoute deny={["doctor"]}>{children}</ProtectedRoute>
);
// Patient aur doctor dono, par login zaroori
const AnyRole = ({ children }) => (
  <ProtectedRoute roles={["patient", "doctor"]}>{children}</ProtectedRoute>
);
// Sirf doctor ke liye
const DoctorOnly = ({ children }) => (
  <ProtectedRoute roles={["doctor"]}>{children}</ProtectedRoute>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ---------- Auth ---------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />

          {/* ---------- Sirf Patient wale pages (doctor ko nahi dikhte) ---------- */}
          <Route path="/" element={<NoDoctor><Home /></NoDoctor>} />
          <Route path="/About" element={<NoDoctor><About /></NoDoctor>} />
          <Route path="/Blogs" element={<NoDoctor><Blogs /></NoDoctor>} />
          <Route path="/HealthTips" element={<NoDoctor><HealthTips /></NoDoctor>} />
          <Route path="/Doctors" element={<NoDoctor><Doctors /></NoDoctor>} />
          <Route path="/products/:id" element={<NoDoctor><ProductPage /></NoDoctor>} />
          <Route path="/Doctorid/:id" element={<NoDoctor><Doctorid /></NoDoctor>} />
          <Route path="/Schemes" element={<NoDoctor><Schemes /></NoDoctor>} />

          {/* ---------- Patient + Doctor dono (public) ---------- */}
          <Route path="/Emergency" element={<Emergency />} />
          <Route path="/Appointment" element={<Appointment />} />

          {/* ---------- Patient + Doctor dono (login zaroori) ---------- */}
          <Route path="/Profile" element={<AnyRole><Profile /></AnyRole>} />
          <Route path="/Documents" element={<AnyRole><Documents /></AnyRole>} />

          {/* Medicines: ab doctor ke liye bhi */}
          <Route path="/Medicines" element={<AnyRole><Medicines /></AnyRole>} />

          {/* Contacts (Relatives): doctor ke liye bhi */}
          <Route path="/Relatives" element={<AnyRole><Relatives /></AnyRole>} />

          {/* Help & Support: doctor ke liye bhi */}
          <Route path="/Help" element={<AnyRole><Help /></AnyRole>} />

          {/* AI features: doctor ke liye bhi */}
          <Route path="/SafetyChecker" element={<AnyRole><SafetyChecker /></AnyRole>} />
          <Route path="/SafetyPlanner" element={<AnyRole><SafetyPlanner /></AnyRole>} />
          {/* Home ke cards in hyphen wale links par jaate hain, unhe sahi route par bhej do */}
          <Route path="/safety-checker" element={<Navigate to="/SafetyChecker" replace />} />
          <Route path="/safety-planner" element={<Navigate to="/SafetyPlanner" replace />} />

          {/* ---------- Sirf Doctor ---------- */}
          <Route path="/patients" element={<DoctorOnly><Patients /></DoctorOnly>} />
          <Route path="/patients/:id" element={<DoctorOnly><PatientDetail /></DoctorOnly>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
