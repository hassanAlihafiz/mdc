import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShippingForm from "./forms/ShippingForm";
import BillingForm from "./forms/BillingForm";
import CheckoutSideCart from "./forms/CheckoutSideCart";
import Confirmation from "./forms/Confirmation";
import { message } from "antd";
import { callPostApiWithAuth } from "utils/api";
import { varValue } from "common/var";
import { Wrapper } from "./CheckoutPage.styled";
import { NoData } from "components/common";

export default function IndexPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const orderFrom = useSelector(state=>state.checkout.orderFrom);
  const orderDetails = useSelector(state=>state.checkout.orderDetails);
  const subscriptionId = useSelector(state=>state.checkout.subscriptionId);
  const myUser = useSelector((state) => state.auth.user);
  const [step, setStep] = useState('');
  const [hasPhysicalOrder, setHasPhysicalOrder] = useState(false);
  const [payType, setPayType] = useState("1|");
  const [bankFormData, setBankFormData] = useState({
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
  const [creditFormData, setCreditFormData] = useState({
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
  const [shippingData, setShippingData] = useState({
    id: ''
  });
  const [tax, setTax] = useState(undefined);
  const [shippingPrice, setShippingPrice] = useState(undefined);
  const [totalPrice, setTotalPrice] = useState(0)
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [confirmResult, setConfirmResult] = useState(undefined);

  const onGetSuccessShippingAndTaxPrice  = (data) => {
    setIsLoading(false);
    setShippingPrice(data.data.shipping_price);
    setTax(data.data.tax_cost);
    setStep("billing-form");
  }

  const onGetFailedShippingAndTaxPrice = () => {
    setIsLoading(false);
  }

  const getShippingAndTaxPrice = () => {
    setShippingPrice(0);
    let data = {
      shippingDetail: {
        id: shippingData.id
      },
      orderDetails: orderDetails.map((el) => ({
        ...el,
        product_id: el.product.id
      }))
    };
    setIsLoading(true);
    callPostApiWithAuth(`shop/get_shipping_price`, data, onGetSuccessShippingAndTaxPrice, onGetFailedShippingAndTaxPrice);
  }

  const onSuccessCheckout = (data) => {
    setIsSubmiting(false);
    setStep('confirmation');
    setConfirmResult(data.data);
    dispatch({
      type: "checkout.CLEAR_CART"
    })
  }
  
  const onFailCheckout = (errMessage) => {
    setIsSubmiting(false);
    message.error(errMessage);
  }

  const handleCheckout = () => {
    const payType2 = payType.split("|")[0]
    let data = {
      order_from: orderFrom,
      subscription_id: subscriptionId, // it will only be used on subscription_resume
      shippingDetail: {
        id: shippingData.id
      },
      billingDetail: {
        id: (payType === "1|" || payType==='8|'||payType==='9|') ? creditFormData.id : payType === "3|" ? bankFormData.id : "",
        pay_type: payType2,
        coin_type: "btc"
      }
    };
    if (payType2*1 == 4 || payType2*1 == 5) {
      data.billingDetail.billing_country = myUser.country      
    }
    if (payType2*1 == 4) {
      data.billingDetail.manual_method = payType.split("|")[1]
    }
    let orderDetails_ = [];
    for (let item of orderDetails) {
      orderDetails_.push({
        product_id: item.product.id,
        quantity: item.quantity,
        pay_cycle: item.pay_cycle,
        contained_products: item.contained_products
      });
    }
    data.orderDetails = orderDetails_;
    setIsSubmiting(true);
    callPostApiWithAuth(`shop/checkout`, data,  onSuccessCheckout, onFailCheckout);
  }

  useEffect(() => {
    if (myUser) {
      setCreditFormData({
        ...creditFormData, 
        billing_state: myUser.state,
        billing_country: myUser.country,
      });
      setBankFormData({
        ...bankFormData, 
        shipping_state: myUser.state,
        shipping_country: myUser.country,
      });
    }
  }, [myUser]);

  useEffect(() => {
    if (orderDetails.length > 0 && orderDetails.filter((el) => el.product.type*1 === varValue("product.type", "physical")*1).length > 0) {
      setHasPhysicalOrder(true);
    } else if (orderDetails.length > 0 && orderDetails.filter((el) => el.product.type*1 === varValue("product.type", "physical")*1).length === 0) {
      setHasPhysicalOrder(false);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (hasPhysicalOrder) {
      setStep("shipping-form");
    } else {
      setStep("billing-form");
    }
  }, [hasPhysicalOrder]);

  useEffect(() => {
    dispatch({
      type: "ui.HIDE_SIDE_CART"
    });
  }, []);

  if (!confirmResult && orderDetails.length==0) {
    return (
      <Wrapper>
        <div className='container'>
          <NoData title="There are no items." />
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className="main-container">
        {step!='confirmation' && 
          <>
            <div className='left-section checkout-section'>
              <div className='main-content'>
                <div className="check-steps-details">
                  {step=='shipping-form' && 
                    <ShippingForm 
                      shippingData={shippingData}
                      setShippingData={setShippingData}
                      setStep={setStep}
                      getShippingAndTaxPrice={getShippingAndTaxPrice}
                      isLoading={isLoading}
                    />
                  }
                  {step=='billing-form' && 
                    <BillingForm
                      myUser={myUser}
                      payType={payType}
                      setPayType={setPayType}
                      bankFormData={bankFormData}
                      setBankFormData={setBankFormData}
                      creditFormData={creditFormData}
                      setCreditFormData={setCreditFormData}
                      handleCheckout={handleCheckout}
                      setStep={setStep}
                      tax={tax}
                      isSubmiting={isSubmiting}
                      hasPhysicalOrder={hasPhysicalOrder}
                      totalPrice={totalPrice}
                    />
                  }            
                </div>  
              </div>
            </div>
            <CheckoutSideCart
              shippingPrice={shippingPrice}
              setShippingPrice={setShippingPrice}
              tax={tax}
              setTax={setTax}
              setTotalPrice={setTotalPrice}
              step={step}
              setStep={setStep}
              hasPhysicalOrder={hasPhysicalOrder}
            />
          </>
        }
        {step=='confirmation' && 
          <Confirmation
            myUser={myUser}
            confirmResult={confirmResult}
            hasPhysicalOrder={hasPhysicalOrder}
          />
        }
      </div>
    </Wrapper>
  );
}
