import styled from "styled-components";

export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(44, 39, 56, 0.06);
  padding: 20px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .website-details {
    .website-title {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 15px;
    }
    .website-description {
      font-weight: normal;
      font-size: 15px;
      margin-bottom: 25px;
      color: #7f8fa3;
      padding-right: 180px;
    }
    .website-description.example-url-title {
      margin-bottom: 5px;
      font-weight: 600;
      color: rgba(0,0,0,0.6);
    }
    .website-description.example-url {
      margin-bottom: 10px;
      color: #1890ff;
    }
    .referer-container {
      .label {
        display: none;
      }
      .errorWrapper {
        margin-top: 2px;
      }
      .ant-row {
        margin-top: 20px;
      }
    }
    .referral-url-copy-icon {
      font-size: 22px;
      cursor: pointer;
      margin-left: 20px;
    }
  }
  .input-container {
    .label-title {
      font-weight: 600;
      color: rgba(0,0,0,0.6);
      font-size: 14px;
      margin-bottom: 4px;
    }
    .ant-select {
      width: 100%;
    }
  }
  .referer-title {
    height: 100%;
    display: flex;
    align-items: flex-end;
    font-weight: 500;
    font-size: 14px;
    color: #7f8fa3;
    padding-bottom: 6px;
  }
  .website-button {
    margin-top: 12px;
    button {
      width: 120px;
    }
  }
  .autocomplete-container {
    .ant-select-selector {
      height: 34px;
      input {
        padding-top: 4px;
      }
    }
  }
  @media (max-width: 1400px) {
    .website-description {
      padding-right: 0px !important;
    }
  }
  @media (max-width: 600px) {
    .website-button {
      margin-top: 30px;
      button {
        width: 100%;
      }
    }
  }
  .title {
    color: ${props=>props.theme.palette.secondaryText};
    font-size: 16px;
  }
  .divider {
    width: calc(100% - 120px);
    height: 1px;
    background-color: #e5e5e5;
  }
`;
