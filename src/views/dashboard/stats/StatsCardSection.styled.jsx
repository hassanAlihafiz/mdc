import styled from "styled-components";

export const Wrapper = styled.div`
  .stats-container {
    background: white;
    border-left: 4px solid #00b4ee;
    padding: 20px 15px;
    box-shadow: 0px 4px 20px rgba(44, 39, 56, 0.06);
    .stats-label {
      font-weight: normal;
      font-size: 18px;
      color: #7f8fa3;
    }
    .stats-value {
      font-weight: 600;
      font-size: 18px;
      color: #384971;
    }
  }

  .loading-icon {
    color: #00b2ff;
  }
  
  @media (max-width: 1400px) {
    .responsive-stats {
      flex: 0 0 50% !important;
      max-width: 50% !important;
    }
  }
  
  @media (max-width: 600px) {
    .responsive-stats {
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
  }
`;
