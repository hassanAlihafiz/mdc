import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import styled from "styled-components";

export default function SingleLineChart(props) {
  const [data, setData] = useState([]);

  const useWindowDimensions = () => {
    const hasWindow = typeof window !== "undefined";

    function getWindowDimensions() {
      const width = hasWindow ? window.innerWidth : null;
      return {
        width,
      };
    }

    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      if (hasWindow) {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }, [hasWindow]);

    return windowDimensions;
  };

  const { width } = useWindowDimensions();

  const config = {
    height: props.height || 290,
    smooth: true,
    color: ({ type }) => {
      return "#00B4EE";
    },
    lineStyle: ({ type }) => {
      return {
        opacity: 0.5,
      };
    },
  };
  return (
    <Wrapper>
      <Line {...config} 
        {...props}
      />
    </Wrapper>
  );
}
export const Wrapper = styled.div`
`;
