import styled from "styled-components";

export const Wrapper = styled.div`
  background: white;
  box-shadow: 0px 4px 20px rgb(44 39 56 / 6%);
  padding: 25px 30px 40px;
  .slider-title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    .slider-title {
      font-weight: normal;
      font-size: 18px;
    }
    .slider-arrows {
      svg {
        margin-left: 22px;
        cursor: pointer;
      }
    }
  }
  .slider-box {
    margin: 0px -20px;
    position: relative;
  }
  .slick-slider {
    .slick-prev {
      position: absolute;
      top: -41.5px;
      left: calc(100% - 100px);
      transform: rotate(180deg);
      width: 26px;
    }
    .slick-next {
      position: absolute;
      top: -31px;
      right: 20px;
      width: 26px;
    }
  }
  .product-container {
    border: 1px solid rgba(127, 143, 163, 0.4);
    padding: 24px 15px 17px;
    display: flex;
    align-items: center;
    margin: 0px 20px;

    justify-content: center;
    flex-direction: column;
    img {
      width: 228px;
      height: 213px;
      object-fit: contain;
      margin: 0 auto;
    }
    .product-title {
      font-weight: bold;
      margin: 15px 0px 11px;
      font-size: 18px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      min-height: 57px;
      text-align: center;
      color: #354052;
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
  .loading-spin-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(256, 256, 256, 0.8);
    top: 0;
    left: 0;
  }
  
  @media (max-width: 400px) {
    .slick-slider {
      .slick-prev {
        left: calc(100% - 80px) !important;
      }
    }
  }
`;
