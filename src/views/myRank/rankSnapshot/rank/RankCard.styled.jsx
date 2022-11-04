import styled from "styled-components";

export const Wrapper = styled.div`
  .liquid-container > div {
    height: 240px;
  }
  .liquid-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .rank-container {
    border-left: 1px solid #eff3f6;
    height: 100%;
    padding-left: 20px;
    .rank-label {
      font-weight: normal;
      font-size: 14px;
      margin-bottom: 5px;
      color: #7f8fa3;
    }
    .rank-badge {
      font-weight: 600;
      font-size: 22px;
      color: #00b4ee;
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 22px;
        object-fit: cover;
        margin-right: 8px;
      }
    }
  }
  .rank-progress-container {
    margin-top: 20px;
    .progress-label-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .label {
        font-weight: normal;
        font-size: 14px;
        color: #7f8fa3;
      }
      .value {
        font-weight: 600;
        font-size: 14px;
        color: #00b4ee;
      }
    }
    .rank-progress {
      .ant-progress-inner,
      .ant-progress-bg {
        border-radius: 0px;
      }
    }
  }
  @media (max-width: 1130px) {
    .responsive-rank {
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
    .rank-container {
      padding-left: 0px;
      border-left: none;
    }
  }
`;
