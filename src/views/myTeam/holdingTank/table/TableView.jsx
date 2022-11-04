import React, { useState, useEffect } from 'react'
import moment from 'moment'
import {
  TablePanel
} from 'components/common'
import { 
  callGetApiWithAuth
} from 'utils/api'
import PlacementTd from './PlacementTd'
import PowerLegTd from './PowerLegTd'
import ActionTd from './ActionTd'

export default function TableView() {
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
    callGetApiWithAuth(`my_team/holding_tank/holdings`, onGetTableData, onFailTableData)
  }

  useEffect(() => {
    loadTableData()
  }, [])

  return (
    <TablePanel
      title={'Holding Tank'}
      data={tableData}
      loading={isLoading}
      columns={[
        {
          title: 'User ID',
          key: 'uuid',
          render: (_, record) => (
            <span>{record.uuid}</span>
          )
        }, 
        {
          title: 'Name',
          key: 'name',
          render: (_, record) => (
            <span>
              {`${record.first_name} ${record.last_name}`}
            </span>
          )
        },
        {
          title: 'Clear Date',
          key: 'clear_date',
          render: (_, record) => (
            <span>
              {moment(record.created_at).add(7, 'days').format('YYYY-MM-DD')}
            </span>
          )
        },
        {
          title: 'New Placement Sponsor',
          key: 'placement',
          render: (_, record, index) => (
            <PlacementTd 
              data={record}
              index={index}
              tableData={tableData}
              setTableData={setTableData}
            />
          )
        },
        {
          title: 'Leg Position',
          key: 'power_leg',
          render: (_, record, index) => (
            <PowerLegTd
              data={record}
              index={index}
              tableData={tableData}
              setTableData={setTableData}
            />
          )
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <ActionTd 
              data={record}
              loadTableData={loadTableData}
            />
          )
        }
      ]}
    />
  )
}
