import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";

import {
  useSort,
  HeaderCellSort,
} from "@table-library/react-table-library/sort";

import { useNavigate } from "react-router-dom";

import "./Expenses.css";

import fetchIncomesExpenses from "../../Helper/fetchIncomesExpenses";

const deleteExpenseItemUrl = "http://localhost:8000/deleteExpense";

export default function Expenses() {
  let navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [content, setContent] = useState([]);
  const [monthContent, setMonthContent] = useState(content);

  const data = {
    nodes: monthContent,
  };

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        category: (array) =>
          array.sort((a, b) => a.category.localeCompare(b.category)),
        date: (array) =>
          array.sort((a, b) => new Date(a.date) - new Date(b.date)),
        amount: (array) => array.sort((a, b) => a.amount - b.amount),
        TASKS: (array) =>
          array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  const getExpenses = async () => {
    const data = await fetchIncomesExpenses();
    setContent(data.expenses);
    setUserId(data.id);
  };

  const handleChange = (e) => {
    const seletedMonth = e.target.value;
    let result = [];
    if (seletedMonth === "all") {
      for (let i = 0; i < content.length; i++) {
        result.push(content[i]);
      }
    }
    for (let i = 0; i < content.length; i++) {
      if (content[i].date.split("-")[1] === seletedMonth) {
        result.push(content[i]);
      }
    }
    console.log(result);
    setMonthContent(result);
  };

  const deleteIncome = async (itemId, userId) => {
    setMonthContent((prev) => prev.filter((item) => item._id !== itemId));
    const details = {
      itemId: itemId,
      userId: userId,
    };
    try {
      const response = fetch(deleteExpenseItemUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      await getIncomes();
    } catch (e) {
      console.log(e);
    }
  };

  const navToHome = () => {
    navigate(`/${userId}/home`);
  };

  useEffect(() => {
    getExpenses();
  }, [monthContent]);
  return (
    <div className="tableContainer">
      <div className="select">
        <select
          name="month"
          id="month"
          className="month"
          onChange={handleChange}
        >
          <option value="" disabled selected>
            Select a Month
          </option>
          <option value="all">All</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <button onClick={navToHome}>Home</button>
      </div>
      <Table data={data} sort={sort}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort sortKey="category">Category</HeaderCellSort>
                <HeaderCellSort sortKey="amount">Amount</HeaderCellSort>
                <HeaderCellSort sortKey="date">Date</HeaderCellSort>
                <HeaderCell>Delete</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item._id} item={item}>
                  <Cell>{item.category}</Cell>
                  <Cell>{item.amount}</Cell>
                  <Cell>
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </Cell>
                  <Cell
                    className="delete"
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Are you sure you want to delete this income?"
                      );
                      if (confirmed) {
                        deleteIncome(item._id, userId);
                      }
                    }}
                  >
                    <MdDelete />
                    <MdDelete />
                    <MdDelete />
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
}
