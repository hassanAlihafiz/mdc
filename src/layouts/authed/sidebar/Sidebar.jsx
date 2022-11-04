import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Layout, Menu } from "components/common";
import styled from "styled-components";
import { menus, hasPageAccess } from "common/menu";
import { getSudo, getToken } from "utils/auth";
import { ReactComponent as LogoIcon } from "assets/icons/logo.svg";
import { ReactComponent as SmallLogoIcon } from "assets/icons/small-logo.svg";
import { useTranslation } from "react-i18next";
import { ReactComponent as ArrowDownIcon } from "assets/icons/sidebar/Arrow-Down.svg";

const { SubMenu } = Menu;
const { Sider } = Layout;

export default function Sidebar({ width }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const sudoName = getSudo();
  const token = getToken();
  const myUser = useSelector((state) => state.auth.user);
  const isCollapse = useSelector((state) => state.ui.isCollapse);
  const isHoverSidebar = useSelector((state) => state.ui.isHoverSidebar);

  const onMenuClick = (e) => {
    if (e.key === "/shop" && token) {
      window.open(`${process.env.REACT_APP_CORP_URL}/login?auto-token-login&pathName=shop&token=${token}`, '_blank')
    } else {
      history.push(e.key);
    }
  };

  const useWindowDimensions = () => {
    const hasWindow = typeof window !== "undefined";

    function getWindowDimensions() {
      const height = hasWindow ? window.innerHeight : null;
      const width_ = hasWindow ? window.innerWidth : null;
      return {
        height,
        width_,
      };
    }

    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      if (hasWindow) {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }, [hasWindow]);

    return windowDimensions;
  };

  const { height, width_ } = useWindowDimensions();

  useEffect(() => {
    if (width_ < 900) {
      dispatch({
        type: "ui.SET_COLLAPSE",
        payload: {
          isCollapse: false,
        },
      });
    }
  }, [width_]);

  return (
    <SiderWrapper
      onMouseEnter={() => {
        dispatch({
          type: "ui.SET_HOVER_SIDEBAR",
          payload: {
            isHoverSidebar: true,
          },
        });
      }}
      onMouseLeave={() => {
        dispatch({
          type: "ui.SET_HOVER_SIDEBAR",
          payload: {
            isHoverSidebar: false,
          },
        });
      }}
      className={
        isCollapse && !isHoverSidebar
          ? "sidebar-wrapper sidebar-collapsed"
          : "sidebar-wrapper"
      }
      style={{ width: width || "270px" }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={isHoverSidebar ? false : isCollapse}
      >
        {isCollapse && !isHoverSidebar ? (
          <div className="logo small-logo">
            <SmallLogoIcon />
          </div>
        ) : (
          <div className="logo">
            <LogoIcon />
          </div>
        )}
        <div className="menu-container">
          <Menu
            theme="dark"
            mode="inline"
            expandIcon={isCollapse ? null : <ArrowDownIcon />}
            defaultSelectedKeys={[history?.location?.pathname]}
            selectedKeys={[history?.location?.pathname]}
            onClick={onMenuClick}
            triggerSubMenuAction={"click"}
            style={{
              height: height - 120,
            }}
          >
            {menus
              .filter((item) => item.isMenuOnDesktop)
              .filter((item) => {
                return hasPageAccess(item.route, myUser, sudoName);
              })
              .map((menu) =>
                menu.submenus && menu.submenus.length > 0 ? (
                  <SubMenu
                    icon={menu.icon}
                    key={menu.route}
                    title={t(menu.label)}
                  >
                    {menu.submenus
                      .filter((item2) => item2.isMenuOnDesktop)
                      .filter((item2) => {
                        return hasPageAccess(item2.route, myUser, sudoName);
                      })
                      .map((submenu) => (
                        <Menu.Item key={submenu.route}>
                          {t(submenu.label)}
                        </Menu.Item>
                      ))}
                  </SubMenu>
                ) : (
                  <Menu.Item key={menu.route} icon={menu.icon}>
                    {t(menu.label)}
                  </Menu.Item>
                )
              )}
          </Menu>
        </div>
      </Sider>
    </SiderWrapper>
  );
}

const SiderWrapper = styled.div`
  position: fixed;
  height: 100%;
  background: #384971;
  width: 270px;
  z-index: 100;
  transition: width 0.7s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
  .ant-layout-sider {
    font-family: "Roboto", sans-serif;
    background: #384971;
    width: 100% !important;
    max-width: 100% !important;
    padding: 0px 5px 0px 15px;
    .ant-menu.ant-menu-dark,
    .ant-menu-dark .ant-menu-sub,
    .ant-menu.ant-menu-dark .ant-menu-sub {
      background: transparent;
    }
    .ant-menu-item {
      padding: 23px 0px 23px 12px !important;
      margin: 0px;
      color: #e5e5e5;
      width: calc(100% - 7px);
    }
    .ant-menu-item-icon {
      width: 23px;
    }
    .ant-menu-submenu-expand-icon {
      width: 14px;
    }
    .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
      .ant-menu-item-selected {
      background-color: rgba(156, 231, 255, 0.1);
    }
    .ant-menu-root {
      overflow-y: auto;
      padding-right: 4px;
      ::-webkit-scrollbar {
        width: 5px;
      }
      ::-webkit-scrollbar-track {
        border-radius: 10px;
        box-shadow: inset 0 0 5px transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: #e4e4e485;
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #e4e4e485;
      }
    }
    .ant-menu-title-content {
      font-size: 15px;
      font-weight: 400;
    }
    .ant-menu-submenu {
      color: #e5e5e5;
      .ant-menu-item {
        padding-left: 45px !important;
      }
      .ant-menu-submenu-title {
        color: #e5e5e5;
        padding: 23px 0px 23px 12px !important;
        margin: 0px;
        .ant-menu-submenu-expand-icon,
        .ant-menu-submenu-arrow {
          right: 10px;
        }
      }
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 14px 0px 20px;
      svg {
        width: 150px;
      }
    }
    .small-logo {
      margin: 14px 0px 20px -4px;
      svg {
        width: 47px !important;
      }
    }
  }
`;
