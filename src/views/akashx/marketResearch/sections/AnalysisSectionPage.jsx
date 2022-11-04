import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { DoubleLeftOutlined } from "@ant-design/icons";
import styled from "styled-components";

export default function AnalysisSectionPage() {
  const history = useHistory()

  const handleGoHome = () => {
    history.push({
      pathname: '/akashx/home',
      state: {
        tab: "market_research", 
      },
    });
  }

  useEffect(() => {
    let scriptFunction = document.createElement('script')
    let scriptParam = document.createElement('script')
    scriptFunction.innerHTML = `(function(w,d,t,h,l,b,p,o,a,m){w["TraducationFxObject"]=o;w[o]=w[o]||function(){
      w[o].h=h;w[o].b=b;return (w[o].q=w[o].q||[]).push(arguments)};a=d.createElement(t),
      m=d.getElementsByTagName(t)[0];a.async=1;a.src=h+l+"?b="+b+"&p="+p.join(",");a.crossorigin="use-credentials";m.parentNode.insertBefore(a,m)
      })(window,document,"script","https://embedder.traducationfx.com/","embedder.js","zTUK220aBMC",[],"TraducationFX");`
    scriptParam.innerHTML = `TraducationFX("articles.technicalAnalysis", "configure", {
      "containerId": "trfx-technicalAnalysis",
      "category": "technicalAnalysis",
      "layout": "grid"
    });
    TraducationFX("articles.technicalAnalysis", "embed");`
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
      <div className="go-home-section">
        <a className="go-home" onClick={handleGoHome}><DoubleLeftOutlined />&nbsp;&nbsp;Go Home</a>
      </div>
      <div id="trfx-technicalAnalysis"></div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #ffffff;
  padding: 20px;
  .go-home-section {
    margin-bottom: 20px;
    a {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
`