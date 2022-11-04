import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Tooltip } from "components/common";
import { asNumber } from 'utils/text'
import InfoImage from "assets/icons/info.svg";
import { ReactComponent as ThreeTickFrameIcon } from "assets/icons/three-circle-frame.svg";
import { ReactComponent as TickIcon } from "assets/icons/tick.svg";

export default function BinaryDiagram() {
  const myUser = useSelector(state=>state.auth.user)
  const [isQualified, setIsQualified] = useState(false)

  useEffect(() => {
    if ((myUser.qualification.pv>=40 || 
      myUser.qualification.pecv>=40) && 
      myUser.qualification.l_bpev>=90 && 
      myUser.qualification.r_bpev>=90 && 
      myUser.qualification.l_bgv>=300 && 
      myUser.qualification.r_bgv>=300
    ) {
      setIsQualified(true)
    } else {
      setIsQualified(false)
    }
  }, [myUser])

  return (
    <Wrapper>
      <div className="binary-container">
        <div className="binary-label">
          Binary Qualified
          <Tooltip title="To be Binary Qualified, you must have a minimum of 40 Personal Volume (PV), 90 Business Volume (BV) from personally enrolled Affiliates/Preferred Customers on each your left and right leg, and a minimum of 300 Business Volume (BV) on your lesser leg.">
            <img src={InfoImage} />
          </Tooltip>
        </div>
        <div className="binary-tick">
          {isQualified && 
            <TickIcon />
          }
        </div>
      </div>
      <div className="unilevel-box">
        <div className="binary-frame-container">
          <div className="you-text">You</div>
          <div className="top-text">
            <Tooltip title={() => (
              <div>
                Personal Volume: {myUser.qualification.pv}<br/>
                Personal Customer Volume: {myUser.qualification.pecv}
              </div>
            )}>
              <div>
                {myUser.qualification.pv>=myUser.qualification.pecv?
                  myUser.qualification.pv
                : myUser.qualification.pecv}/40
              </div>
            </Tooltip>            
          </div>
          <ThreeTickFrameIcon />
          <div className="left-text">
            <Tooltip title={'Left Binary Personal Volume'}>  
              <div>
                {asNumber(myUser.qualification.l_bpev)}/90
              </div>
            </Tooltip>
            {/*
            <Tooltip title={'Left Binary Business Volume'}>  
              <div>
                {asNumber(myUser.qualification.l_bgv)}/300
              </div>
            </Tooltip>
            */}
          </div>
          <div className="right-text">
            <Tooltip title={'Right Binary Personal Volume'}>  
              <div>
                {asNumber(myUser.qualification.r_bpev)}/90
              </div>
            </Tooltip>
            {/*
            <Tooltip title={'Right Binary Business Volume'}>  
              <div>
                {asNumber(myUser.qualification.r_bgv)}/300
              </div>
            </Tooltip>
            */}
          </div>
          <div className='bottom-chart-root'>
            <div className='line-text d-flex justify-content-between'>
              <div>
                Lesser Leg:&nbsp;
                {myUser.qualification.l_bgv*1<=myUser.qualification.r_bgv*1
                ? `Left` : `Right`}
              </div>
              <div>
                BV:&nbsp;
                {myUser.qualification.l_bgv*1<=myUser.qualification.r_bgv*1
                ? asNumber(myUser.qualification.l_bgv)
                : asNumber(myUser.qualification.r_bgv)}/300
              </div>
            </div>
            <div className='line-chart'>
              <div className='chart-progressed'
                style={{ 
                  width: (Math.min(myUser.qualification.l_bgv*1<=myUser.qualification.r_bgv*1?
                    myUser.qualification.l_bgv: myUser.qualification.r_bgv, 300)/300)*100+'%'
                }}
              />
            </div>
            
          </div>
        </div>
        {isQualified && 
        <div className="congratulation-text">
          <span>Congratulations!</span> You are now Binary Qualified!
        </div>
        }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 15px 0px 20px;
  height: 100%;
  @media (max-width: 1045px) {
    padding: 15px 0px 0px;
  }
  .binary-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .binary-label {
      font-weight: normal;
      font-size: 18px;
      display: flex;
      align-items: center;
      img {
        margin-left: 8px;
      }
    }
    .binary-tick {
    }
  }
  .binary-frame-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-bottom: 1px solid #f2f2f2;
    .you-text {
      font-weight: normal;
      font-size: 14px;
      margin: 20px 0px -10px;
    }
    .top-text {
      color: #7f8fa3;
      font-weight: normal;
      font-size: 12px;
      position: relative;
      top: 57px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 1.2em;
    }
    .left-text {
      color: #7f8fa3;
      font-weight: normal;
      font-size: 12px;
      position: relative;
      left: -93px;
      top: -93px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .right-text {
      color: #7f8fa3;
      font-weight: normal;
      font-size: 12px;
      position: relative;
      right: -91px;
      top: -111px;
      margin-bottom: -10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .unilevel-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100% - 20px);
  }
  .congratulation-text {
    font-weight: 500;
    font-size: 13px;
    color: #7f8fa3;
    text-align: center;
    margin-top: 12px;
    span {
      font-weight: 600;
      color: #05c1ff;
    }
  }
  .bottom-chart-root {
    width: 100%;
    .line-chart {
      background-color: #E4F1FF;
      height: 10px;
      border-radius: 10.5px;
      overflow: hidden;
      .chart-progressed {
        background-color: rgb(116, 68, 196);
        height: 100%;
      }
    }
  }
`
