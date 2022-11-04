import React, { useState, useEffect } from 'react'
import { 
  TablePanel, Input, Button, UserAvatar
} from 'components/common'
import { callGetApiWithAuth } from 'utils/api'
import { asPrice, asDate } from 'utils/text'

export default function TableView(props) {
  const [tableData, setTableData] = useState([])
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0
  })
  const [searchParam, setSearchParam] = useState({
    uuid: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const onFormInput = (field, value) => {
    setSearchParam({
      ...searchParam,
      [field]: value
    })
  }

  const onGetTableData = (res) => {
    setIsLoading(false)
    setTableData(res.data.data)
    setPaginationParam({
      ...paginationParam,
      currentPage: res.data.current_page,
      total: res.data.total
    })
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
    callGetApiWithAuth(`report/decline_report/list?${q}`, 
      onGetTableData, onFailTableData
    )
  }

  const onPageChange = (page) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: page
    }
    loadTableData(paginationParam0, searchParam)
  }

  const handleSearch = () => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: 1
    }
    loadTableData(paginationParam0, searchParam)
  }

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <TablePanel
      title={'Decline Report (Failed Subscriptions)'}
      data={tableData}
      loading={isLoading}
      paginationParam={paginationParam}
      onPageChange={onPageChange}
      toolbar={
        <div className='d-flex align-items-center'>
          <Input value={searchParam.uuid}
            onChange={e=>onFormInput('uuid', e.target.value)}
            placeholder={'Search by User ID'}
          />
          <span style={{width: 12}} />
          <Button loading={isLoading}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      }
      columns={[
        {
          title: 'User ID',
          key: 'uuid', 
          render: (_, record) => (
            <span>{record.user.uuid}</span>
          )
        },
        {
          title: 'Name',
          key: 'user',
          render: (_, record) => (
            <UserAvatar 
              image={record.user.image}
              title={`${record.user.first_name} ${record.user.last_name}`}
            />
          )
        },
        {
          title: 'Username',
          key: 'username',
          render: (_, record) => (
            <div className='d-flex align-items-center'>
              <span className={'username'} 
                onClick={() => props.setSelectedUser(record.user)}
              >
                {record.user.username}
              </span>
            </div>
          )
        },
        {
          title: 'Level',
          key: 'level',
          render: (_, record) => (
            <span>
              {record.level}
            </span>
          )
        },
        {
          title: 'Date',
          key: 'date',
          render: (_, record) => (
            <span>
              {asDate(record.date)}
            </span>
          )
        },
        {
          title: 'Product',
          key: 'product',
          render: (_, record) => (
            <span>
              {record.product.title}
            </span>
          )
        },
        {
          title: 'Unit.Price',
          key: 'recurring_price',
          render: (_, record) => (
            <span>
              {asPrice(record.product.recurring_price)}
            </span>
          )
        },
        {
          title: 'Quantity',
          key: 'quantity',
          render: (_, record) => (
            <span>
              {record.quantity}
            </span>
          )
        },
        {
          title: 'Amount',
          key: 'amount',
          render: (_, record) => (
            <span>
              {asPrice(record.amount)}
            </span>
          )
        },
      ]}
    />
  )
}
