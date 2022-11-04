import { createReducer } from 'redux-create-reducer'

const initialState = {
  currency: {
    code: 'USD',
    symbol: '$',
    place: 1,
    rate: 1,
  }
}

export default createReducer(initialState, {
  [`common.SET_CURRENCY`](state, action) {
    return {
      ...state,
      currency: action.payload.currency
    }
  },
})
