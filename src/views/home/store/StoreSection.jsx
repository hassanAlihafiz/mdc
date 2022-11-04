import React from "react";
import { Row, Col } from "components/common";
import AppStoreBackgroundImage from "assets/images/app-store-background.png";
import PlayStoreBackgroundImage from "assets/images/play-store-background.png";
import AppStoreImage from "assets/images/apple-store.png";
import PlayStoreImage from "assets/images/play-store.png";
import { Wrapper } from "./StoreSection.styled";

export default function StoreSection() {
  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24} xl={12}>
          <div
            className="store-container"
            style={{ backgroundImage: `url(${PlayStoreBackgroundImage})` }}
          >
            <div className="store-dark-container">
              <img src={PlayStoreImage} />
            </div>
          </div>
        </Col>
        <Col xs={24} xl={12}>
          <div
            className="store-container"
            style={{ backgroundImage: `url(${AppStoreBackgroundImage})` }}
          >
            <div className="store-dark-container">
              <img src={AppStoreImage} />
            </div>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}
