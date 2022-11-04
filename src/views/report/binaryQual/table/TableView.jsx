import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { 
  TablePanel, Input, Button, 
  UserAvatar, Tooltip, RankBadge
} from 'components/common'
import { callGetApiWithAuth } from 'utils/api'
import { asNumber } from 'utils/text'
import InfoIcon from 'assets/icons/info.svg'

export default function TableView() {
  const [tableData, setTableData] = useState([])
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0
  })
  const [searchParam, setSearchParam] = useState({
    uuid: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const onFormInput = (field, value) => {
    setSearchParam({
      ...searchParam,
      [field]: value
    })
  }

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
  const loadTableData = (paginationParam0, searchParam0) => {
    setIsLoading(true)
    const params = {
      ...searchParam0,
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`report/binary_qual/list?${q}`, 
      onGetTableData, onFailTableData
    )
  }

  const onPageChange = (page) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: page
    }
    loadTableData(paginationParam0, searchParam)
  }

  const handleSearch = () => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: 1
    }
    loadTableData(paginationParam0, searchParam)
  }

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <Wrapper>
      <TablePanel
        title={'Binary Qualification'}
        data={tableData}
        loading={isLoading}
        paginationParam={paginationParam}
        onPageChange={onPageChange}
        toolbar={
          <div className='d-flex align-items-center'>
            <Input value={searchParam.uuid}
              onChange={e=>onFormInput('uuid', e.target.value)}
              placeholder={'Search by User ID'}
            />
            <span style={{width: 12}} />
            <Button loading={isLoading}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        }
        columns={[
          {
            title: 'User ID',
            key: 'uuid', 
            render: (_, record) => (
              <span>{record.user.uuid}</span>
            )
          },
          {
            title: 'Name',
            key: 'user',
            render: (_, record) => (
              <UserAvatar 
                image={record.user.image}
                title={`${record.user.first_name} ${record.user.last_name}`}
              />
            )
          },
          {
            title: 'Level',
            align: 'center',
            key: 'level',
            render: (_, record) => (
              <span>
                {record.level}
              </span>
            )
          },
          {
            title: 'Rank',
            align: 'center',
            key: 'rank_id',
            render: (_, record) => (
              <RankBadge label={record.user.rank.name} />
            )
          },
          {
            title: () => (
              <span>
                Is Qualified?
                <Tooltip title={() => (
                  <div>
                    To be Binary Qualified, you must have a minimum of 40 Personal Volume (PV), 90 Business Volume (BV) from personally enrolled Affiliates/Preferred Customers on each your left and right leg, and a minimum of 300 Business Volume (BV) on your lesser leg.
                  </div>
                )}>
                  <img src={InfoIcon} className='info-icon' />
                </Tooltip>
              </span>
            ),
            align: 'center',
            key: 'is_qualified',
            render: (_, record) => {
              const isQualified = (
                record.user.rank_id>=2 && 
                (record.user.qualification.pv>=40 || 
                record.user.qualification.pecv>=40 ) && 
                record.user.qualification.l_bpev>=90 && 
                record.user.qualification.r_bpev>=90 && 
                record.user.qualification.l_bgv+
                  record.user.qualififcation.l_carry>=300 && 
                record.user.qualification.r_bgv+
                  record.user.qualififcation.r_carry>=300
              )

              return (
                <span className={`qual-badge ${isQualified?'active':'inactive'}`}>
                  {isQualified?'Yes':'No'}
                </span>
              )
            }
          },
          {
            title: () => (
              <span>
                PV
                <Tooltip title={() => (
                  <div>
                    Personal Volume
                  </div>
                )}>
                  <img src={InfoIcon} className='info-icon' />
                </Tooltip>
              </span>
            ),
            key: 'pv',
            render: (_, record) => (
              <span>
                {asNumber(record.user.qualification.pv)}
              </span>
            )
          },
          {
            title: () => (
              <span>
                PECV
                <Tooltip title={() => (
                  <div>
                    Personal Enrolled Customer Volume
                  </div>
                )}>
                  <img src={InfoIcon} className='info-icon' />
                </Tooltip>
              </span>
            ),
            key: 'pecv',
            render: (_, record) => (
              <span>
                {asNumber(record.user.qualification.pecv)}
              </span>
            )
          },
          {
            title: () => (
              <span>
                L-BPEV
                <Tooltip title={() => (
                  <div>
                    Left Leg Personal Enrolled Volume
                  </div>
                )}>
                  <img src={InfoIcon} className='info-icon' />
                </Tooltip>
              </span>
            ),
            key: 'l_bpev',
            render: (_, record) => (
              <span>
                {asNumber(record.user.qualification.l_bpev)}
              </span>
            )
          },
          {
            title: () => (
              <span>
                R-BPEV
                <Tooltip title={() => (
                  <div>
                    Right Leg Personal Enrolled Volume
                  </div>
                )}>
                  <img src={InfoIcon} className='info-icon' />
                </Tooltip>
              </span>
            ),
            key: 'r_bpev',
            render: (_, record) => (
              <span>
                {asNumber(record.user.qualification.r_bpev)}
              </span>
            )
          },
          {
            title: () => (
              <span>
                L-BGV
                <Tooltip title={() => (
                  <div>
                    Left Leg Group Volume
                  </div>
                )}>
                  <img src={InfoIcon} className='info-icon' />
                </Tooltip>
              </span>
            ),
            key: 'l_bgv',
            render: (_, record) => (
              <span>
                {asNumber(record.user.qualification.l_bgv)}
              </span>
            )
          },
          {
            title: () => (
              <span>
                R-BGV
                <Tooltip title={() => (
                  <div>
                    Right Leg Group Volume
                  </div>
                )}>
                  <img src={InfoIcon} className='info-icon' />
                </Tooltip>
              </span>
            ),
            key: 'r_bgv',
            render: (_, record) => (
              <span>
                {asNumber(record.user.qualification.r_bgv)}
              </span>
            )
          },
          {
            title: () => (
              <span>
                L-Carry
                <Tooltip title={() => (
                  <div>
                    Left Leg Carry Over
                  </div>
                )}>
                  <img src={InfoIcon} className='info-icon' />
                </Tooltip>
              </span>
            ),
            key: 'l_carry',
            render: (_, record) => (
              <span>
                {asNumber(record.user.qualification.l_carry)}
              </span>
            )
          },
          {
            title: () => (
              <span>
                R-Carry
                <Tooltip title={() => (
                  <div>
                    Right Leg Carry Over
                  </div>
                )}>
                  <img src={InfoIcon} className='info-icon' />
                </Tooltip>
              </span>
            ),
            key: 'r_carry',
            render: (_, record) => (
              <span>
                {asNumber(record.user.qualification.r_carry)}
              </span>
            )
          },
        ]}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .qual-badge {
    width: 80px;
    padding: 5px 10px;
    display: inline-block;
    font-size: 10px;
    background: lightgrey;
    color: white;
    text-transform: uppercase;
    border-radius: 4px;
    &.active {
      background: ${props=>props.theme.palette.success};
    }
  }
  .info-icon {
    width: 12px;
    height: 12px;
    margin-bottom: 2px;
    margin-left: 4px;
    filter: grayscale(100%);
  }
`
