import React, { useState } from "react";
import { MailSharp } from "react-ionicons";
import { LockClosedSharp } from "react-ionicons";
import { PersonCircleOutline } from "react-ionicons";

import { NavLink, useNavigate } from "react-router-dom";

const registerUrl = "http://localhost:3000/registeruser";

export default function Register() {

  return (
    <div className="Logincontainer">
      <div className="login-box">
        <form >
          <h2>Register</h2>
          <div className="input-box">
            <span className="icon">
              <PersonCircleOutline
                color={"#00000"}
                title={"user"}
                height="1rem"
                width="1rem"
              />
            </span>
            <input
              type="text"
              required
              name="name"
              // value={userRegister.name}
            />
            <label>Name</label>
          </div>
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
              // value={userRegister.email}
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
              minlength="8"
              type="password"
              required
              name="password"
              // value={userRegister.password}
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
