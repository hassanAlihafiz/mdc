import React from 'react'
import styled from 'styled-components'
import Logo from 'assets/images/rank_templates/logo.png'
import NoImage from 'assets/images/no_image.png'
import BgImg from 'assets/images/rank_templates/Tina-bg.jpg'
import RankBgImg from 'assets/images/rank_templates/tina-rank.png'
import CongratImg from 'assets/images/rank_templates/tina-congrat.png'

export default function Tina100KTemplate(props) {
  return (
    <Wrapper>
      <div className="Tina-bg">
        <div className="Pryme-msg">
          <img src={CongratImg} />
        </div>
        <div className="Tina-rank">
          <img src={RankBgImg} />
        </div>
        <div className="Tina-dp">
          <img src={props.photo || NoImage} />
        </div>
        <div className="Tina-name">
          <h3>{`${props.user.first_name}`}</h3>
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
  .Tina-bg{
    background:url(${BgImg});
    position: relative;
    width: 100%;
    height:1000px;
    overflow: hidden;
    background-size: 100%;
  } 
  .Tina-bg-img{}
  .Tina-logo{
    position: absolute;
    bottom: 33px;
    right: 112px;
    width: 170px;
  } 
  .Tina-name h3{
    font-size: 146px;
    font-family: 'rocknessregular';
    font-weight: normal;
    line-height: 114px;
    color: #fbcd2b;
  }
  .Tina-name{
    position: absolute;
    left: 63px;
    bottom: 41px;
    text-align: center;
  } 
  .Tina-dp{
    position: absolute;
    bottom: 0;
    width: 747px;
  } 
  .Tina-dp img {
    width: 600px;
    height: 937px;
  }
	.Tina-rank{
    position: absolute;
    right: 47px;
    bottom: 160px;
    text-align: right;
    z-index: 2;
    width: 401px;
  }
  .Tina-name h3 + h3{ 
    font-size: 83px;
  }
  .Pryme-msg{
    position: absolute;
    right: 30px;
    top: 81px;
    text-align: right;
    z-index: 2;
    width: 386px;
  } 
  .Pryme-logo{
    position: absolute;
    bottom: 33px;
    right: 134px;
    width: 164px;
  } 
`
