import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 15px 5px 15px 15px;
  background: white;
  box-shadow: 0px 4px 20px rgb(44 39 56 / 6%);
  .responsive-sales-container {
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      border-radius: 10px;
      box-shadow: inset 0 0 5px transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #3849717d;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #3849717d;
    }
  }
  .live-title {
    font-weight: 500;
    font-size: 22px;
  }
  .divider {
    height: 1px;
    background: #b1bbc7;
    opacity: 0.3;
    margin: 15px -15px;
  }
  .sales-container {
    border: 1px solid rgba(127, 143, 163, 0.2);
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sales-user {
      .user-name {
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        color: #7f8fa3;
        margin-right: 25px;
        span {
          color: black;
        }
        img {
          width: 34px;
          height: 34px;
          margin-right: 7px;
          border-radius: 50%;
        }
      }
    }
    .sales-image {
      width: 36px;
      height: 36px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
`;
