import styled from "styled-components";

export const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
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
  .cart-box {
  }
  .small-products-card {
    background: white;
    box-shadow: 0px 4px 20px rgb(44 39 56 / 6%);
    padding: 12px 6px;
  }
  .product-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      width: 109px;
      height: 118px;
      object-fit: contain;
    }
    .product-title {
      margin: 15px 0px 11px;
      font-weight: 600;
      font-size: 14px;
    }
    .product-price {
      font-weight: normal;
      font-size: 14px;
      color: #00b4ee;
      span {
        font-weight: 600;
      }
    }
    .price-buttons-row {
      margin-top: 20px;
      width: 100%;
      .quantity-container {
        padding: 3px 10px;
        border: 1.25px solid rgb(60 67 86 / 20%);
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          width: 30%;
          cursor: pointer;
        }
        .quantity {
          width: 40%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 14px;
        }
      }
      .cart-button {
        background: #384971 !important;
        border-radius: 2px !important;
        outline-color: #384971;
        border-color: #384971;
        font-weight: normal;
        font-size: 14px;
        width: 100%;
        height: 100%;
        padding-right: 0px;
        padding-left: 0px;
        font-size: 12px;
      }
    }
    .learn-text {
      font-weight: 600;
      font-size: 14px;
      color: #7f8fa3;
      text-align: center;
      margin-top: 20px;
    }
  }
  @media (max-width: 1700px) {
    .responsive-add-butons {
      .responsive-add-col {
        flex: 0 0 100% !important;
        max-width: 100% !important;
      }
    }
  }
`;
