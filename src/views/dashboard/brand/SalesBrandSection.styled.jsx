import styled from "styled-components";

export const Wrapper = styled.div`
  background: white;
  box-shadow: 0px 4px 20px rgb(44 39 56 / 6%);
  padding: 15px 20px 20px 20px;
  .slider-title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    margin: 0px -7px;
  }
  .slick-slider {
    .slick-prev {
      position: absolute;
      top: -59.5px;
      left: calc(100% - 100px);
      transform: rotate(180deg);
      width: 26px;
    }
    .slick-next {
      position: absolute;
      top: -50px;
      right: 20px;
      width: 26px;
    }
  }
  .brand-container {
    background: #f2f2f2;
    padding: 10px;
    margin: 0px 7px;
    img {
      width: 100%;
      height: 80px;
      object-fit: cover;
    }
    .brand-title {
      font-weight: normal;
      font-size: 14px;
      margin: 10px 0px 10px 0px;
    }
    .brand-price {
      font-weight: 600;
      font-size: 18px;
      color: #00b4ee;
    }
  }
  .divider {
    height: 1px;
    background: #eff3f6;
    margin: 12px 0px 20px;
  }
  
  @media (max-width: 400px) {
    .slick-slider {
      .slick-prev {
        left: calc(100% - 90px) !important;
      }
    }
  }
`;
