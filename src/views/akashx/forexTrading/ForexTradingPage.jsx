import React from "react";
import { Row, Col } from "components/common";
import BannerImg from "assets/images/akashx/akashx_home_banner.png";
import { DoubleLeftOutlined } from "@ant-design/icons";
import OandaLogoImg from "assets/images/akashx/forex_trading/oanda_logo.png";
import AaafxLogoImg from "assets/images/akashx/forex_trading/aaafx_logo.png";
import UsFlagImg from "assets/images/akashx/forex_trading/us_flag.png";
import EuFlagImg from "assets/images/akashx/forex_trading/eu_flag.png";
import GlobalFlagImg from "assets/images/akashx/forex_trading/global_flag.jpg";
import { Wrapper } from "./ForexTradingPage.styled";

export default function ForexTradingPage(props) {

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <a className="go-home" onClick={() => props.handleChangeTab("social_trading")}><DoubleLeftOutlined /> Back</a>
        </Col>
        <Col xs={24}>
          <div className="banner-img-section">
            <img src={BannerImg} />
            <div className="text-content">
              <h1>Forex <label>Trading</label></h1>
              <p>Although Akashx is NOT a broker, we have partnered with regulated brokers where you can open a trading account. If you’re using our Akashx Social Trading platform, you must use one of the approved brokers below.</p>
            </div>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className="trading-card">
            <img src={OandaLogoImg} className="oanda logo-img" />
            <img src={UsFlagImg} className="us flag-img" />
            <h5>USA Traders</h5>
            <label><strong>Trade forex in the USA with a regulated broker</strong></label>
            <p>Oanda is a globally recognized broker with 23 years' experience in forex trading. Speculate on fast-moving forex prices using the powerful OANDA Trade platform.</p>
            <a href="https://www.oanda.com/apply/?ib=2011060" target="_blank">Create Account</a>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className="trading-card">
            <img src={AaafxLogoImg} className="aaafx logo-img" />
            <img src={EuFlagImg} className="eu flag-img" />
            <h5>European Traders</h5>
            <label><strong>Trade forex in the EU with a regulated broker</strong></label>
            <p>AAAFx is an EU regulated Broker specializing in Forex, CFDs, and Cryptotrading. Open an account with AAAFx and enjoy ultra-low commissions in a multifunctional user area.</p>
            <a href="https://www.aaafx.com/sign-up?p=akashx" target="_blank">Create Account</a>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className="trading-card">
            <img src={AaafxLogoImg} className="aaafx logo-img" />
            <img src={GlobalFlagImg} className="global flag-img" />
            <h5>Global Traders</h5>
            <label><strong>Trade forex globally with a regulated broker</strong></label>
            <p>AAAFx International is a Broker specializing in Forex, CFDs, and Cryptotrading. Open an account with AAAFx international and enjoy ultra-low commissions in a multifunctional user area.</p>
            <a href="https://international.aaafx.com/sign-up?p=akashx" target="_blank">Create Account</a>
          </div>
        </Col>
      </Row>
    </Wrapper>
  )
}