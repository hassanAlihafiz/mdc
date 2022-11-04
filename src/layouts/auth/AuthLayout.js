import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { isAuthedUser } from "utils/auth";
import BaseLayout from "../base/BaseLayout";
import LeftBgImg from "assets/images/loginBg.png";
import RightBgImg from "assets/images/login_right_bg.svg";
import LoginLogoImg from "assets/images/loginLogo.png";

export default function AuthLayout({ children }) {
  const history = useHistory();

  useEffect(() => {
    if (isAuthedUser()) {
      history.push("/");
    }
  }, []);

  return (
    <BaseLayout>
      <Wrapper>
        <div className={"left-bg"}>
          <div className="left-logo">
            <img src={LoginLogoImg} alt="left-bg" />
          </div>
        </div>
        <div className={"right-root"}>{children}</div>
      </Wrapper>
    </BaseLayout>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background: #f8f8f8;
  .left-bg {
    background-image: url(${LeftBgImg});
    width: 67%;
    height: 100%;
    position: relative;
    padding: 30px 40px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right;
    .left-logo {
      width: 130px;
      position: absolute;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .main-logo {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      height: 100%;
      padding-right: 4rem !important;
      padding-left: 4rem !important;
      img {
        max-width: 100%;
        height: auto;
      }
    }
  }
  .right-root {
    width: 33%;
    background: white !important;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(${RightBgImg});
    background-position: right;
  }
  @media (max-width: 1000px) {
    .left-bg {
      display: none;
    }
    .right-root {
      width: 100%;
    }
  }
`;
