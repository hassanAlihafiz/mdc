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
        margin-bottom: 70px;
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
  .cards-content-title {
    padding: 50px 0 10px;
    text-align: center;
    h2 {
      font-weight: 600;
    }
  }
  .card-content {
    text-align: center;
    padding: 20px;
    img {
      width: 100%;
    }
    h5 {
      margin-top: 10px;
    }
    button {
      margin-top: 10px;
      width: 100px;
      height: 38px;
      font-size: 15px;
      color: #ffffff;
      background-color: #DBA453;
      border-color: #DBA453;
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
        height: 400px;
      }
      .text-content {
        top: 12%;
      }
    }
  }
`