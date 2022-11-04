import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function EconomicSection(props) {
  const [language, setLanguage] = useState("en");

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
    scriptParam.innerHTML = `TraducationFX("economicCalendar", "configure", {
      "containerId": "trfx-economic-calendar"
    });
    TraducationFX("economicCalendar", "embed");`
    scriptFunction.async = true;
    scriptParam.async = true;

    document.body.appendChild(scriptFunction);
    document.body.appendChild(scriptParam);

    return () => {
      document.body.removeChild(scriptFunction);
      document.body.removeChild(scriptParam);
    }
  }, [props.tab, props.section, language]);

  useEffect(() => {
    setLanguage(props.language)
  }, [props.language]);

  return (
    <Wrapper>
      <div id="trfx-economic-calendar"></div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 10px;
`