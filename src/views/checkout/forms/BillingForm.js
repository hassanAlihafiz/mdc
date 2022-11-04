import { useEffect, useState } from "react"
import { Input, notification, Popconfirm, Select, Spin, Button } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { callGetApiWithAuth, callPostApiWithAuth, callPutApiWithAuth } from "utils/api"
import { countryStates, statesByCountry } from "common/country"
import { asPrice, asUsdPrice } from "utils/text"

export default function BillingForm(props) {
  const [creditBillingOptions, setCreditBillingOptions] = useState([])
  const [bankBillingOptions, setBankBillingOptions] = useState([])
  const [isEditable, setIsEditable] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [payTypeOptions, setPayTypeOptions] = useState([])
  const [creditFormErrors, setCreditFormErrors] = useState({
    billing_country_error: "",
    billing_state_error: "",
    billing_city_error: "",
    billing_address_error: "",
    billing_zipcode_error: "",
    cc_name_error: "",
    cc_type_error: "",
    cc_number_error: "",
    cc_cvv_error: "",
    cc_expiry_month_error: "",
    cc_expiry_year_error: ""
  })
  const [bankFormErrors, setBankFormErrors] = useState({
    billing_country_error: "",
    billing_state_error: "",
    billing_city_error: "",
    billing_address_error: "",
    billing_zipcode_error: "",
    bk_name_error : "",
    bk_bank_error : "",
    bk_account_error : "",
    bk_routing_error : ""
  })

  var d = new Date()
  var currentYear = d.getFullYear().toString().substr(-2) * 1
  var years = []
  for (let i = currentYear; i <= currentYear + 20; i++) {
    years.push(i)
  }

  const onChangeCreditForm = (field, value) => {
    let creditFormData_ = { ...props.creditFormData, [field]: value }
    props.setCreditFormData(creditFormData_)
  }

  const onChangeBankForm = (field, value) => {
    let bankFormData_ = { ...props.bankFormData, [field]: value }
    props.setBankFormData(bankFormData_)
  }
  
  const checkValid = () => {
    let creditFormErrors_ = {
      billing_country_error: "",
      billing_state_error: "",
      billing_city_error: "",
      billing_address_error: "",
      billing_zipcode_error: "",
      cc_name_error: "",
      cc_type_error: "",
      cc_number_error: "",
      cc_cvv_error: "",
      cc_expiry_month_error: "",
      cc_expiry_year_error: ""
    }
    let bankFormErrors_ = {
      billing_country_error: "",
      billing_state_error: "",
      billing_city_error: "",
      billing_address_error: "",
      billing_zipcode_error: "",
      bk_name_error : "",
      bk_bank_error : "",
      bk_account_error : "",
      bk_routing_error : ""
    }

    let regex = /^[0-9]{3,4}$/i
    
    if (props.payType === "1|") {
      if (!props.creditFormData.cc_name.trim()) {
        creditFormErrors_["cc_name_error"] = "Required"
      }
      if (!props.creditFormData.cc_type) {
        creditFormErrors_["cc_type_error"] = "Required"
      }
      if (!props.creditFormData.cc_number.trim()) {
        creditFormErrors_["cc_number_error"] = "Required"
      }
      if (!props.creditFormData.cc_cvv.trim()) {
        creditFormErrors_["cc_cvv_error"] = "Required"
      } else if (regex.exec(props.creditFormData.cc_cvv) == null) {
        creditFormErrors_["cc_cvv_error"] = "CVV Number should be 3 or 4 digit numbers"
      }
      if (!props.creditFormData.cc_expiry_month) {
        creditFormErrors_["cc_expiry_month_error"] = "Required"
      }
      if (!props.creditFormData.cc_expiry_year) {
        creditFormErrors_["cc_expiry_year_error"] = "Required"
      }
      if (!props.creditFormData.billing_country) {
        creditFormErrors_["billing_country_error"] = "Required"
      }
      if (!props.creditFormData.billing_state) {
        creditFormErrors_["billing_state_error"] = "Required"
      }
      if (!props.creditFormData.billing_city.trim()) {
        creditFormErrors_["billing_city_error"] = "Required"
      } else if (props.creditFormData.billing_city.length > 190) {
        creditFormErrors_["billing_city_error"] = "Billing City length too long"
      }
      if (!props.creditFormData.billing_address.trim()) {
        creditFormErrors_["billing_address_error"] = "Required"
      } else if (props.creditFormData.billing_address.length > 190) {
        creditFormErrors_["billing_address_error"] = "Billing address length too long"
      }
      if (!props.creditFormData.billing_zipcode.trim()) {
        creditFormErrors_["billing_zipcode_error"] = "Required"
      }
    }
    
    if (props.payType === "3|") {
      if (!props.bankFormData.bk_name.trim()) {
        bankFormErrors_["bk_name_error"] = "Required"
      }
      if (!props.bankFormData.bk_bank) {
        bankFormErrors_["bk_bank_error"] = "Required"
      }
      if (!props.bankFormData.bk_account.trim()) {
        bankFormErrors_["bk_account_error"] = "Required"
      }
      if (!props.bankFormData.bk_routing.trim()) {
        bankFormErrors_["bk_routing_error"] = "Required"
      }
      if (!props.bankFormData.billing_country) {
        bankFormErrors_["billing_country_error"] = "Required"
      }
      if (!props.bankFormData.billing_state) {
        bankFormErrors_["billing_state_error"] = "Required"
      }
      if (!props.bankFormData.billing_city.trim()) {
        bankFormErrors_["billing_city_error"] = "Required"
      } else if (props.bankFormData.billing_city.length > 190) {
        bankFormErrors_["billing_city_error"] = "Billing City length too long"
      }
      if (!props.bankFormData.billing_address.trim()) {
        bankFormErrors_["billing_address_error"] = "Required"
      } else if (props.bankFormData.billing_address.length > 190) {
        bankFormErrors_["billing_address_error"] = "Billing address length too long"
      }
      if (!props.bankFormData.billing_zipcode.trim()) {
        bankFormErrors_["billing_zipcode_error"] = "Required"
      }
    }
    
    if (
      props.payType === "1|" && (
      creditFormErrors_.billing_country_error ||
      creditFormErrors_.billing_state_error ||
      creditFormErrors_.billing_city_error ||
      creditFormErrors_.billing_address_error ||
      creditFormErrors_.billing_zipcode_error ||
      creditFormErrors_.cc_name_error ||
      creditFormErrors_.cc_type_error ||
      creditFormErrors_.cc_number_error ||
      creditFormErrors_.cc_cvv_error ||
      creditFormErrors_.cc_expiry_month_error ||
      creditFormErrors_.cc_expiry_year_error
    )) {
      setCreditFormErrors(creditFormErrors_)
      return false
    } else if (
      props.payType === "3|" && (
      bankFormErrors_.billing_country_error ||
      bankFormErrors_.billing_state_error ||
      bankFormErrors_.billing_city_error ||
      bankFormErrors_.billing_address_error ||
      bankFormErrors_.billing_zipcode_error ||
      bankFormErrors_.bk_name_error ||
      bankFormErrors_.bk_bank_error ||
      bankFormErrors_.bk_account_error ||
      bankFormErrors_.bk_routing_error
    )) {
      setBankFormErrors(bankFormErrors_)
      return false
    }

    return true
  }

  const handleCheckout = () => {
    props.handleCheckout()
  }

  const onSuccessUpdated = () => {
    setIsUpdating(false)
    setIsUpdated(true)
    notification.success({
      message: "Success",
      description: "Billing info has been updated."
    })
    loadBillingInfos()
  }

  const onFailedUpdate = (err) => {
    setIsUpdating(false)
    notification.error({
      message: "Failed",
      description: err
    })
  }

  const handleUpdate = () => {
    if (!checkValid()) return

    setIsUpdating(true)
    if (props.creditFormData.id && props.payType === "1|") {
      callPutApiWithAuth(
        `my_account/setting/cc_billing_detail/${props.creditFormData.id}`,
        {
          ...props.creditFormData,
          cc_exp_date: `${props.creditFormData.cc_expiry_month}/${props.creditFormData.cc_expiry_year}`
        },
        onSuccessUpdated,
        onFailedUpdate
      )
    } else if (props.bankFormData.id && props.payType === "3|") {
      callPutApiWithAuth(
        `my_account/setting/bank_billing_detail/${props.bankFormData.id}`,
        props.bankFormData,
        onSuccessUpdated,
        onFailedUpdate
      )
    } else {
      if (props.payType === "1|") {
        callPostApiWithAuth(
          `my_account/setting/cc_billing_detail`,
          {
            ...props.creditFormData,
            cc_exp_date: `${props.creditFormData.cc_expiry_month}/${props.creditFormData.cc_expiry_year}`
          },
          onSuccessUpdated,
          onFailedUpdate
        )
      } else if (props.payType === "3|") {
        callPostApiWithAuth(
          `my_account/setting/bank_billing_detail`,
          props.bankFormData,
          onSuccessUpdated,
          onFailedUpdate
        )
      }
    }
  }

  const handleClickEditIcon = () => {
    setIsEditable(!isEditable)
  }
  
  const onGetSuccessBillingInfos = ({ data }) => {
    if (data && data[1] && data[1].length === 2) {
      setCreditBillingOptions(data[1].map((el) => ({
        ...el,
        value: el.id,
        label: el.name
      })))
    } else if (data && data[1] && data[1].length === 1) {
      setCreditBillingOptions([
        ...data[1].map((el) => ({
          ...el,
          value: el.id,
          label: el.name
        })),
        {
          value: "",
          key: "new",
          label: "New Billing Info",
          id: "",
          billing_address: '', 
          billing_address_line2: '',
          billing_city: '', 
          billing_state: '',
          billing_zipcode: '', 
          billing_country: '',
          cc_name: '', 
          cc_type: '',
          cc_number: '', 
          cc_cvv: '',
          cc_expiry_month: '', 
          cc_expiry_year: ''
        }
      ])
    } else if (!data || (data && !data[1])) {
      setCreditBillingOptions([
        {
          value: "",
          key: "new",
          label: "New Billing Info",
          id: "",
          billing_address: '', 
          billing_address_line2: '',
          billing_city: '', 
          billing_state: '',
          billing_zipcode: '', 
          billing_country: '',
          cc_name: '', 
          cc_type: '',
          cc_number: '', 
          cc_cvv: '',
          cc_expiry_month: '', 
          cc_expiry_year: ''
        }
      ])
    }

    if (data && data[3] && data[3].length === 2) {
      setBankBillingOptions(data[3].map((el) => ({
        ...el,
        value: el.id,
        label: el.name
      })))
    } else if (data && data[3] && data[3].length === 1) {
      setBankBillingOptions([
        ...data[3].map((el) => ({
          ...el,
          value: el.id,
          label: el.name
        })),
        {
          value: "",
          key: "new",
          label: "New Billing Info",
          id: "",
          billing_address: '', 
          billing_address_line2: '',
          billing_city: '', 
          billing_state: '',
          billing_zipcode: '', 
          billing_country: '',
          bk_name : '',
          bk_bank : '',
          bk_account : '',
          bk_routing : ''
        }
      ])
    } else if (!data || (data && !data[3])) {
      setBankBillingOptions([
        {
          value: "",
          key: "new",
          label: "New Billing Info",
          id: "",
          billing_address: '', 
          billing_address_line2: '',
          billing_city: '', 
          billing_state: '',
          billing_zipcode: '', 
          billing_country: '',
          bk_name : '',
          bk_bank : '',
          bk_account : '',
          bk_routing : ''
        }
      ])
    }
  }

  const onGetFailedBillingInfos = () => {
    setCreditBillingOptions([
      {
        value: "",
        key: "new",
        label: "New Billing Info",
        id: "",
        billing_address: '', 
        billing_address_line2: '',
        billing_city: '', 
        billing_state: '',
        billing_zipcode: '', 
        billing_country: '',
        cc_name: '', 
        cc_type: '',
        cc_number: '', 
        cc_cvv: '',
        cc_expiry_month: '', 
        cc_expiry_year: ''
      }
    ])
    setBankBillingOptions([
      {
        value: "",
        key: "new",
        label: "New Billing Info",
        id: "",
        billing_address: '', 
        billing_address_line2: '',
        billing_city: '', 
        billing_state: '',
        billing_zipcode: '', 
        billing_country: '',
        bk_name : '',
        bk_bank : '',
        bk_account : '',
        bk_routing : ''
      }
    ])
  }

  const loadBillingInfos = () => {
    callGetApiWithAuth("shop/get_billing_details", onGetSuccessBillingInfos, onGetFailedBillingInfos)
  }

  useEffect(() => {
    if (props.payType === "1|") {
      if (creditBillingOptions.length > 0 && creditBillingOptions.filter((el) => el.is_primary*1 === 1).length > 0) {
        let creditFormData_ = creditBillingOptions.filter((el) => el.is_primary*1 === 1)[0]
        props.setCreditFormData({
          ...creditFormData_,
          cc_number: `**** **** **** ****`, 
          cc_cvv: '***',
          cc_expiry_month: creditFormData_.cc_exp_date.split("/")[0],
          cc_expiry_year: creditFormData_.cc_exp_date.split("/")[1]
        })
      } else {
        props.setCreditFormData({
          id: '',
          billing_address: '', 
          billing_address_line2: '',
          billing_city: '', 
          billing_state: '',
          billing_zipcode: '', 
          billing_country: '',
          cc_name: '', 
          cc_type: '',
          cc_number: '', 
          cc_cvv: '',
          cc_expiry_month: '', 
          cc_expiry_year: '',
          pay_type: 1
        })
      }
    } else if (props.payType === "3|") {
      if (bankBillingOptions.length > 0 && bankBillingOptions.filter((el) => el.is_primary*1 === 1).length > 0) {
        props.setBankFormData({
          ...bankBillingOptions.filter((el) => el.is_primary*1 === 1)[0],
          bk_account: `******`, 
          bk_routing: `********`,
        })
      } else {
        props.setBankFormData({
          id: '',
          billing_address: '', 
          billing_address_line2: '',
          billing_city: '', 
          billing_state: '',
          billing_zipcode: '', 
          billing_country: '',
          bk_name : '',
          bk_bank : '',
          bk_account : '',
          bk_routing : '',
          pay_type: 3
        })
      }
    }
    setIsEditable(false)
  }, [props.payType, creditBillingOptions, bankBillingOptions])

  useEffect(() => {
    if (props.payType === "1|") {
      if (creditBillingOptions.length > 0 && creditBillingOptions.filter((el) => el.value*1 === props.creditFormData.id*1)[0] && creditBillingOptions.filter((el) => el.value*1 === props.creditFormData.id*1)[0].id) {
        let creditFormData_ = creditBillingOptions.filter((el) => el.value*1 === props.creditFormData.id*1)[0]
        props.setCreditFormData({
          ...creditFormData_,
          cc_number: `**** **** **** ****`, 
          cc_cvv: '***',
          cc_expiry_month: creditFormData_.cc_exp_date.split("/")[0],
          cc_expiry_year: creditFormData_.cc_exp_date.split("/")[1]
        })
      } else {
        props.setCreditFormData({
          id: "",
          billing_address: '', 
          billing_address_line2: '',
          billing_city: '', 
          billing_state: '',
          billing_zipcode: '', 
          billing_country: '',
          cc_name: '', 
          cc_type: '',
          cc_number: '', 
          cc_cvv: '',
          cc_expiry_month: '', 
          cc_expiry_year: ''
        })
      }
    } else if (props.payType === "3|") {
      if (bankBillingOptions.length > 0 && bankBillingOptions.filter((el) => el.value*1 === props.bankFormData.id*1)[0] && bankBillingOptions.filter((el) => el.value*1 === props.bankFormData.id*1)[0].id) {
        let bankFormData_ = bankBillingOptions.filter((el) => el.value*1 === props.bankFormData.id*1)[0]
        props.setBankFormData({
          ...bankFormData_,
          bk_account: `******`, 
          bk_routing: `********`,
        })
      } else {
        props.setBankFormData({
          id: "",
          billing_address: '', 
          billing_address_line2: '',
          billing_city: '', 
          billing_state: '',
          billing_zipcode: '', 
          billing_country: '',
          bk_name : '',
          bk_bank : '',
          bk_account : '',
          bk_routing : ''
        })
      }
    }
    setIsEditable(false)
  }, [props.creditFormData.id, props.bankFormData.id])

  useEffect(() => {
    if (isEditable) {
      setIsUpdated(false)
      if (props.payType === "1|") {
        props.setCreditFormData({
          ...props.creditFormData,
          cc_number: '', 
          cc_cvv: '',
        })
      } else if (props.payType === "3|") {
        props.setBankFormData({
          ...props.bankFormData,
          bk_account: '', 
          bk_routing: '',
        })
      }
    } else {
      setIsUpdated(true)
      if (props.payType === "1|" && props.creditFormData.id) {
        props.setCreditFormData({
          ...props.creditFormData,
          cc_number: `**** **** **** ****`, 
          cc_cvv: '***',
        })
      } else if (props.payType === "3|" && props.bankFormData.id) {
        props.setBankFormData({
          ...props.bankFormData,
          bk_account: `******`, 
          bk_routing: `********`,
        })
      }
    }
  }, [isEditable])

  useEffect(() => {
    loadBillingInfos()

    let payTypeOptions0 = [
      {
        "value": "1|",
        "key": "cc",
        "label": "Credit Card"
      },
      {
        "value": "5|",
        "key": "coin",
        "label": "Bitcoin"
      }
    ]

    if (props.myUser) {
      if (props.myUser.country==='US') {
        payTypeOptions0.push({
          "value": "3|",
          "key": "ach",
          "label": "ACH"
        })
      }
      if (props.myUser.type*1 === 1) {
        payTypeOptions0.push({
          "value": "2|",
          "key": "wallet",
          "label": "Credit Wallet"
        })
        payTypeOptions0.push({
          "value": "8|",
          "key": "cc+wallet",
          "label": "CC + Credit Wallet"
        })        
      }
      payTypeOptions0.push({
        "value": "7|",
        "key": "gift_wallet",
        "label": "Gift Wallet"
      })
      payTypeOptions0.push({
        "value": "9|",
        "key": "cc+gift_wallet",
        "label": "CC + Gift Wallet"
      })
      if (props.myUser.country==='UA') {
        payTypeOptions0.push({
          "value": "4|LiqPay",
          "key": "liq_pay",
          "label": "LiqPay"
        })
      }
      if (props.myUser.country==='RU') {
        payTypeOptions0.push({
          "value": "4|Payu",
          "key": "payu",
          "label": "PayU"
        })
      }
      if (props.myUser.country==='TW') {
        payTypeOptions0.push({
          "value": "4|SunTech",
          "key": "sun_tech",
          "label": "SunTech"
        })
      }
    }
    setPayTypeOptions(payTypeOptions0)
  }, [props.myUser])

  return (
    <div className="checkout-form">
      <h4 className="checkout-title">Payment Information</h4>
      <div className='row'>
        <div className='col-xs-12 col-sm-6 col-md-12 col-lg-6 selectdiv no-padding'>
          <label>Payment Type</label><br/>
          <Select 
            value={props.payType}
            options={payTypeOptions}
            onChange={(value) => props.setPayType(value)}
            size="large"
          />
        </div>
      </div>
      {props.payType === "2|" &&
        <div className="row">
          <div className="col-xs-12 no-padding mt-4">
            <span>Your current credit wallet balance is <strong>{asPrice(props.myUser.wallet.current_balance)}</strong>.</span>
          </div>
        </div>
      }
      {props.payType === "8|" &&
        <div className="row">
          <div className="col-xs-12 no-padding mt-4">
            <span>Your current credit wallet balance is <strong>{asPrice(props.myUser.wallet.current_balance)}</strong>.</span>
            <br/>
            {props.myUser.wallet.current_balance==0?
            <>
              <span>Currently no credit wallet, </span>
              <span>{asPrice(props.totalPrice)} will be paid by CC.</span>
            </>
            : props.myUser.wallet.current_balance*1<props.totalPrice*1?
            <>
              <span>You will pay {asUsdPrice(props.myUser.wallet.current_balance)} using credit wallet</span>
              <span>, and {asPrice(props.totalPrice - props.myUser.credit_wallet.amount)} will be paid by CC.</span>
            </> 
            : 
            <>
              <span>Please select Credit Wallet payment</span>
            </>}
          </div>
        </div>
      }
      {props.payType === "7|" &&
        <div className="row">
          <div className="col-xs-12 no-padding mt-4">
            <span>Your current gift wallet balance is <strong>{asPrice(props.myUser.gift_wallet.amount)}</strong>.</span>
          </div>
        </div>
      }
      {props.payType === "9|" &&
        <div className="row">
          <div className="col-xs-12 no-padding mt-4">
            <span>Your current gift wallet balance is <strong>{asPrice(props.myUser.gift_wallet.amount)}</strong>.</span>
            <br/>
            {props.myUser.gift_wallet.amount==0?
            <>
              <span>Currently no gift wallet, </span>
              <span>{asPrice(props.totalPrice)} will be paid by CC.</span>
            </>
            : props.myUser.gift_wallet.amount*1<props.totalPrice*1?
            <>
              <span>You will pay {asUsdPrice(props.myUser.gift_wallet.amount)} using gift wallet</span>
              <span>, and {asPrice(props.totalPrice - props.myUser.gift_wallet.amount)} will be paid by CC.</span>
            </> 
            : 
            <>
              <span>Please select Gift Wallet payment</span>
            </>}
          </div>
        </div>
      }
      {(props.payType === "1|" || 
        props.payType === "8|" || 
        props.payType === "9|" 
      ) && 
        <div className='row'>
          <div className='col-xs-12 col-sm-6 col-md-12 col-lg-6 selectdiv no-padding'>
            <label>Select Your Billing Info*</label><br/>
            <Select 
              value={props.creditFormData.id}
              onChange={(value)=>props.setCreditFormData({ ...props.creditFormData, id: value })}
              size='large'
              options={creditBillingOptions}
            />
            <br/>
          </div>
          {props.creditFormData.id &&
            <div className='col-sm-6 selectdiv no-padding edit'>
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
      }
      {(props.payType === "3|") && 
        <div className='row'>
          <div className='col-xs-12 col-sm-6 col-md-12 col-lg-6 selectdiv no-padding'>
            <label>Select Your Billing Info*</label><br/>
            <Select 
              value={props.bankFormData.id}
              onChange={(value)=>props.setBankFormData({ ...props.bankFormData, id: value })}
              size='large'
              options={props.payType === "1|" ? bankBillingOptions : props.payType === "3|" ? bankBillingOptions : []}
            />
            <br/>
          </div>
          {props.bankFormData.id &&
            <div className='col-xs-12 col-sm-6 col-md-12 col-lg-6 selectdiv no-padding edit'>
              <Button
                type="primary"
                className='btn btn-primary'
                onClick={handleClickEditIcon}
                icon={<EditOutlined />}
              >
                Edit
              </Button>
              <br/>
            </div>
          }
        </div>
      }
      {(props.payType === "1|" || 
        props.payType === "8|" || 
        props.payType === "9|" 
      ) && 
        <>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>Name on Card*</label>
              <br />
              <Input
                type="text"
                value={props.creditFormData.cc_name}
                onChange={(e) => onChangeCreditForm("cc_name", e.target.value)}
                disabled={props.creditFormData.id && !isEditable}
              />
              <br />
              {creditFormErrors.cc_name_error && (
                <label className="input-error">{creditFormErrors.cc_name_error}</label>
              )}
            </div>
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 selectdiv no-padding">
              <label>Card Type*</label>
              <br />
              <Select
                value={props.creditFormData.cc_type}
                onChange={(value) => onChangeCreditForm("cc_type", value)}
                size="large"
                disabled={props.creditFormData.id && !isEditable}
              >
                <option value=""></option>
                <option value={1}>Visa</option>
                <option value={2}>Mastercard</option>
                <option value={3}>Discover</option>
                <option value={4}>Amex</option>
                <option value={5}>Diners</option>
              </Select>
              <br />
              {creditFormErrors.cc_type_error && (
                <label className="input-error">{creditFormErrors.cc_type_error}</label>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-9 no-padding">
              <label>Credit Card Number*</label>
              <br />
              <Input
                type="text"
                value={props.creditFormData.cc_number}
                onChange={(e) => onChangeCreditForm("cc_number", e.target.value)}
                disabled={props.creditFormData.id && !isEditable}
              />
              <br />
              {creditFormErrors.cc_number_error && (
                <label className="input-error">{creditFormErrors.cc_number_error}</label>
              )}
            </div>
            <div className="col-sm-3 no-padding">
              <label>CVV*</label>
              <br />
              <Input
                type="text"
                value={props.creditFormData.cc_cvv}
                onChange={(e) => onChangeCreditForm("cc_cvv", e.target.value)}
                disabled={props.creditFormData.id && !isEditable}
              />
              <br />
              {creditFormErrors.cc_cvv_error && (
                <label className="input-error">{creditFormErrors.cc_cvv_error}</label>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 selectdiv no-padding">
              <label>Exp Month*</label>
              <br />
              <Select
                value={props.creditFormData.cc_expiry_month}
                onChange={(value) => onChangeCreditForm("cc_expiry_month", value)}
                placeholder="Month"
                size="large"
                showSearch
                disabled={props.creditFormData.id && !isEditable}
              >
                <option value=""></option>
                {[...Array(12).keys()].map((i) => (
                  <option value={i < 9 ? "0" + (i + 1) : i + 1} key={i}>
                    {i + 1}
                  </option>
                ))}
              </Select>
              <br />
              {creditFormErrors.cc_expiry_month_error && (
                <label className="input-error">
                  {creditFormErrors.cc_expiry_month_error}
                </label>
              )}
            </div>
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 selectdiv no-padding">
              <label>Exp Year*</label>
              <br />
              <Select
                value={props.creditFormData.cc_expiry_year}
                onChange={(value) => onChangeCreditForm("cc_expiry_year", value)}
                placeholder="Year"
                size="large"
                showSearch
                disabled={props.creditFormData.id && !isEditable}
              >
                <option value=""></option>
                {years.map((y) => (
                  <option value={y} key={y}>
                    20{y}
                  </option>
                ))}
              </Select>
              <br />
              {creditFormErrors.cc_expiry_year_error && (
                <label className="input-error">{creditFormErrors.cc_expiry_year_error}</label>
              )}
            </div>
          </div>
        </>
      }
      {props.payType === "3|" && 
        <>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>Name on Bank*</label>
              <br />
              <Input
                type="text"
                value={props.bankFormData.bk_name}
                onChange={(e) => onChangeBankForm("bk_name", e.target.value)}
                disabled={props.bankFormData.id && !isEditable}
              />
              <br />
              {bankFormErrors.bk_name_error && (
                <label className="input-error">{bankFormErrors.bk_name_error}</label>
              )}
            </div>
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>Bank Name*</label>
              <br />
              <Input
                type="text"
                value={props.bankFormData.bk_bank}
                onChange={(e) => onChangeBankForm("bk_bank", e.target.value)}
                disabled={props.bankFormData.id && !isEditable}
              />
              <br />
              {bankFormErrors.bk_bank_error && (
                <label className="input-error">{bankFormErrors.bk_bank_error}</label>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>Account Number*</label>
              <br />
              <Input
                type="text"
                value={props.bankFormData.bk_account}
                onChange={(e) => onChangeBankForm("bk_account", e.target.value)}
                disabled={props.bankFormData.id && !isEditable}
              />
              <br />
              {bankFormErrors.bk_account_error && (
                <label className="input-error">{bankFormErrors.bk_account_error}</label>
              )}
            </div>
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>Routing Number*</label>
              <br />
              <Input
                type="text"
                value={props.bankFormData.bk_routing}
                onChange={(e) => onChangeBankForm("bk_routing", e.target.value)}
                disabled={props.bankFormData.id && !isEditable}
              />
              <br />
              {bankFormErrors.bk_routing_error && (
                <label className="input-error">{bankFormErrors.bk_routing_error}</label>
              )}
            </div>
          </div>
        </>
      }
      {props.payType === "5|" &&
        <>
          <div className="bitcoin-description">
            <p>
              Upon confirming your information and agreeing to our Policies
              &amp; Procedures, we will direct you to CoinPayments to complete
              your MyDailyChoice purchase with Bitcoin. Bitcoin purchases are
              non-refundable due to the fluctuation of the cryptocurrency
              market. Any refund requests will be sent in the form of a credit
              added to your e-wallet.
            </p>
          </div>
        </>
      }
      {props.payType === '4|LiqPay' && 
      <>
        <div className='bitcoin-description'>
          <p>
            <strong>Pay Using LiqPay (Ukraine)</strong>
          </p>
          <p>
            Upon confirming your information and agreeing to our policies,
            we will direct you to to the LiqPay site to complete your order.
          </p>
        </div>
      </>
      }
      {(props.payType === "1|" || 
        props.payType === "8|" || 
        props.payType === "9|" 
      ) &&
        <>
          <h4 className="checkout-title billing-info mt-5">Billing Address</h4>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>Address Line 1*</label>
              <br />
              <Input
                type="text"
                value={props.creditFormData.billing_address}
                onChange={(e) => onChangeCreditForm("billing_address", e.target.value)}
                disabled={props.creditFormData.id && !isEditable}
              />
              <br />
              {creditFormErrors.billing_address_error && (
                <label className="input-error">
                  {creditFormErrors.billing_address_error}
                </label>
              )}
            </div>
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>Address Line 2</label>
              <br />
              <Input
                type="text"
                value={props.creditFormData.billing_address_line2}
                onChange={(e) => onChangeCreditForm("billing_address_line2", e.target.value)}
                disabled={props.creditFormData.id && !isEditable}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>City*</label>
              <br />
              <Input
                type="text"
                value={props.creditFormData.billing_city}
                onChange={(e) => onChangeCreditForm("billing_city", e.target.value)}
                disabled={props.creditFormData.id && !isEditable}
              />
              <br />
              {creditFormErrors.billing_city_error && (
                <label className="input-error">
                  {creditFormErrors.billing_city_error}
                </label>
              )}
            </div>
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>Zip/Postal code*</label>
              <br />
              <Input
                type="text"
                value={props.creditFormData.billing_zipcode}
                onChange={(e) => onChangeCreditForm("billing_zipcode", e.target.value)}
                disabled={props.creditFormData.id && !isEditable}
              />
              <br />
              {creditFormErrors.billing_zipcode_error && (
                <label className="input-error">
                  {creditFormErrors.billing_zipcode_error}
                </label>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>Country*</label>
              <br />
              <Select
                value={props.creditFormData.billing_country}
                onChange={(value) => onChangeCreditForm("billing_country", value)}
                size="large"
                showSearch
                disabled={props.creditFormData.id && !isEditable}
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
              <br />
              {creditFormErrors.billing_country_error && (
                <label className="input-error">
                  {creditFormErrors.billing_country_error}
                </label>
              )}
            </div>
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>State/Province*</label>
              <br />
              <Select
                value={props.creditFormData.billing_state}
                onChange={(value) => onChangeCreditForm("billing_state", value)}
                size="large"
                showSearch
                disabled={props.creditFormData.id && !isEditable}
                options={[
                  { 
                    label: 'Select State', 
                    value: ''
                  },
                  ...statesByCountry(props.creditFormData.billing_country).map(el => ({
                    label: el.name,
                    value: el.name
                  }))
                ]}
              />
              <br />
              {creditFormErrors.billing_state_error && (
                <label className="input-error">
                  {creditFormErrors.billing_state_error}
                </label>
              )}
            </div>
          </div>
        </>
      }
      {(props.payType === "3|") &&
        <>
          <h4 className="checkout-title billing-info mt-5">Billing Address</h4>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>Address Line 1*</label>
              <br />
              <Input
                type="text"
                value={props.bankFormData.billing_address}
                onChange={(e) => onChangeBankForm("billing_address", e.target.value)}
                disabled={props.bankFormData.id && !isEditable}
              />
              <br />
              {bankFormErrors.billing_address_error && (
                <label className="input-error">
                  {bankFormErrors.billing_address_error}
                </label>
              )}
            </div>
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>Address Line 2</label>
              <br />
              <Input
                type="text"
                value={props.bankFormData.billing_address_line2}
                onChange={(e) => onChangeBankForm("billing_address_line2", e.target.value)}
                disabled={props.bankFormData.id && !isEditable}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>City*</label>
              <br />
              <Input
                type="text"
                value={props.bankFormData.billing_city}
                onChange={(e) => onChangeBankForm("billing_city", e.target.value)}
                disabled={props.bankFormData.id && !isEditable}
              />
              <br />
              {bankFormErrors.billing_city_error && (
                <label className="input-error">
                  {bankFormErrors.billing_city_error}
                </label>
              )}
            </div>
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 no-padding">
              <label>Zip/Postal code*</label>
              <br />
              <Input
                type="text"
                value={props.bankFormData.billing_zipcode}
                onChange={(e) => onChangeBankForm("billing_zipcode", e.target.value)}
                disabled={props.bankFormData.id && !isEditable}
              />
              <br />
              {bankFormErrors.billing_zipcode_error && (
                <label className="input-error">
                  {bankFormErrors.billing_zipcode_error}
                </label>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 selectdiv no-padding">
              <label>Country*</label>
              <br />
              <Select
                value={props.bankFormData.billing_country}
                onChange={(value) => onChangeBankForm("billing_country", value)}
                size="large"
                showSearch
                disabled={props.bankFormData.id && !isEditable}
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
              <br />
              {bankFormErrors.billing_country_error && (
                <label className="input-error">
                  {bankFormErrors.billing_country_error}
                </label>
              )}
            </div>
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6 selectdiv no-padding">
              <label>State/Province*</label>
              <br />
              <Select
                value={props.bankFormData.billing_state}
                onChange={(value) => onChangeBankForm("billing_state", value)}
                size="large"
                showSearch
                disabled={props.bankFormData.id && !isEditable}
                options={[
                  { 
                    label: 'Select State', 
                    value: ''
                  },
                  ...statesByCountry(props.bankFormData.billing_country).map(el => ({
                    label: el.name,
                    value: el.name
                  }))
                ]}
              />
              <br />
              {bankFormErrors.billing_state_error && (
                <label className="input-error">
                  {bankFormErrors.billing_state_error}
                </label>
              )}
            </div>
          </div>
        </>
      }      
      <div
        className="d-flex justify-content-between action-row"
        style={{ marginTop: 24 }}
      >
        {props.hasPhysicalOrder &&
          <div>
            <button
              onClick={() => props.setStep("shipping-form")}
              className="btn btn-secondary"
            >
              Prev
            </button>
          </div>
        }
        <div className="d-flex align-items-center">
          {(isUpdated && ((props.creditFormData.id && props.payType === "1|") || (props.bankFormData.id && props.payType === "3|")) || (props.payType !== "1|" && props.payType !== "3|")) ?
            <Popconfirm
              onConfirm={handleCheckout}
              okText="Yes"
              cancelText="No"
              title="Are you sure?"
              disabled={(props.payType === "2|" && props.myUser.wallet.current_balance*1 === 0) || (props.payType === "7|" && props.myUser.gift_wallet.amount*1 === 0 || (props.payType === '8|' && props.myUser.wallet.current_balance*1>=props.totalPrice*1) || (props.payType === '9|' && props.myUser.gift_wallet.amount*1>=props.totalPrice*1))}
            >
              <Spin spinning={props.isSubmiting}>
                <button
                  className="btn btn-primary"
                  disabled={(props.payType === "2|" && props.myUser.wallet.current_balance*1 === 0) || (props.payType === "7|" && props.myUser.gift_wallet.amount*1 === 0) || (props.payType === '8|' && props.myUser.wallet.current_balance*1>=props.totalPrice*1) || (props.payType === '9|' && props.myUser.gift_wallet.amount*1>=props.totalPrice*1)}
                >
                  Purchase
                </button>
              </Spin>
            </Popconfirm>
            :
            <Button loading={isUpdating} type="primary" className='btn btn-primary' onClick={handleUpdate}>Update</Button>
          }
        </div>
      </div>
    </div>
  )
}
