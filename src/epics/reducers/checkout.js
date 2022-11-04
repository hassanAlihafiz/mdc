import { createReducer } from 'redux-create-reducer'

const initialState = {
  orderFrom: 2, // 2: shop, 4: subscription_resume
  subscriptionId: undefined, // use only for subscription_resume
  orderDetails: [],
  orderError: undefined
}

export default createReducer(initialState, {
  [`checkout.ADD_CART`](state, action) {
    let orderFrom = 2
    let orderDetails = [...state.orderDetails]
    if (state.orderFrom===4) {
      orderDetails = []
    }
    let isExist = false
    let product = action.payload.product
    let orderError_ = ""
    
    for (let item of orderDetails) {
      if (item.product.id == product.id && 
        item.pay_cycle*1 === action.payload.pay_cycle*1
      ) {
        isExist = true

        if ((item.quantity*1 +  action.payload.quantity*1) > item.product.max_order_quantity*1) {
          orderError_ = `You can purchase ${item.product.title} at most ${item.product.max_order_quantity} quantity per order.`
          return {
            ...state,
            orderError: orderError_
          }
        }

        item.quantity = item.quantity*1 + action.payload.quantity*1
        item.pay_cycle = action.payload.pay_cycle
        item.contained_products = action.payload.contained_products || []
      }
    }

    if (!isExist) {
      if (action.payload.quantity*1 > product.max_order_quantity*1) {
        orderError_ = `You can purchase ${product.title} at most ${product.max_order_quantity} quantity per order.`
        return {
          ...state,
          orderError: orderError_
        }
      }

      orderDetails.push({
        product,
        quantity: action.payload.quantity,
        pay_cycle: action.payload.pay_cycle,
        contained_products: action.payload.contained_products || []
      })
    }

    return {
      ...state,
      orderFrom,
      orderDetails,
      subscriptionId: undefined
    }
  },
  [`checkout.REMOVE_CART`](state, action) {
    let orderDetails = [...state.orderDetails]

    return {
      ...state,
      orderDetails: orderDetails.filter((el) => (
        el.product.id*1 !== action.payload.product_id*1 || 
        el.pay_cycle*1 !== action.payload.pay_cycle*1)
      )
    }
  },
  [`checkout.CLEAR_CART`](state, action) {
    return {
      ...state,
      orderDetails: [],
      subscriptionId: undefined
    }
  },
  [`checkout.CLEAR_ORDER_ERROR`](state, action) {
    return {
      ...state,
      orderError: undefined
    }
  },
  [`checkout.ADD_SUBSCRIPTION_CART`](state, action) {
    let orderFrom = 4
    const { 
      product, quantity,
      pay_cycle, contained_products,
      subscription_id
    } = action.payload
    let orderDetails = [{
      product, quantity,
      pay_cycle, contained_products
    }]

    return {
      ...state,
      orderFrom,
      orderDetails,
      subscriptionId: subscription_id,
      orderError: undefined
    }
  },
})
