import React, { useEffect, useState } from "react";
import { Row, Col } from "components/common";
import { callGetApiWithAuth } from "utils/api";
import { Wrapper } from "./LiveSales.styled";

export default function LiveSales({ height, data }) {
  const [liveSales, setLiveSales] = useState([]);
  const [lastOrderId, setLastOrderId] = useState(0);
  const [timer, setTimer] = useState(0);

  const onGetLiveSalesSuccess = ({ data }) => {
    if (data.newOrders?.length > 0) {
      setLastOrderId(data.newOrders[data.newOrders?.length - 1].order_id);
      setLiveSales([
        ...liveSales?.map((el) => el),
        ...data.newOrders?.map((el) => el),
      ]);
    }
  };

  const onGetLiveSalesFailed = () => {};

  const onLoadLiveSales = () => {
    callGetApiWithAuth(
      `live_stream/get/live_sale/${data.path}/${lastOrderId}`,
      onGetLiveSalesSuccess,
      onGetLiveSalesFailed
    );
  };

  useEffect(() => {
    onLoadLiveSales();
  }, [timer]);

  useEffect(() => {
    if (data) {
      const interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 10000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [data]);

  return (
    <Wrapper>
      <div className="live-title">Live Sales</div>
      <div className="divider" />
      <div className="responsive-sales-container" style={{ height: 192 }}>
        <Row gutter={[15, 15]}>
          {liveSales?.map((el) => {
            return (
              <Col span={24}>
                <div className="sales-container">
                  <div className="sales-user">
                    <div className="user-name">
                      <img src={el.order?.user?.image} />
                      {el.order?.user?.first_name} {el.order?.user?.last_name} <span>{el.order?.details?.[0]?.product?.title}</span>
                    </div>
                  </div>
                  <div className="sales-image">
                    <img src={el.order?.details?.[0]?.product?.image_path} />
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
