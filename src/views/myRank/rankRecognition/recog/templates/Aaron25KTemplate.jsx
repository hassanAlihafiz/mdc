import React from 'react'
import styled from 'styled-components'
import Logo from 'assets/images/rank_templates/logo.png'
import NoImage from 'assets/images/no_image.png'
import BgImg from 'assets/images/rank_templates/Aaron-bg.jpg'
import RankBgImg from 'assets/images/rank_templates/aaron-rank.png'

export default function Aaron25KTemplate(props) {
  return (
    <Wrapper>
      <div className="Aaron-page-bg">
        <div className="Aaron-page-logo">
          <img src={Logo} />
        </div>
        <div className="aaron-rank">
          <img src={RankBgImg} />
        </div>
        <div className="aaron-dp">
          <img src={props.photo || NoImage} />
        </div>
        <div className="aaron-name">
          <h3>{`${props.user.first_name} ${props.user.last_name}`}</h3>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  .Aaron-page-bg{
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
  .aaron-dp { 
    width: 480px;
    position: absolute;
    left: 60px;
    top: 80px;
    height: 640px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .aaron-name{
    bottom: 50px;
    position: absolute;
    left: 47px;
  }
  .aaron-name h3{
    font-size: 183px;
    font-family: 'rocknessregular';
    font-weight: normal;
    padding: 0 30px;
    color: #fed045;
  }
  .aaron-rank{
    position: absolute;
    right: 47px;
    top: 195px;
    text-align: left;
    width: 390px;
  }
`
