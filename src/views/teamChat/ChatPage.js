import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { Spin, ErrorNotification, SuccessNotification } from 'components/common';
import CustomizedApp from './CustomizedApp';
import { SendBirdProvider as SBProvider } from "sendbird-uikit";
import { callGetApiWithAuth } from 'utils/api';
import styled from 'styled-components';

export default function ChatPage(props) {
  const myUser = useSelector(state=>state.auth.user)
  const location = useLocation()
  const [selectedUser, setSelectedUser] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [sbKey, setSbKey] = useState({
    apiToken: "",
    apiUrl: "",
    appId: "",
  })

  const handleShowSuccessMessage = (msg) => {
    SuccessNotification(msg)
  }

  const handleShowErrorMessage = (msg) => {
    ErrorNotification(msg)
  }

  const onGetSbKey = (data) => {
    setIsLoading(false)
    setSbKey(data.data)    
  }

  const onFailSbKey = (err) => {
    setIsLoading(false)
    ErrorNotification(err)
  }

  const getSbKey = () => {
    setIsLoading(true)
    callGetApiWithAuth(`chat/get_key`, onGetSbKey, onFailSbKey)
  }

  useEffect(() => {
    getSbKey()
  }, [])

  useEffect(() => {
    if (location?.state?.user) {
      setSelectedUser(location.state.user)
    }
  }, [location])

  return (
    <Wrapper>
      <div className="container">
        {isLoading ?
          <div className="loading-root">
            <Spin spinning={true} />
          </div>
          :
          (sbKey.apiToken.length > 0 && sbKey.apiUrl.length > 0 && sbKey.appId.length > 0 && myUser) && 
          <SBProvider
            appId={sbKey.appId}
            userId={myUser.uuid+''}
            allowProfileEdit
            profileUrl={`${myUser.image}` || `https://optimalife-assets.s3.us-east-2.amazonaws.com/users/images/Hwc9EAUmNWo4uzGQInswkiLvzASyN0yDRmgSlfBg.svg`}
            nickname={`${myUser.first_name} ${myUser.last_name}`}
          >
            <CustomizedApp user={myUser} 
              onErrorMessage={handleShowErrorMessage}
              onSuccessMessage={handleShowSuccessMessage}
              appId={sbKey.appId}
              sbKey={sbKey}
              selectedUser={selectedUser}
            />
          </SBProvider>
        }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0;
    min-height: 400px;
    display: flex;
    background-color: #ffffff !important;
    .loading-root {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .orgchart-container {
      background-color: transparent;
      border: unset;
      height: calc(100vh - 75px);
      width: 100%;
    }
    .orgchart {
      background-image: none;
      cursor: move !important;
      ul > li > ul li {
        ::before {
          border: 1px solid rgba(53, 64, 82, 0.25);
        }
        .oc-node {
          ::before {
            background-color: rgba(53, 64, 82, 0.25);
          }
        }
      }
      ul {
        li {
          .oc-node {
            :hover, :focus, :active, .selected {
              background-color: transparent;
            }        
          }
        }
      }
    }
    .orgchart ul li .oc-node:not(:only-child)::after {
      background-color: rgba(53, 64, 82, 0.25);
    }
  }
`
