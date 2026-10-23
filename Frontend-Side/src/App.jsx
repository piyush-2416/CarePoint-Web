import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Navbar from "./Components/Navbar.jsx";
import About from "./Components/About.jsx";
import Doctors from "./Pages/Doctors.jsx";
import Medicines from "./Pages/Medicines.jsx";
import Appointment from "./Pages/Appointment.jsx";
import Schemes from "./Pages/Schemes.jsx";
import Login from "./Pages/Login.jsx";
import Emergency from "./Pages/Emergency.jsx";
import Doctorid from "./Pages/Doctorid.jsx";
import Auth from "./Pages/Auth.jsx";
import Profile from "./Pages/Profile.jsx";
import Relatives from "./Pages/Relatives.jsx";
import Documents from "./Pages/Documents.jsx";
import SignIn from "./Pages/Signin.jsx";
import Blogs from "./Components/Blogs.jsx";
import HealthTips from "./Components/HealthTips.jsx";import Help from "./Pages/Help.jsx";
import SafetyChecker from "./Pages/SafetyCheck.jsx";
import SafetyPlanner from "./Pages/Safetyplanner.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/Auth" element={<Auth />} />
          <Route path="/Relatives" element={<Relatives />} />
          <Route path="/Documents" element={<Documents />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/SafetyChecker" element={<SafetyChecker />} />
          <Route path="/SafetyPlanner" element={<SafetyPlanner />} />

          <Route path="/" element={<Home />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/About" element={<About />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Emergency" element={<Emergency />} />
          <Route path="/HealthTips" element={<HealthTips />} />
          <Route path="/Blogs" element={<Blogs />} />

          <Route path="/Schemes" element={<Schemes />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/Medicines" element={<Medicines />} />
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Doctorid/:id" element={<Doctorid />} />

          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
