import * as React from "react";

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
import "./Incomes.css";

export default function Incomes({ incomes }) {
  const data = {
    nodes: incomes,
  };

  const theme = useTheme(getTheme());

  return (
    <Table data={data} theme={theme}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>Category</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Date</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item._id} item={item}>
                <Cell>{item.category}</Cell>
                <Cell>
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </Cell>
                <Cell>{item.amount}</Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
}
