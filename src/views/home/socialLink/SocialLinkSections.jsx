import React from "react";
import { Row, Col } from "components/common";
import FacebookIcon from "assets/icons/facebook.svg";
import InstagramIcon from "assets/icons/instagram.svg";
import TwitterIcon from "assets/icons/twitter.svg";
import YoutubeIcon from "assets/icons/youtube.svg";
import { Wrapper } from "./SocialLinkSections.styled";

export default function SocialLinkSections() {
  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24} md={12} xxl={6}>
          <a href="https://instagram.com/officialmydailychoice?utm_medium=copy_link" target="_blank">
            <div className="social-container">
              <img src={InstagramIcon} />
              <div className="social-text">Follow us on Instagram</div>
            </div>
          </a>
        </Col>
        <Col xs={24} md={12} xxl={6}>
          <a href="https://www.youtube.com/c/MyDailyChoiceOfficial" target="_blank">
            <div className="social-container">
              <img src={YoutubeIcon} />
              <div className="social-text">Follow us on Youtube</div>
            </div>
          </a>
        </Col>
        <Col xs={24} md={12} xxl={6}>
          <a href="https://www.facebook.com/officialmydailychoice/" target="_blank">
            <div className="social-container">
              <img src={FacebookIcon} />
              <div className="social-text">Follow us on Facebook</div>
            </div>
          </a>
        </Col>
        <Col xs={24} md={12} xxl={6}>
          <a href="https://t.me/MyDailyChoiceNews" target="_blank">
            <div className="social-container">
              <img src={TwitterIcon} />
              <div className="social-text">Follow us on Telegram</div>
            </div>
          </a>
        </Col>
      </Row>
    </Wrapper>
  );
}
