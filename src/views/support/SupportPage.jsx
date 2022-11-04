import React from "react";
import { Row, Col } from "components/common";
import { HomeOutlined, GlobalOutlined } from "@ant-design/icons";
import { FaFacebookF, FaTwitter, FaYoutube, FaHeadset } from "react-icons/fa";
import ContactImage from "assets/images/contact_us.jpg";
import styled from "styled-components";

export default function IndexPage() {
  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <img src={ContactImage} className="contact-us-banner" />
        </Col>
        <Col xs={24}>
          <div className="info-container">
            <HomeOutlined />
            <h3 className="title">Corporate Office</h3>
            <h5>MyDailyChoice, Inc</h5>
            <p>6713 S Eastern Ave Las Vegas, NV 89119</p>
          </div>
        </Col>
        <Col xs={24}>
          <div className="info-container">
            <FaHeadset />
            <h3 className="title">Customer Support</h3>
          </div>
        </Col>
        <Col xs={24}>
          <div className="customer-support-container">
            <Row container gutter={[20, 20]} className="customer-support-row">
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <strong>Customer Phone Support</strong>
                  <p>+1 (888) 877-5436</p>
                  <p>Monday - Friday, 6AM - 5PM PST</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <strong>Canada Phone Support</strong>
                  <p>+1 (705) 995-1601</p>
                  <p>Monday - Friday, 6AM - 5PM PST</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <strong>UK Phone Support</strong>
                  <p>+44-808-164-7974</p>
                  <p>Monday - Friday, 8AM - 5PM GMT</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <strong>Nigeria Phone Support</strong>
                  <p>+234 704 470 0944</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <strong>South Africa Phone Support</strong>
                  <p>+27 87 012 5475</p>
                  <p>9AM - 5PM</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <strong>Kenya Phone Support</strong>
                  <p>+254 741 370 623</p>
                  <p>Monday to Friday : 9 AM- 5.00 PM</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <strong>Taiwan Phone Support</strong>
                  <p>886-2-27168567</p>
                  <p>早上10點到下午6點</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <strong>Japan Phone Support</strong>
                  <p>0120-460-125</p>
                  <p>Tues to Friday 11am - 3pm Tokyo Time</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <strong>Email Support</strong>
                  <p><a href="mailto:Support@MyDailyChoice.com">Support@MyDailyChoice.com</a></p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <strong>Japan Email Support</strong>
                  <p><a href="mailto:jp@MyDailyChoice.com">jp@MyDailyChoice.com</a></p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24}>
          <div className="info-container">
            <h3 className="title">Return Addresses</h3>
          </div>
        </Col>
        <Col xs={24}>
          <div className="customer-support-container return-addresses">
            <Row container gutter={[20, 20]} className="customer-support-row">
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <div className="text-header">
                    <strong>USA Return Address</strong>
                  </div>
                  <div className="text-content">
                    <strong>MyDailyChoice, Inc.</strong>
                    <p>6713 S Eastern Ave Las Vegas, NV 89119</p>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <div className="text-header">
                    <strong>Canada Return Address</strong>
                  </div>
                  <div className="text-content">
                    <strong>&nbsp;</strong>
                    <p>4240 Harvester Rd, Unit 2 Burlington, ON L7L0E8</p>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <div className="text-header">
                    <strong>European Return Address</strong>
                  </div>
                  <div className="text-content">
                    <strong>Green Logistics</strong>
                    <p>Albert Harkemaweg 66 9831 TA Aduard The Netherlands</p>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <div className="text-header">
                    <strong>Australia/ New Zealand Return Address</strong>
                  </div>
                  <div className="text-content">
                    <strong>Landmark Australia</strong>
                    <p>(AUS) 7 Eucalyptus Pl. Eastern Creek, NSW 2766 Australia</p>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6}>
                <div className="info-text">
                  <div className="text-header">
                    <strong>All Other Countries</strong>
                  </div>
                  <div className="text-content">
                    <strong>Landmark Global</strong>
                    <p>Building 852 PO Box 7915 Brucargo 829C 1830 Machelen Belgium</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24}>
          <div className="info-container">
            <GlobalOutlined />
            <h3 className="title">Stay Connected</h3>
            <div className="social-icons">
              <FaFacebookF />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #ffffff;
  .contact-us-banner {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
  }
  .info-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    svg {
      color: #05c1ff;
      margin-right: 20px;
      font-size: 36px;
    }
  }
  .title {
    align-items: center;
    margin-top: 20px;
  }
  p,
  strong {
    font-size: 16px;
    margin-bottom: 20px;
    text-align: center;
  }
  .customer-support-container {
    padding: 0 20px;
  }
  .customer-support-row {
    justify-content: center;
  }
  .info-text {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 500px;
    height: 100%;
    min-height: 200px;  
    padding: 20px;
    background-color: #f5f3f3;
    h5 {
      margin-bottom: 20px;
    }
    a {
      overflow-wrap: anywhere;
      color: #05c1ff;
    }
    &:hover {
      background: #05c1ff;
      color: #ffffff;
      transform: scale(1.02);
      a {
        color: #ffffff;
      }
    }
  }
  .return-addresses {
    .info-text {
      padding: 0;
      .text-header {
        padding: 20px;
        width: 100%;
        text-align: center;
        background-color: #003F7D;
        color: white;
        strong {
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          min-height: 48px;
        }
      }
      .text-content {
        text-align: center;
        padding: 20px;
        p {
          margin-top: 20px;
        }
      }
    }
  }
  .social-icons {
    font-size: 36px;
    svg {
      margin: 0 12px;
      cursor: pointer;
      color: #05c1ff;
    }
  }
`