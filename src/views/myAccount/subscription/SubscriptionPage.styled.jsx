import styled from "styled-components";

export const Wrapper = styled.div`
  padding-bottom: 20px;
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

  @media (max-width: 1620px) {
    .responsive-payment-cards {
      flex: 0 0 33.33333333% !important;
      max-width: 33.33333333% !important;
    }
  }
  
  @media (max-width: 1300px) {
    .responsive-payment-cards {
      flex: 0 0 50% !important;
      max-width: 50% !important;
    }
  }
  
  @media (max-width: 960px) {
    .responsive-payment-cards {
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
  }
  @media (max-width: 900px) {
    .responsive-payment-cards {
      flex: 0 0 50% !important;
      max-width: 50% !important;
    }
  }
  @media (max-width: 690px) {
    .responsive-payment-cards {
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
  }
`;
