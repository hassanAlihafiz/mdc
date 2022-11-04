import React from "react";
import styled from "styled-components";

export default function AnimationCard(props) {
  return (
    <Wrapper>
      <div class="card">
        <div class="Box">
          <img src={props.data.image} />
        </div>
        <div class="details">
          <h4 onClick={() => props.setSection(props.data.section)}>{props.data.title}</h4>
          <p onClick={() => props.setSection(props.data.section)}>{props.data.content}</p>
          <a onClick={() => props.setSection(props.data.section)}>Learn More</a>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px;
  .card {
    position: relative;
    margin: 20px 0;
    width: 300px;
    height: 400px;
    background: #fff;
    transform-style: preserve-3d;
    transform: perspective(2000px);
    box-shadow: inset 300px 0 50px rgba(0, 0, 0, .5), 0 20px 20px rgba(0, 0, 0, .5);
    transition: 1s;
  }

  .card h4 {
    cursor: pointer;
  }

  .card p {
    cursor: pointer;
    margin-bottom: 25px;
  }

  .card a {
    padding: 10px 20px;
    border: 1px solid #878787;
  }

  .card:hover {
    z-index: 10000;
    transform: perspective(2000px) rotate(-10deg);
    box-shadow: inset 20px 0 50px rgba(0, 0, 0, .5), 0 10px 100px rgba(0, 0, 0, .5);
  }

  .card .Box {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    transform-origin: left;
    z-index: 1;
    transition: 1s cubic-bezier(.15, 1.7, .84, .58);
    background: #111;
  }

  .card .Box img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card:hover .Box {
    transform: rotateY(-135deg);
  }

  .card .details {
    position: absolute;
    top: 35px;
    left: 0;
    box-sizing: border-box;
    padding: 20px;
    z-index: -1;
  }

  @media only screen and (max-width: 500px) {
    .card {
      width: 250px;
    }
  }
`