import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { 
  Table, Spin, UserAvatar, 
  RankBadge, CountryFlag
} from 'components/common'
import { 
  callGetApiWithAuth
} from 'utils/api'
import { asNumber } from 'utils/text'

export default function UnilevelTable() {
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
    callGetApiWithAuth(`dashboard/unilevel_table`,
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
            title: 'Username',
            key: 'username',
            render: (_, record) => (
              <span>{record.username}</span>
            )
          },
          {
            title: 'Name',
            key: 'name',
            render: (_, record) => (
              <UserAvatar 
                image={record.image}
                title={`${record.first_name} ${record.last_name}`}
              />
            )
          },
          {
            title: 'Rank',
            key: 'rank_id',
            render: (_, record) => (
              <RankBadge 
                label={record.rank.name}
              />
            )
          },
          {
            title: 'Enroller Tree BV',
            key: 'gv',
            render: (_, record) => (
              <span>{asNumber(record.qualification.gv)}</span>
            )
          },
          {
            title: 'Country',
            key: 'country',
            render: (_, record) => (
              <CountryFlag country={record.country} />
            )
          },
        ]}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
.ant-table-container {
  overflow-x: auto;
}
table {
  min-width: 700px;
}
`
