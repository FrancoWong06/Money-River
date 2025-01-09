import * as React from "react";
import { FaSort } from "react-icons/fa";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import {
  useSort,
  HeaderCellSort,
} from "@table-library/react-table-library/sort";

import "./Expenses.css";

export default function Incomes({ expenses }) {
  const data = {
    nodes: expenses,
  };

  const theme = useTheme(getTheme());

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        category: (array) => array.sort((a, b) => a.category.localeCompare(b.category)),
        date: (array) => array.sort((a, b) => new Date(a.date) - new Date(b.date)),
        amount: (array) => array.sort((a, b) => a.amount - b.amount),
        TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  return (
    <div className="tableContainer">
      <Table data={data} theme={theme} sort={sort}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort sortKey="category">
                  Category 
                </HeaderCellSort>
                <HeaderCellSort sortKey="amount">
                  Amount
                </HeaderCellSort>
                <HeaderCellSort sortKey="date">
                  Date 
                </HeaderCellSort>
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
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
}
