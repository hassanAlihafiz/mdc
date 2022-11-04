import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 15px;
  background: white;
  box-shadow: 0px 4px 20px rgb(44 39 56 / 6%);
  .live-title {
    font-weight: 500;
    font-size: 22px;
  }
  .divider {
    height: 1px;
    background: #b1bbc7;
    opacity: 0.3;
    margin: 15px -15px;
  }
  .message-input-container {
    display: flex;
    align-items: center;
    div {
      width: 100%;
      .ant-input {
        background: #f5f5f5;
        border-radius: 8px;
        border: none;
        padding: 12px 58px 12px 15px;
        color: #7f8fa3;
      }
      .ant-input::placeholder {
        color: #7f8fa3;
      }
    }
    button {
      position: absolute;
      right: 32px;
      width: 38px;
      height: 33px;
      padding: 0px;
      border-radius: 4px !important;
      svg {
        width: 18px;
      }
    }
  }
  .messages-container {
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      border-radius: 10px;
      box-shadow: inset 0 0 5px transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #3849717d;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #3849717d;
    }
    margin-right: -10px;
    padding-right: 10px;
    .messages-box {
      margin-bottom: 5px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .user-message {
        margin-bottom: 15px;
        padding-right: 90px;
        span {
          font-weight: 500;
          font-size: 12px;
          color: #212529;
          padding-left: 40px;
        }
        .message-with-image {
          display: flex;
          align-items: flex-end;
          img {
            width: 30px;
            border-radius: 50%;
            height: 30px;
            margin-right: 10px;
          }
          div {
            background: #f5f5f5;
            color: #384971;
            border-radius: 8px 8px 8px 0px;
            padding: 8px;
            line-break: anywhere;
            font-weight: normal;
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
      .admin-message {
        margin-bottom: 15px;
        padding-left: 90px;
        span {
          font-weight: 500;
          font-size: 12px;
          color: #212529;
        }
        div {
          background: #384971;
          border-radius: 8px 8px 0px 8px;
          color: #ffffff;
          padding: 8px;
          line-break: anywhere;
          font-weight: normal;
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
  }
  @media (max-width: 1600px) {
    .normal-chat {
      .user-message {
        padding-right: 30px !important;
      }
      .admin-message {
        padding-left: 30px !important;
      }
    }
  }
  @media (max-width: 1350px) {
    .normal-chat {
      .user-message {
        padding-right: 0px !important;
      }
      .admin-message {
        padding-left: 0px !important;
      }
    }
  }
  .chat-drawer {
    .user-message {
      padding-right: 90px !important;
    }
    .admin-message {
      padding-left: 90px !important;
    }
  }
`;
