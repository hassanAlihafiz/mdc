import React from "react";
import styled from "styled-components";
import { Card } from 'components/common'
import { asPrice, asDate } from 'utils/text'
import checkIcon from 'assets/icons/tick.svg'

export default function ReListCard({ data, bg }) {
  return (
    <Wrapper>
      <Card>
        <h4>Rank Achievement Bonus (Monthly)</h4>
        <div className="stepList">
          {data.map((item, index) => {
            let radius = "0px 0px 0px 0px";
            if (index === 0) {
              radius = "50px 0px 0px 50px";
            } else if (index === data.length - 1) {
              radius = "0px 50px 50px 0px";
            }
            let fontColor = "gray";
            let bgColor = "#e1e7ef";
            if (item.is_able) {
              bgColor = bg || '#52c41a';
              fontColor = "#fff";
            }

            return (
              <div
                className='stepRoot'
                style={{ marginRight: index === data.length - 1 ? "0px" : "4px" }}
              >
                <StepBgWrapper
                  fontColor={fontColor}
                  bgColor={bgColor}
                  borderRadius={radius}
                >
                  {item.rank.name}
                </StepBgWrapper>

                <div className='stepTitle'>
                  {asPrice(item.amount)}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  h4 { 
    font-size: 18px;
    color: ${props=>props.theme.palette.text};
    margin-bottom: 12px;
  }
  .stepList {
    overflow: auto;
    display: flex;
    padding-bottom: 6px;
  }
  .stepRoot {
    text-align: center;
    width: 100%;
  }
  .stepTitle {
    margin-top: 5px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .stepSubtitle {
    color: ${props=>props.theme.palette.secondary};
    font-size: 12px;
  }
  .stepChecked {
    width: 18px;  
    height: 18px;
    margin-left: 8px;
  }
`
const StepBgWrapper = styled.div`
  padding: 5px;
  font-weight: 500;
  font-size: 20px;
  color: ${props=>props.fontColor};
  background: ${props=>props.bgColor};
  min-width: 125px;
  border-radius: ${props=>props.borderRadius};
`
