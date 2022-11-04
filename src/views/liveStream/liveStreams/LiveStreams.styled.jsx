import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 20px;
  .header-filters {
    margin: 35px 0 30px;
    .live-stream-action {
      button {
        width: 100%;
        padding: 0;
        text-align: center;
      }
    }
  }
  .header-pagination {
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .payment-header {
    margin-bottom: 20px;
    span {
      font-weight: 500;
      font-size: 18px;
      position: relative;
      z-index: 99;
      background: #eff3f6;
      padding-right: 9px;
      display: inline-block;
    }
    .main-divider {
      height: 1px;
      background: #b1bbc7;
      position: relative;
      top: -22px;
    }
  }
  .stream-header {
  }
  .training-title:hover {
    color: #1b92fb;
  }
  .subscriptions-tabs {
    display: inherit;
    padding: 0px 20px 0px 40px;
    .ant-tabs-nav {
      margin-bottom: 0px;
      margin-top: 3px;
    }
    .active-tab {
      font-weight: 600;
      font-size: 18px;
      color: #00b4ee;
      svg {
        margin-right: 15px;
      }
    }
    .inactive-tab {
      font-weight: 500;
      font-size: 18px;
      color: #7f8fa3;
      svg {
        margin-right: 15px;
      }
    }
    .ant-tabs-tab {
      padding: 12px 0 9px;
    }
    .ant-tabs-ink-bar {
      background: #00b4ee !important;
    }
  }
  .payment-cards {
    background: #ffffff;
    box-shadow: 0px 4px 20px rgb(44 39 56 / 6%);
    padding: 15px;
    height: 100%;
    .three-dot-container {
      background: white;
      display: inline-block;
      position: absolute;
      right: 33px;
      top: 24px;
      padding: 3px 6px;
      cursor: pointer;
      .three-dot-box {
      }
    }
    .training-background {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 202px;
      background-repeat: no-repeat;
      background-size: cover;
      svg {
        opacity: 0.5;
        cursor: pointer;
      }
    }
    .training-title {
      font-weight: 600;
      font-size: 18px;
      margin: 10px 0px 8px;
      overflow: hidden;
      white-space: nowrap !important;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .training-content {
      font-weight: normal;
      font-size: 13px;
      line-height: 22px;
      color: #7f8fa3;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      min-height: 66px;
    }
    .status-language {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .language-title {
      text-align: end;
      font-weight: bold;
      font-size: 12px;
      line-height: 14px;
      color: #1b92fb;
    }
    .start-row {
      background: #f3f5f8;
      margin: 8px 0px 15px;
      padding: 12px;
      .start-label {
        font-weight: normal;
        font-size: 14px;
        color: #7f8fa3;
      }
      .start-value {
        font-size: 14px;
        color: #7f8fa3;
        line-height: 19px;
      }
    }
  }
  .name-details-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    min-height: 52px;
    .product-training {
      padding: 7px 16px;
      background: #f3f5f8;
      font-weight: normal;
      font-size: 12px;
      color: #384971;
    }
    .user-name {
      font-weight: normal;
      font-size: 14px;
      img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 7px;
      }
    }
  }
  .copy-container {
    border: 1px solid #e6eaee;
    padding: 6px;
    .copy-url {
      font-weight: normal;
      font-size: 13px;
      line-height: 15px;
      text-decoration-line: underline;
      color: #7f8fa3;
      height: 100%;
      display: flex;
      align-items: center;
      overflow-wrap: anywhere;
    }
    button {
      border-radius: 2px !important;
      width: 100%;
      height: 100%;
      padding: 3px 2px;
    }
  }
  .no-stream {
    width: 100%;
    height: 100%;
    .no-data {
      width: 100%;
      height: 100%;
    }
  }
`;
