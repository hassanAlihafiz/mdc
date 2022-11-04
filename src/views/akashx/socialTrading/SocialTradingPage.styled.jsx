import styled from "styled-components";

export const Wrapper = styled.div`
  .banner-img-section {
    background-color: #000000;
    position: relative;
    margin-bottom: 50px;
    .akashx-logo-img {
      width: 50px;
      margin-right: 20px;
      color: #DBA453;
    }
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
          color: #ffffff;
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
    .social-bg-img {
      position: absolute;
      right: 20px;
      bottom: 0;
      width: 40%;
      max-width: 570px;
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
  .home-content-img {
    padding-left: 50px;
    img {
      width: 100%;
    }
  }
  .home-btn-section {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding-right: 50px;
    .home-btn {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      label {
        font-size: 15px;
      }
      a {
        border: unset;
        color: #fff;
        background-color: #DBA453;
        border-color: #DBA453;
        padding: 10px 20px;
        width: 150px;
        min-width: 150px;
        text-align: center;
        &:hover {
          color: #ffffff;
        }
      }
    }
  }
  .video-col {
    margin-top: 50px;
    .video-section {
      position: relative;
      height: 0;
      padding-bottom: 55.625%;
    }
    &.pl-50 {
      padding-left: 50px !important;
    }
    &.pr-50 {
      padding-right:50px !important;
    }
  }
  .register-description {
    p {
      font-size: 14px;
      strong {
        font-size: 15px;
      }
    }
  }
  .register-content {
    .ant-select {
      width: 100%;
    }
    .ant-row {
      max-width: 1200px;
    }
    button {
      width: 150px;
      height: 38px;
      color: #fff;
      background-color: #DBA453;
      border-color: #DBA453;
      font-size: 15px;
      margin-top: 20px;
    }
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
      .akashx-logo-img {
        width: 30px;
      }
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
      .social-bg-img {
        display: none;
      }
    }
    .home-btn-section {
      .home-btn {
        flex-direction: column;
        align-items: flex-start;
        a {
          width: 100%;
        }
      }
    }
  }
`