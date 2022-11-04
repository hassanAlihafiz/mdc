import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  .main-container {
    height: 100%;
    padding-bottom: 20px;
  }
  .hidden-icons {
    display: none;
  }
  .message-icons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .anticon {
      font-size: 28px;
      margin-left: 15px;
      cursor: pointer;
      color: #384971;
    }
  }
  .products-skeleton {
    background-color: #ffffff;
  }
  .no-products-skeleton {
    position: absolute;
    top: 50%;
    left: calc(50% - 39px);
    margin: 0;
    padding: 0;
  }
  .video-container-skeleton {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .stream-detail-skeleton {
    height: 290px;
    background-color: #ffffff;
  }
  @media (max-width: 1300px) {
    .hidden-icons {
      display: block;
    }
    .responsive-hidden-cards {
      display: none !important;
    }
    .responsive-show-cards {
      max-width: 100% !important;
      flex: 0 0 100% !important;
    }
    .video-container-skeleton {
      height: auto !important;
    }
  }
  @media (max-width: 1630px) {
    .responsive-sales-section {
      max-width: 50% !important;
      flex: 0 0 50% !important;
      .sales-container {
        .sales-user {
          .user-name {
            font-size: 11px;
          }
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
      .user-name-details {
        flex-direction: column;
        align-items: unset;
        .language-title {
          text-align: end;
          margin-top: 12px;
        }
      }
      .user-description {
        -webkit-line-clamp: 5;
      }
    }
  }
  @media (max-width: 768px) {
    .responsive-sales-section {
      max-width: 100% !important;
      flex: 0 0 100% !important;
    }
  }
`;
