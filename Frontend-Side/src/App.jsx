// import React from "react";
// import "./App.css";
// import { Link } from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home.jsx";
// import Navbar from "./Components/Navbar.jsx";
// import About from "./Components/About.jsx";
// import Doctors from "./Pages/Doctors.jsx";
// import Medicines from "./Pages/Medicines.jsx";
// import Appointment from "./Pages/Appointment.jsx";
// import Schemes from "./Pages/Schemes.jsx";
// // import Login from "./Pages/Login.jsx";
// import Emergency from "./Pages/Emergency.jsx";
// import Doctorid from "./Pages/Doctorid.jsx";
// import Auth from "./Pages/Auth.jsx";
// import Profile from "./Pages/Profile.jsx";
// import Relatives from "./Pages/Relatives.jsx";
// import Documents from "./Pages/Documents.jsx";
// import SignIn from "./Pages/Signup.jsx";
// import Blogs from "./Components/Blogs.jsx";
// import HealthTips from "./Components/HealthTips.jsx";import Help from "./Pages/Help.jsx";
// import SafetyChecker from "./Pages/SafetyCheck.jsx";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./Components/ProtectedRoute";
// // import Login from "./Pages/Login";
// import Login from "./Pages/Login.jsx";
// import Signup from "./Pages/Signup";
// import SafetyPlanner from "./Pages/Safetyplanner.jsx";
// import ProductPage from "./Pages/ProductPage.jsx";
// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>

//           <Route path="/Auth" element={<Auth />} />
//           <Route path="/Relatives" element={<Relatives />} />
//           <Route path="/Documents" element={<Documents />} />
//           <Route path="/Help" element={<Help />} />
//           <Route path="/SafetyChecker" element={<SafetyChecker />} />
//           <Route path="/SafetyPlanner" element={<SafetyPlanner />} />

//           <Route path="/" element={<Home />} />
//           <Route path="/Navbar" element={<Navbar />} />
//           <Route path="/About" element={<About />} />
//           <Route path="/Doctors" element={<Doctors />} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="/Emergency" element={<Emergency />} />
//           <Route path="/HealthTips" element={<HealthTips />} />
//           <Route path="/Blogs" element={<Blogs />} />

//           <Route path="/Schemes" element={<Schemes />} />
//           <Route path="/Appointment" element={<Appointment />} />
//           <Route path="/Medicines" element={<Medicines />} />
//           <Route path="/Signin" element={<SignIn />} />
//           <Route path="/Profile" element={<Profile />} />
//           <Route path="/Doctorid/:id" element={<Doctorid />} />
// {/* <Route path="/products/:id" element={<ProductPage />} />
// <Route path="/Doctorid/:id" element={<Doctorid />} /> */}
//           <Route path="/products/:id" element={<ProductPage />} />
//         </Routes>
//         <AuthProvider>
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} /> 

//     {/* Public page */}       <Route path="/" element={<Home />} /> 

//       {/* Login ke peeche wale pages */}
//      <Route
//         path="/documents"
//         element={
//           <ProtectedRoute>
//             <Documents />
//           </ProtectedRoute>
//         }
//       /> 
//       {/* baaki routes yahin, jo protect karne hain unhe ProtectedRoute mein wrap karo */}
//    </Routes>
//   </AuthProvider> 
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;


import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./Pages/Home.jsx";
import Navbar from "./Components/Navbar.jsx";
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
import Profile from "./Pages/Profile.jsx";
import Relatives from "./Pages/Relatives.jsx";
import Documents from "./Pages/Documents.jsx";
import SafetyChecker from "./Pages/SafetyCheck.jsx";
import SafetyPlanner from "./Pages/Safetyplanner.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider sabse bahar: Navbar, Login, ProtectedRoute sab isi ke andar */}
      <AuthProvider>
        <Routes>
          {/* ---------- Public pages ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/About" element={<About />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/HealthTips" element={<HealthTips />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/Doctorid/:id" element={<Doctorid />} />
          <Route path="/Medicines" element={<Medicines />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/Schemes" element={<Schemes />} />
          <Route path="/Emergency" element={<Emergency />} />
          <Route path="/Help" element={<Help />} />

          {/* ---------- Auth pages ---------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ---------- Login ke peeche wale pages ---------- */}
          <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/Relatives" element={<ProtectedRoute><Relatives /></ProtectedRoute>} />
          <Route path="/Documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
          <Route path="/SafetyChecker" element={<ProtectedRoute><SafetyChecker /></ProtectedRoute>} />
          <Route path="/SafetyPlanner" element={<ProtectedRoute><SafetyPlanner /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
