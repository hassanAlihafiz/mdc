import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from 'moment'
import { 
  Row, Col, Spin, Tabs,
  TextArea, Button, Popconfirm, 
  SuccessNotification, message 
} from "components/common";
import { varLabel } from 'common/var'
import { 
  callGetApiWithAuth,
  callPostApiWithAuth,
  callDeleteApiWithAuth 
} from 'utils/api'
import NoPhotoIcon from "assets/images/user.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";

export default function CommentDrawer({ selectedUser }) {
  const [comments, setComments] = useState([])
  const [formData, setFormData] = useState({
    comment: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const onGetComments = (res) => {
    setComments(res.data)
    setIsLoading(false)
  }
  const onFailComments = () => {
    setIsLoading(false)
  }
  const loadComments = () => {
    setIsLoading(true)
    let params = {}
    if (selectedUser.type) {
      params.user_id = selectedUser.id
    } else {
      params.prospect_id = selectedUser.id
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`contact_manager/comments?${q}`, 
      onGetComments, onFailComments
    )
  }

  const onSubmitDone = (res) => {
    SuccessNotification(res.message)
    setIsCreating(false)
    loadComments()
    setFormData({
      comment: ''
    })
  }
  const onSubmitFail = () => {
    setIsCreating(false)
  }
  const handleAdd = () => {
    // Validation
    if (!formData.comment) {
      message.error('Please input comment')
      return
    }

    let body = {
      ...formData
    }
    if (selectedUser.type) {
      body.user_id = selectedUser.id
    } else {
      body.prospect_id = selectedUser.id
    }
    callPostApiWithAuth(`contact_manager/comment`, body, 
      onSubmitDone, onSubmitFail
    )    
  }

  useEffect(() => {
    loadComments()
  }, [selectedUser])

  return (
    <Wrapper>
      <div className="user-details">
        <div className="details-container">
          <img src={selectedUser.image || NoPhotoIcon} />
          <div className="extra-info">
            <div className="name">
              {`${selectedUser.first_name} ${selectedUser.last_name}`}
            </div>
            <div className="type">
              {selectedUser.type?
                varLabel('user.type', selectedUser.type)
              : 'Prospect User'}
            </div>
          </div>
        </div>        
        <Row gutter={[10, 0]}>
          <Col xs={24} md={12}>
            <div className="email-container">
              Email:
              <span>{selectedUser.email}</span>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="email-container">
              Phone:
              <span>{selectedUser.phone}</span>
            </div>
          </Col>
        </Row>
      </div>
      <Tabs>
        <Tabs.TabPane
          tab={'Comments'}
          key={'comments'}
        />
      </Tabs>
      {isLoading?
        <Spin spinning={true} />
      :
        <div className="comment-container">
          <Row gutter={[10, 10]}>
            {comments.map(el => (
              <Col span={24} key={el.id}>
                <CommentSection data={el}
                  loadComments={loadComments}
                />
              </Col>
            ))}
          </Row>
        </div> 
      }      
      <div className="comment-input-container">
        <div className="input-label">Comment</div>
        <TextArea rows={3} 
          value={formData.comment}
          onChange={e => 
            setFormData({...formData, comment: e.target.value})
          }
        />
        <div className="comment-button">
          <Popconfirm onConfirm={handleAdd}>
            <Button loading={isCreating}>Add Comment</Button>
          </Popconfirm>
        </div>
      </div>
    </Wrapper>
  );
}

const CommentSection = ({ 
  data, loadComments
}) => {
  const onDeleteDone = (res) => {
    loadComments()
    SuccessNotification(res.message)
  }
  const handleDelete = () => {
    callDeleteApiWithAuth(`contact_manager/comment/${data.id}`, 
      onDeleteDone
    )
  }

  return (
    <>
      <div className="comment-col">
        <div className="comment">
          {data.comment}
        </div>
        <div className="comment-icons">
          {/* <EditIcon /> */}
          <Popconfirm onConfirm={handleDelete}>
            <DeleteIcon />
          </Popconfirm>
        </div>
      </div>
      <div className="comment-date">
        {moment(data.updated_at).format('MMM DD, YYYY')}
      </div>
    </>
  )
}

const Wrapper = styled.div`
  padding: 24px;
  .user-details {
    background: #fafbfc;
    padding: 15px;
    .details-container {
      display: flex;
      align-items: center;
      img {
        width: 90px;
        height: 90px;
        margin-right: 15px;
        object-fit: cover;
        border-radius: 50%;
        border: 1px solid ${props=>props.theme.palette.link};
      }
      .extra-info {
        .type {
          font-weight: normal;
          font-size: 14px;
          margin-bottom: 5px;
        }
        .name {
          font-weight: 600;
          font-size: 14px;
        }
      }
    }
    .email-container {
      font-weight: normal;
      font-size: 14px;
      margin-top: 15px;
      span {
        color: #7f8fa3;
        margin-left: 7px;
      }
    }
  }
  .comment-container {
    border: 1px solid rgba(127, 143, 163, 0.33);
    padding: 12px;
    background: #FAFBFC;
    min-height: 320px;
    .comment-col {
      background: #f2f2f2;
      padding: 12px 20px;
      .comment {
        font-weight: normal;
        font-size: 12px;
      }
      .comment-icons {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        svg {
          width: 10px;
          margin-left: 10px;
          margin-top: 3px;
          path {
            fill: #5b5b5b;
          }
        }
      }
    }
    .comment-date {
      text-align: end;
      font-weight: normal;
      font-size: 12px;
      color: #7f8fa3;
      margin-top: 5px;
    }
  }
  .comment-input-container {
    margin-top: 20px;
    .input-label {
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      color: #7f8fa3;
      margin-bottom: 8px;
    }
    .comment-button {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 10px;
      button {
      }
    }
  }
`;
