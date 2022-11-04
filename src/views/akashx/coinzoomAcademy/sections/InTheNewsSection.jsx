import React from "react";
import { Row, Col } from "components/common";
import styled from "styled-components";
import { newsList } from "common/uiVar/akashx/news";

export default function InTheNewsSection(props) {

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        {newsList.map((el, index) => (
          <Col xs={24} sm={12} xl={8} xxl={6} key={index}>
            <section class="bg">
              <div class="blog-card">
                <img class="blog-img" src={el.image} />
                <div class="text-overlay">
                  <p>{el.description}&nbsp;&nbsp;<a href={el.link} class="read-more" target="_blank">Read More</a></p>
                </div>
              </div>
            </section>
          </Col>
        ))}
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 10px;
  padding: 20px;
  .blog-card {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    margin: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    transition: all 450ms ease-out 0s;
    overflow: hidden;
  }
  .blog-card .blog-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  .blog-card:hover {
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.85);
  }
  .blog-card:hover .text-overlay {
    background: rgba(255, 255, 255, 0.8);
    height: 100%;
    top: 0;
    transition: all 450ms ease-in-out 0s;
  }
  .blog-card:hover p {
    height: 100%;
    transition: all 350ms ease-in-out 0s;
  }
  .blog-card:hover p a {
    visibility: visible;
  }
  .text-overlay {
    position: absolute;
    background: rgba(255, 255, 255, 0.6);
    width: 100%;
    height: 100%;
    top: 100%;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.3);
    padding: 10px 12px;
    overflow: hidden;
    transition: all 450ms ease-in-out 0s;
    cursor: pointer;
  }
  .text-overlay h2 {
    color: rgba(0, 0, 0, 0.85);
    letter-spacing: 0.0225em;
    width: auto;
    margin: 0;
  }
  .text-overlay p {
    color: #555;
    height: 100%;
    margin: 8px 0;
    line-height: 1.25;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .text-overlay a {
    color: #378aee;
    text-decoration: none;
    transition: all 350ms linear;
    visibility: hidden;
  }
  .text-overlay a:hover {
    color: #449cc5;
    border-bottom: 1px dotted #47a8f2;
  }
`