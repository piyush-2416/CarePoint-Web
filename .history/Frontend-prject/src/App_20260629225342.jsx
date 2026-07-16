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
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/About" element={<About />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Schemes" element={<Schemes />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/Medicines" element={<Medicines />} />
          {/* <Route path="/sidebar" element={<Sidebar />}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
