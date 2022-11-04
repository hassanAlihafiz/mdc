import React from "react";
import { Row, Col } from "components/common";
import BannerSection from "./banner/BannerSection";
import SocialLinkSections from "./socialLink/SocialLinkSections";
import AccountDetailsSection from "./account/AccountDetailsSection";
import StoreSection from "./store/StoreSection";
import TrainingSection from "./training/TrainingSection";
import SellingProductsSection from "./selling/SellingProductsSection";
import { Wrapper } from "./HomePage.styled";

export default function IndexPage() {
  return (
    <Wrapper>
      <div className="main-container">
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <BannerSection />
          </Col>
          <Col xs={24} xl={12} className="responsive-sections">
            <AccountDetailsSection />
          </Col>
          <Col xs={24} xl={12} className="responsive-sections">
            <TrainingSection />
          </Col>
          <Col xs={24} md={12}>
            <SocialLinkSections />
          </Col>
          <Col xs={24} md={12}>
            <StoreSection />
          </Col>
          <Col span={24}>
            <SellingProductsSection />
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
}