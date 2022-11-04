import React from "react";
import { Row, Col, Alert } from "components/common";
import YourWebsite from "./yourWebsite/YourWebsite";
import { getUser } from "utils/auth";
import Cp21Image from "assets/images/capture/cp21_bg.jpg";
import Cp22Image from "assets/images/capture/cp22_bg.jpg";
import Cp23Image from "assets/images/capture/cp23_bg.jpg";
import Cp24Image from "assets/images/capture/cp24_bg.jpg";
import Cp25Image from "assets/images/capture/cp25_bg.jpg";
import Cp26Image from "assets/images/capture/cp26_bg.jpg";
import { Wrapper } from "./CapturePage.styled";

export default function CapturePage() {
  const myUser = getUser();
  const allCapturePages = [
    {
      key: 21,
      url: `${process.env.REACT_APP_CAPTURE_URL}/cp21/${myUser.username}`,
      image: Cp21Image
    },
    {
      key: 22,
      url: `${process.env.REACT_APP_CAPTURE_URL}/cp22/${myUser.username}`,
      image: Cp22Image
    },
    {
      key: 23,
      url: `${process.env.REACT_APP_CAPTURE_URL}/cp23/${myUser.username}`,
      image: Cp23Image
    },
    {
      key: 24,
      url: `${process.env.REACT_APP_CAPTURE_URL}/cp24/${myUser.username}`,
      image: Cp24Image
    },
    {
      key: 25,
      url: `${process.env.REACT_APP_CAPTURE_URL}/cp25/${myUser.username}`,
      image: Cp25Image
    },
    {
      key: 26,
      url: `${process.env.REACT_APP_CAPTURE_URL}/cp26/${myUser.username}`,
      image: Cp26Image
    },
  ]
  
  return (
    <Wrapper>
      <div className="main-container">
        <Row gutter={[20, 20]}>
            <Col xs={24}>
              <Alert type="info" message={<div dangerouslySetInnerHTML={{ __html: `MyDailyChoice makes it easy for Affiliates to drive traffic and get credit for sales. Please write down and save your capture page URLs exactly as they are written. Sending your traffic into the wrong website could result in incorrect enrollments. For questions, please email <a style="color: #1890ff; text-decoration: none" href="mailto:support@mydailychoice.com">support@mydailychoice.com</a>.`}} />} className="replicate-alert" showIcon />
            </Col>
            {allCapturePages.map((el) =>(
              <Col xs={24} sm={12} xl={8} xxl={6} key={el.key}>
                <YourWebsite data={el} />
              </Col>
            ))}
          </Row>
      </div>
    </Wrapper>
  );
}
