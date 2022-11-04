import React from "react";
import { Row, Col, Divider } from "components/common";
import BuyCoinsImg from "assets/images/akashx/coinzoom_academy/get_started/buy.jpg";
import OrderImg from "assets/images/akashx/coinzoom_academy/get_started/order.png";
import GetPaidImg from "assets/images/akashx/coinzoom_academy/get_started/get_paid.jpg";
import EarnImg from "assets/images/akashx/coinzoom_academy/debit_cards/coinzoom_earn.png";
import PayDifferentImg from "assets/images/akashx/coinzoom_academy/get_started/different_coins.jpg";
import BlackCardImg from "assets/images/akashx/coinzoom_academy/debit_cards/black.svg";
import PlatinumCardImg from "assets/images/akashx/coinzoom_academy/debit_cards/platinum.svg";
import GoldCardImg from "assets/images/akashx/coinzoom_academy/debit_cards/gold.svg";
import PreferredCardImg from "assets/images/akashx/coinzoom_academy/debit_cards/preferred.svg";
import SelectCardImg from "assets/images/akashx/coinzoom_academy/debit_cards/select.svg";
import styled from "styled-components";

export default function GetStartedWaysSection(props) {

  return (
    <Wrapper>
      <div className="page-title">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div className="title">
              <h4>Get Started</h4>
              <p>with CoinZoom</p>
            </div>
          </Col>
        </Row>
      </div>
      <div className="section-title">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div className="title">
              <p>Once you start a CoinZoom account, here's what to do next...</p>
              <h4>5 Ways To Utilize CoinZoom Every Day</h4>
            </div>
          </Col>
        </Row>
      </div>
      <div className="section-content">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12}>
            <div className="buy-zoom-coins info-text">
              <h5>1. Buy Zoom Coins</h5>
              <p>Zoom Coin's are utility tokens for the CoinZoom platform. The more Zoom Coin's you buy, the more perks become available including cash back, earning interest, sending money, referring friends and specialty debit cards.</p>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="buy-zoom-coins info-img">
              <img src={BuyCoinsImg} />
            </div>
          </Col>
        </Row>
        <Divider className="divider" />
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12} className="order-sm-2">
            <div className="buy-zoom-coins info-text">
              <h5>2. Order Your VISA Debit Card</h5>
              <p>Earn up to 5% cash back anywhere, anytime. You can pay rent, utilities, groceries, business expenses, netflix... basically EVERYTHING with your CoinZoom card.</p>
              <p>Card options below.</p>
            </div>
          </Col>
          <Col xs={24} sm={12} className="order-sm-1">
            <div className="buy-zoom-coins info-img">
              <img src={OrderImg} />
            </div>
          </Col>
        </Row>
        <Divider className="divider" />
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12} md={8}>
            <div class="coin-card">
              <img src={BlackCardImg} alt="" />
              <h5>
                Level: BLACK
              </h5>
              <h5>100,000 ZOOM</h5>
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
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div class="coin-card">
              <img src={PlatinumCardImg} alt="" />
              <h5>
                Level: PLATINUM
              </h5>
              <h5>50,000 ZOOM</h5>
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
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div class="coin-card">
              <img src={GoldCardImg} alt="" />
              <h5>
                Level: GOLD
              </h5>
              <h5>25,000 ZOOM</h5>
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
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div class="coin-card">
              <img src={PreferredCardImg} alt="" />
              <h5>
                Level: PREFERRED
              </h5>
              <h5>10,000 ZOOM</h5>
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
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div class="coin-card">
              <img src={SelectCardImg} alt="" />
              <h5>
                Level: SELECT
              </h5>
              <h5>2,000 ZOOM</h5>
              <ul>
                <li>Virtual Card</li>
                <li>Card Rewards Back 1%</li>
                <li>ZoomMe Global 500/day</li>
                <li>Referral Reward Limit 1,000</li>
                <li>Card Security Features</li>
                <li>24/7 Support</li>
                <li>ATM Access</li>
                <li>Physical Card 200 ZOOM</li>
              </ul>
            </div>
          </Col>
        </Row>
        <Divider className="divider" />
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12}>
            <div className="buy-zoom-coins info-text">
              <h5>3. Get Paid Daily For Staking</h5>
              <p>CoinZoom offers special promotions for their community generally each month. You can earn free coins just owning specific coins. Think of it like stock dividends.</p>
              <p>Note: The example below shows the staking of Mainframe (MFT), which is paid daily.</p>
              <p>Staking promotions vary, so check to see which promotion is active.</p>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="buy-zoom-coins info-img">
              <img src={GetPaidImg} />
            </div>
          </Col>
        </Row>
        <Divider className="divider" />
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12} className="order-sm-2">
            <div className="buy-zoom-coins info-text">
              <h5>4. Earn Interest Daily On Your Coins</h5>
              <p>Receive up to 7.50% APY on your cryptocurrency and USD deposits. Earn interest on over 40 coins. Note: Your current bank pays you between 1-2% annually interest on your USD compared to CoinZoom's 9%. Make the switch.</p>
            </div>
          </Col>
          <Col xs={24} sm={12} className="order-sm-1">
            <div className="buy-zoom-coins info-img">
              <img src={EarnImg} />
            </div>
          </Col>
        </Row>
        <Divider className="divider" />
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12}>
            <div className="buy-zoom-coins info-text">
              <h5>5. Pay with Different Coins</h5>
              <p>Instead of selling your coins back into USD then swiping, you can simply select whatever coin you would like to pay with, turns it to USD automatically.</p>
              <p>As you're waiting in line at the grocery store... scroll through and find which coin you'd like to pay with.</p>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="buy-zoom-coins info-img">
              <img src={GetPaidImg} />
            </div>
          </Col>
        </Row>
      </div>
      <Divider className="divider" />
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
  .page-title {
    text-align: center;
    h4 {
      font-weight: 600;
    }
  }
  .section-title {
    text-align: center;
    margin-top: 50px;
    h4 {
      font-weight: 600;
    }
  }
  .section-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 20px;
    background-color: rgb(249, 247, 249);
    .info-text {
      h5 {
        font-weight: 600;
      }
    }
    .info-img {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        max-width: 300px;
      }
    }
    .coin-card {
      text-align: center;
      img {
        width: 100%;
        max-width: 250px;
        margin-bottom: 30px;
      }
      ul {
        li {
          list-style: none;
        }
      }
    }
  }
  .divider {
    min-width: 50%;
    width: 50%;
    margin: 50px auto;
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