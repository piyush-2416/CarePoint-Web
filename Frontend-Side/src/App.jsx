import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Feedback from "./Pages/Feedback.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Appointments from "./Pages/Appointments.jsx";
import Auth from "./Pages/Auth.jsx";
import Home from "./Pages/Home.jsx";
import About from "./Components/About.jsx";
import Blogs from "./Components/Blogs.jsx";
import HealthTips from "./Components/HealthTips.jsx";
import Doctors from "./Pages/Doctors.jsx";
import Doctorid from "./Pages/Doctorid.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import Medicines from "./Pages/Medicines.jsx";
import Appointment from "./Pages/Appointments.jsx";
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
import DoctorProfile from "./Pages/DoctorProfile.jsx";
import Patients from "./Pages/Patients.jsx";
import PatientDetail from "./Pages/PatientDetail.jsx";

// Sirf patient (login zaroori): doctor ko apne patients page par bhej diya jaata hai
const PatientOnly = ({ children }) => (
  <ProtectedRoute roles={["patient"]}>{children}</ProtectedRoute>
);
// Patient aur doctor dono (login zaroori)
const AnyRole = ({ children }) => (
  <ProtectedRoute roles={["patient", "doctor"]}>{children}</ProtectedRoute>
);
// Sirf doctor
const DoctorOnly = ({ children }) => (
  <ProtectedRoute roles={["doctor"]}>{children}</ProtectedRoute>
);

// "/" par: login nahi hai -> Auth page, patient -> Home, doctor -> patients page
function RootRoute() {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <p style={{ padding: "96px 16px", textAlign: "center" }}>Loading...</p>
    );
  if (!user) return <Auth />;
  if (user.role === "doctor") return <Navigate to="/doctor/patients" replace />;
  return <Home />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ---------- Public: sirf ye teen + Auth ---------- */}
          <Route path="/" element={<RootRoute />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />

          {/* ---------- Sirf Patient ---------- */}
          <Route
            path="/About"
            element={
              <PatientOnly>
                <About />
              </PatientOnly>
            }
          />
          <Route
            path="/Blogs"
            element={
              <PatientOnly>
                <Blogs />
              </PatientOnly>
            }
          />
          <Route
            path="/HealthTips"
            element={
              <PatientOnly>
                <HealthTips />
              </PatientOnly>
            }
          />
          <Route
            path="/Doctors"
            element={
              <PatientOnly>
                <Doctors />
              </PatientOnly>
            }
          />
          <Route
            path="/products/:id"
            element={
              <PatientOnly>
                <ProductPage />
              </PatientOnly>
            }
          />
          <Route
            path="/Doctorid/:id"
            element={
              <PatientOnly>
                <Doctorid />
              </PatientOnly>
            }
          />
          <Route
            path="/Schemes"
            element={
              <PatientOnly>
                <Schemes />
              </PatientOnly>
            }
          />
          <Route
            path="/SafetyChecker"
            element={
              <AnyRole>
                <SafetyChecker />
              </AnyRole>
            }
          />
          <Route
            path="/SafetyPlanner"
            element={
              <AnyRole>
                <SafetyPlanner />
              </AnyRole>
            }
          />
          {/* ---------- Patient + Doctor dono (login zaroori) ---------- */}
          <Route
            path="/Emergency"
            element={
              <AnyRole>
                <Emergency />
              </AnyRole>
            }
          />
          <Route
            path="/Appointment"
            element={
              <AnyRole>
                <Appointment />
              </AnyRole>
            }
          />
          <Route
            path="/Medicines"
            element={
              <AnyRole>
                <Medicines />
              </AnyRole>
            }
          />
          <Route
            path="/Help"
            element={
              <AnyRole>
                <Help />
              </AnyRole>
            }
          />
          <Route
            path="/Profile"
            element={
              <AnyRole>
                <Profile />
              </AnyRole>
            }
          />
          <Route
            path="/Feedback"
            element={
              <AnyRole>
                <Feedback />
              </AnyRole>
            }
          />

          <Route
            path="/Documents"
            element={
              <AnyRole>
                <Documents />
              </AnyRole>
            }
          />
          <Route
            path="/Relatives"
            element={
              <AnyRole>
                <Relatives />
              </AnyRole>
            }
          />

          <Route
            path="/Appointment"
            element={
              <AnyRole>
                <Appointments />
              </AnyRole>
            }
          />
          {/* Auth page ke cards in hyphen wale links par jaate hain */}
          <Route
            path="/safety-checker"
            element={<Navigate to="/SafetyChecker" replace />}
          />
          <Route
            path="/safety-planner"
            element={<Navigate to="/SafetyPlanner" replace />}
          />

          {/* ---------- Sirf Doctor ---------- */}
          <Route
            path="/doctor/profile"
            element={
              <DoctorOnly>
                <DoctorProfile />
              </DoctorOnly>
            }
          />
          <Route
            path="/doctor/patients"
            element={
              <DoctorOnly>
                <Patients />
              </DoctorOnly>
            }
          />
          <Route
            path="/doctor/patients/:id"
            element={
              <DoctorOnly>
                <PatientDetail />
              </DoctorOnly>
            }
          />
          {/* Purane /patients links bhi chalte rahein */}
          <Route
            path="/patients"
            element={<Navigate to="/doctor/patients" replace />}
          />

          {/* ---------- Koi galat URL: wapas "/" (logout ho to Auth page) ---------- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
