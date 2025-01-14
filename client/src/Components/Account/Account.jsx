import React, { useEffect, useState } from "react";
import { RiLockPasswordFill,RiAccountPinCircleFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { FiAperture } from "react-icons/fi";
import { MdAccountCircle,MdEmail } from "react-icons/md";

import "./Account.css";

const userDetailsUrl = "http://localhost:8000/home";
const logoutUserUrl = "http://localhost:8000/logout";
const updateInfoUrl = "http://localhost:8000/updateInfo";

export default function Account() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [updateInfo, setUpdateInfo] = useState({
    email: "",
    newName: "",
    newEmail: "",
    oldPassword: "",
    newPassword: "",
  });

  const resetUpdateForm = () => {
    setUpdateInfo({
      email: updateInfo.email,
      newName: "",
      newEmail: "",
      oldPassword: "",
      newPassword: "",
    });
  };

  const handleChange = (e) => {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name]: e.target.value,
    });
  };

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
      setUpdateInfo({
        email: userDetails.user.email,
        newName: "",
        newEmail: "",
        oldPassword: "",
        newPassword: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await fetch(logoutUserUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const updateInfoFunc = async (e) => {
    e.preventDefault();
    try {
      const response = fetch(updateInfoUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updateInfo),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      alert("Update successfully");
      resetUpdateForm();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserDetails();
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
          <NavLink className="accountNavLogout" onClick={logoutUser}>
            Logout
          </NavLink>
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
        <div className="updateInfo">
          <h3>Update new details</h3>
          <form onSubmit={updateInfoFunc}>
            <div>
              <input
                type="text"
                placeholder="New Name"
                className="stEl"
                name="newName"
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="New Email"
                name="newEmail"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Old Password"
                className="stEl"
                name="oldPassword"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="New Password"
                name="newPassword"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}
