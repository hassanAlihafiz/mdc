import React from "react";
import { Row, Col } from "components/common";
import DummyUserImage from "assets/images/dummy-user.png";
import Product1Image from "assets/images/product-1.png";
import Product2Image from "assets/images/product-2.png";
import Product3Image from "assets/images/product-3.png";
import { Wrapper } from "./LiveSales.styled";

export default function LiveSales({ height }) {
  let data = [
    {
      image: Product1Image,
    },
    {
      image: Product2Image,
    },
    {
      image: Product3Image,
    },
    {
      image: Product2Image,
    },
    {
      image: Product3Image,
    },
  ];
  return (
    <Wrapper>
      <div className="live-title">Live Sales</div>
      <div className="divider" />
      <div className="responsive-sales-container" style={{height: 192}}>
        <Row gutter={[15, 15]}>
          {data?.map((val) => {
            return (
              <Col span={24}>
                <div className="sales-container">
                  <div className="sales-user">
                    <div className="user-name">
                      <img src={DummyUserImage} />
                      John Doe <span>bought CBD+ Melatonin</span>
                    </div>
                  </div>
                  <div className="sales-image">
                    <img src={val.image} />
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </Wrapper>
  );
}
