import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Row, Col, Drawer, Empty, Spin } from "components/common";
import SelectableProducts from "./selectableProducts/SelectableProducts";
import LiveSales from "./sales/LiveSales";
import UserDetails from "./userDetails/UserDetails";
import LiveChat from "./chat/LiveChat";
import LiveVideo from "./video/LiveVideo";
import { ShopOutlined, MessageOutlined } from "@ant-design/icons";
import SplashImg from "assets/images/live_stream_splash.jpg";
import { Wrapper } from "./PublisherPage.styled";
import { callGetApiWithAuth } from "utils/api";

export default function PublisherPage() {
  const location = useLocation();
  const [visibleChat, setVisibleChat] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [streamDetails, setStreamDetails] = useState(undefined);
  const [rtcAdaptor, setRtcAdaptor] = useState(undefined);
  const [rtcAdaptorChat, setRtcAdaptorChat] = useState(undefined);
  const [isConnected, setIsConnected] = useState(false);

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

  const onGetSuccessDetails = ({ data }) => {
    setIsLoading(false);
    setStreamDetails(data);
  };

  const onGetFailedDetails = () => {
    setIsLoading(false);
  };

  const handleLoadStreamDetails = (streamId) => {
    setIsLoading(true);
    callGetApiWithAuth(
      `live_stream/detail/${streamId}`,
      onGetSuccessDetails,
      onGetFailedDetails
    );
  };

  useEffect(() => {
    if (location?.state?.streamData) {
      handleLoadStreamDetails(location.state.streamData.id);
    }
  }, [location]);

  return (
    <Wrapper>
      <div className="main-container publisher-chat">
        {isLoading ? (
          <Spin spinning={true} />
        ) : (
          <>
            {streamDetails ? (
              <Row gutter={[20, 20]}>
                <Col span={4} className="responsive-hidden-cards">
                  <SelectableProducts
                    height={height}
                    data={streamDetails}
                    rtcAdaptor={rtcAdaptorChat}
                    isConnected={isConnected}
                  />
                </Col>{" "}
                <Col span={15} className="responsive-show-cards">
                  <Row gutter={[20, 20]}>
                    <Col span={24}>
                      <LiveVideo
                        height={height}
                        data={streamDetails}
                        setRtcAdaptor={setRtcAdaptor}
                        rtcAdaptor={rtcAdaptor}
                      />
                    </Col>
                    <Col span={24} className="hidden-icons">
                      <div className="message-icons">
                        <ShopOutlined onClick={showDrawerProduct} />
                        <MessageOutlined onClick={showDrawer} />
                      </div>
                    </Col>
                    <Col md={24} lg={14} className="responsive-sales-section">
                      <UserDetails height={height} data={streamDetails} />
                    </Col>
                    <Col md={24} lg={10} className="responsive-sales-section">
                      <LiveSales height={height} data={streamDetails} />
                    </Col>
                  </Row>
                </Col>
                <Col span={5} className="responsive-hidden-cards">
                  <LiveChat
                    height={height}
                    data={streamDetails}
                    rtcAdaptor={rtcAdaptorChat}
                    setRtcAdaptor={setRtcAdaptorChat}
                    setIsConnected={setIsConnected}
                    isConnected={isConnected}
                  />
                </Col>
              </Row>
            ) : (
              <Row gutter={[20, 20]}>
                <Col span={4} className="responsive-hidden-cards">
                  <div
                    className="products-skeleton"
                    style={{ height: height - 110 }}
                  >
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={"No Products"}
                      className="no-products-skeleton"
                    />
                  </div>
                </Col>{" "}
                <Col span={15} className="responsive-show-cards">
                  <Row gutter={[20, 20]}>
                    <Col span={24}>
                      <div
                        className="video-container-skeleton"
                        style={{ height: height - 420 }}
                      >
                        <img src={SplashImg} />
                      </div>
                    </Col>
                    <Col span={24} className="hidden-icons">
                      <div className="message-icons">
                        <ShopOutlined onClick={showDrawerProduct} />
                        <MessageOutlined onClick={showDrawer} />
                      </div>
                    </Col>
                    <Col md={24} lg={14} className="responsive-sales-section">
                      <div className="stream-detail-skeleton">
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={"No User Data"}
                          className="no-products-skeleton"
                        />
                      </div>
                    </Col>
                    <Col md={24} lg={10} className="responsive-sales-section">
                      <div className="stream-detail-skeleton">
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={"No Sales Data"}
                          className="no-products-skeleton"
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={5} className="responsive-hidden-cards">
                  <div
                    className="products-skeleton"
                    style={{ height: height - 110 }}
                  >
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={"No Chat"}
                      className="no-products-skeleton"
                    />
                  </div>
                </Col>
              </Row>
            )}
          </>
        )}
        <Drawer
          title={null}
          size={"large"}
          placement="right"
          onClose={onClose}
          visible={visibleChat}
          className="live-chat-drawer"
        >
          {streamDetails ? (
            <LiveChat
              height={height}
              data={streamDetails}
              openInDrawer
              rtcAdaptor={rtcAdaptorChat}
              setRtcAdaptor={setRtcAdaptorChat}
              setIsConnected={setIsConnected}
              isConnected={isConnected}
            />
          ) : (
            <div className="stream-detail-skeleton">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={"No Chat"}
                className="no-products-skeleton"
              />
            </div>
          )}
        </Drawer>
        <Drawer
          title={null}
          size={"large"}
          placement="right"
          onClose={onCloseProduct}
          visible={visibleProducts}
          className="live-chat-drawer"
        >
          {streamDetails ? (
            <SelectableProducts
              height={height}
              data={streamDetails}
              openInDrawer
            />
          ) : (
            <div className="products-skeleton" style={{ height: height - 110 }}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={"No Products"}
                className="no-products-skeleton"
              />
            </div>
          )}
        </Drawer>
      </div>
    </Wrapper>
  );
}
