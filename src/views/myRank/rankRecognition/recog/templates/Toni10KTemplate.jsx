import React from 'react'
import styled from 'styled-components'
import Logo from 'assets/images/rank_templates/logo.png'
import NoImage from 'assets/images/no_image.png'
import BgImg from 'assets/images/rank_templates/Toni-bg.jpg'
import RankBgImg from 'assets/images/rank_templates/Toni-rank.png'

export default function Toni10KTemplate(props) {
  return (
    <Wrapper>
      <div className="Toni-page-bg">
        <div className="Aaron-page-logo">
          <img src={Logo} />
        </div>
        <div className="Toni-rank">
          <img src={RankBgImg} />
        </div>
        <div className="Toni-dp">
          <img src={props.photo || NoImage} />
        </div>
        <div className="Toni-name">
          <h3>{`${props.user.first_name} ${props.user.last_name}`}</h3>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  .Toni-page-bg{
    background:url(${BgImg});
    position: relative;
    width: 100%;
    height:1000px;
    background-size: 100%;
  }
  .Aaron-page-logo{
    position: absolute;
    right: 20px;
    width: 145px;
    bottom: 20px;
    z-index: 9;
  }
  .Toni-page-logo{
    position: absolute;
    right: 20px;
    width: 180px;
    bottom: 20px;
  }
  .Toni-dp{
    width: 650px;
  }
  .Toni-dp img {
    width: 600px;
    height: 937px;
  }
  .Toni-name{
    bottom: 50px;
    position: absolute;
    left: 168px;
    color: #00003b;
  }
  .Toni-name h3{
    font-size: 180px;
    font-family: 'rocknessregular';
    font-weight: normal;
    color: transparent;
    padding: 0 30px;
    background-position: center;
    color: #fed045;
  }
  .Toni-rank{
    position: absolute;
    right: 47px;
    top: 215px;
    text-align: right;
    width: 434px;
  }
`
