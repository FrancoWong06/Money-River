import React, { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiAperture } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

import "./Account.css";

const userDetailsUrl = "http://localhost:3000/home";
const logoutUserUrl = "http://localhost:3000/logout";

export default function Account() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(userDetailsUrl, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const userDetails = await response.json();
      setUser({
        id: userDetails.user._id,
        name: userDetails.user.name,
        email: userDetails.user.email,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await fetch(logoutUserUrl, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      })
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchUserDetails();
    console.log(user);
  }, []);

  return (
    <div className="account">
      <div className="accountNav">
        <div className="nameandemail">
          <MdAccountCircle className="userIcon" />
          <h2>{user.name}</h2>
          <h4>{user.email}</h4>
        </div>
        <div className="accountNavBtn">
          <NavLink to={`/${user.id}/home`} className="accountNavHome">
            Home
          </NavLink>
          <NavLink className="accountNavLogout" onClick={logoutUser}>Logout</NavLink>
        </div>
      </div>
      <div className="personalInfo">
        <h2>Personal Information</h2>
        <p>
          Manage your personal information, remember update your password
          frequently.
        </p>
        <div className="info">
          <div className="infoBubble">
            <div className="infoHeader">
              <h3>Name</h3>
              <RiAccountPinCircleFill className="infoIcon" />
            </div>
            <h5>{user.name}</h5>
          </div>
          <div className="infoBubble">
            <div className="infoHeader">
              <h3>Email</h3>
              <MdEmail className="infoIcon" />
            </div>
            <h5>{user.email}</h5>
          </div>
          <div className="infoBubble">
            <div className="infoHeader">
              <h3>Password</h3>
              <RiLockPasswordFill className="infoIcon" />
            </div>
            <h5>********</h5>
          </div>
          <div className="infoBubble">
            <div className="infoHeader">
              <h3>Season</h3>
              <FiAperture className="infoIcon" />
            </div>
            <h5>2025</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
