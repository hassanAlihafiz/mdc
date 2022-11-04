import styled from "styled-components";

export const Wrapper = styled.div`
  .go-home {
    display: flex;
    align-items: center;
    padding: 20px 0 10px;
    span {
      margin-right: 10px;
    }
  }
  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    }
    .comliance-img {
      position: absolute;
      right: 20px;
      bottom: 50px;
      width: 40%;
      max-width: 570px;
    }
  }
  .comliance-card {
    text-align: center;
    img {
      width: 100%;
      margin-bottom: 20px;
    }
    .btn-actions {
      button {
        margin: 0 10px;
        width: 150px;
        height: 38px;
        border-color: #DBA453;
        background-color: #DBA453;
      }
      a {
        margin: 0 10px;
        width: 150px;
        border-radius: 2px;
        border-color: #DBA453;
        background-color: #DBA453;
        padding: 10px 30px;
        color: #ffffff;
      }
    }
  }
  .guidelines {
    position: relative;
    height: 0;
    padding-bottom: 55.625%;
    max-width: 1000px;
    margin: 0 auto;
  }
  .quiz {
    height: 750px;
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
      .comliance-img {
        display: none;
      }
    }
  }
`