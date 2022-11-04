import React from 'react'
import styled from 'styled-components'
import Logo from 'assets/images/rank_templates/logo.png'
import NoImage from 'assets/images/no_image.png'
import BgImg from 'assets/images/rank_templates/bg.jpg'
import RankBgImg from 'assets/images/rank_templates/Juan-rank.png'

export default function Juan1KTemplate(props) {
  return (
    <Wrapper>
      <div className="juan-bg">
        <div className="juan-logo">
          <img src={Logo} />
        </div>
        <div className="juan-rank">
          <img src={RankBgImg} />
        </div>
        <div className="juan-dp">
          <img src={props.photo || NoImage} />
        </div>
        <div className="juan-name">
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
  .juan-bg {
    background:url(${BgImg});
    position: relative;
    width: 100%;
    height:1000px;
    background-size: 100%;
    overflow: hidden;
  }
  .juan-dp{
    position: absolute;
    top: 13px;
    width: 594px;
    left: 30px;
    img {
      width: 600px;
      height: 957px;
    }
  }
	.juan-logo {
    position: absolute;
    top: 140px;
    right: 102px;
    width: 214px;
  }  
  .juan-name h3{
    font-size: 200px;
    font-family: 'rocknessregular';
    font-weight: normal;
    line-height: 160px;
    color: #fed045;
    margin: 0 0 0 96px;
  } 
  .juan-name h3 + h3{
	  margin: -13px 0  0 0;
	  font-size: 150px;
	  line-height: 117px;
  }
  .juan-name{
    position: absolute;
    left: 30px;
    bottom: 35px;
    z-index: 3;
  } 
  .juan-rank{
    position: absolute;
    right: 52px;
    bottom: 53px;
    text-align: right;
    z-index: 2;
    width: 487px;
  } 
`
