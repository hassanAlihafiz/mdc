import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { asLocalPrice, asPrice, asNumber, asDate } from 'utils/text'
import { Table} from 'antd'
import { CheckCircleOutlined, IssuesCloseOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { varLabel, varIs, varIsIn } from 'common/var'

export default function Confirmation(props) {
  const dispatch = useDispatch()
  const [subtotalPrice, setSubtotalPrice] = useState(0)

  const columns = [
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title'
    },
    {
      title: 'Unit price',
      key: 'unit_price',
      dataIndex: 'unit_price',
      render: (text) => <>{asPrice(text)}</>
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity'
    },
    {
      title: 'Frequency',
      dataIndex: 'pay_cycle',
      key: 'pay_cycle',
      render: (text) => <>{text ? varLabel("product.subscriptionFrequencyList", text) : "-"}</>
    },
    {
      title: 'Line Total',
      key: 'line_total_price',
      dataIndex: 'line_total_price',
      render: (text) => <>{asPrice(text)}</>
    },
  ]

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    if (props.confirmResult) {
      const orderDetails = props.confirmResult.order.details
      let subtotalPrice = 0
      let tData = []
      orderDetails.map(el=>{
        subtotalPrice += el.price*el.quantity
        tData.push({
          title: el.title,
          quantity: el.quantity,
          pay_cycle: el.pay_cycle,
          unit_price: el.price,
          shipping_price: el.shipping_price,
          line_total_price: el.price * el.quantity,
        })
      })
      setSubtotalPrice(subtotalPrice)
      setTableData(tData)
      
    }
  }, [props.confirmResult])  

  useEffect(() => {
    dispatch({
      type: 'CLEAR_CART'
    })
  }, [])

  return (
    <div className='wrapper order-completion'>
      <div className='d-flex flex-column align-items-center result-content'>
        {props.confirmResult && 
          <>
            {(props.confirmResult.order.is_flagged*1 === 1) && 
              <>
                <InfoCircleOutlined className='confirmed-icon flagged' />
                <h2>We have detected fraud activity.</h2>
                <p>            
                  Please go to your account and upload picture of your identity card and credit card.
                </p>
              </>
            }
            {(props.confirmResult.order.is_flagged*1 === 2 && (props.confirmResult.order.pay_type*1 === 1 || props.confirmResult.order.pay_type*1 === 3)) && 
              <>
                <CheckCircleOutlined className='confirmed-icon' />
                <h2>Your order is complete!</h2>
              </>
            }
            {(props.confirmResult.order.is_flagged*1 === 2 && props.confirmResult.order.pay_type*1 === 5) && 
              <>
                <IssuesCloseOutlined className='confirmed-icon bitcoin' />
                <h2>Your order is complete!</h2>
                <div className="text-center checkout-confirm__warning">
                  <strong>We will remove your account if you don't send payment within 8 hours after you registered.</strong>
                </div>
                <img
                  className="img-fluid checkout-confirm__image mt-3"
                  alt="checkoutImage"
                  src={props.confirmResult?.transaction_urls?.qrcode_url}
                />
              </>
            }
            <div style={{ width: '100%' }}>
              <div className='confirm-box'>
                <p><strong>Order Details</strong></p>
                <Table 
                  className='table-line-items'
                  columns={columns} 
                  dataSource={tableData} 
                  pagination={false} 
                />
              </div>
              <div className='d-flex justify-content-between'>
                <p>Order Number</p>
                <p>{props.confirmResult.order.order_number}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p>Order Date</p>
                <p>{asDate(props.confirmResult.order.created_at)}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p>Subtotal</p>
                <p>{asPrice(subtotalPrice)}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p>PV</p>
                <p>{asNumber(props.confirmResult.order.order_total_pv)}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p>Shipping</p>
                <p>{asLocalPrice(props.confirmResult.order.local_shipping_price)}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p>Tax</p>
                <p>{asLocalPrice(props.confirmResult.order.local_tax_amount)}</p>
              </div>
              {props.confirmResult.order.ext_wallet_amount>0?
              <div className='d-flex justify-content-between total-price'>
                <p>
                  {varIs('order.payType', props.confirmResult.order.pay_type, 'cc+wallet')?'Credit Wallet Paid':''}
                  {varIs('order.payType', props.confirmResult.order.pay_type, 'cc+gift_wallet')?'Gift Wallet Paid':''}
                </p>
                <p>{asLocalPrice(props.confirmResult.order.ext_wallet_amount)}</p>
              </div>
              : ''}
              <div className='d-flex justify-content-between total-price'>
                <p>
                  {varIsIn('order.payType', props.confirmResult.order.pay_type, ['cc+wallet', 'cc+gift_wallet'])?
                    `Credit Card Paid`
                  : `Total`}
                </p>
                <p>{asLocalPrice(props.confirmResult.order.local_order_total_amount)}</p>
              </div>
              {(props.confirmResult.order.is_flagged===2) &&           
                <div className='d-flex justify-content-center  mt-3'>
                  {(props.confirmResult.order.pay_type*1 === 5) && 
                    <a className='btn btn-primary' href={props.confirmResult?.transaction_urls?.checkout_url} target="_blank">
                      Pay Coin Now
                    </a>
                  }
                  {(props.confirmResult.order.pay_type*1 === 4 && props.confirmResult.user.billing_detail.manual_method=='LiqPay') && 
                    <div dangerouslySetInnerHTML={{ 
                      __html: props.confirmResult.cnb_form
                    }} />
                  }
                </div>
              }
            </div>
          </>
        }
      </div>
    </div>
  )
}