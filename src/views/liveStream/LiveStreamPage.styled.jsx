import styled from "styled-components";

export const Wrapper = styled.div`
  .main-container {
    padding-bottom: 20px;
    .subscriptions-tabs {
      background: white;
      margin: -20px -20px 0px -20px;
      border-top: 1px solid #eff3f6;
      padding: 0px 20px 0px 20px;
      .ant-tabs-nav {
        margin-bottom: 0px;
        margin-top: 3px;
      }
      .active-tab {
        font-weight: 500;
        font-size: 14px;
        color: #00b4ee;
        svg {
          margin-right: 15px;
        }
      }
      .inactive-tab {
        font-weight: 500;
        font-size: 14px;
        color: #8f9dae;
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
  }
  .live-stream-action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  @media (max-width: 1000px) {
    .payment-header {
      span {
        font-size: 18px;
      }
    }
    .subscriptions-tabs {
      .active-tab {
        font-size: 14px;
      }
      .inactive-tab {
        font-size: 14px;
      }
    }
  }
  @media (max-width: 600px) {
    .stream-header {
      display: flex !important;
      flex-direction: column;
      .subscriptions-tabs {
        padding: 0px;
      }
    }
  }
`;
