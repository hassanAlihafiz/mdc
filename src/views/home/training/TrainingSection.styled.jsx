import styled from "styled-components";

export const Wrapper = styled.div`
  background: white;
  box-shadow: 0px 4px 20px rgb(44 39 56 / 6%);
  padding: 15px 20px 23px;
  height: 100%;
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
    margin: 0px -10px;
    height: calc(100% - 50px);
    .slick-slider {
      height: 100%;
      .slick-list {
        height: 100%;
        .slick-track {
          height: 100%;
          .slick-slide > div {
            height: 100%;
          }
          .slick-slide > div > div {
            height: 100%;
          }
        }
      }
    }
  }
  .training-cards-container {
    background: #f2f2f2;
    height: 100%;
    padding: 15px;
    margin: 0px 10px;
    .training-background {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 202px;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .training-title {
      font-weight: 600;
      font-size: 18px;
      margin: 10px 0px 13px;
      overflow: hidden;
      white-space: nowrap !important;
      text-overflow: ellipsis;
      a {
        color: inherit;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        svg {
          margin-right: 10px;
        }
      }
    }
    .training-content {
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: #7f8fa3;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 6;
      overflow: hidden;
      a {
        color: inherit;
      }
    }
  }
  .slick-slider {
    .slick-prev {
      position: absolute;
      top: -41.5px;
      left: calc(100% - 90px);
      transform: rotate(180deg);
      width: 26px;
    }
    .slick-next {
      position: absolute;
      top: -31px;
      right: 10px;
      width: 26px;
    }
  }
  .skeleton-section {
    position: relative;
    .training-background {
      background: #d9d9d9;
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
`;
