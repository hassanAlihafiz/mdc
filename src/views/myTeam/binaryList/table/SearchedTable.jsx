import React, { useEffect, useState } from 'react'
import { 
  TablePanel, RankBadge, UserAvatar, CountryFlag
} from 'components/common'
import { callGetApiWithAuth } from 'utils/api'
import { asDate } from 'utils/text'
import { varIs, varKey, varLabel } from 'common/var'
import { BsChatDots } from 'react-icons/bs'

export default function ListTable(props) {
  const [tableData, setTableData] = useState([])
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const onGetTableData = (res) => {
    setTableData(res.data.data)
    setPaginationParam({
      ...paginationParam,
      currentPage: res.data.current_page,
      total: res.data.total,
    })
    setIsLoading(false)
  }
  const onFailTableData = () => {
    setIsLoading(false)
  }
  const loadTableData = (paginationParam0) => {
    setIsLoading(true)
    const params = {
      ...props.searchParam,
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`my_team/binary_list/search?${q}`, onGetTableData, onFailTableData)
  }
  const onPageChange = (page) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: page
    }
    loadTableData(paginationParam0)
  }

  const onClickChat = (record) => {

  }

  useEffect(() => {
    loadTableData(paginationParam)
  }, [props.searchParam])

  return (
    <TablePanel
      title={`Searched Results`}
      data={tableData}
      loading={isLoading}
      paginationParam={paginationParam}
      onPageChange={onPageChange}
      columns={[
        {
          title: 'ID',
          key: 'uuid',
          render: (_, record) => (
            <span>#{record.uuid}</span>
          )
        },
        {
          title: 'Level',
          key: 'level',
          render: (_, record) => (
            <span>{record.level}</span>
          )
        },
        {
          title: 'Username',
          key: 'username',
          render: (_, record) => (
            <div className='d-flex align-items-center'>
              <a href="javascript:void(0)"
                onClick={() => props.goUser(record)}
              >
                {record.username}
              </a>              
            </div>
          )
        },
        {
          title: 'Name',
          key: 'name',
          render: (_, record) => (
            <div className='d-flex align-items-center'>
              <UserAvatar 
                image={record.image}
                title={`${record.first_name} ${record.last_name}`}
                status={varKey('user.status', record.status)}
                type={varKey('user.type', record.type)}
                typeLabel={varLabel('user.type', record.type)}
                joinDate={asDate(record.created_at)}
              />
              {varIs('user.type', record.type, 'affiliate') && 
              <span className='chat-icon'>
                <BsChatDots onClick={() => onClickChat(record)} />
              </span>
              }
            </div>
          )
        },
        {
          title: 'Country',
          key: 'country',
          render: (_, record) => (
            <CountryFlag country={record.country} />
          )
        },
        {
          title: 'Sponsor',
          key: 'parent',
          render: (_, record) => (
            <span>
              {record.parent.username}
            </span>
          )
        },
        {
          title: 'Leg',
          key: 'leg_position',
          render: (_, record) => (
            <span>{varLabel('user.legPosition', record.leg_position)}</span>
          )
        },        
        {
          title: 'Rank',
          key: 'rank_id',
          render: (_, record) => (
            <span>
            {varIs('user.type', record.type, 'affiliate')?
              <RankBadge 
                label={record.rank.name}
              />
            : ''}
            </span>
          )
        },
        {
          title: 'Affiliates',
          key: 'affiliates',
          render: (_, record) => (
            <span>{record.qualification.pea}</span>
          )
        },
        {
          title: 'Customers',
          key: 'customers',
          render: (_, record) => (
            <span>{record.qualification.pep}</span>
          )
        },
        {
          title: 'Subscription',
          key: 'subscription',
          render: (_, record) => (
            <span>
              {record.subscription_count*1 > 0 ? 
                <span className='subscription-yes'>Yes</span>
              : <span className='subscription-no'>No</span>}
            </span>
          )
        },
        {
          title: 'PV',
          key: 'pv',
          render: (_, record) => (
            <span>{record.qualification.pv}</span>
          )
        },
        {
          title: 'Left/Right Binary BV',
          key: 'l_bgv',
          render: (_, record) => (
            <span>
              {record.qualification.l_bgv}
              &nbsp;{'/'}&nbsp;
              {record.qualification.r_bgv}
            </span>
          )
        }
      ]}
    />    
  )
}
