import React from "react";
import { Liquid } from "@ant-design/plots";
import styled from "styled-components";

export default function LiquidPlotStar() {
  const config = {
    percent: 0.25,
    // width: 400,
    autoFit: true,
    // height: 300,
    outline: {
      border: 3,
      distance: 5,
    },
    shape: (x, y, width, height) => {
      const path = [];
      const w = Math.min(width, height);

      for (let i = 0; i < 5; i++) {
        path.push([
          i === 0 ? "M" : "L",
          (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
          (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
        ]);
        path.push([
          "L",
          (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
          (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
        ]);
      }

      path.push(["Z"]);
      return path;
    },
    wave: {
      length: 128,
    },
    color: "#00B4EE",
  };
  return (
    <Wrapper>
      <Liquid {...config} />
    </Wrapper>
  );
}
export const Wrapper = styled.div`
  .g2-html-annotation {
    color: #212529;
    font-size: 14px !important;
  }
`;
