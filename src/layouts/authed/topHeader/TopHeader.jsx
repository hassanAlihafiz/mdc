import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ReactCountryFlag from "react-country-flag";
import { useHistory, useLocation } from "react-router-dom";
import { Dropdown, Menu } from "components/common";
import { getPageTitle } from 'common/menu'
import Notifications from './notifications/Notifications';
import MessageBadge from './message/MessageBadge';
import {
  MenuOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import NoPhotoImg from "assets/images/user.svg";
import ShoppingCartIcon from "assets/icons/shopping-cart.svg";
import { Badge } from "antd";
import SideCart from "components/common/cart/SideCart";

export default function TopHeader({ showDrawer }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const isCollapse = useSelector((state) => state.ui.isCollapse);
  const myUser = useSelector((state) => state.auth.user);
  const sudoName = useSelector((state) => state.auth.sudoName);
  const orderDetails = useSelector((state) => state.checkout.orderDetails)
  const [orderCount, setOrderCount] = useState(0)

  const onClickAccountMenu = ({ key }) => {
    if (key == "logout") {
      history.push("/logout");
    }
    history.push(key);
  };

	const handleShowCart = () => {
    if (location.pathname && location.pathname === "/checkout") {
      dispatch({
        type: "ui.HIDE_SIDE_CART"
      })
    } else {
      dispatch({
        type: "ui.SHOW_SIDE_CART"
      })
    }
	}

  useEffect(() => {
    let orderCount_ = 0;
    for (let order of orderDetails) {
      orderCount_ += order.quantity*1;
    }
    setOrderCount(orderCount_)
  }, [orderDetails])

  return (
    <Wrapper>
      <div className="route-title">
        <span className="mobile-side-icon">
          <MenuOutlined onClick={showDrawer} />
        </span>
        {history?.location?.pathname !== "/publisher" &&
          history?.location?.pathname !== "/viewer" &&
          (isCollapse ? (
            <span className="mobile-collapse-icon">
              <DoubleRightOutlined
                onClick={() => {
                  dispatch({
                    type: "ui.SET_COLLAPSE",
                    payload: {
                      isCollapse: false,
                    },
                  });
                }}
              />
            </span>
          ) : (
            <span className="mobile-collapse-icon">
              <DoubleLeftOutlined
                onClick={() => {
                  dispatch({
                    type: "ui.SET_COLLAPSE",
                    payload: {
                      isCollapse: true,
                    },
                  });
                }}
              />
            </span>
          ))}
        {getPageTitle(history.location.pathname) 
          ? getPageTitle(history.location.pathname)
          : history.location.pathname?.split("/")?.length == 3
          ? history.location.pathname?.split("/")[2]?.replace("_", " ")
          : history.location.pathname?.split("/")[1] == ""
          ? "Home"
          : history.location.pathname?.split("/")[1] == "publisher" ||
            history.location.pathname?.split("/")[1] == "viewer"
          ? "Live Stream"
          : history.location.pathname?.split("/")[1]?.replace("_", " ")
        }
      </div>      
      <div className="avatar-container">
        {sudoName?
          <span className='sudo-badge'>SUDO MODE</span>
        : ''}
        {myUser.country ? (
          <ReactCountryFlag
            countryCode={myUser.country}
            className="react-country-flag"
            svg
            style={{
              fontSize: "26px",
              lineHeight: "0.1em",
            }}
            title={myUser.country}
          />
        ) : (
          ""
        )}
        <Badge count={orderCount} className="cart-badge">
          <a href="javascript:void(0)" onClick={handleShowCart}>
            <img src={ShoppingCartIcon} className="avatar-icons cart-img" />
          </a>
        </Badge>
        <Notifications />
        <MessageBadge userData={myUser} />
        <Dropdown
          overlay={
            <Menu onClick={onClickAccountMenu}>
              <Menu.Item key="/my_account/subscription">
                Subscriptions
              </Menu.Item>
              <Menu.Item key="/my_account/order_history">
                Order History
              </Menu.Item>
              <Menu.Item key="/my_account/credit_wallet">
                Credit Wallet
              </Menu.Item>
              <Menu.Item key="/my_account/payment_option">
                Payment Options
              </Menu.Item>
              <Menu.Item key="/my_account/setting">Account Settings</Menu.Item>
              <Menu.Item key="logout">Logout</Menu.Item>
            </Menu>
          }
        >
          <div className="avatar-box">
            <div>
              {myUser.image ? (
                <img src={myUser.image} />
              ) : (
                <img src={NoPhotoImg} />
              )}
            </div>
            <div className="user-container">
              <div className="user-title">
                {`${myUser.first_name} ${myUser.last_name}`}
              </div>
              <div className="user-id">#{myUser.uuid}</div>
            </div>
          </div>
        </Dropdown>
      </div>
      <SideCart />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  .route-title {
    font-size: 20px;
    color: #354052;
    text-transform: capitalize;
    font-weight: 400;
    font-family: "Roboto", sans-serif;
    display: flex;
    align-items: center;
    .anticon {
      position: relative;
      top: -4px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .sudo-badge {
    background-color: #f5222d;
    font-size: 14px;
    margin-right: 32px;
    height: 28px;
    line-height: 28px;
    padding: 0 6px;
    color: #fff;
  }
  .avatar-container {
    display: flex;
    align-items: center;
    .avatar-icons {
      width: 26px;
      margin-right: 35px;
      cursor: pointer;
    }
    .avatar-icons-hidden {
      width: 26px;
      display: inline;
      margin-right: 35px;
    }
    .avatar-box {
      display: flex;
      margin-right: 10px;
      align-items: center;
      cursor: pointer;
      img {
        margin-right: 8px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        object-fit: cover;
      }
      .user-container {
        .user-title {
          height: 20px;
          font-family: "Roboto", sans-serif;
          line-height: 25px;
          color: #212529;
          font-weight: 500;
          font-size: 14px;
        }
        .user-id {
          height: 20px;
          font-family: "Roboto", sans-serif;
          line-height: 20px;
          color: #7f8fa3;
          font-weight: 400;
          font-size: 12px;
        }
      }
    }
  }
  .cart-badge {
    margin-right: 35px;
    .cart-img {
      margin-right: 0;
    }
  }
  .notification-badge {
    cursor: pointer;
    .ant-scroll-number {
      top: 2px;
      right: 38px;
      background: #09b7ef;
    }
  }
  .mobile-side-icon {
    display: none;
  }
  .mobile-collapse-icon {
    display: inline;
  }
  .react-country-flag {
    border-radius: 50%;
    margin-right: 35px;
    display: inline;
  }
  @media (max-width: 1000px) {
    .route-title {
      font-size: 19px;
    }
  }
  @media (max-width: 900px) {
    .mobile-side-icon {
      display: inline;
    }
    .mobile-collapse-icon {
      display: none;
    }
  }
  @media (max-width: 900px) {
    .react-country-flag {
      display: none !important;
    }
    .avatar-icons-hidden {
      display: none !important;
    }
  }
  @media (max-width: 575px) {
    .cart-badge {
      margin-right: 5px;
    }
    .user-container {
      display: none;
    }
    .avatar-container {
      .avatar-box {
        img {
          width: 28px;
          height: 28px;
          margin-right: 0;
        }
      }
    }
  }
`;
