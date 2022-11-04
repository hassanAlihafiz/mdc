import React, { useState, useEffect } from "react";
import { 
  Layout, Drawer, 
  ErrorNotification
} from "components/common";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isAuthedUser, getUser, getSudo, saveStorage, getToken } from 'utils/auth'
import { callGetApiWithAuth } from 'utils/api'
import { hasPageAccess } from 'common/menu';
import BaseLayout from "../base/BaseLayout";
import TopHeader from "./topHeader/TopHeader";
import Sidebar from "./sidebar/Sidebar";

const { Header, Content } = Layout;

export default function AuthedLayout({ children, fullLayout, pathname }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const myUser = useSelector((state) => state.auth.user)
  const sudoName = useSelector((state) => state.auth.sudo_name)
  const isCollapse = useSelector((state) => state.ui.isCollapse)
  const errorMessage = useSelector((state) => state.api.errorMessage)
  const needReload = useSelector((state) => state.auth.needReload)
  const orderError = useSelector((state) => state.checkout.orderError)
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onGetProfile = (res) => {
    dispatch({ type: 'auth.RELOAD_DONE' })
    saveStorage(res.data, getToken(), getSudo())
    dispatch({
      type: 'auth.SET_USER',
      payload: {
        user: res.data,
        sudoName: getSudo()
      }
    })
  }
  const onFailProfile = () => {
    dispatch({ type: 'auth.RELOAD_DONE' })
  }

  const onGetCurrency = (res) => {
    if (res.data) {
      dispatch({
        type: 'common.SET_CURRENCY',
        payload: {
          currency: res.data
        }
      })
    }
  }

  useEffect(() => {
    document.getElementById("myapp").scroll(0, 0);
    if (!isAuthedUser()) {
      history.push('/logout')
      return
    }

    if (
      history?.location?.pathname == "/publisher" ||
      history?.location?.pathname == "/viewer"
    ) {
      dispatch({
        type: "ui.SET_COLLAPSE",
        payload: {
          isCollapse: true,
        },
      });
    } else {
      dispatch({
        type: "ui.SET_COLLAPSE",
        payload: {
          isCollapse: false,
        },
      });
    }
  }, [history?.location?.pathname]);

  useEffect(() => {
    if (errorMessage) {
      ErrorNotification(errorMessage)
      dispatch({
        type: 'api.CLEAR_ERROR_MESSAGE'
      })
    }
  }, [errorMessage])

  useEffect(() => {
    setTimeout(() => {
      callGetApiWithAuth(`common/currency`, onGetCurrency)
      callGetApiWithAuth(`common/profile`, onGetProfile, onFailProfile)
    }, 1500)    
  }, [])

  useEffect(() => {
    if (needReload) {
      callGetApiWithAuth(`common/profile`, onGetProfile, onFailProfile)
    }
  }, [needReload])

  useEffect(() => {
    // Check Page Access
    if (myUser && history.location.pathname) {
      if (!hasPageAccess(history.location.pathname, myUser, sudoName)) {
        history.push('/')        
      }
    }
  }, [myUser, history.location.pathname])

  useEffect(() => {
    if (orderError) {
      ErrorNotification(orderError)
      dispatch({
        type: "checkout.CLEAR_ORDER_ERROR"
      })
    }
  }, [orderError])

  return (
    myUser? 
    <BaseLayout>
      <LayoutWrapper>
        <Layout>
          <Sidebar />
          <Layout
            className={
              isCollapse ? "site-layout collapse-layout" : "site-layout"
            }
          >
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <TopHeader pathname={pathname} 
                showDrawer={showDrawer} 
              />
            </Header>
            <Content
              className="site-layout-background"
              style={{
                padding: 20,
              }}
            >
              <Wrapper className={"pageContent"}>
                {fullLayout ? (
                  <div
                    style={{
                      height: "100%",
                    }}
                  >
                    {children}
                  </div>
                ) : (
                  <div
                    className={"container"}
                    style={{
                      height: "100%",
                    }}
                  >
                    {children}
                  </div>
                )}
              </Wrapper>
            </Content>
          </Layout>
        </Layout>
      </LayoutWrapper>
      <Drawer title={null} placement="left" onClose={onClose} visible={visible}>
        <Sidebar width={"256px"} />
      </Drawer>
    </BaseLayout>
    : ''
  );
}

const Wrapper = styled.div`
  height: 100%;
`;
const LayoutWrapper = styled.div`
  height: 100%;
  .site-layout {
    margin-left: 270px;
    transition: margin-left 0.7s;
    transition-timing-function: ease-in-out;
  }
  .collapse-layout {
    margin-left: 80px;
    transition: margin-left 0.7s;
    transition-timing-function: ease-in-out;
  }
  .sidebar-collapsed {
    width: 80px !important;
    transition: width 0.7s;
    transition-timing-function: ease-in-out;
    .ant-menu-item {
      padding: 0px 0px 23px 12px !important;
      margin: 7px 0px;
    }
    .ant-menu-submenu {
      .ant-menu-submenu-title {
        padding: 0px 0px 23px 12px !important;
      }
    }
  }
  @media (max-width: 900px) {
    .sidebar-wrapper {
      display: none;
    }
    .site-layout {
      margin-left: 0px;
    }
  }
  @media (max-width: 600px) {
    .avatar-icons {
      margin-right: 10px !important;
      width: 20px !important;
    }
    .react-country-flag {
      margin-right: 10px !important;
      font-size: 18px !important;
    }
    .route-title {
      font-size: 17px !important;
    }
    .avatar-box {
      margin-right: 0px !important;
      .user-container {
        .user-title {
          font-size: 10px !important;
          line-height: 30px !important;
        }
        .user-id {
          font-size: 8px !important;
        }
      }
    }
  }
`;