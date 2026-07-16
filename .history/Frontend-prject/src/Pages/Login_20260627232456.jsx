import React from "react";
import "./App.css";
import {Link} from "react-router-dom";
function Login() {
  return (
    <div className="login-sec">
      <div className="Login">
        <ul>
          <h2 className="text-amber-500">Login Page</h2>
          <input
            className="border-2 border-black solid text"
            type="text"
            placeholder="Enter a Name"
          />
          <br />
          <input
            className="email"
            type="email"
            placeholder="Enter the E-mail"
          />
          <br />
          <input className="password" type="password" placeholder="Password" />
          <br />
          <input className="number" type="number" placeholder="Number" />
          <br />
         <Link to="/"> <button className="btn">Login</button></Link>
          <br />
          <h5>or continue with</h5>
          <div className="Login-2">
            {" "}
            <li>
              <button>
                <img src="https://static.vecteezy.com/system/resources/previews/011/598/471/original/google-logo-icon-illustration-free-vector.jpg" />
              </button>
            </li>
            <li>
              <button>
                {" "}
                <img src="https://static.vecteezy.com/system/resources/previews/025/270/403/original/github-logo-icon-free-vector.jpg" />
              </button>
            </li>
            <li>
              <button>
                {" "}
                <img src="https://freepnglogo.com/images/all_img/1715491541linkedin-logo-transparent.png" />
              </button>
            </li>             
             {/* <h6>Don't have an account yet? <h4>register for free</h4></h6> */}

          </div>
        </ul>
      </div>
    </div>
  );
}

export default Login;
