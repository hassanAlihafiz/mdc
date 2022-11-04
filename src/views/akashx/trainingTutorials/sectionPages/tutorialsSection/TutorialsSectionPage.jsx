import React, { useEffect, useState } from "react";
import { Row, Col } from "components/common";
import AnimationCard from "./AnimationCard";
import FindTradingSection from "./sections/FindTradingSection";
import AddComboSection from "./sections/AddComboSection";
import OandaAccountSection from "./sections/OandaAccountSection";
import GuidelinesSection from "./sections/GuidelinesSection";
import AcademyTutorialsSection from "./sections/AcademyTutorialsSection";
import { DoubleLeftOutlined } from "@ant-design/icons";
import FindTradersImg from "assets/images/akashx/training_tutorials/find_traders.jpg";
import AddCombosImg from "assets/images/akashx/training_tutorials/add_combos.jpg";
import OandaImg from "assets/images/akashx/training_tutorials/oanda.jpg";
import GuidelinesImg from "assets/images/akashx/training_tutorials/compliance_guidelines.jpg";
import AcademyImg from "assets/images/akashx/training_tutorials/akashx_academy.jpg";
import { Wrapper } from "./TutorialsSectionPage.styled";

export default function TutorialsSectionPage(props) {
  const cards = [
    {
      value: 1,
      key: "social_trading",
      section: "social_trading",
      title: "Social Trading Tutorial",
      content: "How to find traders, track performance, and copy trades.",
      image: FindTradersImg,
      time_label: "6 min 50 sec"
    },
    {
      value: 2,
      key: "social_trading_combos",
      section: "social_trading_combos",
      title: "Social Trading Tutorial",
      content: "How to add combos to your portfolio.",
      image: AddCombosImg,
      time_label: "5 min 4 sec"
    },
    {
      value: 3,
      key: "oanda_account",
      section: "oanda_account",
      title: "Oanda Account",
      content: "Learn how to get started with Oanda.",
      image: OandaImg,
      time_label: "1 min 52 sec"
    },
    {
      value: 4,
      key: "compliance_guidelines",
      section: "compliance_guidelines",
      title: "Compliance Guidelines",
      content: "Learn the Do’s and Dont’s of Akashx.",
      image: GuidelinesImg,
      time_label: "13 min 22 sec"
    },
    {
      value: 5,
      key: "akademy_tutorials",
      section: "akademy_tutorials",
      title: "Akashx Academy Tutorial",
      content: "Learn how to maximize your education with the Akashx academy and other products.",
      image: AcademyImg,
      time_label: "11 min 4 sec"
    }
  ];

  const [section, setSection] = useState("home");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setSection("home");
  }, [props.section]);

  useEffect(() => {
    setLanguage("en");
  }, [props.section, section]);

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          {section === "home" ?
            <a className="go-home" onClick={() => props.setSection("home")}><DoubleLeftOutlined /> Back</a>
            :
            <a className="go-home" onClick={() => setSection("home")}><DoubleLeftOutlined /> Back</a>
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
      {section === "social_trading" &&
        <Row>
          <Col xs={24}>
            <FindTradingSection
              section={section}
              tab={props.tab}
              language={language}
            />
          </Col>
        </Row>
      }
      {section === "social_trading_combos" &&
        <Row>
          <Col xs={24}>
            <AddComboSection
              section={section}
              tab={props.tab}
              language={language}
            />
          </Col>
        </Row>
      }
      {section === "oanda_account" &&
        <Row>
          <Col xs={24}>
            <OandaAccountSection
              section={section}
              tab={props.tab}
              language={language}
            />
          </Col>
        </Row>
      }
      {section === "compliance_guidelines" &&
        <Row>
          <Col xs={24}>
            <GuidelinesSection
              section={section}
              tab={props.tab}
              language={language}
            />
          </Col>
        </Row>
      }
      {section === "akademy_tutorials" &&
        <Row>
          <Col xs={24}>
            <AcademyTutorialsSection
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