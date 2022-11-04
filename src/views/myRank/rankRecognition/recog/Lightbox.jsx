import React from 'react'
import styled from 'styled-components'
import { Modal, Button } from 'components/common'
import DownloadIcon from '@ant-design/icons/DownloadOutlined'
import LinkedinIcon from 'assets/icons/linkedin_website.svg'
import TwitterIcon from 'assets/icons/twitter_website.svg'
import FacebookIcon from 'assets/icons/facebook_website.svg'
import MailIcon from 'assets/icons/mail_website.svg'

export default function Lightbox(props) {
  const downloadImage = () => {
    window.open(props.selectedRecog.image, '_blank')
  }

  return (
    <ModalStyled
      centered
      onCancel={()=>props.setSelectedRecog(undefined)}
    >
      <img src={props.selectedRecog.image} />
      <div className='social-links'>
        <span className='social-icon'>
          <img src={LinkedinIcon} />
        </span>
        <span className='social-icon'>
          <img src={TwitterIcon} />
        </span>
        <span className='social-icon'>
          <img src={FacebookIcon} />
        </span>
        <span className='social-icon'>
          <img src={MailIcon} />
        </span>
        <Button className='download-btn'
          onClick={downloadImage}
        >
          <DownloadIcon />
          Download Image
        </Button>
      </div>
    </ModalStyled>
  )
}

const ModalStyled = styled(Modal)`
  .ant-modal-close {
    top: -16px; right: -16px;
    border-radius: 50%;
    background: white;
  }
  .ant-modal-close-x {
    width: 32px;
    height: 32px;
    line-height: 28px;
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-content {
    background-color: transparent;
    box-shadow: none;
  }
  img {
    width: 100%;
  }
  .social-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;
    justify-content: center;
    padding-top: 10px;
    background: white;
    .social-icon {
      margin-right: 8px;
      margin-bottom: 8px;
      cursor: pointer;
      color: white;
      img {
        width: 32px;
        height: 32px;
      }
    }
    .download-btn {
      display: flex;
      align-items: center;
      background: transparent;
      color: #1C67FF;
      border: 1px solid #1C67FF;
      border-radius: 4px;
      font-size: 16px;
      height: 34px;
      margin-bottom: 8px;
    }
  }
`
