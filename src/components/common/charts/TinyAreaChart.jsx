import React from "react";
import { TinyArea } from "@ant-design/plots";
import styled from "styled-components";

export default function TinyAreaChart({ data }) {
  const config = {
    height: 50,
    width: 150,
    autoFit: false,
    data,
    smooth: true,
    color: "#E5EDFE",
    pattern: {
      type: "line",
      cfg: {
        stroke: "#5B8FF9",
      },
    },
  };
  return (
    <Wrapper>
      <TinyArea {...config} />
    </Wrapper>
  );
}
export const Wrapper = styled.div``;
