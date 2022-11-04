import React from "react";
import { Row, Col, Button } from "components/common";
import styled from "styled-components";

export default function TableHead({
  handleChangeStatus,
  isMarkAsRead,
  isMarkAsUnread
}) {
  return (
    <Wrapper>
      <Row className="header" gutter={[0, 0]}>
        <Col xs={24} sm={12}>
          <div className="title">Notifications</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className="date-picker">
            <Button loading={isMarkAsRead} onClick={() => handleChangeStatus(1)}>Mark As Read</Button>
            <Button loading={isMarkAsUnread} onClick={() => handleChangeStatus(2)}>Mark As Unread</Button>
          </div>
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
    .date-picker {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      button {
        margin-left: 10px;
      }
    }
  }
  @media (max-width: 576px) {
    .date-picker {
      flex-direction: column;
      button {
        width: 100%;
        margin-left: 0px !important;
        margin-top: 10px;
      }
    }
  }
`;
