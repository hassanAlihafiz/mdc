import styled from "styled-components";

export const Wrapper = styled.div`
  .video-container {
    background: black;
    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .record-container {
    position: absolute;
    top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    span {
      border-radius: 6px;
      background: rgb(33 49 75 / 70%);
      padding: 12px 20px;
      color: white;
    }
    svg {
      margin-right: 10px;
    }
  }
  .viewers-container {
    position: relative;
    top: -138px;
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    right: 30px;
    span {
      border-radius: 6px;
      background: rgb(33 49 75 / 70%);
      padding: 12px 20px;
      color: white;
    }
    svg {
      margin-right: 10px;
    }
  }
  .controls-container {
    position: relative;
    top: -88px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    .video-icon {
      background: #21314b;
      cursor: pointer;
      border-radius: 40px;
      width: 46px;
      height: 46px;
      display: flex;
      align-items: center;
      margin: 0px 12px;
      justify-content: center;
      svg {
        cursor: pointer;
      }
    }
    .play-icon {
      width: 60px;
      height: 60px;
      cursor: pointer;
      display: flex;
      align-items: center;
      margin: 0px 12px;
      justify-content: center;
      border-radius: 40px;
      background: #1b92fb;
      border-radius: 14px;
      span {
        background: white;
        border-radius: 50%;
        padding: 4px 3px 3px 4px;
        width: 27px;
        height: 27px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      svg {
        cursor: pointer;
      }
    }
    .pause-icon {
      width: 60px;
      height: 60px;
      cursor: pointer;
      display: flex;
      align-items: center;
      margin: 0px 12px;
      justify-content: center;
      border-radius: 40px;
      background: #ff5050;
      border-radius: 14px;
      svg {
        cursor: pointer;
      }
    }
  }
  @media (max-width: 850px) {
    .viewers-container {
      top: -155px;
      span {
        padding: 7px 13px;
      }
    }
    .controls-container {
      top: -60px;
      .video-icon {
        width: 30px;
        height: 30px;
        margin: 0px 7px;
        svg {
          width: 20px !important;
        }
      }
      .pause-icon {
        width: 40px;
        height: 40px;
        margin: 0px 7px;
        svg {
          width: 23px;
        }
      }
      .play-icon {
        width: 40px;
        height: 40px;
        margin: 0px 7px;
        span {
          width: 20px;
          height: 20px;
        }
        svg {
          width: 15px;
        }
      }
    }
  }
  @media (max-width: 700px) {
    .video-container {
      height: 400px !important;
    }
  }
  @media (max-width: 450px) {
    .video-container {
      height: 300px !important;
    }
  }
`;
