import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { 
  Row, Col, Card, 
  Spin
} from 'components/common'
import {
  callGetApiWithAuth
} from 'utils/api'
import NophotoIcon from "assets/images/user.svg";

export default function UplinePage() {
  const [uplines, setUplines] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const onGetUplines = (data) => {
    setIsLoading(false)
    setUplines(data.data)
  }
  const onFailUplines = () => {
    setIsLoading(false)
  }
  const loadUplines = () => {
    setIsLoading(true)
    callGetApiWithAuth(`my_team/upline/list`, onGetUplines, onFailUplines)
  }  

  useEffect(() => {
    loadUplines()
  }, [])

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
      {uplines.slice(0, 2).map((user, index) => 
        <Col  key={index} xs={24} lg={12} xl={8}>
          <UserCard
            user={user} prevUser={index>0?uplines[index-1]:undefined} 
          />
        </Col>
      )}
      </Row>
      {!isLoading && uplines.length==0?
        <Card>
          <div className={'noContent'}>
            No Sponsor
          </div>
        </Card>
      : ''}
      {isLoading && 
        <div className={'loadingRoot'}>
          <Spin spinning={true} className={`spinner`} />
        </div>
      }
    </Wrapper>
  )
}

const UserCard = (props) => {
  return (
    <Card>
      <div className={'cardContent'}>
        <div className={'infoCol'}>
          <img
            alt="user-img"
            src={props.user.image || NophotoIcon}
          />
        </div>
        <div className={'userCol'}>
          <h3>
            {!props.prevUser
              ? "My Enroller"
              : props.prevUser.first_name +
                " " +
                props.prevUser.last_name +
                "'s Enroller"}
          </h3>
          <p>
            <label>Username</label>
            <span>{props.user.username}</span>
          </p>
          <p>
            <label>Name</label>
            <span>{props.user.first_name + " " + props.user.last_name}</span>
          </p>
          <p>
            <label>Email</label>
            <span>{props.user.email}</span>
          </p>
          <p>
            <label>Phone</label>
            <span>{props.user.phone}</span>
          </p>
        </div>
      </div>
    </Card>
  )

}

const Wrapper = styled.div`
.loadingRoot {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cardContent {
  display: flex;
  margin: -8px -16px;
  @media (max-width: 480px) {
    flex-direction: column;
  }
  .infoCol {
    padding: 0 8px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;    
    @media (max-width: 480px) {
      width: 100%;
      text-align: center;
    }
    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
    }
  }  
  .userCol {
    padding: 0 8px;
    width: calc(100% - 100px);
    @media (max-width: 480px) {
      padding-top: 8px;
      width: 100%;
    }
    h3 {
      margin: 0 0 12px 0;
      font-size: 18px;
    }
    p {
      margin: 0;
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
      width: 100%;
    }
    label {
      color: ${props=>props.theme.palette.secondaryText};
    }
  }  
}
.noContent {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${props=>props.theme.palette.secondaryText};
}
`
