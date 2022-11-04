import React from "react";
import CoinzoomLogoImg from "assets/images/akashx/coinzoom_academy/coinzoom_logo.png";
import styled from "styled-components";

export default function AnimationCard(props) {
  return (
    <Wrapper>
      {props.data.section !== "coinzoom_knowledge_base" ?
        <div className="b-game-card" onClick={props.setSection}>
          <div className="b-game-card__cover" style={{ backgroundImage: `url(${props.data.image})` }}>
            <div className="coinzoom-logo">
              <img src={CoinzoomLogoImg} />
              <span>COINZOOM</span>
            </div>
            <div className="title">{props.data.title}</div>
          </div>
        </div>
        :
        <a href="https://support.coinzoom.com/en/support/home" target="_blank">
          <div className="b-game-card">
            <div className="b-game-card__cover" style={{ backgroundImage: `url(${props.data.image})` }}>
              <div className="coinzoom-logo">
                <img src={CoinzoomLogoImg} />
                <span>COINZOOM</span>
              </div>
              <div className="title">{props.data.title}</div>
            </div>
          </div>
        </a>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .b-game-card {
    position: relative;
    z-index: 1;
    width: 100%;
    perspective: 1000px;
    cursor: pointer;
  }
  .coinzoom-logo {
    height: 35px;
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    justify-content: flex-start;
    color: #ffffff;
    align-items: center;
    font-weight: 600;
    cursor: pointer;
  }
  .coinzoom-logo img {
    height: 100%;
    margin-right: 10px;
  }
  .coinzoom-logo span {
    text-shadow: 0 6px 12px rgb(0 0 0 / 40%);
  }
  .b-game-card__cover {
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 350px;
    overflow: hidden;
    background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    background-size: cover;
    perspective-origin: 50% 50%;
    transform-style: preserve-3d;
    transform-origin: top center;
    will-change: transform;
    transform: skewX(0.001deg);
    transition: transform 0.35s ease-in-out;
    background-position: right;
  }
  .b-game-card__cover .title {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    width: 100%;
    height: 100px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 10px;
  }
  .b-game-card__cover::after {
    display: block;
    content: '';
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    height: 420;
    background: linear-gradient(226deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 35%, rgba(255, 255, 255, 0.2) 42%, rgba(255, 255, 255, 0) 60%);
    transform: translateY(-20%);
    will-change: transform;
    transition: transform 0.65s cubic-bezier(0.18, 0.9, 0.58, 1);
  }
  .b-game-card:hover .b-game-card__cover {
    transform: rotateX(7deg) translateY(-6px);
  }
  .b-game-card:hover .b-game-card__cover::after {
    transform: translateY(0%);
  }
  .b-game-card::before {
    display: block;
    content: '';
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    height: 315px;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 6px 12px 12px rgba(0, 0, 0, 0.4);
    will-change: opacity;
    transform-origin: top center;
    transform: skewX(0.001deg);
    transition: transform 0.35s ease-in-out, opacity 0.5s ease-in-out;
  }
  .b-game-card:hover::before {
    opacity: 0.6;
    transform: rotateX(7deg) translateY(-6px) scale(1.05);
  }
`