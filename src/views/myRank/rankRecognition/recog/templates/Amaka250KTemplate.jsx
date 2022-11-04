import React from 'react'
import styled from 'styled-components'
import Logo from 'assets/images/rank_templates/logo.png'
import NoImage from 'assets/images/no_image.png'
import BgImg from 'assets/images/rank_templates/Aaron-bg.jpg'
import RankBgImg from 'assets/images/rank_templates/Amaka-rank.png'
import CongratImg from 'assets/images/rank_templates/sonia-congrat.png'

export default function Amaka250KTemplate(props) {
  return (
    <Wrapper>
      <div className="amaka-bg">
        <div className="amaka-dp-bg">
          <img src={props.photo || NoImage} />
        </div>
        <div className="page-logo">
          <img src={Logo} />
        </div>
        <div className="person-msg">
          <img src={CongratImg} />
        </div>
        <div className="person-rank">
          <img src={RankBgImg} />
        </div>
        <div className="amaka-dp">
          <img src={props.photo || NoImage} />
        </div>
        <div className="amaka-name">
          <h3>{`${props.user.first_name}`} </h3>
          <h3>{`${props.user.last_name}`}</h3>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  .page-logo{
    position: absolute;
    top: 15px;
    right: 30px;
    width: 213px;
  } 
  .person-rank{
    position: absolute;
    right: 30px;
    bottom: 41px;
    text-align: right;
    z-index: 3;
    width: 415px;
  } 
  .person-msg{
    position: absolute;
    right: 30px;
    top: 191px;
    text-align: right;
    width: 552px;
    z-index: 3;
  } 
  .amaka-bg {
    background:url(${BgImg});
    position: relative;
    width: 100%;
    height:1000px;
    background-size: 100%;
    overflow: hidden;
  }
  .amaka-dp{
    position: absolute;
    bottom: 0;
    width: 600px;
    z-index: 1;
    img {
      width: 600px;
      height: 957px;
    }
  }
  .amaka-name h3{
    font-size: 140px;
    font-family: 'rocknessregular';
    font-weight: normal;
    line-height: 105px;
    color: #fed045;
  } 
  .amaka-name h3 + h3{
	  margin: 0 0 0 100px;
	  font-size: 117px;
  }
  .amaka-name{
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 50px 0px 100px 102px;
    box-shadow: inset 0 0 200px 200px #0000007d, 0 0 103px 100px #0000007d;
    z-index: 4;
  }
  .amaka-dp-bg{
    position: absolute;
    width: 100%;
    right: -6px;
    opacity: 0.2;
    bottom: -130px;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
`
