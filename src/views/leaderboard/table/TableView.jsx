import React, { useEffect, useState } from "react";
import moment from 'moment'
import styled from "styled-components";
import { 
  Card, Table, Select, Spin,
  MonthPicker,
  UserAvatar, CountryFlag, 
} from "components/common";
import {
  callGetApiWithAuth
} from 'utils/api'

export default function TableView() {
  const [tableData, setTableData] = useState([])
  const [searchParam, setSearchParam] = useState({
    search_type: '',
    from: moment().startOf('month').format('YYYY-MM-DD'),
    to: moment().endOf('month').format('YYYY-MM-DD'),
  })
  const [isLoading, setIsLoading] = useState(false)

  const onGetTableData = (res) => {
    setTableData(res.data)
    setIsLoading(false)
  }
  const onFailTableData = () => {
    setIsLoading(false)
  }
  const loadTableData = (searchParam0) => {
    setIsLoading(true)
    const params = {
      ...searchParam0
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`leaderboard/list?${q}`, onGetTableData, onFailTableData)
  }

  const onChangeType = (v) => {
    const searchParam0 = {
      ...searchParam,
      search_type: v
    }
    setSearchParam(searchParam0)
    loadTableData(searchParam0)
  }
  const onChangeDate = (v) => {
    let searchParam0 = { 
      ...searchParam,
      from: moment().startOf('month').format('YYYY-MM-DD'),
      to: moment().endOf('month').format('YYYY-MM-DD'),
    }
    if (v) {
      searchParam0 = { 
        ...searchParam,
        from: moment(v).startOf('month').format('YYYY-MM-DD'),
        to: moment(v).endOf('month').format('YYYY-MM-DD'),
      }
    }
    setSearchParam(searchParam0)
    loadTableData(searchParam0)
  }

  useEffect(() => {
    loadTableData(searchParam)
  }, [])

  return (
    <Wrapper>
      <div className="top-header">
        <div className="date-picker">
          <Select
            value={searchParam.search_type}
            onChange={v => onChangeType(v)}
            options={[
              {
                label: "Company",
                value: '',
              },
              {
                label: "My Team",
                value: 'my_team',
              },
            ]}
          />
        </div>
      </div>
      <Card>
        <div className='header d-flex justify-content-between'>
          <div className="title">Leaderboard</div>
          <div className="date-picker">
            <MonthPicker
              date={searchParam.from}
              onChange={v => onChangeDate(v)}              
            />
          </div>
        </div>
        <div className="table-container">
          <Table
            dataSource={tableData}
            loading={{
              spinning: isLoading,
              indicator: <Spin spinning={true} className={`spinner`} />
            }}
            pagination={false}
            columns={[
              {
                title: "#",
                key: "s_no",
                render: (_, __, index) => (
                  <span>{index+1}</span>
                )
              },
              {
                title: "Name",
                key: "name",
                render: (_, record) => (
                  <UserAvatar 
                    image={record.user.image}
                    title={`${record.user.first_name} ${record.user.last_name}`}
                  />
                ),
              },
              {
                title: "Country",
                key: "county",
                render: (_, record) => (
                  <div>
                    <CountryFlag
                      country={record.user.country}
                    />
                  </div>
                ),
              },
              {
                title: "New Enrollments",
                key: "pe",
                render: (_, record) => (
                  <span>{record.pe}</span>
                )
              },
              {
                title: "New Bussiness Volume",
                key: 'pev',
                render: (_, record) => (
                  <span>{record.pev}</span>
                )              
              },
            ]}
          />
        </div>
      </Card>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  .top-header {
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-end;
    .date-picker {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .ant-select {
        width: 150px;
        margin-left: 20px;
      }
    }
  }
  .header {
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-end;
    .title {
      font-weight: 500;
      font-size: 18px;
    }
    .date-picker {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .ant-select {
        width: 150px;
        margin-left: 20px;
      }
    }
  }
  @media (max-width: 576px) {
    .date-picker {
      flex-direction: column;
      width: 100%;
      div {
        width: 100%;
      }
      .ant-select {
        width: 100% !important;
        margin-left: 0px !important;
        margin-bottom: 10px;
      }
    }
  }
  .user-name {
    img {
      width: 28px;
      height: 28px;
      margin-right: 7px;
    }
  }
  @media (max-width: 1024px) {
    .table-container {      
      .ant-table {
        overflow-x: scroll;
        .ant-table-container {
          width: 800px;
        }
      }
    }
  }
`;
