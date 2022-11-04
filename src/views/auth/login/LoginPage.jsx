import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  Input,
  OutlineBtn,
  message,
  SuccessNotification,
  ErrorNotification,
  PasswordInput,
} from "components/common";
import { callPostApi } from "utils/api";
import LoginLogoImg from "assets/images/loginLogo.png";
import { saveStorage } from "utils/auth";

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  let sudoName = undefined
  let pathName = undefined
  const [isShowForgotPwdForm, setIsShowForgotPwdForm] = useState(false)
  const [isSendingUsername, setIsSendingUsername] = useState(false)

  const onFormInput = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const onLoginSuccess = (res) => {
    saveStorage(res.data.user, res.data.token, sudoName)
    dispatch({
      type: 'auth.SET_USER',
      payload: {
        user: res.data.user,
        sudoName: sudoName
      }
    })
    SuccessNotification(res.message)
    setIsUpdating(false)
    setTimeout(() => {
      history.push(pathName ? pathName : "/")
    }, 1500);
  };
  const onLoginFailure = (errorMsg) => {
    setIsUpdating(false);
    ErrorNotification("Invalid username or password");
  };
  const handleSubmit = () => {
    // Check validation
    if (!formData.username || !formData.password) {
      message.error("Please input username and password");
      return;
    }

    setIsUpdating(true);
    callPostApi(
      "auth/login",
      {
        username: formData.username.toLowerCase().trim(),
        password: formData.password,
      },
      onLoginSuccess,
      onLoginFailure
    );
  };

  const onSuccessSentUsername = ({ message }) => {
    setIsSendingUsername(false);
    SuccessNotification(message)
  };

  const onFailedSendUsername = () => {
    setIsSendingUsername(false);
  };

  const handleSendUsername = () => {
    if (!formData.username.trim()) {
      ErrorNotification("Please input your username");
      return;
    }
    setIsSendingUsername(true);
    callPostApi("auth/forgot_password", { username: formData.username }, onSuccessSentUsername, onFailedSendUsername);
  };

  const handleCancelSendUsername = () => {
    setIsSendingUsername(false);
    setIsShowForgotPwdForm(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("auto-token-login")) {
      // Auto-Token Login
      const token = params.get("token");
      sudoName = params.get('sudoName');
      pathName = params.get('pathName');
      callPostApi(
        "auth/login/token",
        { token },
        onLoginSuccess,
        onLoginFailure
      );
    }
    if (params.has("autologin")) {
      // Auto Login by Encrypted Username Password pair
      // It comes from Corp Checkout Result page
      const username = params.get("autologin");
      const password = atob(params.get("token"));
      const formData0 = {
        username: username.toLowerCase().trim(),
        password: password,
      };
      setIsUpdating(true);
      callPostApi("auth/login", formData0, onLoginSuccess, onLoginFailure);
    }
  }, []);

  return (
    <Wrapper>
      <div className="mobile-screen-logo">
        <img src={LoginLogoImg} alt="left-bg" />
      </div>
      {isShowForgotPwdForm ?
        <div className="form-root">
          <div className="please-text">
            Please enter your username.
          </div>
          <div className="form-group">
            <div className="field-label">
              <div className="label-text">Username</div>
            </div>
            <Input
              value={formData.username}
              onChange={(e) => onFormInput("username", e.target.value)}
              placeholder={"Enter your username"}
              className="username"
            />
          </div>
          <div className="action-group reset-pwd">
            <OutlineBtn
              className={"submit-btn"}
              loading={isSendingUsername}
              onClick={handleSendUsername}
            >
              Send
            </OutlineBtn>
            <OutlineBtn
              className={"submit-btn cancel"}
              onClick={handleCancelSendUsername}
            >
              Cancel
            </OutlineBtn>
          </div>
        </div>
        :
        <div className="form-root">
          <div className="welcome-text">Welcome to MDC! 👋</div>
          <div className="please-text">
            Please enter your MDC username and password to login to your account.
          </div>
          <div className="form-group">
            <div className="field-label">
              <div className="label-text">Username</div>
            </div>
            <Input
              value={formData.username}
              onChange={(e) => onFormInput("username", e.target.value)}
              placeholder={"Enter your username"}
              className="username"
            />
          </div>
          <div className="form-group">
            <div className="field-label">
              <div className="label-text">Password</div>
              <div className="forgot-text" onClick={() => setIsShowForgotPwdForm(true)}>Forgot Password?</div>
            </div>
            <PasswordInput
              value={formData.password}
              onChange={(e) => onFormInput("password", e.target.value)}
              onPressEnter={handleSubmit}
              placeholder={"Enter your password"}
              className="password"
            />
          </div>
          <div className="action-group">
            <OutlineBtn
              className={"submit-btn"}
              loading={isUpdating}
              onClick={handleSubmit}
            >
              Login
            </OutlineBtn>
          </div>
        </div>
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem !important;
  width: calc(100% - 100px);

  img {
    height: 80px;
    margin: 0 auto;
    display: flex;
  }
  .form-group {
    margin: 24px 0;
    .ant-input-affix-wrapper {
      border-color: #d8d6de;
      border-radius: 0.357rem;
    }
    .ant-input {
      border-color: #d8d6de;
      border-radius: 0.357rem;
    }
  }
  .username {
    height: 40px;
  }
  .password {
    height: 40px;
  }
  .submit-btn {
    width: 100%;
    height: 38px;
  }
  .welcome-text {
    font-size: 28px;
  }
  .please-text {
    color: #6e6b7b;
    margin-top: 7px;
    font-size: 14px;
  }
  .field-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
    .label-text {
      font-size: 0.857rem;
      color: #6e6b7bc2;
    }
    .forgot-text {
      font-size: 0.857rem;
      color: #00b2ff;
      cursor: pointer;
    }
  }
  .action-group {
    button {
      border-radius: 0.357rem !important;
      background: #00b2ff !important;
      color: white !important;
    }
  }
  .action-group.reset-pwd {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .submit-btn.cancel {
      margin-left: 20px;
    }
  }
  .mobile-screen-logo {
    width: 130px;
    position: absolute;
    top: 30px;
    left: 40px;
    display: none;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  @media (max-width: 1000px) {
    .mobile-screen-logo {
      display: block;
    }
  }
  @media (max-width: 1360px) {
    padding: 0px !important;
    width: calc(100% - 80px);
    .welcome-text {
      font-size: 18px;
    }
    .please-text {
      font-size: 13px;
    }
  }
  @media (max-width: 1360px) {
    width: 60%;
  }

  @media (max-width: 600px) {
    width: 80%;
  }
`;
