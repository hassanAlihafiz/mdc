import styled from "styled-components";

export const Wrapper = styled.div`
  .modal-title-container {
    font-weight: normal;
    font-size: 22px;
    margin: -10px 0px 24px;
    border-bottom: 1px solid #b1bbc7;
    padding-bottom: 12px;
  }

  .action-btn {
    display: flex;
    justify-content: center;
    button {
      margin-top: 20px;
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
  .credit-input-box {
    div {
      width: 100%;
    }
    .credit-input-container {
      border: 1px solid #d9d9d9;
      img + label {
        width: 94% !important;
      }
    }
  }
`;
