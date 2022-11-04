import React, { useState, useEffect } from 'react'
import { 
  TablePanel, Select, Input, Button, UserAvatar
} from 'components/common'
import { callGetApiWithAuth } from 'utils/api'
import { asPrice, asDate } from 'utils/text'

export default function TableView() {
  const [tableData, setTableData] = useState([])
  const [searchParam, setSearchParam] = useState({
    type: 'total',
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
    setTableData(res.data)
  }
  const onFailTableData = () => {
    setIsLoading(false)
  }
  const loadTableData = (searchParam0) => {
    setIsLoading(true)
    const params = {
      ...searchParam0,
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`report/top_earner/list?${q}`, 
      onGetTableData, onFailTableData
    )
  }

  const handleSearch = () => {
    loadTableData(searchParam)
  }

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <TablePanel
      title={'Top Earners'}
      data={tableData}
      loading={isLoading}
      toolbar={
        <div className='d-flex align-items-center'>
          <Select value={searchParam.type}
            onChange={v=>onFormInput('type', v)}
            options={[
              { label: 'Total Earned', value: 'total' },
              { label: 'Last 7 days', value: 'last_7' },
              { label: 'Last 30 days', value: 'last_30' },
            ]}
          />
          <span style={{width: 12}} />
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
          title: 'Level',
          key: 'level',
          render: (_, record) => (
            <span>
              {record.level}
            </span>
          )
        },
        {
          title: 'Payout Amount',
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
