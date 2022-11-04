import React from "react";
import { Row, Col, Divider } from "components/common";
import { CheckOutlined } from "@ant-design/icons";
import IntroImg from "assets/images/akashx/coinzoom_academy/token_benefits/zoom_tokens.png";
import TradingImg from "assets/images/akashx/coinzoom_academy/token_benefits/trading_fee.png";
import EarnImg from "assets/images/akashx/coinzoom_academy/token_benefits/coinzoom_earn.png";
import InstantImg from "assets/images/akashx/coinzoom_academy/token_benefits/coinzoom_instant.png";
import VisaImg from "assets/images/akashx/coinzoom_academy/token_benefits/coinzoom_visa.png";
import CardRewardsImg from "assets/images/akashx/coinzoom_academy/token_benefits/coinzoom_card.png";
import ZoomMeImg from "assets/images/akashx/coinzoom_academy/token_benefits/zoomme_global.png";
import styled from "styled-components";

export default function ZoomTokenBenefitsSection(props) {

  return (
    <Wrapper>
      <div className="zoom-token-header">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div className="card-title">
              <h4>Zoom Token</h4>
              <p>CoinZoom's Utility Token</p>
            </div>
          </Col>
        </Row>
      </div>
      <div className="zoom-token-content">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div className="intro-img">
              <img src={IntroImg} />
              <p>ZOOM is an Ethereum ERC20 utility token, with a limited total supply of 600 Million. ZOOM powers the CoinZoom ecosystem, and provides users with a wide variety of discounts, enhancements, and rewards.</p>
            </div>
          </Col>
          <Col xs={24}>
            <div className="zoom-ditribution">
              <h5>ZOOM Distribution:</h5>
              <ul>
                <li><CheckOutlined /><span><strong>50% VIP</strong>, available for purchase by community members to fully participate in our VIP programs</span></li>
                <li><CheckOutlined /><span><strong>30% rewards</strong>​, available to reward users and grow the CoinZoom community</span></li>
                <li><CheckOutlined /><span><strong>20% Team incentives</strong>, subject to 3 years vesting schedule</span></li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <div className="zoom-token-benefits">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div className="title">
              <h5>Benefits of Owning ZOOM</h5>
            </div>
          </Col>
        </Row>
        <div className="benefit-card">
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12}>
              <div className="benefit-text">
                <h5>Trading Fee Discounts</h5>
                <p>Discounts of up to 50%.</p>
                <a>Learn More &raquo;</a>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="benefit-img">
                <img src={TradingImg} />
              </div>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />
        <div className="benefit-card">
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12} className="order-md-2">
              <div className="benefit-text">
                <h5>CoinZoom Earn</h5>
                <p>Up to 20% in bonus interest on your CoinZoom Earn wallet.</p>
                <a>Learn More &raquo;</a>
              </div>
            </Col>
            <Col xs={24} md={12} className="order-md-1">
              <div className="benefit-img">
                <img src={EarnImg} />
              </div>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />
        <div className="benefit-card">
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12}>
              <div className="benefit-text">
                <h5>CoinZoom Instant</h5>
                <p>Earn up to 3% back on all CoinZoom Instant transfers.</p>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="benefit-img">
                <img src={InstantImg} />
              </div>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />
        <div className="benefit-card">
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12} className="order-md-2">
              <div className="benefit-text">
                <h5>CoinZoom VISA Card</h5>
                <p>VIP enhancements for Select, Preferred, Gold, Platinum, and Black level customers.</p>
                <a>Learn More &raquo;</a>
              </div>
            </Col>
            <Col xs={24} md={12} className="order-md-1">
              <div className="benefit-img">
                <img src={VisaImg} />
              </div>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />
        <div className="benefit-card">
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12}>
              <div className="benefit-text">
                <h5>CoinZoom Card Rewards</h5>
                <p>Earn up to 5% back in crypto for all CoinZoom Visa card purchases.</p>
                <a>Learn More &raquo;</a>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="benefit-img">
                <img src={CardRewardsImg} />
              </div>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />
        <div className="benefit-card">
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12} className="order-md-2">
              <div className="benefit-text">
                <h5>ZoomMe Global</h5>
                <p>Free peer-to-peer crypto and USD transfers of up to 10,000 per day.</p>
                <a>Learn More &raquo;</a>
              </div>
            </Col>
            <Col xs={24} md={12} className="order-md-1">
              <div className="benefit-img">
                <img src={ZoomMeImg} />
              </div>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />
        <div className="benefit-card">
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12}>
              <div className="benefit-text">
                <h5>Use Zoom Tokens</h5>
                <p>Use ZOOM tokens to purchase your CoinZoom Visa Card, pay for withdrawals fees, and all areas of the CoinZoom ecosystem.</p>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="benefit-img">
                <img src={TradingImg} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Row gutter={[20, 20]}>
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
  .zoom-token-header {
    .card-title {
      h4 {
        font-weight: 600;
        text-align: center;
      }
      p {
        text-align: center;
      }
    }
  }
  .zoom-token-content {
    max-width: 1000px;
    margin: 0 auto;
    .intro-img {
      img {
        width: 100%;
      }
      p {
        text-align: center;
        margin-top: 30px;
      }
    }
    .zoom-ditribution {
      margin-bottom: 50px;
      h5 {
        font-weight: 600;
        text-align: center;
      }
      ul {
        max-width: 700px;
        margin: 0 auto;
        li {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 10px;
          span {
            margin-left: 10px;
          }
        }
      }
    }
  }
  .zoom-token-benefits {
    padding: 100px 50px;
    text-align: center;
    max-width: 1000px;
    margin: 0 auto;
    background-color: rgb(249, 247, 249);
    h5 {
      font-weight:  600;
      margin-bottom: 50px;
    }
    .benefit-card {
      .benefit-text {
        h5 {
          margin-bottom: 15px;
        }
      }
      .benefit-img {
        img {
          width: 100%;
        }
      }
    }
    .divider {
      width: 30%;
      min-width: 300px;
      margin: 50px auto;
    }
  }
  .footer {
    margin-top: 50px;
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
  @media only screen and (max-width: 575px) {
    .zoom-token-content {
      .zoom-ditribution {
        ul {
          padding: 0;
        }
      }
    }
  }
`