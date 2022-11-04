import React from "react";
import { Row, Col, Divider } from "components/common";
import { CheckOutlined } from "@ant-design/icons";
import CheckListImg from "assets/images/akashx/coinzoom_academy/account_setup/checklist.png";
import styled from "styled-components";

export default function AccountSetupSection(props) {

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <div className="page-title">
            <h4><strong>Account Setup</strong></h4>
            <p>Get Started In Minutes</p>
          </div>
        </Col>
        <Col xs={24}>
          <div className="video_container">
            <div className="video_wrapper">
              <iframe src="//player.vimeo.com/video/632508996?autoplay=0&amp;title=0&amp;byline=0&amp;wmode=transparent&amp;autopause=0" frameBorder="0" allowFullscreen="" wmode="opaque" id="fitvid837499"></iframe>
            </div>
            <p className="video_title">VIDEO: Up Your CoinZoom Account (2 min)</p>
          </div>
        </Col>
        <Col xs={24}>
          <div className="checklist">
            <img src={CheckListImg} />
          </div>
        </Col>
        <Col xs={24}>
          <div className="description">
            <div className="find_your_account">
              <Row gutter={[20, 20]}>
                <Col xs={24} lg={12}>
                  <div className="text">
                    <h4><strong>Find Your Account</strong></h4>
                    <ul>
                      <li><p><CheckOutlined />&nbsp;&nbsp;Click&nbsp;<strong>PORTFOLIO</strong></p></li>
                      <li><p><CheckOutlined />&nbsp;&nbsp;Select&nbsp;<strong>TRADING WALLET</strong></p></li>
                      <li><p><CheckOutlined />&nbsp;&nbsp;Select&nbsp;<strong>DEPOSIT</strong></p></li>
                      <li><p><CheckOutlined />&nbsp;&nbsp;Enter&nbsp;<strong>DEPOSIT AMOUNT</strong></p></li>
                      <li><p><CheckOutlined />&nbsp;&nbsp;Enter&nbsp;<strong>CARD DETAILS</strong></p></li>
                      <li><p><CheckOutlined />&nbsp;&nbsp;Click&nbsp;<strong>SUBMIT</strong></p></li>
                    </ul>
                  </div>
                </Col>
                <Col xs={24} lg={12}>
                  <div className="video_wrapper">
                    <iframe src="//www.youtube.com/embed/D4oKBmPnbUo?autoplay=0&amp;modestbranding=1&amp;controls=1&amp;showinfo=0&amp;rel=0&amp;hd=1&amp;wmode=transparent" frameborder="0" allowfullscreen="" wmode="opaque" id="fitvid619388"></iframe>
                  </div>
                </Col>
              </Row>
            </div>
            <Divider />
            <div className="find_your_account">
              <Row gutter={[20, 20]}>
                <Col xs={24} lg={12} className="order-lg-2">
                  <div className="text">
                    <h4><strong>Order Your Debit Card</strong></h4>
                    <ul>
                      <li><p><CheckOutlined />&nbsp;&nbsp;Make sure you have funded your account before ordering card.</p></li>
                      <li><p><CheckOutlined />&nbsp;&nbsp;Select&nbsp;<strong>TRADING WALLET</strong></p></li>
                      <li><p><CheckOutlined />&nbsp;&nbsp;Click&nbsp;<strong>PORTFOLIO</strong></p></li>
                      <li><p><CheckOutlined />&nbsp;&nbsp;Click&nbsp;<strong>SPEND WALLET</strong>on the upper right of the card.</p></li>
                      <li><p><CheckOutlined />&nbsp;&nbsp;Select which currency you want to pay with</p></li>
                      <li><p><CheckOutlined />&nbsp;&nbsp;Buy&nbsp;<strong>ZOOM COINS</strong>before ordering card to dictate card level (color)</p></li>
                      <li><p><CheckOutlined />&nbsp;&nbsp;Select shipping (black card holders <strong>FREE</strong>)</p></li>
                    </ul>
                  </div>
                </Col>
                <Col xs={24} lg={12} className="order-lg-1">
                  <div className="video_wrapper">
                    <iframe src="//www.youtube.com/embed/D4oKBmPnbUo?autoplay=0&amp;modestbranding=1&amp;controls=1&amp;showinfo=0&amp;rel=0&amp;hd=1&amp;wmode=transparent" frameborder="0" allowfullscreen="" wmode="opaque" id="fitvid619388"></iframe>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Divider />
        <Col xs={24}>
          <div className="footer">
            <a target="_blank" href="https://www.coinzoom.com/support/">Support</a>
            <Divider type="vertical" className="footer-divider" />
            <a target="_blank" href="https://www.coinzoom.com/support/">FAQ</a>
          </div>
        </Col>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 10px;
  text-align: center;
  .video_container {
    max-height: 675px;
    .video_wrapper {
      position: relative;
      padding-bottom: 52.25%;
      max-width: 500px;
      margin: 0 auto;
      background-color: #000000;
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-height: 675px;
      }
    }
    .video_title {
      margin-top: 20px;
    }
  }
  .checklist {
    img {
      width: 100%;
      max-width: 500px;
    }
  }
  .description {
    background-color: #f9f7f9;
    padding: 20px;
  }
  .find_your_account {
    margin-top: 50px;
    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      flex-direction: column;
      h4 {
        margin-bottom: 30px;
      }
      ul {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        max-width: 300px;
        margin: 0 auto;
        padding: 0;
        li {
          list-style: none;
          p {
            text-align: left;
          }
        }
      }
    }
    .video_wrapper {
      position: relative;
      padding-bottom: 56.25%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #000000;
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-height: 675px;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    .footer a {
      color: #333;
      font-size: 16px;
      .footer-divider {
        width: 2px;
        background-color: #8f8f8f;
        height: 20px;
      }
    }
  }
`