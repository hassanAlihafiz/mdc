import React, { useEffect, useState } from 'react'
import {
  TablePanel
} from 'components/common'
import { asDate, asPrice } from 'utils/text'
import { callGetApiWithAuth } from 'utils/api'

export default function PayoutHistorySubPage() {
  const [tableData, setTableData] = useState([])
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15, 
    total: 0
  })
  const [isLoading, setIsLoading] = useState(false)

  const onGetTableData = (res) => {
    setTableData(res.data.data)
    setPaginationParam({
      ...paginationParam,
      currentPage: res.data.current_page,
      total: res.data.total
    })
    setIsLoading(false)
  }
  const onFailTableData = () => {
    setIsLoading(false)
  }
  const loadTableData = (paginationParam0) => {
    setIsLoading(true)
    const params = {
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`earning/payout_history/list?${q}`, 
      onGetTableData, onFailTableData
    )
  }

  const onPageChange = (page) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: page
    }
    loadTableData(paginationParam0)
  }

  useEffect(() => {
    loadTableData(paginationParam)
  }, [])

  return (
    <TablePanel
      title={'Payout Histories'}
      data={tableData}
      paginationParam={paginationParam}
      onPageChange={onPageChange}
      loading={isLoading}
      columns={[
        {
          title: 'Date',
          render: (_, record) => (
            <span>{asDate(record.created_at)}</span>
          )
        },
        {
          title: 'Payout Provider',
          render: (_, record) => (
            <span>
              {record.provider.name}
            </span>
          )
        },
        {
          title: 'Amount',
          render: (_, record) => (
            <span>
              {asPrice(record.amount)}
            </span>
          )
        },
        {
          title: 'Note',
          render: (_, record) => (
            <span>{record.note}</span>
          )
        }
      ]}
    />
  )
}
