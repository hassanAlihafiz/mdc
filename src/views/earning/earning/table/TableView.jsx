import React, { useState, useEffect } from "react";
import { 
  TablePanel,
  Button, Badge, RankBadge, 
} from "components/common";
import { varKey, varLabel } from 'common/var'
import {
  asDate, asPrice
} from 'utils/text'
import { callGetApiWithAuth } from 'utils/api'

export default function TableView(props) {
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1, perPage: 10, total: 0
  })

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
    callGetApiWithAuth(`earning/list?${q}`, 
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

  const onExportDone = (res) => {
    setIsExporting(false)
    window.open(res.data.csv_file, '_blank')
  }
  const onExportFail = () => {
    setIsExporting(false)
  }

  const exportCsv = () => {
    setIsExporting(true)
    callGetApiWithAuth(`earning/export`, onExportDone, onExportFail)
  }

  useEffect(() => {
    loadTableData(paginationParam)
  }, [])

  return (
    <TablePanel
      title={'Earnings'}
      toolbar={
        <Button loading={isExporting}
          onClick={exportCsv}
        >
          Export
        </Button>
      }
      data={tableData}
      loading={isLoading}
      pagination={paginationParam}
      onPageChange={onPageChange}
      columns={[
        {
          title: "Pay Period",
          key: "pay_period",
          render: (_, record) => (
            <span>{`${asDate(record.from)} - ${asDate(record.to)}`}</span>
          )
        },
        {
          title: "Earned Amount",
          key: "earned_amount",
          render: (_, record) => (
            <span>{asPrice(record.amount*1+record.minus_amount*1)}</span>
          )
        },
        {
          title: "Adjusted Amount",
          key: "adjusted_amount",
          render: (_, record) => (
            <span>{asPrice(record.amount*1)}</span>
          )
        },
        {
          title: "Status",
          key: "status",
          render: (_, record) => (
            <Badge type='userBonusStatus'
              keyName={varKey('userBonus.status', record.status)}
              label={varLabel('userBonus.status', record.status)}
            />
          )
        },
        {
          title: "Rank",
          key: "rank",
          render: (_, record) => (
            <RankBadge
              label={record.rank.name}
            />
          )
        },
        {
          title: "Action",
          dataIndex: "summary",
          render: (_, record) => (
            <a href="javascript:void(0)" 
              style={{ textDecoration: "underline" }}
              onClick={() => props.setSelected(record)}
            >
              Earnings Summary
            </a>
          ),
        },
      ]}
    />
  );
}
