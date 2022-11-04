import styled from "styled-components";

export const Wrapper = styled.div`
  .payment-header {
    margin-bottom: 20px;
    span {
      font-weight: 500;
      font-size: 18px;
      position: relative;
      z-index: 500;
      display: inline-block;
      background: #eff3f6;
      padding-right: 9px;
    }
    .main-divider {
      height: 1px;
      background: #b1bbc7;
      position: relative;
      top: -16px;
    }
  }
  .payment-product-image {
    width: 100%;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .price-container {
    .payment-title {
      font-size: 14px;
      color: #384971;
      line-height: 20px;
      margin-bottom: 8px;
    }
    .payment-tag {
    }
    .payment-price-container {
      margin-top: 10px;
      display: flex;
      align-items: center;
      .payment-price {
        .label {
          font-weight: 500;
          font-size: 14px;
          color: #7f8fa3;
          margin-bottom: 2px;
        }
        .price {
          font-size: 14px;
          color: #00b4ee;
        }
      }
      .payment-quantity {
        border-left: 1px solid #7f8fa34d;
        padding-left: 20px;
        margin-left: 20px;
        .label {
          font-weight: 500;
          font-size: 14px;
          color: #7f8fa3;
          margin-bottom: 2px;
        }
        .quantity {
          font-size: 14px;
          color: #00b4ee;
        }
      }
    }
  }
  .billing-container {
    font-size: 14px;
    margin-top: 5px;
    span {
      color: #7f8fa3;
      font-weight: 500;
      margin-left: 5px;
    }
  }
  .date-row {
    margin-top: 15px;
    margin-bottom: 20px;
    .date-container {
      background: #f3f5f8;
      padding: 10px;
      .date-label {
        font-weight: 500;
        font-size: 14px;
        color: #7f8fa3;
      }
      .date-value {
        font-size: 14px;
        color: #00b4ee;
      }
    }
  }
  .action-buttons-container {
    padding: 0px 50px;
    .edit {
      width: 100%;
      border-radius: 2px !important;
      background: #1b92fb;
      font-size: 14px;
    }
    .cancel {
      width: 100%;
      border-radius: 2px !important;
      font-size: 14px;
      background: white;
      border-color: #384971;
      color: #384971;
    }
  }
`;
