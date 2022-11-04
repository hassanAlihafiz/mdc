import React, { useState, useEffect } from "react";
import { Row, Col, Drawer } from "components/common";
import AddToCartProducts from "./addToCart/AddToCartProducts";
import LiveSales from "./sales/LiveSales";
import UserDetails from "./userDetails/UserDetails";
import LiveChat from "./chat/LiveChat";
import LiveVideo from "./video/LiveVideo";
import { 
  ShopOutlined as ShopOutlinedIcon, 
  MessageOutlined as MessageOutlinedIcon 
} from "@ant-design/icons";
import { Wrapper } from "./ViewerPage.styled"

export default function ViewerPage() {
  const [visibleChat, setVisibleChat] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(false);

  const showDrawer = () => {
    setVisibleChat(true);
  };
  const onClose = () => {
    setVisibleChat(false);
  };
  const showDrawerProduct = () => {
    setVisibleProducts(true);
  };
  const onCloseProduct = () => {
    setVisibleProducts(false);
  };

  const useWindowDimensions = () => {
    const hasWindow = typeof window !== "undefined";

    function getWindowDimensions() {
      const height = hasWindow ? window.innerHeight : null;
      return {
        height,
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

  const { height } = useWindowDimensions();

  return (
    <Wrapper>
      <div className="main-container publisher-chat">
        <Row gutter={[20, 20]}>
          <Col span={4} className="responsive-hidden-cards">
            <AddToCartProducts height={height} />
          </Col>{" "}
          <Col span={15} className="responsive-show-cards">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <LiveVideo height={height} />
              </Col>
              <Col span={24} className="hidden-icons">
                <div className="message-icons">
                  <ShopOutlinedIcon onClick={showDrawerProduct} />
                  <MessageOutlinedIcon onClick={showDrawer} />
                </div>
              </Col>
              <Col md={24} lg={14} className="responsive-sales-section">
                <UserDetails height={height} />
              </Col>
              <Col md={24} lg={10} className="responsive-sales-section">
                <LiveSales height={height} />
              </Col>
            </Row>
          </Col>
          <Col span={5} className="responsive-hidden-cards">
            <LiveChat height={height} />
          </Col>
        </Row>
        <Drawer
          title={null}
          size={"large"}
          placement="right"
          onClose={onClose}
          visible={visibleChat}
          className="live-chat-drawer"
        >
          <LiveChat height={height} openInDrawer />
        </Drawer>
        <Drawer
          title={null}
          size={"large"}
          placement="right"
          onClose={onCloseProduct}
          visible={visibleProducts}
          className="live-chat-drawer"
        >
          <AddToCartProducts height={height} openInDrawer />
        </Drawer>
      </div>
    </Wrapper>
  );
}
