import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";
function Doctors() {
    const [products, setProducts] = useState([]);
  const [add,setAdd]=useState(0);
    useEffect(() => {
    axios
      .get("http://localhost:3000/api/products") // 👈 backend URL
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // setDatasend(document.getElementsByClassName("producta").document.getElementsByClassName("Shop-list"))
  // if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;



  return (
    <div>
      <Navbar/> 
              <div style={{ padding: "20px" }}>
            <h1>🍔 Food List</h1>
            
          </div>

          </div>
   )
}

export default Doctors
