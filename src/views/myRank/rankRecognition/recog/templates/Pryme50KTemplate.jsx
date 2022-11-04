import React from 'react'
import styled from 'styled-components'
import Logo from 'assets/images/rank_templates/logo.png'
import NoImage from 'assets/images/no_image.png'
import BgImg from 'assets/images/rank_templates/Pryme-bg.jpg'
import RankBgImg from 'assets/images/rank_templates/Pryme-rank.png'
import CongratImg from 'assets/images/rank_templates/tina-congrat.png'

export default function Pryme50KTemplate(props) {
  return (
    <Wrapper>
      <div className="Pryme-bg">
        <div className="Pryme-msg">
          <img src={CongratImg} />
        </div>
        <div className="Pryme-rank">
          <img src={RankBgImg} />
        </div>
        <div className="Pryme-dp">
          <img src={props.photo || NoImage} />
        </div>
        <div className="Pryme-name">
          <h3>{`${props.user.first_name}`} </h3>
          <h3>{`${props.user.last_name}`}</h3>
        </div>
        <div className="Pryme-logo">
          <img src={Logo} />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  .Pryme-bg{
    background:url(${BgImg});
    position: relative;
    width: 100%;
    height:1000px;
    overflow: hidden;
    background-size: 100%;
  } 
  .Pryme-bg-img{}
  .Pryme-logo{
    position: absolute;
    bottom: 33px;
    right: 134px;
    width: 164px;
  } 
  .Pryme-name h3{
    font-size: 146px;
    font-family: 'rocknessregular';
    font-weight: normal;
    line-height: 97px;
    color: #fbcd2b;
  }
  .Pryme-name{
    position: absolute;
    left: 63px;
    bottom: 200px;
  } 
  .Pryme-dp{
    position: absolute;
    bottom: 0;
    width: 735px;
  }
  .Pryme-dp img{
    width: 600px;
    height: 937px;
  }
  .Pryme-rank{
    position: absolute;
    right: 47px;
    bottom: 137px;
    text-align: right;
    z-index: 2;
    width: 370px;
  } 
  .Pryme-msg{
    position: absolute;
    right: 30px;
    top: 81px;
    text-align: right;
    z-index: 2;
    width: 386px;
  } 
  .Pryme-name h3 + h3{
    margin: 0 0 0 175px;
    font-size: 89px;
  } 
`
