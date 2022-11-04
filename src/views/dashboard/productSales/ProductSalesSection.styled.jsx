import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 15px 20px 20px 20px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(44, 39, 56, 0.06);
  height: 100%;
  .sales-title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sales-title {
      font-weight: normal;
      font-size: 18px;
    }
    .sales-date {
      font-weight: normal;
      font-size: 14px;
      color: #7f8fa3;
    }
  }
  .divider {
    height: 1px;
    background: #eff3f6;
    margin: 12px 0px 20px;
  }
  .sales-product-container {
    border: 1px solid rgba(127, 143, 163, 0.4);
    padding: 15px;
    .ant-row {
      height: 100%;
    }
    .product-image {
      padding: 5px;
      img {
        width: 100%;
        height: 82px;
        object-fit: contain;
      }
    }
    .label-container {
      .label {
        font-weight: normal;
        font-size: 18px;
      }
      .brand-container {
        font-weight: normal;
        font-size: 14px;
        color: #7f8fa3;
        margin: 3px 0px 2px;
        span {
          color: #00b4ee;
        }
      }
      .price-container {
        font-weight: 500;
        font-size: 18px;
        color: #7f8fa3;
        .price {
          color: #00b4ee;
        }
        .subscription {
          font-size: 12px;
        }
      }
    }
    .product-price-container {
      font-weight: 600;
      color: #00b4ee;
      font-size: 18px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  @media (max-width: 576px) {
    .product-image {
      img {
        width: 100%;
        height: 150px !important;
        object-fit: contain;
        margin-bottom: 10px;
      }
    }
    .sales-title-container {
      flex-direction: column;
      .sales-title {
        width: 100%;
      }
      .sales-date {
        width: 100%;
        text-align: end;
        margin-top: 6px;
      }
    }
  }
`;
