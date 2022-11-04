import React from "react";
import { FaStopwatch } from "react-icons/fa";
import styled from "styled-components";

export default function AnimationCard(props) {
  return (
    <Wrapper>
      <div className="card">
        <figure className="card__thumb">
          <img src={props.data.image} alt="Card Img" className="card__image" />
          <figcaption className="card__caption">
            <h2 className="card__title" onClick={() => props.setSection(props.data.section)}>{props.data.title}</h2>
            <div className="card__statistics">
              <div className="video__time">
                <FaStopwatch />
                <span>{props.data.time_label}</span>
              </div>
            </div>
            <p className="card__snippet" onClick={() => props.setSection(props.data.section)}>{props.data.content}</p>
            <a onClick={() => props.setSection(props.data.section)} className="card__button">Read More</a>
          </figcaption>
        </figure>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .card {
    width: 100%;
    margin-bottom: 10px;
    box-shadow: 2px 5px 5px 0px rgb(0 0 0 / 30%);
    border: unset;

    &:hover {
      .card__caption {
        top: 50%;
        transform: translateY(-50%);
      }

      .card__image {
        transform: translateY(-10px);
      }

      .card__thumb {
        &::after {
          top: 0;
        }
      }

      .card__snippet {
        margin: 20px 0;
      }
    }

    &__thumb {
      position: relative;
      overflow: hidden;
      margin: 0;
      max-height: 350px;
      border-radius: 2px;

      &::after {
        position: absolute;
        display: block;
        content: '';
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, rgba(0, 0, 0, .5) 40%, rgba(255, 255 ,255 , 0) 100%);
        transition: .3s;
        top: calc(100% - 140px);
      }
    }
    
    &__image {
      transition: .5s ease-in-out;
      width: 100%;
      min-height: 400px;
      object-fit: cover;
    }
    
    &__caption {
      position: absolute;
      z-index: 1;
      padding: 0 20px;
      color: white;
      text-align: left;
      transition: .3s;
      top: calc(100% - 125px);
      transform: unset;
    }

    &__title {
      display: -webkit-box;
      max-height: 85px;
      overflow: hidden;
      font-size: 23px;
      line-height: 28px;
      text-shadow: 0px 1px 5px black;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      color: #ffffff;
      cursor: pointer;
    }

    &__snippet {
      display: -webkit-box;
      max-height: 150px;
      overflow: hidden;
      font-size: 16px;
      line-height: 20px;
      text-overflow: ellipsis;
      transition: .5s ease-in-out;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      margin: 60px 0;
      cursor: pointer;
    }

    &__button {
      display: inline-block;
      padding: 10px 20px;
      color: white;
      border: 1px solid white;
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      text-transform: uppercase;
      text-decoration: none;
      transition: .3s;

      &:hover {
        color: black;
        background-color: white;
      }
    }

    .card__statistics {
      display: flex;
      justify-content: flex-start;
      flex-flow: wrap;
      text-shadow: 0px 1px 5px black;
      svg {
        margin-right: 10px;
      }
      .video__count {
        margin-right: 12px;
      }
    }

    @media (min-width: 900px) and (max-width: 1020px) {
      .card__title {
        font-size: 18px;
      }
      .card__snippet {
        font-size: 15px;
      }
    }
  }

  .disclaimer {
    position: fixed;
    bottom: 0;
    left: 50%;
    z-index: 2;
    box-sizing: border-box;
    width: 100%;
    padding: 20px 10px;
    background-color: white;
    transform: translateX(-50%);
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    text-align: center;
    
    &__link {
      color: #755D87;
      text-decoration: none;
    }
  }
`