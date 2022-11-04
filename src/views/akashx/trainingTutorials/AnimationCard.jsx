import React from "react";
import styled from "styled-components";

export default function AnimationCard(props) {
  return (
    <Wrapper>
      <div className="blog-card spring-fever">
        <img className="bg-image" src={props.data.image} />
        <div className="title-content">
          <h3><a onClick={props.setSection}>{props.data.title}</a></h3>
        </div>
        <div className="card-info">
          <p>{props.data.content}</p>
          <a onClick={props.setSection}>Learn More</a>
        </div>
        <div className="gradient-overlay"></div>
        <div className="color-overlay"></div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .blog-card {
    width: 100%;
    height: 400px;
    color: #fff;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 0px;
    box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.5);
    text-align: center;
    transition: all 0.4s;
    background-size: 100%;
    position: relative;
    .bg-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    a {
      color: #fff;
      text-decoration: none;
      transition: all 0.2s;
      svg {
        font-size: 34px;
      }
    }
    .color-overlay {
      background: rgba(64, 84, 94, 0.5);
      width: 100%;
      height: 500px;
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      transition: background 0.3s cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    .gradient-overlay {
      background-image: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.6) 21%);
      width: 100%;
      height: 500px;
      position: absolute;
      top: 350px;
      left: 0;
      z-index: 15;
    }
    .card-info {
      box-sizing: border-box;
      padding: 0;
      width: 100%;
      position: absolute;
      bottom: -100px;
      left: 0;
      margin: 0 auto;
      padding: 0 20px;
      font-style: 16px;
      line-height: 24px;
      z-index: 20;
      opacity: 0;
      transition: bottom 0.64s, opacity 0.63s cubic-bezier(0.33, 0.66, 0.66, 1);
      p {
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      a {
        display: block;
        width: 100px;
        margin: 15px auto;
        background: #fff;
        color: #dba453;
        padding: 3px 10px;
        border-radius: 2px;
        font-size: 0.8em;
        &:hover {
          color: #fff;
          background: #dba453;
          span {
            filter: brightness(10);
            opacity: 1;
          }
        }
      }
    }
    &:hover {
      box-shadow: 0px 18px 20px -9px rgba(0, 10, 30, 0.75);
      .card-info {
        opacity: 1;
        bottom: 80px;
      }
      .color-overlay {
        background: rgba(64, 64, 70, 0.8);
      }
      .title-content {
        margin-top: 90px;
      }
      h3 {
        &:after {
          animation: changeLetter 0.3s 1 linear;
          width: 80%;
        }
      }
    }
    .title-content {
      text-align: center;
      margin: 170px 0 0 0;
      position: absolute;
      z-index: 20;
      width: 100%;
      top: 0;
      left: 0;
      transition: all 0.6s;
    }
    h3 {
      font-size: 1.9em;
      font-weight: 400;
      letter-spacing: 1px;
      margin-bottom: 0;
      display: inline-block;
      a {
        text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        transition: all 0.2s;
        &:hover {
          text-shadow: 0px 8px 20px #dba453;
          color: #ffffff;
        }
      }
      &:after {
        content: " ";
        display: block;
        width: 10%;
        height: 2px;
        margin: 10px auto;
        border: 0;
        background: #dba453;
        transition: all 0.2s';
      }
    }
    h1 {
      font-size: 1.9em;
      font-weight: 400;
      letter-spacing: 1px;
      margin-bottom: 0;
      display: inline-block;
    }
  }

  @keyframes changeLetter {
    0% {
      width: 10%;
    }

    100% {
      width: 80%;
    }
  }

  @media (max-width:500px) {

    .blog-card {
      height: 300px;
      &:hover {
        .title-content {
          margin-top: 40px !important;
        }
      }
      h3 {
        font-size: 1.3em;
      }
    }
  }
`