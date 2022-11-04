import styled from "styled-components";

export const Wrapper = styled.div`
  .modal-title-container {
    font-weight: normal;
    font-size: 22px;
    text-align: center;
    margin: -10px -24px 30px;
    border-bottom: 1px solid #b1bbc7;
    padding-bottom: 12px;
  }

  .action-btn {
    display: flex;
    justify-content: center;
    button {
      width: 150px;
      margin-top: 20px;
    }
    button:nth-child(2) {
      margin-left: 20px;
    }
  }
  .input-container {
    .ant-picker {
      width: 100% !important;
    }
  }
  .input-container > div {
    height: 100% !important;
  }
  .single-container-uploader {
    height: 100%;
    .upload-container-product {
      width: 100%;
    }
  }
  .radio-label {
    font-weight: 500;
    font-size: 14px;
    display: flex;
    align-items: center;
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
  .bitate-input {
    display: flex;
    align-items: center;
    button {
      width: 100px;
    }
  }

  .bitate-input > div {
    width: calc(100% - 100px);
    margin-right: 11px;
  }
`;
