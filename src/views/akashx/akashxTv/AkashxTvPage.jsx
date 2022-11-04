import React, { useEffect, useState } from "react";
import { Row, Col } from "components/common";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { Wrapper } from "./AkashxTvPage.styled";

export default function AkashxTvPage(props) {

  useEffect(() => {
    let scriptFunction = document.createElement('script')
    let scriptParam = document.createElement('script')
    scriptFunction.innerHTML = `(function(w,d,t,h,l,b,p,o,a,m){w["TraducationFxObject"]=o;w[o]=w[o]||function(){
      w[o].h=h;w[o].b=b;return (w[o].q=w[o].q||[]).push(arguments)};a=d.createElement(t),
      m=d.getElementsByTagName(t)[0];a.async=1;a.src=h+l+"?b="+b+"&p="+p.join(",");a.crossorigin="use-credentials";m.parentNode.insertBefore(a,m)
      })(window,document,"script","https://embedder.traducationfx.com/","embedder.js","zTUK220aBMC",[],"TraducationFX");`
    scriptParam.innerHTML = `TraducationFX("dailytv", "configure", {
      "containerId": "trfx-embed",
    });
    TraducationFX("dailytv", "embed");`
    scriptFunction.async = true;
    scriptParam.async = true;

    document.body.appendChild(scriptFunction);
    document.body.appendChild(scriptParam);

    return () => {
      document.body.removeChild(scriptFunction);
      document.body.removeChild(scriptParam);
    }
  }, []);

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <a className="go-home" onClick={() => props.handleChangeTab("home")}><DoubleLeftOutlined /> Go Home</a>
        </Col>
      </Row>
      <div className="signals-analyzer-content">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div id="trfx-embed"></div>
          </Col>
        </Row>
      </div>
    </Wrapper>
  )
}