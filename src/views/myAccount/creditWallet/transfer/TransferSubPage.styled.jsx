import styled from "styled-components";

export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(44, 39, 56, 0.06);
  padding: 20px;
  .issue-credit-title {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 30px;
  }
  .issue-label {
    font-weight: 500;
    font-size: 18px;
    color: #7f8fa3;
    width: 206px;
  }
  .issue-input-container {
    width: 460px;
  }
  .issue-input-comment {
    color: ${props=>props.theme.palette.error};
    font-size: 12px;
    margin-top: 4px;
  }
  .amount-row {
    margin: 30px 0px;
  }
  .send-btn {
    button {
      width: 160px;
    }
  }
  .ant-select {
    width: 100% !important;
    input {
      height: 34px !important;
    }
  }
  @media (max-width: 600px) {
    .ant-col {
      width: 100%;
    }
    .issue-input-container {
      width: 100%;
    }
    .send-btn {
      button {
        width: 100%;
      }
    }
    .amount-row {
      margin: 15px 0px;
    }
  }
`;
