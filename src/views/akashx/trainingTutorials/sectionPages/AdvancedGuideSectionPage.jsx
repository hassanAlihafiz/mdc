import React, { useEffect } from "react";
import styled from "styled-components";

export default function AdvancedGuideSectionPage(props) {

  useEffect(() => {
    let scriptFunction = document.createElement('script')
    let scriptParam = document.createElement('script')
    scriptFunction.innerHTML = `(function(w,d,t,h,l,b,p,o,a,m){w["TraducationFxObject"]=o;w[o]=w[o]||function(){
      w[o].h=h;w[o].b=b;return (w[o].q=w[o].q||[]).push(arguments)};a=d.createElement(t),
      m=d.getElementsByTagName(t)[0];a.async=1;a.src=h+l+"?b="+b+"&p="+p.join(",");a.crossorigin="use-credentials";m.parentNode.insertBefore(a,m)
      })(window,document,"script","https://embedder.traducationfx.com/","embedder.js","zTUK220aBMC",[],"TraducationFX");
      TraducationFX("settings", "configure", {
          "langCode": "${props.language}"
      });`
    scriptParam.innerHTML = `TraducationFX("book.advanced-guide-to-trading", "configure", {
      "containerId": "trfx-advanced-guide-to-trading",
      "bookSlug": "advanced-guide-to-trading"
    });
    TraducationFX("book.advanced-guide-to-trading", "embed");`
    scriptFunction.async = true;
    scriptParam.async = true;

    document.body.appendChild(scriptFunction);
    document.body.appendChild(scriptParam);

    return () => {
      document.body.removeChild(scriptFunction);
      document.body.removeChild(scriptParam);
    }
  }, [props.language]);

  return (
    <Wrapper>
      <div id="trfx-advanced-guide-to-trading"></div>
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