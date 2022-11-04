import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px;
  background: white;
  box-shadow: 0px 4px 20px rgb(44 39 56 / 6%);
  height: 290px;
  .user-title {
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 15px;
    overflow: hidden;
    white-space: nowrap !important;
    text-overflow: ellipsis;
  }
  .user-description {
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #7f8fa3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;
    overflow: hidden;
  }
  .user-name-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    .name-details-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .product-training {
        padding: 7px 16px;
        background: #f3f5f8;
        font-weight: normal;
        font-size: 12px;
        color: #384971;
      }
      .user-name {
        font-weight: normal;
        font-size: 14px;
        margin-right: 25px;
        img {
          width: 28px;
          height: 28px;
          margin-right: 7px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
    .language-title {
      font-weight: bold;
      font-size: 12px;
      line-height: 14px;
      color: #1b92fb;
    }
  }
`;
