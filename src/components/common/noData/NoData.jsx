import React from 'react';
import NoDataImage from 'assets/images/NoData.png';
import styled from 'styled-components'

export default function NoData(props) {
  return(
    <Wrapper>
      <div className={`no-data ${props?.className ? props.className : ''}`}>
        <img src={NoDataImage} alt="NoData" />
        <div className='title'>
          {props?.title ? props.title : 'No Data'}
        </div>
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  .no-data {
    display: flex;
    justify-content: center;
    align-items: center;   
    width: calc(100vw - 280px);
    height: calc(100vh - 150px);
    flex-direction: column;
    img {
      width: 180px
    }
    .title {
      color: #354052;
      font-size: 22px;
      margin: 20px 0px 4px;
      text-align: center;
    }
  }

  @media (max-width: 900px) {
    .no-data {
      width: calc(100vw - 20px);
      img {
        width: 140px
      }
    }
  }
`
