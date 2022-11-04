import { useEffect, useState } from "react"
import { Button, Input, notification, Select } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { callGetApiWithAuth, callPostApiWithAuth, callPutApiWithAuth } from "utils/api"
import { countryStates, statesByCountry } from "common/country"

export default function ShippingForm(props) {
  const [shippingAddressOptions, setShippingAddressOptions] = useState([])
  const [formData, setFormData] = useState({ id: "" })
  const [states, setStates] = useState([])
  const [isEditable, setIsEditable] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [errors, setErrors] = useState({
    shipping_country_error: '',
    shipping_state_error: '',
    shipping_city_error: '',
    shipping_address_error: '',
    shipping_zipcode_error: '',
  })

  const onChangeForm = (field, value) => {
    let formData_ = { ...formData, [field]: value }
    setFormData(formData_)
  }

  const validateForm = () => {
    let errors_ = {
      shipping_country_error: '',
      shipping_state_error: '',
      shipping_city_error: '',
      shipping_address_error: '',
      shipping_zipcode_error: '',
    }

    if ((props.shippingData.id && isEditable) || !props.shippingData.id) {
      if (!formData.shipping_country.trim()) {
        errors_['shipping_country_error'] = "Required"
      }
      if (!formData.shipping_state.trim()) {
        errors_['shipping_state_error'] = "Required"
      }
      if (!formData.shipping_city.trim()) {
        errors_['shipping_city_error'] = "Required"
      } else if (formData.shipping_city.length>190) {
        errors_['shipping_city_error'] = "Shipping city length too long"
      }
      if (!formData.shipping_address.trim()) {
        errors_['shipping_address_error'] = "Required"
      } else if (formData.shipping_address.length>190) {
        errors_['shipping_address_error'] = "Shipping address length too long"
      }
      if (!formData.shipping_zipcode.trim()) {
        errors_['shipping_zipcode_error'] = "Required"
      }
    }

    if (errors_.shipping_country_error || errors_.shipping_state_error || errors_.shipping_city_error || errors_.shipping_address_error ||  errors_.shipping_zipcode_error )  {
      setErrors(errors_)
      return true
    }

    setErrors(errors_)
    return false
  }

  const onSuccessUpdated = () => {
    setIsUpdating(false)
    setIsUpdated(true)
    notification.success({
      message: "Success",
      description: "Shipping Address has been updated."
    })
    loadShippingAddresses()
  }

  const onFailedUpdate = (err) => {
    setIsUpdating(false)
    notification.error({
      message: "Failed",
      description: err
    })
  }

  const handleUpdate = () => {
    if (validateForm()) return
    setIsUpdating(true)
    if (props.shippingData.id) {
      callPutApiWithAuth(`my_account/setting/shipping_detail/${props.shippingData.id}`, formData, onSuccessUpdated, onFailedUpdate)
    } else {
      callPostApiWithAuth(`my_account/setting/shipping_detail`, formData, onSuccessUpdated, onFailedUpdate)
    }
  }

  const handleContinue = () => {
    setErrors({
      shipping_country_error: '',
      shipping_state_error: '',
      shipping_city_error: '',
      shipping_address_error: '',
      shipping_zipcode_error: '',
    })
    props.getShippingAndTaxPrice()
  }

  const handleClickEditIcon = () => {
    setIsEditable(!isEditable)
  }
  
  const onGetSuccessShippingAddresses = ({ data }) => {
    if (data && data.length === 2) {
      setShippingAddressOptions(data.map((el) => ({
        ...el,
        value: el.id,
        label: el.name
      })))
    } else {
      setShippingAddressOptions([
        ...data.map((el) => ({
          ...el,
          value: el.id,
          label: el.name
        })),
        {
          value: "",
          key: "new",
          label: "New Shipping Address",
          id: "",
          shipping_address: '', 
          shipping_address_line2: '',
          shipping_city: '', 
          shipping_state: '',
          shipping_zipcode: '', 
          shipping_country: ''
        }
      ])
    }
  }

  const onGetFailedShippingAddresses = () => {
    setShippingAddressOptions([
      {
        value: "",
        key: "new",
        label: "New Shipping Address",
        id: "",
        shipping_address: '', 
        shipping_address_line2: '',
        shipping_city: '', 
        shipping_state: '',
        shipping_zipcode: '', 
        shipping_country: ''
      }
    ])
  }

  const loadShippingAddresses = () => {
    callGetApiWithAuth("shop/get_shipping_details", onGetSuccessShippingAddresses, onGetFailedShippingAddresses)
  }

  useEffect(() => {
    setStates(statesByCountry(formData.shipping_country))
  }, [formData.shipping_country])

  useEffect(() => {
    if (shippingAddressOptions.length > 0) {
      props.setShippingData({
        id: shippingAddressOptions.filter((el) => el.is_primary*1 === 1)[0]?.id || ""
      })
    } else {
      props.setShippingData({
        id: ""
      })
    }
  }, [shippingAddressOptions])

  useEffect(() => {
    setIsEditable(false)
    if (shippingAddressOptions.length > 0 && props.shippingData.id) {
      let formData_ = shippingAddressOptions.filter((el) => el.value*1 === props.shippingData.id*1)[0]
      setFormData(formData_)
    } else {
      setFormData({
        shipping_address: "", 
        shipping_address_line2: "",
        shipping_city: "", 
        shipping_state: "",
        shipping_zipcode: "", 
        shipping_country: ""
      })
    }
  }, [shippingAddressOptions, props.shippingData.id])

  useEffect(() => {
    if (isEditable) {
      setIsUpdated(false)
    } else {
      setIsUpdated(true)
    }
  }, [isEditable])

  useEffect(() => {
    loadShippingAddresses()
  }, [])

  return (
    <div className='checkout-form'>
      <h4 className='checkout-title'>
        Shipping Address
      </h4>
      <div className='row'>
        <div className='col-xs-12 col-sm-6 col-md-12 col-lg-6 selectdiv no-padding'>
          <label>Select Your Shipping Address*</label><br/>
          <Select 
            value={props.shippingData.id}
            onChange={(value)=>props.setShippingData({ id: value })}
            size='large'
            options={shippingAddressOptions}
          />
          <br/>
        </div>
        {props.shippingData.id &&
          <div className='col-xs-12 col-sm-6 col-md-12 col-lg-6 selectdiv no-padding edit'>
            {isEditable ?
              <Button
                type="primary"
                className='btn btn-primary'
                onClick={handleClickEditIcon}
              >
                Cancel
              </Button>
              :
              <Button
                type="primary"
                className='btn btn-primary'
                onClick={handleClickEditIcon}
                icon={<EditOutlined />}
              >
                Edit
              </Button>
            }
            <br/>
          </div>
        }
      </div>
      <div className='row'>
        <div className='col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding'>
          <label>Address Line 1*</label><br/>
          <Input
            type='text'
            value={formData.shipping_address} 
            onChange={(e) => onChangeForm('shipping_address', e.target.value)}
            disabled={props.shippingData.id && !isEditable}
          />
          <br/>
          {errors.shipping_address_error &&
            <label className="input-error">{errors.shipping_address_error}</label>
          }
        </div>
        <div className='col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding'>
          <label>Address Line 2</label><br/>
          <Input
            type='text'
            value={formData.shipping_address_line2} 
            onChange={e=>onChangeForm('shipping_address_line2', e.target.value)}
            disabled={props.shippingData.id && !isEditable}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding'>
          <label>City*</label><br/>
          <Input
            type='text'
            value={formData.shipping_city} 
            onChange={(e) => onChangeForm('shipping_city', e.target.value)}
            disabled={props.shippingData.id && !isEditable}
          />
          <br/>
          {errors.shipping_city_error &&
            <label className="input-error">{errors.shipping_city_error}</label>
          }
        </div>
        <div className='col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding'>
          <label>Zip/Postal Code*</label><br/>
          <Input
            type='text'
            value={formData.shipping_zipcode} 
            onChange={(e) => onChangeForm('shipping_zipcode', e.target.value)}
            size='large'
            disabled={props.shippingData.id && !isEditable}
          />
          <br/>
          {errors.shipping_zipcode_error &&
            <label className="input-error">{errors.shipping_zipcode_error}</label>
          }
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12 col-sm-6 col-md-12 col-lg-6 selectdiv no-padding'>
          <label>Country*</label><br/>
          <Select 
            value={formData.shipping_country}
            onChange={(value)=>onChangeForm('shipping_country', value)}
            size='large'
            showSearch
            disabled={props.shippingData.id && !isEditable}
            options={[
              { 
                label: 'Select Country', 
                value: ''
              },
              ...countryStates.map(el => ({
                label: el.name,
                value: el.code2
              }))
            ]}
          />
          <br/>
          {errors.shipping_country_error &&
            <label className="input-error">{errors.shipping_country_error}</label>
          }
        </div>
        <div className='col-xs-12 col-sm-6 col-md-12 col-lg-6 selectdiv no-padding'>
          <label>State/Province*</label><br/>
          <Select 
            value={formData.shipping_state}
            onChange={(value) => onChangeForm('shipping_state', value)}
            size='large'
            showSearch
            disabled={props.shippingData.id && !isEditable}
            options={[
              { 
                label: 'Select State', 
                value: ''
              },
              ...statesByCountry(formData.shipping_country).map(el => ({
                label: el.name,
                value: el.name
              }))
            ]}
          />
          <br/>
          {errors.shipping_state_error &&
            <label className="input-error">{errors.shipping_state_error}</label>
          }
        </div>
      </div>
      <div className='row action-row'>
        <div className='col-12 d-flex justify-content-end'>
          {(isUpdated && props.shippingData.id) ?
            <Button loading={props.isLoading} type="primary" className='btn btn-primary' onClick={handleContinue}>Continue</Button>
            :
            <Button loading={isUpdating} type="primary" className='btn btn-primary' onClick={handleUpdate}>Update</Button>
          }
        </div>
      </div>
    </div>
  )
}