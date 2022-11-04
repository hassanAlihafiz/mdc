import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import {
  Modal, Row, Col, FormItem, 
  Radio, Button, AutoComplete, TextArea, Input,
  Popconfirm, SuccessNotification
} from 'components/common'
import { varValue, varIs } from 'common/var'
import { 
  callGetApiWithAuth, callPostApiWithAuth 
} from 'utils/api'

export default function SendModal(props) {  
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    receiver_type: varValue('giftTransferHistory.receiverType', 'new'),
    receiver_first_name: '',
    receiver_last_name: '',
    receiver_email: '',
    receiver_phone: '',
    receiver_id: '',
    amount: '',
    message: ''
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [users, setUsers] = useState([])
  const [errorMessages, setErrorMessages] = useState([])

  const onFormInput = (field, value) => {
    setFormData({ 
      ...formData,
      [field]: value
    })
  }

  const onSearchDone = (res) => {
    setUsers(res.data)
  }
  const onSearchUser = (v) => {
    callGetApiWithAuth(`common/search_enroll_downline/${v}`, onSearchDone)
  }

  const onSelectUser = (_, option) => {
    let receiver = null
    users.forEach(el => {
      if (el.id==option.key) {
        receiver = el
      }
    })
    setFormData({
      ...formData, receiver_id: receiver.id
    })
  }

  const onSubmitDone = (res) => {
    setIsUpdating(false)
    SuccessNotification(res.message)
    dispatch({ type: 'auth.RELOAD' })
    props.setShouldLoad(true)
    props.setModalMode(undefined)
  }
  const onSubmitFail = () => {
    setIsUpdating(false)
  }
  const handleSubmit = () => {
    // Validation
    let isValid = true
    const errorMessages0 = []
    if (isNaN(formData.amount) || 
      formData.amount<=0
    ) {
      isValid = false
      errorMessages0.push({
        type: 'amount',
        message: 'Please input amount as number'
      })
    }
    if (varIs('giftTransferHistory.receiverType', formData.receiver_type, 'new')) {
      if (!formData.receiver_first_name) {
        isValid = false 
        errorMessages0.push({
          type: 'receiver_first_name',
          message: 'Please input first name'
        })
      }
      if (!formData.receiver_last_name) {
        isValid = false 
        errorMessages0.push({
          type: 'receiver_last_name',
          message: 'Please input last name'
        })
      }
      if (!formData.receiver_phone) {
        isValid = false 
        errorMessages0.push({
          type: 'receiver_phone',
          message: 'Please input phone'
        })
      }
      if (!formData.receiver_email) {
        isValid = false 
        errorMessages0.push({
          type: 'receiver_email',
          message: 'Please input email'
        })
      }
    } else {
      if (!formData.receiver_id) {
        isValid = false 
        errorMessages0.push({
          type: 'receiver_id',
          message: 'Please select receiver'
        })
      }
    }
    if (!formData.message) {
      isValid = false 
      errorMessages0.push({
        type: 'message',
        message: 'Please input message'
      })
    }

    setErrorMessages(errorMessages0)
    if (!isValid) return

    setIsUpdating(true)
    callPostApiWithAuth(`my_account/gift_wallet/transfer`, formData, 
      onSubmitDone, onSubmitFail
    )
  }

  return (
    <Modal
      title={`Send Gift`}
      onCancel={()=>props.setModalMode(undefined)}
    >
      <Row gutter={[12, 12]}>
        <Col xs={24}>
          <FormItem label={'Receiver Type'}>
            <Radio.Group value={formData.receiver_type}
              onChange={e=>onFormInput('receiver_type', e.target.value)}
            >
              <Radio value={varValue('giftTransferHistory.receiverType', 'new')}>
                New
              </Radio>
              <Radio value={varValue('giftTransferHistory.receiverType', 'existing')}>
                Existing
              </Radio>
            </Radio.Group>
          </FormItem>
        </Col>
        {varIs('giftTransferHistory.receiverType', formData.receiver_type, 'new') && 
        <Col xs={12}>
          <FormItem label={'Receiver First Name'}
            errorMessages={errorMessages.filter(el=>el.type=='receiver_first_name')}
          >
            <Input value={formData.receiver_first_name}
              onChange={e=>onFormInput('receiver_first_name', e.target.value)}
            />
          </FormItem>
        </Col>
        }
        {varIs('giftTransferHistory.receiverType', formData.receiver_type, 'new') && 
        <Col xs={12}>
          <FormItem label={'Receiver Last Name'}
            errorMessages={errorMessages.filter(el=>el.type=='receiver_last_name')}
          >
            <Input value={formData.receiver_last_name}
              onChange={e=>onFormInput('receiver_last_name', e.target.value)}
            />
          </FormItem>
        </Col>
        }
        {varIs('giftTransferHistory.receiverType', formData.receiver_type, 'new') && 
        <Col xs={12}>
          <FormItem label={'Receiver Email'}
            errorMessages={errorMessages.filter(el=>el.type=='receiver_email')}
          >
            <Input value={formData.receiver_email}
              onChange={e=>onFormInput('receiver_email', e.target.value)}
            />
          </FormItem>
        </Col>
        }
        {varIs('giftTransferHistory.receiverType', formData.receiver_type, 'new') && 
        <Col xs={12}>
          <FormItem label={'Receiver Phone'}
            errorMessages={errorMessages.filter(el=>el.type=='receiver_phone')}
          >
            <Input value={formData.receiver_phone}
              onChange={e=>onFormInput('receiver_phone', e.target.value)}
            />
          </FormItem>
        </Col>
        }
        {varIs('giftTransferHistory.receiverType', formData.receiver_type, 'existing') && 
        <Col xs={24}>
          <FormItem label={'Receiver'}
            errorMessages={errorMessages.filter(el=>el.type=='receiver_id')}
          >
            <AutoComplete 
              onChange={onSearchUser}
              options={users.map(el => ({
                key: el.id,
                label: `${el.first_name} ${el.last_name}`,
                value: `${el.first_name} ${el.last_name}`,
              }))}
              style={{width: '100%'}}
              onSelect={onSelectUser}
              placeholder={'Search by User ID'}
            />
          </FormItem>
        </Col>
        }
        <Col xs={24}>
          <FormItem label={'Amount'}
            errorMessages={errorMessages.filter(el=>el.type=='amount')}
          >
            <Input type='number'
              value={formData.amount}
              onChange={e=>onFormInput('amount', e.target.value)}
            />
          </FormItem>
        </Col>
        <Col xs={24}>
          <FormItem label={'Message'}
            errorMessages={errorMessages.filter(el=>el.type=='message')}
          >
            <TextArea
              value={formData.message}
              onChange={e=>onFormInput('message', e.target.value)}
            />
          </FormItem>
        </Col>
      </Row>
      <div className='action-root'>
        <Popconfirm onConfirm={handleSubmit}>
          <Button loading={isUpdating}>
            Send
          </Button>
        </Popconfirm>
      </div>
    </Modal>
  )
}

const Wrapper = styled.div`
`
