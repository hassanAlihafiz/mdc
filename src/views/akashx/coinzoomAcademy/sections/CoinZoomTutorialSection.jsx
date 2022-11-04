import React from "react";
import { Row, Col } from "components/common";
import styled from "styled-components";

export default function CoinZoomTutorialSection(props) {

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <div className="page-title">
            <h4><strong>CoinZoom Tutorial</strong></h4>
          </div>
        </Col>
        <Col xs={24}>
          <div className="video_container">
            <div className="video_wrapper">
              <iframe class="sproutvideo-playlist" type="text/html" src="https://videos.sproutvideo.com/playlist/1093d0b01a9a/71d5929862c7193d?layout=0" width="924" height="520" frameBorder="0" allowFullscreen=""></iframe>
            </div>
          </div>
        </Col>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 10px;
  .page-title {
    text-align: center;
  }
  .video_container {
    max-height: 675px;
    .video_wrapper {
      position: relative;
      padding-bottom: 56.25%;
      max-width: 1200px;
      margin: 0 auto;
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-height: 675px;
      }
    }
  }
`