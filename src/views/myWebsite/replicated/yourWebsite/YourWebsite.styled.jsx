import styled from "styled-components";

export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(44, 39, 56, 0.06);
  padding: 10px 10px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .website-details {
    .website-image {
      width: 100%;
      object-fit: cover;
    }
    .website-title {
      font-size: 15px;
      line-height: 21px;
      color: #7f8fa3;
      text-align: center;
      margin-top: 30px;
    }
    .website-url {
      margin: 10px 0px;
      text-align: center;
      font-weight: normal;
      font-size: 15px;
    }
  }
  .divider {
    height: 1px;
    background: #e5e5e5;
    position: relative;
    top: -16px;
    z-index: 76;
  }
  .website-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    button{
        width: 70%;
    }
  }
  .sharable-container {
    display: flex;
    align-items: center;
    justify-content: center;
    .sharable-links {
      padding: 0px 20px;
      position: relative;
      z-index: 88;
      background: white;
      .social-icons {
        margin: 0px 4px;
      }
    }
  }
  @media (max-width: 600px) {
    .website-button {
      margin-top: 30px;
      button {
        width: 100%;
      }
    }
  }
`;
