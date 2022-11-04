
import React from 'react'
import styled from 'styled-components'
import { Table, Pagination, Spin, Card } from 'components/common'

export default function TablePanel(props) {
  let startIndex = props.paginationParam
    ? props.paginationParam.currentPage
      ? (props.paginationParam.currentPage - 1) * props.paginationParam.perPage + 1
      : 0
    : 1;
  let endIndex = props.paginationParam
    ? props.paginationParam.currentPage
      ? props.paginationParam.currentPage * props.paginationParam.perPage
      : 0
    : props.data.length;
  let total = props.paginationParam ? props.paginationParam.total : props.data.length;
  if (endIndex > total) {
    endIndex = total;
  }

  return (
    <Card>
      <Wrapper className={'panelRoot'}>
        <div className={`panelHead`}>
          <h4>
            {props.headerTabs ? props.headerTabs : props.title}
          </h4>
          <div className='toolbar'>
            {props.toolbar || ''}
          </div>
        </div>
        <div className={`tableWrapper`}>
          <Table
            columns={props.columns}
            dataSource={props.data}
            pagination={false}
            style={props.style}
            loading={{
              spinning: props.loading || false,
              indicator: <Spin spinning={true} className={`spinner`} />,
            }}
          />
        </div>
        {props.paginationParam ? (
          <div className={`tablePagination`}>
            <div className={`pagContainer`}>
              {props.data && props.data.length > 0 && (
                <span>
                  Showing Results {startIndex}-{endIndex} of {total}
                </span>
              )}
            </div>
            <div className={`paginationContainer`}>
              <Pagination
                current={props.paginationParam.currentPage}
                pageSize={props.paginationParam.perPage}
                total={props.paginationParam.total}
                showSizeChanger={false}
                showQuickJumper={false}
                onChange={props.onPageChange}
                hideOnSinglePage={true}
              />
            </div>
          </div>
        ) : props.data && props.data.length > 0 ? (
          <div className={`tablePagination`}>
            {props.data && props.data.length > 0 && (
              <span>
                Showing Results {startIndex}-{endIndex} of {total}
              </span>
            )}
          </div>
        ) : (
          ''
        )}
      </Wrapper>      
    </Card>
  );
}
const Wrapper = styled.div`
  margin-bottom: -20px;
  .panelHead {
    padding-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      font-size: 18px;
      color: ${props=>props.theme.palette.text};
    }
  }
  .tableWrapper {
    width: calc(100% + 40px);
    margin-left: -20px;
    margin-right: -20px;
    .ant-table-container {
      overflow-x: auto;
    }
    th {
      color: ${props=>props.theme.palette.secondaryText};
    }
    .ant-table-thead > tr > th, .ant-table tfoot > tr > th {
      padding: 8px;
    }
    .ant-table-tbody > tr > td, .ant-table tfoot > tr > td {
      padding: 16px 8px;
    }
    .ant-table-thead > tr > th:first-child, .ant-table-tbody > tr > td:first-child, .ant-table tfoot > tr > th:first-child, .ant-table tfoot > tr > td:first-child {
      padding-left: 20px;
    }
    .ant-table-thead > tr > th:last-child, .ant-table-tbody > tr > td:last-child, .ant-table tfoot > tr > th:last-child, .ant-table tfoot > tr > td:last-child {
      padding-right: 20px;
    }
    .ant-table-tbody > tr.ant-table-row:hover > td {
      background: #fafafa;
    }
  }  
  .tablePagination {
    padding-top: 12px;
    padding-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .paginationContainer {
    .ant-pagination-item {
      margin-right: 0px !important;
      border: none !important;    
    }
    .ant-pagination-prev {
      margin-right: 0px !important;
    }
    .ant-pagination-item-active {
      a {
        color: ${props=>props.theme.palette.link} !important;
      }
    }
    .ant-pagination-item-link {
      border: none !important;
    }  
    li {
      margin-right: 0px !important;
      border: none !important;
    }
    button {
      margin: 0px !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
