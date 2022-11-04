import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useSelector } from "react-redux"
import { 
  TablePanel, RankBadge, UserAvatar, CountryFlag
} from 'components/common'
import { callGetApiWithAuth } from 'utils/api'
import { asDate } from 'utils/text'
import { varIs, varKey, varLabel } from 'common/var'
import UplineBar from './UplineBar'
import { BsChatDots } from 'react-icons/bs'
import { LoadingOutlined } from '@ant-design/icons'

export default function ListTable(props) {
  const history = useHistory()
  const myUser = useSelector((state) => state.auth.user)
  const [tableData, setTableData] = useState([])
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [uplines, setUplines] = useState([])
  const [isLoadingDownliner, setIsLoadingDownliner] = useState(false)
  const [clickedUser, setClickedUser] = useState([])

  const onGetTableData = (res) => {
    setTableData(res.data.childrenData.data)
    setPaginationParam({
      ...paginationParam,
      currentPage: res.data.childrenData.current_page,
      total: res.data.childrenData.total,
    })
    setUplines(res.data.uplines)
    setIsLoading(false)
  }
  const onFailTableData = () => {
    setIsLoading(false)
  }
  const loadTableData = (paginationParam0) => {
    setIsLoading(true)
    const params = {
      user_id: props.selectedId,
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`my_team/unilevel_list/table?${q}`, onGetTableData, onFailTableData)
  }
  const onPageChange = (page) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: page
    }
    loadTableData(paginationParam0)
  }

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

  const onClickChat = (user) => {
    setClickedUser(user);
    setIsLoadingDownliner(true);
    callGetApiWithAuth(`common/search_enroll_downline_affiliate/${user.username}`, onSuccessGetDownliner, () => {
      setIsLoadingDownliner(false)
    });
  }

  useEffect(() => {
    if (myUser) {
      const paginationParam0 = {
        ...paginationParam,
        currentPage: 1,
      }
      setPaginationParam(paginationParam0)
      loadTableData(paginationParam0)
    }
  }, [myUser, props.selectedId])

  return (
    <TablePanel
      title={`Enroller List`}
      data={tableData}
      loading={isLoading}
      paginationParam={paginationParam}
      onPageChange={onPageChange}
      toolbar={
        <UplineBar uplines={uplines} goUser={props.goUser} />
      }
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
              {record.has_children?
                <a href="javascript:void(0)"
                  onClick={() => props.goUser(record)}
                >
                  {record.username}
                </a>
              :
                <span>{record.username}</span>
              }
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
                {(isLoadingDownliner && record.id*1 === clickedUser.id*1) ?
                  <LoadingOutlined />
                  :
                  <BsChatDots onClick={() => onClickChat(record)} />
                }
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
              {record.subscription_count}
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
          title: 'Enroller Tree BV',
          key: 'gv',
          render: (_, record) => (
            <span>{record.qualification.gv}</span>
          )
        }
      ]}
    />
  )
}
