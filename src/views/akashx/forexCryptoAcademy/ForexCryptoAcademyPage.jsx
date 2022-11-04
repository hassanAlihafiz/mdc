import React, { useEffect, useState } from "react";
import { Row, Col } from "components/common";
import AnimationCard from "./AnimationCard";
import BeginnerSection from "./sections/BeginnerSection";
import AdvancedSection from "./sections/AdvancedSection";
import ExpertSection from "./sections/ExpertSection";
import CryptocurrenciesSection from "./sections/CryptocurrenciesSection";
import PlatformTutorialsSection from "./sections/PlatformTutorialsSection";
import { DoubleLeftOutlined } from "@ant-design/icons";
import BeginnerImg from "assets/images/akashx/forex_crypto_academy/beginner.jpg";
import AdvancedImg from "assets/images/akashx/forex_crypto_academy/advanced.jpg";
import ExpertImg from "assets/images/akashx/forex_crypto_academy/expert.jpg";
import CryptoImg from "assets/images/akashx/forex_crypto_academy/crypto.jpg";
import TutorialImg from "assets/images/akashx/forex_crypto_academy/tutorial.jpg";
import { Select } from "components/common";
import { uiVarOptions } from "common/uiVar";
import { Wrapper } from "./ForexCryptoAcademyPage.styled";

export default function ForexCryptoAcademyPage(props) {
  const cards = [
    {
      value: 1,
      key: "beginner",
      section: "beginner",
      title: "Beginner",
      content: "In the beginner course, you will learn about the world of trading, what is forex, what’s an index, and what’s a share. You’ll also learn all of the terminology such as pips, points, balance, equity, lots, bid prices, ask prices, short and long positions. Someone who is just getting into trading should also be warned about the most common mistakes beginner traders make.",
      image: BeginnerImg,
      video_count_label: "23 Lessons",
      time_label: "20 min"
    },
    {
      value: 2,
      key: "advanced",
      title: "Advanced",
      section: "advanced",
      content: "In the advanced course, you’ll learn about fundamental and technical analysis, support and resistance, chart time frames, and what trends are. After completing this course, you’ll know how to read trends and identify common patterns when trading.",
      image: AdvancedImg,
      video_count_label: "16 Lessons",
      time_label: "1 hr  8 min"
    },
    {
      value: 3,
      key: "expert",
      section: "expert",
      title: "Expert",
      content: "Our expert course is for traders who already have learned about technical analysis. You’ll learn about Japanese Candlestick Patterns, what the best trading strategies are, fibonacci trading, and the Elliot wave theory.",
      image: ExpertImg,
      video_count_label: "12 Lessons",
      time_label: "1 hr  27min"
    },
    {
      value: 4,
      key: "crypto_currencies",
      section: "crypto_currencies",
      title: "Cryptocurrencies",
      content: "When you’re ready to dive into cryptocurrencies, you’ll learn about blockchain, mining, forks, bitcoin, ether, ripple, and alternative cryptocurrencies. This course is explained using simple and easy to understand language so that everyone can understand it.",
      image: CryptoImg,
      video_count_label: "8 Lessons",
      time_label: "8 min"
    },
    {
      value: 5,
      key: "platform_tutorial",
      section: "platform_tutorial",
      title: "Platform Tutorials",
      content: "Our platform tutorials course will teach you how to use the most popular trading platforms such as MetaTrader 4, MetaTrader 5, and CTrader.",
      image: TutorialImg,
      video_count_label: "23 Lessons",
      time_label: "45 min"
    }
  ];

  const [section, setSection] = useState("home");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setSection("home");
  }, [props.tab]);

  useEffect(() => {
    setLanguage("en");
  }, [props.tab, section]);

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          {section === "home" ?
            <a className="go-home" onClick={() => props.handleChangeTab("home")}><DoubleLeftOutlined /> Go Home</a>
            :
            <div className="content-header">
              <a className="go-home" onClick={() => setSection("home")}><DoubleLeftOutlined /> Back</a>
              <Select 
                value={language}
                options={uiVarOptions("akashx.languages")}
                onChange={(value) => setLanguage(value)}
              />
            </div>
          }
        </Col>
      </Row>
      {section === "home" &&
        <Row gutter={[20, 20]}>
          {cards.map((el) => (
            <Col xs={24} sm={12} md={8} xl={6} key={el.key}>
              <AnimationCard data={el} setSection={setSection} />
            </Col>
          ))}
        </Row>
      }
      {section === "beginner" &&
        <Row>
          <Col xs={24}>
            <BeginnerSection
              section={section}
              tab={props.tab}
              language={language}
            />
          </Col>
        </Row>
      }
      {section === "advanced" &&
        <Row>
          <Col xs={24}>
            <AdvancedSection
              section={section}
              tab={props.tab}
              language={language}
            />
          </Col>
        </Row>
      }
      {section === "expert" &&
        <Row>
          <Col xs={24}>
            <ExpertSection
              section={section}
              tab={props.tab}
              language={language}
            />
          </Col>
        </Row>
      }
      {section === "crypto_currencies" &&
        <Row>
          <Col xs={24}>
            <CryptocurrenciesSection
              section={section}
              tab={props.tab}
              language={language}
            />
          </Col>
        </Row>
      }
      {section === "platform_tutorial" &&
        <Row>
          <Col xs={24}>
            <PlatformTutorialsSection
              section={section}
              tab={props.tab}
              language={language}
            />
          </Col>
        </Row>
      }
    </Wrapper>
  );
}