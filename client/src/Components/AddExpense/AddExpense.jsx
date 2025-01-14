import React, { useState } from "react";
import { RiEmotionUnhappyFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";

const addExpenseUrl = "http://localhost:8000/addExpense";

export default function AddExpense({ user }) {
  let navigate = useNavigate();
  const [addExpense, setAddExpense] = useState({
    email: user.email,
    category: "Fixed",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setAddExpense({
      ...addExpense,
      [e.target.name]: e.target.value,
    });
  };

  const resetAddIncome = () => {
    setAddExpense({
      email: user.email,
      category: "Fixed",
      amount: "",
      date: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(addExpenseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addExpense),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      resetAddIncome();
      navigate("/:id/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addIncome">
      <form onSubmit={handleSubmit}>
        <h2 className="incomeTitle">
          Expense <RiEmotionUnhappyFill />
        </h2>
        <div className="input-box">
          <label className="incomeLabel">Category</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            required
          >
            <option value="Fixed">Fixed</option>
            <option value="Variable">Variable</option>
            <option value="Discretionary">Discretionary</option>
            <option value="Irregular">Irregular</option>
            <option value="Debt">Debt</option>
            <option value="Unexpected">Unexpected</option>
          </select>
        </div>

        <div className="input-box">
          <label className="incomeLabel">Amount $$</label>
          <input
            required
            name="amount"
            value={addExpense.amount}
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
            value={addExpense.date}
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
