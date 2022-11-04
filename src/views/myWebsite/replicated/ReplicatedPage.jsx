import React, { useState } from "react";
import { Row, Col, Alert } from "components/common";
import YourWebsite from "./yourWebsite/YourWebsite";
import CustomWebsite from "./customWebsite/CustomWebsite";
import TableView from "./table/TableView";
import { Wrapper } from "./ReplicatedPage.styled";

export default function ReplicatedPage() {
  const [reloadData, setReloadData] = useState(false);
  return (
    <Wrapper>
      <div className="main-container">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <Alert type="info" message={<div dangerouslySetInnerHTML={{ __html: `MyDailyChoice makes it easy for Affiliates to drive traffic and get credit for sales. Please write down and save your replicated website exactly as it is written. Sending your traffic into the wrong website could result in incorrect enrollments. For questions, please email <a style="color: #1890ff; text-decoration: none" href="mailto:support@mydailychoice.com">support@mydailychoice.com</a>.`}} />} className="replicate-alert" showIcon />
          </Col>
          <Col xs={24} xl={9} xxl={7}>
            <YourWebsite />{" "}
          </Col>
          <Col xs={24} xl={15} xxl={17}>
            <CustomWebsite
              reloadData={reloadData}
              setReloadData={setReloadData}
            />{" "}
          </Col>
          {/* <Col span={24}>
            <TableView reloadData={reloadData} setReloadData={setReloadData} />{" "}
          </Col> */}
        </Row>
      </div>
    </Wrapper>
  );
}
