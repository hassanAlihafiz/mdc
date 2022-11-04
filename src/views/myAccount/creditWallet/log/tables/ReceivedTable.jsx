import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TablePanel, UserAvatar } from "components/common";
import { callGetApiWithAuth } from 'utils/api'
import { asUsdPrice, asDateTime } from 'utils/text'

export default function ReceivedTable() {
  const [tableData, setTableData] = useState([])
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1, perPage: 15, total: 0
  })
  const [isLoading, setIsLoading] = useState(false)

  const onGetTableData = (res) => { 
    setIsLoading(false)
    setTableData(res.data.data)
    setPaginationParam({
      ...paginationParam,
      currentPage: res.data.current_page,
      total: res.data.total,
    })
  }
  const onFailTableData = () => {
    setIsLoading(false)
  }
  const loadTableData = (paginationParam0) => {
    const params = {
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    setIsLoading(true)
    callGetApiWithAuth(`my_account/wallet/received_histories?${q}`, 
      onGetTableData, onFailTableData
    )
  }

  const onPageChange = (page) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: page
    }
    loadTableData(paginationParam0)
  }

  useEffect(() => {
    loadTableData(paginationParam)
  }, [])

  return (
    <Wrapper>
      <TablePanel
        data={tableData}
        pagination={paginationParam}
        onPageChange={onPageChange}
        loading={isLoading}
        columns={[
          {
            title: 'Received At',
            key: 'created_at',
            render: (_, record) => (
              <span>{asDateTime(record.created_at)}</span>
            )
          },
          {
            title: 'Description',
            key: 'description',
            render: (_, record) => (
              <span>{record.description}</span>
            )
          },
          {
            title: "Sender",
            dataIndex: "name",
            render: (_, record) => (
              <UserAvatar 
                image={record.sender.image}
                title={`${record.sender.first_name} ${record.sender.last_name}`}
              />
            ),
          },
          {
            title: 'Amount',
            key: 'amount',
            render: (_, record) => (
              <span>{asUsdPrice(record.amount)}</span>              
            )
          }
        ]}
      />
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  .cardRoot {
    box-shadow: none;
    padding: 0;
  }
  .panelHead {
    paddding: 0;
  }
`;
