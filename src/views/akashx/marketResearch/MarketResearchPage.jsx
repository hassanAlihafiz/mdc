import React from "react";
import { Row, Col } from "components/common";
import AnimationCard from "./AnimationCard";
import { DoubleLeftOutlined } from "@ant-design/icons";
import AnalysisImg from "assets/images/akashx/market_research/analysis.jpg";
import VideosImg from "assets/images/akashx/market_research/videos.jpg";
import NewsImg from "assets/images/akashx/market_research/news.jpg";
import WebinarsImg from "assets/images/akashx/market_research/webinars.jpg";
import { Wrapper } from "./MarketResearchPage.styled";

export default function MarketResearchPage(props) {
  const cards = [
    {
      value: 1,
      key: "market_research_analysis",
      route: "market_research_analysis",
      title: "Analysis",
      content: "Our daily technical analysis highlight current market trends and price movements for forex, stocks, and cryptocurrency markets. These articles all use language that is simple and easy to understand.",
      image: AnalysisImg
    },
    {
      value: 2,
      key: "market_research_videos",
      route: "market_research_videos",
      title: "Videos",
      content: "Get access to daily videos with expert analysis on market trends and price movements.",
      image: VideosImg
    },
    {
      value: 3,
      key: "market_research_news",
      route: "market_research_news",
      title: "News",
      content: "We bring our members the latest financial news covering the Forex and Cryptocurrency markets, as well as stocks, commodities, and economic indicators.",
      image: NewsImg
    },
    {
      value: 4,
      key: "market_research_webinars",
      route: "market_research_webinars",
      title: "Webinars",
      content: "Akashx members have access to two 30+ minute webinars per week covering some of the most important topics such as support & resistance, fundamentals, becoming a better trader, money management, trader psychology, and more.",
      image: WebinarsImg
    }
  ];

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <a className="go-home" onClick={() => props.handleChangeTab("home")}><DoubleLeftOutlined /> Go Home</a>
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="content">
        {cards.map((el) => (
          <Col xs={24} sm={12} md={8} xl={6} key={el.key}>
            <AnimationCard data={el} />
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
}