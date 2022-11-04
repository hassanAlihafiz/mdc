import React, { useState, useEffect } from "react";
import moment from 'moment'
import { 
  Row, Col, List, Card, 
  Tag, Button, Spin,
  SuccessNotification, Popconfirm,
} from "components/common";
import { asPrice } from 'utils/text'
import { 
  callGetApiWithAuth, callDeleteApiWithAuth 
} from 'utils/api'
import { varLabel } from 'common/var'
import EditModal from "../edit/EditModal";
import { Wrapper } from "./UpcomingSection.styled";

export default function UpcomingSection(props) {
  const [listData, setListData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const onGetListData = (res) => {
    setIsLoading(false)
    setListData(res.data)
    props.setShouldLoad(false)
  }
  const onFailListData = () => {
    setIsLoading(false)
    props.setShouldLoad(false)
  }
  const loadListData = () => {
    setIsLoading(true)
    callGetApiWithAuth(`my_account/subscription/upcomings`, 
      onGetListData, onFailListData
    )
  }

  useEffect(() => {
    if (props.shouldLoad) {
      loadListData()
    }
  }, [props.shouldLoad])

  return (
    <Wrapper>
      {listData.length>0?
      <>
        <div className="payment-header">
          <span>Upcoming Payments</span>
          <div className="main-divider" />
        </div>
        <List grid={{gutter: 20, xs: 1, md: 2, xl: 3, xxl: 4}}
          dataSource={listData}
          renderItem={item => (
            <List.Item>
              <SubscriptionCard data={item} 
                loadListData={loadListData}
                setShouldLoad={props.setShouldLoad}
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
  const [isEdition, setIsEdition] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  const onCancelDone = (res) => {
    setIsCancelling(false)
    SuccessNotification(res.message)
    props.setShouldLoad(true)
  }
  const onCancelFail = () => {
    setIsCancelling(false)
  }
  const handleCancel = () => {
    setIsCancelling(true)
    callDeleteApiWithAuth(`my_account/subscription/${props.data.id}/cancel`, 
      onCancelDone, onCancelFail
    )
  }

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
              <Tag color="#87d068">Active</Tag>
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
      <div className="billing-container">
        Next Bill Date: 
        <span>
          {moment(props.data.next_date).format('MMMM D, YYYY')}
        </span>
      </div>
      <div className="billing-container">
        Frequency: <span>{varLabel('subscription.payCycle', props.data.pay_cycle)}</span>
      </div>
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
      <div className="action-buttons-container">
        <Row gutter={[15, 15]}>
          <Col span={12}>
            <Button
              className="edit"
              onClick={() => setIsEdition(true)}
            >
              Edit
            </Button>
          </Col>
          <Col span={12}>
            <Popconfirm onConfirm={handleCancel}>
              <Button className="cancel"
                loading={isCancelling}
              >
                Cancel
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </div>
      {isEdition &&
        <EditModal 
          data={props.data}
          setIsEdition={setIsEdition}
          setShouldLoad={props.setShouldLoad}
        />
      }
    </Card>
  )
}
