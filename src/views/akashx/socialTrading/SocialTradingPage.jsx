import React, { useState } from "react";
import { Row, Col, FormItem, Input, Select, Button } from "components/common";
import BannerImg from "assets/images/akashx/akashx_home_banner.png";
import SocialTradingBgImg from "assets/images/akashx/social_trading/social_bg.png";
import AkashxLogoImg from "assets/images/akashx/akashx_logo.png";
import SocialTradingImg from "assets/images/akashx/social_trading.png";
import { Wrapper } from "./SocialTradingPage.styled";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { countryStates } from 'common/country'

export default function SocialTradingPage(props) {
  const [step, setStep] = useState("home");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    phone: "",
    country: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    phone: "",
    country: ""
  });

  const onChangeFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const validateFormData = () => {
    let errors_ = {
      email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      phone: "",
      country: ""
    };

    let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i 

    if (!formData.email.trim()) {
      errors_['email'] = "Please enter your email";
    } else if (emailRegex.exec(formData.email) == null) {
      errors_['email'] = "Please enter valid email";
    }
    
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
    if (!formData.password) {
      errors_['password'] = "Please enter password";
    } else if (passwordRegex.exec(formData.password) == null) {
      errors_['password'] = "Password should contain uppercase, lowercase, numeric, special characters and longer than 8 characters.";
    }
    if (formData.password!=formData.confirm_password) {
      errors_['confirm_password'] = "Confirm password does not match";
    }

    if (!formData.first_name.trim()) {
      errors_['first_name'] = "Please enter your first name";
    }

    if (!formData.last_name.trim()) {
      errors_['last_name'] = "Please enter your last name";
    }

    if (!formData.phone.trim()) {
      errors_['phone'] = "Please enter your phone number";
    }

    if (!formData.country) {
      errors_['country'] = "Please select country";
    }

    if (errors_.first_name || errors_.last_name || errors_.email || errors_.phone || errors_.password || errors_.confirm_password || errors_.country)  {
      setErrors(errors_);
      return false;
    } else {
      setErrors(errors_)
      return true;
    }
  }

  const handleRegister = () => {
    if (!validateFormData()) return;
  };

  return (
    <Wrapper>
      {step === "home" &&
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <a className="go-home" onClick={() => props.handleChangeTab("home")}><DoubleLeftOutlined /> Go Home</a>
          </Col>
          <Col xs={24}>
            <div className="banner-img-section">
              <img src={BannerImg} className="bg-img" />
              <div className="content">
                <h1><img src={AkashxLogoImg} className="akashx-logo-img" /><label>Social Trading</label></h1>
                <p>Join the largest social trading community where you can choose from thousands of traders in 192 countries and follow their trading signals.</p>
                <a onClick={() => setStep("register")}>Account Access</a>
              </div>
              <img src={SocialTradingBgImg} className="social-bg-img" />
            </div>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <div className="home-content-img">
              <img src={SocialTradingImg} />
            </div>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <div className="home-btn-section">
              <div className="home-register-btn-section home-btn">
                <label>Register for Social Trading</label>
                <a onClick={() => setStep("register")}>Register</a>
              </div>
              <div className="home-login-btn-section home-btn">
                <label>Login to the Platform</label>
                <a href="https://global.akashxsocialtrading.com/" target="_blank">Login</a>
              </div>
              <div className="home-open-btn-section home-btn">
                <label>Open Trading Account</label>
                <a onClick={() => props.handleChangeTab("forex_trading")}>Create Account</a>
              </div>
              <div className="home-faq-btn-section home-btn">
                <label>Frequently Asked Questions</label>
                <a href="https://www.mydailychoice.com/htdocs/backOffice2020/AkashxSocialTradingFAQ.pdf" target="_blank">Download</a>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12} className="video-col pl-50">
            <div className="video-section">
              <iframe id="trainingVideoFrame" className="sproutvideo-player" src="https://videos.sproutvideo.com/embed/069cd6bb1b1de0c38f/051ddb5ca4addbe1" style={{ position:"absolute",width:"100%",height:"100%",left:0,top:0,padding: "0 20px" }} frameBorder="0" allowFullScreen=""></iframe>
            </div>
          </Col>
          <Col xs={24} md={12} className="video-col pr-50">
            <div className="video-section">
              <iframe id="trainingVideoFrame" className="sproutvideo-player" src="https://videos.sproutvideo.com/embed/119cd6bb1b1de7cf98/984df8d78412d68b" style={{ position:"absolute",width:"100%",height:"100%",left:0,top:0,padding: "0 20px" }} frameBorder="0" allowFullScreen=""></iframe>
            </div>
          </Col>
        </Row>
      }
      {step === "register" &&
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <a className="go-home" onClick={() => setStep("home")}><DoubleLeftOutlined /> Back</a>
          </Col>
          <Col xs={24}>
            <div className="register-description">
              <p><strong>Please fill out the form below to register for you Akashx Social Trading account.</strong></p>
              <br />
              <p><strong>Akashx Social Trading Details</strong> - Please select an email and password below.</p>
            </div>
          </Col>
          <Col xs={24}>
            <div className="register-content">
              <Row gutter={[20, 20]}>
                <Col xs={24}>
                  <FormItem
                    label="Email Address"
                    errorMessages={[{ message: errors.email }]}
                  >
                    <Input
                      value={formData.email}
                      onChange={(e) => onChangeFormData("email", e.target.value)}
                      size="large"
                    />
                  </FormItem>
                </Col>
                <Col xs={24} sm={12}>
                  <FormItem
                    label="Password"
                    errorMessages={[{ message: errors.password }]}
                  >
                    <Input
                      value={formData.password}
                      onChange={(e) => onChangeFormData("password", e.target.value)}
                      size="large"
                    />
                  </FormItem>
                </Col>
                <Col xs={24} sm={12}>
                  <FormItem
                    label="Confirm Password"
                    errorMessages={[{ message: errors.confirm_password }]}
                  >
                    <Input
                      value={formData.confirm_password}
                      onChange={(e) => onChangeFormData("confirm_password", e.target.value)}
                      size="large"
                    />
                  </FormItem>
                </Col>
              </Row>
              <br />
              <br />
              <Row gutter={[20, 20]}>
                <Col xs={24}>
                  <p><strong>Account Information</strong></p>
                </Col>
              </Row>
              <br />
              <Row gutter={[20, 20]}>
                <Col xs={24} sm={12}>
                  <FormItem
                    label="First Name"
                    errorMessages={[{ message: errors.first_name }]}
                  >
                    <Input
                      value={formData.first_name}
                      onChange={(e) => onChangeFormData("first_name", e.target.value)}
                      size="large"
                    />
                  </FormItem>
                </Col>
                <Col xs={24} sm={12}>
                  <FormItem
                    label="Last Name"
                    errorMessages={[{ message: errors.last_name }]}
                  >
                    <Input
                      value={formData.last_name}
                      onChange={(e) => onChangeFormData("last_name", e.target.value)}
                      size="large"
                    />
                  </FormItem>
                </Col>
                <Col xs={24} sm={12}>
                  <FormItem
                    label="Phone"
                    errorMessages={[{ message: errors.phone }]}
                  >
                    <Input
                      value={formData.phone}
                      onChange={(e) => onChangeFormData("phone", e.target.value)}
                      size="large"
                    />
                  </FormItem>
                </Col>
                <Col xs={24} sm={12}>
                  <FormItem
                    label="Country"
                    errorMessages={[{ message: errors.country }]}
                  >
                    <Select
                      value={formData.country}
                      options={[
                        ...countryStates.map(el => ({
                          label: el.name,
                          value: el.code2,
                          key: el.code2
                        }))
                      ]}
                      onChange={(value) => onChangeFormData("country", value)}
                      size="large"
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                <Col xs={24}>
                  <Button onClick={handleRegister}>Register</Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      }
    </Wrapper>
  )
}