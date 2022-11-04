import React, { useState } from "react";
import { Table, Spin } from "components/common";
import NotificationDetailModal from "layouts/authed/topHeader/notifications/NotificationDetailModal";
import TableHead from "./TableHead";
import { asDateTime } from "utils/text";
import styled from "styled-components";

export default function TableView({
  isLoading,
  tableData,
  paginationParam,
  handlePageChange,
  handleChangeStatus,
  setSelectedNotifications,
  notificationReadStatus,
  isMarkAsRead,
  isMarkAsUnread
}) {
  const [notificationData, setNotificationData] = useState(undefined);

  const handleClickNotification = (data) => {
    setNotificationData(data)
  };

  const handleCloseNotificationDetailModal = () => {
    setNotificationData(undefined)
  };

  const columns = [
    {
      title: "Subject",
      dataIndex: "title",
      render: (text, record) => <span className="title" onClick={() => handleClickNotification(record)}>{text}</span>
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => <span className="description" dangerouslySetInnerHTML={{ __html: text.length > 60 ? `${text.substring(0, 60)}...` : text }} />
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (text) => asDateTime(text)
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedNotifications(selectedRows.map((el) => el.id))
    },
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {},
  };

  return (
    <Wrapper>
      <TableHead
        handleChangeStatus={handleChangeStatus}
        isMarkAsRead={isMarkAsRead}
        isMarkAsUnread={isMarkAsUnread}
      />
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={tableData}
          rowSelection={{ ...rowSelection }}
          loading={{
            spinning: isLoading,
            indicator: <Spin spinning={true} className={`spinner`} />,
          }}
          pagination={{
            total: paginationParam.total,
            current: paginationParam.currentPage,
            showSizeChanger: false,
            perPage: paginationParam.perPage,
            onChange: handlePageChange,
          }}
          rowClassName={(record) => notificationReadStatus.indexOf(`,${record.id},`) < 0 ? "unread-notification" : ""}
        />
      </div>
      {notificationData &&
        <NotificationDetailModal
          notificationData={notificationData}
          handleCloseNotificationDetailModal={handleCloseNotificationDetailModal}
        />
      }
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(44, 39, 56, 0.06);
  padding: 20px 20px 5px 20px;
  .user-name {
    img {
      width: 28px;
      height: 28px;
      margin-right: 7px;
    }
  }
  .table-container {
    .title {
      cursor: pointer;
    }
  }
  .ant-spin-nested-loading > div > .ant-spin .spinner {
    top: 0;
  }
  .description {
    p {
      margin-bottom: 0;
    }
  }
  @media (max-width: 1200px) {
    .table-container {
      .ant-table {
        overflow-x: scroll;
        .ant-table-container {
          width: 1000px;
        }
      }
    }
  }
`;
