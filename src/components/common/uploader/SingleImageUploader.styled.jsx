import styled from "styled-components";

export const Wrapper = styled.div`
  .label-container {
    color: #354052;
    font-size: 14px;
  }
  .upload-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .file-upload {
      width: 100%;
      margin-top: 20px;
      .ant-upload.ant-upload-select.ant-upload-select-text {
        width: 100%;
        .upload-btn {
          width: 100%;
        }
      }
    }
    img {
      width: 100%;
      box-shadow: 3px 4px 4px 0px rgb(0 0 0 / 15%);
    }
    .no-preview-img {
      border: 1px solid #f5f5f5;
      padding: 50px;
    }
  }
  .rowThumbnail {
    display: block !important;
  }
  .single-image {
    .ant-upload-select,
    .ant-upload-list-picture-card-container {
      width: calc(100% - 16px);
    }
  }
  @media (min-width: 450px) and (max-width: 767px) {
    .upload-container {
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      .file-upload {
        margin-top: 0;
        padding-left: 20px;
        width: 50%;
      }
      img {
        width: 50%;
      }
    }
  }
  @media (max-width: 576px) {
    .single-image {
      .ant-upload-select,
      .ant-upload-list-picture-card-container {
        width: 100%;
      }
    }
  }
`;
