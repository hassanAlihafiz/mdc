import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Row, Col } from "components/common";
import TableView from "./table/TableView";
import { Wrapper } from "./NotificationsPage.styled";
import { callGetApiWithAuth, callPostApiWithAuth } from "utils/api";
import { ErrorNotification } from "components/common";

export default function IndexPage() {
  const dispatch = useDispatch();
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 20,
    total: 0,
  });
  const [searchParam, setSearchParam] = useState({
    from: '',
    to: '',
    read_status: '',
  });
  const [tableData, setTableData] = useState([]);
  const [notificationReadStatus, setNotificationReadStatus] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkAsRead, setIsMarkAsRead] = useState(false);
  const [isMarkAsUnread, setIsMarkAsUnread] = useState(false);

  const onGetTableData = ({ data }) => {
    setTableData(data.data.map((el) => ({
      key: el.id,
      id: el.id,
      title: el.title,
      description: el.description,
      created_at: el.created_at
    })));

    let unreadNotifications = [];
    data.data.map((el) => {
      if (data.read_ids.indexOf(`,${el.id},`) < 0) {
        unreadNotifications = [
          ...unreadNotifications,
          {
            id: el.id,
            title: el.title,
            description: el.description,
            created_at: el.created_at,
          },
        ]
      }
    });
    dispatch({ 
      type: 'notification.SET_UNREAD_NOTIFICATIONS', 
      payload: { 
        unreadNotifications: unreadNotifications
      }
    });

    setNotificationReadStatus(data.read_ids);
    setPaginationParam({
      ...paginationParam,
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailTableData = () => {
    setIsLoading(false);
  };
    
  const loadTableData = (searchParam_, paginationParam_) => {
    setIsLoading(true);

    let params = [];
    
    params['from'] = searchParam_["from"];
    params['to'] = searchParam_["to"];
    params['read_status'] = searchParam_["read_status"];
    params['page'] = paginationParam_['currentPage'];
    params['per_page'] = paginationParam_['perPage'];
    let query = Object.keys(params).map(k=>k+'='+params[k]).join('&');

    callGetApiWithAuth('notification/list?'+query, onGetTableData, onFailTableData);
  };

  const handlePageChange = (_, page) => {
    let paginationParam_ = { 
      ...paginationParam, 
      currentPage: page 
    }
    setPaginationParam(paginationParam_);
    loadTableData(searchParam, paginationParam_);
  };

  const onSuccessChangeStatus = () => {
    setIsMarkAsUnread(false);
    setIsMarkAsRead(false);
    setSelectedNotifications([]);
    loadTableData(searchParam, paginationParam);
  };
  
  const onFaileChangeStatus = () => {
    setIsMarkAsUnread(false);
    setIsMarkAsRead(false);
  };

  const handleChangeStatus = (status) => {
    if (selectedNotifications.length === 0) {
      ErrorNotification("Please select notification");
      return;
    }
    let data = {
      notification_ids: selectedNotifications.toString(),
      read_status: status,
    }
    if (status === 1) { 
      setIsMarkAsRead(true);
    } else {
      setIsMarkAsUnread(true);
    }
    callPostApiWithAuth('notification/change_status', data, onSuccessChangeStatus, onFaileChangeStatus);
  };

  useEffect(() => {
    loadTableData(searchParam, paginationParam);
  }, []);

  return (
    <Wrapper>
      <div className="main-container">
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <TableView
              isLoading={isLoading}
              tableData={tableData}
              paginationParam={paginationParam}
              setSelectedNotifications={setSelectedNotifications}
              handlePageChange={handlePageChange}
              handleChangeStatus={handleChangeStatus}
              notificationReadStatus={notificationReadStatus}
              isMarkAsRead={isMarkAsRead}
              isMarkAsUnread={isMarkAsUnread}
            />
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
}
