import React, { useState, useEffect } from "react";
import { 
  Row, Col, FormItem, Modal,
  Button, Input, Select,
  SuccessNotification, Popconfirm, message
} from "components/common";
import { varOptions } from 'common/var'
import { callGetApiWithAuth, callPostApiWithAuth } from "utils/api";
import { ReactComponent as AddIcon } from "assets/icons/addRound.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/deleteRed.svg";
import { Wrapper } from "./AddModal.styled";

export default function AddModal(props) {
  const [formData, setFormData] = useState({
    title: ''
  })
  const [details, setDetails] = useState([{
    product: undefined, product_id: '',
    quantity: 1, pay_cycle: 0
  }])
  const [productOptions, setProductOptions] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)

  const onGetProductOptions = (res) => {
    setProductOptions(res.data)
  }
  const loadProductOptions = () =>{
    callGetApiWithAuth(`my_website/share_cart/products`, 
      onGetProductOptions
    )
  }
  
  const addRow = () => {
    const details0 = [...details]
    details0.push({
      product: undefined, product_id: '',
      quantity: 1, pay_cycle: 0
    })
    setDetails(details0)
  }

  const removeRow = (index) => {
    const details0 = details.filter((_, index0) => index!=index0)
    setDetails(details0)
  }

  const onDetailInput = (index, field, value) => {
    let details0 = [...details]
    details0[index][field] = value
    if (field==='product_id') {
      let product = undefined
      productOptions.forEach(el => {
        if (el.id === value) {
          product = el
        }
      })
      details0[index]['product'] = product
    }
    setDetails(details0)
  }

  const onSubmitDone = (res) => {
    setIsUpdating(false)
    SuccessNotification(res.message)
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_CORP_URL}/share-cart?h=${res.data.hash_code}`
    );
    props.setShouldLoad(true)
    props.setModalMode(undefined)
  }
  const onSubmitFail = () => {
    setIsUpdating(false)
  }
  const handleSubmit = () => {
    // Validation    
    if (!formData.title) {
      message.error('Please input title')
      return
    }
    for (let el of details) {
      if (!el.product) {
        message.error('Please select product')
        return
      }
      if (!isNaN(el.quantity) && 
        el.quantity<=0
      ) {
        message.error('Please input qty greater than zero')
        return
      }
    }

    setIsUpdating(true)
    const body = {
      ...formData,
      details
    }
    callPostApiWithAuth(`my_website/share_cart`, body, 
      onSubmitDone, onSubmitFail
    )
  }

  useEffect(() => {
    loadProductOptions()
  }, [])

  return (
    <Modal title='Create Sharable Cart'
      width={900}
      onCancel={() => props.setModalMode(undefined)}
    >
      <Wrapper>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <div className="input-container">
              <FormItem label={"Cart name"}>
                <Input placeholder="Enter Cart name"
                  value={formData.title}
                  onChange={e=>setFormData({...formData, title: e.target.value})}
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={24}>
            {details.map((el, index) => (
              <Row gutter={[15, 15]} className="product-row">
                <Col xs={24} sm={8}>
                  <div className="input-container">
                    <FormItem label={"Product"}>
                      <Select
                        value={el.product_id}
                        onChange={v=>onDetailInput(index, 'product_id', v)}
                        options={productOptions.map(el2 => ({
                          label: el2.title,
                          value: el2.id
                        }))}
                        style={{ width: "100%" }}
                      />
                    </FormItem>
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className="input-container">
                    <FormItem label={"Unit Price"}>
                      <Input value={
                        el.product?
                          el.pay_cycle===0?el.product.member_price
                          : el.product.recurring_price
                        : 0} 
                        disabled 
                      />
                    </FormItem>
                  </div>
                </Col>{" "}
                <Col xs={12} sm={3}>
                  <div className="input-container">
                    <FormItem label={"QTY"}>
                      <Input type='number'
                        value={el.quantity}
                        onChange={e=>onDetailInput(index, 'quantity', e.target.value)}
                      />
                    </FormItem>
                  </div>
                </Col>
                <Col xs={12} sm={7}>
                  <div className="input-container">
                    <FormItem label={"Frequency"}>
                      <Select
                        value={el.pay_cycle}
                        options={                          
                          el.product?[
                            { label: 'None', value: 0 },
                            ...el.product.pay_cycles.map(el2 => ({
                              label: el2*1===1?'Annual':`Every ${el2} Days`,
                              value: el2
                            }))
                          ] : [
                            { label: 'None', value: 0 },
                          ]
                        }
                        onChange={v=>onDetailInput(index, 'pay_cycle',v)}
                        style={{ width: "100%" }}
                      />
                    </FormItem>
                  </div>
                </Col>
                <Col xs={4} sm={2}>
                  <div className="icon-container">
                    {index === details.length - 1 ? (
                      <AddIcon onClick={()=>addRow()} />
                    ) : (
                      <DeleteIcon
                        onClick={() => removeRow(index)}
                      />
                    )}
                  </div>
                </Col>
              </Row>
            ))}
          </Col>{" "}
          <Col span={24}>
            <div className="action-btn">
              <Popconfirm onConfirm={handleSubmit}>
                <Button loading={isUpdating}>
                  Create and Copy Url
                </Button>
              </Popconfirm>
            </div>
          </Col>
        </Row>
      </Wrapper>
    </Modal>    
  );
}
