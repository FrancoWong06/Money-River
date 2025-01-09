import React, { useEffect, useState } from "react";
import { IoIosHappy } from "react-icons/io";

import "./AddIncome.css";
import { NavLink, useNavigate } from "react-router-dom";

const addIncomeUrl = "http://localhost:3000/addIncome";

export default function AddIncome({ user }) {
  let navigate = useNavigate();
  const [addIncome, setAddIncome] = useState({
    email: user.email,
    category: "Earned",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setAddIncome({
      ...addIncome,
      [e.target.name]: e.target.value,
    });
  };

  const resetAddIncome = () => {
    setAddIncome({
      email: user.email,
      category: "Earned",
      amount: "",
      date: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(addIncomeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addIncome),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      resetAddIncome();
      navigate('/:id/home')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addIncome">
      <form onSubmit={handleSubmit}>
        <h2 className="incomeTitle">
          Income <IoIosHappy />
        </h2>
        <div className="input-box">
          <label className="incomeLabel">Category</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            required
          >
            <option value="Earned">Earned</option>
            <option value="Investment">Investment</option>
            <option value="Government-Benefits">Government Benefits</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div className="input-box">
          <label className="incomeLabel">Amount $$</label>
          <input
            required
            name="amount"
            value={addIncome.amount}
            min="1"
            type="number"
            className="incomeInput"
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label className="incomeLabel">Date</label>
          <input
            required
            name="date"
            value={addIncome.date}
            type="date"
            className="incomeInput"
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
