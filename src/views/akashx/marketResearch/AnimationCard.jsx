import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

export default function AnimationCard(props) {
  return (
    <Wrapper>
      <div className="card">
        <div className="front" style={{ backgroundImage: `url(${props.data.image})` }}>
          <Link to={`/akashx/${props.data.route}`}><p>{props.data.title}</p></Link>
        </div>
        <div className="back">
          <div>
            <Link to={`/akashx/${props.data.route}`}><p className="description">{props.data.content}</p></Link>
            <Link to={`/akashx/${props.data.route}`}><button className="button">Learn More</button></Link>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .card {
    color: inherit;
    cursor: pointer;
    width: 100%;
    min-width: calc(33% - 2rem);
    height: 400px;
    min-height: 400px;
    perspective: 1000px;
    position: relative;
    border: unset;
    box-shadow: 2px 5px 5px 0px rgb(0 0 0 / 30%);
    border-radius: 6px;
    .description {
      display: -webkit-box;
      -webkit-line-clamp: 12;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #333;
      font-size: 15px;
    }
    a {
      color: #ffffff;
    }
  }
  .front, .back {
    display: flex;
    border-radius: 6px;
    background-position: center;
    background-size: cover;
    text-align: center;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    width: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transition: ease-in-out 600ms;
  }
  .front {
    background-size: cover;
    padding: 2rem;
    font-size: 1.618rem;
    font-weight: 600;
    color: #fff;
    overflow: hidden;
    font-family: Poppins, sans-serif;
  }
  .front:before {
    position: absolute;
    display: block;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #1a9be6, #1a57e6);
    opacity: 0.25;
    z-index: -1;
  }
  .card:hover .front {
    transform: rotateY(180deg);
  }
  .card:nth-child(even):hover .front {
    transform: rotateY(-180deg);
  }
  .back {
    background: #fff;
    transform: rotateY(-180deg);
    padding: 0 2em;
  }
  .back .button {
    background: linear-gradient(135deg, #1a9be6, #1a57e6);
  }
  .back .button:before {
    box-shadow: 0 0 10px 10px rgba(26, 87, 230, 0.25);
    background-color: rgba(26, 87, 230, 0.25);
  }
  .card:hover .back {
    transform: rotateY(0deg);
  }
  .card:nth-child(even) .back {
    transform: rotateY(180deg);
  }
  .card:nth-child(even) .back .button {
    background: linear-gradient(135deg, #e61a80, #e61a3c);
  }
  .card:nth-child(even) .back .button:before {
    box-shadow: 0 0 10px 10px rgba(230, 26, 60, 0.25);
    background-color: rgba(230, 26, 60, 0.25);
  }
  .card:nth-child(even):hover .back {
    transform: rotateY(0deg);
  }
  .button {
    transform: translateZ(40px);
    cursor: pointer;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    font-weight: bold;
    color: #fff;
    border-radius: 100px;
    font: inherit;
    border: none;
    position: relative;
    transform-style: preserve-3d;
    transition: 300ms ease;
  }
  .button:before {
    transition: 300ms ease;
    position: absolute;
    display: block;
    content: '';
    transform: translateZ(-40px);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    border-radius: 100px;
    left: 10px;
    top: 16px;
  }
  .button:hover {
    transform: translateZ(55px);
  }
  .button:hover:before {
    transform: translateZ(-55px);
  }
  .button:active {
    transform: translateZ(20px);
  }
  .button:active:before {
    transform: translateZ(-20px);
    top: 12px;
  }
`