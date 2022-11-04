import { createReducer } from 'redux-create-reducer'

const initialState = {
  isCollapse: false,
  isHoverSidebar: false,
  isShowSideCart: false
}

export default createReducer(initialState, {
  [`ui.SET_COLLAPSE`](state, action) {
    return {
      ...state,
      isCollapse: action.payload.isCollapse,
    }
  },
  [`ui.SET_HOVER_SIDEBAR`](state, action) {
    return {
      ...state,
      isHoverSidebar: action.payload.isHoverSidebar,
    }
  },
  // Side Cart
  [`ui.SHOW_SIDE_CART`](state, action) {
    return {
      ...state,
      isShowSideCart: true
    }
  },
  [`ui.HIDE_SIDE_CART`](state, action) {
    return {
      ...state,
      isShowSideCart: false
    }
  }
})
