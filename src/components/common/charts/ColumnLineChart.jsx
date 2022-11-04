import React from "react";
import { Column } from "@ant-design/plots";
import styled from "styled-components";

export default function ColumnLineChart(props) {
  const config = {
    data: props.data,
    xField: "time",
    yField: "value",
    legend: false,
    height: 250,
    color: '#FFC427',
    xAxis: {
      label: {
        formatter: (v) => {
          let date = new Date(v);
          return date.toGMTString().slice(5, 11);
        },
      },
    },
    
    minColumnWidth: 30,
    maxColumnWidth: 30,
  };
  return (
    <Wrapper>
      <Column {...config} />
    </Wrapper>
  );
}
export const Wrapper = styled.div``;
