import React from "react";
import { Row, Col } from "components/common";
import { DoubleLeftOutlined } from "@ant-design/icons";
import LogoImg from "assets/images/akashx/link_my_coinzoom/coinzoom_logo_black.png";
import RegisterImg from "assets/images/akashx/link_my_coinzoom/link_coin_zoom.png";
import { Wrapper } from "./LinkCoinzoomPage.styled";

export default function LinkCoinzoomPage(props) {
  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <a className="go-home" onClick={() => props.handleChangeTab("home")}><DoubleLeftOutlined /> Go Home</a>
        </Col>
      </Row>
      <div className="link-coinzoom-content">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div className="logo">
              <img src={LogoImg} />
            </div>
          </Col>
          <Col xs={24}>
            <div className="content">
              <p>The ultimate digital banking experience that allows you to ditch your traditional bank. Buy, sell, and trade over 40 cryptocurrencies including Bitcoin, Ether, and Litecoin on a regulated, secure exchange with some of the lowest fees in the industry. Earn up to 5% back on every purchase with your customized CoinZoom Visa card and earn up to 7.5% APY on your cryptocurrency and USD deposits.</p>
              <strong>Already have an account?</strong>
              <p>Linking your CoinZoom account to MDC lets CoinZoom know you are in the MDC network. Being in the MDC network gives you priority support and counts your Visa card swipes &amp; crypto transactions towards the CoinZoom bonus pool in Akashx. Enter the following code below in your CoinZoom settings (desktop version) under "Corporate Membership":</p>
              <p>165f8a2f-28b3-41ee-810d-9dcee124fc0c</p>
              <strong>Don't have an account?</strong>
              <p>Don't have an account? <a href="http://trade.coinzoom.com/referral_register?referralToken=165f8a2f-28b3-41ee-810d-9dcee124fc0c" target="_blank">Register Here</a></p>
              <img src={RegisterImg} />
            </div>
          </Col>
        </Row>
      </div>
    </Wrapper>
  )
}