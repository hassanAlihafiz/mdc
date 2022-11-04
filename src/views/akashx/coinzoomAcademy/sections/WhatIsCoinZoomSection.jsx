import React from "react";
import { Alert, Row, Col, Divider } from "components/common";
import DebitCardsImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/debit_cards.png";
import SecurityImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/security.png";
import RegulatedCompliantImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/regulated_compliant.png";
import ZoomMEImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/zoom_me.png";
import DeepLiquidityImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/deep_liquidity.png";
import AdvancedAnalyticsImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/advanced_analytics.png";
import CoinzoomVisaImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/coinzoom_visa.png";
import GreenCoinsImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/green_coins.png";
import MastercardImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/mastercard.png";
import CryptoCardImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/crypto_card.png";
import GatewayZoomMeImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/gateway_zoomme.png";
import EarnImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/earn.png";
import MultiPaymentsImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/multi_payments.png";
import MultiCurrencyImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom/multi_currency.png";
import styled from "styled-components";

export default function WhatIsCoinZoomSection(props) {

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <Alert
            type="info"
            message={"CoinZoom"}
            description={"#1 Preferred Digital Platform"}
            showIcon
          />
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <div className="title">
            <h4>The Complete <strong>Bitcoin &amp; Crypto</strong> Experience</h4>
            <p>Buy, sell, earn, send and spend crypto.</p>
          </div>
        </Col>
        <Col xs={24}>
          <div className="video_container">
            <div class="video_wrapper">
              <iframe src="https://www.youtube.com/embed/UaTGx3QnVgI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" id="fitvid406835"></iframe>
            </div>
          </div>
        </Col>
        <Col xs={24}>
          <div className="debit-cards">
            <img src={DebitCardsImg} />
            <h4><strong>Global Debit Cards</strong></h4>
            <p>Powered by VISA</p>
            <p>Easily spend your fiat and digital asset balances at over 53 million merchants.</p>
          </div>
        </Col>
      </Row>
      <div className="digital_asset">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div className="digital_assets_title">
              <h4>GATEWAY FOR DIGITAL ASSETS</h4>
              <p>Easily Accessable For Mass Adoption</p>
              <Divider className="divider" />
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="asset">
              <img src={SecurityImg} />
              <h5><strong>Security</strong></h5>
              <p>Your assets are secured and insured at multiple institutional qualified custodians.</p>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="asset">
              <img src={RegulatedCompliantImg} />
              <h5><strong>Regulated &amp; Compliant</strong></h5>
              <p>Leveraging decades of financial service and regulatory experience for our exchange.</p>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="asset">
              <img src={ZoomMEImg} />
              <h5><strong>ZoomMe</strong></h5>
              <p>A simple, instant, &amp; free way to send and receive cash and digital assets, painlessly.</p>
            </div>
          </Col>
          <Col xs={24}>
            <div className="center-green-coins-img">
              <img src={GreenCoinsImg} />
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="asset">
              <img src={DeepLiquidityImg} />
              <h5><strong>Deep Liquidity</strong></h5>
              <p>Experience our vast network of market makers, OTC desks, and proprietary trading pools.</p>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="asset">
              <img src={AdvancedAnalyticsImg} />
              <h5><strong>Advanced Analytics</strong></h5>
              <p>A large and growing library of technical indicators, market studies, and a variety of order types.</p>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="asset">
              <img src={CoinzoomVisaImg} />
              <h5><strong>CoinZoom Visa Card</strong></h5>
              <p>Instantly convert digital assets to fiat, allowing global purchases at +53M locations.</p>
            </div>
          </Col>
        </Row>
      </div>
      <div className="fiat-gateway">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div className="fiat-gateway-title">
              <h4><strong>Premier Fiat Gateway</strong></h4>
              <Divider className="divider" />
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="gateway-asset">
              <img src={MastercardImg} />
              <h5><strong>Card &rarr; Crypto</strong></h5>
              <p>Use international cards to easily buy digital assets.</p>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="gateway-asset">
              <img src={CryptoCardImg} />
              <h5><strong>Crypto &rarr; Card</strong></h5>
              <p>Convert digital assets to fiat and buy goods and services anywhere Visa cards are accepted.</p>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="gateway-asset">
              <img src={GatewayZoomMeImg} />
              <h5><strong>ZoomMe</strong></h5>
              <p>Instant international peer to peer fiat or digital asset money transfer. Did we mention it's Free.</p>
            </div>
          </Col>
          <Col xs={24}>
            <Divider className="divider" />
          </Col>
          <Col xs={24} md={8}>
            <div className="gateway-asset">
              <img src={EarnImg} />
              <h5><strong>Earn (Up to 7.5%)</strong></h5>
              <p>Use international cards to easily buy digital assets.</p>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="gateway-asset">
              <img src={MultiPaymentsImg} />
              <h5><strong>Multiple Payment Methods</strong></h5>
              <p>Fund your account with debit cards, wires, ACH, or other assets.</p>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="gateway-asset">
              <img src={MultiCurrencyImg} />
              <h5><strong>Multi-Currency Support</strong></h5>
              <p>Fund your account with your local currency.</p>
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div className="footer">
              <a target="_blank" href="https://www.coinzoom.com/support/">Support</a>
              <Divider type="vertical" className="footer-divider" />
              <a target="_blank" href="https://www.coinzoom.com/support/">FAQ</a>
            </div>
          </Col>
        </Row>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 20px;
  .title {
    margin: 50px 0 30px;
    h4 {
      text-align: center;
    }
    p {
      text-align: center;
    }
  }
  .video_container {
    max-height: 675px;
    .video_wrapper {
      position: relative;
      padding-bottom: 56.25%;
      max-width: 1200px;
      margin: 0 auto;
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
  .debit-cards {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 90%;
      max-width: 600px;
      margin: 0 auto;
    }
  }
  .digital_asset {
    max-width: 900px;
    margin: 20px auto;
    padding: 50px;
    background-color: #000000;
    .digital_assets_title {
      color: #ffffff;
      text-align: center;
      h4 {
        color: #ffffff;
      }
    }
    .asset {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      text-align: center;
      margin-top: 40px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px dashed #ffffff;
        padding: 5px;
      }
      h5 {
        color: #ffffff;
        margin-top: 20px;
      }
    }
    .center-green-coins-img {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      img {
        width: 90%;
        max-width: 400px;
      }
    }
  }
  .fiat-gateway {
    text-align: center;
    max-width: 900px;
    margin: 50px auto;
    .gateway-asset {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin-top: 40px;
      padding: 20px;
      img {
        height: 80px;
      }
      h5 {
        margin-top: 20px;
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
  .divider {
    width: 80px;
    margin: 0 auto;
    height: 3px;
    min-width: 80px;
    background-color: rgb(96,180,32);
  }
`