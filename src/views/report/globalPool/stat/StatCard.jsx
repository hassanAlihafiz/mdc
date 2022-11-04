import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { 
  Card, TablePanel, 
  UserAvatar, StepBar, MonthPicker 
} from 'components/common'
import { callGetApiWithAuth } from 'utils/api'
import { asDate } from 'utils/text'

export default function StatCard() {
  const [statData, setStatData] = useState([
    {
      title: 'Enrollments',
      name: `0`
    },
    {
      title: 'Shares',
      name: `0`
    },
  ])
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15, 
    total: 0
  })
  const [searchParam, setSearchParam] = useState({
    month: `${moment().format('YYYY-MM-DD')}`
  })

  const onMonthChange = (v) => {
    let month = moment().format('YYYY-MM-DD')
    if (v) {
      month = moment(v).format('YYYY-MM-DD')
    }
    const searchParam0 = {
      ...searchParam,
      month
    }
    const paginationParam0 = {
      ...paginationParam,
      currentPage: 1
    }
    setSearchParam(searchParam0)
    loadStatData(searchParam0)
    loadTableData(paginationParam0, searchParam0)
  }

  const onGetStatData = (res) => {
    setStatData([
      {
        title: 'Enrollments',
        name: res.data.pes,
        is_active: true
      },
      {
        title: 'Shares',
        name: res.data.shares
      },
    ])
  }
  const loadStatData = (searchParam0) => {
    const params = {
      ...searchParam0
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`report/global_pool/stats?${q}`, onGetStatData)
  }

  const onGetTableData = (res) => {
    setPaginationParam({
      ...paginationParam,
      currentPage: res.data.current_page,
      total: res.data.total
    })
    setTableData(res.data.data)
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
    callGetApiWithAuth(`report/global_pool/list?${q}`, 
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

  useEffect(() => {
    loadStatData(searchParam)
    loadTableData(paginationParam, searchParam)
  }, [])

  return (
    <Wrapper>
      <Card>
        <div>
          <div className='d-flex justify-content-between align-items-center'>
            <h4 className='title'>
              Global Bonus Pool
            </h4>
            <div>
              <MonthPicker 
                date={searchParam.month}
                onChange={onMonthChange}
                format={'MMM, YYYY'}
              />
            </div>
          </div>
          <StepBar data={statData} topTitle />
        </div>
        <TablePanel
          data={tableData}
          loading={isLoading}
          paginationParam={paginationParam}
          onPageChange={onPageChange}
          columns={[
            {
              title: 'User',
              key: 'user',
              render: (_, record) => (
                <UserAvatar 
                  image={record.user.image}
                  title={`${record.user.first_name} ${record.user.last_name}`}
                />
              )
            },
            {
              title: 'User ID',
              key: 'uuid',
              render: (_, record) => (
                <span>{record.user.uuid}</span>
              )
            }, 
            {
              title: 'Order Number',
              key: 'order_number',
              render: (_, record) => (
                <span>{record.order_number}</span>
              )
            },
            {
              title: 'BV', 
              key: 'order_total_cv',
              render: (_, record) => (
                <span>{record.order_total_cv}</span>
              )
            },
            {
              title: 'Ordered Date',
              key: 'paid_at',
              render: (_, record) => (
                <span>{asDate(record.paid_at)}</span>
              )
            }
          ]}
        />
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 20px;
  h4 {
    font-size: 18px;
    color: ${props=>props.theme.palette.text};
  }
  .cardRoot {
    box-shadow: none;
  }
`
