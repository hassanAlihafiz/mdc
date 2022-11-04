import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { 
  TablePanel, UserAvatar, CountryFlag, RankBadge,
  Select, Input, Button 
} from 'components/common'
import {
  callGetApiWithAuth
} from 'utils/api'
import { asDate } from 'utils/text'
import { varIs, varKey } from 'common/var'
import { BsChatDots } from 'react-icons/bs'
import { LoadingOutlined } from '@ant-design/icons'

export default function TableView(props) {
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1, perPage: 15, total: 0
  })
  const [searchParam, setSearchParam] = useState({
    search_type: 'affiliate',
    uuid: '', rank_id: '', level: ''
  })
  const [columns, setColumns] = useState([])
  const [ranks, setRanks] = useState([])

  const onGetRanks = (res) => {
    setRanks(res.data)
  }
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
  const loadTableData = (paginationParam0, searchParam0) => {
    setIsLoading(true)
    const params = {
      ...searchParam0,
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`contact_manager/list?${q}`, 
      onGetTableData, onFailTableData
    )
  }

  const handleSearch = () => {
    if (searchParam.search_type === 'affiliate') {
      setColumns([
        {
          title: 'User ID',
          render: (_, record) => (
            <span>
              #{record.uuid}
            </span>
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
              <span className={'username'} 
                onClick={() => props.setSelectedUser(record)}
              >
                {record.username}
              </span>
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
              />
              {' '}
              <ChatIcon user={record} />
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
          title: 'Rank',
          key: 'rank_id',
          render: (_, record) => (
            <RankBadge 
              label={record.rank.name}
            />
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
          title: 'Subscription',
          key: 'subscription',
          render: (_, record) => record.subscription_count*1 > 0 ? <span className='subscription-yes'>Yes</span> : <span className='subscription-no'>No</span>
        },
      ])
    } else if (searchParam.search_type === 'preferred') {
      setColumns([
        {
          title: 'User ID',
          render: (_, record) => (
            <span>
              #{record.uuid}
            </span>
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
              <span className={'username'} 
                onClick={() => props.setSelectedUser(record)}
              >
                {record.username}
              </span>
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
              />
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
          title: 'PV',
          key: 'pv',
          render: (_, record) => (
            <span>{record.qualification.pv}</span>
          )
        },
        {
          title: 'Subscription',
          key: 'subscription',
          render: (_, record) => record.subscription_count*1 > 0 ? <span className='subscription-yes'>Yes</span> : <span className='subscription-no'>No</span>
        },
      ])
    } else if (searchParam.search_type === 'prospect') {
      setColumns([
        {
          title: 'Name',
          render: (_, record) => (
            <span className={'username'} 
              onClick={() => props.setSelectedUser(record)}
            >
              {`${record.first_name} ${record.last_name}`}
            </span>
          )
        },
        {
          title: 'Email',
          render: (_, record) => (
            <span>
              {`${record.email}`}
            </span>
          )
        },
        {
          title: 'Phone Number',
          render: (_, record) => (
            <span>
              {`${record.phone}`}
            </span>
          )
        },
        {
          title: 'Date Joined',
          render: (_, record) => (
            <span>{asDate(record.created_at)}</span>
          )
        }
      ])
    }
    setTableData([])
    const paginationParam0 = {
      ...paginationParam,
      currentPage: 1,
    }
    loadTableData(paginationParam0, searchParam)
  }
  const onPageChange = (page) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: page,
    }
    loadTableData(paginationParam0, searchParam)
  }

  const onFormInput = (field, value) => {
    setSearchParam({
      ...searchParam,
      [field]: value
    })
  }

  useEffect(() => {
    if (props.shouldLoad) {
      handleSearch()
    }
  }, [props.shouldLoad])

  useEffect(() => {
    callGetApiWithAuth(`common/ranks`, onGetRanks)
  }, [])

  return (
    <TablePanel
      title={'Contact Manager'}
      data={tableData}
      paginationParam={paginationParam}
      loading={isLoading}
      columns={columns}
      onPageChange={onPageChange}
      toolbar={
        <div className='d-flex align-items-center'>
          <div style={{width: 100}}>
            <Select 
              value={searchParam.search_type}
              onChange={v=>onFormInput('search_type', v)}
              options={[
                { label: 'Affiliate', value: 'affiliate' },
                { label: 'Customer', value: 'preferred' },
                { label: 'Prospect', value: 'prospect' },
              ]}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{width: 8}} />
          <div style={{width: 190}}>
            <Input value={searchParam.uuid}
              onChange={e=>onFormInput('uuid', e.target.value)}
              placeholder={'Search by User ID, Name, Email'}
            />
          </div>
          <div style={{width: 8}} />
          <div style={{width: 150}}>
            <Select value={searchParam.rank_id}
              onChange={v=>onFormInput('rank_id', v)}
              options={[
                { label: 'Select Rank', value: '' },
                ...ranks.map(el => ({
                label: el.name, value: el.id
                }))
              ]}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{width: 8}} />
          <div style={{width: 80}}>
            <Input type={'number'}
              value={searchParam.level}
              onChange={e=>onFormInput('level', e.target.value)}
              placeholder={'Level'}
            />
          </div>
          <div style={{width: 8}} />
          <Button onClick={handleSearch}>
            Search
          </Button>
        </div>
      }
    />
  )
}

const ChatIcon = ({ user }) => {
  const history = useHistory()
  const [isLoadingDownliner, setIsLoadingDownliner] = useState(false)

  const onSuccessGetDownliner = ({ data }) => {
    setIsLoadingDownliner(false)
    if (data && data.length > 0) {
      history.push({
        pathname: '/team_chat',
        state: {
          user: data, 
        },
      });
    }
  }

  const onClickChat = () => {
    setIsLoadingDownliner(true);
    callGetApiWithAuth(`common/search_enroll_downline_affiliate/${user.username}`, onSuccessGetDownliner, () => {
      setIsLoadingDownliner(false)
    });
  }

  return (
    <span className='chat-icon'>
      {(isLoadingDownliner) ?
        <LoadingOutlined />
        :
        <BsChatDots onClick={() => onClickChat(user)} />
      }
    </span>
  )
}