import React from "react";
import { Row, Col } from "components/common";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { Wrapper } from "./SignalsAnalyzerPage.styled";

export default function SignalsAnalyzerPage(props) {
  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <a className="go-home" onClick={() => props.handleChangeTab("home")}><DoubleLeftOutlined /> Go Home</a>
        </Col>
      </Row>
      <div className="signals-analyzer-content">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <iframe src="https://embedder.traducationfx.com/signal-analyzer/get-iframe?brokerKey=zTUK220aBMC&amp;traderStateKey=&amp;traderId=&amp;langCode=en&amp;categories=forex%2Ccrypto%2Ccommodities&amp;strengthKeys=" style={{ width:"100%", height:600, border: 0}}></iframe>
          </Col>
        </Row>
      </div>
    </Wrapper>
  )
}