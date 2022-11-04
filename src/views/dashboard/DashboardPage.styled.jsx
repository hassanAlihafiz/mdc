import styled from "styled-components";

export const Wrapper = styled.div`
  .main-container {
    padding-bottom: 20px;
  }

  @media (max-width: 600px) {
    .slider-title {
      font-size: 18px !important;
    }
    .binary-label {
      font-size: 18px !important;
    }
    .sales-title {
      font-size: 18px !important;
    }
  }
  @media (max-width: 1540px) {
    .responsive-sales {
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
  }
`;
