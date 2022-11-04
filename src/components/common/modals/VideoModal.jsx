import React from 'react'
import styled from 'styled-components'
import Modal from './Modal'

export default function VideoModal(props) {
  return (    
    <VideoModalStyled
      centered
      width={props.width||640}
      onCancel={props.onCancel}
      bodyStyle={{ padding: 0 }}
      {...props}
    >
      <div
        style={{ padding: "66.25% 0 0 0", position: "relative" }}
      >
        <iframe
          src={props.src}
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          autoplay
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          title="Video"
        ></iframe>
      </div>
    </VideoModalStyled>
  )
}

const VideoModalStyled = styled(Modal)`
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
`
