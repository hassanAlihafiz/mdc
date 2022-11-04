import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import SmsIcon from "assets/icons/sms.svg";
import styled, { keyframes } from 'styled-components'
import { callGetApiWithAuth } from "utils/api"
import SendBird from "sendbird";
import { Badge } from "antd";

export default function MessageBadge(props) {
  const location = useLocation()
  const dispatch = useDispatch()
  const unreadCountRedux = useSelector(state => state.message.unreadMessageCount)
  const history = useHistory();
  const [isStarteddAnimation, setIsStartedAnimation] = useState(true)

  const handleMessageClick = () => {
    history.push("/team_chat")
  }

  setTimeout(() => {
    setIsStartedAnimation(false)
  }, 5000);

  const getUnreadMessageCount = (sbKey) => {
    let sb = new SendBird({appId: sbKey.appId})
    sb.connect(props.userData.uuid, function(user, error) {
      if (error) {
        return
      }
  
      sb.getTotalUnreadMessageCount()
      .then((res) => {
        dispatch({
          type: 'message.SET_UNREAD_MESSAGES',
          payload: { unreadMessageCount: res }
        })
      })
      .catch((err) => {
        
      })
    });
  }

  const onGetSbKey = (data) => {
    getUnreadMessageCount(data.data)
  }

  const onFailSbKey = () => {
    
  }

  const getSbKey = () => {
    callGetApiWithAuth(`chat/get_key`, onGetSbKey, onFailSbKey)
  }

  useEffect(() => {
    if (!props.userData) return
    getSbKey()
  }, [location.pathname])

  return (
    <Wrapper>
      <div className={props?.className && props.className}>
        <AnimatedMessage started={unreadCountRedux > 0 && isStarteddAnimation}>
          <Badge
            max={99}
            count={unreadCountRedux} 
            className="notification-badge"
          >
            <img src={SmsIcon} className="avatar-icons-hidden" onClick={handleMessageClick} />
          </Badge>
        </AnimatedMessage>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .notification-badge {
    color: #000000;
    "& .MuiBadge-badge": {
      background-color: #FF632C;
      color: #FFFFFF;
    }
  }
`

const blinkingEffect = () => {
  return keyframes`
    50% {
      opacity: 0;
    }
  `;
}

const AnimatedMessage = styled.div`
  animation: ${props => props.started && blinkingEffect} 1s linear infinite;
`