import React from "react";
import { Row, Col } from "components/common";
import BannerImg from "assets/images/akashx/akashx_home_banner.png";
import ForexCryptoImg from "assets/images/akashx/forex_and_crypto.png";
import SocialTradingImg from "assets/images/akashx/social_trading.png";
import MarketingResearchToolsImg from "assets/images/akashx/marketing_research_tools.png";
import CoinZoomAcademyImg from "assets/images/akashx/coin_zoom.png";
import SignalsImg from "assets/images/akashx/signals.png";
import SignalsAnalyzerImg from "assets/images/akashx/signals_analyzer.png";
import AkashxTvImg from "assets/images/akashx/akashx_tv.png";
import TrainingTutorialsImg from "assets/images/akashx/training_and_tutorials.png";
import ComplianceImg from "assets/images/akashx/compliance.png";
import { Wrapper } from "./HomePage.styled";
import { Button } from "components/common";

export default function HomePage(props) {
  const cards = [
    {
      value: 1,
      key: "forex_and_crypto",
      title: "Forex and Crypto Academy",
      image: ForexCryptoImg
    },
    {
      value: 2,
      key: "social_trading",
      title: "Social Trading",
      image: SocialTradingImg
    },
    {
      value: 3,
      key: "market_research",
      title: "Marketing Research Tools",
      image: MarketingResearchToolsImg
    },
    {
      value: 4,
      key: "coinzoom_academy",
      title: "CoinZoom Academy",
      image: CoinZoomAcademyImg
    },
    {
      value: 5,
      key: "signals",
      title: "Signals",
      image: SignalsImg
    },
    {
      value: 6,
      key: "signals_analyzer",
      title: "Signals Analyzer",
      image: SignalsAnalyzerImg
    },
    {
      value: 7,
      key: "akashx_tv",
      title: "Akashx TV",
      image: AkashxTvImg
    },
    {
      value: 8,
      key: "training_tutorials",
      title: "Training & Tutorials",
      image: TrainingTutorialsImg
    },
    {
      value: 9,
      key: "compliance",
      title: "Compliance",
      image: ComplianceImg
    },
  ]

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <div className="banner-img-section">
            <img src={BannerImg} />
            <div className="text-content">
              <h1>Welcome To <label>Akashx</label></h1>
              <p>Digital currencies are changing the world and the way we think about finance. Akashx is a revolutionary education platform providing tools and solutions to help traders master their Forex and Cryptocurrency portfolio.</p>
            </div>
          </div>
        </Col>
        <Col xs={24}>
          <div className="cards-content-title">
            <h2>Product Access</h2>
          </div>
        </Col>
        {cards.map((el) => (
          <Col xs={24} sm={12} md={8} key={el.key}>
            <div className="card-content">
              <img src={el.image} />
              <h5>{el.title}</h5>
              <Button onClick={() => props.handleChangeTab(el.key)}>Access</Button>
            </div>
          </Col>
        ))}
      </Row>
    </Wrapper>
  )
}