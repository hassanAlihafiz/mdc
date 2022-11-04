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
  .content {
    padding: 10px;
  }
  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ant-select {
      width: 150px;
      padding: 20px 0 10px;
      .ant-select-arrow {
        margin-top: 0;
      }
    }
  }
  .trfx-category-wrapper {
    max-width: 100%;
  }
  .trfx-icon-locked svg {
    width: 80px;
    height: 80px;
  }
  .trfx-videos-tabs-btn a {
    font-size: 15px;
    text-transform: unset;
  }
  .trfx-videos-right-side {
    width: 70%;
    min-width: calc(100% - 370px);
  }
  .trfx-btn-play {
    width: 80px;
    height: 80px;
  }
  @media (max-width: 768px) {
    .trfx-videos-right-side {
        width: 100%;
    }
  }
  @media screen and (min-width: 1800px) {
    .trfx-video-layout-big-icons .trfx-video, .trfx-video-layout-vertical-tabs .trfx-video {
      width: calc(25% - 15px);
    }
  }
  @media screen and (min-width: 1365px) {
    .trfx-video-layout-big-icons .trfx-video, .trfx-video-layout-vertical-tabs .trfx-video {
      width: calc(35% - 32px);
    }
  }
  @media (max-width: 450px) {
    .trfx-video-layout-vertical-tabs .trfx-video {
      flex-direction: column;
    }
    .trfx-video-layout-vertical-tabs .trfx-video > * {
      width: 100%;
    }
  }
`