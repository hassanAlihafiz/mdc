import styled from "styled-components";

export const Wrapper = styled.div`
  background: #ffffff;
  height: 100%;
  padding: 20px 15px;
  .label-header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #b1bbc74d;
    padding-bottom: 15px;
    margin-bottom: 20px;
    .title {
      font-size: 18px;
    }
    .add-container {
      display: flex;
      align-items: center;
      .select-box {
        .ant-input {
          width: 256px;
          margin: 0px 10px;
        }
        .ant-select {
          width: 130px;
          .ant-select-selector {
            height: 34px;
          }
        }
      }
      .icon-span {
        width: 34px;
        background: #1b92fb;
        border-radius: 4px;
        height: 100%;
        padding: 6px 0px 7px 9px;
        display: inline-block;
        cursor: pointer;
        svg {
          width: 16px;
        }
      }
    }
  }
  .user-name {
    img {
      width: 28px;
      height: 28px;
    }
    span {
      text-decoration: underline;
      cursor: pointer;
      color: #212529;
    }
  }
  .labels {
    span {
      background: #f2f2f2;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      color: #384971;
      padding: 5px;
      margin-right: 8px;
    }
  }
  @media (max-width: 1600px) {
    .contact-table {
      .ant-table {
        overflow-x: scroll;
        .ant-table-container {
          width: 1000px;
        }
      }
    }
  }
  .checking-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100% - 70px);
    svg{
      max-width: 100%;
    }
  }
  .no-text {
    text-align: center;
    color: #00B4EE;
    font-size: 24px;
  }
  .comment-icons {
    display: flex;    
    align-items: center;
    > span {
      font-size: 22px;
      cursor: pointer;
    }
    .edit-btn {
      &:hover {
        color: ${props=>props.theme.palette.primary};
      }
    }
    .delete-btn {
      margin-left: 12px;
      &:hover {
        color: ${props=>props.theme.palette.error};
      }
    }
    .active-btn {
      margin-left: 12px;
      &:hover {
        color: ${props=>props.theme.palette.success};
      }
    }
    .actived-btn {
      margin-left: 12px;
      color: ${props=>props.theme.palette.success};
    }
  }
`;
