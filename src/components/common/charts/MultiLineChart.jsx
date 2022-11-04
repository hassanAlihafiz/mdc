import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import styled from "styled-components";

export default function MultiLineChart(props) {
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
    data: props.data,
    xField: "date",
    yField: "value",
    yAxis: {
      label: {
        formatter: (v) => `$${v}`,
      },
    },
    xAxis: {
      label: {
        formatter: (v) => {
          let date = new Date(v);
          return date.toGMTString().slice(5, 11);
        },
      },
    },
    height: 290,
    smooth: true,
    legend: {
      position: "top-left",
      offsetX: width < 600 ? 0 : 110,
      offsetY: -8,
      marker: {
        spacing: 2,
      },
    },
    seriesField: "type",
    color: ({ type }) => {
      return type === "Personal Sales" ? "#FF2727" : "#00B4EE";
    },
    lineStyle: ({ type }) => {
      return {
        opacity: 0.5,
      };
    },
  };
  return (
    <Wrapper>
      <Line {...config} />
    </Wrapper>
  );
}
export const Wrapper = styled.div``;
