import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { 
  Row, Col, 
  Button, Input, Dropzone, Switch,
  Popconfirm, SuccessNotification, message
} from "components/common";
import NoPhotoIcon from "assets/images/user.svg";
import { UploadOutlined } from "@ant-design/icons";
import { callPostApiWithAuth, callPutApiWithAuth } from 'utils/api'
import { ReactComponent as LockIcon } from "assets/icons/lock.svg";
import PasswordModal from "./PasswordModal";
import { Wrapper } from "./ProfileSubPage.styled";

export default function ProfileSubPage() {
  const dispatch = useDispatch()
  const myUser = useSelector(state=>state.auth.user)
  const [formData, setFormData] = useState({
    first_name: '', last_name: '',
    username: '', uuid: '',
    email: '', phone: '',
    image: undefined,
    imageFile: null
  })
  const [modalMode, setModalMode] = useState(undefined)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showContactInfo, setShowContactInfo] = useState(1)

  const onChangeFile = (files) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      setFormData({ 
        ...formData,
        image: fileReader.result,
        imageFile: files[0]
      })
    };
  }

  const onUpdateDone = (res) => {
    SuccessNotification(res.message)
    setIsUpdating(false)
    dispatch({
      type: 'auth.RELOAD'
    })
  }

  const onUpdateFail = (res) => {
    setIsUpdating(false)
  }

  const handleUpdate = () => {
    // Validation
    if (!formData.first_name || 
      !formData.last_name || 
      !formData.email || 
      !formData.phone
    ) {
      message.error('Please input all required fields')
      return
    }
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i 
    if (emailRegex.exec(formData.email)==null) {
      message.error('Enter valid email')
      return
    }

    const body = new FormData()
    Object.keys(formData).map(k => {
      if (formData[k]) {
        let formValue = formData[k]
        if (k==='email') formValue = formValue.toLowerCase().trim()
        else if (k==='first_name') formValue = formValue.trim()
        else if (k==='last_name') formValue = formValue.trim()
        
        body.append(k, formValue)
      }
    })
    setIsUpdating(true)
    callPostApiWithAuth(`my_account/setting/profile`, body, 
      onUpdateDone, onUpdateFail
    )
  }

  const onUpdatedShowContact = (res) => {
    SuccessNotification(res.message)
    dispatch({ type: 'auth.RELOAD' })
  }
  const onChangeShowContactInfo = (checked) => {
    setShowContactInfo(checked?1:2)
    callPutApiWithAuth(`my_account/setting/show_contact_info`, 
      {show_contact_info: checked?1:2},
      onUpdatedShowContact
    )
  }

  useEffect(() => {
    setFormData({ 
      ...formData,
      first_name: myUser.first_name,
      last_name: myUser.last_name,
      username: myUser.username,
      uuid: myUser.uuid,
      email: myUser.email,
      phone: myUser.phone,
      image: myUser.image
    })
    setShowContactInfo(myUser.show_contact_info)
  }, [myUser])

  return (
    <Wrapper>
      <div className="image-upload-section">
        <img className='photo-img'
          src={formData.image || NoPhotoIcon} 
        />
        <div className="user-upload">
          <Dropzone
            onDrop={onChangeFile}
            accept='image/*'            
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </div>
            )}            
          </Dropzone>
        </div>
      </div>
      <Row gutter={[30, 20]} className="settings-row">
        <Col xs={24} md={12} xl={8} xxl={5}>
          <div className="select-container">
            <div className="label">First name*</div>
            <div className="select-box">
              <Input value={formData.first_name} 
                onChange={e=>setFormData({...formData, first_name:e.target.value})}
              />
            </div>
          </div>
        </Col>
        <Col xs={24} md={12} xl={8} xxl={5}>
          <div className="select-container">
            <div className="label">Last name*</div>
            <div className="select-box">
              <Input value={formData.last_name} 
                onChange={e=>setFormData({...formData, last_name:e.target.value})}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="settings-row">
        <Col xs={24} md={24} xl={16} xxl={10}>
          <div className="username-container">
            <div className="username">Username:</div>
            <div className="username-input">
              <Input disabled value={formData.username} suffix={<LockIcon />} />
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="settings-row">
        <Col xs={24} md={24} xl={16} xxl={10}>
          <div className="username-container">
            <div className="username">Account ID:</div>
            <div className="username-input">
              <Input disabled value={`#${formData.uuid}`} suffix={<LockIcon />} />
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="settings-row">
        <Col xs={24} md={24} xl={16} xxl={10}>
          <div className="username-container">
            <div className="username">Email*:</div>
            <div className="username-input">
              <Input value={formData.email} 
                onChange={e=>setFormData({...formData, email:e.target.value})}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="settings-row">
        <Col xs={24} md={24} xl={16} xxl={10}>
          <div className="username-container">
            <div className="username">Phone*:</div>
            <div className="username-input">
              <Input value={formData.phone} 
                onChange={e=>setFormData({...formData, phone:e.target.value})}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="settings-row">
        <Col xs={24} md={24} xl={16} xxl={10}>
          <div className="select-container">
            <div className="label">Contact Info Visibility</div>
            <div className="select-box">
              Show my contact info for enrollments:&nbsp;
              <Switch checked={showContactInfo===1} 
                onChange={onChangeShowContactInfo}
              />
            </div>
          </div>
        </Col>
      </Row>
      <div className="save-button">
        <Popconfirm onConfirm={handleUpdate}>
          <Button loading={isUpdating}>
            Save
          </Button>
        </Popconfirm>
      </div>
      <div className="change-button">
        <Button onClick={()=>setModalMode('password')}>
          Change Password
        </Button>
      </div>
      {modalMode==='password' && 
      <PasswordModal 
        setModalMode={setModalMode}
      />
      }
    </Wrapper>
  );
}
