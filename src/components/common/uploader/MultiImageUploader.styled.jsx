import styled from "styled-components";

export const Wrapper = styled.div`
  .multi-uploader {
    .ant-upload-select,
    .ant-upload-list-picture-card-container {
      width: 45%;
    }
  }
  @media (max-width: 576px) {
    .multi-uploader {
      .ant-upload-select,
      .ant-upload-list-picture-card-container {
        width: calc(50% - 8px);
      }
    }
  }
  .row-thumbnail {
    display: block !important;
  }
`;
