import styled from "styled-components";

export const Wrapper = styled.div`
  .modal-title-container {
    font-weight: normal;
    font-size: 22px;
    margin: -10px 0px 4px;
    border-bottom: 1px solid #b1bbc7;
    padding-bottom: 12px;
  }

  .action-btn {
    display: flex;
    justify-content: center;
    button {
      margin-top: 10px;
    }
  }
  .input-container {
    .ant-select {
      width: 100%;
    }
  }
  .input-container > div {
    height: 100% !important;
  }
  .icon-container {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    padding-bottom: 8px;
    svg {
      cursor: pointer;
    }
  }
  .product-row {
    margin-bottom: 10px;
  }
  .referer-container {
    .label {
      display: none;
    }
    .errorWrapper {
      margin-top: 2px;
      p{
        margin: 0px
      }
    }
    .ant-row {
      margin-top: 20px;
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
  .autocomplete-container {
    .ant-select {
      width: 100%;
    }
    .ant-select-selector {
      height: 34px;
      input {
        padding-top: 4px;
      }
    }
  }
`;
