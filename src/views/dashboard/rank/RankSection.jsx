import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { Row, Col, LiquidPlot, Progress } from "components/common";
import { asNumber } from 'utils/text'
import { Wrapper } from "./RankSection.styled";

export default function RankSection() {
  const myUser = useSelector(state=>state.auth.user)
  const [totalPercent, setTotalPercent] = useState(0)
  const [pvPercent, setPvPercent] = useState(0)
  const [pecvPercent, setPecvPercent] = useState(0)
  const [pePercent, setPePercent] = useState(0)
  const [qvPercent, setQvPercent] = useState(0)

  useEffect(() => {
    let pvtShare = 1
    let peShare = 0    
    let qvShare = 0
    let pvPercent0 = Math.min(1, myUser.qualification.pv/myUser.next_rank.settings.pv)
    let pecvPercent0 = Math.min(1, myUser.qualification.pecv/myUser.next_rank.settings.pecv)
    let pvtPercent0 = Math.max(pvPercent0, pecvPercent0)
    let pePercent0 = 0
    let qvPercent0 = 0

    if (myUser.next_rank.settings.qv) {
      pvtShare = 0.33
      peShare = 0.33
      qvShare = 0.34
      pePercent0 = Math.min(1, myUser.qualification.pe90/myUser.next_rank.settings.pe90)
      qvPercent0 = Math.min(1, myUser.qualification.qv/myUser.next_rank.settings.qv)
    }

    let totalPercent0 = pvtShare*pvtPercent0 + 
      peShare*pePercent0 + 
      qvShare*qvPercent0
    
    setPvPercent(pvPercent0)
    setPecvPercent(pecvPercent0)
    setPePercent(pePercent0)
    setQvPercent(qvPercent0)
    setTotalPercent(totalPercent0)
  }, [myUser])

  return (
    <Wrapper>
      <Row gutter={[15, 15]}>
        <Col span={7} className="responsive-rank">
          <div className="liquid-container">
            <LiquidPlot 
              percent={totalPercent}
            />
          </div>
        </Col>
        <Col span={17} className="responsive-rank">
          <div className="rank-container">
            <Row gutter={[15, 15]}>
              <Col xs={24} sm={12}>
                <div className="rank-label">Current Rank</div>
                <div className="rank-badge">
                  {myUser.rank.badge && 
                    <img src={myUser.rank.badge} />
                  }
                  {myUser.rank.name}
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className="rank-label">Next Rank</div>
                <div className="rank-badge">
                  {myUser.next_rank.badge && 
                    <img src={myUser.next_rank.badge} />
                  }
                  {myUser.next_rank.name}
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className="rank-progress-container">
                  <div className="progress-label-container">
                    <div className="label">Personal Volume</div>
                    <div className="value">({myUser.qualification.pv}/{myUser.next_rank.settings.pv})</div>
                  </div>
                  <div className="rank-progress">
                    <Progress
                      percent={100*pvPercent}
                      showInfo={false}
                      strokeColor="#08B86E"
                      strokeWidth={10}
                    />
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className="rank-progress-container">
                  <div className="progress-label-container">
                    <div className="label">Personal Customer Volume</div>
                    <div className="value">({myUser.qualification.pecv}/{myUser.next_rank.settings.pecv})</div>
                  </div>
                  <div className="rank-progress">
                    <Progress
                      percent={100*pecvPercent}
                      showInfo={false}
                      strokeColor="#08B86E"
                      strokeWidth={10}
                    />
                  </div>
                </div>
              </Col>
              {myUser.next_rank.settings.pe90?
              <Col xs={24}>
                <div className="rank-progress-container">
                  <div className="progress-label-container">
                    <div className="label">Personally Enrolled</div>
                    <div className="value">({myUser.qualification.pe90}/{myUser.next_rank.settings.pe90})</div>
                  </div>
                  <div className="rank-progress">
                    <Progress
                      percent={100*pePercent}
                      showInfo={false}
                      strokeColor="#08B86E"
                      strokeWidth={10}
                    />
                  </div>
                </div>
              </Col>              
              : ''}
              {myUser.next_rank.settings.qv?
              <Col xs={24}>
                <div className="rank-progress-container">
                  <div className="progress-label-container">
                    <div className="label">Qualified Rank Volume</div>
                    <div className="value">({asNumber(myUser.qualification.qv)}/{asNumber(myUser.next_rank.settings.qv)})</div>
                  </div>
                  <div className="rank-progress">
                    <Progress
                      percent={100*qvPercent}
                      showInfo={false}
                      strokeColor="#FFC427"
                      strokeWidth={10}
                    />
                  </div>
                </div>
              </Col>              
              : '' }
            </Row>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}
