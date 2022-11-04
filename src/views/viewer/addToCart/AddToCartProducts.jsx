import React from "react";
import { Row, Col, Button } from "components/common";
import Product1Image from "assets/images/product-1.png";
import { ReactComponent as MinusIcon } from "assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";
import Product2Image from "assets/images/product-2.png";
import Product3Image from "assets/images/product-3.png";
import { Wrapper } from "./AddToCartProducts.styled";

export default function AddToCartProducts({ height, openInDrawer }) {
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
      image: Product1Image,
    },
    {
      image: Product2Image,
    },
    {
      image: Product3Image,
    },
  ];
  return (
    <Wrapper
      style={{
        marginTop: openInDrawer && "20px",
        padding: openInDrawer && "0px 20px",
        height: openInDrawer ? height - 40 : height - 110,
      }}
    >
      <div
        className={openInDrawer ? "cart-box" : "responsive-add-butons cart-box"}
      >
        <Row gutter={[20, 20]}>
          {data.map((val) => {
            return (
              <Col span={24}>
                <div className="small-products-card">
                  <div className="product-container">
                    <img src={val?.image} />
                    <div className="product-title">HempWorx Gummies</div>
                    <div className="product-price">
                      Member: <span>$79.00</span>
                    </div>
                    <Row gutter={[15, 15]} className="price-buttons-row">
                      <Col span={12} className="responsive-add-col">
                        <div className="quantity-container">
                          <MinusIcon />
                          <span className="quantity">1</span>
                          <PlusIcon />
                        </div>
                      </Col>
                      <Col span={12} className="responsive-add-col">
                        <Button className="cart-button">Add To Cart</Button>
                      </Col>
                    </Row>
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
