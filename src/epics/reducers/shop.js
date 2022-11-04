import { createReducer } from 'redux-create-reducer'

const initialState = {
  categories: [],  
}

export default createReducer(initialState, {
  [`shop.GET_CATEGORIES`](state, action) {
    const { categories } = action.payload
    return {
      ...state,
      categories,
    }
  }
})
