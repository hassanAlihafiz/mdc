import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "components/common";
import { DoubleLeftOutlined } from "@ant-design/icons";
import BannerImg from "assets/images/akashx/akashx_home_banner.png";
import ComplianceImg from "assets/images/akashx/compliance/compliance_bg.png";
import GuidelinesImg from "assets/images/akashx/compliance/guidelines.png";
import QuizImg from "assets/images/akashx/compliance/quiz.png";
import { Wrapper } from "./CompliancePage.styled";

export default function CompliancePage(props) {
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
            <a className="go-home" onClick={() => setSection("home")}><DoubleLeftOutlined /> Back</a>
          }
        </Col>
      </Row>
      {section === "home" &&
        <>
          <Row gutter={[20, 20]}>
            <Col xs={24}>
              <div className="banner-img-section">
                <img src={BannerImg} className="bg-img" />
                <div className="content">
                  <h1>Akashx<label> Compliance</label></h1>
                  <p>Welcome to your Akashx membership! In order to protect the legal standing of the company and offer Akashx products and services worldwide, it is imperative the Affiliates understand the importance of compliance.</p>
                </div>
                <img src={ComplianceImg} className="comliance-img" />
              </div>
            </Col>
          </Row>
          <div className="comliance-content">
            <Row gutter={[20, 20]}>
              <Col xs={24} md={12}>
                <div className="comliance-card">
                  <img src={GuidelinesImg} />
                  <h5>Compliance Guidelines</h5>
                  <p>In order to protect the legal standing of the company and offer Akashx products and services worldwide, we have designed Compliance Guidelines to teach you the best ways to market Akashx products and services. Please view the guidelines and complete the quiz.</p>
                  <div className="btn-actions">
                    <a href="https://www.mydailychoice.com/images/backoffice2020/akashx/AkashxComplianceGuidelines.pdf" target="_blank">Download PDF</a>
                    <Button onClick={() => setSection("guidelines")}>Watch</Button>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="comliance-card">
                  <img src={QuizImg} />
                  <h5>Compliance Quiz</h5>
                  <p>Let’s get your Akashx business up and running by passing your first quiz! You must pass the quiz with a score of 100 to get full access to the products included in your Akashx membership. Passing the quiz is a great way to ensure you will be truthful in your advertising.</p>
                  <div className="btn-actions">
                    <Button onClick={() => setSection("quiz")}>Take Me To Quiz</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </>
      }
      {section === "guidelines" &&
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div className="guidelines">
              <iframe className="sproutvideo-player" src="https://videos.sproutvideo.com/embed/069cd6bb181ce6c78f/b5bcca4163fe141b" style={{ position:"absolute",width:"100%",height:"100%",left:0,top:0}} frameBorder="0" allowFullScreen=""></iframe>
            </div>
          </Col>
        </Row>
      }
      {section === "quiz" &&
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div className="quiz">
              <iframe frameBorder="0" src="https://form.typeform.com/to/rxgfQr7z?typeform-embed=embed-widget&amp;typeform-source=mydailychoice.com&amp;typeform-medium=embed-sdk&amp;typeform-embed-id=xouk5" allow="camera; microphone; autoplay; encrypted-media; fullscreen;" data-qa="iframe" title="typeform-embed" style={{width: "100%", height: "100%", border: 0, transform: "rotateZ(0deg)"}}></iframe>
            </div>
          </Col>
        </Row>
      }
    </Wrapper>
  )
}