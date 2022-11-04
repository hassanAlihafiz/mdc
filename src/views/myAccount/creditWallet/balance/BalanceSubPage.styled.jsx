import styled from "styled-components";

export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(44, 39, 56, 0.06);
  padding: 20px;
  .credit-wallet-title {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 30px;
  }
  .balance-stats {
    background: #f3f5f8;
    padding: 20px;
    .stats-title {
      font-weight: 500;
      font-size: 18px;
      color: #7f8fa3;
      text-align: center;
    }
    .stats-value {
      font-weight: 600;
      color: #00b4ee;
      font-size: 18px;
      text-align: center;
      margin-top: 3px;
    }
  }
  .payment-header {
    margin: 20px 0px;
    span {
      font-weight: 500;
      font-size: 18px;
      position: relative;
      z-index: 500;
      display: inline-block;
      background: white;
      padding-right: 40px;
    }
    .main-divider {
      height: 1px;
      background: #7f8fa3;
      opacity: 0.3;
      position: relative;
      top: -18px;
    }
  }
  .credit-wallet-content {
    .content {
      font-weight: 500;
      font-size: 14px;
      color: #7f8fa3;
      margin-bottom: 7px;
      span {
        color: #00b4ee;
      }
    }
  }
  .content-container {
    background: #f3f5f8;
    padding: 5px 20px;
    margin: 13px 0px 13px;
    .content-label {
      margin: 10px 0px;
      font-weight: 500;
      font-size: 14px;
      color: #7f8fa3;
      span {
        color: #212529;
        padding-left: 5px;
      }
    }
  }
  .manual-container {
    margin-bottom: 20px;
    .ant-col {
      display: flex;
      align-items: center;
    }
    .amount-label {
      font-weight: 500;
      font-size: 18px;
      color: #7f8fa3;
      margin-right: 20px;
    }
    button {
      height: 100%;
      margin-left: 20px;
    }
  }
  .radio-container {
    margin-top: 20px;
    .radio-label {
      font-weight: 500;
      font-size: 14px;
      display: flex;
      align-items: center;
      margin: 10px 0px;
      span {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
      .ant-input {
        width: 130px;
        margin: 0px 10px;
      }
    }
    .ant-radio-wrapper {
      margin-right: 11px;
    }
  }
  .checktext {
    display: flex;
    align-items: center;
  }
  @media (max-width: 720px) {
    .content-label {
      display: flex;
      flex-direction: column;
      span {
        padding-left: 0px;
      }
    }
  }

  @media (max-width: 450px) {
    .radio-label {
      .ant-input {
        width: 70px !important;
      }
    }
  }
  @media (max-width: 500px) {
    .responsive-label {
      width: 100% !important;
    }
    .responsive-input {
      width: 100% !important;
    }
    .responsive-input > div {
      width: 100%;
      margin-top: 2px;
    }
    .responsive-button {
      width: 100% !important;
      margin-top: 10px;
      button {
        margin-left: 0px;
        width: 100%;
      }
    }
  }
`;
