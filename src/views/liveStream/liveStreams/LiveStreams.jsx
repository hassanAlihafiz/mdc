import React, { useEffect, useState } from "react";
import {
  Row, Col, Button, Dropdown,
  Menu, AddEditModal, Pagination,
  Spin, SuccessNotification, Badge, NoData
} from "components/common";
import CreateliveStreamModal from "../create/CreateliveStreamModal";
import EditliveStreamModal from "../edit/EditliveStreamModal";
import HeaderFilters from "../header/HeaderFilters";
import { useHistory } from "react-router-dom";
import { LoadingOutlined, StopOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { ReactComponent as ThreeDotsIcon } from "assets/icons/bi_three-dots.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import DummyUserImage from "assets/images/user.svg";
import moment from "moment";
import { getUser } from "utils/auth";
import { callDeleteApiWithAuth, callGetApiWithAuth, callPutApiWithAuth } from "utils/api";
import { uiVarLabel, uiVarList } from "common/uiVar";
import { Wrapper } from "./LiveStreams.styled";
import { varKey, varLabel } from "common/var";

export default function LiveStreams() {
  const myUser = getUser();
  const history = useHistory();
  const [liveStreamsList, setLiveStreamsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDoingAction, setIsDoingAction] = useState(false);
  const [activeAddModal, setActiveAddModal] = useState(false);
  const [selectedStreamForEdit, setSelectedStreamForEdit] = useState(undefined);
  const [selectedStreamId, setSelectedStreamId] = useState("");
  const [searchParams, setSearchParams] = useState({
    user_id: "",
    keyword: "",
    publisher: "",
    topic: "",
    lang: ""
  });
  const [paginationParams, setPaginationParams] = useState({
    currentPage: 1,
    perPage: 12,
    total: 0
  });

  const onGetSuccessLiveStreams = ({ data }) => {
    setIsLoading(false);
    setLiveStreamsList(data.data);
  };

  const onGetFailedLiveStreams = () => {

  };

  const handleLoadLiveStreams = () => {
    let params = {
      user_id: searchParams.user_id,
      keyword: searchParams.keyword,
      publisher: searchParams.publisher,
      topic: searchParams.topic,
      lang: searchParams.lang,
      current_page: paginationParams.currentPage,
      per_page: paginationParams.perPage,
      type: 1,
    };

    let query = Object.keys(params).map(k=>k+'='+params[k]).join('&');

    setIsLoading(true);
    callGetApiWithAuth(`live_stream/list?${query}`, onGetSuccessLiveStreams, onGetFailedLiveStreams);
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(`${process.env.REACT_APP_LIVE_STREAM_URL}/${url}/${myUser.username}`);
    SuccessNotification("Successfully copied to clipboard");
  };

  const handleChangePagination = (page, pageSize) => {
    setPaginationParams({
      ...paginationParams,
      currentPage: page,
      perPage: pageSize
    });
  };

  const onSuccessDeleted = () => {
    setSelectedStreamId("");
    setIsDoingAction(false);
    SuccessNotification("Live stream has been deleted successfully.");
    handleLoadLiveStreams();
  };

  const onFailedDelete = () => {
    setSelectedStreamId("");
    setIsDoingAction(false);
  };

  const handleDeleteLiveStream = (stream) => {
    setSelectedStreamId(stream.id);
    setIsDoingAction(true);
    callDeleteApiWithAuth(`live_stream/delete/${stream.id}`, onSuccessDeleted, onFailedDelete);
  };

  const onSuccessChangedStatus = () => {
    setSelectedStreamId("");
    setIsDoingAction(false);
    SuccessNotification("Status has been changed successfully.");
    handleLoadLiveStreams();
  };

  const onFailedChangeStatus = () => {
    setSelectedStreamId("");
    setIsDoingAction(false);
  };

  const handleChangeStatus = (stream, status) => {
    setSelectedStreamId(stream.id);
    setIsDoingAction(true);
    callPutApiWithAuth("live_stream/publish", { stream_id: stream.id, status: status}, onSuccessChangedStatus, onFailedChangeStatus);
  };
  
  useEffect(() => {
    handleLoadLiveStreams();
  }, [searchParams, paginationParams.currentPage, paginationParams.perPage]);

  return (
    <Wrapper>
      <div className="header-filters">
        <Row gutter={[20, 20]}>
          <HeaderFilters
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Col xs={12} sm={8} xl={4}>
            <div className="live-stream-action">
              <Button onClick={() => setActiveAddModal(true)}>
                New Livestream
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="header-pagination">
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <Pagination
              current={paginationParams.currentPage}
              pageSize={paginationParams.perPage}
              total={paginationParams.total}
              onChange={handleChangePagination}
              defaultPageSize="12"
              pageSizeOptions={["12", "24", "48", "96"]}
              responsive
              showQuickJumper
              showSizeChanger
            />
          </Col>
        </Row>
      </div>
      {isLoading ?
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <Spin spinning={true} />
          </Col>
        </Row>
        :
        <Row gutter={[20, 20]}>
          {liveStreamsList.length === 0 ?
            <div className="no-stream">
              <NoData title="There are no items." />
            </div>
            : liveStreamsList?.map((el, index) => (
            <Col
              xs={24}
              md={12}
              xl={8}
              xxl={6}
              className="responsive-payment-cards"
              key={index}
            >
              <div className="payment-cards">
                {(el.user_id*1 === myUser.id*1) &&
                  <Dropdown overlay={
                    <SubMenu
                      handleEdit={() => setSelectedStreamForEdit(el)}
                      handleDeleteLiveStream={() => handleDeleteLiveStream(el)}
                      handlePublish={() => handleChangeStatus(el, 1)}
                      handleUnpublish={() => handleChangeStatus(el, 2)}
                    />}
                    placement="bottomRight"
                    overlayClassName="live-stream-sub-menu-dropdown"
                  >
                    <div className="three-dot-container">
                      <div className="three-dot-box">
                        {(selectedStreamId*1 === el.id*1 && isDoingAction) ?
                          <LoadingOutlined />
                          :
                          <ThreeDotsIcon />
                        }
                      </div>
                    </div>
                  </Dropdown>
                }
                <div
                  className="training-background"
                  style={{ backgroundImage: `url(${el.preview_image})` }}
                >
                </div>
                <div
                  className="training-title"
                  onClick={() => (el.user_id*1 === myUser.id*1 && el.status*1 === 1) && history.push({pathname: '/publisher', state: { streamData: el }})}
                >
                  {el.title}
                </div>
                <div className="training-content">{el.description}</div>
                <div className="status-language">
                  <Badge type='liveStreamStatus'
                    keyName={varKey('liveStream.status', el.status)}
                    label={varLabel('liveStream.status', el.status)}
                  />
                  <div className="language-title">Language: {uiVarLabel("liveStream.languages", el.lang)}</div>
                </div>
                <div className="start-row">
                  <Row gutter={[10, 10]}>
                    <Col span={12}>
                      <div className="start-label">Started At:</div>
                      <div className="start-value">{moment(new Date(el.start_at)).format("LL")}</div>
                      <div className="start-value">{moment(new Date(el.start_at)).format("LT")} {uiVarList("timezones.list").filter((item) => item.text === el.timezone)[0]?.abbr}</div>
                    </Col>
                    <Col span={12}>
                      <div className="start-label">End At:</div>
                      <div className="start-value">{moment(new Date(el.end_at)).format("LL")}</div>
                      <div className="start-value">{moment(new Date(el.end_at)).format("LT")} {uiVarList("timezones.list").filter((item) => item.text === el.timezone)[0]?.abbr}</div>
                    </Col>
                  </Row>
                </div>
                <div className="name-details-container">
                  <div className="user-name">
                    <img src={el.user.image || DummyUserImage} />
                    {el.user.first_name} {el.user.last_name}
                  </div>
                  <div className="product-training">{uiVarLabel("liveStream.topics", el.topic)}</div>
                </div>
                <div className="copy-container">
                  <Row gutter={[10, 10]}>
                    <Col span={19}>
                      <div className="copy-url">
                        {process.env.REACT_APP_LIVE_STREAM_URL}/{el.path}/{myUser.username}
                      </div>
                    </Col>
                    <Col span={5}>
                      <Button onClick={() => handleCopyUrl(el.path)}>Copy</Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      }
      {activeAddModal && (
        <AddEditModal
          onClose={() => {
            setActiveAddModal(false);
          }}
          open={activeAddModal}
          width="90%"
          toggle={() => setActiveAddModal(!activeAddModal)}
          modalClass="create-live-stream-modal"
        >
          <CreateliveStreamModal
            toggle={setActiveAddModal}
            handleLoadLiveStreams={handleLoadLiveStreams}
          />
        </AddEditModal>
      )}
      {selectedStreamForEdit && (
        <AddEditModal
          onClose={() => {
            setSelectedStreamForEdit(undefined);
          }}
          open={true}
          width="90%"
          toggle={() => setSelectedStreamForEdit(undefined)}
          modalClass="edit-live-stream-modal"
        >
          <EditliveStreamModal
            data={selectedStreamForEdit}
            toggle={setSelectedStreamForEdit}
            handleLoadLiveStreams={handleLoadLiveStreams}
          />
        </AddEditModal>
      )}
    </Wrapper>
  );
}

export function SubMenu(props) {
  return (
    <Menu>
      <Menu.Item key={"edit"}>
        <a onClick={props.handleEdit} className="live-stream-sub-menu-item">
          <div
            style={{
              fontSize: "12px",
              color: "#7f8fa3",
            }}
          >
            <EditIcon
              style={{
                marginRight: "10px",
              }}
            />
            Edit
          </div>
        </a>
      </Menu.Item>
      <Menu.Item key={"publish"}>
        <a onClick={props.handlePublish} className="live-stream-sub-menu-item">
          <div
            style={{
              fontSize: "12px",
              color: "#7f8fa3",
            }}
          >
            <CheckCircleOutlined
              style={{
                marginRight: "10px",
              }}
            />
            Publish
          </div>
        </a>
      </Menu.Item>
      <Menu.Item key={"unpublish"}>
        <a onClick={props.handleUnpublish} className="live-stream-sub-menu-item">
          <div
            style={{
              fontSize: "12px",
              color: "#7f8fa3",
            }}
          >
            <StopOutlined
              style={{
                marginRight: "10px",
              }}
            />
            UnPublish
          </div>
        </a>
      </Menu.Item>
      <Menu.Item
        style={{
          minWidth: 140,
        }}
        key={"delete"}
      >
        <a onClick={props.handleDeleteLiveStream} className="live-stream-sub-menu-item">
          <div
            style={{
              fontSize: "12px",
              color: "#7f8fa3",
            }}
          >
            <DeleteIcon
              style={{
                marginRight: "10px",
              }}
            />
            Delete
          </div>
        </a>
      </Menu.Item>
    </Menu>
  )
};