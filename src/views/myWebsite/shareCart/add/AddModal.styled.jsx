import styled from "styled-components";

export const Wrapper = styled.div`
  .action-btn {
    display: flex;
    justify-content: center;
    button {
      margin-top: 10px;
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
  .icon-container {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    padding-bottom: 15px;
    svg {
      cursor: pointer;
    }
  }
  .product-row{
    margin-bottom: 10px;
  }
`;
