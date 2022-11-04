import styled from "styled-components";

export const Wrapper = styled.div`
  .banner-img-section {
    background-color: #000000;
    position: relative;
    img {
      width: 100%;
      max-height: 350px;
      object-fit: cover;
    }
    .text-content {
      text-align: center;
      position: absolute;
      top: 25%;
      left: 0;
      width: 100%;
      padding: 0 20px;
      h1 {
        color: #ffffff;
        margin-bottom: 50px;
        label {
          color: #DBA453;
        }
      }
      p {
        color: #ffffff;
        font-size: 15px;
        max-width: 750px;
        margin: 0 auto;        
      }
    }
  }
  .go-home {
    display: flex;
    align-items: center;
    padding: 20px 0 10px;
    span {
      margin-right: 10px;
    }
  }
  .trading-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 100px;
    padding: 0 20px;
    .logo-img {
      height: 25px;
      margin-bottom: 20px;
    }
    .flag-img {
      height: 45px;
      margin-bottom: 20px;
    }
    h5 {
      color: #DBA453;
      font-weight: 600;
    }
    label {
      font-size: 16px;
      margin-bottom: 20px;
    }
    p {
      margin-bottom: 30px;
    }
    a {
      border: unset;
      color: #fff;
      background-color: #DBA453;
      border-color: #DBA453;
      padding: 8px 20px;
      font-size: 15px;
      width: 150px;
    }
  }
  @media screen and (max-width: 1200px) {
    .banner-img-section {
      .text-content {
        h1 {
          margin-bottom: 20px;
        }
      }
    }
  }
  @media screen and (max-width: 575px) {
    .banner-img-section {
      img {
        max-height: 400px;
        height: 320px;
      }
      .text-content {
        top: 12%;
      }
    }
  }
`