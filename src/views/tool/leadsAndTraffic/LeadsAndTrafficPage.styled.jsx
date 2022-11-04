import styled from "styled-components";

export const Wrapper = styled.div`
  .main-container {
    padding-bottom: 20px;
    h3 {
      color: #038dd2;
      font-weight: 600;
      margin-top: 20px;
    }
    .welcome-title {
      text-align: center;
    }
    .todd-falcone-content,
    .buy-leads-content,
    .buy-traffic-content {
      background-color: #ffffff;
      margin-top: 20px;
      padding: 20px;
    }
    .todd-falcone-content iframe {
      min-height: 500px;
    }
    .button {
      margin: 25px 0;
      width: 100%;
      padding: 0;
    }
    a {
      color: #ffffff;
      background-color: #00b2ff;
      padding: 12px 30px;
      border-radius: 2px;
    }
    img {
      height: 70px;
      margin-bottom: 20px;
    }
    .buy-leads-content iframe {
      min-height: 400px;
    }
    .buy-traffic-content iframe {
      min-height: 400px;
    }
    @media only screen and (max-width: 768px) {
      iframe {
        min-height: 300px !important;
      }
      .main-container img {
        height: 40px;
      }
    }
  }
`;
