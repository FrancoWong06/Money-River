import React, { useState } from "react";
import { MailSharp } from "react-ionicons";
import { LockClosedSharp } from "react-ionicons";

import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";

const loginUrl = "http://localhost:8000/login";

export default function Login({user}) {
  let navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };

  const resetLogin = () => {
    setUserLogin({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      if(data.allow){
        resetLogin()
        navigate(`/${data.id}/home`)
      }
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="Logincontainer">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-box">
            <span className="icon">
              <MailSharp
                color={"#D9D9D9"}
                title={"email"}
                height="1rem"
                width="1rem"
              />
            </span>
            <input
              type="email"
              required
              name="email"
              onChange={handleChange}
              value={userLogin.email}
            />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <LockClosedSharp
                color={"#D9D9D9"}
                title={"password"}
                height="1rem"
                width="1rem"
              />
            </span>
            <input
              minLength="8"
              type="password"
              required
              name="password"
              onChange={handleChange}
              value={userLogin.password}
            />
            <label>Password</label>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <NavLink to="/register" className="register">
                Register
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
