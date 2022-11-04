import { Table as Table0 } from "antd";
import styled from "styled-components";

export const Table = styled(Table0)`
.ant-table-thead > tr > th {
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
`
