import React from "react";
import styled from "styled-components";
import TableView from "./table/TableView";

export default function LeaderboardPage() {
  return (
    <Wrapper>    
      <TableView />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 20px;
`
