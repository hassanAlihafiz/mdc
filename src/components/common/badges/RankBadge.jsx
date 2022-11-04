import React from "react";
import styled from "styled-components";

export default function RankBadge (props) {
  return (
    <Wrapper>
      <div className={`rankTag rank_${props.label?.toLowerCase()}`}>
        {props.label}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .rankTag {
    display: inline-block;
    width: auto;
    min-width: 100px !important;
    padding: 5px 10px 5px;
    color: white;
    font-weight: bold;
    font-size: 10px;
    text-align: center;
    text-transform: uppercase;
    background-color: lightgrey;
    border-radius: 3px;
  }
  .rank_unranked {
    background-color: #9e9e9e;
  }
  .rank_builder {
    background-color: #9e9e9e;
  }
  .rank_director {
    background-color: #9e9e9e;
  }
  .rank_executive {
    background-color: #9e9e9e;
  }
  .rank_1k {
    background-color: #1e719b;
  }
  .rank_5k {
    background-color: #658198;
  }
  .rank_10k {
    background-color: #971e1e;
  }
  .rank_25k {
    background-color: #3e246e;
  }
  .rank_50k {
    background-color: #17317e;
  }
  .rank_100k {
    background-color: #664100;
  }
  .rank_250k {
    background-color: #0c6b3f;
  }
  .rank_500k {
    background-color: #9e5d00;
  }
  .rank_super {
    background-color: #222222;
  }
  .rank_master {
    background-color: #1f6b5e;
  }
`;
