import styled from "styled-components";

export const Wrapper = styled.div`
  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .go-home {
      display: flex;
      align-items: center;
      padding: 20px 0 10px;
      span {
        margin-right: 10px;
      }
    }
    .ant-select {
      width: 150px;
      padding: 20px 0 10px;
      .ant-select-arrow {
        margin-top: 0;
      }
    }
  }
  .banner-img-section {
    background-color: #000000;
    position: relative;
    margin-bottom: 50px;
    .bg-img {
      width: 100%;
      max-height: 350px;
      object-fit: cover;
    }
    .content {
      text-align: left;
      position: absolute;
      top: 20%;
      left: 0;
      width: 60%;
      padding: 0 20px;
      h1 {
        color: #ffffff;
        label {
          color: #DBA453;
          margin-left: 10px;
        }
      }
      p {
        color: #ffffff;
        font-size: 15px;
        max-width: 750px;
        padding-bottom: 20px;
      }
      a {
        border: unset;
        color: #fff;
        background-color: #DBA453;
        border-color: #DBA453;
        padding: 10px 20px;
        font-size: 15px;
      }
    }
    .signals-img {
      position: absolute;
      right: 20px;
      bottom: 0;
      width: 40%;
      max-width: 570px;
    }
  }
  .live-calls-content {
    margin-top: 50px;
  }
  @media screen and (max-width: 1100px) {
    .banner-img-section {
      .bg-img {
        height: 400px;
        max-height: 400px;
      }
      .content {
        top: 10%;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .banner-img-section {
      .content {
        h1 {
          margin-bottom: 20px;
        }
      }
    }
  }
  @media screen and (max-width: 900px) {
    .banner-img-section {
      .content {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 575px) {
    .banner-img-section {
      .bg-img {
        max-height: 360px;
        height: 360px;
      }
      .content {
        top: 12%;
        h1 {
          label {
            font-size: 22px;
          }
        }
      }
      .signals-img {
        display: none;
      }
    }
  }
`