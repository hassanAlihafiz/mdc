import styled from "styled-components";

export const Wrapper = styled.div`
  .banner-image {
    height: 300px;
    width: 100%;
    object-fit: cover;
  }
  .slick-dots {
    .slick-active {
      width: 16px !important;
    }
    li {
      button {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        :before {
          display: none;
        }
      }
    }
  }
  .carousal-banners {
    .ant-carousel .slick-dots {
      left: -15%;
    }
  }
`;
