import React, { useEffect, useState } from "react";
import { Row, Col, Select } from "components/common";
import AnimationCard from "./AnimationCard";
import TutorialsSectionPage from "./sectionPages/tutorialsSection/TutorialsSectionPage";
import BeginnersGuideSectionPage from "./sectionPages/BeginnersGuideSectionPage";
import AdvancedGuideSectionPage from "./sectionPages/AdvancedGuideSectionPage";
import CryptocurrenciesSectionPage from "./sectionPages/CryptocurrenciesSectionPage";
import { DoubleLeftOutlined } from "@ant-design/icons";
import TutorialsImg from "assets/images/akashx/training_tutorials/training_tutorials.jpg";
import BeginnerImg from "assets/images/akashx/training_tutorials/beginner.jpg";
import AdvancedImg from "assets/images/akashx/training_tutorials/advanced.jpg";
import CryptoCurrenciesImg from "assets/images/akashx/training_tutorials/cryptocurrencies.jpg";
import { uiVarOptions } from "common/uiVar";
import { Wrapper } from "./TrainingTutorialsPage.styled";

export default function TrainingTutorialsPage(props) {
  const cards = [
    {
      value: 1,
      key: "training_tutorials",
      section: "training_tutorials",
      title: "Training & Tutorials",
      content: "Ready to maximize your membership? Get access to our Akashx training and tutorial videos.",
      image: TutorialsImg
    },
    {
      value: 2,
      key: "beginners_guide",
      section: "beginners_guide",
      title: "Beginner's Guide to Trading",
      content: "This beginner's guide covers the material from the beginner video academy.",
      image: BeginnerImg
    },
    {
      value: 3,
      key: "advanced_guide",
      section: "advanced_guide",
      title: "Advanced Guide to Trading",
      content: "This advanced guide to trading covers the material from the advanced video academy.",
      image: AdvancedImg
    },
    {
      value: 4,
      key: "cryptocurrencies",
      section: "cryptocurrencies",
      title: "Cryptocurrencies",
      content: "Our Cryptocurrency e-Book covers the material from the video academy for those who prefer reading over watching videos.",
      image: CryptoCurrenciesImg
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
            section !== "training_tutorials" &&
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
        <Row gutter={[20, 20]} className="content">
          {cards.map((el) => (
            <Col xs={24} sm={12} xl={8} xxl={6} key={el.key}>
              <AnimationCard data={el} setSection={() => setSection(el.section)} />
            </Col>
          ))}
        </Row>
      }
      {section === "training_tutorials" &&
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <TutorialsSectionPage section={section} setSection={setSection} />
          </Col>
        </Row>
      }
      {section === "beginners_guide" &&
        <BeginnersGuideSectionPage language={language} />
      }
      {section === "advanced_guide" &&
        <AdvancedGuideSectionPage language={language} />
      }
      {section === "cryptocurrencies" &&
        <CryptocurrenciesSectionPage language={language} />
      }
    </Wrapper>
  );
}