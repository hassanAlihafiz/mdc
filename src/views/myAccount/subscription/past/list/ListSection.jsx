import React, { useState, useEffect } from "react";
import moment from 'moment'
import { 
  Row, Col, List, Card, 
  Tag, Spin
} from "components/common";
import { asPrice } from 'utils/text'
import { 
  callGetApiWithAuth 
} from 'utils/api'
import { Wrapper } from "./ListSection.styled";

export default function ListSection() {
  const [listData, setListData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const onGetListData = (res) => {
    setIsLoading(false)
    setListData(res.data)
  }
  const onFailListData = () => {
    setIsLoading(false)
  }
  const loadListData = () => {
    setIsLoading(true)
    callGetApiWithAuth(`my_account/subscription/pasts`, 
      onGetListData, onFailListData
    )
  }

  useEffect(() => {
    loadListData()
  }, [])

  return (
    <Wrapper>
      {listData.length>0?
      <>
        <List grid={{gutter: 20, xs: 1, md: 2, xl: 3, xxl: 4}}
          dataSource={listData}
          renderItem={item => (
            <List.Item>
              <SubscriptionCard data={item} 
                loadListData={loadListData}
              />
            </List.Item>
          )}
          loading={{
            spinning: isLoading || false,
            indicator: <Spin spinning={true} className={`spinner`} />,
          }}
        />
      </>
      : ''}      
    </Wrapper>
  );
}

const SubscriptionCard = (props) => {
  return (
    <Card>
      <Row gutter={[10, 10]}>
        <Col span={10}>
          <div className="payment-product-image">
            <img src={props.data.product.image_path} />
          </div>
        </Col>
        <Col span={14}>
          <div className="price-container">
            <div className="payment-title">
              {props.data.product.title}
            </div>
            <div className="payment-tag">
              <Tag color="red">Cancelled</Tag>
            </div>
            <div className="payment-price-container">
              <div className="payment-price">
                <div className="label">Price</div>
                <div className="price">
                  {asPrice(props.data.product.recurring_price)}
                </div>
              </div>
              <div className="payment-quantity">
                <div className="label">Quantity</div>
                <div className="quantity">{props.data.quantity}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 15]} className="date-row">
        <Col span={12}>
          <div className="date-container">
            <div className="date-label">Date Created</div>
            <div className="date-value">
              {moment(props.data.created_at).format('MMMM D, YYYY')}
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="date-container">
            <div className="date-label">Volume (BV)</div>
            <div className="date-value">{props.data.product.recurring_pv}</div>
          </div>
        </Col>
      </Row>
    </Card>
  )
}