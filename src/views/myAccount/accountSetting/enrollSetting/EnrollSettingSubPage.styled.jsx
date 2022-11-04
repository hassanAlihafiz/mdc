import styled from "styled-components";

export const Wrapper = styled.div`
  background: #ffffff;
  height: 100%;
  padding: 30px;
  .label-header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
    .title {
      font-weight: 500;
      font-size: 22px;
    }
  }
  .enrollment-settings-description {
    margin-bottom: 30px;
    .ant-alert-with-description .ant-alert-message {
      font-weight: 600;
      margin-bottom: 12px;
    }
  }
  .checking-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 70px);
    svg {
      max-width: 100%;
    }
  }
  .enorllment-container {
    .select-container {
      margin-bottom: 35px;
      .label {
        font-size: 15px;
        color: #7f8fa3;
        margin-bottom: 3px;
      }
      .select-box {
        font-weight: 500;
        font-size: 15px;
        color: black;
        dispalay: flex;
        align-items: center;
        .ant-select {
          width: 374px;
        }
        .ant-switch {
          margin-left: 10px;
        }
      }
    }
  }
  @media (max-width: 530px) {
    .select-box {
      .ant-select {
        width: 100% !important;
      }
    }
  }
`;
