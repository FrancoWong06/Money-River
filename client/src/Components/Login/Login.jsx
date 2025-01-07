import React, { useState } from "react";
import { MailSharp } from "react-ionicons";
import { LockClosedSharp } from "react-ionicons";

import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";

const loginUrl = "http://localhost:3000/login";

export default function Login({ setUser }) {

  return (
    <div className="Logincontainer">
      <div className="login-box">
        <form>
          <h2>Login</h2>
          <div className="input-box">
            <span className="icon">
              <MailSharp
                color={"#00000"}
                title={"email"}
                height="1rem"
                width="1rem"
              />
            </span>
            <input
              type="email"
              required
              name="email"
              // value={userLogin.email}
            />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <LockClosedSharp
                color={"#00000"}
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
              // value={userLogin.password}
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
