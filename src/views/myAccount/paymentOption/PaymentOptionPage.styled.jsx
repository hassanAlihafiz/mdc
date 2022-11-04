import styled from "styled-components";

export const Wrapper = styled.div`
  .main-container {
    height: 100%;
    padding-bottom: 20px;
  }
  .top-card-section {
    background: #ffffff;
    box-shadow: 0px 4px 20px rgb(44 39 56 / 6%);
    padding: 15px 24px;
    border-left: 4px solid #00b4ee;
    .card-title {
      font-weight: 600;
      font-size: 18px;
    }
    .card-description {
      font-weight: 500;
      font-size: 14px;
      color: #7f8fa3;
    }
  }
  .payment-card-section {
    background: #ffffff;
    padding: 15px 230px 15px 24px;
    margin-top: 30px;
    .payment-title {
      font-weight: 600;
      font-size: 18px;
      display: flex;
      align-items: center;
    }
    .payment-description {
      font-weight: 500;
      font-size: 14px;
      color: #7f8fa4;
      margin-top: 10px;
      .disclaimer {
        color: #ff5050;
      }
      .highlight {
        color: #00b4ee;
      }
    }
    .payment-radio {
      display: flex;
      align-items: flex-start;
      margin-top: 10px;
      font-weight: 500;
      font-size: 14px;
    }
    .payment-form-text {
      font-weight: 500;
      font-size: 14px;
      margin: 20px 0px;
    }
    .payment-highlight-text {
      font-weight: 500;
      font-size: 14px;
      color: #00b4ee;
      margin-top: 20px;
    }
  }
  .payment-form {
    width: 85%;
    .form-group {
      margin-bottom: 10px;
    }
    .input-label {
      font-weight: 500;
      font-size: 14px;
      color: #7f8fa3;
      margin-bottom: 2px;
    }
    .ant-select {
      width: 100%;
    }
    .ant-select-selector {
      height: 34px;
    }
    .ant-picker {
      width: 100% !important;
    }
    button {
      min-width: 100px;
    }
    .action-group {
      margin-bottom: 24px;
    }
  }
  .withdraws-tag {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    span {
      background: #f3f5f8;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      padding: 10px 20px;
      color: #7f8fa4;
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }
  .active-badge {
    background-color: ${props=>props.theme.palette.success};
    color: white;
    font-size: 12px;
    font-weight: bold;
    margin-left: 12px;
    padding: 4px 8px;
    border-radius: 4px;
  }
  .form-validation {
    font-size: 12px;
    margin-bottom: 4px;
    &.valid-success{
      color: ${props=>props.theme.palette.success};
    }
    &.valid-error{
      color: ${props=>props.theme.palette.error};
    }
  }
  @media (max-width: 1300px) {
    .payment-card-section {
      padding: 15px 24px 15px 24px !important;
    }
    .payment-form {
      width: 100%;
    }
  }
`;
