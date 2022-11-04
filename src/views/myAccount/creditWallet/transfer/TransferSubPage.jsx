import React, { useState } from "react";
import { 
  Row, Col, 
  Button, Input, AutoComplete,
  Popconfirm, SuccessNotification, message
} from "components/common";
import { 
  callGetApiWithAuth, callPostApiWithAuth
} from 'utils/api'
import { Wrapper } from "./TransferSubPage.styled";

export default function TransferSubPage() {
  const [downliners, setDownliners] = useState([])
  const [formData, setFormData] = useState({
    amount: '', receiver_id: ''
  })
  const [isSending, setIsSending] = useState(false)

  const onSearchDone = (res) => {
    setDownliners(res.data)
  }
  const onSearchDownline = (v) => {
    callGetApiWithAuth(`common/search_enroll_downline/${v}`, onSearchDone)
  }
  const onSelectDownline = (_, option) =>{
    let receiver = null
    downliners.forEach(el => {
      if (el.id==option.key) {
        receiver = el
      }
    })
    setFormData({
      ...formData, receiver_id: receiver.id
    })
  }

  const onSentDone = (res ) => {
    setIsSending(false)
    SuccessNotification(res.message)
  }
  const onSentFail = () => {
    setIsSending(false)
  }
  const handleSend = () => {
    // Validation
    if (!formData.amount || isNaN(formData.amount)) {
      message.error('Please input amount as number')
      return
    }
    if (formData.amount<=0) {
      message.error('Please input amount larger than zero')
      return
    }
    if (!formData.receiver_id) {
      message.error('Please select receiver user')
      return
    }
    
    // DO
    callPostApiWithAuth(`my_account/wallet/transfer`, formData,
      onSentDone, onSentFail
    )
    setIsSending(true)
  }

  return (
    <Wrapper>
      <div className="issue-credit-title">Transfer Credit</div>
      <Row gutter={[15, 0]}>
        <Col>
          <div className="issue-label">Receiver Username:</div>
        </Col>
        <Col>
          <div className="issue-input-container">
            <AutoComplete 
              onChange={onSearchDownline}
              options={downliners.map(el => ({
                key: el.id,
                label: `${el.first_name} ${el.last_name}`,
                value: `${el.first_name} ${el.last_name}`,
              }))}
              style={{width: 250}}
              onSelect={onSelectDownline}
              placeholder={'Search by User ID'}
            />
          </div>
          <div className='issue-input-comment'>
            {'* Receiver should be downliner of your enroll-tree'}
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]} className="amount-row">
        <Col>
          <div className="issue-label">Amount:</div>
        </Col>
        <Col>
          <div className="issue-input-container">
            <Input type='number' 
              value={formData.amount} 
              onChange={e=>setFormData({...formData, amount: e.target.value})}
            />
          </div>
        </Col>
      </Row>
      <div className="send-btn">
        <Popconfirm onConfirm={handleSend}>
          <Button loading={isSending}>
            Send
          </Button>
        </Popconfirm>        
      </div>
    </Wrapper>
  );
}
