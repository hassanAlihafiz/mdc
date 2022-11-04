import styled from "styled-components";

export const Wrapper = styled.div`
  .receipt-box {
    background: #1b92fb;
    border-radius: 2px;
    padding: 10px;
    cursor: pointer;
  }
  @media (max-width: 1270px) {
    .table-container {
      .ant-table {
        overflow-x: scroll;
        .ant-table-container {
          width: 1000px;
        }
      }
    }
  }
`;
