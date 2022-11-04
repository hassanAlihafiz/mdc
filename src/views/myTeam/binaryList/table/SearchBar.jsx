import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import {
  Row, Col, Select,
  Input, StartEndDatePicker, Button,  
} from 'components/common'
import { callGetApiWithAuth } from 'utils/api'
import SearchOutlinedIcon from '@ant-design/icons/SearchOutlined'

export default function SearchBar(props) {
  const [formData, setFormData] = useState({
    uuid: '',
    rank_id: '',
    created_at_range: '',
    createdFrom: '',
    createdUntil: '',
  })
  const [ranks, setRanks] = useState([])

  const onGetRanks = (res) => {
    setRanks(res.data)
  }

  const onFormInput = (field, value) => {
    const formData0 = {
      ...formData, [field]: value
    }
    setFormData(formData0)
  }

  const onFormDate = (v) => {
    let formData0 = {
      ...formData,
      createdFrom: '',
      createdUntil: '',
      created_at_range: ''
    }
    if (v) {
      formData0 = {
        ...formData,
        createdFrom: v[0],
        createdUntil: v[1],
        created_at_range: `${moment(v[0]).format('YYYY-MM-DD')}|${moment(v[1]).format('YYYY-MM-DD')}`
      }
    }
    setFormData(formData0)
  }

  useEffect(() => {
    callGetApiWithAuth(`common/ranks`, onGetRanks)
    
  }, [])

  useEffect(() => {
    setFormData({
      ...formData,
      ...props.searchParam,
    })
  }, [props.searchParam])

  return (
    <Wrapper>
      <Row gutter={[12, 6]}>
        <Col xs={24} sm={12} xl={6}>
          <Input 
            value={formData.uuid}
            onChange={e=>onFormInput('uuid', e.target.value)}
            placeholder={'Search by User ID, Username, Name'}
          />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <StartEndDatePicker 
            startDate={formData.createdFrom}
            endDate={formData.createdUntil}
            onChange={v=>onFormDate(v)}
          />
        </Col>
        <Col xs={24} sm={12} xl={5}>
          <Select  
            value={formData.rank_id}
            onChange={v=>onFormInput('rank_id', v)}
            options={[
              { label: 'Select Rank', value: '' },
              ...ranks.map(el => ({
                label: el.name,
                value: el.id
              }))
            ]}
          />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Button onClick={()=>props.handleSearch(formData)}>
            <SearchOutlinedIcon />
            Search
          </Button>
        </Col>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .ant-input {
    height: 40px;
  }
  .ant-picker {
    width: 100% !important;
    height: 40px !important;
  }
  .ant-btn {
    height: 40px;
    font-size: 16px;
    .anticon {
      margin-top: -3px;
    }
  }
  .ant-select {
    width: 100%;    
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 40px;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-item, .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    line-height: 40px;
  }
`
