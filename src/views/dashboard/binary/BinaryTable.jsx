import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Table, Spin } from 'components/common'
import { 
  callGetApiWithAuth
} from 'utils/api'
import {
  asNumber
} from 'utils/text'

export default function BinaryTable() {
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const onGetTableData = (res) => {
    setIsLoading(false)
    setTableData(res.data)
  }
  const onFailTableData = () => {
    setIsLoading(false)
  }
  const loadTableData = () => {
    setIsLoading(true)
    callGetApiWithAuth(`dashboard/binary_table`,
      onGetTableData, onFailTableData
    )
  }

  useEffect(() => {
    loadTableData()
  }, [])

  return (
    <Wrapper>
      <Table 
        dataSource={tableData}
        pagination={false}
        loading={{
          spinning: isLoading,
          indicator: <Spin spinning={true} className={`spinner`} />,
        }}
        columns={[
          {
            title: 'Type',
            key: 'type', 
            render: (_, record) => (
              <span>{record.title}</span>
            )
          },
          {
            title: 'Left Leg',
            key: 'left',
            render: (_, record) => (
              <span>{asNumber(record.left)}</span>
            )
          },
          {
            title: 'Right Leg',
            key: 'right',
            render: (_, record) => (
              <span>{asNumber(record.right)}</span>
            )
          }
        ]}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
`
