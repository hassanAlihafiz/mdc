import { useEffect, useState } from "react"
import { Alert, Empty, Tooltip } from "antd"
import { AiFillInfoCircle } from "react-icons/ai"
import { useSelector } from "react-redux"
import { asPrice } from "utils/text"
import { varLabel } from "common/var"
import { QuestionCircleOutlined } from "@ant-design/icons"

export default function CheckoutSideCart(props) {
  const isShowSideCart = useSelector((state) => state.ui.isShowSideCart)
  const orderDetails = useSelector((state) => state.checkout.orderDetails)
  const [oneTimeIndividualProducts, setOneTimeIndividualProducts] = useState([])
  const [oneTimePackProducts, setOneTimePackProducts] = useState([])
  const [subscriptionIndividualProducts, setSubscriptionIndividualProducts] = useState([])
  const [subscriptionPackProducts, setSubscriptionPackProducts] = useState([])
  const [oneTimePackSavedMoney, setOneTimePackSavedMoney] = useState(0)
  const [subscriptionSavedMoney, setSubscriptionSavedMoney] = useState(0)
  const [subscriptionPackSavedMoney, setSubscriptionPackSavedMoney] = useState(0)
  const [oneTimeItems, setOneTimeItems] = useState(0)
  const [oneTimeTotalPrice, setOneTimeTotalPrice] = useState(0)
  const [subscriptionItems, setSubscriptionItems] = useState(0)
  const [subscriptionTotalPrice, setSubscriptionTotalPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalSavedMoney, setTotalSavedMoney] = useState(0)
  const [eachPackOriginalTotalPrices, setEachPackOriginalTotalPrices] = useState(undefined)
  const [eachPackSubscriptionOriginalTotalPrices, setEachPackSubscriptionOriginalTotalPrices] = useState(undefined)
  const [totalPv, setTotalPv] = useState(0)

  useEffect(() => {
    let oneTimeIndividualProducts_ = [], oneTimePackProducts_ = [], subscriptionIndividualProducts_ = [], subscriptionPackProducts_ = []
    let oneTimeItems_ = 0, oneTimeTotalPrice_ = 0, subscriptionItems_ = 0, subscriptionTotalPrice_ = 0, totalPrice_ = 0, totalPv_ = 0

    for (let order of orderDetails) {
      totalPv_ += order.product.pv * order.quantity

      if (order.product.purchase_type*1 === 1 || (order.product.purchase_type*1 === 3 && !order.pay_cycle)) {
        oneTimeItems_ = oneTimeItems_*1 + order.quantity*1
        oneTimeTotalPrice_ = oneTimeTotalPrice_ + order.product.member_price * order.quantity
        if (order.product.is_pack*1 === 1) {
          oneTimePackProducts_.push(order)
        } else {
          oneTimeIndividualProducts_.push(order)
        }
      } else {
        subscriptionItems_ = subscriptionItems_*1 + order.quantity*1
        subscriptionTotalPrice_ = subscriptionTotalPrice_ + order.product.recurring_price * order.quantity
        if (order.product.is_pack*1 === 1) {
          subscriptionPackProducts_.push(order)
        } else {
          subscriptionIndividualProducts_.push(order)
        }
      }
    }
    totalPrice_ = oneTimeTotalPrice_ + subscriptionTotalPrice_ + (props.shippingPrice ? props.shippingPrice*1 : 0) + (props.tax ? props.tax*1 : 0)

    setOneTimeIndividualProducts(oneTimeIndividualProducts_)
    setOneTimePackProducts(oneTimePackProducts_)
    setSubscriptionIndividualProducts(subscriptionIndividualProducts_)
    setSubscriptionPackProducts(subscriptionPackProducts_)
    setOneTimeItems(oneTimeItems_)
    setOneTimeTotalPrice(oneTimeTotalPrice_)
    setSubscriptionItems(subscriptionItems_)
    setSubscriptionTotalPrice(subscriptionTotalPrice_)
    setTotalPrice(totalPrice_)
    props.setTotalPrice(totalPrice_)
    setTotalPv(totalPv_)
  }, [orderDetails, props.shippingPrice, props.tax])

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
  }, [oneTimePackProducts])
  
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
  }, [subscriptionIndividualProducts, subscriptionPackProducts])

  useEffect(() => {
    setTotalSavedMoney(oneTimePackSavedMoney + subscriptionSavedMoney + subscriptionPackSavedMoney)
  }, [oneTimePackSavedMoney, subscriptionSavedMoney, subscriptionPackSavedMoney])

  useEffect(() => {
    if (!props.hasPhysicalOrder) {
      props.setShippingPrice(undefined)
      props.setTax(undefined)
    }
  }, [props.hasPhysicalOrder])

  return (
    <div className={`side-cart ${isShowSideCart ? "active" : ""}`}>
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
          {(props.hasPhysicalOrder && props.shippingPrice !== undefined) &&
            <div className="summary-label-value">
              <strong>Shipping Price:</strong>
              <b>{asPrice(props.shippingPrice)}</b>
            </div>
          }
          {(props.hasPhysicalOrder && props.tax !== undefined) &&
            <div className="summary-label-value">
              <strong>Tax:</strong>
              <b>{asPrice(props.tax)}</b>
            </div>
          }
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
        </div>
      </div>
      <div className="order-details">
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
                      <strong>{el.quantity}</strong>
                    </div>
                  </div>
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
                      <strong>{el.quantity}</strong>
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
                      <strong>{el.quantity}</strong>
                    </div>
                  </div>
                  <div className="order-frequency">
                    <label>Frequency:</label>
                    <strong>{varLabel("product.subscriptionFrequencyList", el.pay_cycle)}</strong>
                  </div>
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
                      <strong>{el.quantity}</strong>
                    </div>
                  </div>
                  <div className="order-frequency">
                    <label>Frequency:</label>
                    <strong>{varLabel("product.subscriptionFrequencyList", el.pay_cycle)}</strong>
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
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}