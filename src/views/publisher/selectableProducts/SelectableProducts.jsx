import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "components/common";
import { useSelector } from "react-redux";
import { sendData } from "utils/webRTCChannel";
import { Wrapper } from "./SelectableProducts.styled";

export default function SelectableProducts({
  data,
  height,
  openInDrawer,
  rtcAdaptor,
  isConnected,
}) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [unSelectedProducts, setUnSelectedProducts] = useState([]);
  const isStreamStart = useSelector((state) => state.publsiher.isStreamStart);
  const [timer, setTimer] = useState(0);

  const onSelectProducts = (el) => {
    setSelectedProducts([
      {
        ...el,
      },
      ...selectedProducts?.map((el_) => el_),
    ]);
    setUnSelectedProducts([
      ...unSelectedProducts?.filter((el_) => el_.product_id !== el.product_id),
    ]);
  };
  const onUnSelectProducts = (el) => {
    setUnSelectedProducts([
      {
        ...el,
      },
      ...unSelectedProducts?.map((el_) => el_),
    ]);
    setSelectedProducts([
      ...selectedProducts?.filter((el_) => el_.product_id !== el.product_id),
    ]);
  };

  const broatcastProducts = () => {
    let products = [
      ...selectedProducts?.map((el) => {
        return {
          id: el.product_id,
          priority: 1,
        };
      }),
      ...unSelectedProducts?.map((el) => {
        return {
          id: el.product_id,
          priority: 0,
        };
      }),
    ];
    sendData(rtcAdaptor, null, null, null, true, products);
  };

  useEffect(() => {
    setUnSelectedProducts(data.products);
  }, [data.products]);

  useEffect(() => {
    if (isStreamStart && isConnected) {
      broatcastProducts();
    }
  }, [isStreamStart, timer]);

  useEffect(() => {
    setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 3000);
  }, []);

  return (
    <Wrapper
      style={{
        marginTop: openInDrawer && "20px",
        padding: openInDrawer && "0px 10px",
        height: openInDrawer ? height - 40 : height - 110,
      }}
    >
      <div className="cart-box">
        <Row gutter={[20, 20]}>
          {selectedProducts.map((el) => {
            return (
              <Col span={24}>
                <div className="small-products-card">
                  <Row gutter={[10, 10]}>
                    <Col span={8}>
                      <img src={el.product.image_path} />
                    </Col>
                    <Col span={16}>
                      <div className="product-details">
                        <div className="label">{el.product.title}</div>
                        <div className="unselect-button">
                          <Button onClick={() => onUnSelectProducts(el)}>
                            Unselect
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
          })}
          {unSelectedProducts.map((el) => {
            return (
              <Col span={24}>
                <div className="small-products-card">
                  <Row gutter={[10, 10]}>
                    <Col span={8}>
                      <img src={el.product.image_path} />
                    </Col>
                    <Col span={16}>
                      <div className="product-details">
                        <div className="label">{el.product.title}</div>
                        <div className="select-button">
                          <Button onClick={() => onSelectProducts(el)}>
                            Select
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </Wrapper>
  );
}
