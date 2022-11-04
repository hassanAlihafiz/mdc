import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Row, Col,
} from 'components/common'
import {
  callGetApiWithAuth
} from 'utils/api'

export default function StatCard() {
  const [statData, setStatData] = useState({
    personal_affiliates: 0,
    personal_preferreds: 0,
    total_affiliates: 0,
    total_preferreds: 0
  })

  const onGetStatData = (res) => {
    setStatData(res.data)
  }
  const getStat = () => {
    callGetApiWithAuth(`my_team/unilevel_list/stat`, onGetStatData)
  }

  useEffect(() => {
    getStat()    
  }, [])

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} xl={6}>
          <div className={'statRoot'}>
            <p className={'title'}>
              {'Personally Enrolled Affiliates'}
            </p>
            <p className={'value'}>
              {statData.personal_affiliates}
            </p>
          </div>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <div className={'statRoot'}>
            <p className={'title'}>
              {'Personally Enrolled Customers'}
            </p>
            <p className={'value'}>
              {statData.personal_preferreds}
            </p>
          </div>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <div className={'statRoot'}>
            <p className={'title'}>
              {'Total Affiliates'}
            </p>
            <p className={'value'}>
              {statData.total_affiliates}
            </p>
          </div>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <div className={'statRoot'}>
            <p className={'title'}>
              {'Total Customers'}
            </p>
            <p className={'value'}>
              {statData.total_preferreds}
            </p>
          </div>
        </Col>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .statRoot {
    background: white;
    border-left: 4px solid #00b4ee;
    padding: 20px 15px;
    box-shadow: 0px 4px 20px rgba(44, 39, 56, 0.06);
    .title {
      font-weight: normal;
      font-size: 14px;
      color: #7f8fa3;
      margin-bottom: 0;
    }
    .value {
      font-weight: 600;
      font-size: 18px;
      color: #384971;
      margin-bottom: 0;
    }
  }
`
