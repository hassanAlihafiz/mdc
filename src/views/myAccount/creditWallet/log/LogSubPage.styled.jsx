import styled from "styled-components";

export const Wrapper = styled.div`
  .container-box {
    background: #ffffff;
    box-shadow: 0px 4px 20px rgba(44, 39, 56, 0.06);
    padding: 20px 20px 5px 20px;
  }
  .header {
    margin-bottom: 15px;
    .title {
      font-weight: 500;
      font-size: 18px;
    }
    .date-picker {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .ant-select {
        width: 200px;
      }
    }
  }
  .user-name {
    img {
      width: 28px;
      height: 28px;
      margin-right: 7px;
    }
  }
  @media (max-width: 576px) {
    .date-picker > div {
      width: 100% !important;
    }
    .ant-select {
      width: 100% !important;
    }
  }
  @media (max-width: 1150px) {
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
