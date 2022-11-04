import React, { useState, useEffect } from "react";
import { 
  Row, Col, Modal, Popconfirm,
  Button, Input, Select, FormItem, 
  SuccessNotification 
} from "components/common";
import { varOptions, varIsIn } from 'common/var'
import { callPutApiWithAuth } from 'utils/api'
import { Wrapper } from "./EditModal.styled";

export default function EditModal(props) {
  const [formData, setFormData] = useState({
    quantity: 1,
    pay_cycle: ''
  })
  const [isUpdating, setIsUpdating] = useState(false)

  const onUpdateDone = (res) => {
    SuccessNotification(res.message)
    setIsUpdating(false)
    props.setShouldLoad(true)
    props.setIsEdition(false)
  }
  const onUpdateFail = () => {
    setIsUpdating(false)
  }
  const handleUpdate = () => {
    setIsUpdating(true)
    callPutApiWithAuth(`my_account/subscription/${props.data.id}`, 
      formData, onUpdateDone, onUpdateFail
    )
  }

  useEffect(() => {
    setFormData({ 
      ...formData,
      quantity: props.data.quantity,
      pay_cycle: props.data.pay_cycle,
    })
  }, [props.data])

  return (
    <Modal
      width={480}
      onCancel={()=>props.setIsEdition(false)}
    >
      <Wrapper>
        <div className="modal-title-container">Edit Subscription</div>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <div className="input-container">
              <FormItem label={"Product name"}>
                <Input 
                  value={props.data.product.title}
                  disabled
                />
              </FormItem>
            </div>
          </Col>
          {varIsIn('product.type', props.data.product.type, ['physical', 'ticket']) ? 
          <>
            <Col xs={24} sm={12}>
              <div className="input-container">
                <FormItem label={"Quantity"}>
                  <Input type='number'
                    value={formData.quantity}
                    onChange={e=>setFormData({...formData, quantity:e.target.value})}
                    style={{ width: "100%" }}
                  />
                </FormItem>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="input-container">
                <FormItem label={"Frequency"}>
                  <Select
                    value={formData.pay_cycle}
                    onChange={v=>setFormData({...formData, pay_cycle:v})}
                    options={varOptions('subscription.payCycle').filter(el => {
                      return props.data.product.pay_cycles.filter(el2 => (
                        el2*1 === el.value
                      )).length>0
                    })}
                    style={{ width: "100%" }}
                  />
                </FormItem>
              </div>
            </Col>
          </>
          : 
          <>
            <Col xs={24}>
              <div className="input-container">
                <FormItem label={"Frequency"}>
                  <Select
                    value={formData.pay_cycle}
                    onChange={v=>setFormData({...formData, pay_cycle:v})}
                    options={varOptions('subscription.payCycle').filter(el => {
                      return props.data.product.pay_cycles.filter(el2 => (
                        el2*1 === el.value
                      )).length>0
                    })}
                    style={{ width: "100%" }}
                  />
                </FormItem>
              </div>
            </Col>
          </>
          }
          <Col span={24}>
            <div className="action-btn">
              <Popconfirm onConfirm={handleUpdate}>
                <Button loading={isUpdating}>
                  Update Subscription
                </Button>
              </Popconfirm>              
            </div>
          </Col>
        </Row>
      </Wrapper>
    </Modal>
  );
}
