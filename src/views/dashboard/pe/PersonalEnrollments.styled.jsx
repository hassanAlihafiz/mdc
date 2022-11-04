import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 15px 20px 20px 20px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(44, 39, 56, 0.06);
  .sales-title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
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
  .sales-chart {
    position: relative;
    .loading-spin {
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(256, 256, 256, 0.8);
    }
  }
`;
