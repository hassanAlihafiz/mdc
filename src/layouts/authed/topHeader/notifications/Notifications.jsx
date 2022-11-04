import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from 'react-router-dom';
import { Dropdown, Menu } from "components/common";
import { callGetApiWithAuth } from 'utils/api';
import styled, { keyframes } from "styled-components";
import { Badge } from "antd";
import moment from "moment";
import NotificationIcon from "assets/icons/notification.svg";
import { ReactComponent as SmsIcon } from "assets/icons/sms.svg";
import NotificationDetailModal from "./NotificationDetailModal";

export default function Notification() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const unreadNotificationsRedux = useSelector(state => state.notification.unreadNotifications);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isStarteddAnimation, setIsStartedAnimation] = useState(true);
  const [notificationData, setNotificationData] = useState(undefined);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: '',
    perPage: '',
    total: '',
  });
  const [searchParam, setSearchParam] = useState({
    from: '',
    to: '',
    read_status: 2,
  });

  setTimeout(() => {
    setIsStartedAnimation(false);
  }, 5000);

  const handleClickNotification = (data) => {
    setNotificationData(data);
  };

  const handleCloseNotificationDetailModal = () => {
    setNotificationData(undefined);
  };

  const onGetTableData = ({ data }) => {
    dispatch({
      type: 'notification.SET_UNREAD_NOTIFICATIONS',
      payload: {
        unreadNotifications: data.data
      }
    });
  };

  const onFailTableData = () => {
    
  };
    
  const loadTableData = (searchParam_, paginationParam_) => {

    let params = []
    
    params['from'] = searchParam_["from"]
    params['to'] = searchParam_["to"]
    params['read_status'] = searchParam_["read_status"]
    params['page'] = paginationParam_['currentPage']
    params['per_page'] = paginationParam_['perPage']
    let query = Object.keys(params).map(k=>k+'='+params[k]).join('&')

    callGetApiWithAuth('notification/list?'+query, onGetTableData, onFailTableData)
  };

  useEffect(() => {
    setUnreadCount(unreadNotificationsRedux.length);
  }, [unreadNotificationsRedux]);

  useEffect(() => {
    loadTableData(searchParam, paginationParam)
  }, [location.pathname]);

  return (
    <Wrapper>
      <AnimatedNotification started={unreadCount > 0 && isStarteddAnimation}>
        <Badge count={unreadCount} className="notification-badge">
          <Dropdown
            trigger="click"
            placement="bottomRight"
            overlayClassName="notification-menus"
            overlay={
              <Menu>
                <Menu.Item key="javascript:void(0)">
                  <div className="notification-header">
                    <div className="label">Notifications</div>
                    <span>New {unreadCount}</span>
                  </div>
                </Menu.Item>
                {unreadNotificationsRedux.map((el, index) => (
                  <Menu.Item key={index} onClick={() => handleClickNotification(el)}>
                    <div className="notification-content">
                      {el.title.length > 30 ?
                        <>
                          <div className="message-container">
                            <SmsIcon />
                            {el.title.substring(0, 30)}...
                          </div>
                          <div className="message-date">
                            {moment(new Date(el.created_at)).format("MM/DD/YYYY") === moment().format("MM/DD/YYYY") ?
                              moment(new Date(el.created_at)).startOf().fromNow()
                              :
                              moment(new Date(el.created_at)).format("MM/DD/YYYY")
                            }
                          </div>
                        </>
                        :
                        <>
                          <div className="message-container">
                            <SmsIcon />
                            {el.title}
                          </div>
                          <div className="message-date">
                            {moment(new Date(el.created_at)).format("MM/DD/YYYY")}
                          </div>
                        </>
                      }
                    </div>
                  </Menu.Item>
                ))}
                <Menu.Item key="javascript:void(0)">
                  <div className="notification-footer">
                    <div
                      className="label"
                      onClick={() => {
                        history.push("/notifications");
                      }}
                    >
                      All Notifications
                    </div>
                  </div>
                </Menu.Item>
              </Menu>
            }
          >
            <img alt="notification-icon" src={NotificationIcon} className="avatar-icons-hidden" />
          </Dropdown>
        </Badge>
      </AnimatedNotification>
      {notificationData &&
        <NotificationDetailModal
          notificationData={notificationData}
          handleCloseNotificationDetailModal={handleCloseNotificationDetailModal}
        />
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .notification-badge {
    display: inline-block;
    cursor: pointer;
    .ant-scroll-number {
      top: 2px;
      right: 38px;
      background: #09b7ef;
    }
  }
  .avatar-icons-hidden {
    width: 26px;
    display: inline;
    margin-right: 35px;
  }

  @media (max-width: 900px) {
    .notification-badge {
      display: none;
    }
    .avatar-icons-hidden {
      display: none !important;
    }
  }
`;

const blinkingEffect = () => {
  return keyframes`
    50% {
      opacity: 0;
    }
  `;
}

const AnimatedNotification = styled.div`
  animation: ${props => props.started && blinkingEffect} 1s linear infinite;
`
