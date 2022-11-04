import styled from "styled-components";

export const Wrapper = styled.div`
  .label-container {
    color: #354052;
    font-size: 14px;
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

  @media (max-width: 576px) {
    .single-image {
      .ant-upload-select,
      .ant-upload-list-picture-card-container {
        width: 100%;
      }
    }
  }
`;
