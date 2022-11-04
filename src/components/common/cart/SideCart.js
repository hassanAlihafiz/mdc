import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'components/common';
import { Alert, Empty, InputNumber, Select, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { AiFillInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { asPrice } from "utils/text";
import { varOptions } from "common/var";
import CancelImg from "assets/images/cancel.svg";

export default function SideCart() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isShowSideCart = useSelector((state) => state.ui.isShowSideCart);
  const orderDetails = useSelector((state) => state.checkout.orderDetails);
  const [isEditable, setIsEditable] = useState(false);
  const [oneTimeIndividualProducts, setOneTimeIndividualProducts] = useState([]);
  const [oneTimePackProducts, setOneTimePackProducts] = useState([]);
  const [subscriptionIndividualProducts, setSubscriptionIndividualProducts] = useState([]);
  const [subscriptionPackProducts, setSubscriptionPackProducts] = useState([]);
  const [oneTimePackSavedMoney, setOneTimePackSavedMoney] = useState(0);
  const [subscriptionSavedMoney, setSubscriptionSavedMoney] = useState(0);
  const [subscriptionPackSavedMoney, setSubscriptionPackSavedMoney] = useState(0);
  const [oneTimeItems, setOneTimeItems] = useState(0);
  const [oneTimeTotalPrice, setOneTimeTotalPrice] = useState(0);
  const [subscriptionItems, setSubscriptionItems] = useState(0);
  const [subscriptionTotalPrice, setSubscriptionTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSavedMoney, setTotalSavedMoney] = useState(0);
  const [eachPackOriginalTotalPrices, setEachPackOriginalTotalPrices] = useState(undefined);
  const [eachPackSubscriptionOriginalTotalPrices, setEachPackSubscriptionOriginalTotalPrices] = useState(undefined);
  const [totalPv, setTotalPv] = useState(0);

  const hideSideCart = () => {
    dispatch({
      type: "ui.HIDE_SIDE_CART"
    })
  }

  const handleChangeQuantity = (order, quantity) => {
    if (quantity*1 < 1) return
    
    dispatch({
      type: "checkout.ADD_CART",
      payload: {
        ...order,
        quantity: quantity*1 - order.quantity*1
      }
    })
  }

  const handleChangeFrequency = (order, frequency) => {
    let currentOrder = { ...order }

    dispatch({
      type: "checkout.REMOVE_CART",
      payload: {
        product_id: currentOrder.product.id,
        pay_cycle: currentOrder.pay_cycle
      }
    })
    dispatch({
      type: "checkout.ADD_CART",
      payload: {
        ...currentOrder,
        pay_cycle: frequency
      }
    })
  }

  const handleChangeOrderType = (type, order) => {
    let currentOrder = { ...order }
    
    if (type === "one-time") {
      dispatch({
        type: "checkout.REMOVE_CART",
        payload: {
          product_id: currentOrder.product.id,
          pay_cycle: currentOrder.pay_cycle
        }
      })
      dispatch({
        type: "checkout.ADD_CART",
        payload: {
          ...currentOrder,
          pay_cycle: ""
        }
      })
    } else {
      let payCycle = orderDetails.filter((el) => el.product.id*1 === currentOrder.product.id*1 && el.pay_cycle).length > 0 ? orderDetails.filter((el) => el.product.id*1 === currentOrder.product.id*1 && el.pay_cycle)[0].pay_cycle : 30
      
      dispatch({
        type: "checkout.REMOVE_CART",
        payload: {
          product_id: currentOrder.product.id,
          pay_cycle: currentOrder.pay_cycle
        }
      })
      dispatch({
        type: "checkout.ADD_CART",
        payload: {
          ...order,
          pay_cycle: payCycle
        }
      })
    }
  }

  const handleRemoveOrder = (order) => {
    dispatch({
      type: "checkout.REMOVE_CART",
      payload: {
        product_id: order.product.id,
        pay_cycle: order.pay_cycle
      }
    })
  }

  useEffect(() => {
    let oneTimeIndividualProducts_ = [], oneTimePackProducts_ = [], subscriptionIndividualProducts_ = [], subscriptionPackProducts_ = []
    let oneTimeItems_ = 0, oneTimeTotalPrice_ = 0, subscriptionItems_ = 0, subscriptionTotalPrice_ = 0, totalPrice_ = 0, totalPv_ = 0

    for (let order of orderDetails) {
      totalPv_ += order.product.pv * order.quantity

      if (order.product.purchase_type*1 === 1 || (order.product.purchase_type*1 === 3 && !order.pay_cycle)) {
        oneTimeItems_ = oneTimeItems_*1 + order.quantity*1
        oneTimeTotalPrice_ = oneTimeTotalPrice_ + order.product.member_price * order.quantity
        if (order.product.is_pack*1 === 1 || order.product.is_spack*1 === 1) {
          oneTimePackProducts_.push(order)
        } else {
          oneTimeIndividualProducts_.push(order)
        }
      } else {
        subscriptionItems_ = subscriptionItems_*1 + order.quantity*1
        subscriptionTotalPrice_ = subscriptionTotalPrice_ + order.product.recurring_price * order.quantity
        if (order.product.is_pack*1 === 1 || order.product.is_spack*1 === 1) {
          subscriptionPackProducts_.push(order)
        } else {
          subscriptionIndividualProducts_.push(order)
        }
      }
    }
    totalPrice_ = oneTimeTotalPrice_ + subscriptionTotalPrice_

    setOneTimeIndividualProducts(oneTimeIndividualProducts_)
    setOneTimePackProducts(oneTimePackProducts_)
    setSubscriptionIndividualProducts(subscriptionIndividualProducts_)
    setSubscriptionPackProducts(subscriptionPackProducts_)
    setOneTimeItems(oneTimeItems_)
    setOneTimeTotalPrice(oneTimeTotalPrice_)
    setSubscriptionItems(subscriptionItems_)
    setSubscriptionTotalPrice(subscriptionTotalPrice_)
    setTotalPrice(totalPrice_)
    setTotalPv(totalPv_)
  }, [orderDetails]);

  useEffect(() => {
    let oneTimePackSavedMoney_ = 0
    let eachPackOriginalTotalPrices_ = undefined

    for (let order of oneTimePackProducts) {
      let oneProductTotalMoney = 0
      for (let oneProduct of order.contained_products) {
        oneProductTotalMoney = oneProductTotalMoney + oneProduct.product.member_price * oneProduct.quantity
      }
      oneTimePackSavedMoney_ = oneTimePackSavedMoney_ + (oneProductTotalMoney - order.product.member_price) * order.quantity

      eachPackOriginalTotalPrices_ = {
        ...eachPackOriginalTotalPrices_,
        [order.product.id]: oneProductTotalMoney * order.quantity
      }
    }
    setEachPackOriginalTotalPrices(eachPackOriginalTotalPrices_)
    setOneTimePackSavedMoney(oneTimePackSavedMoney_)
  }, [oneTimePackProducts]);
  
  useEffect(() => {
    let subscriptionSavedMoney_ = 0, subscriptionPackSavedMoney_ = 0
    let eachPackSubscriptionOriginalTotalPrices_ = undefined

    for (let order of subscriptionIndividualProducts) {
      subscriptionSavedMoney_ = subscriptionSavedMoney_ + ((order.product.member_price - order.product.recurring_price) * order.quantity)
    }
    for (let order of subscriptionPackProducts) {
      subscriptionSavedMoney_ = subscriptionSavedMoney_ + ((order.product.member_price - order.product.recurring_price) * order.quantity)

      let oneSubscriptionPackTotalMoney = 0

      for (let oneProduct of order.contained_products) {
        oneSubscriptionPackTotalMoney = oneSubscriptionPackTotalMoney + oneProduct.product.recurring_price * oneProduct.quantity
      }
      subscriptionPackSavedMoney_ = subscriptionPackSavedMoney_ + (oneSubscriptionPackTotalMoney - order.product.recurring_price) * order.quantity

      eachPackSubscriptionOriginalTotalPrices_ = {
        ...eachPackSubscriptionOriginalTotalPrices_,
        [order.product.id]: oneSubscriptionPackTotalMoney * order.quantity
      }
    }
    setEachPackSubscriptionOriginalTotalPrices(eachPackSubscriptionOriginalTotalPrices_)
    setSubscriptionSavedMoney(subscriptionSavedMoney_)
    setSubscriptionPackSavedMoney(subscriptionPackSavedMoney_)
  }, [subscriptionIndividualProducts, subscriptionPackProducts]);

  useEffect(() => {
    setTotalSavedMoney(oneTimePackSavedMoney + subscriptionSavedMoney + subscriptionPackSavedMoney)
  }, [oneTimePackSavedMoney, subscriptionSavedMoney, subscriptionPackSavedMoney]);

  useEffect(() => {
    if (location.pathname && location.pathname === "/checkout") {
      setIsEditable(false)
    } else {
      setIsEditable(true)
    }
  }, [location.pathname]);

  return (
    isShowSideCart ? (
      <Wrapper>
        <div
          className={`side-cart-mask`}
          onClick={hideSideCart}
        />
        <div className={`side-cart ${isShowSideCart ? "active" : ""}`}>
          <div className="order-details">
            <h5>Your Cart</h5>
            <div className="mobile-close-cart" onClick={hideSideCart}>
              <img src={CancelImg} />
              <label>Close</label>
            </div>
            {orderDetails.length === 0 &&
              <div className="no-orders">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span>No Items</span>
                  }
                />
              </div>
            }
            {(oneTimeIndividualProducts.length !== 0 || oneTimePackProducts.length !== 0) &&
              <div className="one-time-orders">
                <div className="order-type">
                  <h6>One-Time Items</h6>
                  <hr />
                </div>
                {oneTimePackSavedMoney*1 !== 0 &&
                  <div className="order-notify pack">
                    <Alert message={<label>Congratulations! You saved <strong>{asPrice(oneTimePackSavedMoney)}</strong> on your pack order.</label>} type="info" showIcon />
                  </div>
                }
                {oneTimeIndividualProducts.map((el, index) => (
                  <div className="order" key={index}>
                    <div className="order-image">
                      <img src={el.product.image_path} />
                    </div>
                    <div className="order-info">
                      <div className="order-title-remove">
                        <label>{el.product.title}</label>
                        <div className="order-remove" onClick={() => handleRemoveOrder(el)}>
                          <img src={CancelImg} />
                        </div>
                      </div>
                      <div className="order-quantity-price">
                        <div className="order-prices">
                          <div className="price-volume">
                            <span>Each:&nbsp;&nbsp;&nbsp;</span>
                            <strong>{asPrice(el.product.member_price)}</strong>
                          </div>
                          <div className="price-volume">
                            <span>BV:&nbsp;&nbsp;&nbsp;</span>
                            <strong>{el.product.pv}</strong>
                          </div>
                        </div>
                        <div className="order-quantity">
                          <label>QTY:</label>
                          {isEditable ?
                            <InputNumber
                              size="small"
                              value={el.quantity}
                              onChange={(value) => handleChangeQuantity(el, value)}
                              width={120}
                            />
                            :
                            <strong>{el.quantity}</strong>
                          }
                        </div>
                      </div>
                      {/* {(isEditable && el.product.purchase_type*1 !== 1) &&
                        <div className="move-order">
                          <label className="cart-pulse">&#8226;</label>
                          <label onClick={() => handleChangeOrderType("subscription", el)}>Subscribe to Save</label>
                        </div>
                      } */}
                    </div>
                  </div>
                ))}
                {oneTimePackProducts.map((el, index) => (
                  <div className="order" key={index}>
                    <div className="order-image">
                      <img src={el.product.image_path} />
                    </div>
                    <div className="order-info">
                      <div className="order-title-remove">
                        <label>{el.product.title}</label>
                        <div className="order-remove" onClick={() => handleRemoveOrder(el)}>
                          <img src={CancelImg} />
                        </div>
                      </div>
                      <div className="order-quantity-price">
                        <div className="order-prices">
                          <div className="price-volume">
                            <span>Each:&nbsp;&nbsp;&nbsp;</span>
                            <strong>{asPrice(el.product.member_price)}</strong>
                          </div>
                          <div className="price-volume">
                            <span>BV:&nbsp;&nbsp;&nbsp;</span>
                            <strong>{el.product.pv}</strong>
                          </div>
                        </div>
                        <div className="order-quantity">
                          <label>QTY:</label>
                          {isEditable ?
                            <InputNumber
                              size="small"
                              value={el.quantity}
                              onChange={(value) => handleChangeQuantity(el, value)}
                              width={120}
                            />
                            :
                            <strong>{el.quantity}</strong>
                          }
                        </div>
                      </div>
                      <div className="includes-products">
                        <b>Pack Includes:</b>
                        {el.contained_products.map((item, item_index) => (
                          <span key={item_index}>{`${item.product.title} (${asPrice(item.product.member_price)})`}&nbsp;&#215;&nbsp;{`${el.quantity * item.quantity}`}</span>
                        ))}         
                      </div>
                      <div className="total-prices">
                        <div className="total-original-price">
                          <b>Total: &nbsp;&nbsp;</b>
                          <strong>{(eachPackOriginalTotalPrices && eachPackOriginalTotalPrices[el.product.id]) ? asPrice(eachPackOriginalTotalPrices[el.product.id]) : ""}</strong>
                        </div>
                        <div className="total-pack-price">
                          <b>{asPrice(el.product.member_price * el.quantity)}</b>
                        </div>
                      </div>
                      {/* {(isEditable && el.product.purchase_type*1 !== 1) &&
                        <div className="move-order">
                          <label className="cart-pulse">&#8226;</label>
                          <label onClick={() => handleChangeOrderType("subscription", el)}>Subscribe to Save</label>
                        </div>
                      } */}
                    </div>
                  </div>
                ))}
              </div>
            }
            {(subscriptionIndividualProducts.length !== 0 || subscriptionPackProducts.length !== 0) &&
              <div className="subscription-orders">
                <div className="order-type">
                  <h6>Subscription Items</h6>
                  <Tooltip
                    title={
                      <>
                        <strong>Save Up To 30%</strong>
                        <br />
                        <small>On your monthly orders</small>
                      </>
                    }
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                  <hr />
                </div>
                {subscriptionSavedMoney*1 !== 0 &&
                  <div className="order-notify recurring">
                    <Alert icon={<AiFillInfoCircle />} message={<label>Congratulations! You saved <strong>{asPrice(subscriptionSavedMoney)}</strong> on your subscription purchases.</label>} type="success" showIcon />
                  </div>
                }
                {subscriptionPackSavedMoney*1 !== 0 &&
                  <div className="order-notify pack">
                    <Alert message={<label>Congratulations! You saved <strong>{asPrice(subscriptionPackSavedMoney)}</strong> on your pack order.</label>} type="info" showIcon />
                  </div>
                }
                {subscriptionIndividualProducts.map((el, index) => (
                  <div className="order" key={index}>
                    <div className="order-image">
                      <img src={el.product.image_path} />
                    </div>
                    <div className="order-info">
                      <div className="order-title-remove">
                        <label>{el.product.title}</label>
                        <div className="order-remove" onClick={() => handleRemoveOrder(el)}>
                          <img src={CancelImg} />
                        </div>
                      </div>
                      <div className="order-quantity-price">
                        <div className="order-prices">
                          <div className="price-volume">
                            <span>Each:&nbsp;&nbsp;&nbsp;</span>
                            <strong>{asPrice(el.product.recurring_price)}</strong>
                          </div>
                          <div className="price-volume">
                            <span>BV:&nbsp;&nbsp;&nbsp;</span>
                            <strong>{el.product.pv}</strong>
                          </div>
                        </div>
                        <div className="order-quantity">
                          <label>QTY:</label>
                          {isEditable ?
                            <InputNumber
                              size="small"
                              value={el.quantity}
                              onChange={(value) => handleChangeQuantity(el, value)}
                              width={120}
                            />
                            :
                            <strong>{el.quantity}</strong>
                          }
                        </div>
                      </div>
                      <div className="order-frequency">
                        <label>Frequency:</label>
                        {isEditable ?
                          <Select
                            size="small"
                            value={el.pay_cycle}
                            onChange={(value) => handleChangeFrequency(el, value)}
                            options={varOptions("product.subscriptionFrequencyList")
                                  .filter((frequency) => 
                                    el.product.pay_cycles.filter((item) => item*1 === frequency.value*1).length > 0
                                  ).map((frequency) => ({
                                    label: frequency.label,
                                    value: frequency.value,
                                  }))
                                }
                            dropdownClassName="cart-order-frequency-dropdown"
                          />
                          :
                          <strong>{el.pay_cycle}</strong>
                        }
                      </div>
                      {/* {(isEditable && el.product.purchase_type*1 !== 2) &&
                        <div className="move-order">
                          <label className="not-subscription" onClick={() => handleChangeOrderType("one-time", el)}>Do Not Subscribe</label>
                        </div>
                      } */}
                    </div>
                  </div>
                ))}
                {subscriptionPackProducts.map((el, index) => (
                  <div className="order" key={index}>
                    <div className="order-image">
                      <img src={el.product.image_path} />
                    </div>
                    <div className="order-info">
                      <div className="order-title-remove">
                        <label>{el.product.title}</label>
                        <div className="order-remove" onClick={() => handleRemoveOrder(el)}>
                          <img src={CancelImg} />
                        </div>
                      </div>
                      <div className="order-quantity-price">
                        <div className="order-prices">
                          <div className="price-volume">
                            <span>Each:&nbsp;&nbsp;&nbsp;</span>
                            <strong>{asPrice(el.product.recurring_price)}</strong>
                          </div>
                          <div className="price-volume">
                            <span>BV:&nbsp;&nbsp;&nbsp;</span>
                            <strong>{el.product.pv}</strong>
                          </div>
                        </div>
                        <div className="order-quantity">
                          <label>QTY:</label>
                          {isEditable ?
                            <InputNumber
                              size="small"
                              value={el.quantity}
                              onChange={(value) => handleChangeQuantity(el, value)}
                              width={120}
                            />
                            :
                            <strong>{el.quantity}</strong>
                          }
                        </div>
                      </div>
                      <div className="order-frequency">
                        <label>Frequency:</label>
                        {isEditable ?
                          <Select
                            size="small"
                            value={el.pay_cycle}
                            onChange={(value) => handleChangeFrequency(el, value)}
                            options={varOptions("product.subscriptionFrequencyList")
                                  .filter((frequency) => 
                                    el.product.pay_cycles.filter((item) => item*1 === frequency.value*1).length > 0
                                  ).map((frequency) => ({
                                    label: frequency.label,
                                    value: frequency.value,
                                  }))
                                }
                            dropdownClassName="cart-order-frequency-dropdown"
                          />
                          :
                          <strong>{el.pay_cycle}</strong>
                        }
                      </div>
                      <div className="includes-products">
                        <b>Pack Includes:</b>
                        {el.contained_products.map((item, item_index) => (
                          <span key={item_index}>{`${item.product.title} (${asPrice(item.product.recurring_price)})`}&#215;{el.quantity * item.quantity}</span>
                        ))}                          
                      </div>
                      <div className="total-prices">
                        <div className="total-original-price">
                          <b>Total: &nbsp;&nbsp;</b>
                          <strong>{(eachPackSubscriptionOriginalTotalPrices && eachPackSubscriptionOriginalTotalPrices[el.product.id]) ? asPrice(eachPackSubscriptionOriginalTotalPrices[el.product.id]) : ""}</strong>
                        </div>
                        <div className="total-pack-price">
                          <b>{asPrice(el.product.recurring_price * el.quantity)}</b>
                        </div>
                      </div>
                      {/* {(isEditable && el.product.purchase_type*1 !== 2) &&
                        <div className="move-order">
                          <label className="not-subscription" onClick={() => handleChangeOrderType("one-time", el)}>Do Not Subscribe</label>
                        </div>
                      } */}
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>
          <div className="order-summary">
            <div className="order-summary-details">
              <h5>Order Summary</h5>
              <div className="summary-label-value">
                <strong>One-Time Items:</strong>
                <b>{oneTimeItems}</b>
              </div>
              <div className="summary-label-value">
                <strong>One-Time Total Price:</strong>
                <b>{asPrice(oneTimeTotalPrice)}</b>
              </div>
              <div className="summary-label-value">
                <strong>Subscription Items:</strong>
                <b>{subscriptionItems}</b>
              </div>
              <div className="summary-label-value">
                <strong>Subscription Total Price:</strong>
                <b>{asPrice(subscriptionTotalPrice)}</b>
              </div>
            </div>
            <div className="order-summary-result">
              <div className="order-total-price">
                <h6>Total Price:</h6>
                <h6>{asPrice(totalPrice)}</h6>
              </div>
              <div className="order-total-price">
                <h6>Total Business Volume:</h6>
                <h6>{totalPv}</h6>
              </div>
              {totalSavedMoney*1 !== 0 &&
                <div className="order-notify pack">
                  <Alert icon={<AiFillInfoCircle />} message={ <label>You saved a total of <strong>{asPrice(totalSavedMoney)}</strong>.</label>} type="success" showIcon />
                </div>
              }
              <Link to="/checkout">
                <Button
                  className="new-checkout-button"
                  disabled={orderDetails.length === 0}
                >
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    )
    : (<></>)
  )
}

const Wrapper = styled.div`
  z-index: 100;
  .side-cart-mask {
    position: fixed;
    width: calc(100vw - 400px);
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000000;
    z-index: 10;
    display: block;
    opacity: 50%;
  }
  .side-cart {
    position: fixed;
    width: 400px;
    height: 100%;
    top: 0;
    right: 0;
    background-color: #ffffff;
    z-index: 10;
    display: flex;
    flex-direction: column;
    padding: 50px 20px 10px;
    line-height: 1.5715;
    img {
      max-width: 100%;
    }
    .mobile-close-cart {
      display: none;
      position: absolute;
      top: 30px;
      right: 15px;
      padding: 3px;
    }
    h5 {
      font-size: 20px;
      font-weight: 700;
    }
    .order-notify {
      .ant-alert {
        font-size: 12px;
        border-radius: unset;
        padding: 8px 5px;
        margin: 10px 0 0;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .ant-alert-icon {
          margin-top: 2px;
        }
        .ant-alert-message {
          color: rgba(0, 0, 0, 0.85);
        }
      }
      .ant-alert-info {
        .ant-alert-icon {
          color: #00B2FF;
        }
      }
      .ant-alert-success {
        background-color: #f6ffed;
        border: 1px solid #b7eb8f;
        .ant-alert-icon {
          color: #52c41a;
          font-size: 14px;
        }
      }
    }
    .order-type {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      h6 {
        font-weight: 600;
        color: #344470;
        margin-bottom: 0px;
        margin-right: 5px;
        white-space: nowrap;
      }
      hr {
        width: 100%;
        margin-left: 50px;
      }
    }
    .order {
      padding: 12px;
      margin: 15px 0;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      display: flex;
      flex-direction: row;
      .order-image {
        width: 90px;
        height: 100%;
      }
      .order-info {
        width: 270px;
        padding-left: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .order-title-remove {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          font-size: 14px;
          font-weight: 600;
          .order-remove {
            width: 20px;
            padding: 5px;
            border: 1px solid #9f9f9f;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
        .order-quantity-price {
          margin-top: 15px;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
          .order-prices {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            .price-volume {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              min-width: 86px;
            }
            span {
              font-size: 12px;
              font-weight: 600;
              opacity: 0.6;
            }
          }
          .order-quantity {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            label {
              margin-right: 14px;
              font-weight: 600;
              opacity: 0.6;
              font-size: 12px;
            }
          }
          .ant-input-number {
            width: 70px;
            border-radius: unset;
            .ant-input-number-handler-wrap {
              opacity: 1;
              border-radius: unset;
            }
            .ant-input-number-input {
              border-radius: unset;
            }
          }
        }
        .includes-products {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-top: 12px;
          b {
            font-size: 12px;
            font-weight: 500;
            opacity: 0.6;
          }
          span {
            font-size: 12px;
            font-weight: 500;
            opacity: 0.6;
            margin-left: 10px;
          }
        }
        .total-prices {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          margin-top: 12px;
          .total-original-price {
            margin-right: 20px;
            b {
              opacity: 0.6;
            }
            strong {
              text-decoration: line-through;
              text-decoration-color: #00b2ff;
            }
          }
        }
      }
    }
    .move-order {
      margin-top: 12px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      label {
        font-size: 12px;
        color: #f14705;
        font-weight: 600;
        cursor: pointer;
      }
      label.not-subscription {
        color: #344470;
      }
      .cart-pulse {
        box-shadow: 0 0 0 0 rgb(241 71 5 / 40%);
        animation: cart-pulse 1.5s infinite;
        margin-right: 10px;
        border-radius: 50%;
        width: 5px;
        height: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .cart-pulse:hover {
        animation: none;
      }
      @-webkit-keyframes cart-pulse {
        0% {
          -webkit-box-shadow: 0 0 0 0 rgba(241, 71, 5, 0.4);
        }
        70% {
            -webkit-box-shadow: 0 0 0 10px rgba(241, 71, 5, 0);
        }
        100% {
            -webkit-box-shadow: 0 0 0 0 rgba(241, 71, 5, 0);
        }
      }
      @keyframes cart-pulse {
        0% {
          -moz-box-shadow: 0 0 0 0 rgba(241, 71, 5, 0.4);
          box-shadow: 0 0 0 0 rgba(241, 71, 5, 0.4);
        }
        70% {
            -moz-box-shadow: 0 0 0 10px rgba(241, 71, 5, 0);
            box-shadow: 0 0 0 10px rgba(241, 71, 5, 0);
        }
        100% {
            -moz-box-shadow: 0 0 0 0 rgba(241, 71, 5, 0);
            box-shadow: 0 0 0 0 rgba(241, 71, 5, 0);
        }
      }
    }
    .order-details {
      overflow-y: auto;
    }
    .order-summary {
      .order-summary-details {
        padding-bottom: 15px;
        border-bottom: 1px solid #d9d9d9;
        .summary-label-value {
          opacity: 0.5;
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          b {
            text-align: right;
          }
        }
      }
      .order-summary-result {
        padding-top: 15px;
        .order-total-price {
          display: flex;
          justify-content: space-between;
          h6 {
            font-weight: 600;
            font-size: 16px;
          }
        }
      }
      .new-checkout-button {
        width: 100%;
        height: 38px;
        margin: 10px 0;
        padding: 5px;
        border: unset;
        border-radius: 2px;
        font-weight: 600;
        color: #ffffff;
        background: #344470;
      }
    }
  }
  @media (min-width: 240px) and (max-width: 576px) {
    .side-cart-mask {
      width: calc(100% - 300px);
    }
    .side-cart {
      width: 300px;
      padding: 30px 10px 10px;
      .mobile-close-cart {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        img {
          padding: 3px;
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
      }
      .order-type {
        h6 {
          margin-right: 10px;
        }
      }
      .order {
        padding: 5px;
        .order-image {
          width: 60px;
        }
        .order-info {
          width: 210px;
          padding-left: 5px;
        }
      }
    }
  }
`