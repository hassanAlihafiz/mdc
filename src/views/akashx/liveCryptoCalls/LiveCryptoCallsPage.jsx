import React from "react";
import { Row, Col } from "components/common";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { Wrapper } from "./LiveCryptoCallsPage.styled";

export default function LiveCryptoCallsPage(props) {
  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <a className="go-home" onClick={() => props.handleChangeTab("home")}><DoubleLeftOutlined /> Go Home</a>
        </Col>
      </Row>
      <div className="live-calls-content">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <h4>Wake Up &amp; Win with CoinZoom (Thursdays at 8:30AM PST)</h4>
            <div className="video-content">
              <iframe src="https://vimeo.com/event/1381495/embed/f1976943ed" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullscreen="" style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%"}}></iframe>
            </div>
          </Col>
        </Row>
      </div>
      <div className="live-calls-content">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <h4>Crypto Trading (Tuesdays at 8:30AM PST)</h4>
            <div className="video-content">
              <iframe src="https://vimeo.com/event/1381442/embed/fdeb54f622" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullscreen="" style={{ position:"absolute",top:"0",left:"0",width:"100%",height:"100%"}}></iframe>
            </div>
          </Col>
        </Row>
      </div>
      <div className="live-calls-content">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <h4>Live Crypto Call Replays</h4>
            <div className="video-content">
              <iframe class="sproutvideo-playlist" type="text/html" src="https://videos.sproutvideo.com/playlist/dc93dbbd1a56/9ac0f78cad77bfed?layout=0" style={{position:"absolute",width:"100%",height:"100%",left:0,top:0}} frameBorder="0" allowFullscreen=""></iframe>
            </div>
          </Col>
        </Row>
      </div>
    </Wrapper>
  )
}