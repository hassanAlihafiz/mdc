import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TablePanel } from "components/common";
import { callGetApiWithAuth } from 'utils/api'
import { asUsdPrice, asDateTime } from 'utils/text'
import { varLabel } from "common/var";

export default function ConsumeTable() {
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
    callGetApiWithAuth(`my_account/wallet/consume_histories?${q}`, 
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
            title: 'Purchased At',
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
            title: 'Amount',
            key: 'amount',
            render: (_, record) => (
              <span>{asUsdPrice(record.amount)}</span>              
            )
          },
          {
            title: 'Type',
            key: 'type',
            render: (_, record) => (
              <span>{varLabel('creditPurchaseHistory.type', record.type)}</span>
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
