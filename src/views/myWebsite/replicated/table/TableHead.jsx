import React from "react";
import { Row, Col } from "components/common";
import styled from "styled-components";

export default function TableHead() {
  return (
    <Wrapper>
      <Row className="header" gutter={[0, 10]}>
        <Col xs={24}>
          <div className="title">Replicated Website Traffic</div>
        </Col>
      </Row>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  .header {
    margin-bottom: 15px;
    .title {
      font-weight: 500;
      font-size: 18px;
    }
  }
`;
