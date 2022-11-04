import React from 'react'
import styled from 'styled-components'
import Logo from 'assets/images/rank_templates/logo.png'
import NoImage from 'assets/images/no_image.png'
import BgImg from 'assets/images/rank_templates/Amaka-bg.png'
import RankBgImg from 'assets/images/rank_templates/Judy-rank.png'
import CongratImg from 'assets/images/rank_templates/sonia-congrat.png'

export default function JudySuperTemplate(props) {
  return (
    <Wrapper>
      <div className="amaka-bg">
        <div className="judy-dp-bg">
          <img src={props.photo || NoImage} />
        </div>
        <div className="page-logo">
          <img src={Logo} />
        </div>
        <div className="person-msg judy-msg ">
          <img src={CongratImg} />
        </div>
        <div className="judy-rank">
          <img src={RankBgImg} />
        </div>
        <div className="judy-dp">
          <img src={props.photo || NoImage} />
        </div>
        <div className="judy-name">
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
  .amaka-bg {
    background:url(${BgImg});
    position: relative;
    width: 100%;
    height:1000px;
    background-size: 100%;
    overflow: hidden;
  }
  .page-logo{
    position: absolute;
    top: 15px;
    right: 30px;
    width: 213px;
  } 
  .person-msg{
    position: absolute;
    right: 30px;
    top: 191px;
    text-align: right;
    width: 552px;
  } 
  .judy-dp{
    position: absolute;
    bottom: 0;
    width: 693px;
    img {
      width: 600px;
      height: 937px;
    }
  }
  .judy-name h3{
    font-size: 140px;
    font-family: 'rocknessregular';
    font-weight: normal;
    line-height: 105px;
    color: #e5b231;
  } 
  .judy-name h3 + h3{
    margin: 0 0 0 145px;
	  font-size: 98px;
  }
  .judy-name{
    position: absolute;
    left: 54px;
    bottom: 190px;
    z-index: 3;
  }
  .judy-dp-bg{
    position: absolute;
    width: 666px;
    right: 0;
    opacity: 0.3;
    top: -31px;
    transform: rotate(8deg);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    img {
      width: 600px;
      height: 937px;
    }
  }
	.judy-rank{
    position: absolute;
    right: 30px;
    bottom: 56px;
    text-align: right;
    z-index: 2;
    width: 940px;
  } 
  .judy-msg{
    position: absolute;
    right: 30px;
    top: 175px;
    text-align: right;
    z-index: 2;
    width: 560px;
  } 


  .page-bg {
    background:url(${BgImg});
    position: relative;
    width: 100%;
    height:1000px;    
    overflow: hidden;
    background-size: 100%;
  }
  .page-logo{
    position: absolute;
    top: 15px;
    right: 30px;
    width: 213px;
  } 
  .person-dp-bg{
    position: absolute;
    width: 100%;
    right: 101px;
    opacity: 0.2;
    bottom: -155px;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    img {
      width: 600px;
      height: 957px;
    }
  }
  .person-name h3{
    font-size: 140px;
    font-family: 'rocknessregular';
    font-weight: normal;
    line-height: 97px;
    color: #fed045;
  }
 .person-name{
    position: absolute;
    left: 115px;
    bottom: 200px;
    z-index: 5;
  } 
  .person-dp{
    position: absolute;
    bottom: 0;
    width: 670px;
    z-index: 4;
    img {
      width: 600px;
      height: 957px;
    }
  }
  .person-dp img{}
	.person-rank{
    position: absolute;
    right: 30px;
    bottom: 41px;
    text-align: right;
    z-index: 5;
    width: 415px;
  } 
 
  .person-msg{
    position: absolute;
    right: 30px;
    top: 191px;
    text-align: right;
    width: 552px;
    z-index: 5;
  } 
  .person-name h3 + h3{
    margin: 0 0 0 20px;
    font-size: 117px;
  }
`
