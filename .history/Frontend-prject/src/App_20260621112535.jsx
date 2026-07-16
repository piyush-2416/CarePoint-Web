import React from 'react'
import "./App.css";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home />} />
       

      </Routes>
    </BrowserRouter>
 </>
  )
}


export default App
