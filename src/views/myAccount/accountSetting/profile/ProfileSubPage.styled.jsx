import styled from "styled-components";

export const Wrapper = styled.div`
  background: #ffffff;
  height: 100%;
  padding: 30px;
  .image-upload-section {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    img {
      width: 98px;
      height: 98px;
      margin-right: 20px;
      border-radius: 50%;
    }
    .user-upload .ant-upload > button {
      border-radius: 2px;
      background: #ffffff;
      color: #384971;
      border: 1px solid rgba(127, 143, 163, 0.4);
      display: flex;
      align-items: center;
      font-size: 14px;
      padding: 5px 27px;
      height: 38px;
    }
    .user-upload {
      .ant-upload-list {
        display: none;
      }
    }
  }
  .select-container {
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
      .ant-switch {
        margin-left: 10px;
      }
    }
  }
  .username-container {
    display: flex;
    align-items: center;
    .username {
      width: 128px;
      font-size: 15px;
      color: #7f8fa3;
    }
    .username-input {
      width: 100%;
      svg {
        width: 13px;
      }
    }
  }
  .settings-row {
    margin-bottom: 24px;
  }
  .save-button {
    margin-top: 50px;
    button {
      width: 220px;
    }
  }
  .change-button {
    margin-top: 30px;
    button {
      width: 220px;
      border: 1px solid #384971;
      background: white;
      color: #384971;
    }
  }
  @media (max-width: 500px) {
    .save-button {
      button {
        width: 100%;
      }
    }
    .change-button {
      button {
        width: 100%;
      }
    }
  }
`;
