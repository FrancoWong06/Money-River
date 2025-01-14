import React, { useState } from "react";
import { MailSharp } from "react-ionicons";
import { LockClosedSharp } from "react-ionicons";
import { PersonCircleOutline } from "react-ionicons";

import { NavLink, useNavigate } from "react-router-dom";

const registerUrl = "http://localhost:8000/register";

export default function Register() {
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegisterUser({
      ...registerUser,
      [e.target.name]: e.target.value,
    });
  };

  const resetRegisterForm = () => {
    setRegisterUser({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerUser),
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      resetRegisterForm();
      navigate('/', { replace: true }); 
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="Logincontainer">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="input-box">
            <span className="icon">
              <PersonCircleOutline
                color={"#D9D9D9"}
                title={"user"}
                height="1rem"
                width="1rem"
              />
            </span>
            <input
              type="text"
              required
              name="name"
              onChange={handleChange}
              value={registerUser.name}
            />
            <label>Name</label>
          </div>
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
              value={registerUser.email}
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
              minlength="8"
              type="password"
              required
              name="password"
              onChange={handleChange}
              value={registerUser.password}
            />
            <label>Password</label>
          </div>
          <button type="submit">Register</button>
          <div className="register-link">
            <p>
              Already have a account?{" "}
              <NavLink to="/" className="register">
                Login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
