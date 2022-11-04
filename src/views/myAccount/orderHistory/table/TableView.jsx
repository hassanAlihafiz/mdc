import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  TablePanel, 
  Badge, StartEndDatePicker, Button
} from "components/common";
import {
  varLabel, varKey, varIs
} from 'common/var'
import {
  callGetApiWithAuth
} from 'utils/api'
import { asLocalPrice, asDate } from 'utils/text'
import DetailModal from './DetailModal'
import { ReactComponent as RecieptIcon } from "assets/icons/receipt.svg";

export default function TableView() {
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0
  })
  const [searchParam, setSearchParam] = useState({
    startDate: '', endDate: '',
    date_range: ''
  })
  const [selectedOrder, setSelectedOrder] = useState(undefined)

  const onGetTableData = (res) => {
    setTableData(res.data.data)
    setPaginationParam({
      ...paginationParam,
      currentPage: res.data.current_page,
      total: res.data.total,
    })
    setIsLoading(false)
  }
  const onFailTableData = () => {
    setIsLoading(false)
  }
  const loadTableData = (paginationParam0, searchParam0) => {
    setIsLoading(true)
    const params = {
      ...searchParam0,
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`my_account/order_history/orders?${q}`, onGetTableData, onFailTableData)
  }

  const onPageChange = (page) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: page
    }
    loadTableData(paginationParam0, searchParam)
  }

  const handleSearch = () => {
    loadTableData(paginationParam, searchParam)
  }

  const onDateRange = (v) => {
    if (v) {
      setSearchParam({ 
        ...searchParam,
        startDate: v[0],
        endDate: v[1],
        date_range: `${moment(v[0]).format('YYYY-MM-DD')}|${moment(v[1]).format('YYYY-MM-DD')}`
      })
    } else {
      setSearchParam({ 
        ...searchParam,
        startDate: '',
        endDate: '',
        date_range: ''
      })
    }
  };

  useEffect(() => {
    loadTableData(paginationParam, searchParam)
  }, [])

  return (
    <>
      <TablePanel
        title={'My Orders'}
        toolbar={
          <div className='d-flex align-items-center'>
            <StartEndDatePicker 
              startDate={searchParam.startDate}
              endDate={searchParam.endDate}
              onChange={onDateRange}
            />
            <span style={{width: 12}} />
            <Button onClick={handleSearch}>
              Search
            </Button>
          </div>
        }
        data={tableData}
        loading={isLoading}
        paginationParam={paginationParam}
        onPageChange={onPageChange}
        columns={[
          {
            title: "Order Number",
            dataIndex: "order_number",
            render: (text, record) => (
              <a href="javascript:void(0)" 
                style={{ textDecoration: "underline" }}
                onClick={()=>setSelectedOrder(record)}
              >
                {text}
              </a>
            ),
          },
          {
            title: "Date",
            key: "paid_at",
            render: (_, record) => (
              <span>{asDate(record.paid_at)}</span>
            )
          },
          {
            title: "Total Amount",
            key: 'local_order_total_amount',
            render: (_, record) => (
              <span>
                {varIs('userBillingDetail.payType', record.pay_type, 'coin')?
                  `${record.coin_amount || ''} ${record.coin_type || ''}`
                : asLocalPrice(record.local_order_total_amount)}
              </span>
            )
          },
          {
            title: "Tracking ID",
            dataIndex: "tracking_id",
          },
          {
            title: "Payment Status",
            render: (_, record) => (
              <Badge type={'orderStatus'}
                keyName={varKey('order.status', record.status)}
                label={varLabel('order.status', record.status)}
              />
            ),
          },
          {
            title: "Receipt",
            dataIndex: "id",
            render: (_, record) => (
              <Link to={`/my_account/order_receipt/${record.id}`} target="_blank">
                <span className="receipt-box">
                  <RecieptIcon />
                </span>
              </Link>              
            ),
          },
        ]}
      />
      {selectedOrder && 
        <DetailModal
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      }
    </>
  );
}
