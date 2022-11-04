import React from "react";
import { Row, Col, Divider } from "components/common";
import styled from "styled-components";
import { allCoinsList } from "common/uiVar/akashx/allCoins";

export default function AllCoinsSection(props) {
  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        {allCoinsList.map((el) => (
          <Col xs={24} sm={12} lg={8} xxl={6} key={el.key}>
            <div className="card">
              <img src={el.image} />
              <h5>{el.title}</h5>
              <p>{el.description}</p>
              <div className="go-to-detail">
                <a href={el.link} target="_blank">Learn More</a>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Divider className="divider" />
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <div className="footer">
            <a target="_blank" href="https://www.coinzoom.com/support/">Support</a>
            <Divider type="vertical" className="footer-divider" />
            <a target="_blank" href="https://www.coinzoom.com/support/">FAQ</a>
          </div>
        </Col>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 10px;
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 30px 20px;
    position: relative;
    img {
      width: 100px;
      border-radius: 50%;
      margin-bottom: 20px;
    }
    .go-to-detail {
      position: absolute;
      bottom: 10px;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    .footer a {
      color: #333;
      font-size: 16px;
      .footer-divider {
        width: 2px;
        background-color: #8f8f8f;
        height: 20px;
      }
    }
  }
`