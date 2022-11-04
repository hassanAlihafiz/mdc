import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  TablePanel, Spin, 
} from 'components/common'
import { callGetApiWithAuth } from 'utils/api'
import { asPrice } from 'utils/text';
import ArrowLeftIcon from '@ant-design/icons/ArrowLeftOutlined'

export default function DetailView(props) {
  const [tableData, setTableData] = useState([])
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10, 
    total: 0
  })
  const [isLoading, setIsLoading] = useState(false)

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
  const loadTableData = (paginationParam0) => {
    setIsLoading(true)
    const params = {
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`earning/${props.selected.id}/detail/${props.bonusId}?${q}`, onGetTableData, onFailTableData)
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
    <Wrapper>
      <div className='action-bar'>
        <div className='go-link'
          onClick={() => props.setViewMode('summary')}
        >
          <ArrowLeftIcon />&nbsp;
          <span>Back</span>
        </div>
      </div>
      <div className='table-container'>
        <TablePanel 
          data={tableData}
          loading={isLoading}
          paginationParam={ paginationParam}
          onPageChange={onPageChange}
          columns={[
            {
              title: 'Downline',
              render: (_, record) => (
                <span>
                  {record.source_user?
                    `${record.source_user.first_name} ${record.source_user.last_name}`
                  : '-'}
                </span>
              )
            }, 
            {
              title: 'Amount',
              align: 'center',
              render: (_, record) => (
                <span>
                  {asPrice(record.amount)}
                </span>
              )
            },
            {
              title: 'BV',
              align: 'center',
              render: (_, record) => (
                <span>
                  {record.source_order?
                    record.source_order.order_total_cv
                  : ''}
                </span>
              )
            },
            {
              title: 'Percentage',
              align: 'center',
              render: (_, record) => (
                <span>
                  {record.source_order?
                    `${((record.amount/record.source_order.order_total_cv)*100).toFixed(2)}%`
                  : ''}
                </span>
              )
            },
            {
              title: 'Level',
              align: 'center',
              render: (_, record) => (
                <span>
                  {record.source_user_level}
                </span>
              )
            }
          ]}
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .loadingRoot {
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .action-bar {
    .go-link {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    margin-bottom: 20px;
    span {
      color: ${props=>props.theme.palette.link};
    }
  }
  .table-container {
  }
  .cardRoot {
    padding: 0;
    background: transparent;
    box-shadow: none;
  }
  .panelHead {
    display: none;
  }
  
`
