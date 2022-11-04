import React from "react";
import styled from "styled-components";
import checkIcon from 'assets/icons/tick.svg'

export default function StepBar({ data, bg, topTitle }) {
  return (
    <Wrapper className="d-flex">
      {data.map((item, index) => {
        let radius = "0px 0px 0px 0px";
        if (index === 0) {
          radius = "50px 0px 0px 50px";
        } else if (index === data.length - 1) {
          radius = "0px 50px 50px 0px";
        }
        let fontColor = "gray";
        let bgColor = "#e1e7ef";
        let labelColor = "gray";
        if (item.is_active) {
          bgColor = bg || 'rgb(98, 17, 200)';
          fontColor = "#fff";
          labelColor = "#000";
        }

        return (
          <>
            <div
              className='stepRoot'
              style={{ marginRight: index === data.length - 1 ? "0px" : "4px" }}
            >
              {(topTitle && item?.title) && (
                <div className='stepTitle'>
                  {item.title}
                  {item.is_qualified?
                  <>
                    <img src={checkIcon} 
                      className='stepChecked'
                    />
                  </>
                  : ''}
                </div>
              )}

              <StepBgWrapper
                fontColor={fontColor}
                bgColor={bgColor}
                borderRadius={radius}
              >
                {item.name}
              </StepBgWrapper>

              {(!topTitle && item?.title) && (
                <div className='stepTitle'>
                  {item.title}
                  {item.is_qualified?
                  <>
                    <img src={checkIcon} 
                      className='stepChecked'
                    />
                  </>
                  : ''}
                </div>
              )}
            </div>
          </>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
