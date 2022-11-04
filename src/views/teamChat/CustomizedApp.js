import React, { useState, useEffect } from "react";
import axios from 'axios'
import {
  Channel as SBConversation,
  ChannelList as SBChannelList,
  ChannelSettings as SBChannelSettings,
  withSendBird,
  sendBirdSelectors,
} from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import { Button, Radio, Row, Col, Upload } from "components/common";
import CustomHeader from "./CustomHeader";
import CustomizedChannelListHeader from "./CustomizedChannelListHeader";
import { callGetApiWithAuth } from "utils/api";
import "./CustomizedApp.css";
import NoUserImage from 'assets/images/user.svg';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { callPostApiWithAuth } from 'utils/api';
import styled from "styled-components";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";
// import CustomizedChannelPreviewItem from "./CustomizedChannelPreview";

function CustomizedApp({ createChannel, sdk, groupChannel, user, sbKey, selectedUser, ...props }) {  
  // useState
  const [showSettings, setShowSettings] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchUsers, setSearchUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelImage, setNewChannelImage] = useState(undefined);
  const [uploadedChannelImage, setUploadedChannelImage] = useState('');
  const [myChannel, setMyChannel] = useState(null)
  const [invite, setInvite] = useState(false)
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const [searchText, setSearchText] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isUploadingChannelImage, setIsUploadingChannelImage] = useState(false)
  const [isCreatingChannel, setIsCreatingChannel] = useState(false)
  const [channelType, setChannelType] = useState(1)
  const [visitCount, setVisitCount] = useState(1)

  const handleChannelImageChange = (file) => {
    if (!file) {
      props.onErrorMessage('Please select a new channel image');
      return;
    }
    setNewChannelImage({ 
      preview: URL.createObjectURL(file), 
      raw: file
    });

    const requestData = new FormData();
    requestData.append('channel_image', file);
    setIsUploadingChannelImage(true)
    callPostApiWithAuth(`chat/upload_channel_image`, requestData, onSuccessUploadChannelImage, onFailUploadChannelImage)
  };

  const onSuccessUploadChannelImage = (data) => {
    setIsUploadingChannelImage(false)
    setUploadedChannelImage(data.data.channel_image)
  }

  const onFailUploadChannelImage = (err) => {
    setIsUploadingChannelImage(false)
    props.onErrorMessage(err.message)
  }

  const createAChannel = async () => {
    if (channelType*1 === 2) {
      if (selectedUsers.length < 2) {
        props.onErrorMessage('Please select more than 2 users')
        return
      }
      if (newChannelName.length === 0) {
        props.onErrorMessage('Please select a new channel name')
        return
      }
      if (!newChannelImage) {
        props.onErrorMessage('Please select a new channel image')
        return
      }
      if (uploadedChannelImage.length === 0) {
        props.onErrorMessage('Please upload a new channel image')
        return
      }
    }
    if (selectedUsers.length === 0) {
      props.onErrorMessage('Please select user')
      return
    }
    
    let params = new sdk.GroupChannelParams();
    params.isPublic = false;
    params.isEphemeral = false;
    params.isDistinct = true;
    params.operatorUserIds = [user.uuid+'']
    params.coverUrl = channelType*1 === 1 ? null : `${uploadedChannelImage}`;

    let ids = selectedUsers.map((user) => `${user.uuid}`);

    for( let user of selectedUsers) {
      await axios.post(`${sbKey.apiUrl}/v3/users`, {
        user_id: user.uuid+'',
        nickname: user.first_name+' '+user.last_name,
        profile_url: user.image || `${window.origin}${NoUserImage}`,   
      }, {
        headers: {
          'Api-Token': `${sbKey.apiToken}`
        }
      }).catch(function(err){
        console.log(err)
      }) 
    }

    params.addUserIds(ids);
    params.customType = '';
    params.name = channelType*1 === 1 ? null : `${newChannelName}`;
    setIsCreatingChannel(true);
    
    createChannel(params)
      .then((c) => {
        setIsCreatingChannel(false);
        setNewChannelName('');
        setNewChannelImage(undefined);
        setUploadedChannelImage('');
        setSelectedUsers([]);
        setCurrentChannelUrl(c.url);
        setChannelType(1);
        setInvite(false);
        props.onSuccessMessage('A new channel has been successfully created')
      })
      .catch((c) => {
        setIsCreatingChannel(false);
        console.warn(c);
      });

    setShowModal(!showModal);
  };

  const getUsers = ({ data }) => {
    setSearchUsers(data);
    setIsSearching(false)
  };

  const checkedUserExist = (selectuser) => {
    let findId = selectedUsers.findIndex((user) => user.uuid === selectuser);
    if (findId != -1) return true;
  };

  useEffect(() => {}, [selectedUsers]);

  const createAChannelFromProps = async (propsSelectedUsers) => {
    for( let user of propsSelectedUsers) {
      await axios.post(`${sbKey.apiUrl}/v3/users`, {
        user_id: user.uuid+'',
        nickname: user.first_name+' '+user.last_name,
        profile_url: user.image || `${window.origin}${NoUserImage}`,   
      }, {
        headers: {
          'Api-Token': `${sbKey.apiToken}`
        }
      }).catch(function(err){
        console.log(err)
      }) 
    }
    
    let params = new sdk.GroupChannelParams();
    params.isPublic = false;
    params.isEphemeral = false;
    params.isDistinct = true;
    params.operatorUserIds = [user.uuid+'']
    params.coverUrl = channelType*1 === 1 ? null : `${uploadedChannelImage}`;

    let ids = propsSelectedUsers.map((user) => `${user.uuid}`);

    params.addUserIds(ids);
    params.customType = '';
    params.name = channelType*1 === 1 ? null : `${newChannelName}`;
    setIsCreatingChannel(true);
    
    createChannel(params)
      .then((c) => {
        setIsCreatingChannel(false);
        setNewChannelName('');
        setNewChannelImage(undefined);
        setUploadedChannelImage('');
        setSelectedUsers([]);
        setCurrentChannelUrl(c.url);
        setChannelType(1);
        setInvite(false);
      })
      .catch((c) => {
        setIsCreatingChannel(false);
        console.warn(c);
      });

    setShowModal(false);
  };

  useEffect(() => {
    if (!selectedUser || selectedUser.length === 0 || (sdk && Object.keys(sdk).length === 0 && Object.getPrototypeOf(sdk) === Object.prototype)) return;
    createAChannelFromProps(selectedUser);
  }, [selectedUser, sdk])

  const onSearchChange = (value) => {
    setSearchText(value)

    setTimeout(() => {
      setIsSearching(true)
      callGetApiWithAuth(`common/search_enroll_downline_affiliate/${value}`, getUsers, () => {
        setIsSearching(false)
      });
    }, 1500);
  };

  const onCheckUser = (selectuser) => {
    let cloneSelectedUsers = (channelType*1 === 1 && !invite) ? [] : [ ...selectedUsers ];
    const cloneSearchUsers = [ ...searchUsers ];
    let findId = selectedUsers.findIndex((user) => user.uuid === selectuser.uuid);
    let findSearchId = cloneSearchUsers.findIndex((user) => user.uuid === selectedUsers?.downliner?.uuid)

    if (findId != -1) {
      cloneSelectedUsers.splice(findId, 1);
    } else {
      cloneSelectedUsers.push(selectuser);
      cloneSearchUsers.splice(findSearchId, 1)
    }

    setSelectedUsers(cloneSelectedUsers);
    setSearchUsers(cloneSearchUsers)
    setSearchText('')
  };

  const inviteAUser = async () => {

    let params = new sdk.GroupChannelParams();
    let userIds = selectedUsers.map((user) => `${user.uuid}`);
    
    for( let user of selectedUsers) {
      await axios.post(`${sbKey.apiUrl}/v3/users`, {
        user_id: user.uuid+'',
        nickname: user.first_name+' '+user.last_name,
        profile_url: user.image || `${window.origin}${NoUserImage}`,
      }, {
        headers: {
          'Api-Token': sbKey.apiToken
        }
      }).catch(function(err){
        console.log(err)
      }) 
    }

    if(myChannel){
      myChannel.inviteWithUserIds(userIds, function(response, error) {
        if (error) {
          props.onErrorMessage('User not found')
        }
        if(response) {
          params.name = newChannelName || myChannel.name
          params.coverUrl = uploadedChannelImage || myChannel.coverUrl
          myChannel.updateChannel(params)
          setShowModal(false)
          setSelectedUsers([])
          setInvite(false)
        }
      }).catch(function() {

      })
    }
  }

  const updateDimensions = () => {
    if (!document.getElementById("channel-list") || !document.getElementById("channel-content")) {
      return
    }
    if (window.innerWidth > 768) {
      document.getElementById("channel-list").style.display = "block"
      document.getElementById("channel-list").style.width = "unset"
      document.getElementById("channel-content").style.display = "block"
      document.getElementById("channel-content").style.width = "unset"
    } else {
      document.getElementById("channel-list").style.display = "block"
      document.getElementById("channel-list").style.width = "100%"
      document.getElementById("channel-content").style.display = "none"
      document.getElementById("channel-content").style.width = "unset"
    }
  }

  const handleClickVisibleChannelList = () => {
    document.getElementById("channel-list").style.display = "block"
    document.getElementById("channel-list").style.width = "100%"
    document.getElementById("channel-content").style.display = "none"
  }

  const handleClickVisibleChannelContent = () => {
    document.getElementById("channel-list").style.display = "none"
    document.getElementById("channel-content").style.display = "block"
    document.getElementById("channel-content").style.width = "100%"
  }

  window.addEventListener("resize", updateDimensions.bind(this));

  window.removeEventListener("resize", updateDimensions.bind(this));

  function AllUsers({ users }) {
    const listItems = users.map((user) => (
      <div className="sendbird-user-list-item ">
        <div
          className="sendbird-user-list-item__avatar sendbird-avatar"
          style={{ height: "40px", width: "40px" }}
        >
          <div
            className="sendbird-image-renderer sendbird-avatar-img"
            style={{
              height: "40px",
              width: "40px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundImage: `url('${user.image || NoUserImage}')`,
            }}
          ></div>
        </div>

        <div className="sendbird-label sendbird-user-list-item__title sendbird-label--subtitle-1 sendbird-label--color-onbackground-1">
          {`${user.first_name} ${user.last_name}`}
        </div>

        <label className="sendbird-user-list-item__checkbox">
          <label className="sendbird-checkbox">
            <input
              id={user.uuid}
              onChange={() => onCheckUser(user)}
              checked={checkedUserExist(user.uuid)}
              type="checkbox"
            />
            <span className="sendbird-checkbox--checkmark"></span>
          </label>
        </label>
      </div>
    ));

    return <div>{listItems}</div>;
  }

  const SelectedUserView = ({ users }) => {
    const listItems = users.map((user) => (
      <div className="sendbird-user-list-item ">
        <div
          className="sendbird-user-list-item__avatar sendbird-avatar"
          style={{ height: "40px", width: "40px" }}
        >
          <div
            className="sendbird-image-renderer sendbird-avatar-img"
            style={{
              height: "40px",
              width: "40px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundImage: `url('${user.image || NoUserImage}')`,
            }}
          ></div>
        </div>

        <div className="sendbird-label sendbird-user-list-item__title sendbird-label--subtitle-1 sendbird-label--color-onbackground-1">
          {`${user.first_name} ${user.last_name}`}
        </div>

        <label className="sendbird-user-list-item__checkbox">
          <label className="sendbird-checkbox">
            <input
              id={user.uuid}
              onChange={() => onCheckUser(user)}
              checked={checkedUserExist(user.uuid)}
              type="checkbox"
            />
            <span className="sendbird-checkbox--checkmark"></span>
          </label>
        </label>
      </div>
    ));

    return <div className={`selected-user ${users.length > 2 ? '' : 'scrollbar-hide'}`}>{listItems}</div>;
  }

  const WrapperFacebook = styled.div`
    root {
      position: relative;
    }
    // bottom {
    //   color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700];
    // }
    top {
      color: #825eeb;
      animation-duration: 550ms;
      position: absolute;
      left: 0;
    }
    circle: {
      stroke-linecap: round;
    }
  `

  function CircularProgressBar(props) {  
    return (
      <WrapperFacebook>
        <div className="root">
          <LoadingOutlined
            className="bottom"
            {...props}
          />
          <LoadingOutlined
            className="circle"
            {...props}
          />
        </div>
      </WrapperFacebook>
    );
  }

  return (
    <div className="customized-app">
      <div className="sendbird-app__wrap">
        <div id="channel-list" className="sendbird-app__channellist-wrap">
          <CustomizedChannelListHeader
            user={user}
            openChannelModal={() => {
              setShowModal(!showModal)
              setInvite(false)
              setSelectedUsers([])
              setSearchUsers([])
              setSearchText('')
            }}
            handleClickVisibleChannelContent={handleClickVisibleChannelContent}
          />
          <SBChannelList
            allowProfileEdit
            onChannelSelect={(channel) => {
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url);
              }
            }}
            // renderChannelPreview={({ channel, onLeaveChannel }) => (
            //   <CustomizedChannelPreviewItem
            //     userId={user.uuid}
            //     channel={channel}
            //     onLeaveChannel={onLeaveChannel}
            //     currentChannelUrl={currentChannelUrl}
            //   />
            // )}
          />
        </div>
        <div id="channel-content" className="sendbird-app__conversation-wrap">
          <SBConversation
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true);
            }}
            renderChatHeader={({ channel, user }) => (
              <CustomHeader
                channel={channel}
                user={user}
                onInviteUser={() => {
                  setMyChannel(channel)
                  setChannelType(1)
                  setInvite(true)
                  setShowModal(true)
                  setSearchUsers([])
                  setSearchText('')
                }}
                showSettingsModal={() => setShowSettings(!showSettings)}
                handleClickVisibleChannelList={handleClickVisibleChannelList}
              />
            )}
          />
        </div>
        {showSettings && (
          <div className="sendbird-app__settingspanel-wrap">
            <SBChannelSettings
              channelUrl={currentChannelUrl}
              onCloseClick={() => {
                setShowSettings(false);
              }}
            />
          </div>
        )}
      </div>

      {showModal && (
        <div id="sendbird-modal-root" style={{ zIndex: 1000 }}>
          <div className="sendbird-modal">
            <div className="sendbird-modal-content">
              <div className="sendbird-modal-header">
                <div className="sendbird-label sendbird-label--h-1 sendbird-label--color-onbackground-1">
                  {
                    invite ? 'Invite User' : 'New Channel'
                  }
                </div>
              </div>
              {!invite &&
                <Row gutter={[15, 15]} className="select-channel-type-grid">
                  <Col xs={24} className="label">
                    <h3>Channel Type</h3>
                  </Col>
                  <Col xs={12} className="channel-type">
                    <h3 className="title">
                      <Radio
                        checked={channelType*1 === 1}
                        onChange={(e) => {
                          setChannelType(e.target.value)
                          setSelectedUsers([])
                        }}
                        value={1}
                        name="channel-type-private"
                      >
                        Private
                      </Radio>
                    </h3>
                  </Col>
                  <Col xs={12} className="channel-type">
                    <h3 className="title">
                      <Radio
                        checked={channelType*1 === 2}
                        onChange={(e) => setChannelType(e.target.value)}
                        value={2}
                        name="channel-type-group"
                      >
                        Group
                      </Radio>
                    </h3>
                  </Col>
                </Row>
              }
              {channelType*1 === 2 &&
                <>
                  <div className="sendbird-label sendbird-label--caption-1 sendbird-label--color-onbackground-3">
                    <label className="input-label">
                      {'Channel Name'}
                    </label>
                    <input
                      onChange={(e) => setNewChannelName(e.target.value)}
                      className="search-input"
                      type="text"
                      value={newChannelName}
                      onFocus={() => showModal}
                      placeholder={"Channel Name"}
                    />
                  </div>
                  <div className="channel-image-upload">
                    <label className="input-label">
                      {'Channel Image'}
                    </label>
                    <div className="channel-image-upload-content">
                      <img
                        alt="preview"
                        src={newChannelImage?.preview ? newChannelImage.preview : NoUserImage}
                        className="channel-image"
                      />
                      <div className="channel-image-upload-buttons">
                        <label htmlFor="upload-photo">
                          <Upload
                            maxCount={1}
                            beforeUpload={handleChannelImageChange}
                            accept="image/*"
                            showUploadList={false}
                          >
                            <Button
                              className="button"
                              icon={isUploadingChannelImage ? <LoadingOutlined /> : <CameraOutlined />}
                            >
                              Select
                            </Button>
                          </Upload>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              }
              <div className="sendbird-modal-body">
                <div>
                  <div className="sendbird-label sendbird-label--caption-1 sendbird-label--color-onbackground-3">
                    <label className="input-label">
                      {'Username or Full Name'}
                    </label>
                    <input
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="search-input"
                      type="text"
                      value={searchText}
                      onFocus={() => showModal}
                      placeholder={"Search here..."}
                    />
                  </div>
                  <div className="sendbird-create-channel--scroll padding-top">
                    <div style={{ fontSize: '14px' }}>
                      {'Selected Users'}
                    </div>
                    {selectedUsers && selectedUsers.length ?
                        <SelectedUserView users={selectedUsers} />
                      :
                      <div style={{ 
                        fontSize: '13px', 
                        color: 'grey', 
                        textAlign: 'center',
                        margin: '10px 0px'
                      }}>
                        {'no users selected'}
                      </div>
                    }
                    <div style={{ fontSize: '14px', marginTop: '10px' }}>
                      {'Search Users'}
                    </div>

                    {(searchText && searchUsers && searchUsers.length) ?
                      <AllUsers users={searchUsers} />
                    : ''}
                    {isSearching && 
                      <div className="loading">
                        <LoadingOutlined />
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className="sendbird-modal-footer">
                <Button
                  onClick={() => {
                    setInvite(false)
                    setShowModal(false)
                    setSelectedUsers([])
                    setSearchUsers([])
                    setSearchText('')
                  }}
                  className="secondary-button"
                  type="default"
                >
                  Cancel
                </Button>
                <Button
                  icon={isCreatingChannel && <LoadingOutlined />}
                  onClick={invite ? inviteAUser : createAChannel}
                  className="primary-button"
                >
                  {invite ? "Invite" : "Create" }
                </Button>
              </div>
              <div
                onClick={() => { 
                  setInvite(false)
                  setShowModal(false)
                  setSelectedUsers([])
                  setSearchUsers([])
                  setSearchText('')
                  setChannelType(1)
                }}
                className="sendbird-modal-close"
              >
                <button
                  className="sendbird-iconbutton"
                  type="button"
                  style={{ height: "32px", width: "32px" }}
                >
                  <span className="sendbird-iconbutton__inner">
                    <div
                      role="button"
                      tabIndex={0}
                      className=" sendbird-icon sendbird-color--secondary"
                      style={{ width: "24px", height: "24px" }}
                    >
                      <svg viewBox="0 0 24 24">
                        <path
                          className="icon-close_svg__fill"
                          fill="#7B53EF"
                          fillRule="evenodd"
                          d="M6.613 5.21l.094.083L12 10.585l5.293-5.292a1 1 0 011.497 1.32l-.083.094L13.415 12l5.292 5.293a1 1 0 01-1.32 1.497l-.094-.083L12 13.415l-5.293 5.292a1 1 0 01-1.497-1.32l.083-.094L10.585 12 5.293 6.707a1 1 0 011.32-1.497z"
                        ></path>
                      </svg>
                    </div>
                  </span>
                </button>
              </div>
            </div>
            <div
              onClick={() => { 
                setInvite(false)
                setShowModal(false)
                setSelectedUsers([])
                setSearchUsers([])
                setSearchText('')
                setChannelType(1)
              }}
              className="sendbird-modal-backdrop"
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withSendBird(CustomizedApp, (state) => {
  const createChannel = sendBirdSelectors.getCreateChannel(state);
  const leaveChannel = sendBirdSelectors.getLeaveChannel(state);
  const sdk = sendBirdSelectors.getSdk(state);
  
  return { createChannel, sdk, leaveChannel };
});
