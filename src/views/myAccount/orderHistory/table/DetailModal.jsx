import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { 
  Modal, Table, Badge 
} from 'components/common'
import { varKey, varLabel } from 'common/var'
import { asLocalPrice } from 'utils/text'

export default function DetailModal(props) {
  return (
    <Modal width={800}
      onCancel={()=>props.setSelectedOrder(undefined)}
      title={`Order #${props.selectedOrder.order_number}`}
    >
      <Wrapper>
        <div className={'d-flex align-items-center justify-content-between'}>
          <div className={'d-flex align-items-center'}>
            <label>Status:{' '}</label>&nbsp;
            <Badge type='orderStatus' 
              keyName={varKey('order.status', props.selectedOrder.status)}
              label={varLabel('order.status', props.selectedOrder.status)}
            />
          </div>
          <div>
            {props.selectedOrder.tracking_number?
              <a href={props.selectedOrder.tracking_url}
                target={'_blank'} rel="noreferrer"
              >
                {props.selectedOrder.tracking_number}
              </a>
            : ''}
          </div>
        </div>
        <h4 style={{marginTop: 32}}>Order Details</h4>
        <Table
          dataSource={props.selectedOrder.details}
          pagination={false}
          columns={[
            {
              title: '#',
              key: 'sno',
              render: (_, __, index) => (
                <span>{index+1}</span>
              )
            },
            {
              title: 'Name',
              key: 'product',
              render: (_, record) => (
                <span>{record.title}</span>
              )
            },
            {
              title: 'Price',
              key: 'price',
              render: (_, record) => (
                <span>{asLocalPrice(record.local_price)}</span>
              )
            },
            {
              title: 'PV',
              key: 'total_amount',
              render: (_, record) => (
                <span>{record.pv}</span>
              )
            },
            {
              title: 'Qty',
              key: 'quantity',
              render: (_, record) => (
                <span>{record.quantity}</span>
              )
            },
            {
              title: 'Line Total',
              key: 'total_amount',
              render: (_, record) => (
                <span>{asLocalPrice(record.local_total_amount)}</span>
              )
            },            
          ]}
        />
        <h4 style={{marginTop: 32}}>Shipping Details</h4>
        <Table
          dataSource={props.selectedOrder.shipping_details}
          pagination={false}
          columns={[
            {
              title: '#',
              key: 'sno',
              render: (_, __, index) => (
                <span>{index+1}</span>
              )
            },
            {
              title: 'Name',
              key: 'product',
              render: (_, record) => (
                <span>{record.title}</span>
              )
            },            
            {
              title: 'Qty',
              key: 'quantity',
              render: (_, record) => (
                <span>{record.quantity}</span>
              )
            },
          ]}
        />
        <h4 style={{marginTop: 32}}>
          Total:&nbsp;
          {asLocalPrice(props.selectedOrder.local_order_total_amount)}
          &nbsp;&nbsp;&nbsp;
          Tax:&nbsp;
          {asLocalPrice(props.selectedOrder.local_tax_amount)}
          &nbsp;&nbsp;&nbsp;
          Shipping Price:&nbsp;
          {asLocalPrice(props.selectedOrder.local_shipping_price)}
          &nbsp;&nbsp;&nbsp;
          PV:&nbsp;
          {props.selectedOrder.order_total_pv}
          &nbsp;&nbsp;&nbsp;
        </h4>
        {props.selectedOrder.shipping_address && 
        <h4>
          Ship To:&nbsp;
          {`${props.selectedOrder.shipping_address || ''} ${props.selectedOrder.shipping_address_line2 || ''}, ${props.selectedOrder.shipping_city || ''} ${props.selectedOrder.shipping_state || ''}, ${props.selectedOrder.shipping_zipcode || ''}, ${props.selectedOrder.shipping_country}`}
        </h4>
        }
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
  h4 {
    font-size: 16px;
  }
  .ant-table-thead > tr > th {
    padding: 8px 8px;
  }
`
