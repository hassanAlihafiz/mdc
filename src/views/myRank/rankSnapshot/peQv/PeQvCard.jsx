import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  TablePanel, UserAvatar
} from 'components/common'
import {
  callGetApiWithAuth
} from 'utils/api'
import { 
  asNumber
} from 'utils/text'

export default function PeQvCard() {
  const myUser = useSelector(state=>state.auth.user)
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1, perPage: 15, total: 0
  })

  const onGetListData = (res) => {
    setIsLoading(false)
    setTableData(res.data.data)
    setPaginationParam({
      ...paginationParam,
      currentPage: res.data.current_page,
      total: res.data.total
    })
  }
  const onFailListData = () => {
    setIsLoading(false)
  }
  const loadListData = (paginationParam0) => {
    const params = {
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    setIsLoading(true)
    callGetApiWithAuth(`my_rank/rank_snapshot/pes_gv?${q}`, 
      onGetListData, onFailListData
    )
  }
  const onPageChange = (page) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: page
    }
    loadListData(paginationParam0)
  }

  useEffect(() => {
    loadListData(paginationParam)
  }, [])

  return (
    <TablePanel
      title={'My Enroller Tree'}
      loading={isLoading}
      data={tableData}
      paginationParam={paginationParam}
      onPageChange={onPageChange}
      columns={[
        {
          title: 'User ID',
          render: (_, record) => (
            <span>#{record.uuid}</span>
          )
        },
        {
          title: 'Name',
          render: (_, record) => (
            <UserAvatar 
              image={record.image}
              title={`${record.first_name} ${record.last_name}`}
            />
          )
        },
        {
          title: 'Total Current Volume',
          align: 'center',
          render: (_, record) => (
            <span>
              {asNumber(record.qualification.gv)}
            </span>
          )
        },
        {
          title: `Adjusted Volume (${myUser.rank.settings.qv_limit?asNumber(myUser.rank.settings.qv_limit):0} BV Max)`,
          align: 'center',
          render: (_, record) => (
            <span>              
              {myUser.rank.settings.qv_limit?
                asNumber(Math.min(
                  record.qualification.gv, 
                  myUser.rank.settings.qv_limit
                ))
              : 0}
            </span>
          )
        },
        {
          title: `Next Rank(${myUser.next_rank.name}) Adjusted Volume (${myUser.next_rank.settings.qv_limit?asNumber(myUser.next_rank.settings.qv_limit):0} BV Max)`,
          align: 'center',
          render: (_, record) => (
            <span>              
              {myUser.next_rank.settings.qv_limit?
                asNumber(Math.min(
                  record.qualification.gv, 
                  myUser.next_rank.settings.qv_limit
                ))
              : 0}
            </span>
          )
        }
      ]}
    />
  )
}
