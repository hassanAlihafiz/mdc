import styled from "styled-components";

export const Wrapper = styled.div`
  .main-container {
    padding-bottom: 20px;
    .loading-spin {
      width: 100vw;
      height: calc(100vh - 120px);
    }
    .play-icon {
      cursor: pointer;
    }
  }
  .header-search {
    margin-bottom: 20px;
    .ant-select {
      width: 100%;
    }
  }
`;
