import React from 'react'
import styled from 'styled-components'
import Logo from 'assets/images/rank_templates/logo.png'
import NoImage from 'assets/images/no_image.png'
import BgImg from 'assets/images/rank_templates/Tiffany-bg.jpg'
import RankBgImg from 'assets/images/rank_templates/Tiffany-rank.png'

export default function Tiffany5KTemplate(props) {
  return (
    <Wrapper>
      <div className="Tiffany-page-bg">
        <div className="Aaron-page-logo">
          <img src={Logo} />
        </div>
        <div className="Tiffany-rank">
          <img src={RankBgImg} />
        </div>
        <div className="Tiffany-dp">
          <img src={props.photo || NoImage} />
        </div>
        <div className="Tiffany-name">
          <h3>{`${props.user.first_name} ${props.user.last_name}`}</h3> 
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  .Tiffany-page-bg{
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
  .Tiffany-page-logo{
    position: absolute;
    right: 20px;
    width: 180px;
    bottom: 20px;
  }
  .Tiffany-dp{
    width: 688px;
  }
  .Tiffany-dp img {
    width: 600px;
    height: 937px;
  }
  .Tiffany-name{
    bottom: 50px;
    position: absolute;
    left: 168px;
    color: #00003b;
  }
  .Tiffany-name h3{
    font-size: 160px;
    font-family: 'rocknessregular';
    font-weight: normal;
    color: transparent;
    padding: 0 30px;
    background-position: center;
    color: #fed045;
  }
  .Tiffany-rank{
    position: absolute;
    right: 24px;
    top: 154px;
    text-align: left;
    width: 386px;
  }
`
