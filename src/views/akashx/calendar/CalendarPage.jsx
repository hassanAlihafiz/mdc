import React, { useEffect, useState } from "react";
import { Row, Col, Select } from "components/common";
import AnimationCard from "./AnimationCard";
import CryptoSection from "./sections/CryptoSection";
import EconomicSection from "./sections/EconomicSection";
import { DoubleLeftOutlined } from "@ant-design/icons";
import CryptoImg from "assets/images/akashx/calendar/crypto.jpg";
import EconomicImg from "assets/images/akashx/calendar/economic.jpg";
import { FaBitcoin, FaSignal } from "react-icons/fa";
import { uiVarOptions } from "common/uiVar";
import { Wrapper } from "./CalendarPage.styled";

export default function CalendarPage(props) {
  const cards = [
    {
      value: 1,
      key: "crypto",
      section: "crypto",
      title: "Crypto Calendar",
      content: "As our economic calendar shows events that impact the fiat currencies, the cryptocurrency calendar covers events that influence the cryptocurrency market. This calendar monitors events like blockchain conferences, cryptocurrency forks, strategy releases, and industry meetups for 25 of the most popular cryptocurrencies.",
      image: CryptoImg,
      icon: <FaBitcoin />,
    },
    {
      value: 2,
      key: "economic",
      section: "economic",
      title: "Economic Calendar",
      content: "A best practice for advanced traders is checking economic calendars every morning to be aware of the upcoming high-impact events. Our economic calendar covers 360 events while explaining the significance, where the data comes from, and how it could potentially affect the market.",
      image: EconomicImg,
      icon: <FaSignal />,
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
        <div className="card-container">
          {cards.map((el) => (
            <AnimationCard data={el} setSection={setSection} />
          ))}
        </div>
      }
      {section === "crypto" &&
        <Row>
          <Col xs={24}>
            <CryptoSection
              section={section}
              tab={props.tab}
              language={language}
            />
          </Col>
        </Row>
      }
      {section === "economic" &&
        <Row>
          <Col xs={24}>
            <EconomicSection
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