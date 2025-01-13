import React, { useState, useEffect } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { MdInput } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { BsFillWalletFill } from "react-icons/bs";

import { AgCharts } from "ag-charts-react";

const userDetailsUrl = "http://localhost:3000/home";

import { NavLink, useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home({ user, setUser }) {
  const calTotalIncome = (incomeArr) => {
    let totalIn = 0;
    for (let i = 0; i < incomeArr.length; i++) {
      totalIn += incomeArr[i].amount;
    }
    return totalIn;
  };

  const calTotalExpense = (expenseArr) => {
    let totalEx = 0;
    for (let i = 0; i < expenseArr.length; i++) {
      totalEx += expenseArr[i].amount;
    }
    return totalEx;
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
        incomes: userDetails.user.incomes,
        expenses: userDetails.user.expenses,
        totalIncome: calTotalIncome(userDetails.user.incomes),
        totalExpense: calTotalExpense(userDetails.user.expenses),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const sumOfIncomesCat = (incomeArr, cat) => {
    let sum = 0;
    for (let i = 0; i < incomeArr.length; i++) {
      if (cat === incomeArr[i].category) {
        sum += incomeArr[i].amount;
      }
    }
    return sum;
  };

  const incomeOptions = {
    width: 360,
    height: 360,
    background: {
      fill: "transparent",
    },
    series: [
      {
        type: "donut",
        angleKey: "value",
        labelKey: "label",
        innerRadiusRatio: 0.7,
        calloutLabel: {
          enabled: false, 
        },
        calloutLabelKey: "asset",
        fills: ["#50C878", "#90EE90", "#32CD32", "#228B22", "#248B25"],
      },
    ],
    title: {
      text: "Incomes",
      fontSize: 20,
      color: "#D9D9D9",
    },
    data: [
      { asset: "Earned", value: sumOfIncomesCat(user.incomes, "Earned") },
      {
        asset: "Investment",
        value: sumOfIncomesCat(user.incomes, "Investment"),
      },
      {
        asset: "GB",
        value: sumOfIncomesCat(user.incomes, "Government-Benefits"),
      },
      {
        asset: "Miscellaneous",
        value: sumOfIncomesCat(user.incomes, "Miscellaneous"),
      },
      { asset: "Business", value: sumOfIncomesCat(user.incomes, "Business") },
    ],
  };

  const expenseOptions = {
    width: 360,
    height: 360,
    background: {
      fill: "transparent",
    },
    series: [
      {
        type: "donut",
        angleKey: "value",
        labelKey: "label",
        innerRadiusRatio: 0.7,
        calloutLabel: {
          enabled: false, 
        },
        calloutLabelKey: "asset",
        fills: ["#E63946", "#FF7F7F", "#FF6347", "#B22222", "#8B0000", "#DC143C", "#FF4500"],
      },
    ],
    title: {
      text: "Expenses",
      fontSize: 20,
      color: "#D9D9D9",
    },
    data: [
      { asset: "Fixed", value: sumOfIncomesCat(user.expenses, "Fixed") },
      {
        asset: "Variable",
        value: sumOfIncomesCat(user.expenses, "Variable"),
      },
      {
        asset: "Discretionary",
        value: sumOfIncomesCat(user.expenses, "Discretionary"),
      },
      {
        asset: "Irregular",
        value: sumOfIncomesCat(user.expenses, "Irregular"),
      },
      { asset: "Debt", value: sumOfIncomesCat(user.expenses, "Debt") },
      { asset: "Unexpected", value: sumOfIncomesCat(user.expenses, "Unexpected") },
    ],
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className="home">
      <div className="header">
        <FaMoneyCheckAlt className="money-icon" />
        <h2>{user.name}'s Money River</h2>
      </div>

      <div className="contents">
        <div className="nav">
          <div className="transaction">
            <h3>Transaction</h3>
            <div className="add">
              <NavLink to={`/${user.id}/addincome`} className="navbtn">
                <IoAdd />
                Add Income
              </NavLink>
              <NavLink to={`/${user.id}/addexpense`} className="navbtn">
                <IoAdd />
                Add Expense
              </NavLink>
            </div>
          </div>
          <div className="navigation">
            <h3>Navigation</h3>
            <div className="navigationItems">
              <NavLink className="NavLink" to={`/${user.id}/account`}>
                <MdAccountCircle />
                Account
              </NavLink>
              <NavLink className="NavLink" to={`/${user.id}/incomes`}>
                <MdInput />
                Incomes
              </NavLink>
              <NavLink className="NavLink" to={`/${user.id}/expenses`}>
                <IoIosLogOut />
                Expenses
              </NavLink>
            </div>
          </div>
          <div className="balance">
            <h3>Balance</h3>
            <div className="wallet">
              <h4>
                <BsFillWalletFill /> Wallet
              </h4>
              <p>${user.totalIncome - user.totalExpense}</p>
            </div>
          </div>
        </div>
        <div className="income">
          <AgCharts options={incomeOptions} />
        </div>
        <div className="expense">
          <AgCharts options={expenseOptions} />
        </div>
      </div>
    </div>
  );
}
