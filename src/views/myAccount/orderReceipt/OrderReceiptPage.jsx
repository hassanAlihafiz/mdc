import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import { callGetApiWithAuth } from 'utils/api'
import { asLocalPrice } from "utils/text";
import { countryName } from 'common/country'

export default function OrderReceiptPage(props) {
  const { orderId } = useParams()
  const [orderData, setOrderData] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const onGetOrderDetail = (res) => {
    setIsLoading(false)
    setOrderData(res.data)
  }
  const onFailOrderDetail = () => {
    setIsLoading(false)
  }
  useEffect(() => {
    setIsLoading(true)
    callGetApiWithAuth(`my_account/order_receipt/order/${orderId}`, 
      onGetOrderDetail, onFailOrderDetail
    )
  }, [])

  return (
    <Wrapper>
    {orderData?
      <div className='content-root'>
        <h2>MyDailyChoice</h2>
        <h6>RECEIPT</h6>
        <div>
          <h4>Order Info</h4>
          <table>
            <tr>
              <td>Order Number:</td>
              <td style={{ textAlign: "right", }}>{orderData.order_number}</td>
            </tr>
            <tr>
              <td>Order Date:</td>
              <td style={{ textAlign: "right", }}>{moment(orderData.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
            <tr>
              <td>PV:</td>
              <td style={{ textAlign: "right", }}>{orderData.order_total_pv}</td>
            </tr>
            <tr>
              <td>CV:</td>
              <td style={{ textAlign: "right", }}>{orderData.order_total_cv}</td>
            </tr>            
          </table>
          <hr />
          <h4>User Info</h4>
          <table>
            <tr>
              <td>User ID:</td>
              <td style={{ textAlign: "right", }}>{orderData.user.uuid}</td>          
            </tr>
            <tr>
              <td>First Name:</td>
              <td style={{ textAlign: "right", }}>{orderData.user.first_name}</td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td style={{ textAlign: "right", }}>{orderData.user.last_name}</td>
            </tr>
            <tr>
              <td>E-Mail:</td>
              <td style={{ textAlign: "right", }}>{orderData.user.email}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td style={{ textAlign: "right", }}>{orderData.user.phone}</td>
            </tr>
            <tr>
              <td>Username:</td>
              <td style={{ textAlign: "right", }}>{orderData.user.username}</td>
            </tr>
          </table>
          <hr />
          <h4>Order Details</h4>
          <table>
            <thead>
              <tr>
                <th style={{
                    textAlign: "left",
                    paddingLeft: 5,
                  }}
                >Title</th>
                <th style={{ textAlign: "right", }}>Qty</th>
                <th style={{ textAlign: "right", }}>Price</th>
                <th style={{ textAlign: "right", }}>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData.details.map(orderDetail => 
                <tr>
                  <td style={{
                    textAlign: "left",
                    paddingLeft: 5,
                  }}>{orderDetail.product.title}</td>
                  <td style={{ textAlign: "right", }}>
                    {orderDetail.quantity}
                  </td>
                  <td style={{ textAlign: "right", }}>
                    {asLocalPrice(orderDetail.local_price)}
                  </td>
                  <td style={{ textAlign: "right", }}>
                    {asLocalPrice(orderDetail.local_total_amount)}
                  </td>
                </tr>
              )}
              <tr>
                <td style={{
                    textAlign: "left",
                    paddingLeft: 5,
                  }}>Shipping and Handling</td>
                <td></td>
                <td></td>
                <td style={{ textAlign: "right", }}>
                  {asLocalPrice(orderData.local_shipping_price)}
                </td>
              </tr>
              <tr>
                <td style={{
                  textAlign: "left",
                  paddingLeft: 5,
                }}>
                  Sales Tax
                </td>
                <td></td>
                <td></td>
                <td style={{ textAlign: "right", }}>
                  {asLocalPrice(orderData.local_tax_amount)}
                </td>
              </tr>
              <tr>
                <td style={{
                  textAlign: "left",
                  paddingLeft: 5,
                }}>
                  <strong>Totals:</strong>
                </td>
                <td></td>
                <td></td>
                <td style={{ textAlign: "right", }}>
                  {asLocalPrice(orderData.local_order_total_amount)}
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td style={{ textAlign: "right", }}>
                  {orderData.coin_amount?
                    `${orderData.coin_amount} (${orderData.coin_type.toUpperCase()})`
                  : ''}
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <h4>Shipping Details</h4>
          <table>
            <thead>
              <tr>
                <th style={{
                    textAlign: "left",
                    paddingLeft: 5,
                  }}
                >Title</th>
                <th style={{ textAlign: "right", }}>Qty</th>
              </tr>
            </thead>
            <tbody>
              {orderData.shipping_details.map(orderDetail => 
                <tr>
                  <td style={{
                    textAlign: "left",
                    paddingLeft: 5,
                  }}>{orderDetail.product.title}</td>
                  <td style={{ textAlign: "right", }}>
                    {orderDetail.quantity}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <hr />
          <h4>Shipping Info</h4>
          <table>
            <tr>
              <td>Address Line 1:</td>
              <td style={{ textAlign: "right", }}>{orderData.shipping_address}</td>
            </tr>
            <tr>
              <td>Address Line 2(optional):</td>
              <td style={{ textAlign: "right", }}>{orderData.shipping_address_line2}</td>
            </tr>
            <tr>
              <td>City:</td>
              <td style={{ textAlign: "right", }}>{orderData.shipping_city}</td>
            </tr>
            <tr>
              <td>State/Province:</td>
              <td style={{ textAlign: "right", }}>{orderData.shipping_state}</td>
            </tr>
            <tr>
              <td>ZIP/Postal Code:</td>
              <td style={{ textAlign: "right", }}>{orderData.shipping_zipcode}</td>
            </tr>
            <tr>
              <td>Country:</td>
              <td style={{ textAlign: "right", }}>{countryName(orderData.shipping_country)}</td>
            </tr>
          </table>
        </div>  
      </div>
      : ''}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #fff;
  .content-root {
    width: 480px;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 20px;
  }  
  table {
    width: 100%;
  }
  h2 {
    font-size: 24px;
    text-align: center;
  }
  h6 {
    margin: 32px 0;
    font-size: 16px;
    text-align: center;
  }
  h4 {
    color: rgb(112, 189, 230);
    margin: 15px 0 7px;
    font-size: 18px;
  }
`
