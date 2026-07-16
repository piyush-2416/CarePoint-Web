import React from 'react'
import "./App.css";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Sidebar from './Pages/sidebar.jsx';
function App() {
  return (
    <>
      <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/sidebar" element={<Sidebar />}/>

      </Routes>
    </BrowserRouter>
 </>
  )
}


export default App
