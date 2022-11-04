import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { 
  TablePanel, Table, 
  Badge, Button, Popover, 
  Popconfirm, SuccessNotification 
} from "components/common";
import { asUsdPrice } from 'utils/text'
import { callGetApiWithAuth, callPutApiWithAuth } from 'utils/api'
import { varKey, varLabel, varIs, varValue } from 'common/var'

export default function TableView(props) {
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchParam, setSearchParam] = useState({
    status: ''
  })

  const onGetListData = (res) => {
    setTableData(res.data)
    setIsLoading(false)
    props.setShouldLoad(false)
  }
  const onFailListData = () => {
    setIsLoading(false)
    props.setShouldLoad(false)
  }
  const loadListData = () => {
    setIsLoading(true)
    const params = {
      ...searchParam
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`my_website/share_cart/list?${q}`, 
      onGetListData, onFailListData
    )
  }

  useEffect(() => {
    if (props.shouldLoad) 
      loadListData()
  }, [props.shouldLoad])

  return (
    <Wrapper>
      <TablePanel
        title={'Sharable Carts'}
        data={tableData}
        loading={isLoading}
        toolbar={
          <div className='toolbar'>
            <Button onClick={() => props.setModalMode('add')}>
              Create Cart
            </Button>
          </div>
        }
        columns={[
          {
            title: 'Title',
            key: 'title',
            render: (_, record) => (
              <span>{record.title}</span>
            )
          },
          {
            title: 'Total Amount', 
            key: 'amount',
            render: (_, record) => {
              let amount = 0
              record.details.forEach(el => {
                if (el.pay_cycle===0) {
                  amount += el.product.member_price*el.quantity
                } else {
                  amount += el.product.recurring_price*el.quantity
                }
              })
              return (
                <span>{asUsdPrice(amount)}</span>
              )
            }
          },
          {
            title: 'Products',
            key: 'products',
            render: (_, record) => (
              <Popover
                content={() => <DetailsTable data={record} />}
                title={null}
              >
                {record.details.length}
              </Popover>
            )
          },
          {
            title: 'Orders',
            key: 'orders',
            render: (_, record) => (
              <span>{record.share_cart_orders.length}</span>
            )
          },
          {
            title: 'Sales Amount',
            key: 'sales_amount',
            render: (_, record) => (
              <span>{asUsdPrice(record.sales_amount)}</span>
            )
          },
          {
            title: 'Status',
            key: 'status', 
            render: (_, record) => (
              <Badge type={'shareCartStatus'}
                keyName={varKey('shareCart.status', record.status)}
                label={varLabel('shareCart.status', record.status)}
              />
            )
          },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <div className='d-flex align-items-center'>
                <ActiveBtn data={record} 
                  setShouldLoad={props.setShouldLoad}
                />
                <span style={{width: 12}} />
                <Button onClick={()=>{
                  props.setModalMode('edit')
                  props.setSelected(record)
                }}>
                  Edit
                </Button>
                <span style={{width: 12}} />
                <Button onClick={()=>{
                  navigator.clipboard.writeText(
                    `${process.env.REACT_APP_CORP_URL}/share-cart?h=${record.hash_code}`
                  );
                }}>
                  Copy Url
                </Button>
              </div>
            )
          }
        ]}
      />
    </Wrapper>
  );
}

const DetailsTable = (props) => {
  return (
    <Table
      dataSource={props.data.details}
      loading={false}
      pagination={false}
      columns={[
        {
          title: 'Product',
          key: 'product',
          render: (_, record) => (
            <span>{record.product.title}</span>
          )
        },
        {
          title: 'Unit Price',
          key: 'price',
          render: (_, record) => (
            <span>
              {asUsdPrice(
                record.pay_cycle===0?record.product.recurring_price
                : record.product.member_price
              )}
            </span>
          )
        },
        {
          title: 'Quantity',
          key: 'quantity',
          render: (_, record) => (
            <span>{record.quantity}</span>
          )
        },
        {
          title: 'Frequency',
          key: 'pay_cycle',
          render: (_, record) => (
            <span>{varLabel('shareCartDetail.payCycle', record.pay_cycle)}</span>
          )
        }
      ]}
    />
  )
}

const ActiveBtn = (props) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const onUpdateDone = (res) => { 
    setIsUpdating(false)
    SuccessNotification(res.message)
    props.setShouldLoad(true)
  }
  const onUpdateFail = () => {
    setIsUpdating(false)
  }
  const handleUpdate = (status) => {
    callPutApiWithAuth(`my_website/share_cart/${props.data.id}/status`, 
      {status}, onUpdateDone, onUpdateFail
    )
  }

  return (
    varIs('shareCart.status', props.data.status, 'active')?
      <Popconfirm onConfirm={() => handleUpdate(varValue('shareCart.status', 'inactive'))}>
        <Button className='inactive-btn'
          loading={isUpdating}
        >
          Deactivate
        </Button>
      </Popconfirm>
      
    :
      <Popconfirm onConfirm={() => handleUpdate(varValue('shareCart.status', 'active'))}>
        <Button className='active-btn'
          loading={isUpdating}
        >
          Activate
        </Button>
      </Popconfirm>
  )
}

export const Wrapper = styled.div`
  .active-btn {
    background: #79b779;
    min-width: 100px;
    border-color: #79b779;
  }
  .inactive-btn {
    min-width: 100px;
    border-color: #f56b6e;
    background: #f56b6e;
  }
  .chart-container {
    width: 140px;
  }
  @media (max-width: 1250px) {
    .table-container {
      .ant-table {
        overflow-x: scroll;
        .ant-table-container {
          width: 1000px;
        }
      }
    }
  }
`;
