import React, { useState } from 'react'
import styled from 'styled-components'
import { 
  Modal, FormItem, 
  Input, Button, 
  Popconfirm, SuccessNotification, message 
} from "components/common"
import { callPutApiWithAuth } from 'utils/api'

export default function PasswordModal(props) {
  const [formData, setFormData] = useState({
    old_password: '',
    password: '', passwordConfirm: ''
  })
  const [isUpdating, setIsUpdating] = useState(false)

  const onUpdateDone = (res) => {
    setIsUpdating(false)
    SuccessNotification(res.message)
    props.setModalMode(undefined)
  }
  const onUpdateFail = () => {
    setIsUpdating(false)
  }
  const handleUpdate = () => {
    // Validation
    if (!formData.old_password || 
      !formData.password || 
      !formData.passwordConfirm
    ) {
      message.error('Please input all required fields')
      return
    }
    if (formData.password != formData.passwordConfirm) {
      message.error('Please input password same as confirm')
      return
    }
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
    if (regex.exec(formData.password) == null) {
      message.error("Password should contain uppercase, lowercase, numeric, special characters and longer than 8 characters.")
      return
    }
    
    setIsUpdating(true)
    callPutApiWithAuth(`my_account/setting/password`, formData, 
      onUpdateDone, onUpdateFail
    )
  }

  return (
    <Modal
      onCancel={()=>props.setModalMode(undefined)}
      title={'Change Password'}
    >
      <Wrapper>
        <FormItem label={'Current Password*'}>
          <Input type='password'
            value={formData.old_password}
            onChange={e=>setFormData({...formData, old_password:e.target.value})}
          />
        </FormItem>
        <FormItem label={'New Password*'}>
          <Input type='password'
            value={formData.password}
            onChange={e=>setFormData({...formData, password:e.target.value})}
          />
        </FormItem>
        <FormItem label={'New Password(Confirm)*'}>
          <Input type='password'
            value={formData.passwordConfirm}
            onChange={e=>setFormData({...formData, passwordConfirm:e.target.value})}
          />
        </FormItem>
        <div className='action-root'>
          <Popconfirm onConfirm={handleUpdate}>
            <Button loading={isUpdating}>
              Update
            </Button>
          </Popconfirm>          
        </div>
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
.action-root {
  margin-top: 12px;
}
`
