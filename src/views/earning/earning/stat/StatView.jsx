import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col } from "components/common";
import { asPrice } from 'utils/text'
import { callGetApiWithAuth } from 'utils/api'

export default function StatView() {
  const [statData, setStatData] = useState({
    last_7: 0, last_30: 0, total: 0,
    wallet: 0
  })

  const onGetStatData = (res) => {
    setStatData(res.data)
  }
  const onFailStatData = () => {

  }
  const loadStatData = () => {
    callGetApiWithAuth(`earning/stats`, 
      onGetStatData, onFailStatData
    )
  }

  useEffect(() => {
    loadStatData()
  }, [])

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} xl={6} className="responsive-stats">
          <div className="stats-container">
            <div className="stats-label">Earnings Last 7 Days</div>
            <div className="stats-value">{asPrice(statData.last_7)}</div>
          </div>
        </Col>
        <Col xs={24} sm={12} xl={6} className="responsive-stats">
          <div className="stats-container">
            <div className="stats-label">Earnings Last 30 Days</div>
            <div className="stats-value">{asPrice(statData.last_30)}</div>
          </div>
        </Col>
        <Col xs={24} sm={12} xl={6} className="responsive-stats">
          <div className="stats-container">
            <div className="stats-label">Total Earnings</div>
            <div className="stats-value">{asPrice(statData.total)}</div>
          </div>
        </Col>
        <Col xs={24} sm={12} xl={6} className="responsive-stats">
          <div className="stats-container">
            <div className="stats-label">Credit Wallet</div>
            <div className="stats-value">{asPrice(statData.wallet)}</div>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  .stats-container {
    background: white;
    border-left: 4px solid #00b4ee;
    padding: 20px 15px;
    box-shadow: 0px 4px 20px rgba(44, 39, 56, 0.06);
    .stats-label {
      font-weight: normal;
      font-size: 18px;
      color: #7f8fa3;
    }
    .stats-value {
      font-weight: 600;
      font-size: 18px;
      color: #384971;
    }
  }
  
  @media (max-width: 1400px) {
    .responsive-stats {
      flex: 0 0 50% !important;
      max-width: 50% !important;
    }
  }
  
  @media (max-width: 600px) {
    .responsive-stats {
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
  }
`;
