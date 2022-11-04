import React, { useEffect, useState } from "react";
import { Row, Col } from "components/common";
import AnimationCard from "./AnimationCard";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { Wrapper } from "./CoinzoomAcademyPage.styled";
import WhatIsCoinZoomSection from "./sections/WhatIsCoinZoomSection";
import CoinZoomTutorialSection from "./sections/CoinZoomTutorialSection";
import AccountSetupSection from "./sections/AccountSetupSection";
import CashflowExamplesSection from "./sections/CashflowExamplesSection";
import DebitCardsSection from "./sections/DebitCardsSection";
import GetStartedWaysSection from "./sections/GetStartedWaysSection";
import AllCoinsSection from "./sections/AllCoinsSection";
import InTheNewsSection from "./sections/InTheNewsSection";
import ZoomTokenBenefitsSection from "./sections/ZoomTokenBenefitsSection";
import CoinZoomKnowledgeSection from "./sections/CoinZoomKnowledgeSection";
import WhatIsCoinZoomImg from "assets/images/akashx/coinzoom_academy/what_is_coinzoom.jpg";
import TutorialImg from "assets/images/akashx/coinzoom_academy/coinzoom_tutorials.jpg";
import AccountSetupImg from "assets/images/akashx/coinzoom_academy/account_setup.jpg";
import CashflowImg from "assets/images/akashx/coinzoom_academy/cashflow_examples.jpeg";
import DebitCardsImg from "assets/images/akashx/coinzoom_academy/debit_cards.jpg";
import GetStartedImg from "assets/images/akashx/coinzoom_academy/get_started_five_ways.png";
import AllCoinsImg from "assets/images/akashx/coinzoom_academy/all_coins.jpeg";
import InTheNewsImg from "assets/images/akashx/coinzoom_academy/in_the_news.jpg";
import TokenBenefitsImg from "assets/images/akashx/coinzoom_academy/coinzoom_token_benefits.jpg";
import KnowledgeBaseImg from "assets/images/akashx/coinzoom_academy/coinzoom_knowledge_base.jpg";

export default function CoinzoomAcademyPage(props) {
  const cards = [
    {
      value: 1,
      key: "what_is_coinzoom",
      section: "what_is_coinzoom",
      title: "What is CoinZoom?",
      image: WhatIsCoinZoomImg
    },
    {
      value: 2,
      key: "coinzoom_tutorial",
      section: "coinzoom_tutorial",
      title: "CoinZoom Tutorial",
      image: TutorialImg
    },
    {
      value: 3,
      key: "account_setup",
      section: "account_setup",
      title: "Account Setup",
      image: AccountSetupImg
    },
    {
      value: 4,
      key: "cashflow_examples",
      section: "cashflow_examples",
      title: "Cashflow Examples",
      image: CashflowImg
    },
    {
      value: 5,
      key: "debit_cards",
      section: "debit_cards",
      title: "Debit Cards",
      image: DebitCardsImg
    },
    {
      value: 6,
      key: "get_started_five_ways",
      section: "get_started_five_ways",
      title: "Get Started 5 Ways To Use CoinZoom Today",
      image: GetStartedImg
    },
    {
      value: 7,
      key: "all_coins",
      section: "all_coins",
      title: "All Coins",
      image: AllCoinsImg
    },
    {
      value: 8,
      key: "in_the_news",
      section: "in_the_news",
      title: "In The News",
      image: InTheNewsImg
    },
    {
      value: 9,
      key: "zoom_token_benefits",
      section: "zoom_token_benefits",
      title: "Zoom Token Benefits",
      image: TokenBenefitsImg
    },
    {
      value: 10,
      key: "coinzoom_knowledge_base",
      section: "coinzoom_knowledge_base",
      title: "CoinZoom Knowledge Base",
      image: KnowledgeBaseImg
    }
  ];

  const [section, setSection] = useState("home");

  useEffect(() => {
    setSection("home");
  }, [props.tab]);

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          {section === "home" ?
            <a className="go-home" onClick={() => props.handleChangeTab("home")}><DoubleLeftOutlined /> Go Home</a>
            :
            <div className="content-header">
              <a className="go-home" onClick={() => setSection("home")}><DoubleLeftOutlined /> Back</a>
            </div>
          }
        </Col>
      </Row>
      {section === "home" &&
        <div className="l-container">
          <Row gutter={[20, 20]}>
            {cards.map((el) => (
              <Col xs={24} sm={12} lg={8} xxl={6} key={el.key}>
                <AnimationCard data={el} setSection={() => setSection(el.section)} />
              </Col>
            ))}
          </Row>
        </div>
      }
      {section === "what_is_coinzoom" &&
        <Row>
          <Col xs={24}>
            <WhatIsCoinZoomSection
              section={section}
              tab={props.tab}
            />
          </Col>
        </Row>
      }
      {section === "coinzoom_tutorial" &&
        <Row>
          <Col xs={24}>
            <CoinZoomTutorialSection
              section={section}
              tab={props.tab}
            />
          </Col>
        </Row>
      }
      {section === "account_setup" &&
        <Row>
          <Col xs={24}>
            <AccountSetupSection
              section={section}
              tab={props.tab}
            />
          </Col>
        </Row>
      }
      {section === "cashflow_examples" &&
        <Row>
          <Col xs={24}>
            <CashflowExamplesSection
              section={section}
              tab={props.tab}
            />
          </Col>
        </Row>
      }
      {section === "debit_cards" &&
        <Row>
          <Col xs={24}>
            <DebitCardsSection
              section={section}
              tab={props.tab}
            />
          </Col>
        </Row>
      }
      {section === "get_started_five_ways" &&
        <Row>
          <Col xs={24}>
            <GetStartedWaysSection
              section={section}
              tab={props.tab}
            />
          </Col>
        </Row>
      }
      {section === "all_coins" &&
        <Row>
          <Col xs={24}>
            <AllCoinsSection
              section={section}
              tab={props.tab}
            />
          </Col>
        </Row>
      }
      {section === "in_the_news" &&
        <Row>
          <Col xs={24}>
            <InTheNewsSection
              section={section}
              tab={props.tab}
            />
          </Col>
        </Row>
      }
      {section === "zoom_token_benefits" &&
        <Row>
          <Col xs={24}>
            <ZoomTokenBenefitsSection
              section={section}
              tab={props.tab}
            />
          </Col>
        </Row>
      }
    </Wrapper>
  );
}