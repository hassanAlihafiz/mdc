import React, { useEffect, useState } from "react";
import { Row, Col, Select } from "components/common";
import { DoubleLeftOutlined } from "@ant-design/icons";
import BannerImg from "assets/images/akashx/akashx_home_banner.png";
import SignalsImg from "assets/images/akashx/signals/signals_bg.png";
import { uiVarOptions } from "common/uiVar";
import { Wrapper } from "./SignalsPage.styled";

export default function SignalsPage(props) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setLanguage("en");
  }, [props.tab]);

  useEffect(() => {
    let scriptFunction = document.createElement('script')
    let scriptParam = document.createElement('script')
    scriptFunction.innerHTML = `(function(w,d,t,h,l,b,p,o,a,m){w["TraducationFxObject"]=o;w[o]=w[o]||function(){
      w[o].h=h;w[o].b=b;return (w[o].q=w[o].q||[]).push(arguments)};a=d.createElement(t),
      m=d.getElementsByTagName(t)[0];a.async=1;a.src=h+l+"?b="+b+"&p="+p.join(",");a.crossorigin="use-credentials";m.parentNode.insertBefore(a,m)
      })(window,document,"script","https://embedder.traducationfx.com/","embedder.js","zTUK220aBMC",[],"TraducationFX");
      TraducationFX("settings", "configure", {
          "langCode": "${language}"
      });`
    scriptParam.innerHTML = `TraducationFX("signals", "configure", {
      "containerId": "trfx-signals",
      "categories": [
          "forex",
          "crypto",
          "commodities"
      ],
      "strengthKeys": [
          "5eC7iT3QofA"
      ]
    });
    TraducationFX("signals", "embed");`
    scriptFunction.async = true;
    scriptParam.async = true;

    document.body.appendChild(scriptFunction);
    document.body.appendChild(scriptParam);

    return () => {
      document.body.removeChild(scriptFunction);
      document.body.removeChild(scriptParam);
    }
  }, [language]);

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <div className="content-header">
            <a className="go-home" onClick={() => props.handleChangeTab("home")}><DoubleLeftOutlined /> Go Home</a>
            <Select 
              value={language}
              options={uiVarOptions("akashx.languages")}
              onChange={(value) => setLanguage(value)}
            />
          </div>
        </Col>
        <Col xs={24}>
          <div className="banner-img-section">
            <img src={BannerImg} className="bg-img" />
            <div className="content">
              <h1>Akashx<label> Signals</label></h1>
              <p>Our proprietary algorithm uses a different set of technical indicators for each asset and time frame to provide traders the best market entry opportunities. You can use the desktop version below or get signals sent directly to your phone through Telegram.</p>
              <a href="https://t.me/joinchat/AAAAAE3tmvVzo7HYkQ-Q-g" target="_blank">Get Access</a>
            </div>
            <img src={SignalsImg} className="signals-img" />
          </div>
        </Col>
      </Row>
      <div className="signals-content">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div id="trfx-signals"></div>
          </Col>
        </Row>
      </div>
    </Wrapper>
  )
}