import styled from "styled-components";

export const Wrapper = styled.div`
  background: white;
  box-shadow: 0px 4px 20px rgb(44 39 56 / 6%);
  padding: 20px;
  .left-details-container {
    border-right: 0.5px solid #eef1f3;
  }
  .right-details-container {
    border-left: 0.5px solid #eef1f3;
  }
  .left-box {
    padding-right: 10px;
  }
  .right-box {
    padding-left: 15px;
  }
  .binary-qual {
    color: ${props=>props.theme.palette.success};
    font-stretch: expanded;
    display: flex;
    align-items: center;
    &.inactive {
      color: ${props=>props.theme.palette.error};
    }
  }

  .v-divider {
    width: 1px;
    height: 100%;
    background: #7f8fa3;
    opacity: 0.2;
  }

  .personal-details-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
    }
    .user-title {
      font-weight: 600;
      font-size: 14px;
      margin: 12px 0px 10px;
    }
    .user-id {
      font-weight: normal;
      font-size: 14px;
      color: #7f8fa4;
      margin-bottom: 30px;
    }
  }
  .personal-extra-info {
    background: #fafbfc;
    padding: 1px 15px;
    .personal-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 21px 0px;
      .label {
        font-weight: normal;
        font-size: 14px;
        color: #005d7b;
      }
      .value {
        font-weight: 600;
        font-size: 14px;
        color: #00b4ee;
      }
    }
  }

  .plot-container {
    margin-bottom: 5px;
    .iquid-container > div {
      height: 180px;
    }
    .liquid-setting-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .liquid-settings {
        border: 1px solid rgba(127, 143, 163, 0.4);
        width: 100%;
        padding: 7px 20px;
        color: #212529;
        font-weight: 500;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        cursor: pointer;
        svg {
          margin-right: 10px;
        }
        a {
          color: #212529;
        }
      }
    }
  }
  .account-and-profile-container {
    .account-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 15px;
        font-weight: 600;
        color: rgb(0, 93, 123);
      }
      .percentage {
        font-weight: 600;
        font-size: 14px;
        color: #00b4ee;
        display: flex;
        align-items: center;
        .incompleted {
          color: #ff5555;
        }
        .setting{
          margin-left: 11px;
          cursor: pointer;
        }
      }
    }
    .profile-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 4px;
      margin-bottom: 16px;
      .title {
        color: #7f8fa3;
        font-size: 14px;
      }
      .setting {
      }
    }
    .profile-section::last-child {
      margin-bottom: 0px;
    }
  }
  .skeleton-section {
    position: relative;
  }
  .loading-spin-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(256, 256, 256, 0.8);
  }
  .rank-badge {
    width: 22px;
    height: 22px;
    object-fit: cover;
    margin-right: 8px;
  }
  @media (max-width: 767px) {
    .left-details-container {
      border-right: none;
    }
    .right-details-container {
      border-left: none;
    }
  }
`;
