import React from "react";
import { Row, Col, Divider } from "components/common";
import DebitCardsImg from "assets/images/akashx/coinzoom_academy/debit_cards/debit_cards.png";
import BlackCardImg from "assets/images/akashx/coinzoom_academy/debit_cards/black.svg";
import PlatinumCardImg from "assets/images/akashx/coinzoom_academy/debit_cards/platinum.svg";
import GoldCardImg from "assets/images/akashx/coinzoom_academy/debit_cards/gold.svg";
import PreferredCardImg from "assets/images/akashx/coinzoom_academy/debit_cards/preferred.svg";
import SelectCardImg from "assets/images/akashx/coinzoom_academy/debit_cards/select.svg";
import EarnImg from "assets/images/akashx/coinzoom_academy/debit_cards/coinzoom_earn.png";
import styled from "styled-components";

export default function DebitCardsSection(props) {

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <div className="title">
            <h4>Debit Cards</h4>
            <p>powered by VISA</p>
          </div>
        </Col>
        <Col xs={24}>
          <div className="debit-cards">
            <img src={DebitCardsImg} />
            <p>We've made spending crypto easier than ever with our true cryptocurrency debit card that allows you to select from over 40 cryptocurrencies to spend and is accepted at over 53M merchants worldwide.</p>
          </div>
        </Col>
      </Row>
      <div className="cash-back-rewards">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div className="cash-back-rewards-title">
              <h4>1. Cash Back Rewards</h4>
              <p>You can pay rent, utilities, groceries, marketing business, pretty much EVERYTHING with your CoinZoom card and receive up to 5% cash back depending on how many Zoom Coins you currently hold.</p>
            </div>
          </Col>
        </Row>
        <div className="rewards-card">
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={12}>
              <div className="rewards-card-image">
                <img src={BlackCardImg} />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="rewards-card-text">
                <div className="rewards-card-title">
                  <h5>Level: BLACK</h5>
                </div>
                <div className="rewards-card-description">
                  <ul>
                    <li>Trading Fee Discount 50%</li>
                    <li>Card Rewards Back 5%</li>
                    <li>CoinZoom Instant Rewards 3%</li>
                    <li>20% Bonus Interest</li>
                    <li>CoinZoom Earn</li>
                    <li>ZoomMe Global 10,000/day</li>
                    <li>Virtual Card</li>
                    <li>Referral Reward Limit 50,000</li>
                    <li>Card Security Features</li>
                    <li>24/7 Support</li>
                    <li>ATM Access</li>
                    <li>Free Metal Card</li>
                    <li>Required ZOOM Holdings 100,000</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="rewards-card">
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={12} className="order-lg-2">
              <div className="rewards-card-image">
                <img src={PlatinumCardImg} />
              </div>
            </Col>
            <Col xs={24} lg={12} className="order-lg-1">
              <div className="rewards-card-text">
                <div className="rewards-card-title">
                  <h5>Level: PLATINUM</h5>
                </div>
                <div className="rewards-card-description">
                  <ul>
                    <li>Trading Fee Discount 35% </li>
                    <li>Card Rewards Back 4% </li>
                    <li>CoinZoom Instant Rewards 2%</li>
                    <li>15% Bonus Interest</li>
                    <li>CoinZoom Earn</li>
                    <li>ZoomMe Global 5,000/day</li>
                    <li>Virtual Card</li>
                    <li>Referral Reward Limit 20,000</li>
                    <li>Card Security Features</li>
                    <li>24/7 Support</li>
                    <li>ATM Access</li>
                    <li>Free Physical Card</li>
                    <li>Required ZOOM Holdings 50,000</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="rewards-card">
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={12}>
              <div className="rewards-card-image">
                <img src={GoldCardImg} />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="rewards-card-text">
                <div className="rewards-card-title">
                  <h5>Level: GOLD</h5>
                </div>
                <div className="rewards-card-description">
                  <ul>
                    <li>Trading Fee Discount 20%</li>
                    <li>Card Rewards Back 3%</li>
                    <li>CoinZoom Instant Rewards 1%</li>
                    <li>10% Bonus Interest</li>
                    <li>CoinZoom Earn</li>
                    <li>ZoomMe Global 2,500/day</li>
                    <li>Virtual Card</li>
                    <li>Referral Reward Limit 50,000</li>
                    <li>Card Security Features</li>
                    <li>24/7 Support</li>
                    <li>ATM Access</li>
                    <li>Free Physical Card</li>
                    <li>Required ZOOM Holdings 25,000</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="rewards-card">
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={12} className="order-lg-2">
              <div className="rewards-card-image">
                <img src={PreferredCardImg} />
              </div>
            </Col>
            <Col xs={24} lg={12} className="order-lg-1">
              <div className="rewards-card-text">
                <div className="rewards-card-title">
                  <h5>Level: PREFERRED</h5>
                </div>
                <div className="rewards-card-description">
                  <ul>
                    <li>Trading Fee Discount 10%</li>
                    <li>Card Rewards Back 2%</li>
                    <li>5% Bonus Interest</li>
                    <li>CoinZoom Earn</li>
                    <li>ZoomMe Global 1,000/day</li>
                    <li>Virtual Card</li>
                    <li>Referral Reward Limit 2,500</li>
                    <li>Card Security Features</li>
                    <li>24/7 Support</li>
                    <li>ATM Access</li>
                    <li>Physical Card 200 ZOOM</li>
                    <li>Required ZOOM Holdings 10,000</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="rewards-card">
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={12}>
              <div className="rewards-card-image">
                <img src={SelectCardImg} />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="rewards-card-text">
                <div className="rewards-card-title">
                  <h5>Level: SELECT</h5>
                </div>
                <div className="rewards-card-description">
                  <ul>
                    <li>Virtual Card</li>
                    <li>Card Rewards Back 1%</li>
                    <li>ZoomMe Global 500/day</li>
                    <li>Referral Reward Limit 1,000</li>
                    <li>Card Security Features</li>
                    <li>24/7 Support</li>
                    <li>ATM Access</li>
                    <li>Physical Card 200 ZOOM</li>
                    <li>Required ZOOM Holdings To Earn</li>
                    <li>Rewards 2,000</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="coinzoom-earn">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div className="earn-title">
              <h4>2. CoinZoom Earn</h4>
            </div>
          </Col>
          <Col xs={24}>
            <div className="earn-btn">
              <a href="https://www.coinzoom.com/crypto-interest/" target="_blank">View Earn Coins</a>
            </div>
          </Col>
          <Col xs={24}>
            <div className="earn-img">
              <img src={EarnImg} />
            </div>
          </Col>
        </Row>
      </div>
      <Divider />
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
  .title {
    text-align: center;
  }
  h4 {
    font-weight: 600;
  }
  .debit-cards {
    text-align: center;
    img {
      width: 90%;
      max-width: 800px;
      margin: 0 auto;
    }
    p {
      max-width: 800px;
      margin: 20px auto;
      text-align: center;
    }
  }
  .cash-back-rewards {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 50px;
    background-color: rgb(249, 247, 249);
    .rewards-card {
      padding: 50px;
    }
    .rewards-card-image {
      display: flex;
      justify-content: center;
      img {
        max-height: 400px;
      }
    }
    .rewards-card-text {
      margin-left: 50px;
      ul {
        li {
          margin-bottom: 5px;
        }
      }
    }
  }
  .coinzoom-earn {
    text-align: center;
    margin-top: 50px;
    padding: 30px 20px;
    max-width: 900px;
    margin: 50px auto;
    background-color: rgb(249,247,249);
    .earn-img{
      margin-top: 30px;
    }
    a {
      background-color: rgb(45, 45, 45);
      color: #ffffff;
      padding: 10px 30px;
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
  @media only screen and (max-width: 575px) {
    .cash-back-rewards {
      padding: 20px 10px;
      .rewards-card {
        padding: 0;
      }
      .rewards-card-text {
        margin-left: 0;
      }
    }
  }
`